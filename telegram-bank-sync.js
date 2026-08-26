/* LizzyOS — Telegram Micky Bank Sync
   Additive file: does not replace your main script.js.
   Wallet key verified from current LizzyOS: lizzyMickyBucsV1
*/
(()=>{
"use strict";
const WALLET_KEY="lizzyMickyBucsV1";
const APPLIED_KEY="lizzyTelegramDepositsAppliedV1";
const WORKER=window.LIZZY_TELEGRAM_WORKER_URL || "https://lizzyos-notifications.mulaudzimikael73.workers.dev/";

const wallet=()=>Math.max(0,Math.floor(Number(localStorage.getItem(WALLET_KEY))||0));
const setWallet=n=>{
  const value=Math.max(0,Math.floor(Number(n)||0));
  localStorage.setItem(WALLET_KEY,String(value));
  window.dispatchEvent(new CustomEvent("mickyBucsBalanceChanged",{detail:{balance:value,source:"telegram_deposit"}}));
  window.dispatchEvent(new Event("lizzyStoreRefresh"));
  return value;
};
const applied=()=>{
  try{const x=JSON.parse(localStorage.getItem(APPLIED_KEY)||"[]");return Array.isArray(x)?x:[]}catch{return []}
};
const saveApplied=ids=>localStorage.setItem(APPLIED_KEY,JSON.stringify([...new Set(ids)].slice(-500)));

async function post(body){
  const r=await fetch(WORKER,{method:"POST",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:JSON.stringify(body)});
  if(!r.ok)throw new Error("Worker HTTP "+r.status);
  return r.json();
}

async function syncWalletOnly(){
  try{await post({type:"micky_bank_wallet_sync",wallet:wallet()})}catch(e){console.warn("Micky Bank wallet sync failed",e)}
}

async function collectTelegramDeposits(){
  try{
    const r=await fetch(WORKER+(WORKER.includes("?")?"&":"?")+"pendingMickyDeposits=1",{cache:"no-store"});
    if(!r.ok)return;
    const data=await r.json();
    if(!data?.success||!Array.isArray(data.deposits))return;

    const seen=applied(),seenSet=new Set(seen);
    const fresh=data.deposits.filter(d=>d?.id&&!seenSet.has(String(d.id))&&Number(d.amount)>0);
    if(!fresh.length){await syncWalletOnly();return;}

    const ids=fresh.map(d=>String(d.id));
    const total=fresh.reduce((n,d)=>n+Math.max(0,Math.floor(Number(d.amount)||0)),0);

    // Record locally first so a refresh cannot apply the same deposit twice.
    saveApplied([...seen,...ids]);
    const after=setWallet(wallet()+total);

    try{
      const ack=await post({type:"micky_bank_claim_deposits",ids,walletAfter:after});
      if(!ack?.success)throw new Error("Deposit acknowledgement failed");
    }catch(e){
      // Keep local IDs marked as applied to protect the wallet from double-crediting.
      console.warn("Deposit was applied locally but server acknowledgement is pending.",e);
    }
  }catch(e){console.warn("Telegram deposit collection failed",e)}
}

window.collectTelegramMickyBucs=collectTelegramDeposits;
window.syncMickyBankWallet=syncWalletOnly;

window.addEventListener("load",()=>setTimeout(collectTelegramDeposits,1200));
window.addEventListener("focus",collectTelegramDeposits);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")collectTelegramDeposits()});
setInterval(collectTelegramDeposits,60000);
})();
