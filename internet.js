(()=>{
"use strict";
const $=id=>document.getElementById(id);
const WORKER=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
const LESSONS=["Believe in yourself. I believe in myself enough for both of us.", "If Plan A fails, remember there are 25 other letters.", "You miss 100% of the shots you don't take. You also miss quite a few that you do.", "Progress is progress, unless you're going backwards.", "Do it scared. Do it tired. Just maybe don't do it drunk.", "A bad day is not a bad life. Very important distinction.", "You don't need motivation every day. Sometimes you just need to start.", "Future You is watching. Try not to embarrass them.", "Small steps still count. Unless you're running from a hyena.", "Don't compare Chapter 2 of your life to somebody else's Chapter 15.", "You've survived every difficult day you've had so far. Strong record.", "Success takes time. Unfortunately.", "Be patient. Even Wi-Fi takes a few seconds to connect.", "You can't control everything. You can, however, complain about it.", "Your comfort zone is comfortable for a reason. Leave occasionally.", "Dream big. Your budget can panic later.", "You don't have to be perfect. That position is already occupied.", "One day or day one. Or Tuesday. Tuesday also works.", "Sometimes the biggest obstacle between you and success is opening the laptop.", "Hard work beats talent when talent is taking a nap.", "Do fish know they're wet?", "If tomatoes are fruit, is ketchup technically a smoothie?", "Your future self remembers things you haven't done yet.", "Somewhere, somebody has accidentally waved back at someone who wasn't waving at them.", "If you clean a vacuum cleaner, do you become the vacuum cleaner?", "Every mirror you've ever looked into has technically seen you before.", "Nobody knows what the first person to milk a cow was trying to accomplish.", "If Cinderella's shoe fit perfectly, why did it fall off?", "Maybe pigeons think we're the weird ones.", "If two mind readers read each other's minds, whose mind are they reading?", "You have never seen your own face. Only reflections and pictures.", "Somewhere right now, somebody is saying 'where's my phone?' while holding their phone.", "The word 'queue' is just Q followed by four silent letters waiting their turn.", "Your stomach thinks all potatoes are mashed potatoes.", "If you're waiting for the waiter, aren't you the waiter?", "A birthday is technically your personal New Year's Day.", "The brain named itself. Suspicious.", "Nothing is on fire. Fire is on things.", "If you expect the unexpected, doesn't that make it expected?", "Every time you remember something embarrassing, your brain chose violence.", "Never let them know your next move. Walk backwards.", "If life closes a door, check whether it says PUSH.", "If nobody saw it happen, reconsider whether it needs to become public information.", "Never trust someone who says 'trust me.' Including me.", "If you're running late, walk faster while looking stressed.", "If something feels wrong, turn it off and back on again.", "When in doubt, get ice cream.", "Don't send the paragraph while angry. Draft it. Sleep. Reconsider your career as an author.", "Never argue with someone whose profile picture is a car.", "If you're going to procrastinate, at least make snacks first.", "Always check your pockets before doing laundry.", "Don't grocery shop hungry. That's how you become the owner of seventeen snacks.", "If you lose something, ask your mom. Moms have administrator privileges.", "Always screenshot the evidence.", "Never volunteer information nobody asked for.", "If you're confused, nod slowly. People may assume you're thinking.", "Always carry a charger.", "If someone says 'long story short,' prepare for a long story.", "If the Wi-Fi stops working, staring angrily at the router is mandatory.", "Never trust a chair that makes a noise before you've fully sat down.", "Money can't buy happiness, but being broke hasn't exactly impressed me.", "Save money. Future You has expensive taste.", "Before buying something, ask yourself: do I need this? Then ignore yourself responsibly.", "Never check your bank balance immediately after a night out.", "Financial freedom begins with not ordering food you already have at home.", "A discount is only saving money if you were actually going to buy it.", "You cannot budget your way out of buying snacks. Accept reality.", "Never lend money you're going to need back tomorrow.", "Compound interest sounds boring until it's your money.", "Your card declining is your bank staging an intervention.", "If you can't afford it twice, consider staring at it online instead.", "A budget is just telling your money where to disappear.", "Payday confidence should never be trusted.", "There are two versions of you: before payday and after payday.", "Rich is having money. Wealthy is forgetting you have a subscription and not noticing.", "Communication is important. Unfortunately, this means talking about feelings.", "Never go to sleep angry. Stay awake and become increasingly unreasonable.", "Sometimes saying 'you're right' is cheaper than continuing.", "Choose someone who makes you laugh. Life is already serious enough.", "If she says 'I'm fine,' further investigation may be required.", "Love is patient. Arguments are apparently not.", "The secret to relationships is communication, patience and occasionally food.", "Never underestimate the diplomatic power of ice cream.", "If you care about someone, annoy them regularly so they know you're still alive.", "Remember the little things. Apparently they become evidence later.", "Relationships require compromise. Unless I'm clearly right.", "A thoughtful message costs nothing and can mean everything.", "Sometimes quality time is literally just doing nothing together.", "Learn their favourite snack. This is strategic information.", "Being able to laugh together fixes more than people realise.", "Don't keep score in relationships. Unless you're bowling.", "If someone remembers the tiny things you tell them, pay attention.", "Sometimes 'Did you get home safely?' says more than a paragraph.", "Find somebody you can be ridiculous around.", "A good relationship should contain approximately 40% affection and 60% bullying. Research pending.", "Read the question before answering. Revolutionary concept.", "Google first. Panic second.", "Save your work. SAVE. YOUR. WORK.", "If something is due tomorrow, today is technically early.", "Group projects teach you that trust is dangerous.", "Never volunteer to present first unless you enjoy suffering.", "The smartest person in the room is often the person willing to ask the stupid question.", "You don't need to know everything. You need to know how to find things.", "Writing it down dramatically increases the chance you'll remember it.", "If you've read the same sentence five times, go to sleep.", "Studying while scrolling is just scrolling with educational guilt.", "Deadlines are motivational speakers with consequences.", "If your assignment says 2,000 words, suddenly every sentence becomes incredibly important.", "Spellcheck is a friend, not a substitute for reading.", "Never submit without opening the file one last time.", "Always be yourself. Unless you can be Batman.", "Batman had a plan for everything. Take notes.", "Never underestimate somebody wearing all black.", "A cape is impractical. Still cool though.", "If Batman can prepare for Superman, you can prepare for Monday.", "Confidence is walking into a room like Batman already investigated it.", "There is almost certainly a Batman quote appropriate for your situation.", "If your plan requires explaining why Batman would approve, it's probably a great plan.", "Some problems require patience. Others require a Batmobile.", "I don't make the rules. Unless they're Batman-related.", "Never make important decisions while hungry.", "Ice cream doesn't solve problems, but neither does being sad without ice cream.", "Fries taste better when stolen from somebody else's plate.", "Pasta is proof that life isn't completely terrible.", "A burger is just a sandwich with ambition.", "Dessert isn't unnecessary. It's emotional infrastructure.", "If somebody says they don't want fries, order extra.", "Never trust 'I'll just have one sweet.'", "Calories consumed while standing in the kitchen are administratively complicated.", "There's no such thing as too much pasta. Only inadequate containers.", "A wise man once said nothing. Unfortunately, I am not that man.", "If at first you don't succeed, investigate who witnessed it.", "Sometimes you need to look in the mirror and say: Future Me can handle this.", "The early bird gets the worm. I don't want a worm. I'm sleeping.", "Don't chase people. Unless they have your phone.", "If you're going through hell, keep going. Petrol is expensive.", "Confidence is just confusion with good posture.", "Every problem has a solution. Some solutions are just terrible.", "Think before you speak. Or don't. Sometimes the story is funnier that way.", "The consequences of my own actions continue to surprise me.", "If you don't know what you're doing, do it confidently.", "Never underestimate the power of saying 'that's crazy' when you weren't listening.", "Sometimes maturity is simply deciding not to send the message.", "You can't lose an argument if you leave the room. Strategic withdrawal.", "There's a fine line between confidence and delusion. I refuse to locate it.", "You're doing better than you think. Probably.", "Remember: panic is not a strategy. It's more of a lifestyle.", "Today is another opportunity to make a questionable decision and learn from it.", "If your plan works, you're a genius. If it doesn't, it was an experiment.", "Life is short. Order dessert."];
const VKEY="lizzyMickyWisdomVotesV2";
let current=Math.floor(Math.random()*LESSONS.length);

async function notify(type,title,details){
 try{
  const r=await fetch(WORKER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type,title,details,source:"LizzyOS"})});
  return r.ok;
 }catch(e){console.warn(e);return false}
}
function setAddress(v){if($("browserAddress"))$("browserAddress").textContent=v}
function home(){
 setAddress("lizzy://home");
 $("browserPage").innerHTML=`<div class="browserHome">
 <div class="searchLogo">Lizzy<span>Search</span></div>
 <div class="fakeSearch">Search LizzyOS or enter address 🔍</div>
 <h3>Favourite Sites</h3>
 <div class="browserBookmarks">
  <button data-site="bank"><span>🏦</span><b>Bank of Micky</b><small>Online Banking</small></button>
  <button data-site="lessons"><span>🧠</span><b>Life Lessons with Micky</b><small>Qualifications: Trust Me.</small></button>
 </div></div>`;
}
const BANK_SESSION="lizzyBankLoggedInV2";
const BANK_PASSWORD="MRPERFECT";
const BANK_WALLET_KEY="lizzyMickyBucsV1";
const BANK_STATE_KEY="lizzyMickyBankV1";
const BANK_WEEK=7*24*60*60*1000;

