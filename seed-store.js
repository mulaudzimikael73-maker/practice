
(() => {
"use strict";
const $=id=>document.getElementById(id);
const KEYS={
 wallet:"lizzyMickyBucsV1",
 jobs:"lizzyMickyJobsV1",
 allowance:"lizzyMickyDailyAllowanceV1",
 activity:"lizzyMickyActivityV1"
};
const JOBS=[{"id": "visit_garden", "title": "Visit Lizzy's Garden", "reward": 2, "desc": "Open the Garden today."}, {"id": "water_one", "title": "Water one plant", "reward": 3, "desc": "Give one Garden plant some water."}, {"id": "water_two", "title": "Water two plants", "reward": 5, "desc": "Water two plants today."}, {"id": "water_three", "title": "Water three plants", "reward": 5, "desc": "Water three plants today."}, {"id": "plant_seed", "title": "Plant a seed", "reward": 5, "desc": "Plant any seed in an empty Garden plot."}, {"id": "plant_two", "title": "Plant two seeds", "reward": 7, "desc": "Plant two seeds today."}, {"id": "check_plant", "title": "Check on a plant", "reward": 3, "desc": "Use the Garden check button."}, {"id": "collect_flower", "title": "Grow or collect a flower", "reward": 5, "desc": "Add a flower to the Garden collection."}, {"id": "visit_store", "title": "Window shopping", "reward": 2, "desc": "Open the Seed Store."}, {"id": "buy_seed", "title": "Buy any seed", "reward": 3, "desc": "Make one Seed Store purchase."}, {"id": "play_mikhail", "title": "Complete Mikhail Quiz", "reward": 5, "desc": "Finish any Mikhail Quiz level."}, {"id": "perfect_mikhail", "title": "Perfect Mikhail Quiz", "reward": 8, "desc": "Get a perfect score."}, {"id": "play_would", "title": "Complete Would Mikael Rather?", "reward": 5, "desc": "Finish today's five questions."}, {"id": "perfect_would", "title": "Perfect Would Mikael Rather?", "reward": 8, "desc": "Score 5/5."}, {"id": "play_crack", "title": "Complete a Crack the Code mission", "reward": 7, "desc": "Finish any Crack the Code mission."}, {"id": "play_ttt", "title": "Play Tic-Tac-Toe", "reward": 3, "desc": "Finish a Tic-Tac-Toe game."}, {"id": "win_ttt", "title": "Beat Mikael at Tic-Tac-Toe", "reward": 7, "desc": "Win a Tic-Tac-Toe game."}, {"id": "play_heart", "title": "Play Heart Catch", "reward": 3, "desc": "Complete a Heart Catch round."}, {"id": "play_lizzy_quiz", "title": "Complete Lizzy Quiz", "reward": 5, "desc": "Finish the Lizzy Quiz."}, {"id": "play_two_games", "title": "Play two different games", "reward": 7, "desc": "Complete two different games today."}, {"id": "play_three_games", "title": "Game Night", "reward": 10, "desc": "Complete three different games today."}, {"id": "daily_reward", "title": "Claim Daily Reward", "reward": 3, "desc": "Open today's Daily Mystery reward."}, {"id": "streak_check", "title": "Protect the streak", "reward": 3, "desc": "Visit the Daily Reward screen today."}, {"id": "open_token_jar", "title": "Check the Token Jar", "reward": 2, "desc": "Open Lizzy's Token Jar."}, {"id": "redeem_token", "title": "Redeem a token", "reward": 5, "desc": "Use any token from the Jar."}, {"id": "open_readme", "title": "Read Me check-in", "reward": 2, "desc": "Open Read Me."}, {"id": "open_date", "title": "Visit Our Date", "reward": 2, "desc": "Open the Our Date folder."}, {"id": "open_letter", "title": "Open an Open When letter", "reward": 3, "desc": "Read any Open When letter."}, {"id": "open_mission", "title": "Check Mission Log", "reward": 2, "desc": "Open the Mission Log."}, {"id": "open_recycle", "title": "Inspect the Recycle Bin", "reward": 2, "desc": "Check what LizzyOS has rejected today."}, {"id": "nice_mikael", "title": "Say one nice thing about Mikael", "reward": 5, "desc": "Self-confirmed. Difficulty may vary 😂."}, {"id": "no_hating", "title": "Five-minute Hater Break", "reward": 5, "desc": "Go five minutes without hating on Mikael. Self-confirmed."}, {"id": "compliment", "title": "Give Mikael a compliment", "reward": 5, "desc": "A genuine one. Yes, LizzyOS is serious."}, {"id": "mikael_joke", "title": "Laugh at one of Mikael's jokes", "reward": 5, "desc": "Self-confirmed. Pity laughs technically count."}, {"id": "hydrate", "title": "Drink some water", "reward": 3, "desc": "Hydration mission. Self-confirmed."}, {"id": "stretch", "title": "Quick stretch", "reward": 3, "desc": "Do a short stretch. Self-confirmed."}, {"id": "smile", "title": "Smile mission", "reward": 3, "desc": "Find one reason to smile today."}, {"id": "song", "title": "Play a favourite song", "reward": 3, "desc": "Listen to one song you love."}, {"id": "pasta_thought", "title": "Think about pasta", "reward": 2, "desc": "Probably the easiest job on the board."}, {"id": "pink_spot", "title": "Spot something pink", "reward": 3, "desc": "Find something pink in real life."}, {"id": "kind_act", "title": "Do one kind thing", "reward": 5, "desc": "Any small kind act counts."}, {"id": "message_mikael", "title": "Send Mikael a nice message", "reward": 5, "desc": "Self-confirmed."}, {"id": "roast_mikael", "title": "Roast Mikael creatively", "reward": 5, "desc": "One creative roast. Keep it harmless 😂."}, {"id": "beat_score", "title": "Try to beat a game score", "reward": 5, "desc": "Make one serious attempt."}, {"id": "garden_photo", "title": "Admire the Garden", "reward": 2, "desc": "Spend a moment checking your plants."}, {"id": "choose_flower", "title": "Pick today's favourite flower", "reward": 3, "desc": "Choose your favourite flower in the Garden."}, {"id": "organize_tokens", "title": "Token inventory check", "reward": 2, "desc": "Look through the Token Jar."}, {"id": "date_idea", "title": "Think of a future date idea", "reward": 5, "desc": "Self-confirmed."}, {"id": "little_attitude", "title": "Little Miss Attitude challenge", "reward": 5, "desc": "Deliver one iconic but harmless attitude moment."}, {"id": "lizzyos_tour", "title": "LizzyOS Tour", "reward": 7, "desc": "Visit the Garden, Games folder and Token Jar today."}];
const SEEDS=[
 {id:"tulipSeed",name:"Tulip Seed",emoji:"🌷",price:3},
 {id:"roseSeed",name:"Rose Seed",emoji:"🌹",price:4},
 {id:"sunflowerSeed",name:"Sunflower Seed",emoji:"🌻",price:4},
 {id:"snapdragonSeed",name:"Snapdragon Seed",emoji:"🌺",price:5},
 {id:"lavenderSeed",name:"Lavender Seed",emoji:"🪻",price:5},
 {id:"lilySeed",name:"Lily of the Valley Seed",emoji:"🤍",price:7},
 {id:"cryingLilySeed",name:"Crying Lily Seed",emoji:"🥀",price:8},
 {id:"orchidSeed",name:"Orchid Seed",emoji:"🌸",price:9},
 {id:"mysterySeed",name:"Mystery Seed",emoji:"❓",price:12},
 {id:"moonSeed",name:"Moonflower Seed",emoji:"🌙",price:20}
];
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`};
const read=(k,f)=>{try{let v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(e){return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const balance=()=>Number(localStorage.getItem(KEYS.wallet)||0);
const setBalance=n=>localStorage.setItem(KEYS.wallet,String(Math.max(0,n)));
function notify(type,title,details){if(typeof window.lizzyTelegramNotify==="function")return window.lizzyTelegramNotify(type,title,details);if(typeof lizzyTelegramNotify==="function")return lizzyTelegramNotify(type,title,details);return Promise.resolve(false)}
function hash(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function dailyJobs(){
 let state=read(KEYS.jobs,{date:"",selected:[],completed:{}});
 if(state.date!==today()){
   const ranked=[...JOBS].sort((a,b)=>(hash(today()+a.id)%100000)-(hash(today()+b.id)%100000));
   state={date:today(),selected:ranked.slice(0,5).map(x=>x.id),completed:{}};
   write(KEYS.jobs,state);
 }
 return state;
}
function render(){
 if($("mickyBalance"))$("mickyBalance").textContent=balance();
 const state=dailyJobs();
 const host=$("mickyJobsList");
 if(host)host.innerHTML=state.selected.map(id=>{
   const j=JOBS.find(x=>x.id===id),done=!!state.completed[id];
   return `<div class="mickyJobCard ${done?"completed":""}"><h4>🎯 ${j.title}</h4><p>${j.desc}</p><div class="mickyJobReward">💵 +${j.reward} MB</div><button data-job="${j.id}" ${done?"disabled":""}>${done?"Completed ✓":"Mark Complete"}</button></div>`;
 }).join("");
 host?.querySelectorAll("[data-job]").forEach(b=>b.onclick=()=>completeJob(b.dataset.job));
 const shop=$("seedShopList");
 if(shop)shop.innerHTML=SEEDS.map(s=>`<div class="seedShopCard"><h4>${s.emoji} ${s.name}</h4><div class="seedPrice">💵 ${s.price} MB</div><button data-buy="${s.id}">Buy Seed</button></div>`).join("");
 shop?.querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>buySeed(b.dataset.buy));
 const claimed=localStorage.getItem(KEYS.allowance)===today();
 if($("claimMickyAllowance")){$("claimMickyAllowance").disabled=claimed;$("claimMickyAllowance").textContent=claimed?"Daily 2 MB Claimed ✓":"Claim Daily +2 MB"}
}
function completeJob(id){
 const state=dailyJobs(),j=JOBS.find(x=>x.id===id);
 if(!j||!state.selected.includes(id)||state.completed[id])return;
 state.completed[id]={at:new Date().toISOString(),reward:j.reward};
 write(KEYS.jobs,state);setBalance(balance()+j.reward);
 if($("seedStoreStatus"))$("seedStoreStatus").textContent=`✅ Job complete! +${j.reward} MB`;
 notify("💼 MICKY BUCS JOB COMPLETED",j.title,`Status: COMPLETED\nEarned: +${j.reward} MB\nNew Balance: ${balance()} MB\nDate: ${today()}`);
 render();
}
function claimAllowance(){
 if(localStorage.getItem(KEYS.allowance)===today())return;
 localStorage.setItem(KEYS.allowance,today());setBalance(balance()+2);
 if($("mickyAllowanceStatus"))$("mickyAllowanceStatus").textContent="💵 Daily allowance claimed: +2 MB";
 notify("💵 DAILY MICKY BUCS","Daily Allowance Claimed",`Lizzy claimed +2 MB\nNew balance: ${balance()} MB\nDate: ${today()}`);
 render();
}
function buySeed(id){
 const s=SEEDS.find(x=>x.id===id);if(!s)return;
 if(balance()<s.price){if($("seedStoreStatus"))$("seedStoreStatus").textContent=`😭 Not enough Micky Bucs. You need ${s.price} MB.`;return}
 // ADD to the existing Garden only. Never recreate/reset Garden progress.
 const garden=read("lizzyGardenV1",null);
 if(!garden||typeof garden!=="object"){if($("seedStoreStatus"))$("seedStoreStatus").textContent="Garden data wasn't found, so no purchase was made.";return}
 garden.seeds=garden.seeds||{};
 garden.seeds[id]=Number(garden.seeds[id]||0)+1;
 write("lizzyGardenV1",garden);setBalance(balance()-s.price);
 if($("seedStoreStatus"))$("seedStoreStatus").textContent=`🌱 Purchased ${s.name}! Check Lizzy's Garden.`;
 notify("🛍️ SEED STORE PURCHASE",`${s.emoji} ${s.name}`,`Quantity: 1\nPaid: ${s.price} MB\nRemaining balance: ${balance()} MB\nGarden inventory updated successfully.`);
 window.dispatchEvent(new CustomEvent("lizzySeedStorePurchase",{detail:{seed:s.id,name:s.name,price:s.price}}));
 render();
}
function openStore(){$("seedStoreWindow")?.classList.remove("hidden");render()}
function closeStore(){$("seedStoreWindow")?.classList.add("hidden")}
$("seedStoreIcon")?.addEventListener("click",openStore);
$("seedStoreClose")?.addEventListener("click",closeStore);
$("closeSeedStore")?.addEventListener("click",closeStore);
$("claimMickyAllowance")?.addEventListener("click",claimAllowance);
render();
})();


