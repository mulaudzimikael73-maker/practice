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

// MIKAEL TAKEOVER V1
const MP="lizzyLivingMikaelProfileV1";
const takeoverMessages=[
 "System update: Lizzy is still stunning. No patch required.",
 "Mr Perfect has reviewed the situation and decided he is correct.",
 "Reminder from management: Batman can operate in broad daylight.",
 "Drink some water. No, tequila doesn't count. 😭",
 "Justice for Lizzy has been temporarily suspended pending further investigation.",
 "Four Eyes detected. Threat level: suspiciously cute.",
 "Little Miss Attitude is currently operating within acceptable limits.",
 "Mabebeza, I hope you have a great day. This is a legally binding instruction.",
 "Your screen has been inspected. Too much LizzyOS. Not enough appreciation for Mikael.",
 "Mikael would like it noted that his knees are innocent.",
 "This notification contains no useful information. You're welcome.",
 "Mr Perfect Database reports a 100% chance Mikael adds another feature.",
 "Cody's lawyer has advised Mikael not to comment further.",
 "Breaking news: Mikael still thinks purple is elite.",
 "Agent Yelizaveta, your performance review says: suspicious but impressive.",
 "A totally unbiased audit has ranked Mikael first.",
 "LizzyOS has detected an illegal amount of attitude.",
 "The Office has been reclassified as educational material.",
 "If this message seems unnecessary, Takeover Mode is working correctly.",
 "Mikael has entered the system. Productivity immediately decreased."
];
const takeoverNotes=[
 "TAKEOVER NOTE: Drink some water. No, tequila doesn't count. 😭",
 "Mr Perfect was here. Allegedly.",
 "You look suspiciously pretty today. Investigation pending.",
 "Reminder: arguing with Mikael only gives him more material.",
 "Four Eyes, please report to the Compliments Department.",
 "Mabebeza.exe is running perfectly.",
 "Today's objective: survive Mikael's unnecessary commentary.",
 "If lost, blame JavaScript.",
 "Batman works nights. Mikael apparently works whenever.",
 "Cody has legal representation. Proceed carefully.",
 "Little Miss Attitude remains under observation.",
 "This sticky note achieved absolutely nothing.",
 "The system says you're stunning. I don't make the rules. — Mikael",
 "Important life advice: snacks first, consequences later.",
 "Mr Perfect has approved this desktop. You're welcome.",
 "Your daily reminder that Mikael is extremely humble.",
 "Do not press random buttons. Unless they look interesting.",
 "Current mission: have a good day. Failure is not accepted."
];

const takeoverLabels={
 folderIcon:"Mikael Archives",
 readMeIcon:"Read About Me",
 missionIcon:"Mikael Missions",
 openWhenIcon:"Open When Mikael Says",
 recycleBinIcon:"Evidence Disposal",
 gamesFolderStaticIcon:"Mikael's Arcade",
 classifiedFolderIcon:"Definitely Not Secret",
 livingDesktopIcon:"Mikael Control Room",
 internetIcon:"MickyNet",
 lizzyMailIcon:"Message Mr Perfect",
 lizzyGardenIcon:"Mikael's Garden Now",
 tokenJarIcon:"Mikael Tax Jar",
 seedStoreIcon:"Definitely Legit Store",
 calendarIcon:"Mikael's Schedule"
};

let takeoverPopupTimer=null;
let takeoverMessageTimer=null;
let takeoverBooting=false;

function takeoverOn(){return localStorage.getItem(MP)==="on"}

function desktopLabelNode(id){
 const el=$(id); if(!el)return null;
 return el.querySelector(":scope > span") || el.querySelector("span");
}
function applyTakeoverLabels(on){
 Object.entries(takeoverLabels).forEach(([id,newText])=>{
   const label=desktopLabelNode(id); if(!label)return;
   if(!label.dataset.normalLabel)label.dataset.normalLabel=label.textContent.trim();
   label.textContent=on?newText:label.dataset.normalLabel;
 });
}

function takeoverSticky(){
 if(!takeoverOn())return;
 const msg=takeoverNotes[Math.floor(Math.random()*takeoverNotes.length)];
 if($("stickyMessage"))$("stickyMessage").textContent=msg;
 if($("stickyPreview"))$("stickyPreview").textContent=msg;
}

