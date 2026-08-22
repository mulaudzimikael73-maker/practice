
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

/* ORIGINAL MICKY JOBS VERIFICATION PRESERVED.
   The original completeJob() above remains the only task completion path. */

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
function renderExtras(){
 const host=$("storeExtrasList");
 if(host)host.innerHTML=EXTRAS.map(x=>`<div class="seedShopCard"><h4>${x.name}</h4><div class="seedPrice">💵 ${x.price} MB</div><button data-extra="${x.id}">Buy</button></div>`).join("");
 host?.querySelectorAll("[data-extra]").forEach(b=>b.onclick=()=>buyExtra(EXTRAS.find(x=>x.id===b.dataset.extra)));
 const classified=$("classifiedItemCard"); if(classified)classified.innerHTML="";
 window.dispatchEvent(new Event("lizzyExtrasChanged"));
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
window.addEventListener("lizzyStoreRefresh",()=>{renderBank();checkAchievements()});
$("seedStoreIcon")?.addEventListener("click",()=>setTimeout(()=>{renderExtras();renderBank();checkAchievements()},30));

window.LizzyBankAPI={
  getState(){
    const b=bank();
    return {
      wallet:wallet(),
      savings:Number(b.savings||0),
      qualifyingSince:b.qualifyingSince||null,
      lastBonus:b.lastBonus||null
    };
  },
  deposit(){bankMove("deposit");return this.getState();},
  withdraw(){bankMove("withdraw");return this.getState();},
  claimBonus(){claimBonus();return this.getState();},
  refresh(){renderBank();return this.getState();}
};
window.dispatchEvent(new Event("lizzyBankReady"));
renderExtras();renderBank();renderAchievements();
})();