/* =========================================================
   STORE EXPANSION V2 — VERIFIED JOBS + BANK + EXTRAS
   IMPORTANT: this module NEVER initializes/overwrites:
   lizzyMickyBucsV1, lizzyMickyJobsV1, lizzyGardenV1,
   lizzyTokenJarV1, lizzyMysteryStreak.
   ========================================================= */
(() => {
"use strict";
const $=id=>document.getElementById(id);
const V2={
 bank:"lizzyMickyBankV1", stats:"lizzyMickyStatsV1",
 achievements:"lizzyMickyAchievementsV1", extras:"lizzyStoreExtrasV1",
 pending:"lizzyMickyPendingClaimsV1", proof:"lizzyMickyProofV1"
};
const WALLET="lizzyMickyBucsV1", JOBSKEY="lizzyMickyJobsV1";
const WORKER=window.LIZZY_TELEGRAM_WORKER_URL || "https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(e){return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const wallet=()=>Number(localStorage.getItem(WALLET)||0);
const setWallet=n=>localStorage.setItem(WALLET,String(Math.max(0,n)));
const dateKey=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`};
const uid=()=>`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`;

function stat(name,amount=1){
 const s=read(V2.stats,{earned:0,spent:0,purchases:0,jobs:0});
 s[name]=Number(s[name]||0)+amount; write(V2.stats,s); checkAchievements();
}
function notify(type,title,details){
 if(typeof window.lizzyTelegramNotify==="function") return window.lizzyTelegramNotify(type,title,details);
 return Promise.resolve(false);
}

/* ---- Verified completion engine ----
   Website actions are auto-verified.
   Real-world tasks submit a claim to Mikael instead of paying instantly.
*/
const AUTO_MAP={
 visit_garden:"garden_open", open_token_jar:"token_jar_open",
 daily_reward:"daily_reward", streak_check:"daily_reward",
 play_would:"would_rather_complete", play_crack:"crack_complete",
 visit_store:"store_open", buy_seed:"store_purchase"
};
function currentJobs(){return read(JOBSKEY,{date:"",selected:[],completed:{}})}
function rewardFor(id){
 // Read reward from cards rendered by original module to avoid replacing its 50-job catalogue.
 const btn=document.querySelector(`[data-job="${CSS.escape(id)}"]`);
 const card=btn?.closest(".mickyJobCard");
 const m=card?.querySelector(".mickyJobReward")?.textContent.match(/\+(\d+)/);
 return m?Number(m[1]):5;
}
function titleFor(id){
 const btn=document.querySelector(`[data-job="${CSS.escape(id)}"]`);
 return btn?.closest(".mickyJobCard")?.querySelector("h4")?.textContent.replace(/^🎯\s*/,"")||id;
}
function payVerified(id,source){
 const st=currentJobs();
 if(st.date!==dateKey() || !st.selected?.includes(id) || st.completed?.[id]) return false;
 const r=rewardFor(id), title=titleFor(id);
 st.completed[id]={at:new Date().toISOString(),reward:r,verified:true,source};
 write(JOBSKEY,st); setWallet(wallet()+r); stat("earned",r); stat("jobs",1);
 notify("🔐 VERIFIED JOB COMPLETE",title,`Verification: AUTO VERIFIED\nSource: ${source}\nEarned: +${r} MB\nBalance: ${wallet()} MB`);
 window.dispatchEvent(new Event("lizzyStoreRefresh"));
 return true;
}
function autoProof(type){
 const st=currentJobs(); if(st.date!==dateKey()) return;
 (st.selected||[]).forEach(id=>{if(AUTO_MAP[id]===type) payVerified(id,type)});
}
window.addEventListener("lizzyJobProof",e=>autoProof(e.detail?.type));
window.addEventListener("lizzyDailyRewardClaimed",()=>autoProof("daily_reward"));
$("gardenIcon")?.addEventListener("click",()=>autoProof("garden_open"));
$("tokenJarIcon")?.addEventListener("click",()=>autoProof("token_jar_open"));
$("seedStoreIcon")?.addEventListener("click",()=>autoProof("store_open"));
window.addEventListener("lizzySeedStorePurchase",()=>autoProof("store_purchase"));

/* Replace easy self-complete buttons for non-auto jobs with approval submission.
   Existing completed jobs remain completed and are never changed.
*/
async function submitForApproval(id){
 const st=currentJobs(); if(st.completed?.[id]) return;
 const pending=read(V2.pending,{});
 if(pending[id]?.date===dateKey() && pending[id]?.status==="pending") return;
 const claim={claimId:uid(),jobId:id,title:titleFor(id),reward:rewardFor(id),date:dateKey(),status:"pending"};
 pending[id]=claim; write(V2.pending,pending);
 const body={action:"submit_claim",...claim};
 try{
   const res=await fetch(WORKER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
   if(!res.ok) throw new Error("worker");
   notify("🕵🏾 JOB APPROVAL REQUEST",claim.title,`Claim ID: ${claim.claimId}\nReward: ${claim.reward} MB\nStatus: AWAITING MIKAEL APPROVAL`);
 }catch(e){
   // Still keep claim pending locally; Telegram fallback ensures Mikael sees it.
   notify("🕵🏾 JOB APPROVAL REQUEST",claim.title,`Claim ID: ${claim.claimId}\nReward: ${claim.reward} MB\nStatus: AWAITING MIKAEL APPROVAL\nUse the approval Worker upgrade to approve/reject from Telegram.`);
 }
 renderVerification();
}
async function pollClaims(){
 const pending=read(V2.pending,{});
 for(const [id,c] of Object.entries(pending)){
   if(c.status!=="pending") continue;
   try{
     const u=`${WORKER}?action=claim_status&claimId=${encodeURIComponent(c.claimId)}`;
     const res=await fetch(u); if(!res.ok) continue;
     const data=await res.json();
     if(data.status==="approved"){
       c.status="approved"; pending[id]=c; write(V2.pending,pending);
       payVerified(id,"mikael_telegram_approval");
     }else if(data.status==="rejected"){c.status="rejected";pending[id]=c;write(V2.pending,pending)}
   }catch(e){}
 }
 renderVerification();
}
function renderVerification(){
 const st=currentJobs(), pending=read(V2.pending,{});
 document.querySelectorAll("[data-job]").forEach(btn=>{
   const id=btn.dataset.job;if(st.completed?.[id]) return;
   const card=btn.closest(".mickyJobCard"); if(!card)return;
   card.querySelector(".verifyBadge")?.remove();
   const badge=document.createElement("div");badge.className="verifyBadge";
   if(AUTO_MAP[id]){
     badge.textContent="🟢 AUTO VERIFIED"; btn.textContent="Complete the action"; btn.disabled=true;
   }else{
     badge.textContent="🔴 MIKAEL APPROVAL";
     const p=pending[id];
     if(p?.date===dateKey()&&p.status==="pending"){btn.textContent="Awaiting Mikael ⏳";btn.disabled=true;card.classList.add("jobPending")}
     else if(p?.date===dateKey()&&p.status==="rejected"){btn.textContent="Rejected — Resubmit";btn.disabled=false;btn.onclick=()=>submitForApproval(id)}
     else{btn.textContent="Submit for Approval";btn.disabled=false;btn.onclick=()=>submitForApproval(id)}
   }
   card.insertBefore(badge,card.querySelector(".mickyJobReward"));
 });
}

/* Store extras */
const EXTRAS=[
 {id:"mystery_pack",name:"🎁 Mystery Seed Pack",price:8,kind:"pack"},
 {id:"heart_pot",name:"💗 Heart Pot",price:6,kind:"decor"},
 {id:"gotham_pot",name:"🦇 Gotham Pot",price:8,kind:"decor"},
 {id:"moon_pot",name:"🌙 Moon Pot",price:10,kind:"decor"},
 {id:"fairy_lights",name:"✨ Fairy Lights",price:5,kind:"decor"},
 {id:"butterflies",name:"🦋 Garden Butterflies",price:6,kind:"decor"},
 {id:"falling_petals",name:"🌸 Falling Petals",price:8,kind:"effect"},
 {id:"name_plant",name:"🏷️ Name-a-Plant Pass",price:3,kind:"pass"},
 {id:"discount25",name:"🎟️ 25% Seed Coupon",price:5,kind:"coupon"}
];
const CLASSIFIED=[
 {id:"classified_moon",name:"🌙 Classified Moonflower Pack",price:12},
 {id:"classified_lily",name:"🤍 Lily Collector Pack",price:11},
 {id:"classified_pink",name:"💗 Pink Garden Pack",price:10},
 {id:"classified_agent",name:"🕵🏾 Agent Garden Pot",price:9}
];
function buyExtra(item){
 if(wallet()<item.price){alert("Not enough Micky Bucs 😭");return}
 setWallet(wallet()-item.price); stat("spent",item.price);stat("purchases",1);
 const x=read(V2.extras,{owned:{},coupons:[]});
 x.owned[item.id]=Number(x.owned[item.id]||0)+1;
 if(item.kind==="coupon")x.coupons.push({id:item.id,unused:true,bought:new Date().toISOString()});
 write(V2.extras,x);
 notify("🛍️ STORE EXTRA PURCHASE",item.name,`Paid: ${item.price} MB\nBalance: ${wallet()} MB`);
 renderExtras();renderBank();
}
function classifiedToday(){return CLASSIFIED[Math.abs([...dateKey()].reduce((a,c)=>a+c.charCodeAt(0),0))%CLASSIFIED.length]}
function renderExtras(){
 const host=$("storeExtrasList"); if(host)host.innerHTML=EXTRAS.map(x=>`<div class="seedShopCard"><h4>${x.name}</h4><div class="seedPrice">💵 ${x.price} MB</div><button data-extra="${x.id}">Buy</button></div>`).join("");
 host?.querySelectorAll("[data-extra]").forEach(b=>b.onclick=()=>buyExtra(EXTRAS.find(x=>x.id===b.dataset.extra)));
 const c=classifiedToday(), box=$("classifiedItemCard");
 if(box){box.innerHTML=`<strong>🔐 TODAY'S CLASSIFIED ITEM</strong><h4>${c.name}</h4><p>Available today only.</p><button id="buyClassified">Buy for ${c.price} MB</button>`;$("buyClassified").onclick=()=>buyExtra({...c,kind:"classified"})}
}

/* Bank */
function bank(){return read(V2.bank,{savings:0,qualifyingSince:null,lastBonus:null})}
function renderBank(){const b=bank();if($("bankWalletBalance"))$("bankWalletBalance").textContent=wallet();if($("bankSavingsBalance"))$("bankSavingsBalance").textContent=b.savings}
function bankMove(dir){
 const b=bank();
 if(dir==="deposit"){if(wallet()<5)return alert("You need 5 MB in your wallet.");setWallet(wallet()-5);b.savings+=5;if(b.savings>=15&&!b.qualifyingSince)b.qualifyingSince=Date.now()}
 else{if(b.savings<5)return alert("Not enough savings.");b.savings-=5;setWallet(wallet()+5);if(b.savings<15)b.qualifyingSince=null}
 write(V2.bank,b);renderBank();notify("🏦 BANK OF MICKY",dir==="deposit"?"Deposit":"Withdrawal",`5 MB\nWallet: ${wallet()} MB\nSavings: ${b.savings} MB`);
}
function claimBonus(){
 const b=bank(),week=7*24*60*60*1000;
 if(b.savings<15||!b.qualifyingSince||Date.now()-b.qualifyingSince<week)return alert("Keep at least 15 MB saved for 7 days first.");
 if(b.lastBonus&&Date.now()-b.lastBonus<week)return alert("Weekly bonus already claimed.");
 b.lastBonus=Date.now();write(V2.bank,b);setWallet(wallet()+2);stat("earned",2);renderBank();notify("🏦 SAVINGS BONUS","Weekly bonus claimed","+2 MB");
}

/* Achievements */
const ACH=[
 ["first_paycheck","First Paycheck","Complete your first verified job",s=>s.jobs>=1,2],
 ["employee_day","Employee of the Day","Complete 5 verified jobs",s=>s.jobs>=5,3],
 ["big_spender","Big Spender","Spend 25 MB",s=>s.spent>=25,3],
 ["financially_irresponsible","Financially Irresponsible 😂","Spend 50 MB",s=>s.spent>=50,5],
 ["garden_investor","Garden Investor","Make 10 store purchases",s=>s.purchases>=10,5],
 ["ceo","CEO of Micky Bucs","Have 100 MB in your wallet",s=>wallet()>=100,5]
];
function checkAchievements(){
 const s=read(V2.stats,{earned:0,spent:0,purchases:0,jobs:0}), a=read(V2.achievements,{});
 for(const [id,name,desc,test,bonus] of ACH){
   if(!a[id]&&test(s)){a[id]={at:new Date().toISOString(),bonus};setWallet(wallet()+bonus);notify("🏆 ACHIEVEMENT UNLOCKED",name,`${desc}\nBonus: +${bonus} MB`)}
 }
 write(V2.achievements,a);renderAchievements();
}
function renderAchievements(){
 const a=read(V2.achievements,{}),host=$("storeAchievementsList");if(!host)return;
 host.innerHTML=ACH.map(([id,n,d,,bonus])=>`<div class="achievementCard ${a[id]?"unlocked":""}"><strong>${a[id]?"🏆":"🔒"} ${n}</strong><p>${d}</p><small>${a[id]?`Unlocked • +${bonus} MB bonus`:`Reward: +${bonus} MB`}</small></div>`).join("");
}

/* Tabs + refresh */
document.querySelectorAll("[data-store-tab]").forEach(b=>b.addEventListener("click",()=>{
 ["storeExtrasPanel","mickyBankPanel","storeAchievementsPanel","secretShelfPanel"].forEach(id=>$(id)?.classList.add("hidden"));
 const map={extras:"storeExtrasPanel",bank:"mickyBankPanel",achievements:"storeAchievementsPanel",secret:"secretShelfPanel"};
 $(map[b.dataset.storeTab])?.classList.remove("hidden");
}));
document.querySelectorAll("[data-bank]").forEach(b=>b.onclick=()=>bankMove(b.dataset.bank));
$("claimSavingsBonus")?.addEventListener("click",claimBonus);
window.addEventListener("lizzyStoreRefresh",()=>{renderVerification();renderBank();checkAchievements()});
$("seedStoreIcon")?.addEventListener("click",()=>setTimeout(()=>{renderVerification();renderExtras();renderBank();checkAchievements();pollClaims()},30));

/* The old "Mark Complete" handlers were attached before this module.
   Capture clicks first and block unverified payout. */
document.addEventListener("click",e=>{
 const btn=e.target.closest?.("[data-job]"); if(!btn)return;
 const id=btn.dataset.job, st=currentJobs(); if(st.completed?.[id])return;
 e.preventDefault();e.stopImmediatePropagation();
 if(AUTO_MAP[id]) return;
 submitForApproval(id);
},true);

renderExtras();renderBank();renderAchievements();setTimeout(renderVerification,50);
setInterval(pollClaims,30000);
})();