function showTakeoverPopup(forceText){
 if(!takeoverOn())return;
 const box=$("mikaelTakeoverPopup"), text=$("mikaelTakeoverPopupText");
 if(!box||!text)return;
 text.textContent=forceText||takeoverMessages[Math.floor(Math.random()*takeoverMessages.length)];
 box.classList.remove("hidden");
 clearTimeout(takeoverPopupTimer);
 takeoverPopupTimer=setTimeout(()=>box.classList.add("hidden"),6500);
}
bind("mikaelTakeoverPopupClose","click",()=>$("mikaelTakeoverPopup")?.classList.add("hidden"));

function scheduleTakeoverMessage(){
 clearTimeout(takeoverMessageTimer);
 if(!takeoverOn())return;
 takeoverMessageTimer=setTimeout(()=>{
   if(takeoverOn())showTakeoverPopup();
   scheduleTakeoverMessage();
 },(2.5+Math.random()*3.5)*60000);
}

function takeoverBoot(){
 const boot=$("mikaelTakeoverBoot");
 if(!boot)return;
 takeoverBooting=true;
 boot.classList.remove("hidden");
 const lines=[
   "Mr Perfect is requesting editorial control…",
   "Disabling sensible decisions…",
   "Loading unnecessary commentary…",
   "Increasing Mikael sightings…",
   "Applying Batman-level security…",
   "Takeover complete."
 ];
 let i=0;
 const line=$("takeoverBootLine");
 const ticker=setInterval(()=>{if(line)line.textContent=lines[Math.min(++i,lines.length-1)]},430);
 setTimeout(()=>{
   clearInterval(ticker);
   boot.classList.add("hidden");
   takeoverBooting=false;
   showTakeoverPopup("Editorial control granted. LizzyOS is now under extremely questionable management.");
 },2800);
}

function renderProfile(){
 const on=takeoverOn();
 document.body.classList.toggle("mikaelProfileActive",on);
 document.body.classList.toggle("mikaelTakeoverActive",on);
 if($("mikaelProfileStatus"))$("mikaelProfileStatus").innerHTML=on
   ?"<b>ACTIVE 😈</b> — Mr Perfect has editorial control."
   :"OFFLINE — LizzyOS is behaving itself.";
 if($("toggleMikaelProfile"))$("toggleMikaelProfile").textContent=on
   ?"End Mikael Takeover"
   :"Activate Mikael Takeover";
 $("mikaelTakeoverBanner")?.classList.toggle("hidden",!on);
 applyTakeoverLabels(on);
 if(on){
   takeoverSticky();
   scheduleTakeoverMessage();
 }else{
   clearTimeout(takeoverMessageTimer);
   clearTimeout(takeoverPopupTimer);
   $("mikaelTakeoverPopup")?.classList.add("hidden");
   renderNote();
 }
}

function toggleProfileMode(){
 const next=takeoverOn()?"off":"on";
 localStorage.setItem(MP,next);
 if(next==="on"){
   renderProfile();
   takeoverBoot();
 }else{
   renderProfile();
   toast("💗 LizzyOS restored. Mikael has reluctantly returned control.");
 }
}
window.toggleMikaelProfileFallback=toggleProfileMode;

document.addEventListener("click",e=>{
 const b=e.target.closest("#toggleMikaelProfile");
 if(!b)return;
 e.preventDefault();
 toggleProfileMode();
});

// Takeover-only Easter eggs: click the takeover banner and the MIKAEL badge.
bind("mikaelTakeoverBanner","click",()=>showTakeoverPopup());
document.addEventListener("dblclick",e=>{
 if(!takeoverOn())return;
 if(e.target.closest("#livingDesktopIcon")){
   showTakeoverPopup("SECRET OVERRIDE: You found the control-room Easter egg. Mr Perfect approves. 🕴🏾");
 }
});

// Random tiny desktop glitches while takeover is active.
setInterval(()=>{
 if(!takeoverOn()||takeoverBooting||Math.random()>.28)return;
 document.body.classList.add("mikaelMicroGlitch");
 setTimeout(()=>document.body.classList.remove("mikaelMicroGlitch"),260);
},45000);

renderProfile();

