/* LizzyOS — Messages from Mikael + Synced Feelings (Today's Connection) */
(()=>{"use strict";
const WORKER=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
const SEEN_KEY="lizzyMikaelMessagesSeenV1";

const seen=()=>{try{let x=JSON.parse(localStorage.getItem(SEEN_KEY)||"[]");return Array.isArray(x)?x:[]}catch{return[]}};
const saveSeen=x=>localStorage.setItem(SEEN_KEY,JSON.stringify([...new Set(x)].slice(-500)));

async function post(body){const r=await fetch(WORKER,{method:"POST",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:JSON.stringify(body)});return r.json()}
async function pendingMessages(){const r=await fetch(WORKER+"?pendingLizzyMessages=1",{cache:"no-store"});const d=await r.json();return d?.success&&Array.isArray(d.messages)?d.messages:[]}
async function mikaelMood(){const r=await fetch(WORKER+"?mikaelMood=1",{cache:"no-store"});const d=await r.json();return d?.success?d.mood:null}

/* ---------- Messages from Mikael (popup, one at a time) ---------- */
function ensureMsgUI(){if(document.getElementById("mikaelMessagePopup"))return;const e=document.createElement("div");e.id="mikaelMessagePopup";e.style.cssText="position:fixed;left:50%;top:22px;transform:translate(-50%,-140%);z-index:100010;max-width:360px;width:90%;transition:transform .5s ease;font-family:inherit";document.body.appendChild(e)}
let showing=false;
async function renderMessages(){
 if(showing)return;
 ensureMsgUI();
 const box=document.getElementById("mikaelMessagePopup");
 try{
  const seenIds=seen();
  const items=(await pendingMessages()).filter(m=>!seenIds.includes(m.id));
  if(!items.length){box.style.transform="translate(-50%,-140%)";return}
  const m=items[0];
  showing=true;
  box.innerHTML=`<div style="background:linear-gradient(155deg,#1a0e22,#2a1436);color:#ffe0f2;border:2px solid #ff6fb5;border-radius:20px;padding:18px 20px;box-shadow:0 20px 50px rgba(255,111,181,.35),0 0 24px rgba(255,111,181,.2);text-align:center">
    <div style="font-weight:900;font-size:13px;letter-spacing:.5px;color:#ff9fcc;margin-bottom:8px">💌 A MESSAGE FROM MIKAEL</div>
    <div style="font-size:15px;line-height:1.5;margin-bottom:14px">${String(m.text).replace(/</g,"&lt;")}</div>
    <button id="mikaelMsgOk" style="border:2px solid #ff6fb5;border-radius:12px;padding:9px 18px;font-weight:900;cursor:pointer;background:#0d0611;color:#ff9fcc">💗 Got it</button>
  </div>`;
  requestAnimationFrame(()=>box.style.transform="translate(-50%,0)");
  document.getElementById("mikaelMsgOk").onclick=async()=>{
   box.style.transform="translate(-50%,-140%)";
   saveSeen([...seenIds,m.id]);
   try{await post({type:"lizzy_message_seen",id:m.id})}catch(e){}
   showing=false;
   setTimeout(renderMessages,600);
  };
 }catch(e){console.warn("Pending messages failed",e);showing=false}
}

/* ---------- Today's Connection (mood comparison) ---------- */
function readLizzyMood(){
 try{
  const raw=localStorage.getItem("lizzyLivingMoodV1");
  if(!raw)return null;
  const v=JSON.parse(raw);
  const today=new Date().toISOString().slice(0,10);
  return v&&v.day===today?v:null;
 }catch{return null}
}
function isMutual(lizzyLabel,mikaelText){
 if(!lizzyLabel||!mikaelText)return false;
 const norm=s=>s.toLowerCase();
 const keywords=["miss","love","thinking of you","soft","happy"];
 const l=norm(lizzyLabel),m=norm(mikaelText);
 return keywords.some(k=>l.includes(k)&&m.includes(k));
}
async function renderConnection(){
 const panel=document.getElementById("connectionPanel");
 if(!panel)return;
 const lizzy=readLizzyMood();
 const mikael=await mikaelMood().catch(()=>null);
 const lizzyText=lizzy?lizzy.label:"Not selected yet today";
 const mikaelText=mikael?mikael.text:"Hasn't shared a mood yet";
 const mutual=isMutual(lizzy?.label,mikael?.text);
 panel.innerHTML=`
  <div class="connectionRow"><span>YOU</span><strong>${lizzyText.replace(/</g,"&lt;")}</strong></div>
  <div class="connectionRow"><span>MIKAEL</span><strong>${mikaelText.replace(/</g,"&lt;")}</strong></div>
  <div class="connectionStatus ${mutual?"mutual":""}">${mutual?"💗 STATUS: Mutual":"STATUS: Two different days, same team"}</div>
 `;
}

window.renderMikaelMessages=renderMessages;
window.renderTodaysConnection=renderConnection;

document.getElementById("connectionIcon")?.addEventListener("click",()=>{
 document.getElementById("connectionWindow")?.classList.remove("hidden");
 renderConnection();
});
["connectionClose","closeConnection"].forEach(id=>
 document.getElementById(id)?.addEventListener("click",()=>document.getElementById("connectionWindow")?.classList.add("hidden"))
);

window.addEventListener("load",()=>setTimeout(renderMessages,1600));
window.addEventListener("focus",renderMessages);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")renderMessages()});
setInterval(renderMessages,60000);
window.addEventListener("lizzyMoodChanged",renderConnection);
})();
