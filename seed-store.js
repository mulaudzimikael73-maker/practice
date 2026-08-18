
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

/* Original Micky Jobs verification remains unchanged. */

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
 const box=$("classifiedItemCard"); if(box)box.innerHTML="";
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
renderExtras();renderBank();renderAchievements();
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
/* Original Micky Jobs verification remains authoritative. */
const ITEMS=[
{id:"letter_001",icon:"💌",publicName:"Unreleased Letter #001",kind:"letter",content:CONTENT.letter},
{id:"mystery_reward",icon:"🎁",publicName:"Mystery Reward",kind:"mikael_token",content:CONTENT.uno}
];
const shelf=()=>read(K.shelf,{owned:{},bids:{}}),saveShelf=s=>write(K.shelf,s);
function renderShelf(){
 const h=$("secretShelfPanel");if(!h)return;
 let s=shelf();
 const cards=ITEMS.map(i=>{
   let o=s.owned[i.id],b=s.bids[i.id];
   let status=o?"OWNED 🔓":b?.status==="pending"?"OFFER PENDING ⏳":b?.status==="countered"?`MIKAEL COUNTERED: ${b.counter} MB`:"NEGOTIATION OPEN";
   let controls=o?"":`<input type="number" min="1" data-bid-input="${i.id}" placeholder="${b?.counter?`Counter ${b.counter} MB`:"Your offer in MB"}"><button data-bid="${i.id}">Submit Offer</button>`;
   return `<div class="secretItem"><div style="font-size:32px">${i.icon}</div><strong>${i.publicName}</strong><small>${status}</small>${controls}</div>`;
 }).join("");
 h.innerHTML=`<h3>🔒 Mikael's Secret Shelf</h3><p class="seedStoreIntro">Two classified items. No fixed prices — make Mikael an offer.</p><div class="secretShelfGrid">${cards}</div>`;
 h.querySelectorAll("[data-bid]").forEach(b=>b.onclick=()=>submitBid(b.dataset.bid));
}
async function submitBid(id){let inp=document.querySelector(`[data-bid-input="${CSS.escape(id)}"]`),amount=Math.floor(Number(inp?.value));if(!amount||amount<1)return alert("Enter an offer first.");if(amount>wallet())return alert("You cannot bid more than your current balance.");let item=ITEMS.find(x=>x.id===id),s=shelf(),bid={id:`bid_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,itemId:id,item:item.publicName,amount,status:"pending",createdAt:new Date().toISOString()};s.bids[id]=bid;saveShelf(s);renderShelf();try{await fetch(worker,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"secret_bid",...bid})})}catch(e){}window.lizzyTelegramNotify?.("💰 SECRET SHELF BID",item.publicName,`Lizzy offered ${amount} MB\nBid ID: ${bid.id}`)}
function grant(item,price){if(wallet()<price)return false;setWallet(wallet()-price);let s=shelf();s.owned[item.id]={at:new Date().toISOString(),price};saveShelf(s);if(item.kind==="letter"){let l=read(K.letters,[]);if(!l.some(x=>x.id===item.id))l.push({id:item.id,title:item.publicName,content:item.content});write(K.letters,l);renderLetters()}if(item.kind==="mikael_token"){let t=read(K.mTokens,{inventory:{},history:[]});t.inventory["UNO Reverse"]=Number(t.inventory["UNO Reverse"]||0)+1;write(K.mTokens,t);renderMikaelTokens()}if(item.kind==="vault"){let v=read("lizzyVaultRewardsV1",[]);v.push({id:"mrperfect_file",title:"Classified File #003 — Operation: Mr Perfect",content:CONTENT.file3});write("lizzyVaultRewardsV1",v)}return true}
async function poll(){let s=shelf();for(const item of ITEMS){let b=s.bids[item.id];if(!b||!["pending","countered"].includes(b.status))continue;try{let r=await fetch(`${worker}?action=bid_status&bidId=${encodeURIComponent(b.id)}`);if(!r.ok)continue;let d=await r.json();if(d.status==="accepted"&&!s.owned[item.id]){let price=Number(d.price||b.amount);if(grant(item,price)){b.status="accepted";s.bids[item.id]=b;saveShelf(s)}}else if(d.status==="rejected"){b.status="rejected";s.bids[item.id]=b;saveShelf(s)}else if(d.status==="countered"){b.status="countered";b.counter=Number(d.price);s.bids[item.id]=b;saveShelf(s)}}catch(e){}}renderShelf()}
function renderLetters(){let w=$("openWhenWindow")||$("openWhenFolderWindow");if(!w)return;let b=$("purchasedLettersBox");if(!b){b=document.createElement("div");b.id="purchasedLettersBox";w.appendChild(b)}let l=read(K.letters,[]);b.innerHTML=l.length?'<h3>🛍️ Purchased Letters</h3>'+l.map(x=>`<details class="purchasedLetter"><summary>💌 ${x.title}</summary><pre>${x.content}</pre></details>`).join(""):""}
function renderMikaelTokens(){let w=$("tokenJarWindow");if(!w)return;let b=$("mikaelTokensBox");if(!b){b=document.createElement("div");b.id="mikaelTokensBox";w.appendChild(b)}let t=read(K.mTokens,{inventory:{}}),n=Number(t.inventory["UNO Reverse"]||0);b.innerHTML=`<h3>🕴️ Mikael's Tokens</h3>${n?`<div class="tokenCard"><div class="tokenCardEmoji">🔄</div><div><strong>UNO Reverse</strong><p>Mikael has the power: one playful, reasonable request for Lizzy.</p></div><div class="tokenCount">×${n}</div></div>`:'<div class="memoryMessage">No Mikael Tokens unlocked yet.</div>'}`}
$("seedStoreIcon")?.addEventListener("click",()=>setTimeout(renderShelf,50));$("openWhenIcon")?.addEventListener("click",()=>setTimeout(renderLetters,50));$("tokenJarIcon")?.addEventListener("click",()=>setTimeout(renderMikaelTokens,50));setInterval(poll,20000);renderShelf();renderLetters();renderMikaelTokens();
})();