// RARE MIKAEL
const msgs=["Caught me. Your prize is me saying you're stunning. 😌","Justice for Lizzy! Don't get used to it.","Rare Mikael sighting confirmed. 📸","Little Miss Attitude has excellent reflexes.","I was never here. — Mr Perfect","Fine. You win this one. Screenshot it."];
let timer,hideTimer,rareVisible=false;
function schedule(){clearTimeout(timer);const takeover=document.body.classList.contains("mikaelTakeoverActive");const chance=takeover?.78:.35;const delay=takeover?(1.2+Math.random()*2.3)*60000:(4+Math.random()*6)*60000;timer=setTimeout(()=>Math.random()<chance?spawn():schedule(),delay)}
function spawn(){const e=$("rareMikael");if(!e)return;clearTimeout(hideTimer);rareVisible=true;e.classList.remove("hidden","rareRun");e.classList.add("rareCatchable");e.style.top=(90+Math.random()*Math.max(120,innerHeight-260))+"px";e.style.left=(18+Math.random()*Math.max(80,innerWidth-170))+"px";hideTimer=setTimeout(()=>{if(!rareVisible)return;rareVisible=false;e.classList.add("hidden");e.classList.remove("rareCatchable");schedule()},10500)}
function catchRare(ev){if(ev){ev.preventDefault();ev.stopPropagation()}const e=$("rareMikael");if(!e||!rareVisible)return;rareVisible=false;clearTimeout(hideTimer);e.classList.add("rareCaught");toast("🕴🏾 "+msgs[Math.floor(Math.random()*msgs.length)]);setTimeout(()=>{e.classList.add("hidden");e.classList.remove("rareCaught","rareCatchable");schedule()},420)}
bind("rareMikael","click",catchRare);bind("rareMikael","pointerdown",catchRare);schedule();

console.log("LizzyOS Living Desktop: ONLINE");
})();