function bankRead(key,fallback){
 try{const raw=localStorage.getItem(key);return raw===null?fallback:JSON.parse(raw)}
 catch(e){return fallback}
}
function bankWrite(key,value){localStorage.setItem(key,JSON.stringify(value))}
function bankWallet(){return Number(bankRead(BANK_WALLET_KEY,0))||0}
function bankSetWallet(n){
 bankWrite(BANK_WALLET_KEY,Math.max(0,Number(n)||0));
 window.dispatchEvent(new Event("lizzyStoreRefresh"));
}
function bankState(){
 const raw=bankRead(BANK_STATE_KEY,{savings:0,qualifyingSince:null,lastBonus:null});
 return {
   savings:Number(raw?.savings||0),
   qualifyingSince:raw?.qualifyingSince||null,
   lastBonus:raw?.lastBonus||null
 };
}
function bankSave(s){
 bankWrite(BANK_STATE_KEY,s);
 window.dispatchEvent(new Event("lizzyStoreRefresh"));
}
async function bankNotify(title,details){
 return notify("🏦 BANK OF MICKY",title,details);
}
function bank(){
 setAddress("https://bankofmicky.lizzy");
 if(sessionStorage.getItem(BANK_SESSION)==="yes")return bankDashboard();
 $("browserPage").innerHTML=`<div class="bankLoginPage">
 <div class="bankLoginBrand">🏦</div><h1>Bank of Micky</h1>
 <p class="bankTagline">Private Banking • Definitely Regulated™</p>
 <div class="bankLoginCard">
 <label>Client</label><div class="bankClient">Lebone Elizabeth Kganyago</div>
 <label for="bankPassword">Online Banking Password</label>
 <input id="bankPassword" type="password" autocomplete="off" placeholder="Enter password">
 <button id="bankLoginBtn" type="button">Sign In</button>
 <p id="bankLoginStatus" class="bankLoginStatus"></p></div>
 <small class="bankFinePrint">Bank of Micky will never ask you to send your Micky Bucs to a prince.</small>
 </div>`;
 setTimeout(()=>$("bankPassword")?.focus(),50);
}
function bankLogin(){
 const input=$("bankPassword"),status=$("bankLoginStatus");
 const attempt=(input?.value||"").trim().toUpperCase().replace(/\s+/g,"");
 if(attempt===BANK_PASSWORD){sessionStorage.setItem(BANK_SESSION,"yes");bankDashboard()}
 else{if(status)status.textContent="❌ Incorrect password. Access denied.";if(input){input.value="";input.focus()}}
}
function bankBonusText(s){
 if(s.savings<15)return `Save ${15-s.savings} more MB to start qualifying for the weekly bonus.`;
 if(!s.qualifyingSince)return "Savings timer will start now.";
 const elapsed=Date.now()-Number(s.qualifyingSince);
 if(elapsed<BANK_WEEK){const d=Math.ceil((BANK_WEEK-elapsed)/86400000);return `${d} day${d===1?"":"s"} remaining until the +2 MB bonus.`}
 if(s.lastBonus&&Date.now()-Number(s.lastBonus)<BANK_WEEK)return "This week's savings bonus has already been claimed.";
 return "🎉 Your +2 MB weekly savings bonus is ready.";
}
function bankDashboard(message=""){
 const s=bankState(),w=bankWallet();
 $("browserPage").innerHTML=`<div class="bankSite">
 <div class="bankSiteHeader"><div><small>BANK OF MICKY</small><h2>Good day, Lizzy 👋</h2></div><button id="bankLogout" type="button">Log Out</button></div>
 <div class="bankAccountCard"><small>AVAILABLE MICKY BUCS</small><div class="bankBigBalance">${w} <span>MB</span></div><div class="bankAccountNo">Everyday Wallet • **** 0002</div></div>
 <div class="bankGrid"><div class="bankMiniCard"><small>SAVINGS</small><strong>${s.savings} MB</strong><span>Bank of Micky Savings</span></div><div class="bankMiniCard"><small>WEEKLY BONUS</small><strong>+2 MB</strong><span>${bankBonusText(s)}</span></div></div>
 <div class="bankActions"><button type="button" data-web-bank="deposit">↓ Deposit 5 MB</button><button type="button" data-web-bank="withdraw">↑ Withdraw 5 MB</button><button type="button" data-web-bank="bonus">🎁 Claim Weekly Bonus</button></div>
 ${message?`<div class="bankWebStatus">${message}</div>`:""}
 <div class="bankRules"><b>How savings work</b><p>Move 5 MB at a time between your wallet and savings. Keep at least 15 MB saved for 7 days to qualify for the +2 MB weekly bonus.</p></div></div>`;
}
async function bankAction(action){
 let s=bankState(),w=bankWallet();
 if(action==="deposit"){
   if(w<5)return bankDashboard("😭 You need at least 5 MB in your wallet to deposit.");
   w-=5;s.savings+=5;
   if(s.savings>=15&&!s.qualifyingSince)s.qualifyingSince=Date.now();
   bankSetWallet(w);bankSave(s);
   bankDashboard("✅ 5 MB deposited into savings.");
   bankNotify("Deposit",`5 MB\nWallet: ${w} MB\nSavings: ${s.savings} MB`);
   return;
 }
 if(action==="withdraw"){
   if(s.savings<5)return bankDashboard("😭 You need at least 5 MB in savings to withdraw.");
   s.savings-=5;w+=5;
   if(s.savings<15)s.qualifyingSince=null;
   bankSetWallet(w);bankSave(s);
   bankDashboard("✅ 5 MB withdrawn back to your wallet.");
   bankNotify("Withdrawal",`5 MB\nWallet: ${w} MB\nSavings: ${s.savings} MB`);
   return;
 }
 if(action==="bonus"){
   if(s.savings<15||!s.qualifyingSince||Date.now()-Number(s.qualifyingSince)<BANK_WEEK)
     return bankDashboard("🔒 Keep at least 15 MB saved for 7 days before claiming the bonus.");
   if(s.lastBonus&&Date.now()-Number(s.lastBonus)<BANK_WEEK)
     return bankDashboard("⏳ This week's savings bonus has already been claimed.");
   s.lastBonus=Date.now();w+=2;bankSave(s);bankSetWallet(w);
   bankDashboard("🎉 Weekly savings bonus claimed: +2 MB!");
   bankNotify("Weekly bonus claimed",`+2 MB\nWallet: ${w} MB\nSavings: ${s.savings} MB`);
 }
}
function state(){try{return JSON.parse(localStorage.getItem(VKEY)||'{"helpful":0,"useless":0}')}catch{return {helpful:0,useless:0}}}
function lesson(){
 setAddress("https://lifelessonswithmicky.lizzy");
 const s=state(), total=s.helpful+s.useless, rating=total?Math.round(s.helpful/total*100):100;
 $("browserPage").innerHTML=`<div class="lifeLessonsPage">
 <div class="wisdomBrand">🧠 LIFE LESSONS WITH MICKY™</div>
 <p class="wisdomSub">Founder & Chief Philosopher • Qualifications: Trust Me.</p>
 <div class="wisdomCard"><small>LIFE LESSON #${current+1}</small><blockquote>“${LESSONS[current]}”</blockquote><cite>— Mikael Mulaudzi</cite></div>
 <div class="wisdomButtons"><button data-vote="helpful">👍 Helpful</button><button data-vote="useless">👎 Absolutely Useless</button><button id="anotherLesson">Give Me Another Life Lesson</button></div>
 <p class="wisdomRating">Micky Wisdom Approval Rating: <b>${rating}%</b> • ${s.helpful} helpful / ${s.useless} useless</p>
 </div>`;
}
async function vote(kind){
 const s=state();s[kind]=(s[kind]||0)+1;localStorage.setItem(VKEY,JSON.stringify(s));
 const label=kind==="helpful"?"👍 Helpful":"👎 Absolutely Useless";
 await notify("🧠 LIFE LESSON VOTE",`Lesson #${current+1} — ${label}`,LESSONS[current]);
 lesson();
}
function open(){ $("internetWindow")?.classList.remove("hidden"); home(); }
function close(){ $("internetWindow")?.classList.add("hidden"); }

