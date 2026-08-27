
// =====================================================
// LIZZYOS TELEGRAM NOTIFICATION BRIDGE
// Uses text/plain to avoid browser CORS preflight failures.
// =====================================================
const LIZZY_TELEGRAM_WORKER_URL = "https://lizzyos-notifications.mulaudzimikael73.workers.dev/";

async function lizzyTelegramNotify(type, title, details) {
  try {
    const payload = JSON.stringify({
      type: type || "LizzyOS Activity",
      title: title || "New Activity",
      details: details || "No additional details."
    });

    const response = await fetch(LIZZY_TELEGRAM_WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: payload
    });

    if (!response.ok) {
      console.error("Telegram Worker error:", response.status, await response.text());
      return false;
    }
    console.log("LizzyOS Telegram notification sent:", type);
    return true;
  } catch (error) {
    console.error("LizzyOS Telegram notification failed:", error);
    return false;
  }
}

// =============================================
// LIZZY-DATE
// Version 2.0
// =============================================

// Scenes
const loading = document.getElementById("loading");
const opening = document.getElementById("opening");
const storybook = document.getElementById("storybook");
const quiz = document.getElementById("quiz");
const tvSection = document.getElementById("tvSection");
const story = document.getElementById("story");
const proposal = document.getElementById("proposal");
const celebration = document.getElementById("celebration");
const secretEnding = document.getElementById("secretEnding");

// Progress Bar
const progressFill = document.getElementById("progressFill");

// Buttons
const startStory = document.getElementById("startStory");
const nextChapter = document.getElementById("nextChapter");
const continueStory = document.getElementById("continueStory");
const proposalButton = document.getElementById("proposalButton");
const secretButton = document.getElementById("secretButton");

let progress = 0;

// =============================================
// EMAILJS
// =============================================

function sendYesEmail() {

    fetch("https://formspree.io/f/mrpzkqez", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify({

            message: "🎉 Lizzy clicked YES! ❤️"

        })

    })
    .then(() => {

        console.log("✅ Formspree notification sent!");

    })
    .catch((error) => {

        console.error("❌ Formspree Error:", error);

    });

}
// =============================================
// Loading Screen
// =============================================

window.onload = () => {

    setTimeout(() => {

        loading.style.display = "none";

        opening.classList.remove("hidden");

    },3000);

};

// =============================================
// Progress
// =============================================

function updateProgress(){

    progress += 14;

    if(progress > 100){

        progress = 100;

    }

    progressFill.style.width = progress + "%";

}

// =============================================
// Scene Helper
// =============================================

function hideAll(){

    opening.classList.add("hidden");
    storybook.classList.add("hidden");
    quiz.classList.add("hidden");
    tvSection.classList.add("hidden");
    story.classList.add("hidden");
    proposal.classList.add("hidden");
    celebration.classList.add("hidden");
    secretEnding.classList.add("hidden");

}

// =============================================
// Opening
// =============================================

startStory.addEventListener("click",()=>{

    hideAll();

    storybook.classList.remove("hidden");

    updateProgress();

});

// =============================================
// Storybook
// =============================================

nextChapter.addEventListener("click",()=>{

    hideAll();

    quiz.classList.remove("hidden");

    updateProgress();

});

// =============================================
// Quiz Questions
// =============================================

const questions = [

{

question:"What's obviously the best colour? 🌸",

answers:[

"Pink 💗",

"Light Pink 🌸",

"Every Shade of Pink 💖"

]

},

{

question:"Choose dinner 🍝",

answers:[

"Pasta",

"More Pasta",

"Unlimited Pasta"

]

},

{

question:"Choose a TV world 📺",

answers:[

"The Office",

"Brooklyn Nine-Nine",

"Gilmore Girls",

"High School Musical"

]

}

];

let currentQuestion = 0;

const questionTitle = document.getElementById("questionTitle");
const answers = document.getElementById("answers");

function loadQuestion(){

    questionTitle.innerHTML =
    questions[currentQuestion].question;

    answers.innerHTML="";

    questions[currentQuestion].answers.forEach(answer=>{

        const button =
        document.createElement("button");

        button.innerHTML=answer;

        button.onclick = () => {

    playSelectionSound(answer);

    setTimeout(() => {

        nextQuestion();

    }, 1200);

};

        answers.appendChild(button);

    });

}

loadQuestion();
function playSelectionSound(answer){

    [officeAudio, brooklynAudio, gilmoreAudio, hsmAudio].forEach(audio => {
        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
    });

    function playClip(audio, startAt, durationMs) {
        if (!audio) return;

        audio.currentTime = startAt;
        audio.play().catch(() => {});

        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
        }, durationMs);
    }

    switch(answer){

        case "The Office":
            // Uploaded clip is 4.27s: "That's what she said!" plus the few seconds after.
            playClip(officeAudio, 0, 4270);
            break;

        case "Brooklyn Nine-Nine":
            // One "Nine-Nine!" only.
            playClip(brooklynAudio, 0, 1500);
            break;

        case "Gilmore Girls":
            // Starts just before "I just got hit by a deer!" and keeps the short exchange.
            playClip(gilmoreAudio, 22.0, 10500);
            break;

        case "High School Musical":
            // Kept unchanged for now: the uploaded wildcats.mp3 contains
            // the "What team? Wildcats!" chant, not "Get'cha head in the game".
            hsmAudio.play();
            break;

    }

}
function nextQuestion(){

    currentQuestion++;

    if(currentQuestion>=questions.length){

        hideAll();

        tvSection.classList.remove("hidden");

        updateProgress();

        return;

    }

    loadQuestion();

}
// =============================================
// Continue Story
// =============================================

continueStory.addEventListener("click", () => {

    hideAll();

    story.classList.remove("hidden");

    updateProgress();

});

// =============================================
// Proposal
// =============================================

proposalButton.addEventListener("click", () => {

    hideAll();

    proposal.classList.remove("hidden");

    updateProgress();

});

// =============================================
// Proposal Buttons
// =============================================

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const funnyMessage = document.getElementById("funnyMessage");

const noMessages = [

    "Nice try 😂",

    "That button seems a little shy...",

    "Little Miss Attitude strikes again 😏",

    "The No button has entered witness protection.",

    "Brooklyn Nine-Nine says... cool cool cool... but maybe press Yes.",

    "Even Michael Scott thinks Yes is the better option.",

    "Pasta is waiting on the other button 🍝"

];

let attempts = 0;

function moveButton(){

    attempts++;

    const x = Math.random()*300-150;

    const y = Math.random()*220-110;

    noButton.style.transform =
    `translate(${x}px, ${y}px)`;

    funnyMessage.innerHTML =
    noMessages[attempts % noMessages.length];

}

noButton.addEventListener("mouseover", moveButton);

noButton.addEventListener("click", moveButton);



// YES BUTTON PRIVACY NOTE: No Formspree/network notification is attached to yesButton.
// The Yes choice stays local to the LizzyOS experience.
// ========================================
// RIDDLE CARDS
// ========================================

document.querySelectorAll(".riddleCard").forEach(card => {

    card.addEventListener("click", () => {

        const answer = card.querySelector(".riddleAnswer");

        answer.innerHTML = card.dataset.answer;

        answer.classList.remove("hidden");

        card.style.cursor = "default";

    });

});

// =============================================
// Sound Toggle
// =============================================

const music =
document.getElementById("backgroundMusic");

const soundButton =
document.getElementById("soundButton");

let playing=false;

soundButton.addEventListener("click",()=>{

    if(!music){

        return;

    }

    if(playing){

        music.pause();

        soundButton.innerHTML="🔈";

    }

    else{

        music.play();

        soundButton.innerHTML="🔊";

    }

    playing=!playing;

});
// =============================================
// ACHIEVEMENTS
// =============================================

const achievements = [];

function unlockAchievement(name){

    if(achievements.includes(name)) return;

    achievements.push(name);

    console.log("Achievement Unlocked:", name);

    showAchievement(name);

}

function showAchievement(name){

    const popup = document.createElement("div");

    popup.className = "achievementPopup";

    popup.innerHTML =
    `🏆 Achievement Unlocked<br><strong>${name}</strong>`;

    document.body.appendChild(popup);

    setTimeout(()=>{

        popup.classList.add("show");

    },100);

    setTimeout(()=>{

        popup.classList.remove("show");

        setTimeout(()=>{

            popup.remove();

        },500);

    },3000);

}

// =============================================
// UNLOCKS
// =============================================

startStory.addEventListener("click",()=>{

    unlockAchievement("The Adventure Begins");

});

yesButton.addEventListener("click", () => {

    sendYesEmail();

    hideAll();

    celebration.classList.remove("hidden");

    updateProgress();

    if (typeof confetti === "function") {

        confetti({
            particleCount: 250,
            spread: 180,
            origin: { y: 0.6 }
        });

    }

    unlockAchievement("Date Accepted ❤️");

});
secretButton.addEventListener("click",()=>{

    unlockAchievement("Secret Ending 🌸");

});

// =============================================
// SECRET KEYWORDS
// =============================================

let typed = "";

document.addEventListener("keydown",(e)=>{

    typed += e.key.toLowerCase();

    if(typed.length > 30){

        typed = typed.slice(-30);

    }

    if(typed.includes("pink")){

        unlockAchievement("Pink Expert 💗");

        document.body.style.filter =
        "saturate(1.15)";

    }

    if(typed.includes("pasta")){

        unlockAchievement("Pasta Lover 🍝");

        alert("🍝 Pasta rain activated... okay maybe not yet 😄");

    }

    if(typed.includes("nine")){

        unlockAchievement("Nine-Nine 🚔");

    }

    if(typed.includes("office")){

        unlockAchievement("Dunder Fan 📄");

    }

    if(typed.includes("gilmore")){

        unlockAchievement("Stars Hollow ☕");

    }

});

// =============================================
// END
// =============================================

console.log("Lizzy-Date Loaded Successfully ❤️");

// =====================================================
// macOS SECRET DESKTOP
// =====================================================

// Desktop Elements

const desktopArea = document.getElementById("desktopArea");
const terminal = document.getElementById("terminal");
const terminalText = document.getElementById("terminalText");

const folderIcon = document.getElementById("folderIcon");
const readMeIcon = document.getElementById("readMeIcon");
const missionIcon = document.getElementById("missionIcon");
const openWhenIcon = document.getElementById("openWhenIcon");

const finderWindow = document.getElementById("finderWindow");
const readMeWindow = document.getElementById("readMeWindow");
const missionWindow = document.getElementById("missionWindow");
const openWhenWindow = document.getElementById("openWhenWindow");

const closeReadMe = document.getElementById("closeReadMe");
const closeMission = document.getElementById("closeMission");
const closeOpenWhen = document.getElementById("closeOpenWhen");

const letterList = document.getElementById("letterList");
const letterContent = document.getElementById("letterContent");
const letterTitle = document.getElementById("letterTitle");
const letterText = document.getElementById("letterText");
const backLetters = document.getElementById("backLetters");
const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewerImage");
const viewerVideo = document.getElementById("viewerVideo");

const viewerClose = document.getElementById("viewerClose");
const viewerPrev = document.getElementById("viewerPrev");
const viewerNext = document.getElementById("viewerNext");

const closeFinder = document.querySelector(".closeBtn");

const finalMessage = document.getElementById("finalMessage");

// ========================================
// SECRET BUTTON
// ========================================

secretButton.addEventListener("click", () => {

    hideAll();

    secretEnding.classList.remove("hidden");

    progressFill.style.width = "100%";

    startTerminal();

});

// ========================================
// TERMINAL
// ========================================

const bootLines = [

"Booting LizzyOS 1.0...",

"Loading Memories...",

"Checking Cherry Blossoms... OK",

"Loading Pasta Database... OK",

"Loading Pink Theme... OK",

"Decrypting Hidden Files...",

"Access Granted ✔",

"Opening Desktop..."

];

function startTerminal(){

    terminal.classList.remove("hidden");

    desktopArea.classList.add("hidden");

    terminalText.innerHTML="";

    let i=0;

    function nextLine(){

        if(i<bootLines.length){

            terminalText.innerHTML+=bootLines[i]+"<br>";

            terminal.scrollTop=terminal.scrollHeight;

            i++;

            setTimeout(nextLine,700);

        }

        else{

            setTimeout(()=>{

                terminal.style.display="none";

                desktopArea.classList.remove("hidden");

            },1200);

        }

    }

    nextLine();

}

// ========================================
// THE LIZZY ARCHIVES
// ========================================

const archiveItems = [

    "She is short in a cute way",

    "She is going to do HYROX",

    "She is actually very funny, even though I can't tell her",

    "She is bossy in a cute way",

    "She has an amazing smile",

    "She might want to be Zulu",

    "She's into nerdy Mikael",

    "I could smoke her in a race",

    "She is my favourite bully",

    "She's a real gangster",

    "She claims she can sing",

    "She is a Baddie"

];

function loadArchive(){

    const archiveList = document.getElementById("archiveList");

    archiveList.innerHTML = "";

    archiveItems.forEach(item => {

        const entry = document.createElement("div");

        entry.className = "likeItem";

        entry.innerHTML = item;

        archiveList.appendChild(entry);

    });

}

loadArchive();
// ========================================
// FOLDER
// ========================================

folderIcon.addEventListener("click",()=>{

    finderWindow.classList.remove("hidden");

    unlockAchievement("Opened Lizzy Folder 📁");

});

// ========================================
// READ ME
// ========================================

readMeIcon?.addEventListener("click", () => {

    readMeWindow?.classList.remove("hidden");

    readMeIntro?.classList.remove("hidden");
    readMeContent?.classList.add("hidden");

});

closeReadMe?.addEventListener("click", () => {

    readMeWindow?.classList.add("hidden");

});

const openMemoriesButton =
document.getElementById("openMemoriesButton");

const readMeIntro =
document.getElementById("readMeIntro");

const readMeContent =
document.getElementById("readMeContent");

openMemoriesButton?.addEventListener("click", () => {

    readMeIntro?.classList.add("hidden");
    readMeContent?.classList.remove("hidden");

});

// ========================================
// MISSION LOG
// ========================================

missionIcon?.addEventListener("click", () => {

    missionWindow?.classList.remove("hidden");

    unlockAchievement("Opened Mission Log 🗂️");

});

closeMission?.addEventListener("click", () => {

    missionWindow?.classList.add("hidden");

});

// ========================================
// OPEN WHEN...
// ========================================

openWhenIcon?.addEventListener("click", () => {

    openWhenWindow?.classList.remove("hidden");

    letterList?.classList.remove("hidden");
    letterContent?.classList.add("hidden");

    unlockAchievement("Opened Open When Folder 💌");

});

closeOpenWhen?.addEventListener("click", () => {

    openWhenWindow?.classList.add("hidden");

});

backLetters?.addEventListener("click", () => {

    letterContent?.classList.add("hidden");
    letterList?.classList.remove("hidden");

});

const openWhenLetters = {

    miss: {

        title: "❤️ Open when you miss me",

        body: `Hey Agent Yelizaveta,<br><br>

If you're reading this because you miss me, just know that I'm probably thinking about you too.<br><br>

Life gets busy sometimes, but that never changes how much I enjoy talking to you, laughing with you, and making memories with you.<br><br>

In <em>The Office</em>, even the most ordinary workdays become special because of the people sharing them. You have a way of making ordinary moments feel like the ones worth remembering, and I hope I get to keep being part of yours.<br><br>

Until our next mission...<br><br>

Your favourite Rookie Operative,<br>

<strong>Agent Mikhail Petrov ❤️</strong>`

    },

    amazing: {

        title: "🌸 Open when you need reminding how amazing you are",

        body: `Agent Yelizaveta,<br><br>

In case today made you forget, you are incredibly kind, genuinely smart, unbelievably beautiful, absolutely stunning, and completely amazing.<br><br>

You care about people in a way that makes them feel seen, and that kindness is one of the most special things about you.<br><br>

Early in <em>Gilmore Girls</em>, Rory faces the intimidating first days at Chilton, but Lorelai keeps showing up for her and reminding her that she belongs there.<br><br>

So consider this my reminder to you: you belong in every room you walk into, and you are capable of far more than you sometimes give yourself credit for.<br><br>

Never let one difficult day convince you that you are anything less than extraordinary.<br><br>

Whenever you forget, come back here. I'll happily remind you again.<br><br>

<strong>— Agent Mikhail Petrov ❤️</strong>`

    }

};

openWhenLetters.sick = {
    title: "🤒 Open When You’re Sick",
    body: `
        <p>Dear Lizzy,</p>
        <p>So apparently Little Miss Attitude has been defeated by… <strong>germs</strong>.</p>
        <p>Embarrassing.</p>
        <p>I’m not saying you’re weak, but I <strong>am</strong> saying I think you’re weak. 😂 And hopefully you won’t go telling your mommy that Mikael is bullying a sick person, because that would be a dramatic misrepresentation of events.</p>
        <p>But jokes aside, you actually need to get better soon.</p>
        <p>Because Mikael—<br>I mean <strong>Lizzy</strong>—can’t survive without a healthy Lizzy.</p>
        <p>That may sound wrong.</p>
        <p><strong>But I said what I said.</strong></p>
        <p>Unfortunately, this also means you can’t even properly use your <strong>Hug Token</strong> right now because you’ll probably get Mikael sick too.</p>
        <p>And Mikael thinks that wouldn’t be very good.</p>
        <p>Although… knowing him, he would probably risk it anyway. 😭</p>
        <p>So rest properly, drink lots of water, eat something, take care of yourself, and stop pretending you’re perfectly fine when you clearly aren’t.</p>
        <p>And yes, you are allowed one of your famous <strong>“cleansing/detox” crying sessions</strong> if medically necessary. 😂</p>
        <p>Your only job is to get better. LizzyOS, Cody Legal Counsel, Agent Yelizaveta and even Mr Perfect need you back at full operating capacity.</p>
        <p><strong>Get better soon, Four Eyes. 💗</strong></p>
        <p>And don’t worry — I’ll try to be nice to you while you’re sick.</p>
        <p><strong>Try.</strong></p>
        <p>No promises.</p>
        <p class="letterSignature">— Mikael a.k.a Mr Perfect 💗</p>
    `
};

openWhenLetters.hug = {
    title: "🫂 Open When You Need a Hug",
    body: `
        <p><strong>Come here, Lizzy 🫂❤️</strong></p>
        <p>I don't know what's happened or why you need a hug right now, but since I can't physically give you one through a computer screen, this will have to do for now.</p>
        <p>Consider yourself officially hugged.</p>
        <p>The long kind too — not one of those awkward two-second hugs. 😂</p>
        <p>Whatever is going on, I hope this makes things feel even just a tiny bit better.</p>
        <p>And if this digital hug isn't enough...</p>
        <p><strong>You know where to find the real one. ❤️</strong></p>
        <p class="letterSignature">— Mikael a.k.a Mr Perfect</p>
    `
};

openWhenLetters.laugh = {
    title: "😂 Open When You Need to Laugh",
    body: `
        <p><strong>🚨 LIZZYOS EMERGENCY COMEDY PROTOCOL</strong></p>
        <p>Apparently you require immediate assistance.</p>
        <p>First of all...</p>
        <p>Why did you come to <strong>ME</strong> for comedy? 😭</p>
        <p>That's a lot of pressure.</p>
        <p>So here's your emergency procedure:</p>
        <p><strong>Step 1:</strong> Think about something embarrassing I've done.</p>
        <p><strong>Step 2:</strong> Remember that there are probably several options.</p>
        <p><strong>Step 3:</strong> Laugh.</p>
        <p>If that hasn't worked, please switch yourself off and back on again.</p>
        <p>Still nothing?</p>
        <p>Fine.</p>
    `
};



function showOpenWhenLetter(letterKey) {

    const letter = openWhenLetters[letterKey];

    if (!letter || !letterList || !letterContent) {

        return;

    }

    letterTitle.innerHTML = letter.title;
    letterText.innerHTML = letter.body;

    letterList.classList.add("hidden");
    letterContent.classList.remove("hidden");

}

document.querySelectorAll("[data-letter]").forEach((button) => {

    button.addEventListener("click", () => {

        showOpenWhenLetter(button.dataset.letter);

    });

});

window.openLetter = function (numberOrKey) {

    if (
        numberOrKey === 1 ||
        numberOrKey === "1" ||
        numberOrKey === "miss"
    ) {

        showOpenWhenLetter("miss");

        return;

    }

    if (
        numberOrKey === 2 ||
        numberOrKey === "2" ||
        numberOrKey === "amazing"
    ) {

        showOpenWhenLetter("amazing");

    }

};

// ========================================
// CLOSE FINDER
// ========================================

closeFinder?.addEventListener("click", () => {

    finderWindow?.classList.add("hidden");

});

// ========================================
// SECRET MESSAGE
// ========================================

// ========================================
// MEDIA VIEWER
// ========================================

const archiveMediaItems = [

    ...document.querySelectorAll(".memoryGrid img"),

    ...document.querySelectorAll(".videoGrid video source")

].map((element) => {

    if (element.tagName === "IMG") {

        return {

            type: "image",

            url: element.getAttribute("src")

        };

    }

    return {

        type: "video",

        url: element.getAttribute("src")

    };

});

let readMeMemories = [];

let activeViewerItems = archiveMediaItems;

let currentMediaIndex = 0;

function openViewer(index, items = activeViewerItems) {

    if (!Array.isArray(items) || items.length === 0) {

        return;

    }

    activeViewerItems = items;

    currentMediaIndex =
        (index + activeViewerItems.length) %
        activeViewerItems.length;

    const item = activeViewerItems[currentMediaIndex];

    viewerImage.classList.add("hidden");
    viewerVideo.classList.add("hidden");

    viewerVideo.pause();
    viewerVideo.removeAttribute("src");
    viewerVideo.innerHTML = "";

    if (item.type === "image") {

        viewerImage.src = item.url || item.src;

        viewerImage.classList.remove("hidden");

    } else if (item.type === "video") {

        viewerVideo.src = item.url || item.src;

        viewerVideo.classList.remove("hidden");

        viewerVideo.load();

    }

    viewer.classList.remove("hidden");

}

// Archive photos

document
.querySelectorAll(".memoryGrid a")
.forEach((link, index) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        openViewer(index, archiveMediaItems);

    });

});

// Archive videos

const archivePhotoCount =
document.querySelectorAll(".memoryGrid img").length;

document
.querySelectorAll(".videoGrid video")
.forEach((video, index) => {

    video.addEventListener("click", () => {

        openViewer(

            archivePhotoCount + index,

            archiveMediaItems

        );

    });

});

// Viewer controls

viewerClose?.addEventListener("click", () => {

    viewer?.classList.add("hidden");

    viewerVideo?.pause();

});

viewerNext?.addEventListener("click", () => {

    openViewer(

        currentMediaIndex + 1,

        activeViewerItems

    );

});

viewerPrev?.addEventListener("click", () => {

    openViewer(

        currentMediaIndex - 1,

        activeViewerItems

    );

});

// ========================================
// READ ME LOADER
// ========================================

async function loadReadMe() {

    const container =
    document.getElementById("readMeContent");

    if (!container) {

        return;

    }

    try {

        const response = await fetch(

            "data/readme.json?v=" + Date.now(),

            {

                cache: "no-store"

            }

        );

        if (!response.ok) {

            throw new Error(

                `Could not load readme.json (${response.status})`

            );

        }

        const memories = await response.json();

        if (!Array.isArray(memories)) {

            throw new Error(

                "readme.json must contain an array."

            );

        }

        readMeMemories = memories;

        container.innerHTML = "";

        memories.forEach((memory, index) => {

            const item =
            document.createElement("div");

            item.className = "readme-item";

            if (memory.type === "image") {

                item.innerHTML = `

                    <img

                        src="${memory.url}"

                        class="readme-photo"

                        loading="lazy"

                        alt="Read Me memory">

                `;

                item.addEventListener("click", () => {

                    openViewer(

                        index,

                        readMeMemories

                    );

                });

            } else if (memory.type === "video") {

                item.innerHTML = `

                    <video

                        controls

                        playsinline

                        preload="metadata"

                        class="readme-video">

                        <source src="${memory.url}">

                        Your browser could not play this video.

                    </video>

                `;

                item.addEventListener("dblclick", () => {

                    openViewer(

                        index,

                        readMeMemories

                    );

                });

            }

            container.appendChild(item);

        });

        if (memories.length === 0) {

            container.innerHTML =

            "<p>No memories have been added yet. ❤️</p>";

        }

    } catch (error) {

        container.innerHTML =

        "<p>Unable to load memories.</p>";

        console.error(

            "Read Me error:",

            error

        );

    }

}

loadReadMe();

// ========================================
// KEYBOARD CONTROLS
// ========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        viewer?.classList.add("hidden");

        viewerVideo?.pause();

        finderWindow?.classList.add("hidden");

        readMeWindow?.classList.add("hidden");

        missionWindow?.classList.add("hidden");

        openWhenWindow?.classList.add("hidden");

    }

    if (

        event.key === "ArrowRight" &&

        viewer &&

        !viewer.classList.contains("hidden")

    ) {

        openViewer(

            currentMediaIndex + 1,

            activeViewerItems

        );

    }

    if (

        event.key === "ArrowLeft" &&

        viewer &&

        !viewer.classList.contains("hidden")

    ) {

        openViewer(

            currentMediaIndex - 1,

            activeViewerItems

        );

    }

});

