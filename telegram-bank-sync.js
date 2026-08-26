/* LizzyOS claimable Telegram deposits — device wallets stay separate */
(()=>{"use strict";
const WALLET_KEY="lizzyMickyBucsV1",APPLIED_KEY="lizzyTelegramDepositsAppliedV2";
const WORKER=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
const wallet=()=>Math.max(0,Math.floor(Number(localStorage.getItem(WALLET_KEY))||0));
const setWallet=n=>{n=Math.max(0,Math.floor(Number(n)||0));localStorage.setItem(WALLET_KEY,String(n));window.dispatchEvent(new CustomEvent("mickyBucsBalanceChanged",{detail:{balance:n,source:"telegram_claim"}}));window.dispatchEvent(new Event("lizzyStoreRefresh"));return n};
const applied=()=>{try{let x=JSON.parse(localStorage.getItem(APPLIED_KEY)||"[]");return Array.isArray(x)?x:[]}catch{return[]}};
const saveApplied=x=>localStorage.setItem(APPLIED_KEY,JSON.stringify([...new Set(x)].slice(-500)));
async function post(body){const r=await fetch(WORKER,{method:"POST",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:JSON.stringify(body)});const d=await r.json();return d}
async function pending(){const r=await fetch(WORKER+"?pendingMickyDeposits=1",{cache:"no-store"});const d=await r.json();return d?.success&&Array.isArray(d.deposits)?d.deposits:[]}
function ensureUI(){if(document.getElementById("telegramDepositTray"))return;const e=document.createElement("div");e.id="telegramDepositTray";e.style.cssText="position:fixed;right:18px;bottom:78px;z-index:99999;max-width:340px;font-family:inherit";document.body.appendChild(e)}
async function render(){
 ensureUI();const tray=document.getElementById("telegramDepositTray");
 try{const items=await pending();if(!items.length){tray.innerHTML="";return}
tray.innerHTML=items.map(d=>`<div style="background:#050505 !important;color:#b968ff !important;border:2px solid #8f35e8 !important;border-radius:18px !important;padding:14px 16px !important;margin-top:10px !important;box-shadow:0 10px 30px rgba(143,53,232,.35),0 0 18px rgba(185,104,255,.25) !important"><div style="font-weight:900 !important;font-size:16px !important;color:#c77dff !important">💰 Incoming Micky Bank Deposit</div><div style="margin:6px 0 10px !important;color:#b968ff !important">Mikael deposited <b style="color:#d7a6ff !important">${Math.floor(Number(d.amount)||0)} MB</b></div><button data-claim-mb="${d.id}" style="background:#080808 !important;color:#c77dff !important;border:2px solid #9b4dff !important;border-radius:12px !important;padding:9px 14px !important;font-weight:900 !important;cursor:pointer !important;box-shadow:0 0 12px rgba(155,77,255,.30) !important">Claim Deposit</button></div>`).join("");
 tray.querySelectorAll("[data-claim-mb]").forEach(b=>b.onclick=()=>claim(b.dataset.claimMb,b));
 }catch(e){console.warn("Pending deposits failed",e)}
}
async function claim(id,button){
 button.disabled=true;button.textContent="Claiming…";
 try{
  const seen=applied();if(seen.includes(id)){await render();return}
  const res=await post({type:"micky_bank_claim_one",id,walletBefore:wallet()});
  if(!res?.success){button.textContent=res?.alreadyClaimed?"Already claimed":"Try Again";setTimeout(render,1000);return}
  saveApplied([...seen,id]);const after=setWallet(wallet()+Number(res.amount||0));
  await post({type:"micky_bank_claim_confirm",id,walletAfter:after});
  button.textContent=`Claimed +${res.amount} MB ✓`;setTimeout(render,1200);
 }catch(e){console.warn(e);button.disabled=false;button.textContent="Try Claim Again"}
}
window.renderPendingMickyDeposits=render;
window.addEventListener("load",()=>setTimeout(render,1200));window.addEventListener("focus",render);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")render()});setInterval(render,60000);
})();
