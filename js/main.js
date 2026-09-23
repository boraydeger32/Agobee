/* AGOBEE — site behaviour */
(function () {
  "use strict";

  /* Header: transparent over hero → solid after scroll */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile nav */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    const close = () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    };
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "✕" : "☰";
    });
    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && links.classList.contains("open")) {
        close();
        toggle.focus();
      }
    });
  }

  /* Scroll reveal — respects prefers-reduced-motion via CSS */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* Contact form — mailto fallback until backend exists */
  const form = document.querySelector("#contact-form");
  if (form) {
    const en = document.documentElement.lang === "en";
    const t = en
      ? {
          subject: "AGOBEE Corporate Inquiry",
          general: "General",
          name: "Name",
          company: "Organization",
          email: "Email",
          phone: "Phone",
          segment: "Line of interest",
          status: "Your email application is opening. Your inquiry will be sent from there.",
        }
      : {
          subject: "AGOBEE Kurumsal Talep",
          general: "Genel",
          name: "Ad Soyad",
          company: "Kurum",
          email: "E-posta",
          phone: "Telefon",
          segment: "İlgilenilen seri",
          status: "E-posta uygulamanız açılıyor. Talebiniz oradan iletilecektir.",
        };
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = `${t.subject} — ${data.get("segment") || t.general}`;
      const body = [
        `${t.name}: ${data.get("name") || ""}`,
        `${t.company}: ${data.get("company") || ""}`,
        `${t.email}: ${data.get("email") || ""}`,
        `${t.phone}: ${data.get("phone") || ""}`,
        `${t.segment}: ${data.get("segment") || ""}`,
        "",
        `${data.get("message") || ""}`,
      ].join("\n");
      window.location.href =
        "mailto:agobee.info@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      const note = document.querySelector("#form-status");
      if (note) note.textContent = t.status;
    });
  }

  /* Theme toggle — dark is the brand default */
  const themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    const root = document.documentElement;
    const setIcon = () => {
      themeBtn.textContent = root.getAttribute("data-theme") === "light" ? "☾" : "☀";
    };
    setIcon();
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("agobee-theme", next);
      setIcon();
    });
  }

  /* Footer year */
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();

