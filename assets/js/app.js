/* ==========================================================================
   Portfolio : petits comportements
   - carte des terrains (Leaflet) sur la page d'accueil
   - compteurs animés, apparitions au scroll
   - zoom sur les figures des pages projets
   Tout est optionnel : sans JS, le site reste lisible.
   ========================================================================== */

document.documentElement.classList.add("js");

/* Lieux affichés sur la carte. Pour en ajouter un : copier un bloc ci-dessous.
   `link` est relatif à la racine du site (laisser vide s'il n'y a pas de page). */
const SITES = [
  {
    name: "Antananarivo", country: "Madagascar", ll: [-18.8792, 47.5079],
    when: "2021 – 2025", short: "Studies · IOGA internship",
    text: "Physics and Applications, then Master 2 in Geomatics and Remote Sensing at the University of Antananarivo, plus an internship at IOGA.",
  },
  {
    name: "Ankarafantsika", country: "Madagascar", ll: [-16.32, 46.8],
    when: "2018 – 2023 maps", short: "National park · Sentinel-2",
    text: "Land cover (17 classes) and ecosystem accounts for a 136,513 ha national park.",
    link: "projects/ecosystem-accounting-ankarafantsika/", linkText: "Read the case study",
  },
  {
    name: "La Réunion", country: "France", ll: [-21.115, 55.536],
    when: "2025 – 2026", short: "Credit mobility · live bus data",
    text: "International credit mobility in Geomatics and Remote Sensing, and a live Car Jaune bus tracker built on GTFS-RT and PostGIS.",
    link: "projects/PostGIS_en/", linkText: "Open the notebook",
  },
  {
    name: "Île-de-France & Oise", country: "France", ll: [49.05, 2.45],
    when: "Feb – Jul 2026", short: "INERIS · garden detection",
    text: "U-Net trained on about 12,000 km² of 20 cm orthophotos, tested on a 25 × 25 km area of the Oise, with a road-traffic database for 94 departments.",
    link: "projects/sample-project/", linkText: "Read the case study",
  },
  {
    name: "Cape Town", country: "South Africa", ll: [-33.9249, 18.4241], home: true,
    when: "2026 – today", short: "Home base · MSc at Stellenbosch",
    text: "Based in Cape Town, MSc in Applied Mathematics at Stellenbosch University. Open to PhD positions and collaborations.",
    link: "contact/", linkText: "Get in touch",
  },
];
/* Ordre du trajet tracé en pointillés (indices dans SITES) */
const ROUTE = [0, 2, 3, 4];
const SPUR = [0, 1];            // Antananarivo -> Ankarafantsika (terrain)

function siteBase() {
  try {
    const cfg = JSON.parse(document.getElementById("__config").textContent);
    return new URL(cfg.base, location.href).href.replace(/\/?$/, "/");
  } catch (e) { return "/"; }
}