/* =========================================================
   SECRET SHELF / VAULT V3
   Persistent counter offers + new rotating vault stock.
   ========================================================= */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(e){return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const WALLET="lizzyMickyBucsV1";
const SHELF="lizzySecretShelfV1";
const LETTERS="lizzyPurchasedLettersV1";
const MTOKENS="lizzyMikaelTokensV1";
const WORKER=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";

const LETTER002=`Lizzy,

Apparently one unreleased letter was not enough.

I was trying to work out what to write in this one without just repeating all the things I've already said about you, which is slightly difficult because you have somehow become involved in an unreasonable amount of my thoughts, jokes and website ideas.

So instead, this one is about something a little different.

I like us.

I like how unserious we can be. I like that a completely normal conversation can somehow become an argument about something ridiculous, a court case involving Cody, a Batman incident, or another reason for you to accuse me of being dramatic.

I like that we have our own language now — the nicknames, the jokes, Mr Perfect, Little Miss Attitude, Mabebeza, Agent Yelizaveta and all the random things that probably make absolutely no sense to anyone else.

I like that I can tease you and, even when you pretend to be annoyed, I can usually tell when you're trying not to laugh.

And I like the quieter parts too.

The checking in. The normal conversations. Learning the little things about you. Remembering things you've said. Finding out what makes you happy, what annoys you, what makes you laugh and what earns me that look that says I should probably stop talking.

I don't know exactly what all of this is supposed to look like from the outside.

But from where I'm standing, I know I've really enjoyed whatever we've been building.

Even if a concerning percentage of it now exists inside a fake operating system.

So yes, Lizzy, this is another classified document confirming that I like having you around.

Please don't let this information increase your ego too much.

There is only room for one person with an unreasonable ego in LizzyOS and I already claimed the position.

— Mikael
a.k.a. Mr Perfect 😌

P.S. You bought another unreleased letter. At this point you're basically funding the Mr Perfect publishing division. 😂`;

const CODY_LEGAL_DOCS=`LIZZYOS LEGAL DEPARTMENT
CONFIDENTIAL CASE FILE

CASE: CODY ALADEEN v. MIKAEL MULAUDZI
CLIENT: Cody Aladeen
LEGAL COUNSEL: Lizzy
STATUS: Counsel has been retained.

NOTICE TO MIKAEL:

This document serves as formal notice that Cody Aladeen is now represented by Lizzy in all present and future disputes involving alleged bullying, suspicious grappling, unnecessary wrestling attempts, intimidation, treat-related disagreements, or comments regarding Cody's grappling ability.

The client would like the record to show that his grappling skills have been assessed as DECENT.

Mikael may disagree with this assessment.

Mikael is strongly advised to keep those disagreements to himself.

SPECIAL PROVISIONS:

1. Mikael may not test new grappling techniques on Cody without prior approval from legal counsel.

2. Cody retains the right to defend himself using paws, speed, strategic retreat, dramatic staring, or immediate contact with his lawyer.

3. Any attempt by Mikael to claim that he could “probably take Cody” may be used against him in the Court of LizzyOS.

4. Cody is entitled to reasonable access to treats, naps, windows and legal representation.

5. Lizzy reserves the right to introduce additional charges whenever Mikael is being suspicious.

LEGAL RISK ASSESSMENT:
Cody's grappling: Decent.
Cody's legal team: Extremely dangerous.
Mikael's confidence before legal representation: High.
Mikael's confidence after discovering Lizzy is the lawyer: Significantly reduced.

FINAL NOTICE:

Mikael is reminded that fighting someone who can grapple you is one problem.

Fighting someone who can grapple you AND sue you is a completely different administrative situation.

Signed,
Lizzy
Legal Counsel for Cody Aladeen

Filed by: LizzyOS Legal Department
Mikael's objection: DENIED.`;

const ITEMS=[
 {id:"letter_002",icon:"💌",publicName:"Unreleased Letter #002",kind:"letter",content:LETTER002,teaser:"A second unreleased document from the Mr Perfect archives."},
 {id:"mystery_reward",icon:"🎁",publicName:"Mystery Reward",kind:"mikael_token",teaser:"Contents remain classified until the deal is complete."},
 {id:"archive_x17",icon:"🗃️",publicName:"Sealed Archive X-17",kind:"document",content:CODY_LEGAL_DOCS,teaser:"Origin: REDACTED • Contents: SEALED • Clearance: UNKNOWN"}
];

const wallet=()=>Number(localStorage.getItem(WALLET)||0);
const setWallet=n=>localStorage.setItem(WALLET,String(Math.max(0,Math.floor(Number(n)||0))));
const shelf=()=>{
 const s=read(SHELF,{owned:{},bids:{}});
 s.owned=s.owned||{};s.bids=s.bids||{};
 return s;
};
const saveShelf=s=>write(SHELF,s);

function bidStatus(item,bid,owned){
 if(owned)return "OWNED 🔓";
 if(bid?.status==="pending")return `YOUR OFFER: ${bid.amount} MB • WAITING FOR MIKAEL`;
 if(bid?.status==="countered")return `MIKAEL'S COUNTER: ${bid.counterOffer} MB`;
 if(bid?.status==="rejected")return "OFFER REJECTED — NEGOTIATION REOPENED";
 return "NEGOTIATION OPEN";
}

function renderShelf(){
 const host=$("secretShelfPanel");if(!host)return;
 const s=shelf();
 host.innerHTML=`<div class="secretVaultHeader">
   <div><small>SECRET SHELF // RESTRICTED MARKET</small><h3>🔐 The Vault</h3></div>
   <div class="vaultWallet">AVAILABLE: <b>${wallet()} MB</b></div>
 </div>
 <p class="seedStoreIntro">No fixed prices. Make Mikael an offer. If Mikael counters, his counter stays here until you submit another bid.</p>
 <div class="secretShelfGrid">${ITEMS.map(item=>{
   const owned=!!s.owned[item.id],bid=s.bids[item.id];
   const countered=!owned&&bid?.status==="countered"&&Number(bid.counterOffer)>0;
   const status=bidStatus(item,bid,owned);
   const controls=owned?"":`
    ${countered?`<div class="persistentCounter"><small>COUNTER OFFER FROM MIKAEL</small><strong>${bid.counterOffer} MB</strong><span>Your last bid: ${bid.amount||"—"} MB</span></div>`:""}
    <div class="vaultBidControls">
      <input type="number" min="1" data-bid-input="${item.id}" placeholder="${countered?`Make a new bid against ${bid.counterOffer} MB`:"Your offer in MB"}">
      <button data-bid="${item.id}">${countered?"Make Another Bid":"Submit Offer"}</button>
    </div>`;
   let ownedAction="";
   if(owned&&item.kind==="letter")ownedAction=`<small class="ownedDestination">💌 Saved to Open When → Purchased Letters</small>`;
   if(owned&&item.kind==="mikael_token")ownedAction=`<small class="ownedDestination">🔄 Revealed as UNO Reverse → Token Jar</small>`;
   if(owned&&item.kind==="document")ownedAction=`<button class="openOwnedVaultFile" data-open-vault-file="${item.id}">OPEN ACQUIRED FILE</button>`;
   const displayName=owned&&item.id==="archive_x17"?"Cody Legal Documents":item.publicName;
   const displayTeaser=owned&&item.id==="archive_x17"?"⚖️ Confidential legal documents recovered from the sealed archive.":item.teaser;
   return `<article class="secretItem vaultItem ${countered?"hasCounter":""} ${owned?"ownedVaultItem":""}">
      <div class="vaultItemIcon">${item.icon}</div>
      <strong>${displayName}</strong>
      <p>${displayTeaser}</p>
      <small class="vaultStatus">${status}</small>
      ${controls}${ownedAction}
   </article>`;
 }).join("")}</div>
 <div id="vaultOwnedFileReader"></div>`;
 host.querySelectorAll("[data-bid]").forEach(btn=>btn.onclick=()=>submitBid(btn.dataset.bid));
 host.querySelectorAll("[data-open-vault-file]").forEach(btn=>btn.onclick=()=>openOwnedFile(btn.dataset.openVaultFile));
}

function openOwnedFile(id){
 const item=ITEMS.find(x=>x.id===id);
 const s=shelf();
 if(!item||!s.owned[item.id]||item.kind!=="document")return;
 const box=$("vaultOwnedFileReader");if(!box)return;
 box.innerHTML=`<section class="vaultDocumentReader">
   <button type="button" id="closeVaultDocument">×</button>
   <small>ACQUIRED VAULT DOCUMENT // CONFIDENTIAL</small>
   <h3>⚖️ Cody Legal Documents</h3>
   <pre>${item.content.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]))}</pre>
 </section>`;
 $("closeVaultDocument")?.addEventListener("click",()=>box.innerHTML="");
 box.scrollIntoView({behavior:"smooth",block:"nearest"});
}

async function submitBid(id){
 const item=ITEMS.find(x=>x.id===id);if(!item)return;
 const input=document.querySelector(`[data-bid-input="${CSS.escape(id)}"]`);
 const amount=Math.floor(Number(input?.value));
 if(!amount||amount<1)return alert("Enter an offer first.");
 if(amount>wallet())return alert("You cannot offer more Micky Bucs than you currently have.");
 try{
   const res=await fetch(WORKER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
     type:"secret_shelf_bid",item:item.id,offer:amount
   })});
   const data=await res.json();
   if(!res.ok||!data.success||!data.claimId)throw new Error(data.error||"Offer failed");
   const s=shelf();
   // A new bid intentionally replaces the previous counter for this item.
   s.bids[id]={claimId:data.claimId,amount,status:"pending",counterOffer:null,createdAt:new Date().toISOString()};
   saveShelf(s);renderShelf();
 }catch(e){
   console.error(e);
   alert("The offer could not be sent. Please try again.");
 }
}