/* AGOBEE — premium visual effects */
(function () {
  "use strict";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Scroll progress hairline */
  const bar = document.createElement("div");
  bar.id = "scroll-progress";
  document.body.appendChild(bar);
  let ticking = false;
  const updateBar = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(updateBar); ticking = true; }
  }, { passive: true });
  updateBar();

  if (reduced) return;

  /* Gold dust particles in hero sections */
  const host = document.querySelector(".hero, .seg-hero");
  if (host) {
    const cv = document.createElement("canvas");
    cv.className = "dust";
    cv.setAttribute("aria-hidden", "true");
    host.appendChild(cv);
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, parts = [], raf = 0, t = 0;

    const spawn = (init) => ({
      x: Math.random() * W,
      y: init ? Math.random() * H : H + 8,
      r: 0.6 + Math.random() * 1.5,
      s: 0.1 + Math.random() * 0.28,
      a: 0.06 + Math.random() * 0.26,
      ph: Math.random() * Math.PI * 2,
    });
    const resize = () => {
      W = cv.width = host.clientWidth;
      H = cv.height = host.clientHeight;
      const n = Math.min(55, Math.round((W * H) / 24000));
      parts = Array.from({ length: n }, () => spawn(true));
    };
    const frame = () => {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      const light = document.documentElement.getAttribute("data-theme") === "light";
      const col = light ? "143,107,34" : "232,206,143";
      for (const p of parts) {
        p.y -= p.s;
        p.x += Math.sin(t * 0.7 + p.ph) * 0.15;
        if (p.y < -8) Object.assign(p, spawn(false));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    });
  }

  /* Subtle 3D tilt on packaging cards & product photos (desktop) */
  if (matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".sachet, .product-photo").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const rx = (((e.clientY - r.top) / r.height) - 0.5) * -4;
        const ry = (((e.clientX - r.left) / r.width) - 0.5) * 4;
        el.style.transform =
          `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* Count-up for trust numbers */
  const nums = Array.from(document.querySelectorAll(".trust-item .num"))
    .filter((el) => /^%?\d+$/.test(el.textContent.trim()));
  if (nums.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const el = entry.target;
        const txt = el.textContent.trim();
        const pct = txt.startsWith("%");
        const target = parseInt(txt.replace("%", ""), 10);
        const t0 = performance.now();
        const step = (now) => {
          const k = Math.min(1, (now - t0) / 1400);
          const eased = 1 - Math.pow(1 - k, 3);
          el.textContent = (pct ? "%" : "") + Math.round(target * eased);
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    nums.forEach((el) => io.observe(el));
  }
})();

/* AGOBEE — cinematic layer (Teralis-inspired signatures) */
(function () {
  "use strict";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const en = root.lang === "en";
  const isHome = !!document.querySelector(".hero");

  /* --- Preloader release (min 500ms, hard fallback 4s) --- */
  const t0 = performance.now();
  const release = () => {
    const wait = Math.max(0, 500 - (performance.now() - t0));
    setTimeout(() => {
      root.classList.remove("agb-loading");
      root.classList.add("agb-loaded");
    }, wait);
  };
  if (document.readyState === "complete") release();
  else window.addEventListener("load", release);
  setTimeout(() => {
    root.classList.remove("agb-loading");
    root.classList.add("agb-loaded");
  }, 4000);

  /* --- Heading line-mask wrap --- */
  document
    .querySelectorAll(".section-head .h2, .split-copy .h2, .cta-band .h2, .seg-hero-copy h1")
    .forEach((h) => {
      const mask = document.createElement("span");
      mask.className = "lm";
      const inner = document.createElement("span");
      inner.innerHTML = h.innerHTML;
      mask.appendChild(inner);
      h.textContent = "";
      h.appendChild(mask);
    });

  /* --- Smart sticky header (hide on down, return on up) --- */
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelector(".nav-links");
  if (header && !reduced) {
    let lastY = window.scrollY;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (navLinks && navLinks.classList.contains("open")) { lastY = y; return; }
      if (y > 320 && y > lastY + 6) header.classList.add("agb-hide");
      else if (y < lastY - 6 || y <= 320) header.classList.remove("agb-hide");
      lastY = y;
    }, { passive: true });
  }

  /* --- Scroll-top diamond --- */
  const top = document.createElement("button");
  top.className = "agb-top";
  top.setAttribute("aria-label", en ? "Back to top" : "Yukarı dön");
  top.innerHTML = "<span>↑</span>";
  document.body.appendChild(top);
  top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));
  window.addEventListener("scroll", () => {
    top.classList.toggle("on", window.scrollY > 700);
  }, { passive: true });

  if (reduced) return;

  /* --- Page-transition veil --- */
  const veil = document.createElement("div");
  veil.className = "agb-veil";
  veil.setAttribute("aria-hidden", "true");
  document.body.appendChild(veil);
  window.addEventListener("pageshow", () => veil.classList.remove("on"));
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") ||
        href.startsWith("http") || a.target === "_blank" ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (href.includes("#")) return;
    e.preventDefault();
    veil.classList.add("on");
    setTimeout(() => { window.location.href = href; }, 480);
  });

  /* --- Hero rotating ritual words --- */
  const tagline = document.querySelector(".hero .tagline");
  if (tagline) {
    const words = en
      ? ["Purity", "Elegance", "Trust", "Nature"]
      : ["Saflık", "Zarafet", "Güven", "Doğallık"];
    const rot = document.createElement("p");
    rot.className = "agb-rotator";
    rot.setAttribute("aria-hidden", "true");
    const stack = document.createElement("span");
    stack.className = "stack";
    words.forEach((w, i) => {
      const s = document.createElement("span");
      s.textContent = w;
      if (i === 0) s.className = "on";
      stack.appendChild(s);
    });
    rot.appendChild(stack);
    tagline.after(rot);
    let idx = 0;
    setInterval(() => {
      const spans = stack.children;
      spans[idx].className = "out";
      idx = (idx + 1) % spans.length;
      spans[idx].className = "on";
      const prev = (idx + spans.length - 1) % spans.length;
      setTimeout(() => { if (spans[prev].className === "out") spans[prev].className = ""; }, 650);
    }, 2600);
  }

  /* --- Scroll word-paint on the lead paragraph --- */
  const paintEl = isHome
    ? document.querySelector("main .section .section-head .lead")
    : document.querySelector(".seg-hero .lead");
  let paintWords = [];
  if (paintEl) {
    const words = paintEl.textContent.trim().split(/\s+/);
    paintEl.classList.add("agb-paint");
    paintEl.innerHTML = words.map((w) => `<span class="pw">${w}</span>`).join(" ");
    paintWords = Array.from(paintEl.querySelectorAll(".pw"));
  }

  /* --- Giant assembling watermark + marquee (home pages) --- */
  let asmLetters = [];
  const OFFSETS = [
    [-160, 70, -10], [110, -110, 7], [-80, -150, -5],
    [170, 90, 9], [-120, 50, 6], [130, -80, -8],
  ];
  if (isHome) {
    const splitSec = document.querySelector("main .split")?.closest("section");
    if (splitSec) {
      const asm = document.createElement("section");
      asm.className = "agb-assemble";
      asm.setAttribute("aria-hidden", "true");
      const word = document.createElement("div");
      word.className = "word";
      "AGOBEE".split("").forEach((ch) => {
        const s = document.createElement("span");
        s.textContent = ch;
        word.appendChild(s);
      });
      asm.appendChild(word);
      splitSec.before(asm);
      asmLetters = Array.from(word.children);
    }
    const main = document.querySelector("main");
    if (main) {
      const mq = document.createElement("section");
      mq.className = "agb-marquee";
      mq.setAttribute("aria-hidden", "true");
      const half = en
        ? "<span class='mi'>Agobee <i>◆</i> <b>Pure</b> <i>◆</i> Natural <i>◆</i> Hotel Collection <i>◆</i> Body Cleansing <i>◆</i></span>"
        : "<span class='mi'>Agobee <i>◆</i> <b>Saf</b> <i>◆</i> Doğal <i>◆</i> Hotel Collection <i>◆</i> Vücut Temizleme <i>◆</i></span>";
      mq.innerHTML = `<div class="track">${half}${half}</div>`;
      main.appendChild(mq);
    }
  }

  /* --- Shared scroll-driven updates --- */
  const vhOf = () => window.innerHeight;
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = vhOf();
    if (paintWords.length) {
      const r = paintEl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.86 - r.top) / (vh * 0.5)));
      const lit = Math.round(p * paintWords.length);
      paintWords.forEach((w, i) => w.classList.toggle("on", i < lit));
    }
    if (asmLetters.length) {
      const r = asmLetters[0].closest(".agb-assemble").getBoundingClientRect();
      const raw = (vh * 0.92 - r.top) / (vh * 0.75);
      const p = Math.min(1, Math.max(0, raw));
      const e = 1 - Math.pow(1 - p, 3);
      asmLetters.forEach((s, i) => {
        const [ox, oy, rot] = OFFSETS[i % OFFSETS.length];
        const k = 1 - e;
        s.style.transform = `translate(${ox * k}px, ${oy * k}px) rotate(${rot * k}deg)`;
        s.style.opacity = String(0.25 + 0.75 * e);
      });
    }
  };
  const onScroll = () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  /* --- Cursor halo + magnetic hero CTA (fine pointers) --- */
  if (matchMedia("(pointer: fine)").matches) {
    const ring = document.createElement("div");
    ring.className = "agb-ring";
    ring.setAttribute("aria-hidden", "true");
    document.body.appendChild(ring);
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY;
      ring.classList.add("show");
      const hov = e.target.closest("a, button, .btn, .sachet, .product-photo");
      ring.classList.toggle("hov", !!hov);
    });
    document.addEventListener("pointerleave", () => ring.classList.remove("show"));
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    const mag = document.querySelector(".hero .hero-ctas .btn");
    if (mag) {
      mag.classList.add("agb-mag");
      mag.addEventListener("pointermove", (e) => {
        const r = mag.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        mag.style.transform = `translate(${dx * 0.22}px, ${dy * 0.3}px)`;
      });
      mag.addEventListener("pointerleave", () => { mag.style.transform = ""; });
    }
  }
})();