// =====================================================
// LIZZYOS EXTRA — QUIZ + HEART CATCH GAME
// =====================================================
(() => {
    const $ = id => document.getElementById(id);

    // ---------- Windows ----------
    function openWindow(id){ $(id)?.classList.remove("hidden"); }
    function closeWindow(id){ $(id)?.classList.add("hidden"); }

    $("funQuizIcon")?.addEventListener("click", () => {
        openWindow("funQuizWindow");
        startFunQuiz();
        if (typeof unlockAchievement === "function") unlockAchievement("Lizzy Quiz Activated 🧠");
    });
    $("closeFunQuiz")?.addEventListener("click", () => closeWindow("funQuizWindow"));
    $("funQuizRedClose")?.addEventListener("click", () => closeWindow("funQuizWindow"));

    $("heartGameIcon")?.addEventListener("click", () => {
        openWindow("heartCatchWindow");
        updateHeartBest();
        if (typeof unlockAchievement === "function") unlockAchievement("Operation: Catch Her Heart 💗");
    });
    $("closeHeartCatch")?.addEventListener("click", () => closeWindow("heartCatchWindow"));
    $("heartGameRedClose")?.addEventListener("click", () => closeWindow("heartCatchWindow"));

    // ---------- Lizzy Quiz ----------
    const lizzyQuizQuestions = [
      {q:"What colour has administrator privileges in LizzyOS? 💗",a:["Blue","Pink — obviously","Corporate grey"],correct:1,right:"Correct. Pink has full system access. 🌸",wrong:"Security alert: this answer was suspiciously un-Lizzy."},
      {q:"Who has the unfair advantage on the first bowling mission? 🎳",a:["Agent Mikhail","Agent Yelizaveta","The bowling ball"],correct:1,right:"Correct 😭 Intelligence reports say Agent Yelizaveta is dangerously experienced.",wrong:"Nice try. Agent Mikhail has approximately one mission of experience 😂"},
      {q:"Where should banned nicknames be sent?",a:["The Recycle Bin 🗑️","The Mission Log","Pinned to the desktop"],correct:0,right:"Correct. Delete immediately. Empty Bin optional 😂",wrong:"Absolutely not. LizzyOS recommends immediate deletion."},
      {q:"What food has suspiciously high priority in this system? 🍝",a:["Pasta","Plain toast","A single lettuce leaf"],correct:0,right:"Correct. Pasta database verified. 🍝",wrong:"LizzyOS refuses to accept this answer."},
      {q:"What is Agent Mikhail's most important mission objective?",a:["Win every argument","Make Agent Yelizaveta smile ❤️","Become a professional bowler overnight"],correct:1,right:"Mission intelligence confirms this answer. ❤️",wrong:"Incorrect. Please review Mission Log #001."},
      {q:"Where did Lizzy learn to be such a menace? 😈",a:["Mikael taught her","It's in her DNA","Agent training"],correct:1,right:"DNA analysis confirms the menace appears factory-installed. 🧬",wrong:"Nope. This behaviour appears to go much deeper 😂"},
      {q:"How would Mikael classify Lizzy's attitude levels?",a:["Low","Moderate","A national security concern"],correct:2,right:"Threat level confirmed: attitude remains a national security concern. 🚨",wrong:"That reading is suspiciously low."},
      {q:"What happens when Lizzy's attitude combines with Four Eyes Mode? 👓",a:["The attitude disappears","She looks more professional while maintaining the attitude","LizzyOS crashes"],correct:1,right:"Exactly. The glasses change the presentation, not the attitude 😂",wrong:"Four Eyes Mode does not neutralise the attitude."},
      {q:"What does Lizzy apparently enjoy doing to Mikael?",a:["Agreeing with everything he says","Ragebaiting him","Protecting his peace"],correct:1,right:"Correct. Ragebait activity remains unusually high. 🎣",wrong:"Historical evidence strongly disagrees 😂"},
      {q:"What does Lizzy claim crying is? 😭",a:["A competitive sport","Cleansing or detoxing","Classified information"],correct:1,right:"Correct — that is the official Lizzy PR explanation.",wrong:"Please consult the emotional-cleansing propaganda department."},
      {q:"What does Mikael call Lizzy's explanation for all the crying?",a:["Medical science","Propaganda","A completely reasonable explanation"],correct:1,right:"Correct. Mikael has formally labelled it propaganda 😂",wrong:"Mikael's official position is considerably less supportive."},
      {q:"According to Lizzy herself, what has Mikael supposedly damaged? 😂",a:["Her glasses","Her reputation","Her LizzyOS account"],correct:1,right:"Correct. The reputation damage allegation is officially on record.",wrong:"That is not the allegation Lizzy submitted."},
      {q:"Why does Lizzy say her reputation has been tainted?",a:["Because she became Cody's lawyer","Because Mikael has her calling him perfect and randomly smiling about him","Because she lost at bowling"],correct:1,right:"Evidence archived. Future denial attempts may be unsuccessful 😂",wrong:"The written evidence points somewhere much more embarrassing."},
      {q:"What did Lizzy admit she sometimes finds herself doing? 👀",a:["Planning Mikael's arrest","Randomly smiling about Mikael","Deleting LizzyOS"],correct:1,right:"Admission confirmed and safely archived. 📁",wrong:"Nope. The evidence specifically mentions smiling."},
      {q:"Which unofficial parenting award does Mikael regularly give Lizzy for looking after her sisters? 🏆",a:["Guardian of the Year","Mother of the Year","Chief Babysitter"],correct:1,right:"Correct. Mother of the Year remains her unofficial title 😂",wrong:"The Mikael Awards Committee uses a much more dramatic title."},
      {q:"What incident nearly cost Lizzy her prestigious 'Mother of the Year' title? 🍳",a:["She forgot to buy snacks","She didn't cook, leading Mikael to launch the 'starving the kids' allegations","She made her sister clean"],correct:1,right:"Correct. The Great Cooking Scandal remains on file.",wrong:"Nope. Think of the infamous cooking incident."},
      {q:"What serious allegation did Mikael make during the Great Cooking Scandal? 🚨",a:["Lizzy had retired from motherhood","Lizzy was starving the kids","Lizzy had ordered takeaways"],correct:1,right:"Correct. A dramatic allegation, but an allegation nonetheless 😂",wrong:"Mikael's accusation was significantly more dramatic."},
      {q:"What is Lizzy apparently creating with one of her sisters? 👯‍♀️",a:["Her replacement","A mini version of herself","A new LizzyOS administrator"],correct:1,right:"Correct. Mini Lizzy development is reportedly underway.",wrong:"Intelligence suggests something far more dangerous: another Lizzy 😂"},
      {q:"What is the greatest concern about Lizzy creating a mini version of herself? 🚨",a:["They'll dress the same","There could soon be TWO menaces","Cody will need another lawyer"],correct:1,right:"Exactly. LizzyOS is not prepared for double-menace capacity.",wrong:"You're underestimating the menace multiplication risk."},
      {q:"If Lizzy's sister becomes exactly like her, what has most likely been inherited? 🧬",a:["The menace gene","Mikael's propaganda","Micky Bucs"],correct:0,right:"Correct. The menace gene appears highly transferable 😂",wrong:"Genetic analysis points to the menace department."},
      {q:"What happens when Mikael catches Lizzy being sweet? 💗",a:["She proudly accepts the allegation","She risks damaging her menace reputation","Cody objects"],correct:1,right:"Correct. Sweetness is dangerous to the established menace brand.",wrong:"Think about the reputation she is trying so hard to maintain 😂"},
      {q:"According to Lizzy's own testimony, what has suffered because of Mikael's influence? 📄",a:["Her patience","Her reputation","Her LizzyOS clearance"],correct:1,right:"Correct. Her reputation is apparently the primary casualty.",wrong:"Her own testimony names a different victim."},
      {q:"How does Lizzy plan to respond if anyone asks whether those admissions are true? 🕵️‍♀️",a:["Tell the truth immediately","Deny everything","Ask Mikael to confirm"],correct:1,right:"Correct. Denial protocol activated 😂",wrong:"That would be far too cooperative for the official defence strategy."},
      {q:"What makes Lizzy's campaign against Mikael slightly difficult to believe? 🤨",a:["She secretly likes Batman","She complains about him while admitting she randomly finds herself smiling about him","She keeps spending Micky Bucs"],correct:1,right:"Exactly. Exhibit: Random Smiling has been submitted.",wrong:"The contradiction is hidden in her own Mikael admissions."},
      {q:"What disturbing discovery has LizzyOS made about Mikael and Lizzy? 🧬",a:["They're both secretly lawyers","They may actually be more similar than either would like to admit","They have the same eyesight"],correct:1,right:"⚠️ SIMILARITY DETECTED. Neither suspect is expected to accept this finding.",wrong:"LizzyOS intelligence has found a more uncomfortable similarity."},
      {q:"What trait might Mikael and Lizzy BOTH be guilty of? 🎣",a:["Avoiding arguments","Deliberately annoying each other for entertainment","Admitting when they're wrong immediately"],correct:1,right:"⚠️ SIMILARITY DETECTED: mutual annoyance appears recreational.",wrong:"The evidence suggests both suspects are considerably less peaceful."},
      {q:"What happens when Mikael and Lizzy both believe they're right? ⚠️",a:["They calmly compromise","An unnecessarily long debate begins","Mikael immediately apologises"],correct:1,right:"Correct. Estimated debate duration: unnecessarily long 😂",wrong:"That outcome sounds far too peaceful."},
      {q:"Which title could realistically apply to BOTH Mikael and Lizzy? 😂",a:["The Quiet One","Professional Menace","Conflict Avoider"],correct:1,right:"⚠️ SIMILARITY DETECTED: Professional Menace status may be shared.",wrong:"Neither suspect has demonstrated enough peace for that title."},
      {q:"Why might Mikael have difficulty complaining about Lizzy's ragebaiting? 🎣",a:["Ragebaiting isn't real","He isn't exactly innocent of doing the same thing to her","Lizzy never does it"],correct:1,right:"Correct. Mikael's hands may not be completely clean here 😂",wrong:"The case file contains evidence against both parties."},
      {q:"What might explain why Mikael and Lizzy can argue over complete nonsense for so long?",a:["Poor Wi-Fi","Neither particularly enjoys backing down","LizzyOS requires it"],correct:1,right:"⚠️ SIMILARITY DETECTED: stubbornness readings elevated on both sides.",wrong:"The network has been cleared of responsibility."},
      {q:"What similarity would both Mikael AND Lizzy probably deny if questioned? 👀",a:["They can both be stubborn","They're both Batman","They both wear glasses"],correct:0,right:"Correct. Both suspects are expected to appeal this finding.",wrong:"The similarity report points to something in their personalities."},
      {q:"If Lizzy is Little Miss Attitude, what does that potentially make Mikael? 🤔",a:["Mr No Attitude","Someone who probably has enough attitude of his own","An innocent victim"],correct:1,right:"⚠️ SIMILARITY DETECTED. Mikael's innocence remains unverified 😂",wrong:"LizzyOS refuses to certify Mikael as completely innocent."},
      {q:"What is the strongest evidence that Mikael and Lizzy might actually enjoy annoying each other? 😂",a:["They keep doing it and still continue talking to each other","They've filed official paperwork","Cody told us"],correct:0,right:"Correct. Continued voluntary participation is highly suspicious 😂",wrong:"The strongest evidence is much simpler and happens repeatedly."},
      {q:"What is perhaps the most dangerous thing Mikael and Lizzy have in common? 🚨",a:["Their favourite colour","Both seem capable of turning absolutely nothing into an argument","Their bowling ability"],correct:1,right:"⚠️ SIMILARITY DETECTED: argument generation capability confirmed.",wrong:"The danger is less athletic and much more argumentative."},
      {q:"Who is actually the bigger menace? 😈",a:["Lizzy, case closed","Mikael, case closed","Investigation ongoing — both suspects blame each other"],correct:2,right:"Correct. Investigation remains open indefinitely 😂",wrong:"There is nowhere near enough cooperation for a final ruling."},
      {q:"What is Mikael's favourite colour? 💜",a:["Pink","Purple","Black"],correct:1,right:"Correct. Purple is Mr Perfect's colour. 💜",wrong:"Mr Perfect's favourite colour is elsewhere in the palette."},
      {q:"What is Mikael's favourite superhero? 🦇",a:["Superman","Batman","Spider-Man"],correct:1,right:"Correct. Broad-daylight Batman activity remains under investigation.",wrong:"Gotham intelligence would like you to reconsider."},
      {q:"What number did Mikael wear when playing basketball in high school? 🏀",a:["23","4","30"],correct:1,right:"Correct. Number 4. 🏀",wrong:"Check the Mikael basketball file."},
      {q:"What is Cody's middle name? 🐶",a:["Perfect","Aladeen","Batman"],correct:1,right:"Correct. Cody Aladeen, legally represented and dangerous 😂",wrong:"Cody's legal file lists a different middle name."},
      {q:"Who is Cody's official legal counsel? ⚖️",a:["Mikael","Lizzy","Agent Mikhail"],correct:1,right:"Correct. Mikael should probably watch what he says around Cody.",wrong:"Cody's lawyer is much closer to the case."},
      {q:"What does Mikael call himself with absolutely no evidence of bias? 😂",a:["Mr Average","Mr Perfect","Mr Humble"],correct:1,right:"Correct. Self-certified Mr Perfect.",wrong:"Mikael's self-appointed title is considerably less humble."},
      {q:"What currency does LizzyOS use? 💵",a:["Lizzy Dollars","Micky Bucs","Perfect Points"],correct:1,right:"Correct. Micky Bucs accepted across suspicious parts of LizzyOS.",wrong:"Check the LizzyOS economy."},
      {q:"What is Mikael's dream holiday/training destination? 🏔️",a:["Paris","Dagestan","New York"],correct:1,right:"Correct. Dagestan — apparently relaxation was never the plan.",wrong:"Mikael's dream destination is much more grappling-oriented."},
      {q:"What does Mikael apparently plan to do in Dagestan? 😂",a:["Relax by the pool","Train and wrestle bears","Learn ballet"],correct:1,right:"Correct. Bear-wrestling risk assessment: questionable.",wrong:"The Dagestan file contains significantly more grappling."},
      {q:"What is the password required to decrypt AYPP-006? 🔐",a:["Four Eyes","Micky The Greatest","Mr Perfect"],correct:1,right:"Correct. Birthday-card intelligence confirmed.",wrong:"Remember the birthday-card clue."}
    ];

    const LIZZY_QUIZ_ROUND_SIZE=10;
    let activeLizzyQuizQuestions=[];
    let fqIndex=0,fqScore=0;
    function shuffledQuizPool(){
      const pool=[...lizzyQuizQuestions];
      for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
      return pool.slice(0,Math.min(LIZZY_QUIZ_ROUND_SIZE,pool.length));
    }
    function startFunQuiz(){
      activeLizzyQuizQuestions=shuffledQuizPool();fqIndex=0;fqScore=0;
      $("funQuizScore").textContent="0";$("funQuizTotal").textContent=activeLizzyQuizQuestions.length;
      $("restartFunQuiz").classList.add("hidden");renderFunQuiz();
    }
    function renderFunQuiz(){
      const total=activeLizzyQuizQuestions.length,q=activeLizzyQuizQuestions[fqIndex];
      if(!q){
        $("funQuizQuestion").innerHTML=fqScore===total?`🏆 Perfect score! ${fqScore}/${total}`:`Mission complete: ${fqScore}/${total}`;
        $("funQuizAnswers").innerHTML="";
        $("funQuizFeedback").innerHTML=fqScore===total?"Certified Lizzy Expert. This level of knowledge is becoming suspicious. 😏❤️":fqScore>=7?"Certified LizzyOS Intelligence Agent. Very suspicious knowledge levels. 💗":fqScore>=4?"You know some things 👀 Further surveillance recommended.":"Suspicious... Agent Mikhail is requesting a formal investigation into this score 😂";
        $("restartFunQuiz").classList.remove("hidden");
        if(fqScore===total&&typeof unlockAchievement==="function")unlockAchievement("Certified Lizzy Expert 💗");
        if(fqScore===total)window.dispatchEvent(new CustomEvent("lizzyPerfectGame",{detail:{game:"Lizzy Quiz",key:"funQuiz",score:`${fqScore}/${total}`}}));
        window.dispatchEvent(new CustomEvent("lizzyGameCompleted",{detail:{game:"Lizzy Quiz",key:"funQuiz",score:`${fqScore}/${total}`}}));
        return;
      }
      $("funQuizQuestion").textContent=q.q;$("funQuizFeedback").textContent="";
      $("funQuizAnswers").innerHTML=q.a.map((answer,i)=>`<button class="funQuizAnswer" data-fq-answer="${i}">${answer}</button>`).join("");
      document.querySelectorAll("[data-fq-answer]").forEach(btn=>btn.addEventListener("click",()=>{
        const correct=Number(btn.dataset.fqAnswer)===q.correct;
        if(correct){fqScore++;$("funQuizScore").textContent=fqScore}
        $("funQuizFeedback").textContent=correct?q.right:q.wrong;
        document.querySelectorAll("[data-fq-answer]").forEach(b=>b.disabled=true);
        btn.classList.add(correct?"answerCorrect":"answerWrong");
        setTimeout(()=>{fqIndex++;renderFunQuiz()},1200);
      }));
    }
    window.startFunQuiz=startFunQuiz;
    window.openLizzyQuiz=function(){const w=$("funQuizWindow");if(!w)return false;openWindow("funQuizWindow");startFunQuiz();return true};
    $("restartFunQuiz")?.addEventListener("click",startFunQuiz);

    // ---------- Heart Catch ----------
    let heartScore = 0;
    let heartTime = 20;
    let spawnTimer = null;
    let countdownTimer = null;
    let gameRunning = false;

    function updateHeartBest(){
        if ($("heartCatchBest")) {
            $("heartCatchBest").textContent = localStorage.getItem("lizzyHeartBest") || "0";
        }
    }

    function spawnHeart(){
        const arena = $("heartCatchArena");
        if (!arena || !gameRunning) return;

        const heart = document.createElement("button");
        heart.className = "catchableHeart";
        const rare = Math.random() < 0.12;
        heart.textContent = rare ? "✨" : "💗";
        heart.dataset.points = rare ? "3" : "1";
        heart.style.left = (4 + Math.random() * 84) + "%";
        heart.style.top = (5 + Math.random() * 75) + "%";

        heart.addEventListener("click", (e) => {
            e.stopPropagation();
            heartScore += Number(heart.dataset.points);
            $("heartCatchScore").textContent = heartScore;
            heart.classList.add("caughtHeart");
            setTimeout(() => heart.remove(), 120);
        });

        arena.appendChild(heart);
        setTimeout(() => heart.remove(), 1200);
    }

    function finishHeartGame(){
        window.dispatchEvent(new CustomEvent("lizzyJobProof",{detail:{type:"game_complete",game:"heart_catch"}}));
        gameRunning = false;
        clearInterval(spawnTimer);
        clearInterval(countdownTimer);

        const oldBest = Number(localStorage.getItem("lizzyHeartBest") || 0);
        const best = Math.max(oldBest, heartScore);
        localStorage.setItem("lizzyHeartBest", best);
        updateHeartBest();

        $("heartCatchArena").innerHTML = `
            <div class="gameStartMessage">
                <strong>Mission Complete 💗</strong><br>
                You caught ${heartScore} points.<br>
                ${heartScore >= 30 ? "Okay Agent Yelizaveta... overachiever 😏" :
                  heartScore >= 18 ? "Excellent heart-catching skills ❤️" :
                  "Agent Mikhail has requested a rematch 😂"}
            </div>`;
        $("startHeartCatch").textContent = "Play Again";

        if (heartScore >= 30 && typeof unlockAchievement === "function") {
            unlockAchievement("Heart Thief 💗");
        }
    }

    $("startHeartCatch")?.addEventListener("click", () => {
        clearInterval(spawnTimer);
        clearInterval(countdownTimer);
        heartScore = 0;
        heartTime = 20;
        gameRunning = true;

        $("heartCatchScore").textContent = "0";
        $("heartCatchTime").textContent = "20";
        $("heartCatchArena").innerHTML = "";
        $("startHeartCatch").textContent = "Mission Active...";

        spawnHeart();
        spawnTimer = setInterval(spawnHeart, 430);
        countdownTimer = setInterval(() => {
            heartTime--;
            $("heartCatchTime").textContent = heartTime;
            if (heartTime <= 0) finishHeartGame();
        }, 1000);
    });

    updateHeartBest();
})();


// =====================================================
// OUR DATE FOLDER — RANDOM MESSAGES + CLEAN FIRST RUN
// =====================================================
(() => {
 const $=id=>document.getElementById(id);
 const URL="https://formspree.io/f/mrpzkqez";
 const msgs=[
  "Alright Little Miss Attitude 😭❤️ You pick the day, you pick the time, and I’ll handle the rest.",
  "Agent Yelizaveta, Mission Control requires your availability 🕵️❤️ Pick a date and time to continue the mission.",
  "Pick a day I get to steal you for a little while 🌸❤️ The when is completely up to you.",
  "No pressure 😌❤️ You tell me when you’re free, and I’ll take care of everything else.",
  "Okay, your turn 😂❤️ Date. Time. That’s all Agent Mikhail needs.",
  "Mikhail has officially surrendered control of the calendar to you 😭📅 Choose wisely.",
  "⚠️ Mission pending: awaiting availability from one very difficult Agent Yelizaveta. 😂❤️",
  "Choose wisely… I’m expecting a very important date with a very pretty girl 👀❤️",
  "The calendar has been opened. There’s no escaping now 😂📅❤️",
  "Little Miss Attitude has been granted full scheduling privileges. Please use them responsibly 😏❤️",
  "Your schedule, your choice 💗 Pick whatever day works best for you and I’ll make the rest happen.",
  "Mission Control is standing by 🫡❤️ All we need now is your preferred date and time."
 ];
 let last=sessionStorage.getItem("lizzyLastCalendarMessage")||"";
 function randomMsg(){let a=msgs.filter(x=>x!==last);let x=a[Math.floor(Math.random()*a.length)];last=x;sessionStorage.setItem("lizzyLastCalendarMessage",x);return x}
 function fmtD(v){if(!v)return"";return new Intl.DateTimeFormat("en-ZA",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(new Date(v+"T12:00:00"))}
 function fmtT(v){if(!v)return"";let [h,m]=v.split(":").map(Number),d=new Date();d.setHours(h,m,0,0);return new Intl.DateTimeFormat("en-ZA",{hour:"2-digit",minute:"2-digit"}).format(d)}
 function preview(){let d=$("desktopDateChoice")?.value,t=$("desktopTimeChoice")?.value,b=$("desktopDatePreview");if(!b)return;if(!d&&!t)b.innerHTML="<span>💗</span><p>Select the next mission date.</p>";else if(!d)b.innerHTML=`<span>📆</span><p>Time: <strong>${fmtT(t)}</strong><br>Now choose the day.</p>`;else if(!t)b.innerHTML=`<span>🕐</span><p><strong>${fmtD(d)}</strong><br>Now choose a time.</p>`;else b.innerHTML=`<span>🎳</span><p><strong>${fmtD(d)}</strong><br>at <strong>${fmtT(t)}</strong><br><small>Mission: Operation Strike Her Heart ❤️</small></p>`}
 function saved(){let b=$("savedMissionDate"),d=localStorage.getItem("lizzySelectedDate"),t=localStorage.getItem("lizzySelectedTime");if(!b)return;b.innerHTML=d&&t?`<div class="savedMissionCard"><span>📌</span><div><small>CURRENT MISSION DATE</small><strong>${fmtD(d)}</strong><p>${fmtT(t)} ❤️</p></div></div>`:'<p class="memoryMessage">No mission date has been locked in yet.</p>'}
 const now=new Date(),today=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");if($("desktopDateChoice"))$("desktopDateChoice").min=today;
 // Clear developer/test date exactly once for this final rebuild.
 const CLEAN="final-chain-calendar-clean-v1";
 if(localStorage.getItem("lizzyCalendarCleanVersion")!==CLEAN){localStorage.removeItem("lizzySelectedDate");localStorage.removeItem("lizzySelectedTime");localStorage.setItem("lizzyCalendarCleanVersion",CLEAN)}
 $("calendarIcon")?.addEventListener("click",()=>{let d=localStorage.getItem("lizzySelectedDate"),t=localStorage.getItem("lizzySelectedTime");if($("desktopDateChoice"))$("desktopDateChoice").value=d||"";if($("desktopTimeChoice"))$("desktopTimeChoice").value=t||"";if($("desktopSchedulerRandomMessage"))$("desktopSchedulerRandomMessage").textContent=randomMsg();preview();saved();$("calendarWindow")?.classList.remove("hidden")});
 ["calendarRedClose","closeCalendar"].forEach(id=>$(id)?.addEventListener("click",()=>$("calendarWindow")?.classList.add("hidden")));
 ["desktopDateChoice","desktopTimeChoice"].forEach(id=>$(id)?.addEventListener("change",preview));
 $("confirmDesktopDate")?.addEventListener("click",async()=>{let d=$("desktopDateChoice")?.value,t=$("desktopTimeChoice")?.value,s=$("desktopDateStatus"),b=$("confirmDesktopDate");if(!d||!t){if(s)s.textContent="Choose both a date and a time first 😭";return}b.disabled=true;if(s)s.textContent="Sending mission details to Mikhail... 📡";try{let r=await fetch(URL,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({subject:"❤️ Lizzy selected a date!",message:`📅 LIZZYOS DATE SELECTED\n\nDate: ${fmtD(d)}\nTime: ${fmtT(t)}\n\nMission: Operation Strike Her Heart ❤️`,selected_date:fmtD(d),selected_time:fmtT(t)})});if(!r.ok)throw Error();localStorage.setItem("lizzySelectedDate",d);localStorage.setItem("lizzySelectedTime",t);if(s)s.textContent="Sent! Agent Mikhail has been notified ❤️";saved();if(typeof confetti==="function")confetti({particleCount:90,spread:90,origin:{y:.72}})}catch(e){if(s)s.textContent="Couldn't send the date right now. Please try again ❤️"}finally{b.disabled=false}});
 const rm=$("readMeWindow");$("readMeRedClose")?.addEventListener("click",()=>rm?.classList.add("hidden"));$("readMeYellowMin")?.addEventListener("click",()=>rm?.classList.toggle("readMeMinimised"));$("readMeGreenMax")?.addEventListener("click",()=>{rm?.classList.remove("readMeMinimised");rm?.classList.toggle("readMeExpanded")});
 saved();
})();


// =====================================================
// LIZZYOS — WORKING RECYCLE BIN (FINAL BASE)
// Delegated clicks survive desktop rerenders.
// =====================================================
(() => {
 const rejectedNicknames = [
   ["🪟","Windshields"],["👶","Mabebeza"],["👓","4 Eyes"],
   ["👩‍👧","Mother Of The Year"],["🚫","The OPP"],
   ["🦇","The Bat (Blind as a Bat)"],["🤓","Specsy / Spexy"],
   ["😈","The Bully"],["🕶️","Jaden Smith"]
 ];

 function renderRecycleBin(){
   const grid=document.getElementById("recycleBinGrid");
   if(!grid) return;
   grid.innerHTML=rejectedNicknames.map(([emoji,name]) =>
     `<button type="button" class="deletedNickname" title="Permanently rejected 😂">
        <span>${emoji}</span><strong>${name}</strong><small>Deleted from LizzyOS</small>
      </button>`
   ).join("");
 }

 function openRecycleBin(){
   renderRecycleBin();
   const win=document.getElementById("recycleBinWindow");
   if(!win) return;
   win.classList.remove("hidden");
   win.style.display="flex";
   win.style.zIndex="10050";
 }

 function closeRecycleBin(){
   const win=document.getElementById("recycleBinWindow");
   if(!win) return;
   win.classList.add("hidden");
   win.style.display="";
 }

 document.addEventListener("click", e => {
   if(e.target.closest("#recycleBinIcon")){
     e.preventDefault();
     e.stopPropagation();
     openRecycleBin();
     return;
   }
   if(e.target.closest("#recycleBinClose, #closeRecycleBin")){
     e.preventDefault();
     closeRecycleBin();
   }
 });

 document.addEventListener("keydown", e => {
   if((e.key==="Enter" || e.key===" ") && document.activeElement?.id==="recycleBinIcon"){
     e.preventDefault(); openRecycleBin();
   }
   if(e.key==="Escape" && !document.getElementById("recycleBinWindow")?.classList.contains("hidden")){
     closeRecycleBin();
   }
 });

 const icon=document.getElementById("recycleBinIcon");
 if(icon){icon.setAttribute("role","button");icon.setAttribute("tabindex","0");}
 renderRecycleBin();
})();





