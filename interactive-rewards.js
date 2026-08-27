
"use strict";

(function () {
  const APP_KEY = "lizzyInteractiveRewardsProductionV2";
  const VIP_KEY = "lizzyInteractiveVipProductionV2";
  const TOKEN_KEY = "lizzyTokenJarV1";
  const PREP_KEY = "lizzyInteractiveRewardsProductionPreparedV2";
  const DAY = 86400000;
  const el = (id) => document.getElementById(id);
  const now = () => Date.now();

  // Robust storage: normal localStorage in production, memory fallback for
  // restricted/private contexts. A storage error can never stop the app UI.
  const storage = (() => {
    try {
      const ls = window.localStorage;
      const testKey = "__lizzy_ir_storage_test__";
      ls.setItem(testKey, "1");
      ls.removeItem(testKey);
      return ls;
    } catch (_) {
      const memory = Object.create(null);
      return {
        getItem(key) { return Object.prototype.hasOwnProperty.call(memory,key) ? memory[key] : null; },
        setItem(key,value) { memory[key]=String(value); },
        removeItem(key) { delete memory[key]; }
      };
    }
  })();

  function defaultState() {
    return {
      version:2,
      vip:{owned:1,status:"ready",earnedAt:now(),activatedAt:null,expiresAt:null},
      rareBox:{owned:1,status:"unopened",earnedAt:now()}
    };
  }

  function readState() {
    let saved={};
    try { saved=JSON.parse(storage.getItem(APP_KEY)||"{}")||{}; } catch (_) {}
    const base=defaultState();
    return {
      ...base,
      ...saved,
      vip:{...base.vip,...(saved.vip||{})},
      rareBox:{...base.rareBox,...(saved.rareBox||{})}
    };
  }

  function writeState(state) {
    try { storage.setItem(APP_KEY,JSON.stringify(state)); } catch (_) {}
  }

  function readVip() {
    try { return JSON.parse(storage.getItem(VIP_KEY)||"null"); } catch (_) { return null; }
  }

  function writeVip(vip) {
    try {
      storage.setItem(VIP_KEY,JSON.stringify(vip));
      storage.setItem("lizzyVipStateV1",JSON.stringify(vip));
    } catch (_) {}
  }

  function vipIsActive() {
    const vip=readVip();
    return Boolean(vip && Number(vip.expiresAt)>now());
  }

  function formatRemaining(ms) {
    ms=Math.max(0,Number(ms)||0);
    const h=Math.floor(ms/3600000);
    const m=Math.floor((ms%3600000)/60000);
    const s=Math.floor((ms%60000)/1000);
    return {
      short:`${h}h ${String(m).padStart(2,"0")}m`,
      full:`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`
    };
  }

  function notify(type,data) {
    // Network notifications never control local reward behavior.
    setTimeout(() => {
      try {
        if (typeof window.lizzyNotify==="function") {
          Promise.resolve(window.lizzyNotify(type,data)).catch(()=>{});
        } else if (typeof window.notify==="function") {
          Promise.resolve(window.notify(type,data)).catch(()=>{});
        }
      } catch (_) {}
    },0);
  }

  function prepareOnce() {
    if (storage.getItem(PREP_KEY)) return;

    // Remove legacy VIP/Rare Box Token Jar entries and redemption history.
    try {
      const jar=JSON.parse(storage.getItem(TOKEN_KEY)||"null");
      if (jar && typeof jar==="object") {
        jar.inventory=jar.inventory||{};
        delete jar.inventory["VIP Status — One Day"];
        delete jar.inventory["VIP Status - One Day"];
        delete jar.inventory["Mystery Rare Box"];
        if (Array.isArray(jar.history)) {
          jar.history=jar.history.filter(item => {
            const name=String(item?.name||"");
            return !/VIP Status\s*[—-]\s*One Day/i.test(name) && !/Mystery Rare Box/i.test(name);
          });
        }
        storage.setItem(TOKEN_KEY,JSON.stringify(jar));
      }
    } catch (_) {}

    // Guaranteed presentation/test inventory.
    const state=readState();
    if (!vipIsActive()) {
      state.vip.owned=Math.max(1,Number(state.vip.owned)||0);
      state.vip.status="ready";
    }
    state.rareBox.owned=Math.max(1,Number(state.rareBox.owned)||0);
    state.rareBox.status="unopened";
    writeState(state);
    storage.setItem(PREP_KEY,"done");
  }

  function requiredElementsPresent() {
    const required=["interactiveRewardsIcon","interactiveRewardsWindow","irClose","irCards","irStage","irVipActivation","irEnterVip","irVipBadge","irVipClock"];
    const missing=required.filter(id=>!el(id));
    if (missing.length) {
      console.error("Interactive Rewards missing DOM:",missing);
      return false;
    }
    return true;
  }

  function open() {
    const win=el("interactiveRewardsWindow");
    if (!win) return false;
    win.classList.remove("hidden");
    win.style.display="block";
    win.setAttribute("aria-hidden","false");
    const stage=el("irStage");
    if (stage) {
      stage.classList.add("hidden");
      stage.innerHTML="";
    }
    render();
    return true;
  }

  function close() {
    const win=el("interactiveRewardsWindow");
    if (win) {
      win.classList.add("hidden");
      win.style.removeProperty("display");
      win.setAttribute("aria-hidden","true");
    }
    return true;
  }

  function render() {
    if (!requiredElementsPresent()) return false;

    const state=readState();
    const vip=readVip();
    const active=vipIsActive();

    if (state.vip.status==="active" && !active) {
      state.vip.status="expired";
      state.vip.owned=0;
      writeState(state);
    }

    document.body.classList.toggle("irVipActive",active);
    el("irVipBadge").classList.toggle("hidden",!active);

    if (active && vip) {
      const f=formatRemaining(vip.expiresAt-now());
      el("irVipClock").textContent=f.short;
      if (el("irVipActivationClock")) el("irVipActivationClock").textContent=f.full;
    }

    const count=(Number(state.vip.owned)>0?1:0)+(Number(state.rareBox.owned)>0?1:0);
    if (el("irCount")) el("irCount").textContent=`${count} reward${count===1?"":"s"} available`;
    if (el("irDesktopDot")) {
      el("irDesktopDot").textContent=String(count);
      el("irDesktopDot").classList.toggle("hidden",count===0);
    }

    let vipStatus="READY TO ACTIVATE";
    if (active && vip) vipStatus=`ACTIVE • ${formatRemaining(vip.expiresAt-now()).short}`;
    else if (state.vip.status==="expired") vipStatus="EXPIRED";

    el("irCards").innerHTML=`
      <article class="irCard">
        <div class="irCardEmoji">👑</div>
        <h2>VIP Status — One Day</h2>
        <div class="irStatus">${vipStatus}</div>
        <p>Activate a full 24 hours of LizzyOS VIP treatment, privileges and special access.</p>
        <button id="irVipOpen" type="button" ${Number(state.vip.owned)<=0||active?"disabled":""}>
          ${active?"VIP ACTIVE":state.vip.status==="expired"?"USED":"ACTIVATE VIP"}
        </button>
      </article>
      <article class="irCard">
        <div class="irCardEmoji">🎁</div>
        <h2>Mystery Rare Box</h2>
        <div class="irStatus">${state.rareBox.status==="unopened"?"UNOPENED":"OPENED"}</div>
        <p>Choose Money, Secrets or Mikael. The final reward remains a mystery.</p>
        <button id="irRareOpen" type="button" ${Number(state.rareBox.owned)<=0?"disabled":""}>
          ${Number(state.rareBox.owned)>0?"OPEN RARE BOX":"OPENED"}
        </button>
      </article>`;

    el("irVipOpen")?.addEventListener("click",showVipConfirm);
    el("irRareOpen")?.addEventListener("click",showRareBox);
    return true;
  }

  function showVipConfirm() {
    if (vipIsActive()) return openVipControls();
    const state=readState();
    if (Number(state.vip.owned)<=0) return;

    const stage=el("irStage");
    stage.classList.remove("hidden");
    stage.innerHTML=`
      <div class="irConfirmCard">
        <div style="font-size:64px">👑</div>
        <div class="irKicker">VIP STATUS — ONE DAY</div>
        <h2>Activate VIP Status?</h2>
        <p>The 24-hour timer starts only when you press the button below.</p>
        <button id="irConfirmVip" type="button">ACTIVATE 24-HOUR VIP ✨</button>
      </div>`;
    el("irConfirmVip")?.addEventListener("click",activateVip,{once:true});
  }

  function confetti(count=140) {
    const symbols=["👑","✨","💜","💎","⭐"];
    for (let i=0;i<count;i++) {
      const p=document.createElement("span");
      p.className="irConfetti";
      p.textContent=symbols[i%symbols.length];
      p.style.left=`${Math.random()*100}vw`;
      p.style.animationDelay=`${Math.random()*.8}s`;
      document.body.appendChild(p);
      setTimeout(()=>p.remove(),4400);
    }
  }

  function activateVip() {
    if (vipIsActive()) return openVipControls();

    const state=readState();
    if (Number(state.vip.owned)<=0) return;

    const startedAt=now();
    const expiresAt=startedAt+DAY;
    const vip={
      version:2,startedAt,expiresAt,
      peeks:2,reroll:1,override:1,discount:1,
      allowanceBonus:3,mysteryBoost:true,
      arcadeBonusCap:5,arcadeBonusEarned:0,
      complaints:0,messages:0
    };

    // State commit first.
    writeVip(vip);
    state.vip.owned=Math.max(0,Number(state.vip.owned)-1);
    state.vip.status="active";
    state.vip.activatedAt=startedAt;
    state.vip.expiresAt=expiresAt;
    writeState(state);

    close();

    const overlay=el("irVipActivation");
    overlay.classList.remove("hidden");
    overlay.style.display="grid";
    overlay.scrollTop=0;

    confetti();
    render();

    notify("interactive_reward",{reward:"VIP Status — One Day",status:"activated",expiresAt});
    window.dispatchEvent(new CustomEvent("lizzyVipRedeemed",{detail:{startedAt,expiresAt}}));
  }

  function enterVip() {
    const overlay=el("irVipActivation");
    overlay.classList.add("hidden");
    overlay.style.removeProperty("display");
    openVipControls();
  }

  function saveVip(mutator) {
    const vip=readVip();
    if (!vip || !vipIsActive()) return null;
    mutator(vip);
    writeVip(vip);
    return vip;
  }

  function openVipControls() {
    if (!vipIsActive()) return open();

    const vip=readVip();
    el("irVipActivation").classList.add("hidden");
    const win=el("interactiveRewardsWindow");
    win.classList.remove("hidden");
    win.style.display="block";

    const stage=el("irStage");
    stage.classList.remove("hidden");
    stage.innerHTML=`
      <div class="irVipControls">
        <div style="font-size:60px">👑</div>
        <div class="irKicker">VIP MODE ACTIVE</div>
        <h2>VIP Control Panel</h2>
        <p><b>${formatRemaining(vip.expiresAt-now()).short}</b> remaining</p>
        <div class="irChoiceGrid irVipFeatureGrid">
          <button data-irvip="peek" ${Number(vip.peeks)<=0?"disabled":""}>🔐 <b>Classified Sneak Peek</b><small>${Number(vip.peeks)} of 2 remaining</small></button>
          <button data-irvip="reroll" ${Number(vip.reroll)<=0?"disabled":""}>🎁 <b>Daily Reward Reroll</b><small>${Number(vip.reroll)} remaining</small></button>
          <button data-irvip="override" ${Number(vip.override)<=0?"disabled":""}>⚖️ <b>VIP Override</b><small>${Number(vip.override)} remaining</small></button>
          <button data-irvip="discount" ${Number(vip.discount)<=0?"disabled":""}>🛍️ <b>Secret Shelf Discount</b><small>${Number(vip.discount)>0?"10% off one purchase":"Used"}</small></button>
          <button data-irvip="complaint">📣 <b>Complaint Against Mikael</b><small>VIP priority</small></button>
          <button data-irvip="message">💌 <b>Message Mr Perfect</b><small>VIP priority</small></button>
        </div>
        <div id="irVipAction" class="irVipAction">VIP privileges are ready.</div>
      </div>`;

    stage.querySelectorAll("[data-irvip]").forEach(btn=>{
      btn.addEventListener("click",()=>handleFeature(btn.dataset.irvip));
    });
    return true;
  }

  function action(html) {
    if (el("irVipAction")) el("irVipAction").innerHTML=html;
  }

  function handleFeature(feature) {
    if (!vipIsActive()) return;

    if (feature==="peek") {
      const current=readVip();
      if (Number(current?.peeks)<=0) return;
      const vip=saveVip(v=>v.peeks-=1);
      action(`🔐 <b>Sneak Peek activated.</b><br>${vip.peeks}/2 remaining. Choose one locked Secret Shelf item to preview.`);
      notify("vip_privilege",{privilege:"classified_sneak_peek",remaining:vip.peeks});
      openVipControls();
    }

    if (feature==="reroll") {
      const current=readVip(); if (Number(current?.reroll)<=0) return;
      saveVip(v=>v.reroll=0);
      storage.setItem("lizzyVipRewardReroll","1");
      action("🎁 <b>Daily Reward Reroll armed.</b><br>The original reward must be surrendered before the replacement.");
      notify("vip_privilege",{privilege:"daily_reward_reroll"});
    }

    if (feature==="override") {
      const current=readVip(); if (Number(current?.override)<=0) return;
      saveVip(v=>v.override=0);
      storage.setItem("lizzyVipOverrideAvailable","1");
      action("⚖️ <b>VIP Override armed.</b><br>One silly Mikael ruling may be overturned.");
      notify("vip_privilege",{privilege:"override"});
    }

    if (feature==="discount") {
      const current=readVip(); if (Number(current?.discount)<=0) return;
      saveVip(v=>v.discount=0);
      storage.setItem("lizzyVipShelfDiscount","10");
      action("🛍️ <b>10% Secret Shelf discount activated.</b><br>Applies to one purchase.");
      notify("vip_privilege",{privilege:"secret_shelf_discount",discount:10});
    }

    if (feature==="complaint") {
      action(`<b>👑 VIP COMPLAINT PRIORITY</b><textarea id="irVipText" class="irVipTextarea" placeholder="State your complaint against Mikael..."></textarea><button id="irSubmitComplaint">SUBMIT VIP COMPLAINT</button><p>Estimated chance Mikael accepts responsibility: <b>2%</b></p>`);
      el("irSubmitComplaint")?.addEventListener("click",submitComplaint);
    }

    if (feature==="message") {
      action(`<b>💌 VIP PRIORITY MESSAGE</b><textarea id="irVipText" class="irVipTextarea" placeholder="Message Mr Perfect..."></textarea><button id="irSubmitMessage">SEND PRIORITY MESSAGE</button>`);
      el("irSubmitMessage")?.addEventListener("click",submitMessage);
    }
  }

  function submitComplaint() {
    const text=String(el("irVipText")?.value||"").trim();
    if (!text) return;
    saveVip(v=>v.complaints=Number(v.complaints||0)+1);
    action("👑 <b>VIP COMPLAINT RECEIVED.</b><br>Position: <b>1 of 1</b>.<br>Estimated Mikael accountability: <b>2%</b> 😂");
    notify("vip_complaint",{complaint:text,priority:"VIP"});
  }

  function submitMessage() {
    const text=String(el("irVipText")?.value||"").trim();
    if (!text) return;
    saveVip(v=>v.messages=Number(v.messages||0)+1);
    action("💌 <b>VIP PRIORITY MESSAGE SENT.</b><br>Mr Perfect has been dramatically notified.");
    notify("vip_priority_message",{message:text});
  }

  function showRareBox() {
    const state=readState();
    if (Number(state.rareBox.owned)<=0) return;
    const stage=el("irStage");
    stage.classList.remove("hidden");
    stage.innerHTML=`
      <div style="font-size:64px">🎁</div>
      <div class="irKicker">MYSTERY RARE BOX</div>
      <h2>Choose Your Mystery</h2>
      <p>You choose the category. LizzyOS chooses what happens next.</p>
      <div class="irChoiceGrid">
        <button data-irrare="money">💰 <b>MONEY</b><small>20–50 Micky Bucs</small></button>
        <button data-irrare="secrets">🔐 <b>SECRETS</b><small>Mystery classified reward</small></button>
        <button data-irrare="mikael">❤️ <b>MIKAEL</b><small>Mystery letter or interaction</small></button>
      </div>
      <p class="irMuted">Chooser verified. Final Rare Box outcomes are the next step after VIP testing.</p>`;
  }

  function grant(name) {
    const state=readState();
    const n=String(name||"");
    if (/VIP Status\s*[—-]\s*One Day/i.test(n)) {
      state.vip.owned+=1;
      state.vip.status=vipIsActive()?"active":"ready";
    }
    if (/Mystery Rare Box/i.test(n)) {
      state.rareBox.owned+=1;
      state.rareBox.status="unopened";
    }
    writeState(state);
    render();
    notify("interactive_reward",{reward:n,status:"received"});
  }

  function specialRewardCapture(event) {
    const reward=event?.detail?.reward;
    let name="";
    if (Array.isArray(reward)) name=String(reward[2]||"");
    else if (reward && typeof reward==="object") name=String(reward.name||reward.reward||"");
    else name=String(reward||"");

    if (!/VIP Status\s*[—-]\s*One Day/i.test(name) && !/Mystery Rare Box/i.test(name)) return;
    event.stopImmediatePropagation();
    grant(name);
  }

  function bind() {
    if (!requiredElementsPresent()) return false;

    // Direct onclick exists too; duplicate calls are harmless because open() is idempotent.
    el("interactiveRewardsIcon").addEventListener("click",open);
    el("interactiveRewardsIcon").addEventListener("keydown",event=>{
      if (event.key==="Enter"||event.key===" ") { event.preventDefault(); open(); }
    });
    el("irClose").addEventListener("click",close);
    el("irEnterVip").addEventListener("click",enterVip);
    el("irVipBadge").addEventListener("click",openVipControls);
    document.addEventListener("keydown",event=>{
      if (event.key!=="Escape") return;
      if (!el("irVipActivation").classList.contains("hidden")) {
        el("irVipActivation").classList.add("hidden");
      } else close();
    });
    window.addEventListener("lizzyDailyRewardClaimed",specialRewardCapture,true);
    return true;
  }

  function init() {
    prepareOnce();
    if (!bind()) return false;
    render();
    window.setInterval(render,1000);
    console.info("LizzyOS Interactive Rewards: READY");
    return true;
  }

  window.InteractiveRewardsApp={
    init,open,close,render,activateVip,openVipControls,grant,
    vipIsActive,state:readState
  };

  if (document.readyState==="loading") {
    document.addEventListener("DOMContentLoaded",init,{once:true});
  } else {
    init();
  }
})();