// ===== DAILY LIZZY MAIL — MIKAEL MESSAGE OF THE DAY =====
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const WORKER=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
const MESSAGES=["I hope you have a great day today, Mabebeza 💜", "Good morning, Little Miss Attitude. I hope today is kind to you.", "No question today. I just hope you’re okay 🤍", "I hope something unexpectedly nice happens to you today.", "Just checking in. How are you actually doing today?", "How’s my favourite bully doing today?", "Mikael checking in 🫡 Are we surviving?", "I hope today gives you at least one really good reason to smile.", "How’s your heart today? Serious question for once.", "Just wanted to remind you that somebody is rooting for you today. It’s me unfortunately.", "I hope you slept well, Mabebeza.", "What kind of day are we having: good, manageable, or absolutely criminal?", "How are you feeling today, genuinely?", "You better have smiled at least once today.", "I hope today is soft with you 💜", "No interrogation today. Just have a beautiful day.", "Sending you a little Mikael-approved good luck for today.", "Whatever today looks like, I hope you’re being kind to yourself.", "Reminder: you’re actually doing pretty well.", "I hope you get good food, good news and absolutely no nonsense today.", "If today has been rubbish, I formally request that tomorrow behaves better.", "I hope you know how appreciated you are.", "Just passing through your inbox to say hi 💜", "Good afternoon, Mabebeza. I hope the world has behaved itself today.", "Today’s Lizzy Mail has no agenda. I just wanted to say I hope you’re good.", "Important: if animals could talk, which one would be the rudest?", "Would you rather fight one horse-sized duck or 100 duck-sized horses?", "If you had to be haunted by one celebrity, who are you choosing?", "If your life had a narrator, who would you want narrating it?", "Would you rather have fingers as long as your legs or legs as short as your fingers?", "What animal do you think has absolutely no business existing?", "If aliens landed today, what’s the first thing you’re showing them?", "Would you rather sneeze glitter or cry Coca-Cola?", "If you could permanently delete one word from existence, what would it be?", "What conspiracy theory could you invent right now and convince me is real?", "If vegetables could scream, would you still eat them?", "If Cody could talk for five minutes, what do you think he’d expose first?", "What is the most suspicious-looking animal?", "If you woke up invisible tomorrow, what’s the first thing you’d do?", "If you had to replace your hands with kitchen utensils, what are you picking?", "Which fruit would win in a fight?", "If your phone could expose one thing about you, what would finish you?", "Would you rather have a personal chef or someone who does absolutely all your laundry?", "What’s the stupidest superpower you can think of?", "If you were arrested and nobody told me why, what would I assume you did?", "If you had to live inside one TV show for a month, which one?", "What’s one completely normal thing that you think is actually weird?", "If you became president tomorrow, what ridiculous law are you introducing first?", "What food would you defend with your life?", "Would you accept R1 million if every chair you sat on made a fart noise forever?", "Tell me one thing that happened today that you haven’t told me yet.", "What was the best part of your day?", "What was the most annoying part of your day?", "Did anything make you laugh today?", "What’s one thing you’re looking forward to?", "What would make today 10% better?", "What’s taking up most of your brain today?", "What are you currently craving?", "Tell me something completely random about your day.", "What’s your current mood in exactly three words?", "Rate today out of 10.", "What was today’s biggest plot twist?", "Who annoyed you today? Names. I want names.", "What did you eat today and was it actually good?", "What’s one thing you accomplished today?", "Did you learn anything interesting today?", "What are you avoiding doing right now? 👀", "What’s something you wish you could skip today?", "If you could restart today from one specific moment, which one?", "What’s one tiny thing that made today better?", "What’s the funniest thing you heard today?", "What song describes today?", "What’s your social battery sitting at right now?", "Are you tired-tired or just ‘I don’t want to do anything’ tired?", "What’s one thing you need right now?", "Website inspection 👀 What’s your favourite LizzyOS feature right now?", "What feature on this website do you actually use the most?", "What should Mikael add to LizzyOS next?", "Which Open When letter is your favourite?", "Be honest: have you been wasting your Micky Bucs?", "How many Micky Bucs do you currently have? This is an audit.", "Have you checked your Garden today? 🌷", "What’s your favourite plant in the Garden?", "Have you found anything hidden that you think I don’t know you found? 👀", "What’s the funniest thing on LizzyOS?", "What’s the most useless feature on this website? 😭", "Which feature surprised you the most?", "Have you been inside the CLASSIFIED folder lately? 🤨", "Rate Life Lessons with Micky out of 10. Choose carefully.", "Has Life Lessons with Micky taught you anything useful yet? 😭", "What’s the worst Life Lesson you’ve received so far?", "What’s the best Life Lesson you’ve received?", "Which LizzyOS personality is your favourite?", "What would you change about LizzyOS if you had admin access?", "If you could add one completely ridiculous app to this desktop, what would it be?", "Which game on LizzyOS do you actually enjoy the most?", "Which Crack the Code mission gave you the most trouble?", "Have you checked the Secret Shelf recently? 👀", "What do you think should be sold in the Vault next?", "Do you actually read everything I hide on this website?", "What reward would you add to the Daily Rewards?", "What should be worth 100 Micky Bucs?", "Would you rather get 50 Micky Bucs or one completely unknown Classified File?", "What should I hide somewhere on the website next?", "Give LizzyOS a rating out of 10. Remember who built it.", "Do you miss me or are you going to lie?", "Are you still convinced I’m annoying?", "Current Mikael approval rating: 1–10.", "How much trouble have you caused today?", "Have you bullied anyone today or am I still your primary victim?", "Question for The Bully: what exactly have my knees done to deserve this?", "When exactly did bullying my knees become part of your personality?", "Do you accept that Mr Perfect is an objectively accurate nickname?", "They had a chance to be Mr Perfect. What happened? 😔", "How does it feel knowing you created the Mr Perfect problem yourself?", "Who’s more dramatic between us? Think carefully.", "Who is more annoying between us? There is a correct answer.", "Who wins more arguments?", "Who would survive longer on a deserted island?", "Who would get us kicked out of somewhere first?", "Who is more likely to start laughing during a serious conversation?", "Who is more stubborn?", "Who would survive longer without their phone?", "Who would spend R1,000 faster?", "Who gives better gifts?", "Who plans better dates?", "Who is more competitive?", "Who is secretly softer?", "Who would win a roast battle?", "Who apologises first after an argument?", "Good morning, Four Eyes 👓 How’s life?", "Specsy, what are we complaining about today?", "Mabebeza, what’s on your mind?", "Little Miss Attitude, please submit today’s attitude report.", "Mother of the Year, how are the children? 😭", "Jaden Smith, give me one unnecessarily deep thought for today.", "The OPP has entered Lizzy Mail. What chaos are we causing today?", "Blind as a Bat, have you managed to find the reply button? 😭", "The Bully, please provide evidence that you’ve been nice to me recently.", "Four Eyes, what are we seeing today? Hopefully everything.", "Specsy 🤓 what’s today's outfit rating?", "Mabebeza 💜 what are we eating if I magically appear with food?", "Jaden Smith, what does the current political and economic state of the world mean to you?", "Mother of the Year, please confirm all imaginary dependants have been fed.", "Little Miss Attitude, what has caused today's attitude?", "The OPP, are we behaving today or absolutely not?", "Four Eyes 👓 quick question: glasses on or glasses off right now?", "Specsy has been summoned. Please report to Lizzy Mail immediately.", "Mabebeza, I have nothing to ask. I just wanted to use Mabebeza.", "Blind as a Bat 😭 what’s something obvious you completely missed recently?", "Pasta or burger tonight? You have five seconds.", "If I arrived with food right now, what should I bring?", "What’s your current dream meal?", "What’s one food everybody loves that you think is overrated?", "What’s your most controversial food opinion?", "Would you rather have unlimited pasta or unlimited tequila?", "What is the superior pasta shape?", "If you could only eat one takeaway for a month, what are you choosing?", "What’s your emergency comfort meal?", "If dessert was mandatory tonight, what are we getting?", "What’s the best flavour of ice cream? This answer matters.", "Would you rather give up sweets for a month or tequila for a month?", "What food could you eat three days in a row without complaining?", "If I gave you R500 specifically for food right now, where are you going?", "What’s something you’ve been craving for absolutely no reason?", "Random reminder: you’re actually stunning.", "No question. I just wanted you to know I appreciate you.", "I hope you know you make me laugh a lot.", "I hope you get to feel properly proud of yourself today.", "You deserve more credit for the things you manage quietly.", "No jokes for this one: I genuinely hope you're doing okay.", "You make ordinary conversations much more entertaining.", "Just reminding you that I’m always in your corner.", "I hope you know you can always talk to me when something’s bothering you.", "You’re pretty cool sometimes. Don't let this message inflate your ego.", "I hope whatever you're worrying about gets a little easier.", "You’re allowed to have a slow day. Mr Perfect has approved it.", "Just wanted to say I’m glad I know you 💜", "I hope you see yourself a little more kindly today.", "There are a lot of things I admire about you. Unfortunately, I cannot tell you all at once because your ego.", "You looked beautiful today. I haven't seen you, but statistically I'm comfortable making that claim.", "If today feels heavy, you don't have to solve everything today.", "I hope future Lizzy looks back and is proud of current Lizzy.", "No need to reply to this one. I just hope you have a really good day.", "Just a reminder that you matter to people more than you probably realise.", "What’s something you could give a 20-minute presentation on with zero preparation?", "What’s one thing you wish you were ridiculously good at?", "What’s something you want to do at least once this year?", "If money wasn't involved, what would your dream day look like?", "What’s one place you really want to visit?", "What’s a song you wish you could hear for the first time again?", "Which fictional character would you genuinely be friends with?", "What’s one childhood thing you wish you could experience again?", "What’s something small that instantly improves your mood?", "If you could master one skill overnight, what would it be?", "What’s a random memory that always makes you laugh?", "What’s something you've changed your opinion about recently?", "If we had an entire day with absolutely no responsibilities, what are we doing?", "Tell me one thing about you that you think I still don't know.", "Final question from Mr Perfect: what should tomorrow’s Lizzy Mail ask you? 👀"];
const STATE_KEY="lizzyDailyMailV1";
const REPLY_KEY="lizzyDailyMailRepliesV2";