// =========================================================
// QUIZ+ — MIKHAIL QUIZ / LEVELS / REWARDS / DAILY MYSTERY
// Current v3 stays the base; existing Lizzy Quiz/Heart Catch stay untouched.
// =========================================================
(() => {
    const $ = id => document.getElementById(id);

    const bank = {
        easy: [
            {q:"What is Mikhail's middle name?",a:["Thembinkosi","Thabang","Thabiso","Themba"],correct:[0]},
            {q:"What is Mikhail's favourite colour?",a:["Purple 💜","Black","Blue","Red"],correct:[0]},
            {q:"What is Mikhail's favourite season?",a:["Winter ❄️","Summer ☀️","Spring 🌸","Autumn 🍂"],correct:[0]},
            {q:"What is Mikhail's favourite TV show?",a:["The Office","Brooklyn Nine-Nine","Suits","Snowfall"],correct:[0]},
            {q:"What is Mikhail's favourite movie genre?",a:["Comedy 😂","Action","Horror","Romance"],correct:[0]},
            {q:"Which team does Mikhail consider the best in the world?",a:["Liverpool","Orlando Pirates","Manchester United","Kaizer Chiefs"],correct:[0,1]}
        ],
        medium: [
            {q:"Who is Mikhail's favourite hero?",a:["Batman 🦇","Superman","Spider-Man","Iron Man"],correct:[0]},
            {q:"Who is one of Mikhail's favourite artists?",a:["Dave","J. Cole","Drake","Kendrick Lamar"],correct:[0,1]},
            {q:"Who is one of Mikhail's favourite local artists?",a:["Kwesta","Sjava","A-Reece","Nasty C"],correct:[0,1]},
            {q:"What is the name of Mikhail's Instagram finsta?",a:["Mickys_clubhouse","Mickys_house","Clubhouse_Micky","Mikhail_private"],correct:[0]},
            {q:"What is Mikhail's dream holiday destination?",a:["Dagestan","Japan","Italy","Brazil"],correct:[0]},
            {q:"If there were no limitations, how long would Mikhail want to spend there?",a:["6 Months","2 Weeks","1 Month","1 Year"],correct:[0]}
        ],
        hard: [
            {q:"What is Cody's middle name?",a:["Aladeen","Theodore","Maximus","Mikhail"],correct:[0]},
            {q:"What is Mikhail's favourite Batman movie?",a:["The Dark Knight","The Batman","Batman Begins","The Dark Knight Rises"],correct:[0]},
            {q:"What is Mikhail's favourite sport to play?",a:["Basketball 🏀","Soccer ⚽","Tennis 🎾","Rugby 🏉"],correct:[0]},
            {q:"What was Mikhail's high-school basketball number?",a:["4","23","30","8"],correct:[0]},
            {q:"Who is Mikhail's all-time favourite athlete?",a:["Michael Jordan","LeBron James","Kobe Bryant","Cristiano Ronaldo"],correct:[0]},
            {q:"Who is Mikhail's current favourite NBA player?",a:["Steph Curry","Seth Curry","Dell Curry","Luka Dončić"],correct:[0]}
        ]
    };

    const labels={easy:"🌸 EASY",medium:"👀 MEDIUM",hard:"🕵️ AGENT LEVEL"};
    let level="easy",questions=[],index=0,score=0,answerLog=[];

    function showLevels(){
        $("mikhailLevelSelect")?.classList.remove("hidden");
        $("mikhailQuizPlay")?.classList.add("hidden");
        $("mikhailQuizResult")?.classList.add("hidden");
    }
    function openQuiz(){
        $("mikhailQuizWindow")?.classList.remove("hidden");
        showLevels();
        if(typeof unlockAchievement==="function")unlockAchievement("Mikhail Quiz Activated 🧠");
    }
    function closeQuiz(){$("mikhailQuizWindow")?.classList.add("hidden")}
    function startQuiz(selectedLevel){
        level=selectedLevel;questions=[...bank[level]].sort(()=>Math.random()-.5);index=0;score=0;answerLog=[];
        $("mikhailLevelSelect")?.classList.add("hidden");
        $("mikhailQuizResult")?.classList.add("hidden");
        $("mikhailQuizPlay")?.classList.remove("hidden");
        $("mikhailLevelLabel").textContent=labels[level];
        render();
    }
    function render(){
        const q=questions[index];
        $("mikhailProgress").textContent=`${index+1} / ${questions.length}`;
        $("mikhailQuestion").textContent=q.q;
        $("mikhailReaction").textContent="";
        $("mikhailAnswers").innerHTML=q.a.map((x,n)=>`<button class="mikhailAnswer" data-answer="${n}">${x}</button>`).join("");
        $("mikhailAnswers").querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>answer(+b.dataset.answer));
    }
    function answer(n){
        const q=questions[index],ok=q.correct.includes(n);
        answerLog.push({question:q.q,selected:q.a[n],accepted:q.correct.map(i=>q.a[i]).join(" / "),correct:ok});
        if(ok)score++;
        $("mikhailReaction").textContent=ok?"Correct 😌❤️":(level==="hard"?"Agent clearance denied 😂":"LizzyOS is taking notes 🤨😂");
        $("mikhailAnswers").querySelectorAll("button").forEach(b=>b.disabled=true);
        setTimeout(()=>{index++;index<questions.length?render():finish()},650);
    }
    function finish(){
        const total=questions.length,p=Math.round(score/total*100);
        let title,msg,reward,rewardText;
        if(score===6){title="Perfect Clearance 🕵️";msg="6/6?! This is getting suspicious 😭❤️";reward="👑 Ultimate Mikhail Expert";rewardText="Redeemable for one completely unreasonable bragging session."}
        else if(score>=4){title="Very Impressive 👀";msg="Okayyy, you've actually been paying attention 😌❤️";reward="🍝 Pasta Emergency Pass";rewardText="Valid for one dramatic pasta-related request."}
        else if(score>=2){title="Further Research Required 😂";msg="Not terrible... but LizzyOS recommends some Mikhail revision.";reward="📚 Mikhail Study Pass";rewardText="Permission to investigate Agent Mikhail further."}
        else{title="🚨 SECURITY ALERT";msg="Agent Yelizaveta, we need to talk. How do you know this little?! 😭";reward="🚨 LizzyOS Interrogation Ticket";rewardText="Report immediately for questioning 😂"}
        $("mikhailQuizPlay")?.classList.add("hidden");$("mikhailQuizResult")?.classList.remove("hidden");
        $("mikhailResultTitle").textContent=`${title} — ${score}/${total} (${p}%)`;
        $("mikhailResultText").textContent=msg;
        $("rewardTicketTitle").textContent=reward;
        $("rewardTicketText").textContent=rewardText;
        const old=Number(localStorage.getItem(`mikhailQuizBest_${level}`)||0);
        localStorage.setItem(`mikhailQuizBest_${level}`,Math.max(old,p));
        if(score===total){
            window.dispatchEvent(new CustomEvent("lizzyPerfectGame", {
                detail:{game:`Mikhail Quiz — ${labels[level]}`, key:`mikhail_${level}`, score:`${score}/${total}`}
            }));
        }

        window.dispatchEvent(new CustomEvent("lizzyJobProof",{detail:{type:"game_complete",game:"mikhail_quiz",perfect:score===total}}));
        const completedAt=new Date();
        const right=answerLog.filter(x=>x.correct);
        const wrong=answerLog.filter(x=>!x.correct);
        const details=answerLog.map((x,i)=>`${i+1}. ${x.question}\nSelected: ${x.selected}\nCorrect answer: ${x.accepted}\nResult: ${x.correct?"CORRECT":"WRONG"}`).join("\n\n");
        lizzyTelegramNotify(
            "🧠 MIKHAIL QUIZ COMPLETED",
            `${labels[level]} — ${score}/${total} (${p}%)`,
            details
        );
        fetch("https://formspree.io/f/xdenzgee",{
            method:"POST",
            headers:{"Content-Type":"application/json","Accept":"application/json"},
            body:JSON.stringify({
                _subject:`🧠 Mikhail Quiz Result — ${labels[level]} — ${score}/${total}`,
                quiz:"Mikhail Quiz",level:labels[level],score:`${score}/${total}`,
                percentage:`${p}%`,result:title,correct_answers:right.length,
                incorrect_answers:wrong.length,completed_at:completedAt.toLocaleString(),answers:details
            })
        }).catch(err=>console.warn("Quiz result notification could not be sent:",err));
    }

    $("mikhailQuizIcon")?.addEventListener("click",openQuiz);
    $("mikhailQuizClose")?.addEventListener("click",closeQuiz);
    $("closeMikhailQuiz")?.addEventListener("click",closeQuiz);
    $("restartMikhailQuiz")?.addEventListener("click",showLevels);
    document.querySelectorAll("[data-mikhail-level]").forEach(b=>b.addEventListener("click",()=>startQuiz(b.dataset.mikhailLevel)));

    const rewards=[
        ["💗 Compliment Drop","Today's system message: you're ridiculously pretty. This is not a bug."],
        ["🎟️ Argument Voucher","Redeemable for one argument where Mikhail admits you were right. Terms and conditions definitely apply 😂"],
        ["🌸 Flower Delivery","Digital flowers because apparently LizzyOS has standards now 🌸🌷🌹"],
        ["🍝 Pasta Alert","Today's mission: pasta should probably be involved somehow."],
        ["☕ Tiny Date Idea","Coffee + a walk + unnecessarily long conversation. Simple. Cute. Approved."],
        ["🕵️ Classified Compliment","Agent report: Subject Yelizaveta remains dangerously beautiful. Proceed with caution."],
        ["🎳 Bowling Pass","One rematch has been authorised. Trash talk is permitted."],
        ["💕 Mikhail Message","Just a reminder that somebody put a ridiculous amount of effort into making you your own operating system 😭❤️"]
    ];
    function key(){const d=new Date();return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`}
    function reward(){let n=0;for(const ch of key())n=(n*31+ch.charCodeAt(0))>>>0;return rewards[n%rewards.length]}
    function refreshMystery(){
        const opened=localStorage.getItem("lizzyMysteryOpened")===key(),r=reward();
        $("mysteryGift").textContent=opened?"✨":"🎁";
        $("mysteryReward")?.classList.toggle("hidden",!opened);
        if(opened)$("mysteryReward").innerHTML=`<strong>${r[0]}</strong><p>${r[1]}</p>`;
        $("openMysteryBoxLegacy").disabled=opened;
        $("openMysteryBoxLegacy").textContent=opened?"Come back tomorrow 💗":"Open Today's Box ✨";
        $("mysteryCountdown").textContent=opened?"Today's surprise has already been claimed. Another arrives tomorrow.":"";
    }
    function openMystery(){
        $("mysteryBoxWindow")?.classList.remove("hidden");refreshMystery();
        if(typeof unlockAchievement==="function")unlockAchievement("Daily Mystery Box Found 🎁");
    }
    function closeMystery(){$("mysteryBoxWindow")?.classList.add("hidden")}
    $("mysteryBoxIconLegacy")?.addEventListener("click",openMystery);
    $("mysteryBoxCloseLegacy")?.addEventListener("click",closeMystery);
    $("closeMysteryBoxLegacy")?.addEventListener("click",closeMystery);
    $("openMysteryBoxLegacy")?.addEventListener("click",()=>{
        localStorage.setItem("lizzyMysteryOpened",key());refreshMystery();
        if(typeof confetti==="function")confetti({particleCount:80,spread:85,origin:{y:.7}});
    });
})();

// OPEN WHEN SPECIAL EFFECTS — Hug + Laugh
(() => {
    const hugExtra=document.getElementById("hugExperience");
    const laughExtra=document.getElementById("laughExperience");
    const result=document.getElementById("laughResult");
    const reset=()=>{hugExtra?.classList.add("hidden");laughExtra?.classList.add("hidden");};

    document.querySelectorAll('[data-letter="hug"],[data-letter="laugh"]').forEach(btn=>{
        btn.addEventListener("click",()=>{
            reset();
            if(btn.dataset.letter==="hug"){
                setTimeout(()=>{
                    hugExtra?.classList.remove("hidden");
                    hugExtra?.classList.remove("hugPlaying");
                    void hugExtra?.offsetWidth;
                    hugExtra?.classList.add("hugPlaying");
                },60);
            }else{
                setTimeout(()=>laughExtra?.classList.remove("hidden"),60);
            }
        });
    });
    document.getElementById("backLetters")?.addEventListener("click",reset);

    const jokes=[
        "⚠️ SYSTEM WARNING: Little Miss Attitude levels have exceeded recommended limits.",
        "Fun Fact: Mikael has never lost an argument. Source: Mikael.",
        "LizzyOS has detected a smile. Mission accomplished. Please stop pressing the button. 😭",
        "🚨 ALERT: A wild Mr Perfect has appeared. Unfortunately, there is no uninstall option.",
        "Mikael tried to write a normal website. LizzyOS would like to report that he failed spectacularly.",
        "Breaking News: Agent Yelizaveta has once again been accused of having too much attitude. Investigation ongoing.",
        "Mr Perfect would like to remind you that being right all the time is extremely exhausting. Please be considerate.",
        "Technical Support: Have you tried turning the attitude off and back on again? 😂",
        "Official LizzyOS diagnosis: You probably need pasta. 🍝",
        "Achievement unlocked: You pressed the button instead of simply admitting that Mikael is funny. 🏆"
    ,
        "Girl, you look so good, I’d marry your brother just to get into your family.",
        "Somebody call the cops, because it’s got to be illegal to look that good.",
        "I guess I can kiss heaven goodbye—because it’s got to be a sin to look that good.",
        "Hey girl, you must be tired, because you’ve been running through my mind all day.",
        "I think I’ve seen your picture somewhere before… Oh yeah, in the dictionary next to kablam!",
        "Do you believe in love at first sight, or should I walk past again?",
        "Will you go on the worst date ever with me? You have to say yes.",
        "Are you the Halloween Heist? Because I’ve been planning all year to win you over.",
        "Lizzy, are you always this adorable, or are you just showing off today?",
        "I was going to play it cool, but then you smiled and ruined my entire strategy.",
        "You’re honestly very distracting. I’m trying to think, and your face keeps appearing.",
        "Lizzy, are you a calendar? Because I’m trying very hard to secure a date 😌",
        "You’re lucky you’re cute, Little Miss Attitude—because the amount of attitude coming from those four eyes is unbelievable 😂❤️"];
    let last=-1;
    document.getElementById("makeMeLaughButton")?.addEventListener("click",()=>{
        let n; do{n=Math.floor(Math.random()*jokes.length)}while(jokes.length>1&&n===last); last=n;
        if(result){result.classList.remove("laughPop");void result.offsetWidth;result.textContent=jokes[n];result.classList.add("laughPop");}
    });
})();


// =========================================================
// OPEN WHEN — LETTER OPEN NOTIFICATIONS
// Telegram notification handling is now in letter-notifications.js.
// =========================================================

// WOULD MIKAEL RATHER 40Q
(()=>{const bank=[{"a": "🏀 Basketball", "b": "⚽ Soccer", "correct": "A", "n": 1}, {"a": "❄️ Winter", "b": "☀️ Summer", "correct": "A", "n": 2}, {"a": "🍕 Pizza", "b": "🍔 Burgers", "correct": "B", "n": 3}, {"a": "📺 The Office", "b": "🚔 Brooklyn Nine-Nine", "correct": "A", "n": 4}, {"a": "🦇 Batman", "b": "🕷️ Spider-Man", "correct": "A", "n": 5}, {"a": "🎤 Dave", "b": "🎤 J. Cole", "correct": "B", "n": 6}, {"a": "🎵 Kwesta", "b": "🎵 Sjava", "correct": "A", "n": 7}, {"a": "⚽ Liverpool", "b": "☠️ Orlando Pirates", "correct": "A", "n": 8}, {"a": "🏠 Movies at home", "b": "🌃 Night out", "correct": "A", "n": 9}, {"a": "✈️ 6 months in Dagestan", "b": "🌍 5 different countries", "correct": "A", "n": 10}, {"a": "💰 R1 million now", "b": "💼 Dream job for life", "correct": "B", "n": 11}, {"a": "🏀 Meet Michael Jordan", "b": "🔥 1v1 Steph Curry", "correct": "B", "n": 12}, {"a": "🍽️ Fancy restaurant", "b": "🎳 Fun activity date", "correct": "B", "n": 13}, {"a": "📞 Call all night", "b": "💬 Text all day", "correct": "A", "n": 14}, {"a": "🎁 Thoughtful gift", "b": "❤️ Thoughtful message", "correct": "A", "n": 15}, {"a": "🎳 Lose to Lizzy at bowling", "b": "😩 Admit Lizzy was right", "correct": "A", "n": 16}, {"a": "😂 Lizzy roasts you all day", "b": "👔 Lizzy chooses your outfits for a week", "correct": "A", "n": 17}, {"a": "👓 Never say Four Eyes", "b": "😏 Never say Little Miss Attitude", "correct": "A", "n": 18}, {"a": "🔎 Lizzy reads your search history", "b": "📸 Lizzy reads your camera roll", "correct": "B", "n": 19}, {"a": "💕 One huge romantic surprise", "b": "🌸 Lots of little surprises", "correct": "B", "n": 20}, {"a": "🌅 Wake up really early", "b": "🌙 Stay up ridiculously late", "correct": "B", "n": 21}, {"a": "🏀 Courtside NBA Finals tickets", "b": "⚽ Champions League Final tickets", "correct": "B", "n": 22}, {"a": "🎤 J. Cole concert", "b": "🎤 Dave concert", "correct": "BOTH", "n": 23}, {"a": "🦇 Live in Gotham for a month", "b": "🏀 Train with Michael Jordan for a week", "correct": "B", "n": 24}, {"a": "🎮 Gaming night", "b": "🎬 Movie marathon", "correct": "B", "n": 25}, {"a": "🍳 Breakfast date", "b": "🍽️ Dinner date", "correct": "A", "n": 26}, {"a": "🏖️ Beach holiday", "b": "🏔️ Mountain holiday", "correct": "B", "n": 27}, {"a": "💵 Extremely rich but unknown", "b": "🌟 Famous but comfortably wealthy", "correct": "A", "n": 28}, {"a": "🏆 Liverpool win Champions League", "b": "🏆 Orlando Pirates win CAF Champions League", "correct": "B", "n": 29}, {"a": "🏀 Michael Jordan in his prime", "b": "🏀 Steph Curry in his prime", "correct": "A", "n": 30}, {"a": "😂 Make Lizzy laugh", "b": "😳 Make Lizzy blush", "correct": "B", "n": 31}, {"a": "💌 Long paragraph from Lizzy", "b": "🎁 Surprise from Lizzy", "correct": "BOTH", "n": 32}, {"a": "🫂 30-minute cuddle", "b": "📞 3-hour late-night call", "correct": "BOTH", "n": 33}, {"a": "🎳 Beat Lizzy badly at bowling", "b": "😏 Let her win and never tell her", "correct": "B", "n": 34}, {"a": "🪪 Full government name for a week", "b": "👑 Only Mr Perfect for a week", "correct": "B", "n": 35}, {"a": "👀 Lizzy knows everything you've said about her", "b": "📱 Lizzy gets your unlocked phone for 30 minutes", "correct": "B", "n": 36}, {"a": "💕 Plan the entire date yourself", "b": "👸 Let Lizzy plan everything", "correct": "B", "n": 37}, {"a": "💋 One perfect kiss", "b": "🫂 Unlimited hugs for a week", "correct": "BOTH", "n": 38}, {"a": "😤 Win every argument against Lizzy", "b": "🥺 Never have Lizzy annoyed with you again", "correct": "A", "n": 39}, {"a": "❤️ Hear Lizzy say “I miss you”", "b": "👀 Hear Lizzy admit “You were right”", "correct": "A", "n": 40}],$=x=>document.getElementById(x);let round=[],i=0,score=0,answerLog=[];
function intro(){$("wouldRatherIntro").classList.remove("hidden");$("wouldRatherPlay").classList.add("hidden");$("wouldRatherResult").classList.add("hidden")}
function start(){round=[...bank].sort(()=>Math.random()-.5).slice(0,5);i=score=0;answerLog=[];$("wouldRatherIntro").classList.add("hidden");$("wouldRatherResult").classList.add("hidden");$("wouldRatherPlay").classList.remove("hidden");render()}
function render(){let q=round[i];$("wouldRatherProgress").textContent=`${i+1}/5 • Q${q.n}`;$("wouldRatherScore").textContent=`Score: ${score}`;$("wouldRatherA").textContent=q.a;$("wouldRatherB").textContent=q.b;$("wouldRatherA").disabled=$("wouldRatherB").disabled=false;$("wouldRatherReaction").textContent=""}
function pick(x){let q=round[i],ok=q.correct==="BOTH"||q.correct===x;if(ok)score++;answerLog.push({questionNumber:q.n,question:`${q.a} OR ${q.b}`,lizzyAnswer:x==="A"?q.a:q.b,mikaelAnswer:q.correct==="BOTH"?"Either / Both":q.correct==="A"?q.a:q.b,correct:ok?"Yes":"No"});$("wouldRatherA").disabled=$("wouldRatherB").disabled=true;$("wouldRatherReaction").textContent=ok?"Correct 👀❤️":"Wrong 😭 Mr Perfect disagrees.";setTimeout(()=>{i++;i<5?render():finish()},650)}
function finish(){window.dispatchEvent(new CustomEvent("lizzyJobProof",{detail:{type:"would_rather_complete"}}));window.dispatchEvent(new CustomEvent("lizzyJobProof",{detail:{type:"game_complete",game:"would_rather",perfect:score===5}}));$("wouldRatherPlay").classList.add("hidden");$("wouldRatherResult").classList.remove("hidden");let t=score===5?"DANGEROUSLY HIGH CLEARANCE 🕵️❤️":score>=4?"Very Suspicious 👀":score>=3?"Respectable 😌":score>=2?"Further Investigation Required 😂":"SECURITY CLEARANCE DENIED 🚨";$("wouldRatherResultTitle").textContent=`${score}/5 — ${t}`;$("wouldRatherResultText").textContent=score===5?"Agent Yelizaveta knows Mr Perfect suspiciously well.":"Play another random five and prove yourself.";fetch("https://formspree.io/f/mrpzlzkw",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({game:"Would Mikael Rather?",score:`${score}/5`,result:t,questions_and_answers:answerLog.map((a,n)=>`${n+1}. ${a.question}\nLizzy: ${a.lizzyAnswer}\nMikael: ${a.mikaelAnswer}\nCorrect: ${a.correct}`).join("\n\n")})}).catch(()=>{});lizzyTelegramNotify("🤔 WOULD MIKAEL RATHER COMPLETED",`${score}/5 — ${t}`,answerLog.map((a,n)=>`${n+1}. ${a.question}\nLizzy: ${a.lizzyAnswer}\nMikael: ${a.mikaelAnswer}\nCorrect: ${a.correct}`).join("\n\n"))}
$("wouldMikaelRatherIcon")?.addEventListener("click",()=>{$("wouldMikaelRatherWindow").classList.remove("hidden");intro()});$("wouldMikaelRatherClose")?.addEventListener("click",()=>$("wouldMikaelRatherWindow").classList.add("hidden"));$("closeWouldMikaelRather")?.addEventListener("click",()=>$("wouldMikaelRatherWindow").classList.add("hidden"));$("startWouldRather")?.addEventListener("click",start);$("playWouldRatherAgain")?.addEventListener("click",start);$("wouldRatherA")?.addEventListener("click",()=>pick("A"));$("wouldRatherB")?.addEventListener("click",()=>pick("B"));})();
// TIC-TAC-TOE VS MR PERFECT
// Easy = mostly random
// Medium = tactical
// Hard = minimax, unbeatable
// =========================================================
(() => {
    const $ = id => document.getElementById(id);
    const HUMAN = "X";
    const AI = "O";
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    let board = Array(9).fill("");
    let level = "easy";
    let locked = false;
    let score = { human:0, draw:0, ai:0 };

    const labels = {
        easy:"🌸 EASY",
        medium:"👀 MEDIUM",
        hard:"🕵️ MR PERFECT MODE"
    };

    const reactions = {
        humanWin:[
            "Okay... this game is clearly broken. 😭",
            "Mr Perfect would like an immediate investigation.",
            "Enjoy this moment, Little Miss Attitude. It may never happen again 😂"
        ],
        aiWin:[
            "Mr Perfect remains perfect. Shocking. 😌",
            "Skill issue? 👀",
            "LizzyOS recommends a rematch immediately 😂"
        ],
        draw:[
            "A draw. Mr Perfect will accept this... reluctantly.",
            "Nobody wins. Very diplomatic. 😭",
            "Stalemate. Agent Yelizaveta survives another round."
        ]
    };

    function winner(b) {
        for (const line of wins) {
            const [a,c,d] = line;
            if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
        }
        return b.every(Boolean) ? "DRAW" : null;
    }

    function emptyCells(b) {
        return b.map((v,i)=>v===""?i:null).filter(v=>v!==null);
    }

    function randomMove(b) {
        const cells = emptyCells(b);
        return cells.length ? cells[Math.floor(Math.random()*cells.length)] : null;
    }

    function findWinningMove(b, mark) {
        for (const i of emptyCells(b)) {
            b[i]=mark;
            const w=winner(b);
            b[i]="";
            if (w===mark) return i;
        }
        return null;
    }

    function mediumMove(b) {
        // 1) Win if possible.
        let move = findWinningMove(b, AI);
        if (move !== null) return move;

        // 2) Block Lizzy.
        move = findWinningMove(b, HUMAN);
        if (move !== null) return move;

        // 3) Prefer center.
        if (!b[4]) return 4;

        // 4) Prefer corners.
        const corners=[0,2,6,8].filter(i=>!b[i]);
        if (corners.length) return corners[Math.floor(Math.random()*corners.length)];

        return randomMove(b);
    }

    function minimax(b, maximizing, depth=0) {
        const result = winner(b);
        if (result === AI) return { score: 10-depth };
        if (result === HUMAN) return { score: depth-10 };
        if (result === "DRAW") return { score: 0 };

        const cells = emptyCells(b);
        let best = maximizing ? {score:-Infinity, move:null} : {score:Infinity, move:null};

        for (const i of cells) {
            b[i] = maximizing ? AI : HUMAN;
            const trial = minimax(b, !maximizing, depth+1);
            b[i] = "";

            if (maximizing) {
                if (trial.score > best.score) best = {score:trial.score, move:i};
                else if (trial.score === best.score && Math.random() < 0.35) best = {score:trial.score, move:i};
            } else {
                if (trial.score < best.score) best = {score:trial.score, move:i};
                else if (trial.score === best.score && Math.random() < 0.35) best = {score:trial.score, move:i};
            }
        }
        return best;
    }

    function hardMove(b) {
        // Optimal play: cannot lose.
        // Opening preferences make it feel less robotic while preserving optimality.
        if (emptyCells(b).length === 9) {
            return [0,2,4,6,8][Math.floor(Math.random()*5)];
        }
        return minimax(b, true).move;
    }

    function chooseAIMove() {
        if (level === "easy") {
            // Easy occasionally notices obvious wins/blocks, but often plays randomly.
            if (Math.random() < 0.30) {
                return findWinningMove(board,AI) ?? findWinningMove(board,HUMAN) ?? randomMove(board);
            }
            return randomMove(board);
        }
        if (level === "medium") return mediumMove(board);
        return hardMove(board);
    }

    function render() {
        $("tttBoard").innerHTML = board.map((cell,i)=>
            `<button class="tttCell ${cell ? "filled" : ""}" data-cell="${i}" ${locked || cell ? "disabled" : ""}>${cell==="X"?"❌":cell==="O"?"⭕":""}</button>`
        ).join("");

        $("tttBoard").querySelectorAll("[data-cell]").forEach(btn=>{
            btn.addEventListener("click",()=>humanMove(Number(btn.dataset.cell)));
        });

        $("tttScoreLine").textContent = `Lizzy ${score.human} • Draws ${score.draw} • Mr Perfect ${score.ai}`;
    }

    function setStatus(text) {
        $("tttStatus").textContent = text;
    }

    function humanMove(i) {
        if (locked || board[i]) return;
        board[i] = HUMAN;
        locked = true;
        render();

        const result = winner(board);
        if (result) return finish(result);

        setStatus("Mr Perfect is thinking... unfortunately. 👀");

        setTimeout(()=>{
            const move = chooseAIMove();
            if (move !== null) board[move] = AI;
            const result2 = winner(board);
            if (result2) return finish(result2);

            locked = false;
            setStatus(level==="hard" ? "Your move. Good luck... genuinely. 😭" : "Your move, Lizzy 😌");
            render();
        }, level==="hard" ? 550 : 450);
    }

    function finish(result) {
        locked = true;

        if (result === HUMAN) {
            score.human++;
            window.dispatchEvent(new CustomEvent("lizzyJobProof",{detail:{type:"ttt_win"}}));
            setStatus(reactions.humanWin[Math.floor(Math.random()*reactions.humanWin.length)]);
            if (typeof confetti === "function") confetti({particleCount:80,spread:80,origin:{y:.7}});
        } else if (result === AI) {
            score.ai++;
            setStatus(reactions.aiWin[Math.floor(Math.random()*reactions.aiWin.length)]);
        } else {
            score.draw++;
            setStatus(reactions.draw[Math.floor(Math.random()*reactions.draw.length)]);
        }
        window.dispatchEvent(new CustomEvent("lizzyJobProof",{detail:{type:"game_complete",game:"tic_tac_toe"}}));
        render();
    }

    function newRound() {
        board = Array(9).fill("");
        locked = false;
        setStatus(level==="hard" ? "Mr Perfect Mode activated. This one does not lose. 😌" : "Your move, Lizzy 😌");
        render();
    }

    function startLevel(selected) {
        level = selected;
        score = {human:0,draw:0,ai:0};
        $("tttLevelSelect").classList.add("hidden");
        $("tttGameArea").classList.remove("hidden");
        $("tttDifficultyLabel").textContent = labels[level];
        newRound();
    }

    function openGame() {
        $("ticTacToeWindow")?.classList.remove("hidden");
        $("tttLevelSelect")?.classList.remove("hidden");
        $("tttGameArea")?.classList.add("hidden");
    }

    function closeGame() {
        $("ticTacToeWindow")?.classList.add("hidden");
    }

    $("ticTacToeIcon")?.addEventListener("click",openGame);
    $("ticTacToeClose")?.addEventListener("click",closeGame);
    $("closeTicTacToe")?.addEventListener("click",closeGame);

    document.querySelectorAll("[data-ttt-level]").forEach(btn=>{
        btn.addEventListener("click",()=>startLevel(btn.dataset.tttLevel));
    });

    $("tttNewRound")?.addEventListener("click",newRound);
    $("tttChangeLevel")?.addEventListener("click",()=>{
        $("tttGameArea")?.classList.add("hidden");
        $("tttLevelSelect")?.classList.remove("hidden");
    });
})();

// =========================================================
// CRACK THE CODE — CLASSIFIED MISSIONS 1–12
// Missions 7 and 10 can inject temporary scavenger evidence.
// Only one mission is active at a time. Progress survives refresh.
// =========================================================
(()=>{
const $=x=>document.getElementById(x);
const ACTIVE="lizzyCrackActiveMissionV2", FOUND="lizzyCrackFoundV2";
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(e){return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const missions={
1:{title:"🔐 Security Breach",reward:"LIZZYOS SECURITY CLEARANCE: MAXIMUM",stages:[
{q:`<h3>Stage 1 — Mr Perfect Cipher</h3><div class="cipher">20 • 8 • 5 • 13 • 2 • 9 • 14 • 11 • 15 • 19 • 9</div><p>A begins with 1. Decode the name, then enter the number of letters in it.</p>`,a:["11"],hint:"A=1, B=2, C=3..."},
{q:`<h3>Stage 2 — Gotham Encryption</h3><div class="cipher">WKH GDUN NQLJKW</div><p>Gotham moved everything three places forward. Move it back. Then multiply the letters in DARK by the letters in KNIGHT, and multiply that result by Mikael's high-school basketball number.</p>`,a:["96"],hint:"THE DARK KNIGHT → 4 × 6 × 4."},
{q:`<h3>Stage 3 — Deleted Evidence</h3><p>Someone deleted the clue. Think about where unwanted LizzyOS things go.</p><div class="cipher">🦇 × 💜 + 🏀</div><p>Batman letters × Purple letters + Mikael's old basketball number.</p>`,a:["40"],hint:"6 × 6 + 4."},
{q:`<h3>Stage 4 — Agent Intercept</h3><div class="cipher">YMJWJ NX F XJHWJY</div><p>Caesar was here. Five steps separate you from the truth. After decoding it, decode <b>19 • 8 • 1 • 4 • 15 • 23</b>. Add the A=1 values of the first and last letters of that word.</p>`,a:["42"],hint:"The second word is SHADOW. S + W."},
{q:`<h3>Stage 5 — Final Security Protocol</h3><div class="cipher">23 | 30 | 4 | 6 | 6 | 11</div><p>Use THE GREATEST, THE PAST and THE IDENTITY. Identity comes first, the past follows, greatness waits at the end. Then calculate (First × Second) + Third.</p>`,a:["67"],hint:"11, 4, 23 → (11×4)+23."}
]},
2:{title:"🗂️ Missing Mr Perfect File",reward:"MR_PERFECT.exe RESTORED",scavenger:true,stages:[
{q:`<h3>Live Recovery Hunt</h3><p>Four fragments of the missing Mr Perfect file have been injected into the real desktop.</p><p>Search <b>Recycle Bin → Read Me → Open When → Mikhail Quiz</b> and click each glowing MISSION EVIDENCE card.</p><div id="crackScavengerStatus"></div>`,a:["ready"],auto:true,hint:"The evidence only exists while this mission is active."},
{q:`<h3>Reconstruct the Missing File</h3><p>All four recovered fragments are required before reconstruction.</p><div id="crackScavengerStatus"></div><div class="cipher">P • E • R • 16 &nbsp;&nbsp; + &nbsp;&nbsp; ???FECT</div><p>One fragment is pretending to be a number. A=1. Reconstruct the word LizzyOS associates with Mikael.</p>`,a:["mr perfect","perfect"],requires:["m2_recycle","m2_readme","m2_laugh","m2_colour"],hint:"16=P. Think of the nickname Lizzy gave Mikael."}
]},
3:{title:"📺 TV Multiverse Meltdown",reward:"MULTIVERSE RESTORED",stages:[
{q:`<h3>Universe 1 — The Office</h3><p>Which paper company does Michael Scott manage a branch of?</p>`,a:["dunder mifflin"],hint:"Scranton's finest paper company."},
{q:`<h3>Universe 2 — Brooklyn Nine-Nine</h3><p>Which precinct is the show centred around? Reduce its two digits until one digit remains.</p>`,a:["9"],hint:"99 → 18 → 9."},
{q:`<h3>Universe 3 — Gilmore Girls</h3><p>Who says “I got hit by a deer!”? Convert her first name to A=1 and enter the smallest letter value.</p>`,a:["15"],hint:"Rory → R=18, O=15, R=18, Y=25."},
{q:`<h3>Universe 4 — High School Musical</h3><p>The Wildcats represent which school?</p>`,a:["east high","east high school"],hint:"Troy Bolton's school."},
{q:`<h3>Multiverse Lock</h3><p>Take EAST using A=1: 5+1+19+20. Reduce it to one digit. Combine it with the reduced Brooklyn precinct digit, B99 first.</p>`,a:["99"],hint:"Both reduce to 9."}
]},
4:{title:"🌍 Agent General Knowledge Exam",reward:"GENERAL KNOWLEDGE CLEARANCE: APPROVED",stages:[
{q:`<h3>Geography</h3><p>Largest country in the world by area? Enter the square of the number of letters in its English name.</p>`,a:["36"],hint:"Russia has 6 letters."},
{q:`<h3>Science</h3><p>Au is which element? Enter its atomic number.</p>`,a:["79"],hint:"Gold."},
{q:`<h3>History</h3><p>In what year did World War II end? Add all four digits.</p>`,a:["19"],hint:"1945."},
{q:`<h3>Space</h3><p>Which planet is the Red Planet? Convert its name with A=1, then subtract the smallest value from the largest.</p>`,a:["18"],hint:"MARS → 19−1."},
{q:`<h3>Final Knowledge Lock</h3><div class="cipher">36 • 79 • 19 • 18</div><p>Use only the last digit of each fragment.</p>`,a:["6998"],hint:"6 • 9 • 9 • 8."}
]},
5:{title:"❤️ LizzyOS Treasure Hunt",reward:"LEGENDARY TREASURE UNLOCKED",scavenger:true,stages:[
{q:`<h3>Maximum-Security Treasure Hunt</h3><p>Five keys have been hidden across the real LizzyOS desktop.</p><p>Search <b>Calendar → Recycle Bin → TV/Read Me → Mikhail Quiz → Open When</b> and recover every glowing key.</p><div id="crackScavengerStatus"></div>`,a:["ready"],auto:true,hint:"Each key appears only while this mission is active."},
{q:`<h3>Final Treasure Lock</h3><p>Recover all five keys first.</p><div id="crackScavengerStatus"></div><div class="cipher">CALENDAR • FOUR EYES • 6 • 4 • NEED A HUG</div><p>Enter the numeric lock made from: letters in CALENDAR • letters in EYES • TV key • jersey key • letters in HUG.</p>`,a:["84643"],requires:["m5_calendar","m5_recycle","m5_tv","m5_jersey","m5_hug"],hint:"8 • 4 • 6 • 4 • 3"}
]},
6:{title:"🕴️ Operation Miknak",reward:"MIKNАK ARCHIVE AUTHENTICATED",stages:[
{q:`<h3>Question 1 — Childhood Identifier</h3><div class="cipher">MI _ NA _</div><p>Enter Mikael's full childhood nickname.</p>`,a:["miknak"],hint:"Two missing letters are the same."},
{q:`<h3>Question 2 — First Sport</h3><p>What was Mikael's first sport?</p><p>A. Basketball &nbsp; B. Soccer &nbsp; C. Cricket &nbsp; D. Rugby</p>`,a:["cricket","c"],hint:"Think bat, ball and wickets."},
{q:`<h3>Question 3 — Childhood Obsession</h3><div class="cipher">B _ B &nbsp; THE &nbsp; B _ ILDER</div><p>Complete the name.</p>`,a:["bob the builder"],hint:"Can we fix it?"},
{q:`<h3>Question 4 — The Number</h3><p>One number is connected to Mikael's high-school basketball history. The other is simply his favourite.</p><p><b>Clue 1:</b> It is not the number connected to his high-school jersey.<br><b>Clue 2:</b> It is smaller than that number.<br><b>Clue 3:</b> It is the only even prime number.</p><p>What is Mikael's favourite number?</p>`,a:["2","two"],hint:"Only one even number is prime."},
{q:`<h3>Question 5 — Official Assessment</h3><p>Mikael claims to be:</p><p>A. Okay &nbsp; B. Pretty good &nbsp; C. Amazing &nbsp; D. Humble</p>`,a:["amazing","c"],hint:"This answer was supplied by an extremely unbiased source."},
{q:`<h3>Final Code</h3><p>Enter: letters in <b>MIKNAK</b> • letters in <b>CRICKET</b> • Mikael's favourite number • letters in <b>AMAZING</b>.</p>`,a:["6727"],hint:"6 • 7 • 2 • 7"}
]},
7:{title:"🖥️ The Corrupted Desktop",reward:"DESKTOP SECURITY FRAGMENTS RESTORED",scavenger:true,stages:[
{q:`<h3>Scavenger Hunt Activated</h3><p>Five security fragments have been scattered through LizzyOS.</p><p>Search, in order if you like: <b>Bank → Garden → Token Jar → Open When → CLASSIFIED</b>.</p><p>When you see a glowing <b>MISSION FRAGMENT</b>, click it to recover it.</p><div id="crackScavengerStatus"></div>`,a:["ready"],auto:true,hint:"The fragments only appear while this mission is active."},
{q:`<h3>Final Security Lock</h3><p>All five fragments must be recovered before this code will work.</p><p>Enter the fragments in order: Bank • Garden • Token Jar • Open When • CLASSIFIED.</p><div id="crackScavengerStatus"></div>`,a:["42961"],requires:["m7_bank","m7_garden","m7_tokens","m7_letters","m7_classified"],hint:"Re-open the five locations and click each mission fragment."}
]},
8:{title:"🛰️ Agent Yelizaveta: Intercepted",reward:"INTERCEPTED IDENTITY CONFIRMED",stages:[
{q:`<h3>Transmission I</h3><div class="cipher">20-8-5 / 16-5-18-6-5-3-20 / 15-14-5</div><p>A=1. Decode the transmission.</p>`,a:["the perfect one"],hint:"20=T, 8=H, 5=E..."},
{q:`<h3>Identify the Individual</h3><p>Who is “THE PERFECT ONE” inside LizzyOS?</p>`,a:["mikael","mr perfect"],hint:"Lizzy gave him the nickname."},
{q:`<h3>Transmission II</h3><div class="cipher">13 – 9 – 11 – 14 – 1 – 11</div><p>Decode the childhood identifier.</p>`,a:["miknak"],hint:"A=1 again."}
]},
9:{title:"🏀 The Number Four",reward:"#4 RECORD AUTHENTICATED",stages:[
{q:`<h3>Question 1</h3><p>Is 4 Mikael's favourite number?</p>`,a:["no","n"],hint:"Meaningful does not mean favourite."},
{q:`<h3>Question 2</h3><p>Which number actually is Mikael's favourite?</p>`,a:["2","two"],hint:"Only even prime number."},
{q:`<h3>Question 3</h3><p>Why is <b>4</b> important to Mikael?</p><p>A. It was his first football number<br>B. Mikael wore #4 in high school<br>C. He was born on the 4th<br>D. It is his favourite number</p>`,a:["b","mikael wore 4 in high school","mikael wore #4 in high school","he wore 4 in high school"],hint:"It was on his high-school jersey."},
{q:`<h3>Secondary Connection</h3><p>Someone else close to Mikael also wore #4 in basketball. Who?</p><p>A. His brother &nbsp; B. His best friend &nbsp; C. His sister &nbsp; D. Lizzy</p>`,a:["c","his sister","sister"],hint:"Family connection."},
{q:`<h3>Final Code</h3><p>Favourite number • meaningful number • family basketball number.</p>`,a:["244"],hint:"2 • 4 • 4"}
]},
10:{title:"🕵️ The Impostor File",reward:"REAL MIKAEL PROFILE RESTORED",scavenger:true,stages:[
{q:`<h3>Security Alert — Fake Mikael Profile</h3><p>Four profile records exist. Only three have been recovered.</p>
<div class="impostorProfiles">
<p><b>PROFILE A</b><br>Food: Burger/Pasta • Drink: Coke • Favourite number: 2 • Game: FIFA</p>
<p><b>PROFILE B</b><br>Dream car: Porsche 911 • Fear: Hyena • First sport: Cricket • Favourite number: 4</p>
<p><b>PROFILE C</b><br>Comedian: Trevor Noah • Actor: Steve Carell • Childhood obsession: Bob the Builder • Dream career: Name Partner at a Law Firm</p>
</div>
<p><b>PROFILE D is missing.</b> Search somewhere deleted files would go and recover it.</p><div id="crackScavengerStatus"></div>`,a:["profile d"],requires:["m10_profile_d"],hint:"Deleted files → Recycle Bin."},
{q:`<h3>Authentication I</h3><p>Which statement is TRUE?</p><p>A. Mikael has broken a bone<br>B. Mikael has knitted a scarf<br>C. Mikael hates sleeping in socks<br>D. Mikael loves warm water</p>`,a:["b","he has knitted a scarf","mikael has knitted a scarf"],hint:"One unexpectedly wholesome skill."},
{q:`<h3>Authentication II</h3><p>Which statement is TRUE?</p><p>A. Mikael has never been bitten by a dog<br>B. Mikael hates chess<br>C. Mikael has been abseiling<br>D. Mikael hates dipping fries in ketchup</p>`,a:["c","mikael has been abseiling","he has been abseiling"],hint:"Think heights."},
{q:`<h3>Authentication III</h3><div class="cipher">MIK_AK</div><p>Complete the childhood identifier.</p>`,a:["miknak","n"],hint:"MIKNAK."},
{q:`<h3>Final Identity Code</h3><p>Favourite number + meaningful number + number of letters in MIKNAK.</p>`,a:["246"],hint:"2 • 4 • 6"}
]},
11:{title:"🧠 Mikael Knowledge Protocol",reward:"MIKAEL KNOWLEDGE CLEARANCE APPROVED",stages:[
{q:`<h3>Authentication I — Food</h3><p>Name either of Mikael's favourite foods.</p>`,a:["pasta","burger","a burger"],hint:"One is Italian; one usually comes with fries."},
{q:`<h3>Authentication II — Fear</h3><p>Which animal is Mikael randomly afraid of?</p>`,a:["hyena","hyenas"],hint:"Laughing predator."},
{q:`<h3>Authentication III — Career</h3><div class="cipher">NAME _______ AT A LAW FIRM</div><p>Complete Mikael's dream career.</p>`,a:["partner","name partner"],hint:"His name goes on the firm."},
{q:`<h3>Authentication IV — Vehicle</h3><div class="cipher">PORSCHE ___</div><p>Complete the dream car.</p>`,a:["911","porsche 911"],hint:"Three digits."},
{q:`<h3>Authentication V — Strange Behaviour</h3><p>Which is TRUE?</p><p>A. Mikael hates sleeping in socks<br>B. Mikael has never knitted anything<br>C. Mikael cannot drink warm water<br>D. Mikael hates ice cream</p>`,a:["c","cannot drink warm water","mikael cannot drink warm water"],hint:"Temperature problem."},
{q:`<h3>Final Protocol</h3><p>Porsche number • favourite number • meaningful number.</p>`,a:["91124"],hint:"911 • 2 • 4"}
]},
12:{title:"🗄️ Vault Breach",reward:"VAULT CLEARANCE +1",stages:[
{q:`<h3>Key I — Origin</h3><p>Before basketball and soccer entered the investigation, what sport did Mikael first play? Enter the number of letters in the sport.</p>`,a:["7","cricket"],hint:"CRICKET has 7 letters."},
{q:`<h3>Key II — The Number</h3><p>Mikael's favourite number.</p>`,a:["2","two"],hint:"Not #4."},
{q:`<h3>Key III — The Builder</h3><div class="cipher">BOB THE _______</div><p>Complete it, then enter the number of letters in the missing word.</p>`,a:["7","builder"],hint:"BUILDER has 7 letters."},
{q:`<h3>Key IV — The Enemy</h3><p>Mikael's primary-school ______ eventually became his best friend in high school. Enter the number of letters in the missing word.</p>`,a:["5","enemy"],hint:"ENEMY has 5 letters."},
{q:`<h3>Key V — The Myth</h3><p>Who said: “If I didn't know better I would say she's a myth”?</p><p>A. Lizzy &nbsp; B. Mikael &nbsp; C. Michael Scott &nbsp; D. LizzyOS</p><p>Enter the number of letters in the speaker's first name.</p>`,a:["6","mikael","b"],hint:"Mikael has 6 letters."},
{q:`<h3>Final Vault Breach Code</h3><p>Enter Keys I–V in order.</p>`,a:["72756"],hint:"7 • 2 • 7 • 5 • 6"}
]}
};