/* STORE FINAL V3 */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const CONTENT={"letter1": "Lizzy,\n\nThere are quite a few things I notice about you that I probably don't actually say enough — partly because I know you'll find some way to argue with me about them, and partly because sometimes it's easier to just notice these things quietly.\n\nI notice how easy it is to talk to you.\n\nSomehow a normal conversation can turn into us debating something completely ridiculous, making fun of each other, talking about something serious, and then immediately going back to nonsense like nothing happened. 😂\n\nAnd I really like that.\n\nI notice your intelligence too. Not just in the obvious ways, but in how you think about things and how you have your own opinions. Even though this unfortunately means you sometimes believe you're right when you're very clearly arguing with Mr Perfect. 😌\n\nI notice the little reactions you have when something makes you laugh. The attitude when I've said something cheeky. The moments where you're trying very hard not to give me the satisfaction of knowing I've made you smile.\n\nI notice how beautiful you are — and yes, before you start arguing with the letter, you cannot argue with a document you've already paid Micky Bucs for. No refunds.\n\nBut more than that, I notice how much I've enjoyed actually getting to know you.\n\nNot Agent Yelizaveta. Not Little Miss Attitude. Not The Hater™. Just Lizzy.\n\nThe person behind all the jokes, arguments, ridiculous nicknames and bullying allegations.\n\nAnd somewhere along the way, without really trying to, you've become someone whose messages I look forward to, someone I genuinely enjoy spending time with, and someone whose little things I've apparently started noticing enough to write an entire classified letter about them.\n\nThere are probably plenty more things I notice that aren't written here. Some of them I'll tell you eventually. Some you'll probably figure out yourself. And some might have to remain classified for now. 🤫\n\nBut I suppose the main thing I don't always say is actually pretty simple:\n\nI'm really glad I got to know you, Lizzy. ❤️\n\nAnd I'm looking forward to noticing a lot more.\n\n— Mikael\na.k.a. Mr Perfect 😌\n\nP.S. Before you say anything — you willingly spent Micky Bucs to read this. So technically, you paid to hear me be nice to you.\n\nThat's embarrassing for you, really. 😂", "file2": "LIZZYOS INTELLIGENCE DIVISION\nCASE: #002-H8R — THE HATER INVESTIGATION\nCLASSIFICATION: TOP SECRET 🔴\nSUBJECT: Agent Yelizaveta\nALIAS: Little Miss Attitude\nINVESTIGATING OFFICER: Agent Mikhail Petrov\n\nLizzyOS has detected an unusually high level of hater activity originating from Agent Yelizaveta. Following numerous suspicious comments, questionable opinions and completely unnecessary attacks on Mikael, a formal investigation was launched.\n\nSubject has also openly expressed a general dislike of men. This raises an important question: How did Mikael somehow survive the selection process?\n\nOFFICIAL CHARGES\n01 — Unprovoked Mikael Slander. GUILTY.\n02 — Excessive Attitude. VERY GUILTY.\n03 — Being a Professional Hater. GUILTY WITH DISTINCTION. 🏆\n04 — Refusing to Admit When Mikael Is Right. GUILTY.\n05 — The Mr Perfect Incident. Evidence confirms that “Mr Perfect” originated from the subject herself. EXTREMELY GUILTY. 😌\n\nBEHAVIOURAL ASSESSMENT\nHater Level: 98%\nAttitude: 97%\nStubbornness: [SYSTEM OVERLOAD]\nAbility to argue: Elite\nLikelihood of admitting Mikael is right: 2%\nLikelihood of arguing with this report: 100%\n\nFINAL VERDICT: GUILTY ON ALL COUNTS.\nSENTENCE: Continued association with Mikael. No possibility of parole. 😂\n\nCASE STATUS: CLOSED*\n*Subject will almost certainly provide enough evidence to reopen this investigation.*", "file3": "LIZZYOS SPECIAL INVESTIGATIONS UNIT\nCASE: #003-MP — OPERATION: MR PERFECT\nCLASSIFICATION: ULTRA SECRET 🔴\n\nAgent Yelizaveta referred to Mikhail as “MR PERFECT.” This was not a nickname created by Mikael. It came directly from Lizzy herself.\n\nCENTRAL QUESTION:\nWhy would a woman with such a well-documented history of hating men willingly give one of them the title Mr Perfect?\n\nTHEORY #001 — Temporary Loss of Judgement\nProbability: 8%.\n\nTHEORY #002 — Sarcasm\nLizzyOS ruling: BORING. NEXT THEORY.\n\nTHEORY #003 — THE DANCE INCIDENT 🕺🏾\nIntelligence reports indicate that Agent Mikhail possesses exceptional dancing abilities.\nTechnique: Incredible\nRhythm: Unmatched\nFootwork: World class\nConfidence: Possibly excessive\nEffect on Agent Yelizaveta: Significant\n\nInvestigators believe there is a strong possibility that Mikael's amazing dance skills won her heart. Agent Yelizaveta's objection has already been rejected. 😂\n\nTHEORY #004 — She Secretly Thinks Mikael Is Amazing\nExhibit A: She called him Mr Perfect.\nExhibit B: She continues talking to him despite allegedly being a professional hater.\nExhibit C: The aforementioned dancing.\nExhibit D: [REDACTED]\nExhibit E: [REDACTED]\nExhibit F: Why are you still reading this file, Lizzy? 👀\n\nMIKHAIL PETROV ASSESSMENT\nCheekiness: 96%\nConfidence: 99%\nDancing: 100% 🕺🏾\nAbility to annoy Lizzy: Elite\nActually Perfect: Under investigation\nBelieves he's perfect: Unfortunately, yes.\n\nCRITICAL CONTRADICTION\nFACT ONE: Lizzy hates men.\nFACT TWO: Mikael is a man.\nFACT THREE: Lizzy called Mikael Mr Perfect.\n\nLeading theory: D — ALL OF THE ABOVE.\n\nCASE STATUS: UNSOLVED 🔐\nDenial will be recorded as additional evidence."};
const W="lizzyMickyBucsV1",J="lizzyMickyJobsV1";
const K={proof:"lizzyMickyProofV2",shelf:"lizzySecretShelfV1",letters:"lizzyPurchasedLettersV1",mTokens:"lizzyMikaelTokensV1"};
const read=(k,f)=>{try{let v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(e){return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const today=()=>new Date().toISOString().slice(0,10),wallet=()=>Number(localStorage.getItem(W)||0),setWallet=n=>localStorage.setItem(W,String(Math.max(0,n)));
const worker=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
function state(){return read(J,{date:"",selected:[],completed:{}})}
function info(id){const b=document.querySelector(`[data-job="${CSS.escape(id)}"]`),c=b?.closest(".mickyJobCard");return{title:c?.querySelector("h4")?.textContent.replace(/^🎯\s*/,"")||id,reward:Number(c?.querySelector(".mickyJobReward")?.textContent.match(/\+(\d+)/)?.[1]||5)}}
function award(id,source){let s=state();if(s.date!==today()||!s.selected?.includes(id)||s.completed?.[id])return;let x=info(id);s.completed[id]={at:new Date().toISOString(),reward:x.reward,verified:true,source};write(J,s);setWallet(wallet()+x.reward);window.lizzyTelegramNotify?.("🔐 VERIFIED JOB COMPLETE",x.title,`Auto verified: ${source}\n+${x.reward} MB\nBalance: ${wallet()} MB`);window.dispatchEvent(new Event("lizzyStoreRefresh"))}
function proof(type,d={}){
 let p=read(K.proof,{date:today(),water:0,plant:0,games:[]});if(p.date!==today())p={date:today(),water:0,plant:0,games:[]};
 if(type==="plant_watered"){p.water++;award("water_one",type);if(p.water>=2)award("water_two","2 plants");if(p.water>=3)award("water_three","3 plants")}
 if(type==="seed_planted"){p.plant++;award("plant_seed",type);if(p.plant>=2)award("plant_two","2 seeds")}
 if(type==="game_complete"){if(d.game&&!p.games.includes(d.game))p.games.push(d.game);const m={mikhail_quiz:"play_mikhail",would_rather:"play_would",crack_code:"play_crack",tic_tac_toe:"play_ttt",heart_catch:"play_heart",lizzy_quiz:"play_lizzy_quiz"};if(m[d.game])award(m[d.game],d.game);if(d.game==="mikhail_quiz"&&d.perfect)award("perfect_mikhail","perfect");if(d.game==="would_rather"&&d.perfect)award("perfect_would","5/5");if(p.games.length>=2)award("play_two_games","2 different games");if(p.games.length>=3)award("play_three_games","3 different games")}
 if(type==="ttt_win")award("win_ttt","actual win");
 const direct={garden_open:["visit_garden","garden_photo"],store_open:["visit_store"],token_jar_open:["open_token_jar","organize_tokens"],store_purchase:["buy_seed"],daily_reward:["daily_reward","streak_check"],token_redeemed:["redeem_token"],readme_open:["open_readme"],date_open:["open_date"],letter_open:["open_letter"],mission_open:["open_mission"],recycle_open:["open_recycle"],crack_complete:["play_crack"]};
 (direct[type]||[]).forEach(x=>award(x,type));write(K.proof,p)
}
window.addEventListener("lizzyJobProof",e=>proof(e.detail?.type,e.detail||{}));window.addEventListener("lizzyDailyRewardClaimed",()=>proof("daily_reward"));window.addEventListener("lizzySeedStorePurchase",()=>proof("store_purchase"));
[["lizzyGardenIcon","garden_open"],["seedStoreIcon","store_open"],["tokenJarIcon","token_jar_open"],["readMeIcon","readme_open"],["calendarIcon","date_open"],["openWhenIcon","letter_open"],["missionIcon","mission_open"],["recycleBinIcon","recycle_open"]].forEach(([i,t])=>$(i)?.addEventListener("click",()=>proof(t)));

const ITEMS=[
{id:"hater_file",icon:"📁",name:"Classified File #002 — The Hater Investigation",kind:"file",content:CONTENT.file2},
{id:"letter_001",icon:"💌",name:"Unreleased Letter #001 — Things I Notice But Don't Always Say",kind:"letter",content:CONTENT.letter1},
{id:"uno_reverse",icon:"🔄",name:"UNO Reverse Token",kind:"mikael_token"},
{id:"wildcard",icon:"🃏",name:"Mikael Wildcard",kind:"wildcard"},
{id:"vault",icon:"🔐",name:"The Vault — ???",kind:"vault"}];
const shelf=()=>read(K.shelf,{owned:{},bids:{}}),saveShelf=s=>write(K.shelf,s);
function renderShelf(){
 const h=$("secretShelfPanel");if(!h)return;
 let s=shelf();
 const cards=ITEMS.map(i=>{
   let o=s.owned[i.id],b=s.bids[i.id];
   let status=o?"OWNED 🔓":b?.status==="pending"?"OFFER PENDING ⏳":b?.status==="countered"?`MIKAEL COUNTERED: ${b.counter} MB`:"NEGOTIATION OPEN";
   let controls=o?"":`<input type="number" min="1" data-bid-input="${i.id}" placeholder="${b?.counter?`Counter ${b.counter} MB`:"Your offer in MB"}"><button data-bid="${i.id}">Submit Offer</button>`;
   return `<div class="secretItem"><div style="font-size:32px">${i.icon}</div><strong>${i.name}</strong><small>${status}</small>${controls}</div>`;
 }).join("");
 h.innerHTML=`<h3>🔒 Mikael's Secret Shelf</h3><p class="seedStoreIntro">Exactly five classified items. No fixed prices — make Mikael an offer.</p><div class="secretShelfGrid">${cards}</div>`;
 h.querySelectorAll("[data-bid]").forEach(b=>b.onclick=()=>submitBid(b.dataset.bid));
}
async function submitBid(id){let inp=document.querySelector(`[data-bid-input="${CSS.escape(id)}"]`),amount=Math.floor(Number(inp?.value));if(!amount||amount<1)return alert("Enter an offer first.");if(amount>wallet())return alert("You cannot bid more than your current balance.");let item=ITEMS.find(x=>x.id===id),s=shelf(),bid={id:`bid_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,itemId:id,item:item.name,amount,status:"pending",createdAt:new Date().toISOString()};s.bids[id]=bid;saveShelf(s);renderShelf();try{await fetch(worker,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"secret_bid",...bid})})}catch(e){}window.lizzyTelegramNotify?.("💰 SECRET SHELF BID",item.name,`Lizzy offered ${amount} MB\nBid ID: ${bid.id}`)}
function grant(item,price){if(wallet()<price)return false;setWallet(wallet()-price);let s=shelf();s.owned[item.id]={at:new Date().toISOString(),price};saveShelf(s);if(item.kind==="letter"){let l=read(K.letters,[]);if(!l.some(x=>x.id===item.id))l.push({id:item.id,title:item.name,content:item.content});write(K.letters,l);renderLetters()}if(item.kind==="mikael_token"){let t=read(K.mTokens,{inventory:{},history:[]});t.inventory["UNO Reverse"]=Number(t.inventory["UNO Reverse"]||0)+1;write(K.mTokens,t);renderMikaelTokens()}if(item.kind==="vault"){let v=read("lizzyVaultRewardsV1",[]);v.push({id:"mrperfect_file",title:"Classified File #003 — Operation: Mr Perfect",content:CONTENT.file3});write("lizzyVaultRewardsV1",v)}return true}
async function poll(){let s=shelf();for(const item of ITEMS){let b=s.bids[item.id];if(!b||!["pending","countered"].includes(b.status))continue;try{let r=await fetch(`${worker}?action=bid_status&bidId=${encodeURIComponent(b.id)}`);if(!r.ok)continue;let d=await r.json();if(d.status==="accepted"&&!s.owned[item.id]){let price=Number(d.price||b.amount);if(grant(item,price)){b.status="accepted";s.bids[item.id]=b;saveShelf(s)}}else if(d.status==="rejected"){b.status="rejected";s.bids[item.id]=b;saveShelf(s)}else if(d.status==="countered"){b.status="countered";b.counter=Number(d.price);s.bids[item.id]=b;saveShelf(s)}}catch(e){}}renderShelf()}
function renderLetters(){let w=$("openWhenWindow")||$("openWhenFolderWindow");if(!w)return;let b=$("purchasedLettersBox");if(!b){b=document.createElement("div");b.id="purchasedLettersBox";w.appendChild(b)}let l=read(K.letters,[]);b.innerHTML=l.length?'<h3>🛍️ Purchased Letters</h3>'+l.map(x=>`<details class="purchasedLetter"><summary>💌 ${x.title}</summary><pre>${x.content}</pre></details>`).join(""):""}
function renderMikaelTokens(){let w=$("tokenJarWindow");if(!w)return;let b=$("mikaelTokensBox");if(!b){b=document.createElement("div");b.id="mikaelTokensBox";w.appendChild(b)}let t=read(K.mTokens,{inventory:{}}),n=Number(t.inventory["UNO Reverse"]||0);b.innerHTML=`<h3>🕴️ Mikael's Tokens</h3>${n?`<div class="tokenCard"><div class="tokenCardEmoji">🔄</div><div><strong>UNO Reverse</strong><p>Mikael has the power: one playful, reasonable request for Lizzy.</p></div><div class="tokenCount">×${n}</div></div>`:'<div class="memoryMessage">No Mikael Tokens unlocked yet.</div>'}`}
$("seedStoreIcon")?.addEventListener("click",()=>setTimeout(renderShelf,50));$("openWhenIcon")?.addEventListener("click",()=>setTimeout(renderLetters,50));$("tokenJarIcon")?.addEventListener("click",()=>setTimeout(renderMikaelTokens,50));setInterval(poll,20000);renderShelf();renderLetters();renderMikaelTokens();
})();