/* courbe de Bézier quadratique entre deux points (effet « trajet aérien ») */
function arc(a, b, bend) {
  const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const ctrl = [mid[0] + (b[1] - a[1]) * bend, mid[1] - (b[0] - a[0]) * bend];
  const pts = [];
  for (let t = 0; t <= 1.001; t += 1 / 48) {
    pts.push([
      (1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * ctrl[0] + t * t * b[0],
      (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * ctrl[1] + t * t * b[1],
    ]);
  }
  return pts;
}

function initFieldMap() {
  const el = document.getElementById("field-map");
  if (!el || !window.L || el.dataset.ready) return;
  el.dataset.ready = "1";

  const base = siteBase();
  const frame = el.closest(".mapframe");
  const map = L.map(el, { scrollWheelZoom: false, worldCopyJump: true, zoomSnap: 0.25, minZoom: 2, zoomControl: true });

  /* fond de carte Esri (gris clair / gris sombre), sans clé API.
     Deux couches : le fond, puis les noms par-dessus. */
  const esri = (name) => `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/${name}/MapServer/tile/{z}/{y}/{x}`;
  const attribution = "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ";
  const isDark = () => document.body.getAttribute("data-md-color-scheme") === "slate";
  let tiles = [];
  const loadTiles = () => {
    tiles.forEach((t) => map.removeLayer(t));
    const k = isDark() ? "World_Dark_Gray" : "World_Light_Gray";
    tiles = [
      L.tileLayer(esri(k + "_Base"), { attribution, maxZoom: 12 }),
      L.tileLayer(esri(k + "_Reference"), { maxZoom: 12 }),
    ];
    tiles.forEach((t) => t.addTo(map));
  };
  loadTiles();
  new MutationObserver(loadTiles).observe(document.body, { attributes: true, attributeFilter: ["data-md-color-scheme"] });

  /* trajets */
  const css = (v) => getComputedStyle(document.body).getPropertyValue(v).trim() || "#d9481f";
  for (let i = 0; i < ROUTE.length - 1; i++) {
    L.polyline(arc(SITES[ROUTE[i]].ll, SITES[ROUTE[i + 1]].ll, 0.18), {
      color: css("--accent"), weight: 2, opacity: 0.9, className: "route", interactive: false,
    }).addTo(map);
  }
  L.polyline(arc(SITES[SPUR[0]].ll, SITES[SPUR[1]].ll, 0.25), {
    color: css("--accent"), weight: 1.6, opacity: 0.8, className: "route", interactive: false,
  }).addTo(map);

  /* liste des lieux (générée depuis SITES) */
  const list = document.getElementById("site-list");
  list.innerHTML = SITES.map((s) =>
    `<li class="${s.home ? "is-home" : ""}"><button type="button"><strong>${s.name}</strong>` +
    `<small>${s.when} · ${s.short}</small></button></li>`).join("");
  const items = list.querySelectorAll("li");

  /* pins */
  const markers = SITES.map((s, i) => {
    const icon = L.divIcon({
      className: "pin" + (s.home ? " pin--home" : ""),
      html: `<span>${i + 1}</span>`, iconSize: [26, 26], iconAnchor: [13, 13], popupAnchor: [0, -14],
    });
    const m = L.marker(s.ll, { icon, keyboard: true, title: s.name }).addTo(map);
    const link = s.link ? `<a class="pop__link" href="${base}${s.link}">${s.linkText || "Read more"} →</a>` : "";
    m.bindPopup(
      `<div class="pop__when">${s.when}</div><h4 class="pop__name">${s.name}, ${s.country}</h4>` +
      `<p class="pop__text">${s.text}</p>${link}`,
      { maxWidth: 270, closeButton: true, autoPanPadding: [40, 40] }
    );
    m.on("popupopen", () => mark(i));
    m.on("popupclose", () => mark(-1));
    return m;
  });

  function mark(idx) {
    items.forEach((li, i) => li.classList.toggle("is-on", i === idx));
    markers.forEach((m, i) => m.getElement() && m.getElement().classList.toggle("is-on", i === idx));
  }

  /* liste à droite : un clic centre la carte sur le lieu */
  items.forEach((li, i) => {
    li.querySelector("button").addEventListener("click", () => {
      const zoom = i === 3 ? 7 : i === 4 ? 8 : 6;
      map.flyTo(SITES[i].ll, zoom, { duration: 1.2 });
      map.once("moveend", () => markers[i].openPopup());
    });
  });

  const bounds = L.latLngBounds(SITES.map((s) => s.ll));
  const fit = () => map.fitBounds(bounds, { padding: [48, 48], maxZoom: 4 });
  fit();
  frame.querySelector(".mapframe__reset")?.addEventListener("click", () => { map.closePopup(); fit(); });

  /* la molette ne zoome qu'après un clic : on évite de piéger le scroll de la page */
  map.on("focus click", () => { map.scrollWheelZoom.enable(); frame.classList.add("is-active"); });
  map.on("blur mouseout", () => { map.scrollWheelZoom.disable(); });
  setTimeout(() => map.invalidateSize(), 300);
}

/* compteurs : 0 -> valeur au premier affichage */
function initCounters() {
  const els = document.querySelectorAll("[data-count]");
  if (!els.length || !("IntersectionObserver" in window)) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = (v, d) => v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const end = parseFloat(e.target.dataset.count);
      const dec = parseInt(e.target.dataset.decimals || "0", 10);
      if (reduce) return;
      const t0 = performance.now(), dur = 1400;
      (function tick(now) {
        const p = Math.min((now - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        e.target.textContent = fmt(end * eased, dec);
        if (p < 1) requestAnimationFrame(tick); else e.target.textContent = fmt(end, dec);
      })(t0);
    });
  }, { threshold: 0.6 });
  els.forEach((el) => io.observe(el));
}

/* apparitions douces au scroll */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach((el) => io.observe(el));
}

/* clic sur une figure d'un article : affichage plein écran */
function initLightbox() {
  document.querySelectorAll(".md-content__inner > p > img").forEach((img) => {
    if (img.dataset.zoom) return;
    img.dataset.zoom = "1";
    img.loading = "lazy";
    img.addEventListener("click", () => {
      const box = document.createElement("div");
      box.className = "lightbox";
      box.innerHTML = `<img src="${img.currentSrc || img.src}" alt="${img.alt || ""}">`;
      const close = () => { box.remove(); document.removeEventListener("keydown", onKey); };
      const onKey = (ev) => ev.key === "Escape" && close();
      box.addEventListener("click", close);
      document.addEventListener("keydown", onKey);
      document.body.appendChild(box);
    });
  });
}

function boot() { initFieldMap(); initCounters(); initReveal(); initLightbox(); }
if (window.document$) window.document$.subscribe(boot);
else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