/* REAL WEBSITE EXTRAS DELIVERY — task verification untouched */
(() => {
"use strict";
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(e){return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function refreshExtras(){
 const x=read("lizzyStoreExtrasV1",{owned:{}}),o=x.owned||{},g=read("lizzyGardenV1",null),ledger=read("lizzyExtrasDeliveryLedgerV1",{});
 if(g&&typeof g==="object"){g.seeds=g.seeds||{};while(Number(ledger.mystery_pack||0)<Number(o.mystery_pack||0)){const pool=["tulipSeed","roseSeed","jacarandaSeed","sunflowerSeed","lilySeed"];const id=pool[Math.floor(Math.random()*pool.length)];g.seeds[id]=Number(g.seeds[id]||0)+1;ledger.mystery_pack=Number(ledger.mystery_pack||0)+1}write("lizzyGardenV1",g);write("lizzyExtrasDeliveryLedgerV1",ledger)}
 const root=document.getElementById("gardenWindow")||document.querySelector(".gardenWindow");if(!root)return;
 let fx=document.getElementById("lizzyRealExtrasFx");if(!fx){fx=document.createElement("div");fx.id="lizzyRealExtrasFx";fx.className="lizzyRealExtrasFx";root.appendChild(fx)}fx.innerHTML="";
 if(o.fairy_lights)fx.innerHTML+=`<div class="realFairyLights"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
 if(o.butterflies)fx.innerHTML+=`<span class="realButterfly rb1">🦋</span><span class="realButterfly rb2">🦋</span>`;
 if(o.falling_petals)fx.innerHTML+=`<span class="realPetal rp1">🌸</span><span class="realPetal rp2">🌸</span><span class="realPetal rp3">🌸</span>`;
 const pot=o.heart_pot?"heart":o.gotham_pot?"gotham":o.moon_pot?"moon":null;
 document.querySelectorAll(".gardenPlot .plantVisual").forEach(v=>{v.querySelector(".realCustomPot")?.remove();if(pot)v.insertAdjacentHTML("beforeend",`<span class="realCustomPot ${pot}">${pot==="heart"?"♥":pot==="gotham"?"🦇":"🌙"}</span>`)});
}
setTimeout(refreshExtras,500);document.getElementById("gardenIcon")?.addEventListener("click",()=>setTimeout(refreshExtras,100));window.addEventListener("lizzyStoreRefresh",refreshExtras);
})();



/* =========================================================
   REAL SITE FIX — PURCHASED EXTRAS + NAME-A-PLANT PASS
   ========================================================= */
(() => {
"use strict";
const $=id=>document.getElementById(id);
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(e){return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const X="lizzyStoreExtrasV1", NAMES="lizzyCustomPlantNamesV1";

const LABELS={
 heart_pot:"💗 Heart Pot",gotham_pot:"🦇 Gotham Pot",moon_pot:"🌙 Moon Pot",
 fairy_lights:"✨ Fairy Lights",butterflies:"🦋 Garden Butterflies",
 falling_petals:"🌸 Falling Petals",mystery_pack:"🎁 Mystery Seed Pack",
 name_plant:"🏷️ Name-a-Plant Pass",discount25:"🎟️ 25% Seed Coupon"
};

function extrasHost(){
 const panel=$("storeExtrasPanel")||$("seedStoreWindow");
 if(!panel)return null;
 let box=$("purchasedExtrasBox");
 if(!box){box=document.createElement("section");box.id="purchasedExtrasBox";box.className="purchasedExtrasBox";panel.appendChild(box)}
 return box;
}
function renderOwnedExtras(){
 const box=extrasHost();if(!box)return;
 const x=read(X,{owned:{},coupons:[]}),owned=x.owned||{};
 const rows=Object.entries(owned).filter(([,n])=>Number(n)>0);
 box.innerHTML=`<h3>🎒 My Extras</h3>${rows.length?rows.map(([id,n])=>`
 <div class="ownedExtraRow"><span><strong>${LABELS[id]||id}</strong> ×${n}</span>
 ${id==="name_plant"?'<button id="useNamePlantPass">Use Pass</button>':""}</div>`).join(""):'<p class="seedStoreIntro">Purchased extras will appear here.</p>'}`;
 $("useNamePlantPass")?.addEventListener("click",useNamePass);
}
function useNamePass(){
 const x=read(X,{owned:{},coupons:[]});
 if(Number(x.owned?.name_plant||0)<1)return alert("You do not have a Name-a-Plant Pass.");
 const g=read("lizzyGardenV1",null);
 if(!g?.plants?.length)return alert("Plant something in the Garden first 🌱");
 const options=g.plants.map((p,i)=>`${i+1}. ${p.customName||p.flowerId||"Plant"}`).join("\n");
 const pick=Number(prompt(`Which plant would you like to name?\n\n${options}\n\nEnter its number:`));
 if(!Number.isInteger(pick)||pick<1||pick>g.plants.length)return;
 const plant=g.plants[pick-1];
 const name=(prompt("What would you like to name this plant?")||"").trim();
 if(!name)return;
 const names=read(NAMES,{});
 names[plant.id]=name;write(NAMES,names);
 x.owned.name_plant=Number(x.owned.name_plant)-1;write(X,x);
 applyNames();renderOwnedExtras();
 window.lizzyTelegramNotify?.("🏷️ NAME-A-PLANT PASS USED",name,"Lizzy named one of her Garden plants.");
 alert(`🌷 Plant named "${name}"!`);
}
function applyNames(){
 const names=read(NAMES,{});
 document.querySelectorAll(".gardenPlot[data-plant]").forEach(plot=>{
   const n=names[plot.dataset.plant];if(!n)return;
   const strong=plot.querySelector(".plantMeta strong");if(strong)strong.textContent=n;
 });
}
let obs;
function watchGarden(){
 const host=$("gardenPlots");if(!host)return;
 obs?.disconnect();obs=new MutationObserver(()=>setTimeout(applyNames,20));obs.observe(host,{childList:true,subtree:true});applyNames();
}
setTimeout(()=>{renderOwnedExtras();watchGarden()},400);
$("seedStoreIcon")?.addEventListener("click",()=>setTimeout(renderOwnedExtras,80));
$("gardenIcon")?.addEventListener("click",()=>setTimeout(()=>{watchGarden();applyNames()},80));
window.addEventListener("lizzyStoreRefresh",()=>setTimeout(renderOwnedExtras,50));
})();