function grant(item,price){
 const s=shelf();
 if(s.owned[item.id])return true;
 price=Math.floor(Number(price)||0);
 if(price<1||wallet()<price)return false;
 setWallet(wallet()-price);
 s.owned[item.id]={at:new Date().toISOString(),price};
 saveShelf(s);

 if(item.kind==="letter"){
   const list=read(LETTERS,[]);
   if(!list.some(x=>x.id===item.id))list.push({id:item.id,title:item.publicName,content:item.content});
   write(LETTERS,list);
   renderLetters();
 }
 if(item.kind==="mikael_token"){
   const t=read(MTOKENS,{inventory:{},history:[]});
   t.inventory=t.inventory||{};t.history=t.history||[];
   t.inventory["UNO Reverse"]=Number(t.inventory["UNO Reverse"]||0)+1;
   t.history.push({type:"earned",token:"UNO Reverse",source:"Mystery Reward",at:new Date().toISOString()});
   write(MTOKENS,t);
   renderMikaelTokens();
 }
 window.dispatchEvent(new Event("lizzyStoreRefresh"));
 return true;
}

async function syncShelfState(){
 const s=shelf();let dirty=false;
 for(const item of ITEMS){
   if(s.owned[item.id])continue;
   try{
     const r=await fetch(`${WORKER}?shelfItem=${encodeURIComponent(item.id)}`,{cache:"no-store"});
     if(!r.ok)continue;
     const data=await r.json(),remote=data.state;
     if(!remote?.claimId)continue;
     const local=s.bids[item.id];
     // Server wins only when it represents the same/newer negotiation.
     const remoteTime=Date.parse(remote.updatedAt||remote.createdAt||0)||0;
     const localTime=Date.parse(local?.updatedAt||local?.createdAt||0)||0;
     if(!local||remote.claimId===local.claimId||remoteTime>=localTime){
       s.bids[item.id]={
         claimId:remote.claimId,
         amount:Number(remote.offer||local?.amount||0),
         status:remote.status||"pending",
         counterOffer:remote.counterOffer==null?null:Number(remote.counterOffer),
         createdAt:remote.createdAt||local?.createdAt||new Date().toISOString(),
         updatedAt:remote.updatedAt||remote.decidedAt||new Date().toISOString()
       };
       dirty=true;
     }
   }catch(e){}
 }
 if(dirty)saveShelf(s);
}

async function pollShelf(){
 await syncShelfState();
 const s=shelf();let dirty=false;
 for(const item of ITEMS){
   const bid=s.bids[item.id];
   if(!bid?.claimId||s.owned[item.id]||!["pending","countered"].includes(bid.status))continue;
   try{
     const r=await fetch(`${WORKER}?claimId=${encodeURIComponent(bid.claimId)}`,{cache:"no-store"});
     if(!r.ok)continue;
     const data=await r.json(),c=data.claim||data;
     if(c.status==="accepted"){
       const price=Number(c.offer??bid.amount);
       if(grant(item,price)){bid.status="accepted";bid.updatedAt=new Date().toISOString();dirty=true;}
     }else if(c.status==="rejected"){
       bid.status="rejected";bid.updatedAt=c.decidedAt||new Date().toISOString();dirty=true;
     }else if(c.status==="countered"){
       bid.status="countered";
       bid.counterOffer=Number(c.counterOffer);
       bid.updatedAt=c.decidedAt||new Date().toISOString();
       dirty=true;
     }
   }catch(e){}
 }
 if(dirty)saveShelf(s);
 renderShelf();
}

function renderLetters(){
 const win=$("openWhenWindow")||$("openWhenFolderWindow");if(!win)return;
 const host=win.querySelector(".windowScroll")||win;
 let box=$("purchasedLettersBox");
 if(!box){box=document.createElement("section");box.id="purchasedLettersBox";host.appendChild(box);}
 const list=read(LETTERS,[]);
 box.innerHTML=list.length?`<h3>🛍️ Purchased Letters</h3>${list.map(x=>`<details class="purchasedLetter"><summary>💌 ${x.title}</summary><pre>${x.content}</pre></details>`).join("")}`:"";
}

function renderMikaelTokens(){
 const win=$("tokenJarWindow");if(!win)return;
 const host=win.querySelector(".windowScroll")||win;
 let box=$("mikaelTokensBox");
 if(!box){box=document.createElement("section");box.id="mikaelTokensBox";host.appendChild(box);}
 const t=read(MTOKENS,{inventory:{}}),n=Number(t.inventory?.["UNO Reverse"]||0);
 box.innerHTML=n?`<h3>🕴️ Mikael's Tokens</h3><div class="tokenCard"><div class="tokenCardEmoji">🔄</div><div><strong>UNO Reverse</strong><p>Mikael has the power: one playful, reasonable request for Lizzy.</p></div><div class="tokenCount">×${n}</div></div>`:"";
}