const scavengerDefs={
2:[
 {id:"m2_recycle",host:"#recycleBinWindow .windowScroll, #missionRecycleEvidenceHost",value:"RECYCLE BIN",label:"FRAGMENT I — TRASH RETRIEVAL"},
 {id:"m2_readme",host:"#readMeWindow .windowScroll, #missionReadMeEvidenceHost",value:"READ ME",label:"FRAGMENT II — ORIGIN FILE"},
 {id:"m2_laugh",host:"#openWhenWindow .windowScroll, #missionOpenWhenEvidenceHost",value:"NEED TO LAUGH",label:"FRAGMENT III — EMERGENCY COMEDY"},
 {id:"m2_colour",host:"#mikhailQuizWindow .windowScroll, #quizWindow .windowScroll, #missionQuizEvidenceHost, #readMeWindow .windowScroll",value:"PURPLE",label:"FRAGMENT IV — COLOUR AUTHENTICATION"}
],
5:[
 {id:"m5_calendar",host:"#calendarWindow .windowScroll, #missionCalendarEvidenceHost",value:"CALENDAR",label:"KEY I — POSTPONEMENT DEPARTMENT"},
 {id:"m5_recycle",host:"#recycleBinWindow .windowScroll, #missionRecycleEvidenceHost",value:"FOUR EYES",label:"KEY II — FORBIDDEN NAME"},
 {id:"m5_tv",host:"#tvWindow .windowScroll, #missionTVEvidenceHost, #readMeWindow .windowScroll",value:"THE OFFICE → 6",label:"KEY III — TV INTERCEPT"},
 {id:"m5_jersey",host:"#mikhailQuizWindow .windowScroll, #quizWindow .windowScroll, #missionQuizEvidenceHost, #readMeWindow .windowScroll",value:"HIGH-SCHOOL JERSEY → 4",label:"KEY IV — MR PERFECT AUTH"},
 {id:"m5_hug",host:"#openWhenWindow .windowScroll, #missionOpenWhenEvidenceHost",value:"NEED A HUG",label:"KEY V — FINAL SYMBOL"}
],
7:[
 {id:"m7_bank",host:"#mickyBankPanel, #missionBankEvidenceHost",value:"4",label:"FRAGMENT I — BANK"},
 {id:"m7_garden",host:"#lizzyGardenWindow .gardenApp, #missionGardenEvidenceHost",value:"2",label:"FRAGMENT II — GARDEN"},
 {id:"m7_tokens",host:"#tokenJarWindow .tokenJarApp, #missionTokensEvidenceHost",value:"9",label:"FRAGMENT III — TOKEN JAR"},
 {id:"m7_letters",host:"#openWhenWindow .windowScroll, #missionOpenWhenEvidenceHost",value:"6",label:"FRAGMENT IV — OPEN WHEN"},
 {id:"m7_classified",host:"#classifiedArchivePanel, #classifiedFolderWindow .windowScroll, #missionClassifiedEvidenceHost",value:"1",label:"FRAGMENT V — CLASSIFIED"}
],
10:[
 {id:"m10_profile_d",host:"#recycleBinWindow .windowScroll, #missionRecycleEvidenceHost",value:"PROFILE D",label:"RECOVERED PROFILE D",
  extra:"Night owl • Cheers up with ice cream • Good at making people laugh • Terrible at golf"}
]};

let mid=1,stage=0,attempts=0,crackLog=[];

function norm(v){return String(v||"").toLowerCase().trim().replace(/[^\w\s]/g,"").replace(/\s+/g," ")}
function found(){return read(FOUND,{})}
function markFound(id){
 const f=found();f[id]=true;write(FOUND,f);renderScavengerStatus();injectScavenger();
}
function activeMission(){return Number(localStorage.getItem(ACTIVE)||0)}
function setActive(id){localStorage.setItem(ACTIVE,String(id));injectScavenger()}
function clearActive(){localStorage.removeItem(ACTIVE);document.querySelectorAll(".missionInjectedClue").forEach(x=>x.remove());removeMissionOnlyLocations()}

function renderScavengerStatus(){
 const box=$("crackScavengerStatus");if(!box)return;
 const defs=scavengerDefs[mid]||[],f=found();
 box.innerHTML=defs.length?`<div class="missionProgressMini">${defs.map(d=>`<span>${f[d.id]?"✅":"⬜"} ${d.label}</span>`).join("")}</div>`:"";
}

function ensureMissionFallbackLocation(id,label,emoji){
 let icon=document.getElementById(id+"Icon"),win=document.getElementById(id+"Window");
 const desktop=document.querySelector("#desktopArea")||document.querySelector(".desktopIcons")||document.querySelector("#desktop");
 if(!icon && desktop){
   icon=document.createElement("div");icon.id=id+"Icon";icon.className="desktopIcon missionOnlyClassified";
   icon.innerHTML=`<div class="desktopEmoji">${emoji}</div><span>${label}</span>`;desktop.appendChild(icon);
 }
 if(!win){
   win=document.createElement("div");win.id=id+"Window";win.className="desktopWindow hidden";
   win.innerHTML=`<div class="windowTop"><div class="windowDots"><span class="windowCloseDot"></span><span class="windowMinDot"></span><span class="windowMaxDot"></span></div><h2>${emoji} ${label}</h2></div><div class="windowScroll"><p class="memoryMessage">Temporary mission access.</p><div id="${id}EvidenceHost"></div></div><button class="windowCloseButton">Close</button>`;
   document.body.appendChild(win);
 }
 icon.onclick=()=>{win.classList.remove("hidden");setTimeout(injectScavenger,20)};
 win.querySelector(".windowCloseDot").onclick=()=>win.classList.add("hidden");
 win.querySelector(".windowCloseButton").onclick=()=>win.classList.add("hidden");
}
function ensureOlderMissionLocations(){
 const a=activeMission();

 // Mission 2 — every evidence location gets a temporary fallback if its real app is absent.
 if(a===2){
   if(!document.querySelector("#recycleBinWindow"))ensureMissionFallbackLocation("missionRecycle","Recycle Bin","🗑️");
   if(!document.querySelector("#readMeWindow"))ensureMissionFallbackLocation("missionReadMe","Read Me","📄");
   if(!document.querySelector("#openWhenWindow"))ensureMissionFallbackLocation("missionOpenWhen","Open When","💌");
   if(!document.querySelector("#mikhailQuizWindow, #quizWindow"))ensureMissionFallbackLocation("missionQuiz","Mikhail Quiz","🧠");
 }

 // Mission 5 — Calendar, Recycle Bin, TV, Quiz and Open When are all guaranteed.
 if(a===5){
   if(!document.querySelector("#calendarWindow"))ensureMissionFallbackLocation("missionCalendar","Calendar","📅");
   if(!document.querySelector("#recycleBinWindow"))ensureMissionFallbackLocation("missionRecycle","Recycle Bin","🗑️");
   if(!document.querySelector("#tvWindow"))ensureMissionFallbackLocation("missionTV","TV","📺");
   if(!document.querySelector("#mikhailQuizWindow, #quizWindow"))ensureMissionFallbackLocation("missionQuiz","Mikhail Quiz","🧠");
   if(!document.querySelector("#openWhenWindow"))ensureMissionFallbackLocation("missionOpenWhen","Open When","💌");
 }

 // Mission 7 — guarantee all five corrupted-desktop locations.
 if(a===7){
   if(!document.querySelector("#mickyBankPanel"))ensureMissionFallbackLocation("missionBank","Micky Bank","🏦");
   if(!document.querySelector("#lizzyGardenWindow .gardenApp"))ensureMissionFallbackLocation("missionGarden","Lizzy Garden","🌷");
   if(!document.querySelector("#tokenJarWindow .tokenJarApp"))ensureMissionFallbackLocation("missionTokens","Token Jar","🎟️");
   if(!document.querySelector("#openWhenWindow"))ensureMissionFallbackLocation("missionOpenWhen","Open When","💌");
 }

 // Mission 10 — PROFILE D must always be recoverable.
 if(a===10 && !document.querySelector("#recycleBinWindow"))ensureMissionFallbackLocation("missionRecycle","Recycle Bin","🗑️");
}
function ensureMissionClassifiedLocation(){
 if(activeMission()!==7)return;

 // If the full Living Desktop already has a permanent CLASSIFIED folder,
 // Mission 7 uses it. Otherwise create a temporary one on the REAL #desktopArea.
 if(document.querySelector("#classifiedArchivePanel, #classifiedFolderWindow"))return;

 let icon=document.getElementById("missionClassifiedIcon");
 let win=document.getElementById("missionClassifiedWindow");
 const desktop=document.querySelector("#desktopArea")||document.querySelector("#desktop");
 if(!desktop)return;

 if(!icon){
   icon=document.createElement("div");
   icon.id="missionClassifiedIcon";
   icon.className="desktopIcon missionOnlyClassified";
   icon.setAttribute("role","button");
   icon.setAttribute("tabindex","0");
   icon.innerHTML='<div class="desktopEmoji">🗃️</div><span>CLASSIFIED</span><small class="missionFolderBadge">MISSION</small>';
   desktop.appendChild(icon);
 }
 if(!win){
   win=document.createElement("div");
   win.id="missionClassifiedWindow";
   win.className="desktopWindow hidden";
   win.innerHTML='<div class="windowTop"><div class="windowDots"><span class="windowCloseDot" id="missionClassifiedClose"></span><span class="windowMinDot"></span><span class="windowMaxDot"></span></div><h2>🗃️ CLASSIFIED</h2></div><div class="windowScroll"><p class="memoryMessage">⚠️ Temporary Mission 7 clearance granted.</p><p>One corrupted-desktop fragment has been detected in this folder.</p><div id="missionClassifiedEvidenceHost"></div></div><button id="missionClassifiedCloseBtn" class="windowCloseButton">Close</button>';
   document.body.appendChild(win);
 }
 const open=()=>{
   win.classList.remove("hidden");
   setTimeout(injectScavenger,30);
 };
 icon.onclick=open;
 icon.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}};
 document.getElementById("missionClassifiedClose").onclick=()=>win.classList.add("hidden");
 document.getElementById("missionClassifiedCloseBtn").onclick=()=>win.classList.add("hidden");
}
function removeMissionOnlyLocations(){
 ["missionClassified","missionCalendar","missionQuiz","missionTV","missionRecycle","missionReadMe","missionOpenWhen","missionBank","missionGarden","missionTokens"].forEach(id=>{
   document.getElementById(id+"Icon")?.remove();
   document.getElementById(id+"Window")?.remove();
 });
}
function injectScavenger(){
 document.querySelectorAll(".missionInjectedClue").forEach(x=>x.remove());
 ensureMissionClassifiedLocation();
 ensureOlderMissionLocations();
 const id=activeMission(),defs=scavengerDefs[id]||[],f=found();
 defs.forEach(d=>{
   if(f[d.id])return;
   const host=document.querySelector(d.host);if(!host)return;
   const card=document.createElement("button");
   card.type="button";card.className="missionInjectedClue";
   card.innerHTML=`<b>🕵🏾 MISSION EVIDENCE</b><span>${d.label}</span><strong>${d.value}</strong>${d.extra?`<small>${d.extra}</small>`:""}<em>Click to recover</em>`;
   card.addEventListener("click",()=>{markFound(d.id);card.remove();});
   host.appendChild(card);
 });
 renderScavengerStatus();
}

function menu(){
 $("crackMenu").classList.remove("hidden");$("crackPlay").classList.add("hidden");$("crackComplete").classList.add("hidden");
}
function resetMissionEvidence(id){
 const defs=scavengerDefs[Number(id)]||[],f=found();
 defs.forEach(d=>delete f[d.id]);
 write(FOUND,f);
}
function start(id){
 mid=Number(id);stage=0;attempts=0;crackLog=[];
 resetMissionEvidence(mid);
 setActive(mid);
 $("crackMenu").classList.add("hidden");$("crackComplete").classList.add("hidden");$("crackPlay").classList.remove("hidden");render();
}
function render(){
 let m=missions[mid],s=m.stages[stage];
 $("crackMissionTitle").textContent=m.title;$("crackStage").textContent=`Stage ${stage+1}/${m.stages.length}`;
 $("crackPuzzle").innerHTML=s.q;$("crackAnswer").value="";$("crackFeedback").textContent="";
 renderScavengerStatus();injectScavenger();
 if(s.auto){
   $("crackAnswer").placeholder="Type READY when you have read the instructions";
 }else $("crackAnswer").placeholder="Enter answer / code";
 $("crackAnswer").focus();
}
function requirementsMet(s){
 const f=found();return !(s.requires||[]).some(id=>!f[id]);
}
function submit(){
 let s=missions[mid].stages[stage],raw=$("crackAnswer").value,v=norm(raw);
 if(!requirementsMet(s)){
   $("crackFeedback").textContent="🔎 Evidence still missing. Search LizzyOS and recover every required mission item first.";
   injectScavenger();return;
 }
 let ok=s.a.some(a=>norm(a)===v);
 crackLog.push({stage:stage+1,question:$("crackPuzzle").innerText.replace(/\s+/g," ").trim(),answer:raw||"(blank)",expected:s.a.join(" / "),correct:ok?"Yes":"No"});
 if(ok){
   attempts=0;$("crackFeedback").textContent="✅ DECRYPTED. Accessing next layer...";
   setTimeout(()=>{stage++;stage<missions[mid].stages.length?render():complete()},650);
 }else{
   attempts++;$("crackFeedback").textContent=attempts>=3?"🚨 INTRUDER DETECTED. Try the hint. 😭":"❌ ACCESS DENIED. Incorrect code.";
 }
}
function complete(){
 window.dispatchEvent(new CustomEvent("lizzyJobProof",{detail:{type:"crack_complete",mission:mid}}));
 window.dispatchEvent(new CustomEvent("lizzyJobProof",{detail:{type:"game_complete",game:"crack_code"}}));
 let m=missions[mid];
 $("crackPlay").classList.add("hidden");$("crackComplete").classList.remove("hidden");
 $("crackCompleteTitle").textContent=`🔓 ${m.reward}`;
 $("crackCompleteText").textContent=mid===12?"Vault Breach complete. LizzyOS has recorded a clearance upgrade. Mikael is reportedly being dramatic about the security failure. 😂":"Mission complete. Mr Perfect would like it recorded that your security clearance is becoming concerning. 😂❤️";
 localStorage.setItem(`crackMission${mid}`,"complete");
 if(mid===12){
   const current=Math.max(0,Number(localStorage.getItem("lizzyVaultClearance")||0));
   const upgraded=Math.min(3,current+1);
   localStorage.setItem("lizzyVaultClearance",String(upgraded));
   window.dispatchEvent(new CustomEvent("lizzyVaultClearanceChanged",{detail:{clearance:upgraded}}));
 }
 clearActive();
 fetch("https://formspree.io/f/xjybobov",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({game:"Crack the Code",mission:m.title,result:m.reward,questions_and_answers:crackLog.map(a=>`Stage ${a.stage}: ${a.question}\nLizzy answer: ${a.answer}\nExpected: ${a.expected}\nCorrect: ${a.correct}`).join("\n\n")})}).catch(()=>{});
 lizzyTelegramNotify("🔐 CRACK THE CODE COMPLETED",`${m.title} — ${m.reward}`,crackLog.map(a=>`Stage ${a.stage}: ${a.question}\nLizzy answer: ${a.answer}\nExpected: ${a.expected}\nCorrect: ${a.correct}`).join("\n\n"));
}
$("crackCodeIcon")?.addEventListener("click",()=>{$("crackCodeWindow").classList.remove("hidden");menu();injectScavenger()});
$("crackCodeClose")?.addEventListener("click",()=>$("crackCodeWindow").classList.add("hidden"));
$("closeCrackCode")?.addEventListener("click",()=>$("crackCodeWindow").classList.add("hidden"));
document.querySelectorAll("[data-mission]").forEach(b=>b.addEventListener("click",()=>start(b.dataset.mission)));
$("crackSubmit")?.addEventListener("click",submit);
$("crackAnswer")?.addEventListener("keydown",e=>{if(e.key==="Enter")submit()});
$("crackHint")?.addEventListener("click",()=>{$("crackFeedback").textContent="💡 "+missions[mid].stages[stage].hint});
$("crackBack")?.addEventListener("click",()=>{clearActive();menu()});
$("crackAnother")?.addEventListener("click",menu);

// Re-inject evidence after desktop windows are opened/redrawn.
document.addEventListener("click",()=>setTimeout(injectScavenger,80));
window.addEventListener("focus",injectScavenger);
setTimeout(injectScavenger,500);
})();


// STREAK SAFETY: no hard-coded migration. Existing saved streak/claim state is authoritative.

