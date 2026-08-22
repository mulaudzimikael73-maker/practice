
(() => {
"use strict";

const $ = (id) => document.getElementById(id);

const facts = [
  "Middle name: Thembinkosi.",
  "Favourite colour: Purple.",
  "Favourite season: Winter.",
  "Favourite TV show: The Office.",
  "Favourite movie genre: Comedy.",
  "Football teams: Liverpool and Orlando Pirates.",
  "Favourite superhero: Batman.",
  "Favourite Batman movie: The Dark Knight.",
  "Dream holiday: Dagestan.",
  "Mikael would happily spend six months in Dagestan.",
  "Favourite sport to play: Basketball.",
  "High-school basketball number: 4.",
  "All-time athlete: Michael Jordan.",
  "Current NBA player: Steph Curry.",
  "Favourite artists include Dave and J. Cole.",
  "Local artist favourites include Kwesta and Sjava.",
  "Cody's middle name is Aladeen.",
  "Mikael was born in England.",
  "Mikael moved to South Africa.",
  "Coach Micky is one of Mikael's aliases.",
  "Mikael has built shelves and a lamp.",
  "Purple has survived every colour audit.",
  "Basketball is the answer even when soccer looks like the obvious trap.",
  "Mr Perfect is an officially unofficial title.",
  "Mikhail Petrov has appeared as a suspicious alias.",
  "Bank of Micky is somehow a functioning LizzyOS financial institution.",
  "Micky Bucs are accepted currency inside LizzyOS.",
  "Life Lessons with Micky should not be used as accredited educational material.",
  "Crack the Code knows far too much about Mikael.",
  "A Monster can become a Reverse Token debt.",
  "Mikael's Reverse Tokens sync across devices.",
  "The Office counts as educational material according to this database.",
  "Mikael enjoys hiding secrets inside other secrets.",
  "The classified folder is never as innocent as it looks.",
  "There is an alarming amount of Mikael lore in LizzyOS."
];

const quotes = [
  "Yeah my folder is deep like that.",
  "Justice for Lizzy.",
  "Miss Bob The Builder.",
  "You're actually stunning.",
  "No weapon formed against my JavaScript shall prosper.",
  "This definitely needs its own feature.",
  "We can make that more dramatic.",
  "Mr Perfect has entered the chat.",
  "Technically, Micky Bucs are a stable currency.",
  "The website needs more unnecessary lore.",
  "I have an idea.",
  "Why make it normal when we can make it LizzyOS?",
  "The Office is educational material.",
  "Batman would understand.",
  "I refuse to elaborate.",
  "The database has spoken."
];

const lizzyIntel = [
  "They had a chance to be Mr Perfect.",
  "He doesn't deserve that.",
  "That's just how I am.",
  "You're being so dramatic.",
  "It makes me feel girly."
];

const opinions = [
  "The Office is objectively educational material.",
  "Winter is superior and the database will not accept appeals.",
  "Purple works with basically everything.",
  "Batman is the correct answer to more questions than people realise.",
  "Every website needs at least one completely unnecessary secret.",
  "A joke becomes funnier once it has its own user interface.",
  "Micky Bucs should probably be regulated.",
  "Mr Perfect is a title, a lifestyle and potentially a clerical error.",
  "Four is a very good number. Evidence: high-school jersey.",
  "Reverse Tokens are an important advancement in modern economics."
];

const questions = [
  ["What number did Mikael wear in high school?", "4", ["4", "9"]],
  ["Which sport is Mikael's favourite to play?", "Basketball", ["Basketball", "Soccer"]],
  ["Mikael's favourite superhero?", "Batman", ["Batman", "Spider-Man"]],
  ["Favourite season?", "Winter", ["Winter", "Summer"]],
  ["Favourite colour?", "Purple", ["Purple", "Blue"]],
  ["Favourite TV show?", "The Office", ["The Office", "Brooklyn Nine-Nine"]],
  ["All-time athlete?", "Michael Jordan", ["Michael Jordan", "LeBron James"]],
  ["Current NBA favourite?", "Steph Curry", ["Steph Curry", "Seth Curry"]],
  ["Favourite Batman movie?", "The Dark Knight", ["The Dark Knight", "The Batman"]],
  ["Cody's middle name?", "Aladeen", ["Aladeen", "Bruce"]]
];

const files = [
  ["FILE 04", "THE NUMBER FOUR", "UNLOCKED", "Mikael wore #4 in high school."],
  ["FILE BAT", "GOTHAM PROTOCOL", "UNLOCKED", "Batman remains Mikael's favourite superhero. The Dark Knight is the favourite Batman movie."],
  ["FILE CODY", "SUBJECT: CODY", "UNLOCKED", "Middle name: Aladeen."],
  ["FILE DAG", "DAGESTAN DOSSIER", "UNLOCKED", "Dream holiday: Dagestan. Intended duration: six months."],
  ["FILE MP", "MR PERFECT", "RESTRICTED", "Complete the relevant investigations elsewhere in LizzyOS."]
];

let currentTab = "profile";

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  }[c]));
}

