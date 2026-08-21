
// ===== UNIFIED TELEGRAM NOTIFICATION BRIDGE =====
(()=>{
"use strict";
const WORKER=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
window.lizzyTelegramNotify=async function(type,title,details="",meta={}){
 try{
   const r=await fetch(WORKER,{
     method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify({type,title,details,meta,source:"LizzyOS"})
   });
   return r.ok;
 }catch(e){
   console.warn("Telegram notify failed",e);
   return false;
 }
};
})();

(()=>{
"use strict";
const $=id=>document.getElementById(id);
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch{return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const today=()=>new Date().toLocaleDateString("en-CA");
const open=id=>$(id)?.classList.remove("hidden");
const close=id=>$(id)?.classList.add("hidden");
const toast=m=>{if(typeof window.showToast==="function")window.showToast(m);else console.log(m)};

function bind(id,event,fn){const el=$(id);if(el)el.addEventListener(event,fn)}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

// WINDOWS
bind("livingDesktopIcon","click",()=>open("livingDesktopWindow"));
bind("livingDesktopClose","click",()=>close("livingDesktopWindow"));
bind("livingDesktopCloseBtn","click",()=>close("livingDesktopWindow"));
bind("classifiedFolderIcon","click",()=>{renderClassified();open("classifiedFolderWindow");setTimeout(injectMission7,50)});
bind("classifiedFolderClose","click",()=>close("classifiedFolderWindow"));
bind("classifiedFolderCloseBtn","click",()=>close("classifiedFolderWindow"));

// CLASSIFIED — preserve existing purchases and allow Mission 7 injector to coexist.
function renderClassified(){
 const p=$("classifiedArchivePanel"); if(!p)return;
 const files=[], seen=new Set();
 ["lizzyClassifiedFiles","lizzyPurchasedDossiers","lizzyOwnedClassified","lizzySecretShelfOwned"].forEach(k=>{
   const v=read(k,null);
   if(Array.isArray(v))v.forEach(x=>files.push(typeof x==="string"?{title:x}:x));
   else if(v&&typeof v==="object")Object.entries(v).forEach(([key,val])=>{if(val)files.push(typeof val==="object"?{title:val.title||val.name||key,...val}:{title:key})});
 });
 const unique=files.filter(f=>{const t=String(f.title||f.name||"Classified File");if(seen.has(t))return false;seen.add(t);return true});
 p.innerHTML=unique.length?unique.map(f=>`<div class="classifiedFileCard">📁 <b>${esc(f.title||f.name||"Classified File")}</b></div>`).join(""):`<div class="classifiedEmpty">🔒<br><b>No purchased dossiers yet.</b><p>Purchased classified files will appear here.</p></div>`;
}
function injectMission7(){
 // Call the existing mission engine if it is available.
 try{ if(typeof window.injectScavenger==="function")window.injectScavenger(); }catch{}
 // Existing engine also listens to clicks, so safely trigger a normal document click.
 document.body.dispatchEvent(new MouseEvent("click",{bubbles:true}));
}

// STICKY NOTE — hidden by default to keep desktop clean.
const notes=["Reminder: you're actually stunning. — Mikael","Drink some water. No, Coke doesn't count. 😭","Official notice: Mr Perfect remains undefeated.","You're so annoying. There, I said it first. 😂","Justice for Lizzy. Occasionally.","If I didn't know better, I would say she's a myth.","Little Miss Attitude has entered the operating system.","Please stop bullying my knees. Official request.","Yeah, my folder is deep like that. 😌","Have a good day, Four Eyes. Respectfully. 👓💗"];
function noteState(){let v=read("lizzyLivingStickyV1",null);if(!v||v.day!==today())v={day:today(),index:new Date().getDate()%notes.length};write("lizzyLivingStickyV1",v);return v}
function renderNote(){const v=noteState(),msg=notes[v.index%notes.length];if($("stickyMessage"))$("stickyMessage").textContent=msg;if($("stickyPreview"))$("stickyPreview").textContent=msg}
function showNote(show){$("livingStickyNote")?.classList.toggle("hidden",!show);if($("stickyToggle"))$("stickyToggle").textContent=show?"Hide Note":"Show Note";localStorage.setItem("lizzyLivingStickyVisibleV1",show?"1":"0")}
bind("stickyToggle","click",()=>showNote($("livingStickyNote")?.classList.contains("hidden")));
bind("stickyHide","click",()=>showNote(false));
bind("stickyNext","click",()=>{const v=noteState();v.index=(v.index+1)%notes.length;write("lizzyLivingStickyV1",v);renderNote()});
renderNote();showNote(localStorage.getItem("lizzyLivingStickyVisibleV1")==="1");

// Drag note.
(()=>{const el=$("livingStickyNote"),h=el?.querySelector(".stickyHandle");if(!el||!h)return;const pos=read("lizzyLivingStickyPosV1",null);if(pos){el.style.left=pos.x+"px";el.style.top=pos.y+"px";el.style.right="auto"}let drag=false,dx=0,dy=0;h.addEventListener("mousedown",e=>{if(e.target.closest("button"))return;drag=true;const r=el.getBoundingClientRect();dx=e.clientX-r.left;dy=e.clientY-r.top});document.addEventListener("mousemove",e=>{if(!drag)return;const x=Math.max(4,Math.min(innerWidth-el.offsetWidth-4,e.clientX-dx)),y=Math.max(4,Math.min(innerHeight-el.offsetHeight-4,e.clientY-dy));el.style.left=x+"px";el.style.top=y+"px";el.style.right="auto"});document.addEventListener("mouseup",()=>{if(!drag)return;drag=false;write("lizzyLivingStickyPosV1",{x:parseInt(el.style.left)||4,y:parseInt(el.style.top)||4})})})();

// MOOD
const moods=[["happy","😊 Happy"],["tired","🥱 Tired"],["dramatic","🎭 Dramatic"],["soft","🥹 Soft"],["annoyed","🙄 Annoyed"],["missing","🥺 Missing Mikael"]];
function currentMood(){const v=read("lizzyLivingMoodV1",null);return v&&v.day===today()?v:null}
function renderMood(){const v=currentMood();document.body.dataset.lizzyMood=v?.id||"";if($("moodDisplay"))$("moodDisplay").textContent=v?.label||"Not selected";document.querySelectorAll("[data-mood]").forEach(b=>b.disabled=!!v)}
if($("moodChoices"))$("moodChoices").innerHTML=moods.map(([id,label])=>`<button type="button" data-mood="${id}">${label}</button>`).join("");
$("moodChoices")?.addEventListener("click",e=>{const b=e.target.closest("[data-mood]");if(!b||currentMood())return;const m=moods.find(x=>x[0]===b.dataset.mood);write("lizzyLivingMoodV1",{day:today(),id:m[0],label:m[1]});renderMood();toast("🌤️ Mood saved for today.")});renderMood();

// COUNTDOWN
const CD="lizzyLivingCountdownV1";let celebrated=false;
function renderCountdown(){const v=read(CD,null),o=$("countdownDisplay");if(!o)return;if(!v?.when){o.textContent="No countdown yet";return}const ms=new Date(v.when).getTime()-Date.now();if(ms<=0){o.textContent=`🎉 ${v.name||"It's time!"}`;if(!celebrated){celebrated=true;document.body.classList.add("countdownCelebrate");setTimeout(()=>document.body.classList.remove("countdownCelebrate"),3200)}return}const d=Math.floor(ms/86400000),h=Math.floor(ms%86400000/3600000),m=Math.floor(ms%3600000/60000);o.textContent=`${v.name}: ${d}d ${h}h ${m}m`}
bind("countdownSave","click",()=>{const name=$("countdownName")?.value.trim(),when=$("countdownDate")?.value;if(!name||!when){toast("⏳ Add an event name and date.");return}write(CD,{name,when});celebrated=false;renderCountdown();toast("⏳ Countdown saved.")});
bind("countdownClear","click",()=>{localStorage.removeItem(CD);if($("countdownName"))$("countdownName").value="";if($("countdownDate"))$("countdownDate").value="";renderCountdown()});
const savedCD=read(CD,null);if(savedCD){if($("countdownName"))$("countdownName").value=savedCD.name||"";if($("countdownDate"))$("countdownDate").value=savedCD.when||""}renderCountdown();setInterval(renderCountdown,30000);

// MIKAEL PROFILE
const MP="lizzyLivingMikaelProfileV1";
function renderProfile(){const on=localStorage.getItem(MP)==="on";document.body.classList.toggle("mikaelProfileActive",on);if($("mikaelProfileStatus"))$("mikaelProfileStatus").innerHTML=on?"<b>ACTIVE 😈</b> — Mr Perfect has editorial control.":"OFFLINE — LizzyOS is behaving itself.";if($("toggleMikaelProfile"))$("toggleMikaelProfile").textContent=on?"Return to Lizzy Profile":"Activate Mikael Profile"}
bind("toggleMikaelProfile","click",()=>{localStorage.setItem(MP,localStorage.getItem(MP)==="on"?"off":"on");renderProfile();toast(localStorage.getItem(MP)==="on"?"😈 Mikael Profile activated.":"💗 Lizzy Profile restored.")});renderProfile();

// RARE MIKAEL
const msgs=["Caught me. Your prize is me saying you're stunning. 😌","Justice for Lizzy! Don't get used to it.","Rare Mikael sighting confirmed. 📸","Little Miss Attitude has excellent reflexes.","I was never here. — Mr Perfect","Fine. You win this one. Screenshot it."];
let timer;function schedule(){clearTimeout(timer);timer=setTimeout(()=>Math.random()<.35?spawn():schedule(),(4+Math.random()*6)*60000)}function spawn(){const e=$("rareMikael");if(!e)return;e.classList.remove("hidden");e.style.top=(90+Math.random()*Math.max(120,innerHeight-260))+"px";e.classList.remove("rareRun");void e.offsetWidth;e.classList.add("rareRun");setTimeout(()=>{e.classList.add("hidden");schedule()},10500)}
bind("rareMikael","click",()=>{const e=$("rareMikael");e.classList.add("hidden");toast("🕴🏾 "+msgs[Math.floor(Math.random()*msgs.length)]);schedule()});schedule();

console.log("LizzyOS Living Desktop: ONLINE");
})();

// ===== FORMSPREE COMPATIBILITY ROUTER =====
(()=>{
"use strict";
const realFetch=window.fetch.bind(window);
window.fetch=async function(input,init={}){
 const url=typeof input==="string"?input:(input?.url||"");
 if(/^https:\/\/formspree\.io\/f\//i.test(url)){
   let payload={};
   try{
     if(typeof init.body==="string")payload=JSON.parse(init.body);
   }catch(e){payload={raw:String(init.body||"")}}
   const title=payload.subject||payload.title||payload.game||payload.type||"LizzyOS Activity";
   const details=Object.entries(payload)
     .filter(([k])=>!["subject","title"].includes(k))
     .map(([k,v])=>`${k}: ${typeof v==="object"?JSON.stringify(v):v}`)
     .join("\n");
   const ok=await window.lizzyTelegramNotify?.(
     "📨 LIZZYOS LEGACY NOTIFICATION",
     String(title),
     details,
     {legacyFormspree:url}
   );
   return new Response(JSON.stringify({ok:ok!==false,success:ok!==false,routed:"telegram"}),{
     status:ok===false?502:200,
     headers:{"Content-Type":"application/json"}
   });
 }
 return realFetch(input,init);
};
})();



// ===== OPEN WHEN LETTER TELEGRAM NOTIFICATIONS =====
(()=>{
"use strict";
const bound=new WeakSet();
function bindLetters(){
 document.querySelectorAll("#openWhenWindow details, #purchasedLettersBox details, #openWhenWindow [data-letter]").forEach(el=>{
   if(bound.has(el))return;
   bound.add(el);
   if(el.tagName==="DETAILS"){
     el.addEventListener("toggle",()=>{
       if(!el.open)return;
       const title=el.querySelector("summary")?.textContent.trim()||"Open When Letter";
       window.lizzyTelegramNotify?.("💌 OPEN WHEN LETTER OPENED",title,"Lizzy opened this letter.");
     });
   }else{
     el.addEventListener("click",()=>{
       const title=el.dataset.letter||el.textContent.trim().slice(0,100)||"Open When Letter";
       window.lizzyTelegramNotify?.("💌 OPEN WHEN LETTER OPENED",title,"Lizzy opened this letter.");
     });
   }
 });
}
setTimeout(bindLetters,500);
document.getElementById("openWhenIcon")?.addEventListener("click",()=>setTimeout(bindLetters,120));
window.addEventListener("lizzyStoreRefresh",()=>setTimeout(bindLetters,100));
})();



// ===== LIZZY INTERNET + LIFE LESSONS =====
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const LESSONS=["Believe in yourself. I believe in myself enough for both of us.", "If Plan A fails, remember there are 25 other letters.", "You miss 100% of the shots you don't take. You also miss quite a few that you do.", "Progress is progress, unless you're going backwards.", "Do it scared. Do it tired. Just maybe don't do it drunk.", "A bad day is not a bad life. Very important distinction.", "You don't need motivation every day. Sometimes you just need to start.", "Future You is watching. Try not to embarrass them.", "Small steps still count. Unless you're running from a hyena.", "Don't compare Chapter 2 of your life to somebody else's Chapter 15.", "You've survived every difficult day you've had so far. Strong record.", "Success takes time. Unfortunately.", "Be patient. Even Wi-Fi takes a few seconds to connect.", "You can't control everything. You can, however, complain about it.", "Your comfort zone is comfortable for a reason. Leave occasionally.", "Dream big. Your budget can panic later.", "You don't have to be perfect. That position is already occupied.", "One day or day one. Or Tuesday. Tuesday also works.", "Sometimes the biggest obstacle between you and success is opening the laptop.", "Hard work beats talent when talent is taking a nap.", "Do fish know they're wet?", "If tomatoes are fruit, is ketchup technically a smoothie?", "Your future self remembers things you haven't done yet.", "Somewhere, somebody has accidentally waved back at someone who wasn't waving at them.", "If you clean a vacuum cleaner, do you become the vacuum cleaner?", "Every mirror you've ever looked into has technically seen you before.", "Nobody knows what the first person to milk a cow was trying to accomplish.", "If Cinderella's shoe fit perfectly, why did it fall off?", "Maybe pigeons think we're the weird ones.", "If two mind readers read each other's minds, whose mind are they reading?", "You have never seen your own face. Only reflections and pictures.", "Somewhere right now, somebody is saying 'where's my phone?' while holding their phone.", "The word 'queue' is just Q followed by four silent letters waiting their turn.", "Your stomach thinks all potatoes are mashed potatoes.", "If you're waiting for the waiter, aren't you the waiter?", "A birthday is technically your personal New Year's Day.", "The brain named itself. Suspicious.", "Nothing is on fire. Fire is on things.", "If you expect the unexpected, doesn't that make it expected?", "Every time you remember something embarrassing, your brain chose violence.", "Never let them know your next move. Walk backwards.", "If life closes a door, check whether it says PUSH.", "If nobody saw it happen, reconsider whether it needs to become public information.", "Never trust someone who says 'trust me.' Including me.", "If you're running late, walk faster while looking stressed.", "If something feels wrong, turn it off and back on again.", "When in doubt, get ice cream.", "Don't send the paragraph while angry. Draft it. Sleep. Reconsider your career as an author.", "Never argue with someone whose profile picture is a car.", "If you're going to procrastinate, at least make snacks first.", "Always check your pockets before doing laundry.", "Don't grocery shop hungry. That's how you become the owner of seventeen snacks.", "If you lose something, ask your mom. Moms have administrator privileges.", "Always screenshot the evidence.", "Never volunteer information nobody asked for.", "If you're confused, nod slowly. People may assume you're thinking.", "Always carry a charger.", "If someone says 'long story short,' prepare for a long story.", "If the Wi-Fi stops working, staring angrily at the router is mandatory.", "Never trust a chair that makes a noise before you've fully sat down.", "Money can't buy happiness, but being broke hasn't exactly impressed me.", "Save money. Future You has expensive taste.", "Before buying something, ask yourself: do I need this? Then ignore yourself responsibly.", "Never check your bank balance immediately after a night out.", "Financial freedom begins with not ordering food you already have at home.", "A discount is only saving money if you were actually going to buy it.", "You cannot budget your way out of buying snacks. Accept reality.", "Never lend money you're going to need back tomorrow.", "Compound interest sounds boring until it's your money.", "Your card declining is your bank staging an intervention.", "If you can't afford it twice, consider staring at it online instead.", "A budget is just telling your money where to disappear.", "Payday confidence should never be trusted.", "There are two versions of you: before payday and after payday.", "Rich is having money. Wealthy is forgetting you have a subscription and not noticing.", "Communication is important. Unfortunately, this means talking about feelings.", "Never go to sleep angry. Stay awake and become increasingly unreasonable.", "Sometimes saying 'you're right' is cheaper than continuing.", "Choose someone who makes you laugh. Life is already serious enough.", "If she says 'I'm fine,' further investigation may be required.", "Love is patient. Arguments are apparently not.", "The secret to relationships is communication, patience and occasionally food.", "Never underestimate the diplomatic power of ice cream.", "If you care about someone, annoy them regularly so they know you're still alive.", "Remember the little things. Apparently they become evidence later.", "Relationships require compromise. Unless I'm clearly right.", "A thoughtful message costs nothing and can mean everything.", "Sometimes quality time is literally just doing nothing together.", "Learn their favourite snack. This is strategic information.", "Being able to laugh together fixes more than people realise.", "Don't keep score in relationships. Unless you're bowling.", "If someone remembers the tiny things you tell them, pay attention.", "Sometimes 'Did you get home safely?' says more than a paragraph.", "Find somebody you can be ridiculous around.", "A good relationship should contain approximately 40% affection and 60% bullying. Research pending.", "Read the question before answering. Revolutionary concept.", "Google first. Panic second.", "Save your work. SAVE. YOUR. WORK.", "If something is due tomorrow, today is technically early.", "Group projects teach you that trust is dangerous.", "Never volunteer to present first unless you enjoy suffering.", "The smartest person in the room is often the person willing to ask the stupid question.", "You don't need to know everything. You need to know how to find things.", "Writing it down dramatically increases the chance you'll remember it.", "If you've read the same sentence five times, go to sleep.", "Studying while scrolling is just scrolling with educational guilt.", "Deadlines are motivational speakers with consequences.", "If your assignment says 2,000 words, suddenly every sentence becomes incredibly important.", "Spellcheck is a friend, not a substitute for reading.", "Never submit without opening the file one last time.", "Always be yourself. Unless you can be Batman.", "Batman had a plan for everything. Take notes.", "Never underestimate somebody wearing all black.", "A cape is impractical. Still cool though.", "If Batman can prepare for Superman, you can prepare for Monday.", "Confidence is walking into a room like Batman already investigated it.", "There is almost certainly a Batman quote appropriate for your situation.", "If your plan requires explaining why Batman would approve, it's probably a great plan.", "Some problems require patience. Others require a Batmobile.", "I don't make the rules. Unless they're Batman-related.", "Never make important decisions while hungry.", "Ice cream doesn't solve problems, but neither does being sad without ice cream.", "Fries taste better when stolen from somebody else's plate.", "Pasta is proof that life isn't completely terrible.", "A burger is just a sandwich with ambition.", "Dessert isn't unnecessary. It's emotional infrastructure.", "If somebody says they don't want fries, order extra.", "Never trust 'I'll just have one sweet.'", "Calories consumed while standing in the kitchen are administratively complicated.", "There's no such thing as too much pasta. Only inadequate containers.", "A wise man once said nothing. Unfortunately, I am not that man.", "If at first you don't succeed, investigate who witnessed it.", "Sometimes you need to look in the mirror and say: Future Me can handle this.", "The early bird gets the worm. I don't want a worm. I'm sleeping.", "Don't chase people. Unless they have your phone.", "If you're going through hell, keep going. Petrol is expensive.", "Confidence is just confusion with good posture.", "Every problem has a solution. Some solutions are just terrible.", "Think before you speak. Or don't. Sometimes the story is funnier that way.", "The consequences of my own actions continue to surprise me.", "If you don't know what you're doing, do it confidently.", "Never underestimate the power of saying 'that's crazy' when you weren't listening.", "Sometimes maturity is simply deciding not to send the message.", "You can't lose an argument if you leave the room. Strategic withdrawal.", "There's a fine line between confidence and delusion. I refuse to locate it.", "You're doing better than you think. Probably.", "Remember: panic is not a strategy. It's more of a lifestyle.", "Today is another opportunity to make a questionable decision and learn from it.", "If your plan works, you're a genius. If it doesn't, it was an experiment.", "Life is short. Order dessert."];
const VKEY="lizzyMickyWisdomVotesV1";
let current=Number(localStorage.getItem("lizzyLifeLessonIndex")||0)%LESSONS.length;
const close=()=>document.getElementById("internetWindow")?.classList.add("hidden");
function addr(v){if($("browserAddress"))$("browserAddress").textContent=v}
function home(){
 addr("lizzy://home");
 $("browserPage").innerHTML=`<div class="browserHome"><h2>Lizzy Search</h2><p>Where would you like to go?</p><div class="browserBookmarks"><button data-site="bank">🏦<b>Bank of Micky</b><small>Online Banking</small></button><button data-site="lessons">🧠<b>Life Lessons with Micky</b><small>Qualifications: Trust Me</small></button></div></div>`;
}
function bank(){
 addr("bankofmicky.lizzy");
 const old=document.getElementById("mickyBankPanel");
 $("browserPage").innerHTML=`<div class="bankWeb"><h2>🏦 Bank of Micky</h2><p>Definitely a legitimate financial institution™</p><div id="browserBankMirror"></div></div>`;
 const mirror=$("browserBankMirror");
 if(old)mirror.innerHTML=old.innerHTML;
 else mirror.innerHTML="<p>Bank interface unavailable in this build.</p>";
}
function voteState(){try{return JSON.parse(localStorage.getItem(VKEY)||'{"helpful":0,"useless":0}')}catch{return {helpful:0,useless:0}}}
function lessonsPage(){
 addr("lifelessons.micky");
 const v=voteState(),total=v.helpful+v.useless,rate=total?Math.round(v.helpful/total*100):100;
 $("browserPage").innerHTML=`<div class="lifeLessonsPage"><div class="wisdomBrand">🧠 LIFE LESSONS WITH MICKY™</div><p class="wisdomSub">Founder & Chief Philosopher • Qualifications: Trust Me.</p><div class="wisdomCard"><small>LIFE LESSON #${current+1}</small><blockquote>“${LESSONS[current]}”</blockquote><cite>— Mikael Mulaudzi</cite></div><div class="wisdomButtons"><button data-wisdom="helpful">👍 Helpful</button><button data-wisdom="useless">👎 Absolutely Useless</button><button id="wisdomNext">Give Me Another Life Lesson</button></div><p class="wisdomRating">Micky Wisdom Approval Rating: <b>${rate}%</b> (${v.helpful} helpful / ${v.useless} useless)</p></div>`;
}
async function vote(kind){
 const v=voteState();v[kind]=(v[kind]||0)+1;localStorage.setItem(VKEY,JSON.stringify(v));
 await window.lizzyTelegramNotify?.("🧠 LIFE LESSON VOTE",`Lesson #${current+1} — ${kind==="helpful"?"👍 Helpful":"👎 Absolutely Useless"}`,LESSONS[current]);
 lessonsPage();
}
$("internetIcon")?.addEventListener("click",()=>{$("internetWindow")?.classList.remove("hidden");home()});
$("internetClose")?.addEventListener("click",close);
$("internetCloseBtn")?.addEventListener("click",close);
$("browserHome")?.addEventListener("click",home);
$("browserBack")?.addEventListener("click",home);
$("browserPage")?.addEventListener("click",e=>{
 const site=e.target.closest("[data-site]")?.dataset.site;
 if(site==="bank")bank();
 if(site==="lessons")lessonsPage();
 const w=e.target.closest("[data-wisdom]")?.dataset.wisdom;
 if(w)vote(w);
 if(e.target.closest("#wisdomNext")){current=(current+1)%LESSONS.length;localStorage.setItem("lizzyLifeLessonIndex",String(current));lessonsPage()}
});
})();

