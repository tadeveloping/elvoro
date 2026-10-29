// Interakcie úvodnej stránky (prenesené z náhľadu nahlad/elvoro-nahlad.html).
// Spúšťa ich komponent Effects raz po načítaní.
export function initEffects(gsap) {
  if (window.__elvoroEffects) return;
  window.__elvoroEffects = true;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = !!gsap;
  var MONO = getComputedStyle(document.documentElement).getPropertyValue("--mono").trim() || "monospace";

  // Úvod: jemný vstup pri načítaní
  if (hasGsap && !reduce) {
    gsap.from("[data-in]", { y: 18, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.08, clearProps: "all" });
  }

  // 1: tok dopytu
  var steps = Array.prototype.slice.call(document.querySelectorAll("#flow .step"));
  var logs = Array.prototype.slice.call(document.querySelectorAll("#log li"));
  var bar = document.getElementById("flowBar");
  var flowTimer = null, flowIdx = 0, flowVisible = false;
  function setFlow(i) {
    steps.forEach(function (s, k) { s.classList.toggle("on", k <= i); });
    logs.forEach(function (l, k) { l.classList.toggle("on", k === i); });
    var w = ((i + 1) / steps.length * 100) + "%";
    if (hasGsap && !reduce) gsap.to(bar, { width: w, duration: 0.5, ease: "power2.inOut" });
    else bar.style.width = w;
  }
  function tickFlow() {
    flowIdx = (flowIdx + 1) % (steps.length + 1);
    if (flowIdx === steps.length) { flowIdx = -1; flowTimer = setTimeout(tickFlow, 1400); return; }
    setFlow(flowIdx);
    flowTimer = setTimeout(tickFlow, flowIdx === steps.length - 1 ? 3200 : 1700);
  }
  function startFlow(fromStart) {
    clearTimeout(flowTimer);
    if (fromStart) { flowIdx = 0; setFlow(0); }
    if (!reduce) flowTimer = setTimeout(tickFlow, 1700);
  }
  document.getElementById("flowReplay").addEventListener("click", function () { startFlow(true); });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !flowVisible) { flowVisible = true; startFlow(true); }
        else if (!e.isIntersecting && flowVisible) { flowVisible = false; clearTimeout(flowTimer); }
      });
    }, { threshold: 0.35 }).observe(document.getElementById("r1"));
  }

  // 2: ukážka hovoru (prepis sa zvýrazňuje, kým nie je skutočná nahrávka)
  var wave = document.getElementById("wave");
  var seed = [3,5,8,6,9,4,7,10,6,5,8,3,6,9,7,4,8,10,5,6,4,7,9,6,3,5,8,7,4,6,9,5,7,3,6,8,4,7,5,9,6,4];
  seed.forEach(function (v) { var b = document.createElement("i"); b.style.height = (v * 9) + "%"; wave.appendChild(b); });
  var bars = Array.prototype.slice.call(wave.children);
  var lines = Array.prototype.slice.call(document.querySelectorAll("#transcript li"));
  var playBtn = document.getElementById("callPlay"), icon = document.getElementById("callIcon"), timeEl = document.getElementById("callTime");
  var durs = [9, 5, 6, 4, 6, 3, 6];
  var total = durs.reduce(function (a, b) { return a + b; }, 0) * 1000;
  var playing = false, startT = 0, elapsed = 0, raf = null;
  function fmt(ms) { var s = Math.floor(ms / 1000); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
  function render(ms) {
    var acc = 0, idx = -1;
    for (var k = 0; k < durs.length; k++) { if (ms >= acc) idx = k; acc += durs[k] * 1000; }
    lines.forEach(function (l, k) { l.classList.toggle("on", playing && k === idx); });
    var p = ms / total;
    bars.forEach(function (b, k) { b.style.background = (k / bars.length) < p ? "var(--ink)" : "#CFCAC0"; });
    timeEl.textContent = fmt(ms) + " / " + fmt(total);
  }
  function loop(now) {
    elapsed = now - startT;
    if (elapsed >= total) { stop(true); return; }
    render(elapsed);
    raf = requestAnimationFrame(loop);
  }
  function setIcon(name) { icon.innerHTML = '<use href="#' + name + '"/>'; }
  function stop(reset) {
    playing = false; cancelAnimationFrame(raf); setIcon("play");
    playBtn.setAttribute("aria-label", "Prehrať ukážku hovoru");
    if (reset) elapsed = 0;
    render(elapsed);
  }
  playBtn.addEventListener("click", function () {
    if (playing) { stop(false); return; }
    playing = true; setIcon("pause"); playBtn.setAttribute("aria-label", "Pozastaviť ukážku hovoru");
    startT = performance.now() - elapsed; raf = requestAnimationFrame(loop);
  });
  timeEl.textContent = "0:00 / " + fmt(total);

  // 3: spojenie nástrojov do systému
  var merged = false;
  document.getElementById("mergeBtn").addEventListener("click", function () {
    var chips = document.querySelectorAll("#scatter .chip");
    var btn = this;
    if (!hasGsap || reduce) return;
    if (!merged) {
      gsap.to(chips, { y: 24, opacity: 0.25, scale: 0.96, duration: 0.45, ease: "power2.inOut", stagger: 0.05 });
      gsap.fromTo("#sys", { scale: 0.97 }, { scale: 1, duration: 0.5, ease: "power3.out", delay: 0.25 });
      gsap.fromTo("#sys .row", { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", stagger: 0.03, delay: 0.3 });
      btn.textContent = "Ukázať predtým";
    } else {
      gsap.to(chips, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", stagger: 0.04 });
      btn.textContent = "Spojiť do systému";
    }
    merged = !merged;
  });

  // Prihláška: kroky, vetvy podľa cesty, okamžité príležitosti
  var form = document.getElementById("wiz");
  var qs = Array.prototype.slice.call(form.querySelectorAll(".q"));
  var cur = 1;
  var nextB = document.getElementById("wizNext"), backB = document.getElementById("wizBack"), sendB = document.getElementById("wizSend");
  var errEl = document.getElementById("wizErr"), countEl = document.getElementById("wizCount"), barEl = document.getElementById("wizBar");
  var KEY = "elvoro-prihlaska";
  function val(name) { var el = form.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : ""; }
  function vals(name) { return Array.prototype.map.call(form.querySelectorAll('input[name="' + name + '"]:checked'), function (e) { return e.value; }); }
  function txt(id) { return (document.getElementById(id).value || "").trim(); }
  function path() { return val("cesta") || "A"; }
  function wizSteps() { return path() === "C" ? [1, 2, 3, 4, 6, 7, 8] : [1, 2, 3, 4, 5, 6, 7, 8]; }
  function showStep(n, dir) {
    cur = n;
    var list = wizSteps(), pos = list.indexOf(n) + 1;
    qs.forEach(function (q) { q.hidden = Number(q.dataset.step) !== n; });
    form.querySelectorAll("[data-path]").forEach(function (d) { d.hidden = d.dataset.path !== path(); });
    countEl.textContent = "Krok " + pos + " z " + list.length;
    barEl.style.width = (pos / list.length * 100) + "%";
    backB.hidden = pos === 1;
    nextB.hidden = pos === list.length;
    sendB.hidden = pos !== list.length;
    errEl.hidden = true;
    var q = form.querySelector('.q[data-step="' + n + '"]');
    if (dir && hasGsap && !reduce) gsap.fromTo(q, { opacity: 0, x: dir * 16 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", clearProps: "all" });
  }
  function check(n) {
    var p = path();
    if (n === 1 && !val("cesta")) return "Vyberte, s čím vám môžeme pomôcť.";
    if (n === 2 && !txt("firma")) return "Napíšte názov firmy.";
    if (n === 2 && !val("velkost")) return "Vyberte, koľko ľudí vo firme pracuje.";
    if (n === 3 && txt("coRobite").length < 10) return "Napíšte aspoň jednu vetu o tom, čo robíte.";
    if (n === 4 && p === "A" && !vals("cas").length) return "Vyberte aspoň jednu oblasť.";
    if (n === 4 && p === "B" && !vals("nastroje").length) return "Vyberte, čo dnes používate.";
    if (n === 4 && p === "C" && txt("napadText").length < 10) return "Opíšte nápad aspoň jednou vetou.";
    if (n === 6 && !val("ai")) return "Vyberte jednu možnosť.";
    if (n === 7 && !val("kedy")) return "Vyberte, kedy chcete začať.";
    if (n === 8) {
      if (!txt("meno")) return "Napíšte meno.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(txt("email"))) return "Napíšte e-mail v tvare meno@firma.sk.";
    }
    return "";
  }
  function save() {
    try {
      var d = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name || el.name === "hp") return;
        if (el.type === "radio" || el.type === "checkbox") { if (el.checked) d[el.id] = true; }
        else if (el.value) d[el.id] = el.value;
      });
      d._step = cur;
      localStorage.setItem(KEY, JSON.stringify(d));
    } catch (e) {}
  }
  function load() {
    try {
      var d = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!d) return 1;
      Object.keys(d).forEach(function (id) {
        if (id === "_step") return;
        var el = document.getElementById(id);
        if (!el) return;
        if (el.type === "radio" || el.type === "checkbox") el.checked = true; else el.value = d[id];
      });
      return wizSteps().indexOf(d._step) > -1 ? d._step : 1;
    } catch (e) { return 1; }
  }
  function go(delta) {
    var list = wizSteps(), i = list.indexOf(cur);
    if (delta > 0) { var m = check(cur); if (m) { errEl.textContent = m; errEl.hidden = false; return; } }
    var nx = list[Math.min(Math.max(i + delta, 0), list.length - 1)];
    showStep(nx, delta);
    save();
  }
  nextB.addEventListener("click", function () { go(1); });
  backB.addEventListener("click", function () { go(-1); });
  form.addEventListener("change", save);
  form.addEventListener("input", save);
  form.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.tagName === "INPUT" && sendB.hidden) { e.preventDefault(); go(1); }
  });

  var OPP = {
    emaily: "E-maily roztriedené automaticky, s pripraveným návrhom odpovede",
    ponuky: "Ponuky pripravené z dopytu podľa vášho cenníka",
    faktury: "Faktúry a administratíva bez ručného prepisovania",
    objednavky: "Objednávky a sklad prepojené na jednom mieste",
    planovanie: "Termíny a pripomienky, ktoré sa naplánujú samy",
    reporty: "Reporty pre vedenie, ktoré sa pripravia samy",
    telefony: "AI hlasový agent, ktorý zdvihne každý telefonát",
    znalosti: "Firemný AI asistent, ktorý pozná vaše dokumenty a postupy",
    obsah: "Príprava obsahu na sociálne siete s pomocou AI"
  };
  function opportunities() {
    var p = path(), out = [];
    if (p === "A") vals("cas").forEach(function (v) { if (OPP[v]) out.push(OPP[v]); });
    if (p === "B") out.push("Jeden firemný systém namiesto: " + vals("nastroje").join(", "));
    if (p === "C") out.push("Prejdeme váš nápad a navrhneme rozsah prvej verzie, ktorá sa dá rýchlo spustiť");
    if (txt("uloha")) out.push("Úloha, ktorú ste opísali, je prvý kandidát na automatizáciu");
    if (val("ai") === "vlastna") out.push("Pravidlá a bezpečné AI nástroje, aby firemné dáta nechodili, kam nemajú");
    if (val("ai") === "nechytilo") out.push("Zavedenie po krokoch so zaučením tímu, aby sa AI tentoraz chytila");
    if (["21-50", "51-250", "250+"].indexOf(val("velkost")) > -1) out.push("Zaučenie tímu po oddeleniach");
    return out.slice(0, 5);
  }
  var startedAt = Date.now(), sending = false;
  function showDone(opps) {
    var meno = txt("meno").split(" ")[0];
    document.getElementById("doneTitle").textContent = "Ďakujeme, " + meno + ".";
    var ul = document.getElementById("opps"); ul.innerHTML = "";
    opps.forEach(function (t) {
      var li = document.createElement("li");
      li.innerHTML = '<svg class="i"><use href="#check-circle"/></svg>';
      var s = document.createElement("span"); s.textContent = t; li.appendChild(s); ul.appendChild(li);
    });
    qs.forEach(function (q) { q.hidden = true; });
    [nextB, backB, sendB, errEl].forEach(function (b) { b.hidden = true; });
    form.querySelector(".wiz-top").hidden = true;
    var done = document.getElementById("wizDone"); done.hidden = false;
    if (hasGsap && !reduce) gsap.fromTo(done.querySelectorAll(".label, h3, p, .opps li"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.07, clearProps: "all" });
    try { localStorage.removeItem(KEY); } catch (er) {}
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var m = check(cur); if (m) { errEl.textContent = m; errEl.hidden = false; return; }
    if (sending) return;
    sending = true; sendB.disabled = true; sendB.textContent = "Odosielam…"; errEl.hidden = true;
    var opps = opportunities();
    var payload = {
      cesta: path(), firma: txt("firma"), web: txt("web"), velkost: val("velkost"), coRobite: txt("coRobite"),
      cas: vals("cas"), nastroje: vals("nastroje"), napad: txt("napadText"), mame: val("mame"), uloha: txt("uloha"),
      ai: val("ai"), kedy: val("kedy"), meno: txt("meno"), email: txt("email"), telefon: txt("telefon"),
      prilezitosti: opps, hp: txt("hp"), trvanieMs: Date.now() - startedAt
    };
    fetch("/api/prihlaska", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok) throw new Error((res.j && res.j.error) || "");
        showDone(opps);
      })
      .catch(function (err) {
        errEl.textContent = (err && err.message) || "Prihlášku sa nepodarilo odoslať. Skúste to o chvíľu znova.";
        errEl.hidden = false;
      })
      .finally(function () { sending = false; sendB.disabled = false; sendB.textContent = "Odoslať prihlášku"; });
  });
  document.getElementById("wizReset").addEventListener("click", function () {
    form.reset();
    document.getElementById("wizDone").hidden = true;
    form.querySelector(".wiz-top").hidden = false;
    showStep(1);
  });
  showStep(load());

  // Živý smajlík zo znakov (tvar z oficiálneho SVG): oči sledujú kurzor, žmurká, okraj jemne žije
  (function () {
    var cv = document.getElementById("smiley");
    if (!cv || !cv.getContext || typeof Path2D === "undefined") return;
    var ctx = cv.getContext("2d");
    var RAMP = " .:-=+*#%@";
    var NOISE = ".:-=+*#%@01/\\<>{}[]~^";
    var INK = "#09090B", GOLD = "#A6843F";
    var P_O = new Path2D("M462 -13Q333 -13 241.5 27.5Q150 68 101.5 143.0Q53 218 53 323Q53 429 101.5 504.0Q150 579 241.5 619.5Q333 660 462 660Q592 660 683.0 619.5Q774 579 822.5 504.0Q871 429 871 323Q871 218 822.5 143.0Q774 68 683.0 27.5Q592 -13 462 -13ZM462 102Q542 102 602.5 126.0Q663 150 697.5 199.0Q732 248 732 323Q732 398 697.5 447.0Q663 496 602.5 520.5Q542 545 462 545Q383 545 321.0 520.5Q259 496 224.0 447.0Q189 398 189 323Q189 248 224.0 199.0Q259 150 321.0 126.0Q383 102 462 102Z");
    var OX = 3881, OCX = 3881 + 462, OCY = 323.5, OW = 818, OH = 673;
    var cols = 0, rows = 0, fs = 9, cw = 5.4, ch = 9.5, sq = 1, s = 1, cx = 0, cy = 0, dpr = 1;
    var off = null, o = null, lineRow = 0, lineEnd = 0;
    var eye = { x: 0, y: 0, tx: 0, ty: 0 }, blink = 1, nextBlink = 0, blinkStart = -1;
    var pointer = null, raf = null, visible = true, last = 0, ready = false;
    function charFor(a) { return a > 0.08 ? RAMP.charAt(Math.min(RAMP.length - 1, 1 + Math.floor(a * (RAMP.length - 1)))) : " "; }
    function layout() {
      var W = cv.clientWidth || cv.parentNode.clientWidth;
      fs = W < 300 ? 6 : W < 420 ? 7 : 9;
      cw = fs * 0.6; ch = fs * 1.05; sq = cw / ch;
      cols = Math.floor(W / cw);
      var smileCols = cols * 0.74;
      s = smileCols / OW;
      rows = Math.ceil(OH * s * sq + 4);
      cx = cols - smileCols / 2 - 1;
      cy = rows / 2;
      lineRow = Math.round(cy);
      lineEnd = Math.floor(cx - (OW / 2 - 40) * s);
      off = document.createElement("canvas");
      off.width = cols; off.height = rows;
      o = off.getContext("2d", { willReadFrequently: true });
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.style.height = Math.round(rows * ch) + "px";
      cv.width = Math.round(cv.clientWidth * dpr);
      cv.height = Math.round(rows * ch * dpr);
      ready = true;
    }
    function paintShape() {
      o.setTransform(1, 0, 0, 1, 0, 0);
      o.clearRect(0, 0, cols, rows);
      o.translate(cx, cy);
      o.scale(s, -s * sq);
      o.translate(-OCX, -OCY);
      o.fillStyle = "#000"; o.strokeStyle = "#000";
      o.save(); o.translate(OX, 0); o.fill(P_O); o.restore();
      var r = 36.4 * 1.3;
      [4248.9, 4415.0].forEach(function (ex) {
        o.beginPath();
        o.ellipse(ex + eye.x, 386.8 + eye.y, r, Math.max(4, r * blink), 0, 0, Math.PI * 2);
        o.fill();
      });
      o.lineWidth = 45 * 1.25; o.lineCap = "round";
      o.beginPath(); o.moveTo(4238.3 + eye.x * 0.3, 256.2); o.quadraticCurveTo(4334.8 + eye.x * 0.3, 179.5, 4431.3 + eye.x * 0.3, 256.2); o.stroke();
      return o.getImageData(0, 0, cols, rows).data;
    }
    function frame(now) {
      // oči
      if (pointer) {
        var b = cv.getBoundingClientRect();
        var px = (pointer.x - b.left) / cw - cx, py = (pointer.y - b.top) / ch - cy;
        var d = Math.sqrt(px * px + py * py) || 1;
        var k = Math.min(1, d / 40);
        eye.tx = (px / d) * 70 * k; eye.ty = -(py / d) * 55 * k;
      } else {
        var tt = now / 1000;
        eye.tx = Math.sin(tt * 0.6) * 45; eye.ty = Math.sin(tt * 0.37) * 18;
      }
      eye.x += (eye.tx - eye.x) * 0.12; eye.y += (eye.ty - eye.y) * 0.12;
      // žmurknutie
      if (!nextBlink) nextBlink = now + 1800 + Math.random() * 2500;
      if (blinkStart < 0 && now > nextBlink) blinkStart = now;
      if (blinkStart >= 0) {
        var p = (now - blinkStart) / 220;
        blink = p < 0.5 ? 1 - p * 2 * 0.92 : 0.08 + (p - 0.5) * 2 * 0.92;
        if (p >= 1) { blink = 1; blinkStart = -1; nextBlink = now + 2500 + Math.random() * 3500; }
      }
      var data = paintShape();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.font = fs + "px " + MONO;
      ctx.textBaseline = "top";
      ctx.fillStyle = GOLD;
      for (var c = 0; c < lineEnd; c++) ctx.fillText("-", c * cw, (cy - 0.5) * ch);
      for (var r = 0; r < rows; r++) {
        for (var c2 = 0; c2 < cols; c2++) {
          var a = data[(r * cols + c2) * 4 + 3] / 255;
          var chr = charFor(a);
          if (chr === " ") continue;
          var live = a < 0.9 && Math.random() < 0.06;
          ctx.fillStyle = live ? "#8A867E" : INK;
          ctx.fillText(live ? NOISE.charAt(Math.floor(Math.random() * NOISE.length)) : chr, c2 * cw, r * ch);
        }
      }
    }
    function loop(now) {
      if (now - last > 33) { last = now; frame(now); }
      raf = visible ? requestAnimationFrame(loop) : null;
    }
    function start() {
      layout();
      if (reduce) { frame(0); return; }
      if (!raf) raf = requestAnimationFrame(loop);
    }
    window.addEventListener("pointermove", function (e) { pointer = { x: e.clientX, y: e.clientY }; });
    document.addEventListener("pointerleave", function () { pointer = null; });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible && ready && !reduce && !raf) raf = requestAnimationFrame(loop);
      }).observe(cv);
    }
    var rt = null;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { if (ready && Math.abs(cv.clientWidth - cols * cw) > cw * 2) { layout(); frame(performance.now()); } }, 200);
    });
    var fontsReady = document.fonts && document.fonts.load ? document.fonts.load("10px " + MONO) : Promise.resolve();
    var started = false;
    function go() { if (!started) { started = true; start(); } }
    fontsReady.then(go, go);
    setTimeout(go, 1200);
  })();

  // Popisky sekcií sa pri prvom zobrazení „dešifrujú“
  (function () {
    if (reduce || !("IntersectionObserver" in window)) return;
    var GL = "ABCDEFGHIJKLMNOPRSTUVZ0123456789#%*+=";
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target, final = el.textContent, len = final.length, start = performance.now(), dur = 700;
        (function step(now) {
          var p = Math.min(1, (now - start) / dur), out = "";
          for (var i = 0; i < len; i++) {
            var c = final.charAt(i);
            out += (c === " " || i < p * len) ? c : GL.charAt(Math.floor(Math.random() * GL.length));
          }
          el.textContent = out;
          if (p < 1) requestAnimationFrame(step); else el.textContent = final;
        })(start);
      });
    }, { threshold: 1 });
    document.querySelectorAll(".sec-head .label, .sol-text .kind .label, .about-text .label").forEach(function (el) { io.observe(el); });
  })();

  // Magnetické tlačidlá (len myš)
  if (hasGsap && !reduce && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".btn").forEach(function (b) {
      b.addEventListener("mousemove", function (e) {
        var r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.3, ease: "power3.out" });
      });
      b.addEventListener("mouseleave", function () { gsap.to(b, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" }); });
    });
  }
}