// DAILY REWARDS + STRICT CONSECUTIVE STREAK — MASSIVE POOL V4
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const BASIC=[["DULL / BASIC", "🪙", "1 Micky Buc", "1 Micky Buc added to Lizzy's wallet.", {"mb": 1}], ["DULL / BASIC", "🪙", "2 Micky Bucs", "2 Micky Bucs added to Lizzy's wallet.", {"mb": 2}], ["DULL / BASIC", "🪙", "3 Micky Bucs", "3 Micky Bucs added to Lizzy's wallet.", {"mb": 3}], ["DULL / BASIC", "🪙", "4 Micky Bucs", "4 Micky Bucs added to Lizzy's wallet.", {"mb": 4}], ["DULL / BASIC", "🪙", "5 Micky Bucs", "5 Micky Bucs added to Lizzy's wallet.", {"mb": 5}], ["DULL / BASIC", "🪙", "A Singular Micky Buc", "1 Micky Buc added to Lizzy's wallet.", {"mb": 1}], ["DULL / BASIC", "🧾", "Financial Assistance — 2 MB", "2 Micky Bucs added to Lizzy's wallet.", {"mb": 2}], ["DULL / BASIC", "🧾", "Tiny Fortune — 3 MB", "3 Micky Bucs added to Lizzy's wallet.", {"mb": 3}], ["DULL / BASIC", "🪙", "Bank of Micky Stimulus — 4 MB", "4 Micky Bucs added to Lizzy's wallet.", {"mb": 4}], ["DULL / BASIC", "🧾", "Economic Recovery Package — 2 MB", "2 Micky Bucs added to Lizzy's wallet.", {"mb": 2}], ["DULL / BASIC", "🧾", "Proof of Participation", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🥔", "Digital Potato", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Digital Paperclip", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "A Rock", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🍃", "One Leaf", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Brick", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Stick", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Digital Spoon", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧦", "One Sock", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🌬️", "Virtual Chair", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Square of Virtual Toilet Paper", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "📦", "Empty Box", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Empty Paper Bag", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Empty Jar", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Empty Cup", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧊", "One Ice Cube", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🌬️", "Fresh Air", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🌬️", "Slightly Fresher Air", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "☁️", "One Cloud", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Bubble", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "A Pinch of Salt", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧊", "One Grain of Rice", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🍝", "One Piece of Pasta", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Fry", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Sweet", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧊", "One Imaginary Slice of Cheese", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Cupcake JPEG", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧊", "Digital Ice Cream", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🥤", "Digital Coke", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Burger Emoji", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🏅", "Participation Medal", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🏆", "Participation Trophy", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "📜", "Certificate of Existing", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "📦", "Certificate of Opening the Box", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "📜", "Certificate of Trying", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "📜", "Certificate of Being Lizzy", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "📜", "Certificate of Attendance", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "📜", "Certificate of Absolutely Nothing", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🏅", "Medal of Mediocrity", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Better Luck Tomorrow Award", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Clap", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Two Claps", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Three Claps", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Mikael's Respect", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Mikael's Approval", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Digital Handshake", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Virtual Hug", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "High Five", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Purple Heart", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "✨", "One Sparkle", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "⭐", "One Star", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "⭐", "Slightly Better Star", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Tear", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Laugh", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Eye Roll", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Suspicious Look", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Emotional Support", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "💌", "One Complimentary Thought", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Random Thought", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Five Extra Imaginary Minutes of Sleep", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Permission to Lie Down", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Permission to Be Tired", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Permission to Do Absolutely Nothing", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Permission to Watch One Episode", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Five Minutes of Guilt-Free Scrolling", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Song Break", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🍝", "Permission to Think About Pasta", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Hydration Reminder", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Reminder That Tequila Isn't Water", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Motivational Quote", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Useless Life Lesson", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Mikael Wisdom — Budget Edition", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "💌", "Tiny Compliment", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "You're Pretty Cool", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧊", "You Look Nice Today", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "You're Actually Stunning", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "You're Doing Fine", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Keep Going Soldier", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "At Least You Tried", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Could Be Worse", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "+1 Confidence", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "-1 Attitude", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "+1 Brain Cell", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "👓", "+1 Vision", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "+1 Reason to Bully Mikael", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Permission to Make One Knee Joke", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Permission to Say You're So Annoying", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧊", "Drama Licence", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Little Miss Attitude Certification", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "👓", "Four Eyes Membership Renewal", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🤓", "Specsy Membership Renewal", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Blind as a Bat Achievement", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Mother of the Year Nomination", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧊", "Jaden Smith Philosophy Licence", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "OPP Warning", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Recycle Bin Immunity — 5 Minutes", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🪙", "Bank of Micky Statement", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🪙", "Bank of Micky Receipt", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Declined Imaginary Credit Card", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Credit Score: We'll Talk", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Fake R1 Million", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Monopoly Money", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🪙", "Counterfeit Micky Buc", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "0% Interest on Absolutely Nothing", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧊", "Financial Advice from Mikael", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🌱", "Common Garden Seed", "A deliberately underwhelming LizzyOS Daily Reward.", {"seed": "random"}], ["DULL / BASIC", "🌱", "Tiny Seed", "A deliberately underwhelming LizzyOS Daily Reward.", {"seed": "random"}], ["DULL / BASIC", "🍃", "Random Leaf", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Suspicious Cactus", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🌼", "Basic Flower", "A deliberately underwhelming LizzyOS Daily Reward.", {"flower": "random"}], ["DULL / BASIC", "🧾", "Tiny Pot", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🌱", "One Garden Water Drop", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Ray of Sunshine", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🌱", "Garden Bug", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🌱", "Garden Worm", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🍃", "Dead Leaf", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Mystery Weed", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🌱", "Decorative Garden Rock", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Bee Visit", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Butterfly Visit", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Useless Ticket", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Ticket to Nowhere", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Key That Opens Nothing", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Locked Reward", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Mystery Prize — It's Nothing", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "📦", "Box Inside a Box", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "📦", "Box Inside Another Box", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "📦", "Final Box — Still Nothing", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Congratulations Screen", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Standing Ovation From One Person", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Walking Ovation", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Very Quiet Applause", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Imaginary Fanfare", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Firework", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "One Balloon", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Three Pieces of Confetti", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Five Seconds of Main Character Energy", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Temporary Queen Status — 30 Seconds", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧊", "Cool Person Licence", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "GOAT Status — Under Review", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "IOU: Nothing", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Refund: R0.00", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Cashback: 0%", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Almost Won Something", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Very Nearly Almost Won Something", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Unlucky", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Extremely Unlucky", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "This Close", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Maybe Tomorrow", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Thank You for Participating", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Daily Reward Completed", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Achievement: Clicked Button", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Professional Clicker", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "LizzyOS User of the Day", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Desktop Explorer", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Folder Opening Specialist", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Junior Investigator", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Professional Nosy Person", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Classified File Enthusiast", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Lizzy Mail Reader", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Internet Explorer — Literally", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Bank Visitor", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🌱", "Amateur Gardener", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Casual Gamer", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Puzzle Survivor", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Life Lessons Graduate", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Mr Perfect Acknowledgement Badge", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🏆", "Mikael Was Right Trophy", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🏆", "Lizzy Was Definitely Right Trophy", "A deliberately underwhelming LizzyOS Daily Reward.", {}], ["DULL / BASIC", "🧾", "Absolutely Nothing", "A deliberately underwhelming LizzyOS Daily Reward.", {}]];
const REVERSE=[["REVERSE TOKEN", "🥤", "Reverse Token — Lizzy Owes Mikael a Monster", "Lizzy owes Mikael one Monster.", {}], ["REVERSE TOKEN", "🫂", "Reverse Token — Mikael Gets a Hug", "Lizzy owes Mikael one proper hug.", {}], ["REVERSE TOKEN", "🍦", "Reverse Token — Mikael Gets Ice Cream", "Lizzy owes Mikael one ice cream.", {}], ["REVERSE TOKEN", "🍰", "Reverse Token — Mikael Gets Dessert", "Lizzy owes Mikael one dessert.", {}], ["REVERSE TOKEN", "🍫", "Reverse Token — Mikael Gets a Chocolate", "Lizzy owes Mikael one chocolate.", {}], ["REVERSE TOKEN", "🍬", "Reverse Token — Mikael Gets Sweets", "Lizzy owes Mikael some sweets.", {}], ["REVERSE TOKEN", "🥤", "Reverse Token — Mikael Gets a Coke", "Lizzy owes Mikael one Coke.", {}], ["REVERSE TOKEN", "☕", "Reverse Token — Mikael Gets a Drink", "Lizzy owes Mikael one reasonable drink.", {}], ["REVERSE TOKEN", "🍔", "Reverse Token — Mikael Gets a Snack", "Lizzy owes Mikael one snack.", {}], ["REVERSE TOKEN", "🍟", "Reverse Token — Mikael Gets Fries", "Lizzy owes Mikael some fries.", {}], ["REVERSE TOKEN", "🎬", "Reverse Token — Mikael Picks the Movie", "Mikael chooses the movie for one movie night.", {}], ["REVERSE TOKEN", "📺", "Reverse Token — Mikael Picks What We Watch", "Mikael chooses what you watch once.", {}], ["REVERSE TOKEN", "🎵", "Reverse Token — Mikael Controls the Aux", "Mikael controls the music for one reasonable trip or session.", {}], ["REVERSE TOKEN", "🎶", "Reverse Token — Mikael Picks One Song", "Mikael chooses one song, no skipping.", {}], ["REVERSE TOKEN", "🍽️", "Reverse Token — Mikael Picks Where We Eat", "Mikael chooses where to eat once.", {}], ["REVERSE TOKEN", "🎯", "Reverse Token — Mikael Picks the Activity", "Mikael chooses one reasonable activity.", {}], ["REVERSE TOKEN", "🎳", "Reverse Token — Mikael Picks the Next Date Activity", "Mikael chooses the next activity date.", {}], ["REVERSE TOKEN", "📸", "Reverse Token — Mikael Gets One Nice Photo", "Lizzy owes Mikael one nice photo.", {}], ["REVERSE TOKEN", "🤳", "Reverse Token — Mikael Gets One Selfie Together", "One selfie together, Mikael's choice of moment.", {}], ["REVERSE TOKEN", "💌", "Reverse Token — Mikael Gets a Nice Message", "Lizzy owes Mikael one genuinely nice message.", {}], ["REVERSE TOKEN", "📝", "Reverse Token — Mikael Gets a Little Letter", "Lizzy owes Mikael one little letter.", {}], ["REVERSE TOKEN", "💬", "Reverse Token — Lizzy Answers One Random Question", "Lizzy answers one harmless random question properly.", {}], ["REVERSE TOKEN", "🤔", "Reverse Token — Mikael Gets One Honest Answer", "Mikael gets one honest answer to a reasonable question.", {}], ["REVERSE TOKEN", "📞", "Reverse Token — Mikael Gets a Call", "Mikael gets one reasonable call.", {}], ["REVERSE TOKEN", "🎙️", "Reverse Token — Mikael Gets a Voice Note", "Lizzy owes Mikael one voice note.", {}], ["REVERSE TOKEN", "😂", "Reverse Token — Mikael Gets One Joke", "Lizzy owes Mikael one joke.", {}], ["REVERSE TOKEN", "😌", "Reverse Token — Lizzy Says Something Nice About Mikael", "Lizzy must say one genuinely nice thing about Mikael.", {}], ["REVERSE TOKEN", "👑", "Reverse Token — Mikael Wins One Harmless Argument", "Mikael automatically wins one harmless argument.", {}], ["REVERSE TOKEN", "🧑‍⚖️", "Reverse Token — No Bullying Mikael for One Hour", "Mikael gets one full hour of protection from bullying.", {}], ["REVERSE TOKEN", "🦵", "Reverse Token — Mikael's Knees Are Protected for One Day", "No knee slander for one full day.", {}], ["REVERSE TOKEN", "😭", "Reverse Token — No You're So Annoying for One Hour", "Lizzy cannot say 'You're so annoying' to Mikael for one hour.", {}], ["REVERSE TOKEN", "🏆", "Reverse Token — Lizzy Admits Mikael Was Right", "Lizzy must admit Mikael was right once.", {}], ["REVERSE TOKEN", "😇", "Reverse Token — Be Nice to Mikael for 30 Minutes", "Thirty uninterrupted minutes of kindness to Mikael.", {}], ["REVERSE TOKEN", "👓", "Reverse Token — Four Eyes Compliments Mr Perfect", "Four Eyes owes Mr Perfect one compliment.", {}], ["REVERSE TOKEN", "😭", "Reverse Token — Mikael Gets One Free Roast", "Mikael gets one consequence-free playful roast.", {}], ["REVERSE TOKEN", "🃏", "Reverse Token — Mikael Gets One UNO Reverse", "Mikael can reverse one playful situation.", {}], ["REVERSE TOKEN", "🎲", "Reverse Token — Mikael Chooses", "Mikael chooses between two reasonable options.", {}], ["REVERSE TOKEN", "🤝", "Reverse Token — One Small Favour", "Lizzy owes Mikael one small reasonable favour.", {}], ["REVERSE TOKEN", "🛋️", "Reverse Token — Mikael Gets the Comfortable Seat", "Mikael gets first choice of the comfortable seat once.", {}], ["REVERSE TOKEN", "🎮", "Reverse Token — Mikael Picks the Game", "Mikael chooses the game once.", {}], ["REVERSE TOKEN", "⚽", "Reverse Token — Watch Football With Mikael", "One football watch session with Mikael.", {}], ["REVERSE TOKEN", "💤", "Reverse Token — Mikael Gets a Peace & Quiet Pass", "One reasonable period of uninterrupted peace and quiet.", {}], ["REVERSE TOKEN", "🥺", "Reverse Token — Mikael Gets One Please", "Lizzy has to ask nicely once. Very serious legislation.", {}], ["REVERSE TOKEN", "👑", "Reverse Token — Mr Perfect Privilege", "One small reasonable Mr Perfect privilege.", {}]];
const NORMAL=[["NORMAL", "💰", "10 Micky Bucs", "A useful little Micky Bucs boost.", {"mb": 10}], ["NORMAL", "💰", "12 Micky Bucs", "Twelve fresh Micky Bucs.", {"mb": 12}], ["NORMAL", "💰", "15 Micky Bucs", "A respectable Micky Bucs reward.", {"mb": 15}], ["NORMAL", "💰", "18 Micky Bucs", "Eighteen Micky Bucs added to the wallet.", {"mb": 18}], ["NORMAL", "💰", "20 Micky Bucs", "Twenty Micky Bucs. Not bad.", {"mb": 20}], ["NORMAL", "🌱", "Uncommon Garden Seed", "Adds a random seed to the Garden.", {"seed": "random"}], ["NORMAL", "🌷", "Pretty Flower Seed", "Adds a random seed to the Garden.", {"seed": "random"}], ["NORMAL", "🌻", "Sunflower Surprise", "Adds a random seed to the Garden.", {"seed": "random"}], ["NORMAL", "🌸", "Pink Flower Surprise", "Adds one random flower to the Garden.", {"flower": "random"}], ["NORMAL", "💧", "Garden Water Pack", "Gives the Garden a useful boost.", {"gardenBoost": true}], ["NORMAL", "🌿", "Garden Boost", "Gives one existing plant a health and growth boost.", {"gardenBoost": true}], ["NORMAL", "🎟️", "Mini Treat Token", "Redeem for one small snack or drink.", {"token": "Mini Treat Token"}], ["NORMAL", "🫂", "Hug Token", "Redeem for one proper Mikael hug.", {"token": "Hug Token"}], ["NORMAL", "🍨", "Dessert Run Token", "A dessert or ice cream run.", {"token": "Mystery Gift Token"}], ["NORMAL", "⚖️", "Argument Token", "One harmless argument advantage.", {"token": "Argument Winner Pass"}], ["NORMAL", "🍦", "Ice Cream Token", "One ice cream request.", {"token": "Mystery Gift Token"}], ["NORMAL", "🍬", "Sweet Treat Token", "One sweet treat.", {"token": "Snack Token"}], ["NORMAL", "☕", "Drink Run Token", "One coffee or hot chocolate.", {"token": "Coffee / Hot Chocolate Token"}], ["NORMAL", "💌", "Compliment Token", "One proper compliment from Mikael.", {"token": "Question Token"}], ["NORMAL", "🎵", "Song Request Token", "One song request.", {}], ["NORMAL", "🎬", "Movie Suggestion Token", "One movie suggestion with strong lobbying rights.", {}], ["NORMAL", "🎮", "Game Choice Token", "Lizzy chooses a game once.", {}], ["NORMAL", "📝", "Mini Letter", "A small personal LizzyOS letter reward.", {}], ["NORMAL", "💌", "Secret Compliment", "LizzyOS confirms you are dangerously adorable today.", {}], ["NORMAL", "📸", "Memory Unlock", "Unlock a memory prompt.", {}], ["NORMAL", "🖼️", "Gallery Surprise", "A gallery-themed surprise reward.", {}], ["NORMAL", "🎧", "Mikael Song Recommendation", "Mikael owes one song recommendation.", {}], ["NORMAL", "😂", "Mikael Joke Pack", "Premium terrible jokes from Mikael.", {}], ["NORMAL", "💡", "Premium Life Lesson", "A suspiciously premium piece of Mikael wisdom.", {}], ["NORMAL", "🏦", "Bank of Micky Bonus — 10 MB", "Ten Micky Bucs added to the wallet.", {"mb": 10}], ["NORMAL", "💸", "+10 MB Wallet Boost", "Ten Micky Bucs added to the wallet.", {"mb": 10}], ["NORMAL", "🎁", "Mystery Mini Reward", "A small LizzyOS surprise.", {}], ["NORMAL", "🌷", "Garden Mystery Item", "Adds one random flower.", {"flower": "random"}], ["NORMAL", "🪴", "Decorative Garden Item", "A small decorative Garden reward.", {}], ["NORMAL", "🎟️", "Second-Chance Token", "Save this to reroll a future Daily Reward.", {"token": "Second Chance Token"}], ["NORMAL", "🎲", "Daily Reward Reroll", "One Second Chance Token.", {"token": "Second Chance Token"}], ["NORMAL", "🔍", "Tiny Classified Clue", "One small classified clue.", {}], ["NORMAL", "🧩", "Crack-the-Code Hint", "One extra hint in a Crack the Code mission.", {}], ["NORMAL", "💌", "Open When Bonus Message", "An extra little Open When-style message.", {}], ["NORMAL", "⭐", "Lucky Star", "A small lucky-day reward.", {}], ["NORMAL", "💜", "Good Day Pass", "Official permission to have a good day.", {}], ["NORMAL", "🍝", "Pasta Appreciation Award", "Recognition for excellent pasta opinions.", {}], ["NORMAL", "🥤", "Coke Appreciation Award", "Official Coke appreciation recognition.", {}], ["NORMAL", "👸", "Little Miss Attitude Bonus", "A fully certified attitude bonus.", {}], ["NORMAL", "🤓", "Specsy Bonus", "The Specsy committee has approved this reward.", {}]];
const RARE=[["RARE", "💰", "30 Micky Bucs", "Thirty Micky Bucs.", {"mb": 30}], ["RARE", "💰", "35 Micky Bucs", "Thirty-five Micky Bucs.", {"mb": 35}], ["RARE", "💰", "40 Micky Bucs", "Forty Micky Bucs.", {"mb": 40}], ["RARE", "💰", "50 Micky Bucs", "Fifty Micky Bucs.", {"mb": 50}], ["RARE", "🌹", "Rare Garden Seed", "Adds a random Garden seed.", {"seed": "random"}], ["RARE", "🌺", "Exotic Flower", "Adds a random flower.", {"flower": "random"}], ["RARE", "🌸", "Rare Pink Flower", "Adds a random flower.", {"flower": "random"}], ["RARE", "🌱", "Mystery Rare Seed", "Adds a random Garden seed.", {"seed": "random"}], ["RARE", "✨", "Garden Growth Boost", "Boosts an existing plant.", {"gardenBoost": true}], ["RARE", "💎", "Rare Garden Decoration", "A rare Garden decoration.", {}], ["RARE", "🎟️", "Premium Treat Token", "One special treat.", {"token": "Mystery Gift Token"}], ["RARE", "🍦", "Ice Cream Run", "Ice cream on Mikael.", {"token": "Mystery Gift Token"}], ["RARE", "🍰", "Dessert Date", "A dessert-related request.", {"token": "Food Date Token"}], ["RARE", "🎬", "Movie Night Choice", "Lizzy chooses the movie.", {"token": "Movie Night Token"}], ["RARE", "🎳", "Activity Choice", "Lizzy chooses an activity.", {"token": "Activity Date Token"}], ["RARE", "💌", "Special Mikael Letter", "A special Mikael letter reward.", {}], ["RARE", "📝", "Unreleased Mini Letter", "A small unreleased letter.", {}], ["RARE", "🗂️", "Classified Fragment", "One classified fragment.", {}], ["RARE", "🔐", "Vault Discount", "A rare Vault advantage.", {}], ["RARE", "🏦", "Bank of Micky Bonus — 50 MB", "Fifty Micky Bucs.", {"mb": 50}], ["RARE", "🎲", "Double Daily Reward Tomorrow", "A rare future reward perk.", {}], ["RARE", "🎁", "Mystery Rare Box", "A rare mystery surprise.", {}], ["RARE", "🧩", "Free Crack-the-Code Hint", "One free mission hint.", {}], ["RARE", "🔎", "Classified Hint", "A stronger classified clue.", {}], ["RARE", "💜", "Rare Compliment File", "A rare compliment from Mr Perfect.", {}], ["RARE", "📸", "Hidden Memory Unlock", "Unlock a hidden memory prompt.", {}], ["RARE", "🎵", "Secret Playlist Addition", "A secret playlist/song reward.", {}], ["RARE", "🏆", "Rare LizzyOS Badge", "A rare LizzyOS badge.", {}], ["RARE", "👑", "VIP Status — One Day", "One day of LizzyOS VIP status.", {}], ["RARE", "🌟", "Lucky Day Token", "A particularly lucky-day reward.", {}]];
const EPIC=[["EPIC", "💰", "75 Micky Bucs", "Seventy-five Micky Bucs.", {"mb": 75}], ["EPIC", "💰", "100 Micky Bucs", "One hundred Micky Bucs.", {"mb": 100}], ["EPIC", "💰", "125 Micky Bucs", "One hundred and twenty-five Micky Bucs.", {"mb": 125}], ["EPIC", "🌹", "Epic Garden Seed", "Adds a random seed.", {"seed": "random"}], ["EPIC", "🌸", "Ultra-Rare Pink Flower", "Adds a random flower.", {"flower": "random"}], ["EPIC", "✨", "Garden Instant Growth", "Boosts the Garden.", {"gardenBoost": true}], ["EPIC", "👑", "Epic Garden Decoration", "An epic Garden decoration.", {}], ["EPIC", "💌", "Unreleased Letter", "An unreleased letter reward.", {}], ["EPIC", "🗂️", "Full Classified Fragment", "A major classified fragment.", {}], ["EPIC", "🔐", "Classified File Preview", "A preview of a classified file.", {}], ["EPIC", "🏦", "100 MB Bank of Micky Bonus", "One hundred Micky Bucs.", {"mb": 100}], ["EPIC", "🎁", "Epic Mystery Box", "An epic LizzyOS surprise.", {}], ["EPIC", "🎟️", "Premium Lizzy Token", "A premium Lizzy token.", {"token": "Mystery Gift Token"}], ["EPIC", "🍦", "Mikael Dessert Run", "Dessert on Mikael.", {"token": "Mystery Gift Token"}], ["EPIC", "🎳", "Activity Date Token", "Lizzy chooses a future activity.", {"token": "Activity Date Token"}], ["EPIC", "🎬", "Movie Night Token", "Lizzy chooses the movie.", {"token": "Movie Night Token"}], ["EPIC", "🍝", "Food Date Token", "Lizzy chooses where or what you eat.", {"token": "Food Date Token"}], ["EPIC", "🔓", "Vault Item Discount — 50%", "A major Vault discount.", {}], ["EPIC", "🎲", "Two Daily Reward Rerolls", "Two reroll credits.", {"token": "Second Chance Token", "count": 2}], ["EPIC", "🌟", "Double Reward Tomorrow", "A future double-reward perk.", {}], ["EPIC", "💎", "Epic LizzyOS Badge", "An epic LizzyOS badge.", {}], ["EPIC", "🕵️", "Secret Shelf Clue", "A major Secret Shelf clue.", {}], ["EPIC", "🔎", "Major Crack-the-Code Hint", "A major Crack the Code hint.", {}], ["EPIC", "💜", "Epic Surprise", "A genuinely good LizzyOS surprise.", {}], ["EPIC", "🌺", "Epic Flower Pack", "Adds three random flowers.", {"flowers": 3}]];
const LEGENDARY=[["LEGENDARY", "💰", "250 Micky Bucs", "A legendary 250 Micky Bucs jackpot.", {"mb": 250}], ["LEGENDARY", "💰", "500 Micky Bucs", "A ridiculous 500 Micky Bucs jackpot.", {"mb": 500}], ["LEGENDARY", "🏦", "Bank of Micky Jackpot", "A legendary 300 Micky Bucs Bank jackpot.", {"mb": 300}], ["LEGENDARY", "🌱", "Legendary Garden Seed", "Adds a legendary-style Garden seed.", {"seed": "random"}], ["LEGENDARY", "🌹", "One-of-One Garden Flower", "Adds a special Garden flower.", {"flower": "random"}], ["LEGENDARY", "👑", "Legendary Garden Crown", "Unlocks the Garden Crown.", {"gardenCrown": true}], ["LEGENDARY", "💌", "Unreleased Full Letter", "A full unreleased Mikael letter.", {}], ["LEGENDARY", "🗂️", "Classified File Unlock", "Unlocks a classified file reward.", {}], ["LEGENDARY", "🔐", "Free Vault Item", "One future Vault item can be claimed free.", {}], ["LEGENDARY", "💎", "Legendary Lizzy Token", "A legendary Lizzy token.", {"token": "Mystery Gift Token"}], ["LEGENDARY", "🎁", "Legendary Mystery Box", "A major mystery surprise from Mikael.", {}], ["LEGENDARY", "🍝", "Food Date Reward", "A proper food-date reward.", {"token": "Food Date Token"}], ["LEGENDARY", "🎳", "Activity Date Reward", "A proper activity-date reward.", {"token": "Activity Date Token"}], ["LEGENDARY", "🎬", "Full Movie Night Reward", "Lizzy controls movie night.", {"token": "Movie Night Token"}], ["LEGENDARY", "🍦", "Dessert Adventure", "A proper dessert adventure.", {"token": "Mystery Gift Token"}], ["LEGENDARY", "🎟️", "Choose Your Own Reward", "Choose one reasonable cute or fun reward.", {}], ["LEGENDARY", "🎲", "Triple Reward Tomorrow", "A legendary future reward multiplier.", {}], ["LEGENDARY", "💰", "Micky Bucs ×3 Next Win", "A future Micky Bucs multiplier.", {}], ["LEGENDARY", "🌷", "Instant Garden Legendary Upgrade", "A legendary Garden boost.", {"gardenBoost": true}], ["LEGENDARY", "🔓", "Secret Shelf Unlock", "A special Secret Shelf unlock reward.", {}], ["LEGENDARY", "📜", "Legendary Secret Letter", "A legendary secret letter.", {}], ["LEGENDARY", "👑", "LizzyOS VIP Week", "Seven days of LizzyOS VIP bragging rights.", {}], ["LEGENDARY", "💜", "Mikael Surprise", "Mikael owes Lizzy a special surprise.", {}], ["LEGENDARY", "🌟", "The Mr Perfect Special", "A classified Mr Perfect special reward.", {}]];
const HISTORY_KEY="lizzyMysteryRewardHistoryV4";
const RECENT_LIMIT=20;

function key(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function dn(k){let a=k.split("-").map(Number);return Math.floor(Date.UTC(a[0],a[1]-1,a[2])/86400000)}
function ix(s,n){let x=0;for(const ch of s)x=(x*31+ch.charCodeAt(0))>>>0;return n?x%n:0}
function st(){return Number(localStorage.getItem("lizzyMysteryStreak")||0)}
function reward(){try{return JSON.parse(localStorage.getItem("lizzyMysteryReward")||"null")}catch(e){return null}}
function history(){try{const h=JSON.parse(localStorage.getItem(HISTORY_KEY)||"[]");return Array.isArray(h)?h:[]}catch(e){return []}}
function saveHistory(h){localStorage.setItem(HISTORY_KEY,JSON.stringify(h.slice(-100)))}
function track(n){let p=n%7;$("streakTrack").innerHTML=Array.from({length:7},(_,i)=>`<span class="${((p===0&&n>0)||i<p)?"done":""}">${i+1}</span>`).join("")}

function recentNames(){return new Set(history().slice(-RECENT_LIMIT).map(x=>x?.reward?.[2]).filter(Boolean))}
function pick(pool,seed){
 const recent=recentNames();
 let filtered=pool.filter(r=>!recent.has(r[2]));
 if(!filtered.length)filtered=pool;
 return filtered[ix(seed,filtered.length)];
}
function ordinaryBucket(today,n){
 const roll=ix(today+"ordinary-bucket-v4",10000)/100;
 if(roll<55)return ["BASIC",BASIC];
 if(roll<68)return ["REVERSE",REVERSE];
 if(roll<85)return ["NORMAL",NORMAL];
 if(roll<94)return ["RARE",RARE];
 if(roll<99)return ["EPIC",EPIC];
 return ["LEGENDARY",LEGENDARY];
}
function daySevenBucket(today,n){
 const roll=ix(today+"day7-bucket-v4",10000)/100;
 if(roll<40)return ["LEGENDARY",LEGENDARY];
 if(roll<70)return ["EPIC",EPIC];
 if(roll<90)return ["RARE",RARE];
 return ["NORMAL",NORMAL];
}
function ensureHistoryUI(){
 const host=$("mysteryBoxWindow")?.querySelector(".mysteryBoxContent");if(!host)return;
 let section=$("dailyRewardHistorySection");
 if(!section){
   section=document.createElement("details");section.id="dailyRewardHistorySection";section.className="dailyRewardHistorySection";
   section.innerHTML='<summary>📜 Reward History</summary><div id="dailyRewardHistoryList"></div>';
   host.appendChild(section);
 }
}
function renderHistory(){
 ensureHistoryUI();const host=$("dailyRewardHistoryList");if(!host)return;
 const h=history().slice().reverse().slice(0,20);
 host.innerHTML=h.length?h.map(x=>`<div class="dailyHistoryRow"><span>${x.reward?.[1]||"🎁"}</span><div><b>${x.reward?.[2]||"Unknown Reward"}</b><small>${x.date} • ${x.reward?.[0]||"Reward"} • Streak ${x.streak}</small></div></div>`).join(""):'<p class="memoryMessage">No new-format Daily Rewards claimed yet.</p>';
}
function refresh(){
 let today=key(),opened=localStorage.getItem("lizzyMysteryOpened")===today,n=st(),r=reward();
 $("mysteryGift").textContent=opened&&r&&r[0]==="LEGENDARY"?"🏆":opened&&r&&r[0]==="REVERSE TOKEN"?"🔄":opened?"✨":"🎁";
 $("mysteryReward").classList.toggle("hidden",!opened);
 if(opened&&r)$("mysteryReward").innerHTML=`<div class="rewardRarity">${r[0]}</div><div class="rewardIcon">${r[1]}</div><strong>${r[2]}</strong><p>${r[3]}</p>`;
 $("openMysteryBox").disabled=opened;$("openMysteryBox").textContent=opened?"Come back tomorrow 💗":"Open Today's Box ✨";
 $("mysteryCountdown").textContent=opened?"Today's reward is claimed. Open tomorrow to keep the streak alive.":"";
 $("mysteryStreak").textContent=`🔥 ${n} Day${n===1?"":"s"} Streak`;
 let left=n?7-(n%7||7):7;
 $("mysteryStreakSub").textContent=(n>0&&n%7===0)?"Day 7 reached — today's milestone roll had a 40% Legendary chance.":`${left} consecutive day${left===1?"":"s"} until the 40% Legendary milestone roll.`;
 track(n);renderHistory();
}
function rewardOverlay(r,n,isDay7){
 let o=$("dailyRewardRevealOverlay");
 if(!o){o=document.createElement("div");o.id="dailyRewardRevealOverlay";o.className="dailyRewardRevealOverlay hidden";document.body.appendChild(o)}
 const type=r[0];
 let kicker="DAILY REWARD",headline="REWARD UNLOCKED",sub="";
 if(type==="DULL / BASIC"){kicker="🥱 DULL / BASIC";headline="Please contain your excitement.";sub="LizzyOS really spared no expense today."}
 else if(type==="REVERSE TOKEN"){kicker="🔄 UNO REVERSE";headline="WAIT… THIS ISN'T YOUR REWARD";sub="Mikael just won something instead. 😭"}
 else if(type==="NORMAL"){kicker="🎁 NORMAL";headline="Not bad at all.";sub="A respectable Daily Reward."}
 else if(type==="RARE"){kicker="💎 RARE";headline="Okay… this is actually good.";sub="Rare reward secured."}
 else if(type==="EPIC"){kicker="⚡ EPIC";headline="NOW WE'RE TALKING.";sub="Epic reward unlocked."}
 else if(type==="LEGENDARY"){kicker="🔥 LEGENDARY";headline="WAIT… YOU ACTUALLY HIT IT.";sub=isDay7?"Day 7's 40% Legendary roll came through.":"A 1% ordinary-day Legendary hit."}
 o.className=`dailyRewardRevealOverlay reveal-${type.toLowerCase().replace(/[^a-z]+/g,"-")}`;
 o.innerHTML=`<div class="dailyRewardRevealCard"><small>${kicker}</small><h2>${headline}</h2><div class="dailyRevealEmoji">${r[1]}</div><h3>${r[2]}</h3><p>${r[3]}</p><div class="dailyRevealStreak">🔥 Streak: ${n} day${n===1?"":"s"}</div><button id="closeDailyRewardReveal" type="button">Claimed ✓</button></div>`;
 o.classList.remove("hidden");
 $("closeDailyRewardReveal").onclick=()=>o.classList.add("hidden");
 if(type==="LEGENDARY"&&typeof confetti==="function")confetti({particleCount:220,spread:130,origin:{y:.62}});
}
function claim(){
 let today=key();if(localStorage.getItem("lizzyMysteryOpened")===today)return;
 let last=localStorage.getItem("lizzyMysteryLastDate")||"",old=st(),n=1;
 if(last){let diff=dn(today)-dn(last);n=diff===1?old+1:1}
 const day7=n%7===0;
 const [bucket,pool]=day7?daySevenBucket(today,n):ordinaryBucket(today,n);
 const r=pick(pool,`${today}-${n}-${bucket}-reward-v4`);
 localStorage.setItem("lizzyMysteryLastDate",today);
 localStorage.setItem("lizzyMysteryStreak",String(n));
 localStorage.setItem("lizzyMysteryOpened",today);
 localStorage.setItem("lizzyMysteryReward",JSON.stringify(r));
 const h=history();h.push({date:today,streak:n,reward:r});saveHistory(h);
 window.dispatchEvent(new CustomEvent("lizzyDailyRewardClaimed",{detail:{reward:r,date:today,streak:n,day7}}));
 if(typeof lizzyTelegramNotify==="function")lizzyTelegramNotify(
   r[0]==="LEGENDARY"?"🚨 LEGENDARY REWARD CLAIMED":r[0]==="REVERSE TOKEN"?"🔄 REVERSE TOKEN AWARDED":"🎁 DAILY REWARD CLAIMED",
   `${r[1]} ${r[2]}`,
   `Rarity: ${r[0]}\nReward: ${r[2]}\nDetails: ${r[3]}\nStreak: ${n} day${n===1?"":"s"}\nDay 7 milestone: ${day7?"YES":"NO"}\nDate: ${today}\nStatus: CLAIMED`
 );
 refresh();rewardOverlay(r,n,day7);
}
function open(){$("mysteryBoxWindow").classList.remove("hidden");refresh()}
function close(){$("mysteryBoxWindow").classList.add("hidden")}
$("mysteryBoxIcon")?.addEventListener("click",open);$("mysteryBoxClose")?.addEventListener("click",close);
$("closeMysteryBox")?.addEventListener("click",close);$("openMysteryBox")?.addEventListener("click",claim);
window.LizzyDailyRewardsV4={counts:{basic:BASIC.length,reverse:REVERSE.length,normal:NORMAL.length,rare:RARE.length,epic:EPIC.length,legendary:LEGENDARY.length},refresh};
})();


// =========================================================
// LIZZY'S GARDEN + TOKEN JAR + WEATHER
// PROGRESS-SAFE UPDATE
// IMPORTANT: This module DOES NOT overwrite the existing
// lizzyMysteryStreak / LastDate / Opened / Reward keys.
// =========================================================
(() => {
    const $ = id => document.getElementById(id);

    const KEYS = {
        garden: "lizzyGardenV1",
        tokens: "lizzyTokenJarV1",
        migration: "lizzyGardenTokenMigrationV1",
        gameSeeds: "lizzyGameSeedRewardsV1",
        pendingNotify: "lizzyPendingTokenNotificationsV1",
        notificationEndpoint: "lizzyTelegramWorkerURL"
    };

    const nowISO = () => new Date().toISOString();
    const dayKey = (d=new Date()) =>
        `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

    function safeRead(key, fallback){
        try{
            const raw = localStorage.getItem(key);
            return raw === null ? fallback : JSON.parse(raw);
        }catch(e){ return fallback; }
    }
    function safeWrite(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

    // A broad Garden catalogue: standard, rare and secret plants.
    const FLOWERS = {
        tulip:       {name:"Tulip",emoji:"🌷",type:"flower",rarity:"Common"},
        redRose:     {name:"Red Rose",emoji:"🌹",type:"flower",rarity:"Common"},
        pinkRose:    {name:"Pink Rose",emoji:"🌹",type:"flower",rarity:"Uncommon"},
        whiteRose:   {name:"White Rose",emoji:"🤍",type:"flower",rarity:"Uncommon"},
        lilyValley:  {name:"Lily of the Valley",emoji:"🤍",type:"flower",rarity:"Rare"},
        cryingLily:  {name:"Crying Lily",emoji:"🥀",type:"flower",rarity:"Rare"},
        snapdragon:  {name:"Snapdragon",emoji:"🌺",type:"flower",rarity:"Uncommon"},
        sunflower:   {name:"Sunflower",emoji:"🌻",type:"flower",rarity:"Common"},
        daisy:       {name:"Daisy",emoji:"🌼",type:"flower",rarity:"Common"},
        lavender:    {name:"Lavender",emoji:"🪻",type:"flower",rarity:"Uncommon"},
        orchid:      {name:"Orchid",emoji:"🌸",type:"flower",rarity:"Rare"},
        peony:       {name:"Peony",emoji:"🌺",type:"flower",rarity:"Rare"},
        hydrangea:   {name:"Hydrangea",emoji:"🪻",type:"flower",rarity:"Uncommon"},
        carnation:   {name:"Carnation",emoji:"🌸",type:"flower",rarity:"Common"},
        daffodil:    {name:"Daffodil",emoji:"🌼",type:"flower",rarity:"Common"},
        iris:        {name:"Iris",emoji:"🪻",type:"flower",rarity:"Rare"},
        chrysanthemum:{name:"Chrysanthemum",emoji:"🌼",type:"flower",rarity:"Uncommon"},
        poppy:       {name:"Poppy",emoji:"🌺",type:"flower",rarity:"Common"},
        forgetMeNot: {name:"Forget-Me-Not",emoji:"💠",type:"flower",rarity:"Rare"},
        hibiscus:    {name:"Hibiscus",emoji:"🌺",type:"flower",rarity:"Uncommon"},
        mysteryBloom:{name:"Mystery Blossom",emoji:"🌸",type:"flower",rarity:"Secret"},
        moonflower:  {name:"Moonflower",emoji:"🌙",type:"flower",rarity:"Legendary"},
        starBloom:   {name:"Star Bloom",emoji:"✨",type:"flower",rarity:"Legendary"},
        gardenCrown: {name:"Garden Crown",emoji:"👑",type:"flower",rarity:"Legendary"},
        bananaTree:  {name:"Suspicious Banana Tree",emoji:"🍌",type:"tree",rarity:"Secret"},
        jacaranda:    {name:"Jacaranda Tree",emoji:"🌳",type:"tree",rarity:"Uncommon"},
        willow:       {name:"Willow Tree",emoji:"🌳",type:"tree",rarity:"Rare"},
        cherryTree:   {name:"Cherry Blossom Tree",emoji:"🌸",type:"tree",rarity:"Rare"},
        lemonTree:    {name:"Lemon Tree",emoji:"🍋",type:"tree",rarity:"Uncommon"}
    };

    const STANDARD_FLOWERS = [
        "tulip","redRose","pinkRose","whiteRose","lilyValley","cryingLily","snapdragon",
        "sunflower","daisy","lavender","orchid","peony","hydrangea","carnation",
        "daffodil","iris","chrysanthemum","poppy","forgetMeNot","hibiscus"
    ];

    const SEEDS = {
        tulipSeed:{name:"Tulip Seed",emoji:"🌷",plant:"tulip"},
        roseSeed:{name:"Rose Seed",emoji:"🌹",plant:"redRose"},
        lilySeed:{name:"Lily of the Valley Seed",emoji:"🤍",plant:"lilyValley"},
        cryingLilySeed:{name:"Crying Lily Seed",emoji:"🥀",plant:"cryingLily"},
        snapdragonSeed:{name:"Snapdragon Seed",emoji:"🌺",plant:"snapdragon"},
        sunflowerSeed:{name:"Sunflower Seed",emoji:"🌻",plant:"sunflower"},
        lavenderSeed:{name:"Lavender Seed",emoji:"🪻",plant:"lavender"},
        orchidSeed:{name:"Orchid Seed",emoji:"🌸",plant:"orchid"},
        mysterySeed:{name:"Mystery Seed",emoji:"❓",plant:"mysteryBloom"},
        moonSeed:{name:"Moonflower Seed",emoji:"🌙",plant:"moonflower"},
        mikaelSeed:{name:"UNKNOWN_SEED.exe",emoji:"❓",plant:"bananaTree",secret:true},
        jacarandaSeed:{name:"Jacaranda Sapling",emoji:"🌳",plant:"jacaranda"},
        willowSeed:{name:"Willow Sapling",emoji:"🌳",plant:"willow"},
        cherryTreeSeed:{name:"Cherry Blossom Sapling",emoji:"🌸",plant:"cherryTree"},
        lemonTreeSeed:{name:"Lemon Tree Sapling",emoji:"🍋",plant:"lemonTree"}
    };
    const COMMON_SEEDS = ["tulipSeed","roseSeed","snapdragonSeed","sunflowerSeed","lavenderSeed"];
    const GAME_SEEDS   = ["lilySeed","cryingLilySeed","orchidSeed","mysterySeed"];

    const WEATHER = [
        {id:"perfect",emoji:"🌤️",name:"Perfect Garden Day",desc:"Ideal conditions. Plants grow a little faster today.",decay:0.72,growth:1.25},
        {id:"sunny",emoji:"☀️",name:"Sunny",desc:"Normal growing weather. Keep an eye on thirsty plants.",decay:1.0,growth:1.0},
        {id:"rain",emoji:"🌧️",name:"Rain",desc:"Nature has volunteered for watering duty.",decay:0.2,growth:1.05,autoWater:true},
        {id:"heavyRain",emoji:"⛈️",name:"Heavy Rain",desc:"Everything is soaked. Fragile plants are a little dramatic about it.",decay:0.05,growth:0.9,autoWater:true,severe:true},
        {id:"heat",emoji:"🔥",name:"Heatwave",desc:"Plants are losing water faster. Check the Garden today.",decay:1.65,growth:0.85,severe:true},
        {id:"severeHeat",emoji:"🥵",name:"Severe Heat",desc:"Dangerously hot. Some plants may need extra attention.",decay:2.25,growth:0.65,severe:true},
        {id:"wind",emoji:"🌬️",name:"Strong Winds",desc:"Mature flowers may look stressed, but they'll recover.",decay:1.15,growth:0.8,severe:true},
        {id:"cold",emoji:"❄️",name:"Cold Snap",desc:"Growth slows today. Tulips are suspiciously pleased.",decay:0.7,growth:0.5,severe:true},
        {id:"mist",emoji:"🌫️",name:"Misty Morning",desc:"Cool and damp. Moisture lasts longer.",decay:0.55,growth:0.9},
        {id:"rainbow",emoji:"🌈",name:"Rainbow Weather",desc:"Rare LizzyOS conditions. Growth gets a magical boost.",decay:0.45,growth:1.55,rare:true}
    ];

    const MIKAEL_COMMENTS = {
        healthy:[
            "Look at that. Actual responsible plant ownership. I am shocked. — Mikael",
            "The plants are thriving. Please don't let this success go to your head.",
            "Garden status: healthy. Hater status: probably unchanged. 🙄"
        ],
        thirsty:[
            "Interesting gardening technique, Lizzy. Have you considered water?",
            "Your plant has submitted a formal hydration complaint.",
            "BREAKING NEWS: local woman remembers she owns a garden. Hopefully."
        ],
        wilting:[
            "This flower has seen more neglect than Mikael's good advice. 😭",
            "Your plant has requested new management.",
            "I was going to blame climate change, but unfortunately this one is on you."
        ],
        critical:[
            "OH NOW YOU REMEMBER HER?? 😭",
            "The plant would like it noted that this apology is being considered.",
            "LizzyOS Gardening Board has opened an investigation."
        ],
        banana:[
            "Of course the stupid banana tree is fine. 🍌 — Mikael",
            "Mikael Tree status: thriving purely out of spite.",
            "Somehow the banana tree has survived. Men really do have unnecessary confidence."
        ]
    };

    const UPGRADE_QUESTIONS = [
        {q:"Which phrase does Mikael say way too often?",options:["No ways","Oh wow / Oh My days","That's insane","You're joking"],correct:1},
        {q:"What is Mikael's guilty-pleasure artist?",options:["Ariana Grande","Tay Tay (Taylor Swift)","Billie Eilish","SZA"],correct:1},
        {q:"If Mikael could eat one meal for an entire week, what would he choose?",options:["Lasagne","Chicken Alfredo","Spaghetti Bolognaise","Mac & Cheese"],correct:2},
        {q:"What was the first sport Mikael played competitively?",options:["Basketball","Soccer","Cricket","Tennis"],correct:2},
        {q:"What is one thing Mikael always loses or forgets?",options:["His phone","His Windshields (glasses)","His wallet","His keys"],correct:1},
        {q:"What's the quickest way to annoy Mikael?",options:["Ignore him","Beat him at a game","Say Something Stupid","Call him dramatic"],correct:2},
        {q:"What is Mikael's exact dream car?",options:["Porsche 911 Turbo S","Porsche 911 GT3","Porsche 718 Cayman GT4 RS","Porsche Taycan Turbo GT"],correct:1},
        {q:"If Mikael had to waste the first R10,000 of R1 million, what would he buy?",options:["New sneakers","A new console","A new phone","A ridiculous dinner"],correct:1},
        {q:"What is something Mikael would never do, even for money?",options:["Join the Haters Club","Join the Letters Gang","Become a Swiftie publicly","Give up basketball"],correct:1},
        {q:"What is Mikael's favourite thing about Lizzy that isn't physical? 😏",options:["Her music taste","Her intelligence","Her personality 😏","Her professional hating"],correct:2}
    ];

    const TOKEN_DEFS = {
        "Hug Token":{emoji:"🫂",desc:"One proper Mikael hug."},
        "Argument Winner Pass":{emoji:"⚖️",desc:"Automatically win one harmless argument. Mikael\'s right to appeal: denied 😂."},
        "Argument Winner Pass":{emoji:"⚖️",desc:"Automatically win one harmless argument. Mikael's right to appeal: denied 😂."},
        "Mini Treat Token":{emoji:"☕",desc:"One small snack or drink."},
        "Coffee / Hot Chocolate Token":{emoji:"☕",desc:"One coffee or hot chocolate on Mikael."},
        "Snack Token":{emoji:"🍫",desc:"One snack of Lizzy's choice."},
        "Question Token":{emoji:"💬",desc:"One question Mikael has to answer properly."},
        "Second Chance Token":{emoji:"🪙",desc:"One future Daily Reward reroll."},
        "Activity Date Token":{emoji:"🎟️",desc:"Lizzy chooses an activity for the two of you."},
        "Food Date Token":{emoji:"🍝",desc:"Lizzy chooses where or what you eat."},
        "Mystery Gift Token":{emoji:"🎁",desc:"Mikael owes one small surprise."},
        "Dessert Run":{emoji:"🍦",desc:"Dessert or ice cream on Mikael."},
        "Movie Night Token":{emoji:"🎬",desc:"Lizzy chooses the movie. Mikael complaints prohibited."},
        "Princess Treatment Pass":{emoji:"👑",desc:"One reasonable small request with princess treatment."},
        "Rematch Token":{emoji:"🎳",desc:"Demand a rematch at an activity you've already done."},
        "Lazy Date Pass":{emoji:"💤",desc:"Choose one chilled activity/date."},
        "Golden Date Ticket":{emoji:"🎟️",desc:"Dinner plus an activity of Lizzy's choice."},
        "Mikael's Wild Card":{emoji:"🃏",desc:"One reasonable request saved for later."},
        "Real Flower Drop":{emoji:"💐",desc:"Mikael owes Lizzy real flowers."},
        "Legendary Mystery Gift":{emoji:"🎁",desc:"A bigger or special surprise from Mikael."},
        "Your Choice Voucher":{emoji:"💖",desc:"Choose one reasonable cute or fun thing to do together."},
        "Agent Yelizaveta VIP Pass":{emoji:"🏆",desc:"Choose the next date activity AND claim a proper hug."},
        "Ultimate Princess Day":{emoji:"👑",desc:"One full day of upgraded princess treatment."},
        "VIP Status — One Day":{emoji:"👑",desc:"Activates LizzyOS VIP Mode for exactly 24 hours from redemption."},
        "VIP Status - One Day":{emoji:"👑",desc:"Activates LizzyOS VIP Mode for exactly 24 hours from redemption."},
        "Mystery Rare Box":{emoji:"🎁",desc:"Choose Money, Secrets or Mikael — then LizzyOS reveals the mystery reward."},
        "Song Exchange":{emoji:"🎧",desc:"Mikael and Lizzy each send one song that reminds them of the other, with a short explanation why."},
        "Question Call":{emoji:"📞",desc:"A 10-minute call where Lizzy can ask Mikael questions and he answers honestly, with reasonable privacy vetoes."},
        "Voice Note Request":{emoji:"🎤",desc:"Lizzy may request one voice note from Mikael on a topic of her choice."},
        "Truth Card":{emoji:"🃏",desc:"Lizzy may ask Mikael one question and he has to answer truthfully, with reasonable privacy boundaries."}
    };

    function defaultGarden(){
        return {
            version:1,
            tier:1,
            slots:12,
            plants:[],
            seeds:{},
            flowers:{},
            selectedSeed:null,
            lastWeatherApplied:"",
            createdAt:nowISO()
        };
    }
    function defaultTokens(){
        return {version:1,inventory:{},history:[],rerollCredits:0};
    }

    let garden = Object.assign(defaultGarden(), safeRead(KEYS.garden, {}));
    garden.seeds = garden.seeds || {};
    garden.flowers = garden.flowers || {};
    garden.plants = Array.isArray(garden.plants) ? garden.plants : [];
    let tokens = Object.assign(defaultTokens(), safeRead(KEYS.tokens, {}));
    tokens.inventory = tokens.inventory || {};
    tokens.history = Array.isArray(tokens.history) ? tokens.history : [];
    let redeeming = null;
    let upgradeSession = null;

    function saveGarden(){ safeWrite(KEYS.garden, garden); }
    function saveTokens(){ safeWrite(KEYS.tokens, tokens); }

    // One-time migration. NEVER changes the old Daily Mystery keys.
    function migrateOnce(){
        if(localStorage.getItem(KEYS.migration)) return;

        // The user confirmed these two rewards are already owned.
        tokens.inventory["Hug Token"] = Math.max(1, Number(tokens.inventory["Hug Token"]||0));
        tokens.inventory["Activity Date Token"] = Math.max(1, Number(tokens.inventory["Activity Date Token"]||0));

        // Give the Garden a small starter pack, without affecting any previous reward.
        garden.seeds.tulipSeed = Math.max(1, Number(garden.seeds.tulipSeed||0));
        garden.seeds.roseSeed = Math.max(1, Number(garden.seeds.roseSeed||0));
        garden.seeds.jacarandaSeed = Math.max(1, Number(garden.seeds.jacarandaSeed||0));

        saveGarden(); saveTokens();
        localStorage.setItem(KEYS.migration, "done");
    }
    migrateOnce();

    // V4.8.1 test/restoration migration:
    // Lizzy already earned VIP Status, and Mikael requested one Mystery Rare Box for testing.
    const VIP_RAREBOX_TEST_MIGRATION="lizzyVipRareBoxTokenJarMigrationV1";
    if(!localStorage.getItem(VIP_RAREBOX_TEST_MIGRATION)){
        tokens.inventory["VIP Status — One Day"]=Math.max(1,Number(tokens.inventory["VIP Status — One Day"]||0));
        tokens.inventory["Mystery Rare Box"]=Math.max(1,Number(tokens.inventory["Mystery Rare Box"]||0));
        saveTokens();
        localStorage.setItem(VIP_RAREBOX_TEST_MIGRATION,"done");
    }


    // One-time Argument Winner Pass migration for existing Token Jars.
    // Separate key means users whose original migration already ran still receive it.
    if(!localStorage.getItem("lizzyArgumentTokenMigrationV1")){
        tokens.inventory["Argument Winner Pass"] =
            Math.max(1, Number(tokens.inventory["Argument Winner Pass"] || 0));
        saveTokens();
        localStorage.setItem("lizzyArgumentTokenMigrationV1","done");
    }


    function hash(text){
        let h=2166136261;
        for(const ch of text){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}
        return h>>>0;
    }
    function weatherFor(date){
        const k=dayKey(date);
        const roll=hash(k+"-garden-weather")%100;
        // Rare rainbow is genuinely rare.
        let pool;
        if(roll<3) pool=WEATHER.find(w=>w.id==="rainbow");
        else if(roll<14) pool=WEATHER.find(w=>w.id==="rain");
        else if(roll<20) pool=WEATHER.find(w=>w.id==="heavyRain");
        else if(roll<31) pool=WEATHER.find(w=>w.id==="heat");
        else if(roll<36) pool=WEATHER.find(w=>w.id==="severeHeat");
        else if(roll<45) pool=WEATHER.find(w=>w.id==="wind");
        else if(roll<53) pool=WEATHER.find(w=>w.id==="cold");
        else if(roll<63) pool=WEATHER.find(w=>w.id==="mist");
        else if(roll<78) pool=WEATHER.find(w=>w.id==="perfect");
        else pool=WEATHER.find(w=>w.id==="sunny");
        return pool;
    }
    function forecast(days=3){
        return Array.from({length:days},(_,i)=>{
            const d=new Date(); d.setDate(d.getDate()+i);
            return {date:d,weather:weatherFor(d)};
        });
    }

    function plantWeatherMultiplier(plant,w){
        let mult=w.decay;
        const matureShadeTrees=garden.plants.filter(p=>["jacaranda","willow","cherryTree","lemonTree","bananaTree"].includes(p.flowerId) && growthStage(p)>=3).length;
        if(matureShadeTrees>0 && ["heat","severeHeat","sunny"].includes(w.id)){
            mult*=Math.max(.55,1-(matureShadeTrees*.08));
        }
        const id=plant.flowerId;
        if(id==="tulip" && w.id==="cold") mult*=0.55;
        if(id==="lilyValley" && ["rain","mist","heavyRain"].includes(w.id)) mult*=0.58;
        if(id==="sunflower" && ["heat","sunny"].includes(w.id)) mult*=0.82;
        if(id==="bananaTree" && ["heat","severeHeat","rain"].includes(w.id)) mult*=0.45;
        return mult;
    }

    function hoursSince(iso){
        return Math.max(0,(Date.now()-new Date(iso).getTime())/3600000);
    }
    function currentHealth(plant){
        const w=weatherFor(new Date());
        const h=hoursSince(plant.lastWatered);
        // 100 health, roughly 1.5 points/hour at ordinary conditions.
        const loss=h*1.5*plantWeatherMultiplier(plant,w);
        return Math.max(0,Math.round(100-loss));
    }
    function plantState(health){
        if(health>=70)return "healthy";
        if(health>=45)return "thirsty";
        if(health>=20)return "wilting";
        return "critical";
    }
    function growthStage(plant){
        const watered = Number(plant.waterCount||0);
        if(watered>=6)return 4;
        if(watered>=4)return 3;
        if(watered>=2)return 2;
        if(watered>=1)return 1;
        return 0;
    }
    function stageVisual(plant){
        const f=FLOWERS[plant.flowerId]||FLOWERS.tulip;
        const stage=growthStage(plant);
        if(plant.flowerId==="bananaTree") return ["🫘","🌱","🌿","🌴","🍌"][stage];
        if(["jacaranda","willow","cherryTree","lemonTree"].includes(plant.flowerId))
            return ["🫘","🌱","🌿","🌳",f.emoji][stage];
        return ["🫘","🌱","🌿","🪴",f.emoji][stage];
    }

    function randomFrom(arr, salt=""){
        return arr[hash(dayKey()+salt+Math.random())%arr.length];
    }
    function addSeed(seedId,count=1,reason=""){
        if(!SEEDS[seedId]) return;
        garden.seeds[seedId]=(garden.seeds[seedId]||0)+count;
        saveGarden();
        gardenComment(`🌱 ${SEEDS[seedId].name} added${reason?` — ${reason}`:""}.`);
        renderGarden();
    }
    function addFlower(flowerId,count=1,reason=""){
        if(!FLOWERS[flowerId]) return;
        garden.flowers[flowerId]=(garden.flowers[flowerId]||0)+count;
        saveGarden();
        gardenComment(`${FLOWERS[flowerId].emoji} ${FLOWERS[flowerId].name} added to the collection${reason?` — ${reason}`:""}.`);
        renderGarden();
    }
    function randomStandardFlower(){
        return STANDARD_FLOWERS[hash(Date.now()+"flower"+Math.random())%STANDARD_FLOWERS.length];
    }
    function randomSeed(){
        return COMMON_SEEDS[hash(Date.now()+"seed"+Math.random())%COMMON_SEEDS.length];
    }

    function gardenComment(text){
        const el=$("gardenMikaelComment");
        if(el)el.textContent=text;
    }

    function applyDailyWeather(){
        const today=dayKey();
        if(garden.lastWeatherApplied===today) return;
        const w=weatherFor(new Date());
        if(w.autoWater && garden.plants.length){
            garden.plants.forEach(p=>{
                p.lastWatered=nowISO();
                p.waterCount=(p.waterCount||0)+1;
            });
        }
        garden.lastWeatherApplied=today;
        saveGarden();
    }

    function renderWeather(){
        const w=weatherFor(new Date());
        $("gardenWeatherEmoji").textContent=w.emoji;
        $("gardenWeatherName").textContent=w.name;
        const shadeTrees=garden.plants.filter(p=>["jacaranda","willow","cherryTree","lemonTree","bananaTree"].includes(p.flowerId) && growthStage(p)>=3).length;
        $("gardenWeatherDescription").textContent=w.desc+(shadeTrees?` 🌳 ${shadeTrees} mature shade tree${shadeTrees===1?"":"s"} protecting the Garden.`:"");
        const alert=$("gardenWeatherAlert");
        if(w.severe){
            alert.classList.remove("hidden");
            alert.textContent =
                w.id==="severeHeat" ? "🚨 SEVERE HEAT: plants are drying out much faster today. Check them again later."
                : w.id==="heat" ? "🔥 HEATWAVE WARNING: thirsty plants need attention sooner than normal."
                : w.id==="heavyRain" ? "⛈️ HEAVY RAIN: LizzyOS has watered everything automatically."
                : w.id==="wind" ? "🌬️ STRONG WINDS: mature plants may look stressed today."
                : "❄️ COLD SNAP: growth is temporarily slower.";
        }else{
            alert.classList.add("hidden");
        }
        const names=["TODAY","TOMORROW","DAY 3"];
        $("gardenForecast").innerHTML=forecast(3).map((x,i)=>`
            <div class="forecastDay">
                <small>${names[i]}</small>
                <span>${x.weather.emoji}</span>
                <b>${x.weather.name}</b>
            </div>`).join("");
    }

    function renderSeeds(){
        const host=$("gardenSeedInventory");
        const entries=Object.entries(garden.seeds).filter(([,n])=>n>0);
        if(!entries.length){
            host.innerHTML=`<div class="memoryMessage">No seeds yet. Perfect game scores and Daily Rewards can earn them. 🌱</div>`;
            return;
        }
        host.innerHTML=entries.map(([id,n])=>{
            const s=SEEDS[id];
            return `<button class="seedChip ${garden.selectedSeed===id?"selected":""}" data-seed="${id}">
                <b>${s.emoji} ${s.secret?"Unknown Seed":s.name} ×${n}</b>
                <small>${s.secret?"Origin: Classified":"Tap, then choose an empty plot."}</small>
            </button>`;
        }).join("");
        host.querySelectorAll("[data-seed]").forEach(b=>b.onclick=()=>{
            garden.selectedSeed=b.dataset.seed;
            saveGarden();renderSeeds();
            gardenComment(`Selected ${SEEDS[b.dataset.seed].secret?"UNKNOWN_SEED.exe":SEEDS[b.dataset.seed].name}. Now choose an empty plot.`);
        });
    }

    function renderPlots(){
        const host=$("gardenPlots");
        const slots=garden.tier===3 ? Math.max(24,garden.plants.length+8) : garden.slots;
        $("gardenPlotCount").textContent=slots;
        let healthy=0,needs=0;
        garden.plants.forEach(p=>{
            const state=plantState(currentHealth(p));
            if(state==="healthy")healthy++; else needs++;
        });
        $("gardenHealthyCount").textContent=healthy;
        $("gardenThirstyCount").textContent=needs;
        $("gardenSeedCount").textContent=Object.values(garden.seeds).reduce((a,b)=>a+b,0);
        $("gardenTierName").textContent=garden.tier===3?"Infinite Garden ♾️":garden.tier===2?"Expanded Garden 🌸":"Lizzy's Garden 🌷";
        $("gardenPlotHeading").textContent=garden.tier===3?"Infinite space. Mikael regrets giving you this much power.":"Tap an empty plot after selecting a seed.";

        const bySlot=new Map(garden.plants.map(p=>[p.slot,p]));
        const cards=[];
        for(let slot=0;slot<slots;slot++){
            const p=bySlot.get(slot);
            if(!p){
                cards.push(`<div class="gardenPlot empty" data-empty-slot="${slot}">
                    <div class="emptySoil">🟫</div>
                    <strong>Empty Plot</strong>
                    <small>${garden.selectedSeed?"Plant selected seed 🌱":"Select a seed first"}</small>
                </div>`);
                continue;
            }
            const health=currentHealth(p),state=plantState(health),f=FLOWERS[p.flowerId];
            cards.push(`<div class="gardenPlot ${f.type==="tree"?"gardenTreePlot":""}" data-plant="${p.id}">
                <div class="plantVisual ${state}">${stageVisual(p)}</div>
                <div class="plantMeta">
                    <strong>${p.flowerId==="bananaTree"&&growthStage(p)<4?"UNKNOWN PLANT":f.name}</strong>
                    <small>${["Seed","Sprout","Growing","Budding","Blooming"][growthStage(p)]} · ${state.toUpperCase()}</small>
                    <div class="plantHealthBar"><div class="plantHealthFill" style="width:${health}%"></div></div>
                    <small>💧 Last watered: ${new Date(p.lastWatered).toLocaleString()}</small>
                    <div class="plantActions">
                        <button data-water="${p.id}">💧 Water</button>
                        <button data-boost="${p.id}">✨ Check</button>
                    </div>
                </div>
            </div>`);
        }
        host.innerHTML=cards.join("");

        host.querySelectorAll("[data-empty-slot]").forEach(el=>el.onclick=()=>plantSelectedSeed(Number(el.dataset.emptySlot)));
        host.querySelectorAll("[data-water]").forEach(b=>b.onclick=e=>{e.stopPropagation();waterPlant(b.dataset.water)});
        host.querySelectorAll("[data-boost]").forEach(b=>b.onclick=e=>{e.stopPropagation();inspectPlant(b.dataset.boost)});
    }

    function renderCollection(){
        const host=$("gardenFlowerCollection");
        const entries=Object.entries(garden.flowers).filter(([,n])=>n>0);
        host.innerHTML=entries.length?entries.map(([id,n])=>`
            <div class="flowerCollectionChip">
                <b>${FLOWERS[id].emoji} ${FLOWERS[id].name} ×${n}</b>
                <small>${FLOWERS[id].rarity}</small>
            </div>`).join(""):`<div class="memoryMessage">Your collection will grow as flowers bloom and rewards drop. 🌷</div>`;
    }

    function renderGarden(){
        applyDailyWeather();
        renderWeather();renderSeeds();renderPlots();renderCollection();
    }

    function plantSelectedSeed(slot){
        const seedId=garden.selectedSeed;
        if(!seedId || !(garden.seeds[seedId]>0)){
            gardenComment("Pick a seed first, Garden Boss. 🌱");
            return;
        }
        const seed=SEEDS[seedId];
        garden.seeds[seedId]--;
        garden.plants.push({
            id:`plant_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
            slot,
            seedId,
            flowerId:seed.plant,
            plantedAt:nowISO(),
            lastWatered:nowISO(),
            waterCount:0,
            bonusGrowth:0
        });
        garden.selectedSeed=null;
        saveGarden();
        window.dispatchEvent(new CustomEvent("lizzyJobProof",{detail:{type:"seed_planted",seedId}}));
        gardenComment(seedId==="mikaelSeed"
            ?"❓ UNKNOWN_SEED.exe planted. LizzyOS accepts no responsibility for whatever this becomes."
            :`🌱 ${seed.name} planted. Don't forget the water.`);
        renderGarden();
    }

    function waterPlant(id){
        const p=garden.plants.find(x=>x.id===id); if(!p)return;
        const before=growthStage(p);
        p.lastWatered=nowISO();
        p.waterCount=(p.waterCount||0)+1;
        const after=growthStage(p);
        if(after===4 && before<4){
            addFlower(p.flowerId,1,"Fully grown in the Garden");
        }
        saveGarden();
        window.dispatchEvent(new CustomEvent("lizzyJobProof",{detail:{type:"plant_watered",plantId:id}}));
        const card=document.querySelector(`[data-plant="${id}"] .plantVisual`);
        card?.classList.add("waterSplash");setTimeout(()=>card?.classList.remove("waterSplash"),700);
        gardenComment(p.flowerId==="bananaTree"
            ? randomFrom(MIKAEL_COMMENTS.banana)
            : "💧 Water delivered. The plant has decided not to file a complaint today.");
        renderGarden();
    }

    function inspectPlant(id){
        const p=garden.plants.find(x=>x.id===id);if(!p)return;
        const state=plantState(currentHealth(p));
        const pool=p.flowerId==="bananaTree"?MIKAEL_COMMENTS.banana:MIKAEL_COMMENTS[state];
        gardenComment(randomFrom(pool,id));
    }

    function waterAll(){
        if(!garden.plants.length){gardenComment("Water what, exactly? The empty soil? 😭");return}
        garden.plants.forEach(p=>{p.lastWatered=nowISO();p.waterCount=(p.waterCount||0)+1});
        saveGarden();gardenComment("💦 Everybody watered. Mikael has temporarily withdrawn the plant-neglect allegations.");renderGarden();
    }

    // Garden Boost reward.
    function gardenBoost(){
        if(!garden.plants.length){addSeed(randomSeed(),1,"Garden Boost converted to a seed because the Garden was empty");return}
        const p=garden.plants[hash(Date.now()+"boost")%garden.plants.length];
        p.lastWatered=nowISO();
        p.waterCount=(p.waterCount||0)+2;
        saveGarden();gardenComment(`✨ Garden Boost applied to ${FLOWERS[p.flowerId].name}.`);renderGarden();
    }

    // ---------------------------------------------
    // Upgrade security
    // Tier 1 -> 2: 3/3. Tier 2 -> 3: 5/5.
    // ---------------------------------------------
    function normalizeAnswer(v){
        return String(v||"").toLowerCase().trim()
            .replace(/[’']/g,"").replace(/[^a-z0-9\s]/g,"").replace(/\s+/g," ");
    }
    function shuffledQuestions(count){
        const arr=[...UPGRADE_QUESTIONS];
        for(let i=arr.length-1;i>0;i--){
            const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];
        }
        return arr.slice(0,count);
    }
    function openUpgrade(){
        if(garden.tier>=3){
            gardenComment("♾️ Your Garden is already infinite. There is literally nowhere else to go.");
            return;
        }
        const needed=garden.tier===1?3:5;
        upgradeSession={questions:shuffledQuestions(needed),index:0,correct:0,targetTier:garden.tier+1};
        $("gardenUpgradeWindow").classList.remove("hidden");
        $("gardenUpgradeComplete").classList.add("hidden");
        $("gardenUpgradeQuiz").classList.remove("hidden");
        $("gardenUpgradeTitle").textContent=garden.tier===1?"🌸 Expanded Garden Security Check":"♾️ Infinite Garden Final Clearance";
        $("gardenUpgradeIntro").textContent=garden.tier===1
            ?"Answer all 3 difficult Mikael questions correctly to DOUBLE your Garden."
            :"Final boss: answer all 5 correctly. One mistake means the Infinite Garden stays locked.";
        renderUpgradeQuestion();
    }
    function renderUpgradeQuestion(){
        if(!upgradeSession)return;
        const n=upgradeSession.questions.length,i=upgradeSession.index,q=upgradeSession.questions[i];
        $("gardenUpgradeProgress").innerHTML=Array.from({length:n},(_,x)=>`<span class="${x<i?"done":""}">${x+1}</span>`).join("");
        $("gardenUpgradeQuestion").textContent=q.q;
        const answer=$("gardenUpgradeAnswer");
        answer.style.display="none";
        let choices=$("gardenUpgradeChoices");
        if(!choices){
            choices=document.createElement("div");choices.id="gardenUpgradeChoices";choices.className="gardenUpgradeChoices";
            answer.parentNode.insertBefore(choices,answer);
        }
        choices.innerHTML=q.options.map((opt,oi)=>`<label class="gardenUpgradeChoice"><input type="radio" name="gardenUpgradeMC" value="${oi}"><span><b>${String.fromCharCode(65+oi)}.</b> ${opt}</span></label>`).join("");
        $("gardenUpgradeFeedback").textContent="";
    }
    function submitUpgradeAnswer(){
        if(!upgradeSession)return;
        const q=upgradeSession.questions[upgradeSession.index];
        const selected=document.querySelector('input[name="gardenUpgradeMC"]:checked');
        if(!selected){
            $("gardenUpgradeFeedback").textContent="Pick an answer first, Agent 😏";
            return;
        }
        const ok=Number(selected.value)===q.correct;
        if(!ok){
            $("gardenUpgradeFeedback").textContent="❌ GARDEN EXPANSION DENIED. That answer was believable... but wrong 😂";
            upgradeSession=null;
            return;
        }
        upgradeSession.correct++;
        upgradeSession.index++;
        if(upgradeSession.index<upgradeSession.questions.length){
            $("gardenUpgradeFeedback").textContent="✅ Suspiciously correct...";
            setTimeout(renderUpgradeQuestion,550);
            return;
        }
        garden.tier=upgradeSession.targetTier;
        if(garden.tier===2)garden.slots=24;
        if(garden.tier===3)garden.slots=999999;
        saveGarden();
        $("gardenUpgradeQuiz").classList.add("hidden");
        $("gardenUpgradeComplete").classList.remove("hidden");
        $("gardenUpgradeCompleteText").textContent=garden.tier===2
            ?"Expanded Garden unlocked — 24 planting spaces. You actually know the developer. 🌸"
            :"INFINITE GARDEN UNLOCKED ♾️🌷 Okay... that's actually concerning. You know way too much about Mikael.";
        upgradeSession=null;renderGarden();
    }

    // ---------------------------------------------
    // Token Jar
    // ---------------------------------------------
    function addToken(name,count=1){
        if(!TOKEN_DEFS[name])return;
        tokens.inventory[name]=(tokens.inventory[name]||0)+count;
        saveTokens();renderTokens();
    }
    function renderTokens(){
        const host=$("tokenJarList");
        const entries=Object.entries(tokens.inventory).filter(([name,n])=>n>0&&TOKEN_DEFS[name]);
        host.innerHTML=entries.length?entries.map(([name,n])=>{
            const d=TOKEN_DEFS[name];
            return `<div class="tokenCard">
                <div class="tokenCardEmoji">${d.emoji}</div>
                <div><strong>${name}</strong><p>${d.desc}</p></div>
                <div class="tokenCount">×${n}</div>
                <button data-redeem-token="${encodeURIComponent(name)}">Redeem ${d.emoji}</button>
            </div>`;
        }).join(""):`<div class="memoryMessage">The Jar is empty. Daily Rewards can fix that. 🫙</div>`;
        host.querySelectorAll("[data-redeem-token]").forEach(b=>b.onclick=()=>openRedeem(decodeURIComponent(b.dataset.redeemToken)));

        const hist=$("tokenRedeemHistory");
        hist.innerHTML=tokens.history.length?tokens.history.slice(0,20).map(x=>`
            <div class="tokenHistoryItem"><b>${x.emoji} ${x.name}</b><small>${new Date(x.redeemedAt).toLocaleString()} · ${x.notifyStatus}</small></div>
        `).join(""):`<div class="memoryMessage">Nothing redeemed yet.</div>`;
    }
    function openRedeem(name){
        if(!TOKEN_DEFS[name] || !(tokens.inventory[name]>0))return;
        redeeming=name;
        const d=TOKEN_DEFS[name];
        $("tokenRedeemEmoji").textContent=d.emoji;
        $("tokenRedeemName").textContent=name;
        $("tokenRedeemDescription").textContent=d.desc;
        $("tokenRedeemStatus").textContent="";
        const confirmBtn=$("confirmTokenRedeem");
        const cancelBtn=$("cancelTokenRedeem");
        if(confirmBtn){
            confirmBtn.disabled=false;
            confirmBtn.textContent=confirmBtn.dataset.originalText||confirmBtn.textContent||"Redeem";
        }
        if(cancelBtn)cancelBtn.disabled=false;
        $("tokenRedeemWindow").classList.remove("hidden");
    }
    async function notifyRedemption(payload){
        const isArgument = payload.token === "Argument Winner Pass";
        const type = isArgument ? "⚖️ ARGUMENT TOKEN REDEEMED" : "🎟️ TOKEN REDEEMED";
        const title = `${payload.emoji||"🎟️"} ${payload.token||"Unknown Token"}`;
        const details =
`Reward: ${payload.token||"Unknown Token"}
What it means: ${payload.description||"No description available."}
Redeemed: ${payload.redeemed_at||new Date().toLocaleString()}
Status: REDEEMED${isArgument?"\n\nMikael's right to appeal: DENIED 😂":""}`;
        const ok = await lizzyTelegramNotify(type,title,details);
        if(!ok){
            const q=safeRead(KEYS.pendingNotify,[]);
            q.push(payload);safeWrite(KEYS.pendingNotify,q);
        }
        return ok ? "Telegram sent" : "Recorded";
    }
    async function confirmRedeem(){
        if(!redeeming || !(tokens.inventory[redeeming]>0))return;
        const name=redeeming,d=TOKEN_DEFS[name];
        const confirmBtn=$("confirmTokenRedeem"), cancelBtn=$("cancelTokenRedeem");

        if(confirmBtn){
            confirmBtn.disabled=true;
            confirmBtn.dataset.originalText=confirmBtn.dataset.originalText||confirmBtn.textContent;
            confirmBtn.textContent="Redeeming…";
        }
        if(cancelBtn)cancelBtn.disabled=true;

        // Consume exactly one token.
        tokens.inventory[name]=Math.max(0,Number(tokens.inventory[name]||0)-1);
        if(name==="Second Chance Token")tokens.rerollCredits=(tokens.rerollCredits||0)+1;

        const payload={
            token:name,
            emoji:d.emoji,
            description:d.desc,
            redeemed_at:new Date().toLocaleString(),
            redeemed_at_iso:nowISO()
        };
        const entry={
            name,
            emoji:d.emoji,
            redeemedAt:payload.redeemed_at_iso,
            notifyStatus:"Sending..."
        };

        tokens.history.unshift(entry);
        saveTokens();
        renderTokens();

        // Close the standard confirmation UI before any special feature opens.
        $("tokenRedeemStatus").textContent=`✅ ${name} redeemed. Opening reward…`;
        await new Promise(r=>setTimeout(r,160));
        $("tokenRedeemWindow")?.classList.add("hidden");
        redeeming=null;

        if(confirmBtn){
            confirmBtn.disabled=false;
            confirmBtn.textContent=confirmBtn.dataset.originalText||"Redeem";
        }
        if(cancelBtn)cancelBtn.disabled=false;

        // SPECIAL REWARDS MUST FIRE LOCALLY AND IMMEDIATELY.
        if(name==="VIP Status — One Day" || name==="VIP Status - One Day"){
            // SELF-CONTAINED VIP ACTIVATION. This intentionally does not depend on
            // any later script block, so a separate runtime error cannot swallow VIP mode.
            const now=Date.now();
            const vipState={startedAt:now,expiresAt:now+86400000,peeks:2,reroll:1,override:1,discount:1,allowanceBonus:3,mysteryBoost:true,arcadeBonusCap:5,arcadeBonusEarned:0,complaints:0,messages:0};
            localStorage.setItem("lizzyVipStateV1",JSON.stringify(vipState));
            let hist=[];try{hist=JSON.parse(localStorage.getItem("lizzyVipHistoryV1")||"[]")}catch(e){}
            hist.unshift({startedAt:now,expiresAt:vipState.expiresAt});
            localStorage.setItem("lizzyVipHistoryV1",JSON.stringify(hist.slice(0,50)));

            setTimeout(()=>{
                const welcome=document.getElementById("vipWelcome");
                const badge=document.getElementById("vipBadge");
                const clock=document.getElementById("vipClock");
                if(welcome){welcome.classList.remove("hidden");welcome.style.display="grid";welcome.style.zIndex="2147483647";}
                if(badge){badge.classList.remove("hidden");badge.style.display="block";badge.style.zIndex="2147483646";}
                if(clock)clock.textContent="24h 00m";
                document.body.classList.add("vipModeActive");

                // Confetti generated here as well, independent of the VIP module.
                const bits=["👑","✨","💜","💎","⭐"];
                for(let i=0;i<100;i++){
                    const c=document.createElement("span");c.className="vipConfetti";c.textContent=bits[i%bits.length];
                    c.style.left=(Math.random()*100)+"vw";c.style.animationDelay=(Math.random()*.8)+"s";
                    document.body.appendChild(c);setTimeout(()=>c.remove(),4200);
                }
                try{window.LizzyVIP?.render?.()}catch(e){}
                window.dispatchEvent(new CustomEvent("lizzyVipRedeemed",{detail:{expiresAt:vipState.expiresAt}}));
            },80);
        }

        if(name==="Mystery Rare Box"){
            // Keep the box available for its chooser flow.
            localStorage.setItem("lizzyMysteryRareBoxesV1","1");
            setTimeout(()=>{
                if(typeof window.openMysteryRareBox==="function"){
                    window.openMysteryRareBox();
                }else{
                    console.error("Mystery Rare Box opener is missing.");
                }
            },120);
        }

        // Telegram is background-only and can NEVER block the reward feature.
        Promise.resolve()
            .then(()=>notifyRedemption(payload))
            .then(status=>{
                entry.notifyStatus=status||"Telegram sent";
                saveTokens();
                renderTokens();
            })
            .catch(()=>{
                entry.notifyStatus="Notification failed";
                saveTokens();
                renderTokens();
            });
    }


    // V4.8.2 clean test reset for the two special rewards.
    // Removes their old redeemed-history entries and restores each token to inventory ×1.
    const SPECIAL_TOKEN_REINSTATE_MIGRATION="lizzySpecialTokenReinstateV483_FINAL";
    if(!localStorage.getItem(SPECIAL_TOKEN_REINSTATE_MIGRATION)){
        tokens.history = (tokens.history||[]).filter(x=>{
            const n=String(x?.name||"");
            return !/VIP Status\s*[—-]\s*One Day/i.test(n) && !/Mystery Rare Box/i.test(n);
        });
        tokens.inventory["VIP Status — One Day"]=1;
        tokens.inventory["Mystery Rare Box"]=1;
        saveTokens();
        renderTokens();
        localStorage.setItem(SPECIAL_TOKEN_REINSTATE_MIGRATION,"done");
    }

    // ---------------------------------------------
    // Reward integration
    // ---------------------------------------------
    const compliments=[
        "LizzyOS diagnostic: somehow you're still ridiculously pretty. No patch available.",
        "You have the annoying habit of making ordinary things feel memorable. 💗",
        "Certified smart, funny and very easy to make a whole operating system about.",
        "Your personality 😏 remains one of Mikael's favourite things about you.",
        "System scan: kindness levels unusually high. Hater allegations remain under investigation."
    ];
    const jokes=[
        "Today's challenge: say something nice about Mikael. Difficulty: Legendary.",
        "LizzyOS detected unnecessary negativity. It was just Lizzy being Lizzy. 🙄",
        "Mikael said 'hear me out.' The Garden immediately entered emergency mode.",
        "Mikael's defence: 'I was joking.' LizzyOS court finds him guilty.",
        "Professional Hater Lizzy vs Professional Menace Mikael — still the main event."
    ];
    const hints=[
        "Some secrets react to things you TYPE rather than click.",
        "The Recycle Bin has always looked a little suspicious.",
        "Not every Easter egg appears during normal daytime hours.",
        "Sometimes clicking something more than once is the entire point.",
        "A mysterious seed may be hiding behind unusually good game performance."
    ];

    function processReward(r){
        if(!Array.isArray(r))return;
        const [,icon,name,,meta={}] = r;

        // V4 metadata rewards: use existing Garden/Token systems and same Micky Bucs wallet.
        if(meta.mb){
            const current=Number(safeRead("lizzyMickyBucsV1",0))||0;
            safeWrite("lizzyMickyBucsV1",current+Number(meta.mb||0));
            window.dispatchEvent(new Event("lizzyStoreRefresh"));
        }
        if(meta.seed==="random")addSeed(randomSeed(),1,"Daily Reward");
        if(meta.flower==="random")addFlower(randomStandardFlower(),1,"Daily Reward");
        if(Number(meta.flowers||0)>0)for(let i=0;i<Number(meta.flowers);i++)addFlower(randomStandardFlower(),1,"Daily Reward");
        if(meta.gardenBoost)gardenBoost();
        if(meta.gardenCrown)addFlower("gardenCrown",1,"LEGENDARY Garden Crown");
        if(meta.token){
            const qty=Math.max(1,Number(meta.count||1));
            for(let i=0;i<qty;i++)addToken(meta.token,1);
        }

        // Garden rewards
        if(name==="Random Flower" || name==="Digital Flower"){addFlower(randomStandardFlower(),1,"Daily Reward");}
        else if(name==="Random Plant Seed"){addSeed(randomSeed(),1,"Daily Reward");}
        else if(name==="Garden Boost"){gardenBoost();}
        else if(name==="Rare Flower Pack"){
            ["lilyValley","cryingLily","orchid"].forEach(id=>addFlower(id,1,"Rare Flower Pack"));
        }
        else if(name==="Garden Jackpot"){
            for(let i=0;i<5;i++)addFlower(randomStandardFlower(),1,"Garden Jackpot");
        }
        else if(name==="Garden Crown"){addFlower("gardenCrown",1,"LEGENDARY Garden Crown");}
        else if(name==="Garden of Lizzy"){STANDARD_FLOWERS.forEach(id=>addFlower(id,1,"Garden of Lizzy"));}

        // Tokens
        if(TOKEN_DEFS[name])addToken(name,1);

        // Lightweight immediate rewards
        if(name==="Pocket Compliment")alert("💌 "+randomFrom(compliments,"compliment"));
        if(name==="Cheeky Joke")alert("😂 "+randomFrom(jokes,"joke"));
        if(name==="Easter Egg Hint")alert("🕵️ "+randomFrom(hints,"hint"));

        // Secret Mikael Seed: tiny chance when Random Plant Seed drops.
        if(name==="Random Plant Seed" && hash(dayKey()+"mikael-secret")%23===0){
            addSeed("mikaelSeed",1,"CLASSIFIED");
        }
    }
    window.addEventListener("lizzyDailyRewardClaimed",e=>processReward(e.detail?.reward));
    window.addEventListener("lizzyRareBoxInteractionWon",e=>{
        const name=e.detail?.name;
        if(name && TOKEN_DEFS[name]) addToken(name,1);
    });


    // Migrate today's currently saved reward ONCE so this update doesn't
    // erase or ignore a reward already claimed before deployment.
    const CURRENT_REWARD_MIGRATION="lizzyCurrentRewardGardenMigrationV1";
    if(!localStorage.getItem(CURRENT_REWARD_MIGRATION)){
        try{
            const r=JSON.parse(localStorage.getItem("lizzyMysteryReward")||"null");
            const opened=localStorage.getItem("lizzyMysteryOpened");
            if(r && opened) processReward(r);
        }catch(e){}
        localStorage.setItem(CURRENT_REWARD_MIGRATION,"done");
    }

    // Perfect game -> one seed per game per calendar day.
    window.addEventListener("lizzyPerfectGame",e=>{
        const detail=e.detail||{},earned=safeRead(KEYS.gameSeeds,{});
        const k=`${dayKey()}_${detail.key||detail.game}`;
        if(earned[k])return;
        earned[k]=true;safeWrite(KEYS.gameSeeds,earned);
        let seed=GAME_SEEDS[hash(k+"seed")%GAME_SEEDS.length];

        // Very secret Mikael seed chance. The UI never advertises this.
        if(hash(k+"mikael")%31===0)seed="mikaelSeed";

        addSeed(seed,1,`Perfect performance in ${detail.game}`);
        if(typeof confetti==="function")confetti({particleCount:90,spread:85,origin:{y:.72}});
        alert(`🌱 PERFECT GAME REWARD!\n\n${SEEDS[seed].secret?"A mysterious seed":SEEDS[seed].name} has been added to Lizzy's Garden.`);
    });

    // ---------------------------------------------
    // UI wiring
    // ---------------------------------------------
    function openGarden(){
        $("lizzyGardenWindow").classList.remove("hidden");
        renderGarden();
        const stateCounts=garden.plants.reduce((a,p)=>{
            const s=plantState(currentHealth(p));a[s]=(a[s]||0)+1;return a;
        },{});
        const worst=stateCounts.critical?"critical":stateCounts.wilting?"wilting":stateCounts.thirsty?"thirsty":"healthy";
        gardenComment(garden.plants.some(p=>p.flowerId==="bananaTree")
            ? randomFrom(MIKAEL_COMMENTS.banana)
            : randomFrom(MIKAEL_COMMENTS[worst]));
    }
    function closeGarden(){$("lizzyGardenWindow").classList.add("hidden")}
    function openTokens(){$("tokenJarWindow").classList.remove("hidden");renderTokens()}
    function closeTokens(){$("tokenJarWindow").classList.add("hidden")}

    $("lizzyGardenIcon")?.addEventListener("click",openGarden);
    $("lizzyGardenClose")?.addEventListener("click",closeGarden);
    $("closeLizzyGarden")?.addEventListener("click",closeGarden);
    $("waterAllPlants")?.addEventListener("click",waterAll);
    $("openGardenUpgrade")?.addEventListener("click",openUpgrade);
    $("gardenUpgradeClose")?.addEventListener("click",()=>$("gardenUpgradeWindow").classList.add("hidden"));
    $("closeGardenUpgrade")?.addEventListener("click",()=>$("gardenUpgradeWindow").classList.add("hidden"));
    $("submitGardenUpgradeAnswer")?.addEventListener("click",submitUpgradeAnswer);
    $("gardenUpgradeAnswer")?.addEventListener("keydown",e=>{if(e.key==="Enter")submitUpgradeAnswer()});

    $("tokenJarIcon")?.addEventListener("click",openTokens);
    $("tokenJarClose")?.addEventListener("click",closeTokens);
    $("closeTokenJar")?.addEventListener("click",closeTokens);
    $("cancelTokenRedeem")?.addEventListener("click",()=>{$("tokenRedeemWindow").classList.add("hidden");redeeming=null});
    $("confirmTokenRedeem")?.addEventListener("click",confirmRedeem);

    // Public helper for the upcoming Cloudflare/Telegram setup:
    // localStorage.setItem("lizzyTelegramWorkerURL","https://YOUR-WORKER.workers.dev")
    window.LizzyGarden = {render:renderGarden,addSeed,addFlower,addToken};

    renderTokens();
})();