function profileHTML() {
  return `
    <div class="mikaelProfileGrid">
      <article><small>IDENTITY</small><h3>Mikael Thembinkosi Mulaudzi</h3><p>Also known around here as Coach Micky, Mr Perfect and, under suspicious circumstances, Mikhail Petrov.</p></article>
      <article><small>CORE FAVOURITES</small><h3>💜 Purple • ❄️ Winter</h3><p>📺 The Office<br>🦇 Batman / The Dark Knight<br>🎬 Comedy</p></article>
      <article><small>SPORTS FILE</small><h3>🏀 Basketball</h3><p>High-school number: <b>4</b><br>All-time: Michael Jordan<br>Current: Steph Curry</p></article>
      <article><small>FOOTBALL ALLEGIANCE</small><h3>⚽ Liverpool / Orlando Pirates</h3><p>Dual-club intelligence confirmed.</p></article>
      <article><small>MUSIC FILE</small><h3>🎧 Dave • J. Cole</h3><p>Local favourites include Kwesta and Sjava.</p></article>
      <article><small>TRAVEL FILE</small><h3>📍 Dagestan</h3><p>Dream trip. Six-month duration, because apparently a normal holiday wasn't enough.</p></article>
    </div>`;
}

function statsHTML() {
  const stats = [
    ["Humour", "94%"], ["Humility", "3%"], ["Mr Perfect Status", "100%"],
    ["Batman Bias", "99%"], ["Website Feature Restraint", "2%"],
    ["Folder Depth", "97%"], ["Knee Durability", "CLASSIFIED"],
    ["Micky Buc Financial Confidence", "101%"],
    ["Likelihood of Adding Another Secret", "98%"]
  ];
  return `
    <div class="mikaelStats">
      ${stats.map(([name, value]) => `
        <div><span>${esc(name)}</span><b>${esc(value)}</b>
        <i style="--w:${parseInt(value,10) || 72}%"></i></div>`).join("")}
    </div>
    <button type="button" class="mikaelOpinionBtn" id="generateMikaelOpinion">🎲 Generate Mikael Opinion</button>
    <div id="mikaelOpinion" class="mikaelOpinion">The database is awaiting a controversial opinion.</div>`;
}

function factHTML() {
  const fact = facts[Math.floor(Math.random() * facts.length)];
  return `
    <div class="mikaelRandomCard">
      <small>RANDOM MIKAEL INTELLIGENCE</small>
      <div>🎲</div>
      <p>${esc(fact)}</p>
      <button type="button" id="nextMikaelFact">Give me another</button>
    </div>`;
}

function quotesHTML() {
  return `<div class="mikaelQuoteGrid">
    ${quotes.map((q) => `<blockquote><span>“${esc(q)}”</span><small>— Mikael.exe</small></blockquote>`).join("")}
  </div>`;
}

function intelHTML() {
  return `
    <div class="lizzyIntelHero"><span>🕵️</span><div><small>INTERCEPTED LIZZY INTELLIGENCE</small><h3>Things Lizzy has said</h3></div></div>
    <div class="mikaelQuoteGrid">
      ${lizzyIntel.map((q) => `<blockquote class="lizzyIntelQuote"><span>“${esc(q)}”</span><small>— Lizzy • VERIFIED</small></blockquote>`).join("")}
    </div>`;
}

function challengeHTML() {
  const best = Number(localStorage.getItem("mikaelProfileChallengeBest") || 0);
  return `
    <div class="mikaelChallenge">
      <div class="mikaelChallengeTop">
        <div><small>QUICK AUTHENTICATION</small><h3>Do You Actually Know Mikael?</h3></div>
        <b>Best: ${best}/${questions.length}</b>
      </div>
      <p>Ten quick A/B questions. No consulting the classified files. 👀</p>
      <button type="button" id="startMikaelChallenge">Start Challenge</button>
      <div id="mikaelChallengeBody"></div>
    </div>`;
}

