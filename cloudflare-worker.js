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
async function putClaim(env,c){await env.LIZZY_CLAIMS.put(`claim:${c.claimId}`,JSON.stringify(c),{expirationTtl:2592000});}
const id=()=>`bid_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;


async function getMail(env,mailId){return env.LIZZY_CLAIMS.get(`mail:${mailId}`,{type:"json"});}
async function putMail(env,m){await env.LIZZY_CLAIMS.put(`mail:${m.mailId}`,JSON.stringify(m),{expirationTtl:15552000});}
async function mailIndex(env){
 const x=await env.LIZZY_CLAIMS.get("mail:index",{type:"json"});
 return Array.isArray(x)?x:[];
}
async function addMailIndex(env,mailId){
 const x=await mailIndex(env);const next=[mailId,...x.filter(v=>v!==mailId)].slice(0,50);
 await env.LIZZY_CLAIMS.put("mail:index",JSON.stringify(next),{expirationTtl:15552000});
}
const mailId=()=>`mail_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;

export default{async fetch(req,env){
 if(req.method==="OPTIONS")return json({ok:true});
 const u=new URL(req.url);

 if(req.method==="GET"){
   if(u.searchParams.get("mailInbox")==="1"){
     const ids=await mailIndex(env),messages=[];
     for(const mid of ids){const m=await getMail(env,mid);if(m)messages.push(m);}
     return json({success:true,messages});
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
       c.status="accepted";c.decidedAt=new Date().toISOString();await putClaim(env,c);
       await tg(env,"editMessageText",{chat_id:q.message.chat.id,message_id:q.message.message_id,text:`${q.message.text}\n\n━━━━━━━━━━━━━━\n✅ ACCEPTED BY MIKAEL`});
     }else if(action==="reject"){
       c.status="rejected";c.decidedAt=new Date().toISOString();await putClaim(env,c);
       await tg(env,"editMessageText",{chat_id:q.message.chat.id,message_id:q.message.message_id,text:`${q.message.text}\n\n━━━━━━━━━━━━━━\n❌ REJECTED BY MIKAEL`});
     }else if(action==="counter"){
       await env.LIZZY_CLAIMS.put(`counter_wait:${q.message.chat.id}`,claimId,{expirationTtl:600});
       await tg(env,"sendMessage",{chat_id:q.message.chat.id,text:`💬 COUNTER OFFER\n\nItem: ${c.item}\nLizzy offered: ${c.offer} MB\n\nReply with your counter amount only. Example: 15`});
     }
     return json({ok:true});
   }
   if(update.message?.text){
     const chat=String(update.message.chat.id);
     const repliedText=update.message.reply_to_message?.text||"";
     const mailMatch=repliedText.match(/\[LIZZYMAIL:([^\]]+)\]/);
     if(mailMatch){
       const mid=mailMatch[1],m=await getMail(env,mid);
       if(m){
         m.reply=update.message.text.trim();
         m.repliedAt=new Date().toISOString();
         await putMail(env,m);
         await tg(env,"sendMessage",{chat_id:chat,text:`💌 REPLY DELIVERED TO LIZZYOS\n\nYour reply:\n${m.reply}`});
       }else{
         await tg(env,"sendMessage",{chat_id:chat,text:"❌ I couldn't find that Lizzy Mail message anymore."});
       }
       return json({ok:true});
     }
     const claimId=await env.LIZZY_CLAIMS.get(`counter_wait:${chat}`);
     if(claimId){
       const amount=Math.floor(Number(update.message.text.trim()));
       if(!Number.isFinite(amount)||amount<1){await tg(env,"sendMessage",{chat_id:chat,text:"❌ Send only the MB amount. Example: 15"});return json({ok:true});}
       const c=await getClaim(env,claimId);
       if(c){c.status="countered";c.counterOffer=amount;c.decidedAt=new Date().toISOString();await putClaim(env,c);}
       await env.LIZZY_CLAIMS.delete(`counter_wait:${chat}`);
       await tg(env,"sendMessage",{chat_id:chat,text:`💬 COUNTER RECORDED\n\nItem: ${c?.item||"Secret Shelf Item"}\nMikael's counter: ${amount} MB`});
     }
     return json({ok:true});
   }
   return json({ok:true});
 }

 if(req.method!=="POST")return json({error:"Method not allowed"},405);
 const b=await req.json();

 if(b.type==="lizzy_mail"){
   const message=String(b.message||"").trim();
   if(!message)return json({success:false,error:"Message is empty"},400);
   if(message.length>800)return json({success:false,error:"Message too long"},400);
   const m={mailId:mailId(),message,createdAt:new Date().toISOString(),reply:null,repliedAt:null};
   await putMail(env,m);await addMailIndex(env,m.mailId);
   const sent=await tg(env,"sendMessage",{
     chat_id:env.TELEGRAM_CHAT_ID,
     text:`💌 LIZZY MAIL\\n\\nLizzy sent you a message:\\n\\n${message}\\n\\n━━━━━━━━━━━━━━\\nReply directly to THIS Telegram message and your reply will appear in LizzyOS.\\n\\n[LIZZYMAIL:${m.mailId}]`
   });
   if(!sent?.ok)return json({success:false,error:"Telegram send failed"},502);
   return json({success:true,mailId:m.mailId});
 }

 if(b.type==="secret_shelf_bid"){
   const names={letter_001:"Unreleased Letter #001",mystery_reward:"Mystery Reward"};
   if(!names[b.item])return json({success:false,error:"Unknown Secret Shelf item"},400);
   const offer=Math.floor(Number(b.offer));
   if(!Number.isFinite(offer)||offer<1)return json({success:false,error:"Invalid offer"},400);
   const c={claimId:id(),type:"secret_shelf_bid",item:names[b.item],itemId:b.item,offer,status:"pending",counterOffer:null,createdAt:new Date().toISOString()};
   await putClaim(env,c);
   await tg(env,"sendMessage",{chat_id:env.TELEGRAM_CHAT_ID,text:`🛒 LIZZYOS SECRET SHELF\n\n💌 NEW OFFER\n\nItem: ${c.item}\nLizzy's Offer: ${offer} MB\n\nStatus: ⏳ PENDING\n\nClaim ID:\n${c.claimId}`,reply_markup:{inline_keyboard:[[{text:"✅ ACCEPT",callback_data:`accept:${c.claimId}`},{text:"❌ REJECT",callback_data:`reject:${c.claimId}`}],[{text:"💬 COUNTER",callback_data:`counter:${c.claimId}`}]]}});
   return json({success:true,claimId:c.claimId,status:"pending"});
 }

 // Existing normal LizzyOS notifications remain unchanged in spirit: simple Telegram messages.
 const type=b.type||"LIZZYOS",title=b.title||"Notification",details=b.details||"";
 await tg(env,"sendMessage",{chat_id:env.TELEGRAM_CHAT_ID,text:`${type}\n\n${title}\n${details}`});
 return json({ok:true});
}};