// ===== Games Folder Organizer (superseded by static folder) =====
if(false)(() => {
 const $=id=>document.getElementById(id);
 const candidates=[
  ["funQuizIcon","💗","Lizzy Quiz"],
  ["mikhailQuizIcon","🧠","Mikhail Quiz"],
  ["wouldMikaelRatherIcon","🤔","Would Mikael Rather?"],
  ["crackCodeIcon","🔐","Crack the Code"],
  ["dailyMysteryIcon","🎁","Daily Mystery"],
  ["memoryMatchIcon","🧩","Memory Match"],
  ["thisOrThatIcon","⚡","This or That"],
  ["ticTacToeVirtual","❌⭕","Tic Tac Toe"]
 ];
 const found=candidates.filter(([id])=>id==="ticTacToeVirtual" || $(id));
 if(!found.length)return;
 const firstReal=found.find(([id])=>id!=="ticTacToeVirtual" && $(id)); const desktop=firstReal && $(firstReal[0])?.parentElement;
 if(!desktop)return;
 found.forEach(([id])=>{if(id!=="ticTacToeVirtual" && $(id))$(id).style.display="none"});
 const folder=document.createElement("div");
 folder.className="desktopIcon";folder.id="gamesFolderIcon";
 folder.innerHTML='<div class="desktopEmoji">🎮</div><span>Games</span>';
 desktop.appendChild(folder);
 const win=document.createElement("div");
 win.id="gamesFolderWindow";win.className="desktopWindow hidden gamesFolderWindow";
 win.innerHTML=`<div class="windowTop"><div class="windowDots"><span class="windowCloseDot" id="gamesFolderClose"></span><span class="windowMinDot"></span><span class="windowMaxDot"></span></div><h2>🎮 LizzyOS Games</h2></div>
 <div class="windowScroll"><div class="gamesFolderIntro"><span>🎮</span><div><small>FUN, QUIZZES & CHAOS</small><h3>Choose your game</h3><p>Perfect performances can earn special Garden seeds. 🌱</p></div></div><div id="gamesFolderGrid" class="gamesFolderGrid"></div></div><button id="closeGamesFolder" class="windowCloseButton">Close</button>`;
 document.body.appendChild(win);
 const grid=$("gamesFolderGrid");
 found.forEach(([id,emoji,name])=>{
   const b=document.createElement("button");b.className="gameFolderCard";
   b.innerHTML=`<span>${emoji}</span><b>${name}</b><small>Open</small>`;
   b.onclick=()=>{$("gamesFolderWindow").classList.add("hidden");if(id==="ticTacToeVirtual")$("ticTacToeWindow")?.classList.remove("hidden");else $(id)?.click()};
   grid.appendChild(b);
 });
 folder.onclick=()=>win.classList.remove("hidden");
 $("gamesFolderClose").onclick=() => win.classList.add("hidden");
 $("closeGamesFolder").onclick=() => win.classList.add("hidden");
})();