$("internetIcon")?.addEventListener("click",open);
$("internetClose")?.addEventListener("click",close);
$("internetCloseBtn")?.addEventListener("click",close);
$("browserHome")?.addEventListener("click",home);
$("browserBack")?.addEventListener("click",home);
$("browserPage")?.addEventListener("click",e=>{
 const site=e.target.closest("[data-site]")?.dataset.site;
 if(site==="bank")bank(); else if(site==="lessons")lesson(); else if(site==="home")home();
 if(e.target.closest("#bankLoginBtn")) bankLogin();
 if(e.target.closest("#bankLogout")){sessionStorage.removeItem(BANK_SESSION);bank();}
 const bankAct=e.target.closest("[data-web-bank]")?.dataset.webBank;
 if(bankAct)bankAction(bankAct);
 const v=e.target.closest("[data-vote]")?.dataset.vote;
 if(v)vote(v);
 if(e.target.closest("#anotherLesson")){let n=current;while(n===current&&LESSONS.length>1)n=Math.floor(Math.random()*LESSONS.length);current=n;lesson()}
});
$("browserPage")?.addEventListener("keydown",e=>{
 if(e.key==="Enter" && e.target?.id==="bankPassword")bankLogin();
});
console.log("LizzyOS Internet: ONLINE", LESSONS.length, "lessons");
})();