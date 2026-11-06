// v4: prepínač režimu, pole znakov, interaktívne ukážky a záložky.
// Volá ich initEffects raz po načítaní stránky.
export function initV4(reduce) {
  var KLUC_TEMY = "elvoro-tema";
  var root = document.documentElement;

  // Prepínač svetlý / tmavý režim. Voľba sa pamätá v prehliadači (localStorage, bez cookies).
  var temaBtn = document.getElementById("tema");
  function nastavTemu(t) {
    if (t === "dark") root.setAttribute("data-theme", "dark"); else root.removeAttribute("data-theme");
    if (temaBtn) {
      temaBtn.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
      temaBtn.setAttribute("aria-label", t === "dark" ? "Prepnúť na svetlý režim" : "Prepnúť na tmavý režim");
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#09090B" : "#FFFFFF");
    window.dispatchEvent(new Event("elvoro-tema"));
  }
  nastavTemu(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
  if (temaBtn) temaBtn.addEventListener("click", function () {
    var t = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    try { localStorage.setItem(KLUC_TEMY, t); } catch (e) {}
    nastavTemu(t);
  });

  // Pole znakov: vlnitý pás, pomaly prechádzajúce svetlo, tichý stred pod textom, žiara pri kurzore.
  var RAMPA = " .·:;+*#%@";
  var CW = 11, CH = 12.6;
  Array.prototype.forEach.call(document.querySelectorAll("canvas.pole"), function (cv) {
    var ctx = cv.getContext("2d");
    if (!ctx) return;
    var host = cv.parentElement, druh = cv.getAttribute("data-pole");
    var pas = druh === "vyzva" ? 0.55 : 0.93;
    var w = 0, h = 0, cols = 0, rows = 0, t = 2.4, raf = 0, bezi = false, vidno = false;
    var kurzor = { x: -1e4, y: -1e4 };
    var dotyk = window.matchMedia("(pointer: coarse)").matches, snimka = 0;
    var font = "500 10px " + (getComputedStyle(root).getPropertyValue("--mono").trim() || "monospace");
    function rozmer() {
      var dpr = Math.min(window.devicePixelRatio || 1, dotyk ? 1.5 : 2);
      w = host.clientWidth; h = host.clientHeight;
      cv.width = Math.ceil(w * dpr); cv.height = Math.ceil(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CW) + 1; rows = Math.ceil(h / CH) + 1;
    }
    // Intenzita bunky (x, y v rozsahu 0 až 1).
    function sila(x, y) {
      var v = Math.sin(6 * x + 0.55 * t + 1.3 * Math.sin(3.4 * y + 0.3 * t));
      v += 0.7 * Math.sin(3 * x - 4.4 * y - 0.4 * t);
      v += 0.35 * Math.sin((x + y) * 8 + 0.2 * t);
      var n = 0.5 * v + 0.5;
      var a = 0.08 + n * 0.1 + n * Math.exp(-Math.pow((y - pas - 0.06 * Math.sin(4 * x + 0.5 * t)) / 0.25, 2));
      var lx = (0.1 * t) % 1.6 - 0.3, d = Math.abs(x - lx);
      if (d < 0.05) { var k = 1 - d / 0.05; a += Math.exp(-Math.pow((y - pas) / (0.06 + 0.18 * k), 2)) * k * 1.1; }
      // Tichý stred, aby sa text dal čítať.
      if (druh === "uvod") {
        var q = Math.hypot((x - 0.5) / 0.52, (y - 0.45) / 0.62);
        var m = Math.min(1, Math.max(0, (q - 0.6) / 0.6)); m = m * m * (3 - 2 * m);
        a = Math.min(a * (0.35 + 0.65 * m), 0.25 + m);
      }
      return a;
    }
    function farba(a, tmava) {
      // Nízka intenzita sivá, vysoká prechádza do zlatej.
      var z = Math.min(1, Math.max(0, (a - 0.55) / 0.8));
      if (tmava) {
        var r = 63 + (200 - 63) * z, g = 63 + (169 - 63) * z, b = 70 + (106 - 70) * z;
        return "rgba(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + "," + (0.35 + 0.6 * Math.min(1, a)) + ")";
      }
      var r2 = 196 + (166 - 196) * z, g2 = 192 + (132 - 192) * z, b2 = 184 + (63 - 184) * z;
      return "rgba(" + (r2 | 0) + "," + (g2 | 0) + "," + (b2 | 0) + "," + (0.45 + 0.5 * Math.min(1, a)) + ")";
    }
    function kresli() {
      var tmava = root.getAttribute("data-theme") === "dark";
      ctx.clearRect(0, 0, w, h);
      ctx.font = font; ctx.textBaseline = "top";
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var a = sila(c / cols, r / rows);
          var dx = c * CW - kurzor.x, dy = r * CH - kurzor.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 170) a += (1 - dist / 170) * 0.5;
          if (a <= 0.04) continue;
          a = Math.min(a, 1.35);
          var ch = RAMPA.charAt(Math.min(RAMPA.length - 1, Math.floor(a * (RAMPA.length - 1))));
          if (ch === " ") continue;
          ctx.fillStyle = farba(a, tmava);
          ctx.fillText(ch, c * CW, r * CH);
        }
      }
    }
    function slucka() {
      if (!bezi) return;
      t += 0.016;
      if (!dotyk || ++snimka % 2 === 0) kresli();
      raf = requestAnimationFrame(slucka);
    }
    function stav() {
      var ma = vidno && !reduce;
      if (ma && !bezi) { bezi = true; raf = requestAnimationFrame(slucka); }
      if (!ma && bezi) { bezi = false; cancelAnimationFrame(raf); }
      if (!bezi) kresli();
    }
    rozmer(); kresli();
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { vidno = es[0].isIntersecting; stav(); }).observe(host);
    }
    host.addEventListener("pointermove", function (e) { var b = cv.getBoundingClientRect(); kurzor.x = e.clientX - b.left; kurzor.y = e.clientY - b.top; });
    host.addEventListener("pointerleave", function () { kurzor.x = kurzor.y = -1e4; });
    window.addEventListener("elvoro-tema", function () { if (!bezi) kresli(); });
    var rt = null;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { rozmer(); kresli(); }, 150); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!bezi) kresli(); });
  });

  // Interaktívne ukážky: 4 kroky, samy bežia, keď sú na obrazovke; dajú sa pozastaviť a preklikať.
  Array.prototype.forEach.call(document.querySelectorAll(".demo"), function (demo) {
    var tlacidla = Array.prototype.slice.call(demo.querySelectorAll(".demo-kroky button"));
    var popisy = Array.prototype.slice.call(demo.querySelectorAll(".demo-popis li"));
    var prvky = Array.prototype.slice.call(demo.querySelectorAll("[data-od]"));
    var play = demo.querySelector(".demo-play");
    var n = tlacidla.length, krok = 1, timer = null, hra = !reduce, vidno = false;
    var TRVANIE = 3200;
    demo.style.setProperty("--trvanie", TRVANIE + "ms");
    function ukaz(k) {
      krok = k;
      demo.setAttribute("data-step", String(k));
      prvky.forEach(function (p) {
        var od = Number(p.getAttribute("data-od"));
        p.classList.toggle("on", od <= k);
        p.classList.toggle("hotovo", od < k);
      });
      popisy.forEach(function (p, i) { p.hidden = i + 1 !== k; });
      tlacidla.forEach(function (b, i) {
        if (i + 1 === k) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
        b.classList.toggle("hotovo", i + 1 < k);
        // Reštart animácie priebehu
        var bar = b.querySelector("i"); if (bar) { bar.style.display = "none"; void bar.offsetWidth; bar.style.display = ""; }
      });
    }
    function planuj() {
      clearTimeout(timer);
      var ide = hra && vidno;
      demo.classList.toggle("hra", ide);
      if (ide) timer = setTimeout(function () { ukaz(krok % n + 1); planuj(); }, krok === n ? TRVANIE + 1200 : TRVANIE);
    }
    function nastavPlay() {
      play.textContent = hra ? "Pozastaviť" : "Prehrať";
      play.setAttribute("aria-pressed", hra ? "false" : "true");
    }
    tlacidla.forEach(function (b, i) { b.addEventListener("click", function () { ukaz(i + 1); planuj(); }); });
    play.addEventListener("click", function () { hra = !hra; nastavPlay(); planuj(); });
    ukaz(1); nastavPlay();
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        var bolo = vidno; vidno = es[0].isIntersecting;
        if (vidno && !bolo) ukaz(1);
        planuj();
      }, { threshold: 0.35 }).observe(demo);
    }
  });

  // Záložky „Čo ešte staviame“ (šípky na klávesnici podľa vzoru WAI-ARIA tabs)
  var zalozky = Array.prototype.slice.call(document.querySelectorAll('.ex-zalozky [role="tab"]'));
  function vyber(z, fokus) {
    zalozky.forEach(function (x) {
      var on = x === z;
      x.setAttribute("aria-selected", on ? "true" : "false");
      x.tabIndex = on ? 0 : -1;
      var p = document.getElementById(x.getAttribute("aria-controls"));
      if (p) p.hidden = !on;
    });
    if (fokus) z.focus();
  }
  zalozky.forEach(function (z, i) {
    z.addEventListener("click", function () { vyber(z, false); });
    z.addEventListener("keydown", function (e) {
      var k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (e.key === "Home") { e.preventDefault(); vyber(zalozky[0], true); }
      else if (e.key === "End") { e.preventDefault(); vyber(zalozky[zalozky.length - 1], true); }
      else if (k) { e.preventDefault(); vyber(zalozky[(i + k + zalozky.length) % zalozky.length], true); }
    });
  });
}