// ===== The Unreleased Letter — Legendary Reward =====
(() => {
 const $=id=>document.getElementById(id);
 const KEY="lizzyUnreleasedLetterUnlockedV1";
 let decrypting=false;

 function addLettersShortcut(){
   if($("unreleasedLetterIcon"))return;
   const desktop=$("gamesFolderIcon")?.parentElement || document.querySelector(".desktopIcons") || document.querySelector("#desktop");
   if(!desktop)return;
   const icon=document.createElement("div");
   icon.className="desktopIcon";icon.id="unreleasedLetterIcon";
   icon.innerHTML='<div class="desktopEmoji">💌</div><span>Letters</span>';
   icon.title="Contains a classified Legendary letter";
   icon.onclick=openLetter;
   desktop.appendChild(icon);
 }
 function openLetter(){
   if(localStorage.getItem(KEY)!=="yes")return;
   $("unreleasedLetterWindow")?.classList.remove("hidden");
 }
 function unlock(showDecrypt=true){
   const first=localStorage.getItem(KEY)!=="yes";
   localStorage.setItem(KEY,"yes");
   addLettersShortcut();
   if(showDecrypt && first)decrypt();
   else if(showDecrypt)openLetter();
 }
 function decrypt(){
   if(decrypting)return;decrypting=true;
   const screen=$("unreleasedDecryptScreen"),fill=$("decryptBarFill"),status=$("decryptStatus"),head=$("decryptHeadline");
   screen.classList.remove("hidden");fill.style.width="0%";
   setTimeout(()=>{fill.style.width="28%";status.textContent="Verifying Agent Yelizaveta clearance..."},200);
   setTimeout(()=>{fill.style.width="61%";status.textContent="Removing Mikael's completely unnecessary security..."},1100);
   setTimeout(()=>{fill.style.width="86%";status.textContent="Decrypting file: NEVER_MEANT_TO_BE_RELEASED.txt"},2100);
   setTimeout(()=>{fill.style.width="100%";head.textContent="CLASSIFIED FILE DECRYPTED 💌";status.textContent="Legendary clearance granted."},3100);
   setTimeout(()=>{screen.classList.add("hidden");decrypting=false;openLetter()},4100);
 }
 window.addEventListener("lizzyDailyRewardClaimed",e=>{
   const r=e.detail?.reward;
   if(Array.isArray(r) && r[2]==="The Unreleased Letter")unlock(true);
 });
 // Supports an already-claimed current reward after this update is deployed.
 try{
   const r=JSON.parse(localStorage.getItem("lizzyMysteryReward")||"null");
   if(Array.isArray(r) && r[2]==="The Unreleased Letter")unlock(false);
 }catch(e){}
 if(localStorage.getItem(KEY)==="yes")addLettersShortcut();

 $("unreleasedLetterClose")?.addEventListener("click",()=>$("unreleasedLetterWindow")?.classList.add("hidden"));
 $("closeUnreleasedLetter")?.addEventListener("click",()=>$("unreleasedLetterWindow")?.classList.add("hidden"));
 window.LizzyUnreleasedLetter={unlock,open:openLetter};
})();

// ===== Living Garden Interactions =====
(() => {
 const $=id=>document.getElementById(id);
 const comments=[
  "The butterfly has chosen this flower. Very prestigious. 🦋",
  "A bee has arrived for quality control. 🐝",
  "The ladybug says your Garden is acceptable. Barely. 🐞",
  "Your flower just moved. Either it's happy or Mikael broke the code again.",
  "Botanical evidence confirms: this one likes attention."
 ];
 document.addEventListener("click",e=>{
   const v=e.target.closest(".plantVisual");
   if(v){
     v.classList.remove("gardenHello");void v.offsetWidth;v.classList.add("gardenHello");
     const msg=$("gardenBugMessage");
     if(msg){msg.textContent=comments[Math.floor(Math.random()*comments.length)];msg.classList.add("show");setTimeout(()=>msg.classList.remove("show"),1900)}
   }
 });
})();