function classifiedHTML() {
  return `<div class="mikaelFiles">
    ${files.map(([id, name, status, desc]) => `
      <article class="${status === "RESTRICTED" ? "restricted" : ""}">
        <small>${esc(id)} // ${esc(status)}</small>
        <h3>🔐 ${esc(name)}</h3>
        <p>${status === "RESTRICTED" ? "████████ ████████ — " + esc(desc) : esc(desc)}</p>
      </article>`).join("")}
  </div>`;
}

function render() {
  const host = $("mikaelTabContent");
  if (!host) return;

  const map = {
    profile: profileHTML,
    stats: statsHTML,
    facts: factHTML,
    quotes: quotesHTML,
    intel: intelHTML,
    challenge: challengeHTML,
    classified: classifiedHTML
  };

  host.innerHTML = (map[currentTab] || profileHTML)();
}

function open() {
  const win = $("mikaelDatabaseWindow");
  if (!win) return;
  win.classList.remove("hidden");
  currentTab = currentTab || "profile";
  render();
}

function close() {
  $("mikaelDatabaseWindow")?.classList.add("hidden");
}

function startChallenge() {
  const body = $("mikaelChallengeBody");
  if (!body) return;

  const order = [...questions].sort(() => Math.random() - 0.5);
  let i = 0;
  let score = 0;

  function next() {
    if (i >= order.length) {
      const best = Math.max(score, Number(localStorage.getItem("mikaelProfileChallengeBest") || 0));
      localStorage.setItem("mikaelProfileChallengeBest", String(best));
      body.innerHTML = `
        <div class="mikaelChallengeResult">
          <span>${score >= 8 ? "🏆" : score >= 5 ? "😌" : "😭"}</span>
          <h3>${score}/${order.length}</h3>
          <p>${score === 10 ? "Okay this is suspicious. Perfect score." : score >= 8 ? "Agent Yelizaveta knows her subject." : score >= 5 ? "Respectable. The database expected slightly more though." : "Mr Perfect has filed a formal complaint."}</p>
          <button type="button" id="challengeAgain">Try Again</button>
        </div>`;
      return;
    }

    const [question, answer, options] = order[i];
    body.innerHTML = `
      <div class="mikaelQuestion">
        <small>QUESTION ${i + 1}/${order.length}</small>
        <h3>${esc(question)}</h3>
        <div>${options.map((option) => `<button type="button" data-mikael-answer="${esc(option)}">${esc(option)}</button>`).join("")}</div>
        <p id="mikaelQFeedback"></p>
      </div>`;

    body.querySelectorAll("[data-mikael-answer]").forEach((button) => {
      button.addEventListener("click", () => {
        const correct = button.dataset.mikaelAnswer === answer;
        if (correct) score++;
        const feedback = $("mikaelQFeedback");
        if (feedback) feedback.textContent = correct ? "✓ Correct" : "✗ Nope — " + answer;
        body.querySelectorAll("[data-mikael-answer]").forEach((b) => b.disabled = true);
        i++;
        setTimeout(next, 550);
      }, { once: true });
    });
  }

  next();
}

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.closest("#openMikaelDatabase")) {
    event.preventDefault();
    open();
    return;
  }

  if (target.closest("#mikaelDatabaseClose, #mikaelDatabaseCloseBtn")) {
    event.preventDefault();
    close();
    return;
  }

  const tab = target.closest("[data-mikael-tab]");
  if (tab) {
    event.preventDefault();
    currentTab = tab.dataset.mikaelTab;
    document.querySelectorAll("[data-mikael-tab]").forEach((b) => b.classList.remove("active"));
    tab.classList.add("active");
    render();
    return;
  }

  if (target.closest("#nextMikaelFact")) {
    event.preventDefault();
    render();
    return;
  }

  if (target.closest("#generateMikaelOpinion")) {
    event.preventDefault();
    const box = $("mikaelOpinion");
    if (box) box.textContent = "“" + opinions[Math.floor(Math.random() * opinions.length)] + "” — Mikael.exe";
    return;
  }

  if (target.closest("#startMikaelChallenge, #challengeAgain")) {
    event.preventDefault();
    startChallenge();
  }
});

window.MikaelDatabaseV27 = { open, close, render, startChallenge };
})();