function localDay(){
  return new Date().toLocaleDateString("en-CA");
}
function read(k,f){try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch{return f}}
function write(k,v){localStorage.setItem(k,JSON.stringify(v))}

function chooseMessageForToday(){
  const today=localDay();
  let state=read(STATE_KEY,null);
  if(state?.day===today && Number.isInteger(state.index) && MESSAGES[state.index]) return state;

  const previousIndex=Number.isInteger(state?.index)?state.index:-1;

  // Deterministic per date, but avoid immediately repeating yesterday.
  let hash=0;
  for(const ch of today) hash=(hash*31+ch.charCodeAt(0))>>>0;
  let index=hash%MESSAGES.length;
  if(index===previousIndex) index=(index+1)%MESSAGES.length;

  state={day:today,index};
  write(STATE_KEY,state);
  return state;
}

function todayMessage(){
  const s=chooseMessageForToday();
  return {...s,message:MESSAGES[s.index]};
}

function render(){
  const d=todayMessage();
  if($("dailyMailMessage")) $("dailyMailMessage").textContent=d.message;
  if($("dailyMailDate")) $("dailyMailDate").textContent=new Date().toLocaleDateString([],{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const input=$("dailyMailReply"), button=$("sendDailyMailReply");
  if(input){ input.disabled=false; input.value=""; }
  if(button) button.disabled=false;
  if($("dailyMailStatus")) $("dailyMailStatus").textContent="";
  if($("dailyMailReplyCount")) $("dailyMailReplyCount").textContent="0 / 800";
}

async function sendReply(){
  const d=todayMessage();
  const input=$("dailyMailReply");
  const status=$("dailyMailStatus");
  const button=$("sendDailyMailReply");
  const reply=(input?.value||"").trim();

  if(!reply){
    status.textContent="Type a reply first 💌";
    return;
  }

  button.disabled=true;
  status.textContent="Sending to Mikael…";

  try{
    const response=await fetch(WORKER,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        type:"💌 LIZZY MAIL — DAILY REPLY",
        title:`Lizzy replied to Daily Mail #${d.index+1}`,
        details:
          `TODAY'S MESSAGE FROM MIKAEL:\n${d.message}\n\n`+
          `LIZZY'S REPLY:\n${reply}\n\n`+
          `DATE: ${new Date().toLocaleString()}`,
        meta:{
          event:"daily_lizzy_mail_reply",
          message_number:d.index+1,
          daily_message:d.message,
          reply:reply,
          day:d.day
        },
        source:"LizzyOS"
      })
    });

    if(!response.ok) throw new Error("Telegram notification failed");

    const replies=read(REPLY_KEY,[]);
    replies.push({
      day:d.day,
      reply,
      sentAt:new Date().toISOString(),
      messageIndex:d.index,
      dailyMessage:d.message
    });
    write(REPLY_KEY,replies.slice(-250));

    status.textContent="✓ Sent to Mikael — you can reply again";
    input.value="";
    $("dailyMailReplyCount").textContent="0 / 800";
    input.disabled=false;
    button.disabled=false;
    input.focus();
  }catch(err){
    console.warn(err);
    status.textContent="❌ Could not send. Try again.";
    button.disabled=false;
  }
}