// ===== Tic Tac Toe: Lizzy vs Mikael =====
(() => {
 const $=id=>document.getElementById(id);
 let board=Array(9).fill(""),over=false;
 const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
 const winner=p=>wins.some(c=>c.every(i=>board[i]===p));
 function render(){
  const host=$("ticTacToeBoard");if(!host)return;
  host.innerHTML=board.map((v,i)=>`<button class="tttCell" data-ttt="${i}">${v==="X"?"❌":v==="O"?"⭕":""}</button>`).join("");
  host.querySelectorAll("[data-ttt]").forEach(b=>b.onclick=()=>move(Number(b.dataset.ttt)));
 }
 function finish(text){over=true;$("ticTacToeStatus").textContent=text}
 function move(i){
  if(over||board[i])return;
  board[i]="X";render();
  if(winner("X")){
   finish("YOU BEAT MIKAEL 😭 Fine. Take the win.");
   window.dispatchEvent(new CustomEvent("lizzyPerfectGame",{detail:{game:"Tic Tac Toe",key:"ticTacToe",score:"WIN"}}));
   return;
  }
  if(board.every(Boolean)){finish("Draw. Mikael is calling this a moral victory.");return}
  $("ticTacToeStatus").textContent="Mikael is thinking... allegedly.";
  setTimeout(aiMove,420);
 }
 function aiMove(){
  if(over)return;
  const empty=board.map((v,i)=>v?null:i).filter(i=>i!==null);
  const findWin=p=>empty.find(i=>{board[i]=p;const w=winner(p);board[i]="";return w});
  let pick=findWin("O");
  if(pick===undefined)pick=findWin("X");
  if(pick===undefined && !board[4])pick=4;
  if(pick===undefined){
    const corners=empty.filter(i=>[0,2,6,8].includes(i));
    pick=(corners.length?corners:empty)[Math.floor(Math.random()*(corners.length?corners.length:empty.length))];
  }
  board[pick]="O";render();
  if(winner("O")){finish("Mikael wins 😏 Please direct complaints to management.");return}
  if(board.every(Boolean)){finish("Draw. The hater survives.");return}
  $("ticTacToeStatus").textContent="Your move, Hater.";
 }
 function reset(){board=Array(9).fill("");over=false;$("ticTacToeStatus").textContent="Your move, Hater.";render()}
 $("ticTacToeRestart")?.addEventListener("click",reset);
 $("ticTacToeClose")?.addEventListener("click",()=>$("ticTacToeWindow")?.classList.add("hidden"));
 $("closeTicTacToe")?.addEventListener("click",()=>$("ticTacToeWindow")?.classList.add("hidden"));
 reset();
})();

// ===== Static Games Folder — reliable desktop organizer =====
(() => {
 const $=id=>document.getElementById(id);
 const win=$("gamesFolderStaticWindow");
 $("gamesFolderStaticIcon")?.addEventListener("click",()=>win?.classList.remove("hidden"));
 $("gamesFolderStaticClose")?.addEventListener("click",()=>win?.classList.add("hidden"));
 $("closeGamesFolderStatic")?.addEventListener("click",()=>win?.classList.add("hidden"));
 document.querySelectorAll("#gamesFolderStaticWindow [data-open-game]").forEach(btn=>{
   btn.addEventListener("click",()=>{
     const target=$(btn.dataset.openGame);
     win?.classList.add("hidden");
     target?.click();
   });
 });
})();

// Definitive Games-folder opener (works even if other desktop handlers intercept clicks).
document.addEventListener("click",e=>{
 const open=e.target.closest("#gamesFolderStaticIcon");
 if(open){e.preventDefault();e.stopImmediatePropagation();document.getElementById("gamesFolderStaticWindow")?.classList.remove("hidden");return;}
 const close=e.target.closest("#gamesFolderStaticClose,#closeGamesFolderStatic");
 if(close){e.preventDefault();document.getElementById("gamesFolderStaticWindow")?.classList.add("hidden");return;}
 const card=e.target.closest("#gamesFolderStaticWindow [data-open-game]");
 if(card){
   e.preventDefault();document.getElementById("gamesFolderStaticWindow")?.classList.add("hidden");
   if(card.dataset.openGame==="ticTacToeIcon")document.getElementById("ticTacToeWindow")?.classList.remove("hidden");
   else {const t=document.getElementById(card.dataset.openGame); if(t){t.style.display="";t.click();t.style.display="none";}}
 }
},true);

// Telegram-only observer for the existing Our Date submission.
document.getElementById("sendDateButton")?.addEventListener("click", () => {
  const date =
    document.getElementById("datePicker")?.value ||
    document.getElementById("dateInput")?.value ||
    localStorage.getItem("selectedDate") ||
    localStorage.getItem("lizzySelectedDate") ||
    "Date not available";
  lizzyTelegramNotify("📅 DATE REQUEST", "LizzyOS Mission Date Update", `Selected date: ${date}`);
});


// One-time website -> Cloudflare -> Telegram verification for this repaired build.
window.addEventListener("load", () => {
  const k="lizzyTelegramFinalRepairTestV1";
  if(!sessionStorage.getItem(k)){
    sessionStorage.setItem(k,"sent");
    setTimeout(() => {
      lizzyTelegramNotify(
        "🧪 WEBSITE CONNECTION TEST",
        "LizzyOS website is connected",
        "This message came from the actual LizzyOS website, not the Cloudflare dashboard."
      );
    }, 1200);
  }
});

if (typeof lizzyTelegramNotify === "function") window.lizzyTelegramNotify = lizzyTelegramNotify;

/* ===== MICKY BANK REMOTE SYNC ===== */
(function(){
 function endpoint(){try{if(typeof WORKER!=="undefined"&&WORKER)return WORKER}catch(e){}return window.LIZZY_WORKER_URL||window.WORKER_URL||""}
 function apply(n){n=Math.max(0,Math.floor(Number(n)||0));localStorage.setItem("lizzyMickyBucsRemoteBalance",String(n));
 ["mickyBucs","lizzyMickyBucs","mickyBucsBalance","lizzyBankBalance"].forEach(k=>{if(localStorage.getItem(k)!==null)localStorage.setItem(k,String(n))});
 document.querySelectorAll("[data-micky-bucs-balance],#mickyBucsBalance,#bankBalance,#lizzyBankBalance").forEach(el=>el.textContent=String(n));
 window.dispatchEvent(new CustomEvent("mickyBucsBalanceChanged",{detail:{balance:n,source:"cloudflare"}}))}
 async function sync(){const e=endpoint();if(!e)return;try{const r=await fetch(e+(e.includes("?")?"&":"?")+"action=micky_bucs_balance",{cache:"no-store"}),d=await r.json();if(r.ok&&d.success)apply(d.balance)}catch(e){console.warn("Bank sync failed",e)}}
 window.syncMickyBucsFromServer=sync;window.addEventListener("load",()=>setTimeout(sync,800));window.addEventListener("focus",sync);
 document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")sync()});setInterval(sync,60000);
})();

/* ===== OUR DATE COUNTDOWN — FRIDAY 28 AUGUST 2026 ===== */
(function(){
 const TARGET=new Date(2026,7,28,0,0,0); // local time: Friday 28 August 2026
 const END=new Date(2026,7,29,0,0,0);
 const $d=id=>document.getElementById(id);
 let celebrated=false, celebrationTimer=null;
 function pad(n){return String(Math.max(0,n)).padStart(2,"0")}
 function burst(){
   if(typeof confetti!=="function")return;
   const end=Date.now()+5000;
   (function frame(){
     confetti({particleCount:7,angle:60,spread:75,origin:{x:0,y:.72}});
     confetti({particleCount:7,angle:120,spread:75,origin:{x:1,y:.72}});
     if(Date.now()<end)requestAnimationFrame(frame);
   })();
 }
 function dateDayMode(hero){
   hero.classList.add("dateDay");
   $d("ourDateCountdownTitle").textContent="IT'S DATE DAY!!! ❤️🎉";
   $d("ourDateCountdownMessage").textContent="Agent Yelizaveta, the countdown is OVER. Operation Our Date is officially active 😭❤️";
   if(!celebrated){celebrated=true;burst();celebrationTimer=setInterval(()=>{if(new Date()<END)burst();else clearInterval(celebrationTimer)},30000)}
 }
 function updateOurDateCountdown(){
   const hero=$d("ourDateCountdownHero");if(!hero)return;
   const now=new Date();
   if(now>=TARGET&&now<END){dateDayMode(hero);return}
   if(now>=END){hero.classList.remove("dateDay");$d("ourDateCountdownTitle").textContent="Mission completed ❤️";$d("ourDateCountdownMessage").textContent="Operation Our Date has entered the LizzyOS history books. 💗";["dateCdDays","dateCdHours","dateCdMinutes","dateCdSeconds"].forEach(id=>$d(id).textContent="00");return}
   const diff=TARGET-now,days=Math.floor(diff/86400000),hours=Math.floor(diff/3600000)%24,mins=Math.floor(diff/60000)%60,secs=Math.floor(diff/1000)%60;
   $d("dateCdDays").textContent=pad(days);$d("dateCdHours").textContent=pad(hours);$d("dateCdMinutes").textContent=pad(mins);$d("dateCdSeconds").textContent=pad(secs);
   $d("ourDateCountdownTitle").textContent=days>0?"Friday is getting closer… 👀❤️":"OUR DATE IS TOMORROW!!! 😭❤️";
   $d("ourDateCountdownMessage").textContent=days>0?"Preparing Agent Yelizaveta for a very important mission… ❤️":"Final preparations underway. Menace levels expected to be extremely high. 🚨💗";
 }
 updateOurDateCountdown();setInterval(updateOurDateCountdown,1000);
 document.getElementById("calendarIcon")?.addEventListener("click",()=>setTimeout(updateOurDateCountdown,50));
})();


/* ===== LIZZY VIP MODE ===== */
(function(){
const K="lizzyVipStateV1",H="lizzyVipHistoryV1",$=id=>document.getElementById(id),get=()=>{try{return JSON.parse(localStorage.getItem(K)||"null")}catch(e){return null}},save=x=>localStorage.setItem(K,JSON.stringify(x));
const active=()=>{let x=get();return !!(x&&Date.now()<x.expiresAt)},notify=(t,d)=>{try{if(typeof window.lizzyNotify==="function")return window.lizzyNotify(t,d);if(typeof window.notify==="function")return window.notify(t,d)}catch(e){}};
function confetti(n=80){let a=["👑","✨","💜","💎","⭐"];for(let i=0;i<n;i++){let e=document.createElement("span");e.className="vipConfetti";e.textContent=a[i%a.length];e.style.left=Math.random()*100+"vw";e.style.animationDelay=Math.random()+"s";document.body.appendChild(e);setTimeout(()=>e.remove(),4200)}}
function activate(){let x=get();if(!x||Date.now()>=x.expiresAt){let now=Date.now();x={startedAt:now,expiresAt:now+86400000,peeks:2,reroll:1,override:1,discount:1,allowanceBonus:3,mysteryBoost:true,arcadeBonusCap:5,arcadeBonusEarned:0,complaints:0,messages:0};save(x)}$("vipWelcome")?.classList.remove("hidden");$("vipBadge")?.classList.remove("hidden");confetti(120);notify("vip_status",{status:"activated",expiresAt:x.expiresAt});render()}
function fmt(ms){let h=Math.floor(ms/36e5),m=Math.floor(ms%36e5/6e4);return h+"h "+String(m).padStart(2,"0")+"m"}
function render(){let x=get(),on=active();$("vipBadge")?.classList.toggle("hidden",!on);if(!on){$("vipPanel")?.classList.add("hidden");return}let f=fmt(x.expiresAt-Date.now());$("vipClock").textContent=f;$("vipRemain").textContent="VIP expires in "+f}
function area(t){$("vipAction").innerHTML=t}
window.LizzyVIP={activate,isActive:active,state:get,render};window.activateLizzyVIP=activate;
$("vipBadge")?.addEventListener("click",()=>{$("vipPanel").classList.remove("hidden");render()});$("vipClose")?.addEventListener("click",()=>$("vipPanel").classList.add("hidden"));
document.querySelectorAll("[data-vip]").forEach(b=>b.addEventListener("click",()=>{let x=get();if(!active())return;let a=b.dataset.vip;
if(a==="peek"){if(!x.peeks)return area("No Sneak Peeks remaining.");x.peeks--;save(x);area(`🔐 Sneak Peek unlocked. ${x.peeks}/2 remaining. Choose one locked Secret Shelf item to reveal only its title, category and teaser.`);notify("vip_privilege",{privilege:"sneak_peek",remaining:x.peeks})}
if(a==="reroll"){if(!x.reroll)return area("Reroll already used.");x.reroll=0;save(x);localStorage.setItem("lizzyVipRewardReroll","1");area("🎁 One Daily Reward reroll armed. The original reward is surrendered before the replacement appears.");notify("vip_privilege",{privilege:"reward_reroll"})}
if(a==="override"){if(!x.override)return area("Override already used.");x.override=0;save(x);area("⚖️ VIP Override used: one silly Mikael ruling may be overturned.");notify("vip_privilege",{privilege:"override"})}
if(a==="discount"){if(!x.discount)return area("Discount already used.");x.discount=0;save(x);localStorage.setItem("lizzyVipShelfDiscount","10");area("🛍️ 10% off one Secret Shelf purchase activated.");notify("vip_privilege",{privilege:"shelf_discount",discount:10})}
if(a==="complaint")area(`<b>👑 VIP COMPLAINT</b><br><textarea id="vipText" style="width:100%;min-height:80px"></textarea><br><button onclick="submitVipComplaint()">Submit</button><p>Estimated chance Mikael accepts responsibility: <b>2%</b></p>`);
if(a==="message")area(`<b>💌 VIP PRIORITY MESSAGE</b><br><textarea id="vipText" style="width:100%;min-height:80px"></textarea><br><button onclick="submitVipMessage()">Send</button>`);
}));
window.submitVipComplaint=()=>{let t=$("vipText")?.value.trim();if(!t)return;let x=get();x.complaints++;save(x);notify("vip_complaint",{complaint:t,priority:"VIP"});area("👑 Complaint received. Position: <b>1 of 1</b>. Chance Mikael accepts responsibility: <b>2%</b> 😂")};
window.submitVipMessage=()=>{let t=$("vipText")?.value.trim();if(!t)return;let x=get();x.messages++;save(x);notify("vip_priority_message",{message:t});area("💌 VIP priority message sent to Mr Perfect.")};
setInterval(render,30000);window.addEventListener("load",render);
})();


/* ===== MYSTERY RARE BOX SYSTEM ===== */
(function(){
 const K="lizzyMysteryRareBoxesV1",TOK="lizzyInteractionTokensV1",$r=id=>document.getElementById(id);
 const notifyRare=(t,d)=>{try{if(typeof window.lizzyNotify==="function")return window.lizzyNotify(t,d);if(typeof window.notify==="function")return window.notify(t,d)}catch(e){}};
 const boxes=()=>Math.max(0,Number(localStorage.getItem(K)||0));
 const setBoxes=n=>localStorage.setItem(K,String(Math.max(0,n)));
 function addToken(token){let a=[];try{a=JSON.parse(localStorage.getItem(TOK)||"[]")}catch(e){}a.push({...token,id:"rare-"+Date.now(),earnedAt:Date.now(),used:false});localStorage.setItem(TOK,JSON.stringify(a));window.dispatchEvent(new CustomEvent("lizzyTokenAdded",{detail:token}))}
 function open(){ $r("rareBoxModal")?.classList.remove("hidden");$r("rareBoxChoices")?.classList.remove("hidden");$r("rareBoxReveal")?.classList.add("hidden");$r("rareBoxReveal").innerHTML=""; }
 window.openMysteryRareBox=open;
 window.grantMysteryRareBox=function(){setBoxes(boxes()+1);notifyRare("rare_box",{status:"received",boxes:boxes()});return boxes()};
 $r("rareBoxClose")?.addEventListener("click",()=>$r("rareBoxModal").classList.add("hidden"));
 function reveal(html){$r("rareBoxChoices").classList.add("hidden");$r("rareBoxReveal").classList.remove("hidden");$r("rareBoxReveal").innerHTML=html}
 function consume(){if(boxes()>0)setBoxes(boxes()-1)}
 function chooseMoney(){
   const amount=20+Math.floor(Math.random()*31);consume();
   // Remote-bank builds can sync later; keep an explicit pending deposit if direct bank helper is unavailable.
   if(typeof window.addMickyBucs==="function")window.addMickyBucs(amount);
   else {let p=Number(localStorage.getItem("lizzyPendingRareBoxMickyBucs")||0);localStorage.setItem("lizzyPendingRareBoxMickyBucs",String(p+amount));window.dispatchEvent(new CustomEvent("mickyBucsAwarded",{detail:{amount,source:"Mystery Rare Box"}}))}
   reveal(`<div style="font-size:55px">💰</div><h2>${amount} MICKY BUCS</h2><p>Rare Box converted successfully. Lizzy has secured the bag.</p>`);
   notifyRare("rare_box_redeemed",{category:"Money",reward:`${amount} Micky Bucs`});
 }
 const secretPool=[
  {name:"Classified Sneak Peek",desc:"Reveal the title, category and teaser of one locked Secret Shelf item.",apply:()=>localStorage.setItem("lizzyRareBoxSecretPeek","1")},
  {name:"Secret Shelf Discount",desc:"15% off one Secret Shelf purchase.",apply:()=>localStorage.setItem("lizzyRareBoxShelfDiscount","15")},
  {name:"Dossier Intelligence",desc:"Unlock one extra clue about a currently locked dossier without revealing its contents.",apply:()=>localStorage.setItem("lizzyRareBoxDossierClue","1")}
 ];
 function chooseSecrets(){
   consume();let x=secretPool[Math.floor(Math.random()*secretPool.length)];x.apply();
   reveal(`<div style="font-size:55px">🔐</div><h2>${x.name}</h2><p>${x.desc}</p><p><b>Secret reward saved for use.</b></p>`);
   notifyRare("rare_box_redeemed",{category:"Secrets",reward:x.name});
 }
 const letterEyes=`<div class="letter"><h3>💌 One Thing About You…</h3><p><b>Lizzy,</b></p><p>If I had to pick one thing about you, it would probably be your eyes.</p><p>And yes, I know that saying this is dangerous because your ego really doesn't need any additional funding.</p><p>But I notice them. <b>A lot.</b></p><p>There's just something about your eyes that constantly bamboozles me. Whether you're smiling, giving me attitude, looking at me like I've said the dumbest thing imaginable, or just looking at me normally — they always get me.</p><p>I've even tried looking at your forehead instead.</p><p>Didn't work.</p><p>So unfortunately, I think I'll just continue taking the risk and looking into them.</p><p>And before you get too excited about this letter, this does <b>not</b> mean I'm becoming soft.</p><p>This message will self-destruct the moment you try using it against me.</p><p><b>Mikael<br>a.k.a Mr Perfect 💜</b></p></div>`;
 const letterHonesty=`<div class="letter"><h3>💌 Temporary Honesty</h3><p><b>Lizzy,</b></p><p>Congratulations. You have somehow unlocked a very rare event:</p><p><b>Mikael being nice without immediately ruining it.</b></p><p>So, for the next few moments, I'll admit something.</p><p>I genuinely enjoy having you around.</p><p>I've gotten used to the attitude, the ragebaiting, the random arguments, you being a menace for absolutely no reason, and somehow constantly bamboozling me with how pretty and beautiful you are <b>and stuff</b>.</p><p>And underneath all of that, you're genuinely someone I appreciate a lot.</p><p>You're funny, caring, ridiculously easy to talk to, and somehow you manage to make ordinary moments way more entertaining than they should be.</p><p>I notice more about you than I probably admit.</p><p>And I'm very glad I met you.</p><p>Okay.</p><p><b>Temporary Honesty has now expired.</b></p><p>Any attempt to question Mikael about the contents of this letter may result in immediate denial and accusations of fabricated evidence.</p><p><b>Mikael<br>a.k.a Mr Perfect 💜</b></p></div>`;
 const interactions=[
  {name:"Song Exchange",desc:"Mikael and Lizzy each send one song that reminds them of the other, with a short explanation why."},
  {name:"Question Call",desc:"A 10-minute call where Lizzy can ask Mikael questions and he answers honestly, with reasonable privacy vetoes."},
  {name:"Voice Note Request",desc:"Lizzy may request one voice note from Mikael on a topic of her choice."},
  {name:"Truth Card",desc:"Lizzy may ask Mikael one question and he has to answer truthfully, with reasonable privacy boundaries."}
 ];
 function saveLetter(key,title,html){let a=[];try{a=JSON.parse(localStorage.getItem("lizzyRareBoxLettersV1")||"[]")}catch(e){}a.push({key,title,html,unlockedAt:Date.now()});localStorage.setItem("lizzyRareBoxLettersV1",JSON.stringify(a));window.dispatchEvent(new CustomEvent("lizzyOpenWhenLetterUnlocked",{detail:{key,title,html}}))}
 function chooseMikael(){
   consume();
   // 1/3 each letter, 1/3 interaction category; interaction then chooses one of four.
   const roll=Math.floor(Math.random()*3);
   if(roll===0){saveLetter("one-thing-eyes","One Thing About You…",letterEyes);reveal(`<div style="font-size:55px">💌</div><h2>MYSTERY LETTER</h2>${letterEyes}<p><b>Saved to Open When.</b></p>`);notifyRare("rare_box_redeemed",{category:"Mikael",type:"Mystery Letter",reward:"One Thing About You…"});return}
   if(roll===1){saveLetter("temporary-honesty","Temporary Honesty",letterHonesty);reveal(`<div style="font-size:55px">💌</div><h2>MYSTERY LETTER</h2>${letterHonesty}<p><b>Saved to Open When.</b></p>`);notifyRare("rare_box_redeemed",{category:"Mikael",type:"Mystery Letter",reward:"Temporary Honesty"});return}
   const x=interactions[Math.floor(Math.random()*interactions.length)];
   window.dispatchEvent(new CustomEvent("lizzyRareBoxInteractionWon",{detail:{name:x.name,description:x.desc}}));
   reveal(`<div style="font-size:55px">❤️</div><h2>MYSTERY INTERACTION</h2><h3>${x.name}</h3><p>${x.desc}</p><p><b>Saved as a redeemable token until Lizzy uses it.</b></p>`);
   notifyRare("rare_box_redeemed",{category:"Mikael",type:"Mystery Interaction",reward:x.name});
 }
 document.querySelectorAll("[data-rare-choice]").forEach(b=>b.addEventListener("click",()=>{let c=b.dataset.rareChoice;if(boxes()<=0){/* Claimed cards from older builds may not have inventory state yet; permit one migration redemption. */if(!localStorage.getItem("lizzyRareBoxLegacyMigrated")){setBoxes(1);localStorage.setItem("lizzyRareBoxLegacyMigrated","1")}else return reveal("<h2>No Mystery Rare Box available.</h2>")} if(c==="money")chooseMoney();if(c==="secrets")chooseSecrets();if(c==="mikael")chooseMikael()}));
 // Intercept Redeem/Open on the Mystery Rare Box card without affecting other rewards.
 document.addEventListener("click",e=>{let b=e.target.closest("button");if(!b)return;let card=b.closest("[class*='reward'],[class*='card'],[class*='item']");let text=(card?.innerText||"")+" "+(b.innerText||"");if(/Mystery Rare Box/i.test(text)&&/(redeem|open|claim)/i.test(b.innerText||"")){e.preventDefault();e.stopImmediatePropagation();if(boxes()<=0)setBoxes(1);setTimeout(open,50)}},true);
})();


/* VIP UI self-heal: if VIP state is active, ensure badge/render are visible after page load. */
window.addEventListener("load",()=>{
    setTimeout(()=>{
        try{
            if(window.LizzyVIP?.isActive?.()){
                document.getElementById("vipBadge")?.classList.remove("hidden");
                window.LizzyVIP.render?.();
            }
        }catch(e){}
    },500);
});


/* ===== INTERACTIVE REWARDS STANDALONE APP ===== */
(function(){
const K="lizzyInteractiveRewardsV2",VK="lizzyInteractiveVipV2",$=id=>document.getElementById(id),now=()=>Date.now();
function fresh(){return{vip:{owned:1,status:"ready"},rareBox:{owned:1,status:"unopened"}}}
function load(){try{return Object.assign(fresh(),JSON.parse(localStorage.getItem(K)||"{}"))}catch(e){return fresh()}}function save(x){localStorage.setItem(K,JSON.stringify(x))}
function vip(){try{return JSON.parse(localStorage.getItem(VK)||"null")}catch(e){return null}}function active(){let v=vip();return!!(v&&now()<v.expiresAt)}
function fmt(ms){ms=Math.max(0,ms);let h=Math.floor(ms/36e5),m=Math.floor(ms%36e5/6e4),q=Math.floor(ms%6e4/1000);return{short:`${h}h ${String(m).padStart(2,"0")}m`,full:`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(q).padStart(2,"0")}`}}
function note(t,d){try{if(typeof window.lizzyNotify==="function")window.lizzyNotify(t,d);else if(typeof window.notify==="function")window.notify(t,d)}catch(e){}}
function confetti(){let a=["👑","✨","💜","💎","⭐"];for(let i=0;i<140;i++){let e=document.createElement("span");e.className="irConfetti";e.textContent=a[i%a.length];e.style.left=Math.random()*100+"vw";e.style.animationDelay=Math.random()+"s";document.body.appendChild(e);setTimeout(()=>e.remove(),4300)}}
function icon(){if($("interactiveRewardsDesktopIcon"))return;let e=document.createElement("div");e.id="interactiveRewardsDesktopIcon";e.className="irDesktopIcon";e.innerHTML='<div class="irDeskEmoji">🎁</div><div class="irDeskName">Interactive<br>Rewards</div><span id="irDesktopDot" class="irDesktopDot">2</span>';document.body.appendChild(e);e.onclick=open}
function render(){let x=load(),v=vip(),on=active();if(v&&!on&&x.vip.status==="active"){x.vip.status="expired";save(x)}$("irVipBadge")?.classList.toggle("hidden",!on);if(on){let f=fmt(v.expiresAt-now());$("irVipClock").textContent=f.short;$("irVipActivationClock").textContent=f.full}let n=(x.vip.owned>0?1:0)+(x.rareBox.owned>0?1:0);if($("irCount"))$("irCount").textContent=`${n} reward${n===1?"":"s"} available`;if($("irDesktopDot")){$("irDesktopDot").textContent=n;$("irDesktopDot").classList.toggle("hidden",n===0)}if(!$("irCards"))return;let vs=on?`ACTIVE • ${fmt(v.expiresAt-now()).short}`:(x.vip.status==="expired"?"EXPIRED":"READY TO ACTIVATE");$("irCards").innerHTML=`<div class="irCard"><div class="irCardEmoji">👑</div><h2>VIP Status — One Day</h2><div class="irStatus">${vs}</div><p>Activate 24 hours of LizzyOS VIP treatment, privileges and special access.</p><button id="irVipOpen" ${x.vip.owned<=0||on?"disabled":""}>${on?"VIP ACTIVE":x.vip.status==="expired"?"USED":"ACTIVATE VIP"}</button></div><div class="irCard"><div class="irCardEmoji">🎁</div><h2>Mystery Rare Box</h2><div class="irStatus">${x.rareBox.status==="unopened"?"UNOPENED":"OPENED"}</div><p>Choose Money, Secrets or Mikael. The final reward remains a mystery.</p><button id="irRareOpen" ${x.rareBox.owned<=0?"disabled":""}>${x.rareBox.owned>0?"OPEN RARE BOX":"OPENED"}</button></div>`;$("irVipOpen")?.addEventListener("click",vipConfirm);$("irRareOpen")?.addEventListener("click",rare)}
function open(){$("interactiveRewardsWindow").classList.remove("hidden");$("irStage").classList.add("hidden");render()}
function vipConfirm(){$("irStage").classList.remove("hidden");$("irStage").innerHTML='<div style="font-size:60px">👑</div><h2>Activate VIP Status?</h2><p>The 24-hour timer begins immediately.</p><button id="irConfirmVip">ACTIVATE 24-HOUR VIP</button>';$("irConfirmVip").onclick=activate}
function activate(){let x=load();if(x.vip.owned<=0||active())return;let st=now(),ex=st+86400000;x.vip.owned=0;x.vip.status="active";save(x);let state={startedAt:st,expiresAt:ex,peeks:2,reroll:1,override:1,discount:1,allowanceBonus:3,mysteryBoost:true,arcadeBonusCap:5,arcadeBonusEarned:0};localStorage.setItem(VK,JSON.stringify(state));localStorage.setItem("lizzyVipStateV1",JSON.stringify(state));$("interactiveRewardsWindow").classList.add("hidden");$("irVipActivation").classList.remove("hidden");$("irVipActivation").scrollTop=0;confetti();render();note("interactive_reward",{reward:"VIP Status — One Day",status:"activated",expiresAt:ex})}
function rare(){$("irStage").classList.remove("hidden");$("irStage").innerHTML='<div style="font-size:60px">🎁</div><h2>CHOOSE YOUR MYSTERY</h2><p>You choose the category. LizzyOS chooses what happens next.</p><div class="irChoiceGrid"><button>💰 <b>MONEY</b><small>20–50 Micky Bucs</small></button><button>🔐 <b>SECRETS</b><small>Mystery classified reward</small></button><button>❤️ <b>MIKAEL</b><small>Mystery letter or interaction</small></button></div><p style="opacity:.65">We will finish the Rare Box outcomes after VIP is confirmed.</p>'}
window.grantInteractiveReward=name=>{let x=load();if(/VIP Status/i.test(name)){x.vip.owned++;x.vip.status="ready"}if(/Mystery Rare Box/i.test(name)){x.rareBox.owned++;x.rareBox.status="unopened"}save(x);render();note("interactive_reward",{reward:name,status:"received"})};window.InteractiveRewards={open,render,activate,vipActive:active};$("irClose")?.addEventListener("click",()=>$("interactiveRewardsWindow").classList.add("hidden"));$("irEnterVip")?.addEventListener("click",()=>$("irVipActivation").classList.add("hidden"));$("irVipBadge")?.addEventListener("click",open);window.addEventListener("load",()=>{icon();render()});setInterval(render,1000);
})();


/* Route special Daily Rewards into Interactive Rewards instead of Token Jar. */
window.addEventListener("lizzyDailyRewardClaimed",e=>{
 const r=String(e.detail?.reward||"");
 if(/VIP Status\s*[—-]\s*One Day/i.test(r)||/Mystery Rare Box/i.test(r))window.grantInteractiveReward?.(r);
},true);


/* VIP activation screen safety controls */
document.addEventListener("keydown",e=>{
 if(e.key==="Escape" && !document.getElementById("irVipActivation")?.classList.contains("hidden")){
   document.getElementById("irVipActivation")?.classList.add("hidden");
   window.InteractiveRewards?.render?.();
 }
});
