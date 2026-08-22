/**
 * LizzyOS Worker — existing notifications + Secret Shelf negotiation only
 * KV: LIZZY_CLAIMS
 * Secrets: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 * Telegram webhook: /telegram
 */
const H={"content-type":"application/json","access-control-allow-origin":"*","access-control-allow-headers":"Content-Type","access-control-allow-methods":"GET,POST,OPTIONS"};
const json=(x,s=200)=>new Response(JSON.stringify(x),{status:s,headers:H});
async function tg(env,m,p){const r=await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${m}`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(p)});return r.json();}
async function getClaim(env,id){return env.LIZZY_CLAIMS.get(`claim:${id}`,{type:"json"})||env.LIZZY_CLAIMS.get(id,{type:"json"});}
async function putClaim(env,c){await env.LIZZY_CLAIMS.put(`claim:${c.claimId}`,JSON.stringify(c));}
const id=()=>`bid_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
const shelfStateKey=itemId=>`secret_shelf:item:${itemId}:latest`;
async function putShelfState(env,c){
 if(!c?.itemId)return;
 await env.LIZZY_CLAIMS.put(shelfStateKey(c.itemId),JSON.stringify({
   claimId:c.claimId,itemId:c.itemId,item:c.item,offer:c.offer,status:c.status,
   counterOffer:c.counterOffer??null,createdAt:c.createdAt,decidedAt:c.decidedAt||null,
   updatedAt:new Date().toISOString()
 }));
}



/* ===== CROSS-DEVICE MIKAEL REVERSE TOKENS ===== */
const MIKAEL_TOKEN_STATE_KEY="mikael:reverse_tokens:v1";
const MIKAEL_REDEMPTION_INDEX_KEY="mikael:redemptions:index:v1";
async function getMikaelTokenState(env){
  const s=await env.LIZZY_CLAIMS.get(MIKAEL_TOKEN_STATE_KEY,{type:"json"});
  return s&&typeof s==="object"?s:{inventory:{},history:[]};
}
async function putMikaelTokenState(env,s){
  await env.LIZZY_CLAIMS.put(MIKAEL_TOKEN_STATE_KEY,JSON.stringify(s));
}
async function getRedemptionIndex(env){
  const x=await env.LIZZY_CLAIMS.get(MIKAEL_REDEMPTION_INDEX_KEY,{type:"json"});
  return Array.isArray(x)?x:[];
}
async function putRedemptionIndex(env,x){
  await env.LIZZY_CLAIMS.put(MIKAEL_REDEMPTION_INDEX_KEY,JSON.stringify(x.slice(-100)));
}
function rid(){return `reverse_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;}

export default{async fetch(req,env){
 if(req.method==="OPTIONS")return json({ok:true});
 const u=new URL(req.url);

 if(req.method==="GET"){
   if(u.searchParams.get("mikaelTokens")==="1"){
     const state=await getMikaelTokenState(env);
     return json({success:true,state});
   }
   if(u.searchParams.get("pendingReverseRedemptions")==="1"){
     const ids=await getRedemptionIndex(env),items=[];
     for(const id of ids){
       const r=await env.LIZZY_CLAIMS.get(`mikael:redemption:${id}`,{type:"json"});
       if(r&&!r.acknowledged)items.push(r);
     }
     return json({success:true,redemptions:items});
   }
   const shelfItem=u.searchParams.get("shelfItem");
   if(shelfItem){
     const state=await env.LIZZY_CLAIMS.get(shelfStateKey(shelfItem),{type:"json"});
     return state?json({success:true,state}):json({success:false,error:"No negotiation yet"},404);
   }
   const claimId=u.searchParams.get("claimId");
   if(claimId){const c=await getClaim(env,claimId);return c?json({success:true,claim:c}):json({success:false,error:"Claim not found"},404);}
   return new Response("💗 LizzyOS Notification System: ONLINE",{headers:{"access-control-allow-origin":"*"}});
 }

 if(u.pathname==="/telegram"&&req.method==="POST"){
   const update=await req.json();
   if(update.callback_query){
     const q=update.callback_query,data=q.data||"",sep=data.indexOf(":");
     if(sep<0)return json({ok:true});
     const action=data.slice(0,sep),claimId=data.slice(sep+1),c=await getClaim(env,claimId);
     await tg(env,"answerCallbackQuery",{callback_query_id:q.id});
     if(!c)return json({ok:true});
     if(action==="accept"){
       c.status="accepted";c.decidedAt=new Date().toISOString();await putClaim(env,c);await putShelfState(env,c);
       await tg(env,"editMessageText",{chat_id:q.message.chat.id,message_id:q.message.message_id,text:`${q.message.text}\n\n━━━━━━━━━━━━━━\n✅ ACCEPTED BY MIKAEL`});
     }else if(action==="reject"){
       c.status="rejected";c.decidedAt=new Date().toISOString();await putClaim(env,c);await putShelfState(env,c);
       await tg(env,"editMessageText",{chat_id:q.message.chat.id,message_id:q.message.message_id,text:`${q.message.text}\n\n━━━━━━━━━━━━━━\n❌ REJECTED BY MIKAEL`});
     }else if(action==="counter"){
       await env.LIZZY_CLAIMS.put(`counter_wait:${q.message.chat.id}`,claimId,{expirationTtl:600});
       await tg(env,"sendMessage",{chat_id:q.message.chat.id,text:`💬 COUNTER OFFER\n\nItem: ${c.item}\nLizzy offered: ${c.offer} MB\n\nReply with your counter amount only. Example: 15`});
     }
     return json({ok:true});
   }
   if(update.message?.text){
     const chat=String(update.message.chat.id),claimId=await env.LIZZY_CLAIMS.get(`counter_wait:${chat}`);
     if(claimId){
       const amount=Math.floor(Number(update.message.text.trim()));
       if(!Number.isFinite(amount)||amount<1){await tg(env,"sendMessage",{chat_id:chat,text:"❌ Send only the MB amount. Example: 15"});return json({ok:true});}
       const c=await getClaim(env,claimId);
       if(c){c.status="countered";c.counterOffer=amount;c.decidedAt=new Date().toISOString();await putClaim(env,c);await putShelfState(env,c);}
       await env.LIZZY_CLAIMS.delete(`counter_wait:${chat}`);
       await tg(env,"sendMessage",{chat_id:chat,text:`💬 COUNTER RECORDED\n\nItem: ${c?.item||"Secret Shelf Item"}\nMikael's counter: ${amount} MB`});
     }
     return json({ok:true});
   }
   return json({ok:true});
 }

 if(req.method!=="POST")return json({error:"Method not allowed"},405);
 const b=await req.json();

 if(b.type==="mikael_reverse_token_award"){
   const name=String(b.name||"").trim(),emoji=String(b.emoji||"🔄"),desc=String(b.desc||"").trim();
   if(!name)return json({success:false,error:"Missing token name"},400);
   const state=await getMikaelTokenState(env);
   state.inventory=state.inventory||{};state.history=Array.isArray(state.history)?state.history:[];
   state.inventory[name]=Number(state.inventory[name]||0)+1;
   state.history.push({type:"earned",token:name,source:String(b.source||"LizzyOS Daily Reward"),at:new Date().toISOString()});
   await putMikaelTokenState(env,state);
   return json({success:true,state});
 }
 if(b.type==="mikael_reverse_token_sync"){
   const local=b.inventory&&typeof b.inventory==="object"?b.inventory:{};
   const state=await getMikaelTokenState(env);
   state.inventory=state.inventory||{};state.history=Array.isArray(state.history)?state.history:[];
   for(const [name,count] of Object.entries(local)){
     const n=Math.max(0,Number(count)||0);
     if(n>Number(state.inventory[name]||0))state.inventory[name]=n;
   }
   state.history.push({type:"legacy_sync",at:new Date().toISOString()});
   await putMikaelTokenState(env,state);
   return json({success:true,state});
 }
 if(b.type==="mikael_reverse_token_test"){
   const redemption={id:rid(),name:String(b.name||"Reverse Token Test"),emoji:String(b.emoji||"🧪"),desc:String(b.desc||"Cross-device test."),remaining:0,redeemedAt:new Date().toISOString(),acknowledged:false,test:true};
   await env.LIZZY_CLAIMS.put(`mikael:redemption:${redemption.id}`,JSON.stringify(redemption),{expirationTtl:86400});
   const ids=await getRedemptionIndex(env);ids.push(redemption.id);await putRedemptionIndex(env,ids);
   return json({success:true,redemption});
 }
 if(b.type==="mikael_reverse_token_redeem"){
   const name=String(b.name||"").trim();
   const state=await getMikaelTokenState(env);
   state.inventory=state.inventory||{};state.history=Array.isArray(state.history)?state.history:[];
   const count=Number(state.inventory[name]||0);
   if(count<1)return json({success:false,error:"No token available"},409);
   state.inventory[name]=count-1;
   const redemption={id:rid(),name,emoji:String(b.emoji||"🔄"),desc:String(b.desc||""),remaining:state.inventory[name],redeemedAt:new Date().toISOString(),acknowledged:false};
   state.history.push({type:"redeemed",token:name,at:redemption.redeemedAt,redemptionId:redemption.id});
   await putMikaelTokenState(env,state);
   await env.LIZZY_CLAIMS.put(`mikael:redemption:${redemption.id}`,JSON.stringify(redemption),{expirationTtl:2592000});
   const ids=await getRedemptionIndex(env);ids.push(redemption.id);await putRedemptionIndex(env,ids);
   await tg(env,"sendMessage",{chat_id:env.TELEGRAM_CHAT_ID,text:`🔄 MIKAEL REVERSE TOKEN REDEEMED\\n\\n${redemption.emoji} ${name}\\n${redemption.desc}\\n\\nRemaining: ×${redemption.remaining}`});
   return json({success:true,state,redemption});
 }
 if(b.type==="mikael_reverse_token_ack"){
   const id=String(b.id||"").trim();
   const key=`mikael:redemption:${id}`;
   const r=await env.LIZZY_CLAIMS.get(key,{type:"json"});
   if(!r)return json({success:false,error:"Redemption not found"},404);
   r.acknowledged=true;r.acknowledgedAt=new Date().toISOString();
   await env.LIZZY_CLAIMS.put(key,JSON.stringify(r),{expirationTtl:2592000});
   return json({success:true});
 }

 if(b.type==="secret_shelf_bid"){
   const names={
     letter_002:"Unreleased Letter #002",
     mystery_reward:"Mystery Reward",
     archive_x17:"Sealed Archive X-17 [Cody Legal Documents]"
   };
   if(!names[b.item])return json({success:false,error:"Unknown Secret Shelf item"},400);
   const offer=Math.floor(Number(b.offer));
   if(!Number.isFinite(offer)||offer<1)return json({success:false,error:"Invalid offer"},400);
   const c={claimId:id(),type:"secret_shelf_bid",item:names[b.item],itemId:b.item,offer,status:"pending",counterOffer:null,createdAt:new Date().toISOString()};
   await putClaim(env,c);
   await putShelfState(env,c);
   await tg(env,"sendMessage",{chat_id:env.TELEGRAM_CHAT_ID,text:`🛒 LIZZYOS SECRET SHELF / VAULT\n\n💌 NEW OFFER\n\nItem: ${c.item}\nLizzy's Offer: ${offer} MB\n\nStatus: ⏳ PENDING\n\nClaim ID:\n${c.claimId}`,reply_markup:{inline_keyboard:[[{text:"✅ ACCEPT",callback_data:`accept:${c.claimId}`},{text:"❌ REJECT",callback_data:`reject:${c.claimId}`}],[{text:"💬 COUNTER",callback_data:`counter:${c.claimId}`}]]}});
   return json({success:true,claimId:c.claimId,status:"pending"});
 }

 // Existing normal LizzyOS notifications remain unchanged in spirit: simple Telegram messages.
 const type=b.type||"LIZZYOS",title=b.title||"Notification",details=b.details||"";
 await tg(env,"sendMessage",{chat_id:env.TELEGRAM_CHAT_ID,text:`${type}\n\n${title}\n${details}`});
 return json({ok:true});
}};