function openMail(){
  render();
  $("lizzyMailWindow")?.classList.remove("hidden");
  $("lizzyMailTodayDot")?.classList.add("hidden");
  setTimeout(()=>$("dailyMailReply")?.focus(),100);
}
function closeMail(){ $("lizzyMailWindow")?.classList.add("hidden"); }

$("lizzyMailIcon")?.addEventListener("click",openMail);
$("lizzyMailClose")?.addEventListener("click",closeMail);
$("lizzyMailCloseBtn")?.addEventListener("click",closeMail);
$("sendDailyMailReply")?.addEventListener("click",sendReply);
$("dailyMailReply")?.addEventListener("input",e=>{
  $("dailyMailReplyCount").textContent=`${e.target.value.length} / 800`;
});
$("dailyMailReply")?.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key==="Enter")sendReply();
});

// Show TODAY badge once per new calendar day until opened.
const viewedKey="lizzyDailyMailViewedV1";
if(localStorage.getItem(viewedKey)!==localDay()){
  $("lizzyMailTodayDot")?.classList.remove("hidden");
}
$("lizzyMailIcon")?.addEventListener("click",()=>localStorage.setItem(viewedKey,localDay()));

console.log("Lizzy Mail Daily Messages: ONLINE", MESSAGES.length, "messages");
})();