$("seedStoreIcon")?.addEventListener("click",()=>setTimeout(()=>{renderShelf();pollShelf()},60));
document.querySelector('[data-store-tab="secret"]')?.addEventListener("click",()=>setTimeout(pollShelf,30));
$("openWhenIcon")?.addEventListener("click",()=>setTimeout(renderLetters,60));
$("tokenJarIcon")?.addEventListener("click",()=>setTimeout(renderMikaelTokens,60));
window.addEventListener("focus",()=>{if(!$("secretShelfPanel")?.classList.contains("hidden"))pollShelf()});
setInterval(pollShelf,15000);
renderShelf();renderLetters();renderMikaelTokens();
setTimeout(pollShelf,500);
})();


/* =========================================================
   PURCHASED EXTRAS — REAL WEBSITE FINAL
   ========================================================= */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(e){return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const EXTRA="lizzyStoreExtrasV1", NAMES="lizzyCustomPlantNamesV1";
const LABELS={mystery_pack:"🎁 Mystery Seed Pack",heart_pot:"💗 Heart Pot",gotham_pot:"🦇 Gotham Pot",moon_pot:"🌙 Moon Pot",fairy_lights:"✨ Fairy Lights",butterflies:"🦋 Garden Butterflies",falling_petals:"🌸 Falling Petals",name_plant:"🏷️ Name-a-Plant Pass",discount25:"🎟️ 25% Seed Coupon"};

function renderMyExtras(){
 const panel=$("storeExtrasPanel");if(!panel)return;
 let box=$("purchasedExtrasBox");
 if(!box){box=document.createElement("section");box.id="purchasedExtrasBox";box.className="purchasedExtrasBox";panel.appendChild(box);}
 const x=read(EXTRA,{owned:{},coupons:[]}),rows=Object.entries(x.owned||{}).filter(([,n])=>Number(n)>0);
 box.innerHTML=`<h3>🎒 My Extras</h3>${rows.length?rows.map(([id,n])=>`<div class="ownedExtraRow"><span><strong>${LABELS[id]||id}</strong> ×${n}</span>${id==="name_plant"?'<button id="useNamePlantPass">Use Pass</button>':""}</div>`).join(""):'<p class="seedStoreIntro">Purchased extras will appear here.</p>'}`;
 $("useNamePlantPass")?.addEventListener("click",useNamePass);
}

function useNamePass(){
 const x=read(EXTRA,{owned:{},coupons:[]});
 if(Number(x.owned?.name_plant||0)<1)return alert("No Name-a-Plant Pass available.");
 const g=read("lizzyGardenV1",null);
 if(!g?.plants?.length)return alert("Plant something in the Garden first 🌱");
 const names=read(NAMES,{});
 const choices=g.plants.map((p,i)=>`${i+1}. ${names[p.id]||p.flowerId||"Plant"}`).join("\n");
 const num=Number(prompt(`Choose a plant to name:\n\n${choices}\n\nEnter the number:`));
 if(!Number.isInteger(num)||num<1||num>g.plants.length)return;
 const p=g.plants[num-1],name=(prompt("What should this plant be called?")||"").trim();
 if(!name)return;
 names[p.id]=name;write(NAMES,names);
 x.owned.name_plant=Math.max(0,Number(x.owned.name_plant)-1);write(EXTRA,x);
 applyNames();renderMyExtras();
 window.lizzyTelegramNotify?.("🏷️ NAME-A-PLANT PASS USED",name,"Lizzy named a plant in her Garden.");
}

function applyNames(){
 const names=read(NAMES,{});
 document.querySelectorAll(".gardenPlot[data-plant]").forEach(plot=>{
   const name=names[plot.dataset.plant];if(!name)return;
   const title=plot.querySelector(".plantMeta strong");if(title)title.textContent=name;
 });
}

function deliverAndDecorate(){
 const x=read(EXTRA,{owned:{},coupons:[]}),o=x.owned||{},g=read("lizzyGardenV1",null),ledger=read("lizzyExtrasDeliveryLedgerV2",{});
 if(g&&typeof g==="object"){
   g.seeds=g.seeds||{};
   while(Number(ledger.mystery_pack||0)<Number(o.mystery_pack||0)){
     const pool=["tulipSeed","roseSeed","jacarandaSeed","sunflowerSeed","lilySeed"];
     const id=pool[Math.floor(Math.random()*pool.length)];
     g.seeds[id]=Number(g.seeds[id]||0)+1;
     ledger.mystery_pack=Number(ledger.mystery_pack||0)+1;
   }
   write("lizzyGardenV1",g);write("lizzyExtrasDeliveryLedgerV2",ledger);
 }
 const root=$("gardenWindow")||document.querySelector(".gardenWindow");if(root){
   let fx=$("lizzyRealExtrasFx");if(!fx){fx=document.createElement("div");fx.id="lizzyRealExtrasFx";fx.className="lizzyRealExtrasFx";root.appendChild(fx);}
   fx.innerHTML="";
   if(o.fairy_lights)fx.innerHTML+=`<div class="realFairyLights"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
   if(o.butterflies)fx.innerHTML+=`<span class="realButterfly rb1">🦋</span><span class="realButterfly rb2">🦋</span>`;
   if(o.falling_petals)fx.innerHTML+=`<span class="realPetal rp1">🌸</span><span class="realPetal rp2">🌸</span><span class="realPetal rp3">🌸</span>`;
   const pot=o.heart_pot?"heart":o.gotham_pot?"gotham":o.moon_pot?"moon":null;
   document.querySelectorAll(".gardenPlot .plantVisual").forEach(v=>{
     v.querySelector(".realCustomPot")?.remove();
     if(pot)v.insertAdjacentHTML("beforeend",`<span class="realCustomPot ${pot}">${pot==="heart"?"♥":pot==="gotham"?"🦇":"🌙"}</span>`);
   });
 }
 applyNames();renderMyExtras();
}

let obs;
function watchGarden(){
 const host=$("gardenPlots");if(!host)return;
 obs?.disconnect();obs=new MutationObserver(()=>setTimeout(()=>{applyNames();deliverAndDecorate()},30));
 obs.observe(host,{childList:true,subtree:true});
}

setTimeout(()=>{renderMyExtras();deliverAndDecorate();watchGarden()},500);
$("seedStoreIcon")?.addEventListener("click",()=>setTimeout(renderMyExtras,80));
$("gardenIcon")?.addEventListener("click",()=>setTimeout(()=>{deliverAndDecorate();watchGarden()},100));
window.addEventListener("lizzyStoreRefresh",()=>setTimeout(()=>{renderMyExtras();deliverAndDecorate()},60));
window.addEventListener("lizzyExtrasChanged",()=>setTimeout(()=>{renderMyExtras();deliverAndDecorate()},60));
})();




/* =========================================================
   SECRET SHELF DELIVERY GUARANTEE V2
   Letter #001 -> Open When / Purchased Letters
   Mystery Reward -> Token Jar / Mikael's Tokens / UNO Reverse
   Idempotent: never duplicates an already-delivered reward.
   ========================================================= */
(()=>{
"use strict";
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(e){return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const SHELF="lizzySecretShelfV1",LETTERS="lizzyPurchasedLettersV1",TOKENS="lizzyMikaelTokensV1";
const LETTER_ID="letter_001";
const LETTER_TITLE="Unreleased Letter #001";

function reconcileSecretShelfDelivery(){
 const s=read(SHELF,{owned:{}});
 // Letter: if ownership exists, guarantee a Purchased Letters record exists.
 if(s.owned?.[LETTER_ID]){
   const list=read(LETTERS,[]);
   if(!list.some(x=>x.id===LETTER_ID)){
     // Pull the authoritative letter content from the already-rendered purchased record if
     // possible; otherwise the main grant() will create it during normal accepted purchase.
     const existingText=document.querySelector("#purchasedLettersBox .purchasedLetter pre")?.textContent||"";
     if(existingText) list.push({id:LETTER_ID,title:LETTER_TITLE,content:existingText});
     write(LETTERS,list);
   }
   try{renderLetters();}catch(e){}
 }
 // Mystery Reward: ownership guarantees exactly one UNO Reverse entitlement.
 if(s.owned?.mystery_reward){
   const t=read(TOKENS,{inventory:{},history:[]});
   t.inventory=t.inventory||{};t.history=t.history||[];
   const delivered=t.history.some(h=>h?.source==="Mystery Reward"&&h?.token==="UNO Reverse");
   if(!delivered){
     t.inventory["UNO Reverse"]=Number(t.inventory["UNO Reverse"]||0)+1;
     t.history.push({type:"earned",token:"UNO Reverse",source:"Mystery Reward",at:new Date().toISOString(),reconciled:true});
     write(TOKENS,t);
   }
   try{renderMikaelTokens();}catch(e){}
 }
}
setTimeout(reconcileSecretShelfDelivery,700);
window.addEventListener("focus",reconcileSecretShelfDelivery);
window.addEventListener("lizzyStoreRefresh",()=>setTimeout(reconcileSecretShelfDelivery,80));
document.getElementById("openWhenIcon")?.addEventListener("click",()=>setTimeout(reconcileSecretShelfDelivery,80));
document.getElementById("tokenJarIcon")?.addEventListener("click",()=>setTimeout(reconcileSecretShelfDelivery,80));
})();




/* =========================================================
   REAL SITE DAY-7 NON-DESTRUCTIVE UPDATE GUARD V3
   Lizzy has ALREADY claimed Day 7.
   This module snapshots existing persistent state only.
   It NEVER resets balances, streaks, rewards, Garden or tokens.
   ========================================================= */
(()=>{
"use strict";
const SNAP="lizzyRealDay7PreUpdateSnapshotV3";
if(localStorage.getItem(SNAP))return;

const preservePatterns=[
 /^lizzy/i,
 /micky/i,
 /garden/i,
 /seed/i,
 /token/i,
 /reward/i,
 /streak/i,
 /mystery/i,
 /bank/i,
 /shelf/i,
 /letter/i,
 /extra/i,
 /coupon/i,
 /job/i,
 /achievement/i
];

const snapshot={
 createdAt:new Date().toISOString(),
 note:"Pre-update snapshot after Lizzy claimed Day 7. Read-only backup; no live values changed.",
 values:{}
};

for(let i=0;i<localStorage.length;i++){
 const key=localStorage.key(i);
 if(key && preservePatterns.some(rx=>rx.test(key))){
   const value=localStorage.getItem(key);
   if(value!==null)snapshot.values[key]=value;
 }
}
localStorage.setItem(SNAP,JSON.stringify(snapshot));
})();















/* =========================================================
   MIKAEL REVERSE TOKENS — CLEAN CROSS-DEVICE SYSTEM V3
   - Cloudflare KV is authoritative.
   - Mikael/admin device NEVER consumes Lizzy's popup.
   - Lizzy device polls and acknowledges redemptions.
   - Existing local inventory migrates once.
   ========================================================= */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const WORKER=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
const LOCAL="lizzyMikaelTokensV1";
const MIG="lizzyMikaelTokensCloudMigratedV2";
const ADMIN_DEVICE="lizzyMikaelAdminDeviceV1";
const SESSION="lizzyMikaelRedeemSessionV2";
const ACCESS="MRPERFECT";
const DEFS={"Reverse Token — Lizzy Owes Mikael a Monster":{"emoji":"🥤","desc":"Lizzy owes Mikael one Monster."},"Reverse Token — Mikael Gets a Hug":{"emoji":"🫂","desc":"Lizzy owes Mikael one proper hug."},"Reverse Token — Mikael Gets Ice Cream":{"emoji":"🍦","desc":"Lizzy owes Mikael one ice cream."},"Reverse Token — Mikael Gets Dessert":{"emoji":"🍰","desc":"Lizzy owes Mikael one dessert."},"Reverse Token — Mikael Gets a Chocolate":{"emoji":"🍫","desc":"Lizzy owes Mikael one chocolate."},"Reverse Token — Mikael Gets Sweets":{"emoji":"🍬","desc":"Lizzy owes Mikael some sweets."},"Reverse Token — Mikael Gets a Coke":{"emoji":"🥤","desc":"Lizzy owes Mikael one Coke."},"Reverse Token — Mikael Gets a Drink":{"emoji":"☕","desc":"Lizzy owes Mikael one reasonable drink."},"Reverse Token — Mikael Gets a Snack":{"emoji":"🍔","desc":"Lizzy owes Mikael one snack."},"Reverse Token — Mikael Gets Fries":{"emoji":"🍟","desc":"Lizzy owes Mikael some fries."},"Reverse Token — Mikael Picks the Movie":{"emoji":"🎬","desc":"Mikael chooses the movie for one movie night."},"Reverse Token — Mikael Picks What We Watch":{"emoji":"📺","desc":"Mikael chooses what you watch once."},"Reverse Token — Mikael Controls the Aux":{"emoji":"🎵","desc":"Mikael controls the music for one reasonable trip or session."},"Reverse Token — Mikael Picks One Song":{"emoji":"🎶","desc":"Mikael chooses one song, no skipping."},"Reverse Token — Mikael Picks Where We Eat":{"emoji":"🍽️","desc":"Mikael chooses where to eat once."},"Reverse Token — Mikael Picks the Activity":{"emoji":"🎯","desc":"Mikael chooses one reasonable activity."},"Reverse Token — Mikael Picks the Next Date Activity":{"emoji":"🎳","desc":"Mikael chooses the next activity date."},"Reverse Token — Mikael Gets One Nice Photo":{"emoji":"📸","desc":"Lizzy owes Mikael one nice photo."},"Reverse Token — Mikael Gets One Selfie Together":{"emoji":"🤳","desc":"One selfie together, Mikael's choice of moment."},"Reverse Token — Mikael Gets a Nice Message":{"emoji":"💌","desc":"Lizzy owes Mikael one genuinely nice message."},"Reverse Token — Mikael Gets a Little Letter":{"emoji":"📝","desc":"Lizzy owes Mikael one little letter."},"Reverse Token — Lizzy Answers One Random Question":{"emoji":"💬","desc":"Lizzy answers one harmless random question properly."},"Reverse Token — Mikael Gets One Honest Answer":{"emoji":"🤔","desc":"Mikael gets one honest answer to a reasonable question."},"Reverse Token — Mikael Gets a Call":{"emoji":"📞","desc":"Mikael gets one reasonable call."},"Reverse Token — Mikael Gets a Voice Note":{"emoji":"🎙️","desc":"Lizzy owes Mikael one voice note."},"Reverse Token — Mikael Gets One Joke":{"emoji":"😂","desc":"Lizzy owes Mikael one joke."},"Reverse Token — Lizzy Says Something Nice About Mikael":{"emoji":"😌","desc":"Lizzy must say one genuinely nice thing about Mikael."},"Reverse Token — Mikael Wins One Harmless Argument":{"emoji":"👑","desc":"Mikael automatically wins one harmless argument."},"Reverse Token — No Bullying Mikael for One Hour":{"emoji":"🧑‍⚖️","desc":"Mikael gets one full hour of protection from bullying."},"Reverse Token — Mikael's Knees Are Protected for One Day":{"emoji":"🦵","desc":"No knee slander for one full day."},"Reverse Token — No You're So Annoying for One Hour":{"emoji":"😭","desc":"Lizzy cannot say 'You're so annoying' to Mikael for one hour."},"Reverse Token — Lizzy Admits Mikael Was Right":{"emoji":"🏆","desc":"Lizzy must admit Mikael was right once."},"Reverse Token — Be Nice to Mikael for 30 Minutes":{"emoji":"😇","desc":"Thirty uninterrupted minutes of kindness to Mikael."},"Reverse Token — Four Eyes Compliments Mr Perfect":{"emoji":"👓","desc":"Four Eyes owes Mr Perfect one compliment."},"Reverse Token — Mikael Gets One Free Roast":{"emoji":"😭","desc":"Mikael gets one consequence-free playful roast."},"Reverse Token — Mikael Gets One UNO Reverse":{"emoji":"🃏","desc":"Mikael can reverse one playful situation."},"Reverse Token — Mikael Chooses":{"emoji":"🎲","desc":"Mikael chooses between two reasonable options."},"Reverse Token — One Small Favour":{"emoji":"🤝","desc":"Lizzy owes Mikael one small reasonable favour."},"Reverse Token — Mikael Gets the Comfortable Seat":{"emoji":"🛋️","desc":"Mikael gets first choice of the comfortable seat once."},"Reverse Token — Mikael Picks the Game":{"emoji":"🎮","desc":"Mikael chooses the game once."},"Reverse Token — Watch Football With Mikael":{"emoji":"⚽","desc":"One football watch session with Mikael."},"Reverse Token — Mikael Gets a Peace & Quiet Pass":{"emoji":"💤","desc":"One reasonable period of uninterrupted peace and quiet."},"Reverse Token — Mikael Gets One Please":{"emoji":"🥺","desc":"Lizzy has to ask nicely once. Very serious legislation."},"Reverse Token — Mr Perfect Privilege":{"emoji":"👑","desc":"One small reasonable Mr Perfect privilege."},"UNO Reverse":{"emoji":"🔄","desc":"Mikael gets one playful, reasonable request."}};
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch{return f}};
async function getJSON(url){
 const r=await fetch(url,{cache:"no-store"});
 const d=await r.json().catch(()=>({success:false,error:"Invalid server response"}));
 if(!r.ok||!d.success)throw new Error(d.error||`Server error ${r.status}`);
 return d;
}
async function post(body){
 const r=await fetch(WORKER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
 const d=await r.json().catch(()=>({success:false,error:"Invalid server response"}));
 if(!r.ok||!d.success)throw new Error(d.error||`Server error ${r.status}`);
 return d;
}
async function cloudState(){return (await getJSON(`${WORKER}?mikaelTokens=1&t=${Date.now()}`)).state}
async function migrate(){
 if(localStorage.getItem(MIG)==="yes")return;
 const old=read(LOCAL,{inventory:{}});
 if(old?.inventory&&Object.values(old.inventory).some(v=>Number(v)>0)){
   await post({type:"mikael_reverse_token_sync",inventory:old.inventory});
 }
 localStorage.setItem(MIG,"yes");
}
async function renderPublic(){
 const win=$("tokenJarWindow");if(!win)return;
 const host=win.querySelector(".windowScroll")||win;
 let box=$("mikaelTokensBox");
 if(!box){box=document.createElement("section");box.id="mikaelTokensBox";host.appendChild(box)}
 try{
  const t=await cloudState();
  const rows=Object.entries(t.inventory||{}).filter(([n,c])=>Number(c)>0&&DEFS[n]);
  box.innerHTML=`<h3>🕴️ Mikael's Tokens</h3>
  <p class="mikaelTokenIntro">Reverse Tokens are synced across devices. Lizzy can see them here, but only Mikael can redeem them.</p>
  ${rows.length?rows.map(([n,c])=>{const d=DEFS[n];return `<div class="tokenCard mikaelReverseCard"><div class="tokenCardEmoji">${d.emoji}</div><div><strong>${n}</strong><p>${d.desc}</p></div><div class="tokenCount">×${c}</div></div>`}).join(""):`<div class="memoryMessage">Mikael has no Reverse Tokens yet. 😭</div>`}`;
 }catch(e){
  box.innerHTML=`<h3>🕴️ Mikael's Tokens</h3><div class="memoryMessage">⚠️ Could not reach the synced Mikael Token inventory.</div>`;
 }
}
function openPrivate(){
 $("mikaelRedeemWindow")?.classList.remove("hidden");
 if(sessionStorage.getItem(SESSION)==="yes")showDashboard();else showLogin();
}
function closePrivate(){$("mikaelRedeemWindow")?.classList.add("hidden")}
function showLogin(){
 $("mikaelRedeemLogin")?.classList.remove("hidden");
 $("mikaelRedeemDashboard")?.classList.add("hidden");
 if($("mikaelRedeemPassword"))$("mikaelRedeemPassword").value="";
 if($("mikaelRedeemLoginStatus"))$("mikaelRedeemLoginStatus").textContent="";
 setTimeout(()=>$("mikaelRedeemPassword")?.focus(),80);
}
function login(){
 const attempt=($("mikaelRedeemPassword")?.value||"").trim().toUpperCase().replace(/\s+/g,"");
 if(attempt!==ACCESS){
   $("mikaelRedeemLoginStatus").textContent="❌ Access denied.";
   $("mikaelRedeemPassword").value="";return;
 }
 // This is the crucial device separation:
 // once Mikael unlocks admin here, this browser will never acknowledge Lizzy's popups.
 localStorage.setItem(ADMIN_DEVICE,"yes");
 sessionStorage.setItem(SESSION,"yes");
 showDashboard();
}
async function showDashboard(){
 $("mikaelRedeemLogin")?.classList.add("hidden");
 $("mikaelRedeemDashboard")?.classList.remove("hidden");
 await renderPrivate();
}
async function renderPrivate(){
 const host=$("mikaelPrivateTokenList");if(!host)return;
 host.innerHTML='<div class="memoryMessage">☁️ Loading synced Reverse Tokens…</div>';
 try{
  const t=await cloudState();
  const rows=Object.entries(t.inventory||{}).filter(([n,c])=>Number(c)>0&&DEFS[n]);
  host.innerHTML=`<div class="mikaelCloudStatus">☁️ CLOUD SYNC: CONNECTED ✓</div>
  ${rows.length?rows.map(([n,c])=>{const d=DEFS[n];return `<div class="mikaelPrivateToken"><div class="mikaelPrivateEmoji">${d.emoji}</div><div><strong>${n}</strong><p>${d.desc}</p><small>Synced quantity: ×${c}</small></div><button type="button" data-cloud-redeem="${encodeURIComponent(n)}">Redeem 🔄</button></div>`}).join(""):`<div class="memoryMessage">No Mikael Reverse Tokens are currently available in Cloudflare.</div>`}
  <button type="button" id="testLizzyReverseAlert" class="mikaelTestAlert">Send Test Alert to Lizzy's Device 🧪</button>`;
  host.querySelectorAll("[data-cloud-redeem]").forEach(b=>b.onclick=()=>redeem(decodeURIComponent(b.dataset.cloudRedeem)));
  $("testLizzyReverseAlert")?.addEventListener("click",sendTestAlert);
 }catch(e){
  host.innerHTML=`<div class="memoryMessage">❌ CLOUD SYNC FAILED<br><small>${e.message}</small><br><br>Make sure the new Cloudflare Worker is deployed.</div>`;
 }
}
async function redeem(name){
 const d=DEFS[name];if(!d)return;
 if(!confirm(`Redeem ${name}?\\n\\n${d.desc}`))return;
 try{
  const x=await post({type:"mikael_reverse_token_redeem",name,emoji:d.emoji,desc:d.desc});
  alert(`✅ REDEEMED IN CLOUDFLARE\\n\\n${d.emoji} ${name}\\nRemaining: ×${x.redemption.remaining}\\n\\nLizzy's device has NOT acknowledged this yet.`);
  await renderPrivate();await renderPublic();
 }catch(e){alert(`❌ Redemption failed\\n\\n${e.message}`)}
}
async function sendTestAlert(){
 try{
  await post({type:"mikael_reverse_token_test",name:"Reverse Token Test",emoji:"🧪",desc:"This is a cross-device test from Mikael. No real token was used."});
  alert("🧪 Test alert queued in Cloudflare. Open LizzyOS on Lizzy's device and wait up to 15 seconds.");
 }catch(e){alert(`❌ Test failed: ${e.message}`)}
}
function ensureModal(){
 let m=$("reverseRedemptionModal");
 if(!m){m=document.createElement("div");m.id="reverseRedemptionModal";m.className="reverseRedemptionOverlay hidden";document.body.appendChild(m)}
 return m;
}
function showLizzyAlert(r){
 const m=ensureModal();
 m.innerHTML=`<div class="reverseRedemptionCard"><div class="reverseAlarm">🚨</div><small>${r.test?"CROSS-DEVICE TEST":"MIKAEL REVERSE TOKEN REDEEMED"}</small><h2>${r.emoji} ${r.name}</h2><p>${r.desc}</p>${r.test?"":`<div class="reverseRemaining">Mikael has ×${r.remaining} remaining</div>`}<button id="reverseAckBtn" type="button">${r.test?"Test Received ✓":"Fine 🙄"}</button><div id="reverseAckStatus"></div></div>`;
 m.classList.remove("hidden");
 $("reverseAckBtn").onclick=async()=>{
   $("reverseAckBtn").disabled=true;$("reverseAckStatus").textContent="Acknowledging…";
   try{
     await post({type:"mikael_reverse_token_ack",id:r.id});
     m.classList.add("hidden");setTimeout(checkPending,200);
   }catch(e){$("reverseAckStatus").textContent="Could not acknowledge. Try again.";$("reverseAckBtn").disabled=false}
 };
}
async function checkPending(){
 // Mikael's own laptop MUST NOT consume or acknowledge Lizzy's notification.
 if(localStorage.getItem(ADMIN_DEVICE)==="yes")return;
 if(!$("reverseRedemptionModal")?.classList.contains("hidden")&&$("reverseRedemptionModal"))return;
 try{
  const d=await getJSON(`${WORKER}?pendingReverseRedemptions=1&t=${Date.now()}`);
  if(d.redemptions?.length)showLizzyAlert(d.redemptions[0]);
 }catch(e){}
}
async function awardCloud(e){
 const r=e.detail?.reward;if(r?.[0]!=="REVERSE TOKEN")return;
 const d=DEFS[r[2]]||{emoji:r[1]||"🔄",desc:r[3]||""};
 try{
   await post({type:"mikael_reverse_token_award",name:r[2],emoji:d.emoji,desc:d.desc,source:"Daily Reward"});
   await renderPublic();
 }catch(e){console.warn("Reverse Token cloud award failed",e)}
}
window.addEventListener("lizzyDailyRewardClaimed",awardCloud);
$("tokenJarIcon")?.addEventListener("click",()=>setTimeout(renderPublic,100));
document.addEventListener("keydown",e=>{if(e.ctrlKey&&e.altKey&&e.key.toLowerCase()==="m"){e.preventDefault();openPrivate()}});
$("mikaelRedeemLoginBtn")?.addEventListener("click",login);
$("mikaelRedeemPassword")?.addEventListener("keydown",e=>{if(e.key==="Enter")login()});
$("mikaelRedeemClose")?.addEventListener("click",closePrivate);
$("mikaelRedeemCloseBtn")?.addEventListener("click",closePrivate);
$("mikaelRedeemLogout")?.addEventListener("click",()=>{sessionStorage.removeItem(SESSION);showLogin()});
setTimeout(async()=>{try{await migrate()}catch(e){}await renderPublic();await checkPending()},900);
setInterval(checkPending,15000);
window.MikaelCloudTokens={openPrivate,renderPublic,renderPrivate,checkPending};
})();

