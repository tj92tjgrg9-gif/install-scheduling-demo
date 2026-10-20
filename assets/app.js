/* Standalone installation scheduling demo: shared header, state, slide-out and page renderers. */
(function () {
  const D = window.BBY_DATA;
  const TAX = 0.08025;
  const SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  /* ---------- Icons ---------- */
  const P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/>',
    cart: '<path d="M2.5 4H5l2.3 10.6a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 1.9-1.5L21 8H6"/><circle cx="10" cy="20" r="1.4"/><circle cx="17.5" cy="20" r="1.4"/>',
    store: '<path d="M4 10v10h16V10"/><path d="M3 10l1.6-6h14.8L21 10"/><path d="M3 10c0 1.4 1 2.4 2.3 2.4S7.6 11.4 7.6 10c0 1.4 1 2.4 2.2 2.4s2.2-1 2.2-2.4c0 1.4 1 2.4 2.2 2.4s2.2-1 2.2-2.4c0 1.4 1 2.4 2.3 2.4S21 11.4 21 10"/><path d="M9 20v-5h6v5"/>',
    user: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="10" r="3.2"/><path d="M6 18.5c1.4-2.3 3.5-3.5 6-3.5s4.6 1.2 6 3.5"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    right: '<path d="M9 6l6 6-6 6"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
    car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    truck: '<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    flame: '<path d="M12 3c1 4 5.5 5.5 5.5 10.5a5.5 5.5 0 0 1-11 0c0-2.7 1.6-3.8 2.2-5.4 1 1 1.6 2 1.6 3.2C12 9.7 12.6 6.5 12 3z"/>',
    bill: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><circle cx="12" cy="11.5" r="2.6"/>',
    bubble: '<path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><circle cx="9" cy="10.5" r="1"/><circle cx="15" cy="10.5" r="1"/>',
    speaker2: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'
  };
  function ic(name, size, sw) {
    size = size || 20;
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw || 2}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name]}</svg>`;
  }

  // Line illustrations for each service tile (64x64).
  const ILL = {
    stereo: '<rect x="3" y="13" width="58" height="37" rx="3"/><rect x="20" y="16.5" width="36" height="2" rx="1"/><rect x="7" y="16.5" width="5" height="2" rx="1"/><path d="M7 24h6M7 29h6"/><circle cx="10" cy="37" r="3.5"/><rect x="8.5" y="43" width="3" height="4" rx=".8"/><rect x="17" y="22" width="40" height="25" rx="1.5"/><path d="M43 25.5 31.5 30.5l6 1.2 1.2 6z" fill="currentColor"/><path d="M17 38h40"/><rect x="20" y="40.5" width="6" height="4.5" rx="1"/><rect x="29" y="40.5" width="6" height="4.5" rx="1"/><rect x="38" y="40.5" width="6" height="4.5" rx="1"/><rect x="47" y="40.5" width="6" height="4.5" rx="1"/>',
    dashcam: '<path d="M32 8v8"/><path d="M24 8h16"/><rect x="14" y="16" width="36" height="26" rx="5"/><circle cx="32" cy="29" r="8"/><circle cx="32" cy="29" r="3"/><circle cx="44" cy="21" r="1.2"/><path d="M8 54c8-4 40-4 48 0"/>',
    dashcam2: '<path d="M24 8v7M18 8h12"/><rect x="8" y="15" width="32" height="22" rx="5"/><circle cx="24" cy="26" r="7"/><circle cx="24" cy="26" r="2.5"/><rect x="42" y="38" width="16" height="12" rx="3"/><circle cx="50" cy="44" r="3"/><path d="M40 30c6 0 8 2 10 8" stroke-dasharray="3 3"/>',
    remote: '<rect x="20" y="14" width="24" height="42" rx="12"/><circle cx="32" cy="27" r="4"/><circle cx="32" cy="39" r="2.5"/><circle cx="32" cy="47" r="2.5"/><path d="M24 9a12 12 0 0 1 16 0M27 5a8 8 0 0 1 10 0" />',
    mirror: '<path d="M32 8v10"/><rect x="4" y="18" width="56" height="22" rx="11"/><rect x="34" y="23" width="18" height="12" rx="2"/><path d="M16 50h32" /><path d="M24 50l3-6h10l3 6"/>',
    camera: '<rect x="16" y="20" width="32" height="20" rx="4"/><circle cx="32" cy="30" r="6"/><circle cx="32" cy="30" r="2"/><path d="M22 40v8h20v-8"/><path d="M12 52h40"/>',
    speaker: '<rect x="7" y="7" width="50" height="50" rx="14"/><circle cx="32" cy="32" r="20"/><circle cx="32" cy="32" r="14"/><circle cx="32" cy="32" r="5.5"/><circle cx="32" cy="32" r="2"/><circle cx="13.5" cy="13.5" r="1.4"/><circle cx="50.5" cy="13.5" r="1.4"/><circle cx="13.5" cy="50.5" r="1.4"/><circle cx="50.5" cy="50.5" r="1.4"/>',
    amp: '<path d="M10 16h44l6 8H4z"/><path d="M14 17l-2 6M18 17l-1 6M22 17v6M42 17v6M46 17l1 6M50 17l2 6"/><path d="M6 24L3 28 6 32 3 36 6 40 3 44 6 48M58 24l3 4-3 4 3 4-3 4 3 4-3 4M2 48h60"/><rect x="9" y="29" width="17" height="13" rx="1.5"/><circle cx="13.5" cy="35.5" r="2.5"/><circle cx="17.5" cy="35.5" r="1"/><circle cx="21.5" cy="35.5" r="2.5"/><rect x="28" y="31" width="9" height="9" rx="1.5"/><circle cx="30.5" cy="35.5" r=".9"/><circle cx="34.5" cy="35.5" r=".9"/><rect x="39" y="29" width="16" height="13" rx="1.5"/><circle cx="43.5" cy="35.5" r="2.5"/><circle cx="50.5" cy="35.5" r="2.5"/>',
    stereo1din: '<rect x="3" y="23" width="58" height="19" rx="3"/><circle cx="12" cy="32.5" r="5.5"/><circle cx="12" cy="32.5" r="1.5"/><rect x="21" y="27" width="25" height="7" rx="1"/><path d="M24 30.5h11M38 30.5h4"/><path d="M21 38.5h2.5M26 38.5h2.5M31 38.5h2.5M36 38.5h2.5M41 38.5h2.5"/><rect x="50" y="27" width="7" height="3.5" rx="1"/><circle cx="53.5" cy="36.5" r="1.3"/>',
    component: '<circle cx="26" cy="38" r="18"/><circle cx="26" cy="38" r="13"/><circle cx="26" cy="38" r="9"/><circle cx="26" cy="38" r="3.5"/><circle cx="15" cy="27" r="1.2"/><circle cx="37" cy="27" r="1.2"/><circle cx="15" cy="49" r="1.2"/><circle cx="37" cy="49" r="1.2"/><circle cx="51" cy="15" r="8"/><circle cx="51" cy="15" r="4.5"/>',
    sub: '<path d="M6 56V22l40-8v42z"/><path d="M46 14l12 6v36H46"/><circle cx="26" cy="37" r="12"/><circle cx="26" cy="37" r="6"/><circle cx="26" cy="37" r="1.5"/><circle cx="52" cy="29" r="2.2"/><circle cx="52" cy="39" r=".9"/><circle cx="52" cy="45" r=".9"/>',
    wrench: '<path d="M39 17a2.6 2.6 0 0 0 0 3.7l4.3 4.3a2.6 2.6 0 0 0 3.7 0l10-10a16 16 0 0 1-21 21L17.6 54.4a5.6 5.6 0 0 1-8-8L28 28a16 16 0 0 1 21-21z"/>',
    cal: '<rect x="8" y="12" width="48" height="42" rx="5"/><path d="M8 24h48M20 6v10M44 6v10"/><path d="M24 39l6 6 11-12"/>'
  };
  function art(svc, cls, ill) {
    return `<div class="art ${cls || ""}"><svg class="ill" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ILL[ill || svc.icon]}</svg><div class="band">${ic("store", 18)}In-Store Service</div></div>`;
  }

  const LOGO = '<svg width="66" height="46" viewBox="0 0 66 46" aria-label="Best Buy"><g font-family="Arial Black, Arial, sans-serif" font-weight="900" fill="#fff" font-size="21" letter-spacing="-1.2"><text x="0" y="19">BEST</text><text x="1" y="40">BUY</text></g><path d="M51.5 30h10.5l3.5 5-3.5 5H51.5z" fill="#ffe000"/><circle cx="55" cy="35" r="1.6" fill="#0046be"/></svg>';

  /* ---------- Helpers ---------- */
  const $ = (s, el) => (el || document).querySelector(s);
  const money = n => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  function price(n, cls) {
    const [w, c] = n.toFixed(2).split(".");
    return `<span class="price ${cls || ""}"><span class="d">$</span><span class="w">${Number(w).toLocaleString("en-US")}</span><span class="c">${c}</span></span>`;
  }
  let sid = 0;
  function stars(r, n, compact) {
    const id = "sg" + (++sid), pct = (r / 5) * 100;
    const paths = [0, 1, 2, 3, 4].map(i => `<path transform="translate(${i * 17} 0)" d="M8 .9l2.2 4.6 5 .7-3.6 3.5.9 5L8 12.3 3.5 14.7l.9-5L.8 6.2l5-.7z"/>`).join("");
    const svg = `<svg width="84" height="16" viewBox="0 0 84 16"><defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" x2="84"><stop offset="${pct}%" stop-color="#ffce00"/><stop offset="${pct}%" stop-color="#fff"/></linearGradient></defs><g fill="url(#${id})" stroke="#1d252c" stroke-width=".9" stroke-linejoin="round">${paths}</g></svg>`;
    return `<span class="stars">${svg}<span class="num">${r.toFixed(1)}</span><span class="cnt">(${n.toLocaleString("en-US")}${compact ? "" : " reviews"})</span></span>`;
  }
  const svcBy = sku => D.services.find(s => s.sku === sku);
  const storeBy = id => D.stores.find(s => s.id === id) || D.stores[0];
  const vehText = v => v ? `${v.year} ${v.make} ${v.model}` : "";
  const hash = str => { let x = 7; for (const ch of str) x = (x * 31 + ch.charCodeAt(0)) | 0; return Math.abs(x); };
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const fromIso = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const fmtDay = s => fromIso(s).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const hrs = h => h === 1 ? "about 1 hour" : `about ${h} hours`;

  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("on");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("on"), 2600);
  }

  /* ---------- State (localStorage, with in-memory fallback) ---------- */
  const KEY = "bbyInstallDemo";
  let mem = null;
  function load() {
    if (mem) return mem;
    let s = null;
    try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) { /* storage unavailable */ }
    mem = s || { cart: [], vehicle: null, store: "maple-grove" };
    return mem;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* ignore */ }
    updateBadge();
    window.dispatchEvent(new Event("demo:change"));
  }
  const state = () => load();

  /* ---------- Availability (deterministic per service, store and day) ---------- */
  function days(sku, storeId) {
    const out = [], today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const key = iso(d);
      let slots = SLOTS.filter(s => hash(sku + storeId + key + s) % 10 >= 4);
      if (d.getDay() === 0) slots = slots.filter(s => ["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"].includes(s));
      if (i === 4) slots = [];
      if (i === 1 && !slots.length) slots = ["2:00 PM"];
      out.push({ key, d, slots });
    }
    return out;
  }
  const firstAvail = (sku, storeId) => days(sku, storeId).find(x => x.slots.length);

  /* ---------- Parts (vehicle-specific package, or the service's generic list) ---------- */
  function fitmentFor(svc, v) {
    if (!svc.fit || !v || !v.year) return null;
    const y = Number(v.year);
    return D.fitments.find(f => f.kind === svc.fit && (f.universal || (f.make === v.make && f.model === v.model && y >= f.years[0] && y <= f.years[1]))) || null;
  }
  const partsKey = (svc, v) => (fitmentFor(svc, v) || { id: "generic" }).id;
  // A speaker location can carry its own parts; otherwise the fitment's groups apply.
  function groupsFor(f, locId) {
    const loc = f.locations ? f.locations.find(l => l.id === locId) || f.locations[0] : null;
    return (loc && loc.groups) || f.groups || [];
  }
  const groupOptions = g => g.options.map(o => Object.assign({ id: o.sku, group: g.id }, o));
  function partsCatalog(svc, v) {
    const f = fitmentFor(svc, v);
    if (!f) return svc.parts.map(p => Object.assign({ avail: "store" }, p));
    const all = (f.groups || []).concat(...(f.locations || []).map(l => l.groups || [])).flatMap(groupOptions);
    return all.filter((o, i) => all.findIndex(x => x.id === o.id) === i);
  }
  function defaultParts(svc, v, locId) {
    const f = fitmentFor(svc, v);
    return f ? groupsFor(f, locId).flatMap(g => g.options.filter(o => o.rec).map(o => o.sku)) : svc.parts.filter(p => p.required).map(p => p.id);
  }
  function pickedParts(svc, v, ids) {
    return partsCatalog(svc, v).filter(p => ids.includes(p.id)).flatMap(p => p.labor
      ? [p, { id: p.id + "-labor", sku: p.labor.sku, name: p.labor.name, price: p.labor.price, avail: "store", laborFor: p.id }]
      : [p]);
  }
  function locationFor(svc, v, locId) {
    const f = fitmentFor(svc, v);
    return f && f.locations ? f.locations.find(l => l.id === locId) || f.locations[0] : null;
  }
  const locSpecs = l => [l.where, l.size, l.impedance].filter(Boolean).join(" · ");

  // Online-only parts ship to the store first, so the earliest appointments are held back.
  const SHIP_DAYS = 3;
  function apptDays(sku, storeId, parts) {
    const lead = parts.some(p => p.avail === "online") ? SHIP_DAYS : 0;
    return days(sku, storeId).map((x, i) => i < lead ? Object.assign({}, x, { slots: [], shipping: true }) : x);
  }

  /* ---------- Header / footer ---------- */
  function header() {
    const st = storeBy(state().store);
    return `
    <div class="demo-bar"><div class="wrap"><span>Prototype: scheduling for standalone installation services. Not a live Best Buy site.</span><button type="button" data-reset>Reset demo</button></div></div>
    <header class="hdr"><div class="wrap">
      <div class="hdr-top">
        <a class="logo" href="index.html">${LOGO}</a>
        <form class="search" onsubmit="return false"><input type="search" placeholder="Search Best Buy" aria-label="Search Best Buy"><button type="submit" aria-label="Search">${ic("search", 22)}</button></form>
        <div class="hdr-right">
          <a class="hdr-link store" href="#">${ic("store", 26, 1.6)}<span>Your store<b>${st.name}</b></span></a>
          <a class="hdr-link acct" href="#">${ic("user", 26, 1.6)}<span>Account<b>Sign in</b></span></a>
          <span class="hdr-sep"></span>
          <a class="hdr-link cart-link" href="cart.html" aria-label="Cart">${ic("cart", 28, 1.7)}<span class="cart-badge" hidden></span></a>
        </div>
      </div>
      <nav class="hdr-nav">
        <a class="nav-pill solid" href="#">${ic("bubble", 18)}Ask Blue</a>
        <a class="nav-pill" href="#">Shop ${ic("down", 16)}</a>
        <a class="nav-pill" href="#">Deals ${ic("down", 16)}</a>
        <a class="nav-pill" href="index.html">Support &amp; Services ${ic("down", 16)}</a>
        <a class="nav-pill" href="#">Discover ${ic("down", 16)}</a>
        <div class="nav-links"><a href="#">Top Deals</a><a href="#">Deal of the Day</a><a href="#">Trade-In</a><a href="#">Gift Ideas</a><a href="#">More</a></div>
      </nav>
    </div></header>`;
  }
  function footer() {
    return `<footer class="ftr"><div class="wrap"><span>Demo prototype for internal review. Prices, SKUs, parts and appointment times are illustrative.</span><span>Geek Squad® Autotech Services</span></div></footer>`;
  }
  function updateBadge() {
    const b = $(".cart-badge"); if (!b) return;
    const n = state().cart.length;
    b.textContent = n; b.hidden = !n;
  }
  function chrome() {
    $("#hdr").innerHTML = header();
    $("#ftr").innerHTML = footer();
    updateBadge();
    $("[data-reset]").addEventListener("click", () => {
      try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
      mem = null; location.reload();
    });
  }
  function crumbs(items) {
    return `<nav class="crumbs">${items.map((t, i) => i === items.length - 1 ? `<span class="end">${t}</span>` : `<a href="index.html">${t}</a>${ic("right", 12)}`).join("")}<a class="gs" href="#">Shop Geek Squad®</a></nav>`;
  }

  /* ---------- Vehicle selector (PLP and PDP) ---------- */
  const EMPTY_VEH = () => ({ year: "", make: "", model: "", trim: "" });
  // Selector choices come from D.vehicles, so each year only offers vehicles we have parts for.
  const YEARS = [...new Set(D.vehicles.flatMap(v => { const ys = []; for (let y = v.years[0]; y <= v.years[1]; y++) ys.push(y); return ys; }))].sort((a, b) => b - a);
  const inYear = (v, year) => Number(year) >= v.years[0] && Number(year) <= v.years[1];
  const makesFor = year => [...new Set(D.vehicles.filter(v => inYear(v, year)).map(v => v.make))];
  const modelsFor = (year, make) => D.vehicles.filter(v => inYear(v, year) && v.make === make).map(v => v.model);
  const trimsFor = v => (D.vehicles.find(x => x.make === v.make && x.model === v.model) || { trims: [] }).trims;
  // Trim select: waits for a model, then shows that model's trims or says none are needed.
  const trimSelect = (v, open, ph) => {
    const trims = v.model ? trimsFor(v) : [];
    if (v.model && !trims.length) return `${open} disabled><option value="">No trim needed</option></select>`;
    return `${open} ${v.model ? "" : "disabled"}>${vehOptions(trims, v.trim, ph)}</select>`;
  };
  function vehOptions(list, cur, ph) {
    return `<option value="">${ph}</option>` + list.map(x => `<option ${String(x) === String(cur) ? "selected" : ""}>${x}</option>`).join("");
  }
  function vehSelects(v, attr) {
    return `
      <select ${attr}="year" aria-label="Year">${vehOptions(YEARS, v.year, "Year")}</select>
      <select ${attr}="make" aria-label="Make" ${v.year ? "" : "disabled"}>${vehOptions(v.year ? makesFor(v.year) : [], v.make, "Make")}</select>
      <select ${attr}="model" aria-label="Model" ${v.make ? "" : "disabled"}>${vehOptions(v.make ? modelsFor(v.year, v.make) : [], v.model, "Model")}</select>
      ${trimSelect(v, `<select ${attr}="trim" aria-label="Trim"`, "Trim")}`;
  }
  // Clears the fields after the one that changed, so a new make never keeps an old model.
  function setVehField(v, field, value) {
    const order = ["year", "make", "model", "trim"];
    v[field] = value;
    order.slice(order.indexOf(field) + 1).forEach(f => { v[f] = ""; });
  }

  let vs = { editing: false, draft: EMPTY_VEH() };
  function vehicleBox(o) {
    const v = state().vehicle;
    if (vehComplete(v) && !vs.editing) {
      return `<div class="fit"><span class="ic">${ic("car", 30, 1.7)}</span><div><div><b>${o.fits}</b> ${vehText(v)}.</div><div class="links"><button class="link" data-vs-change>Change vehicle</button><span class="link-sep"></span><button class="link" data-vs-remove>Remove vehicle</button></div></div></div>`;
    }
    const d = vs.draft;
    return `<div class="vs"><h3>${o.prompt}</h3><div class="vs-row">${vehSelects(d, "data-vs")}<button class="btn vs-go" data-vs-go ${vehComplete(d) ? "" : "disabled"}>${o.button}</button></div>${vs.editing ? '<button class="link vs-cancel" data-vs-cancel>Cancel</button>' : ""}</div>`;
  }
  // Wires the selector inside `root`; `redraw` re-renders just the box while the shopper picks.
  function bindVehicleBox(root, redraw) {
    root.addEventListener("change", e => {
      const f = e.target.dataset.vs;
      if (!f) return;
      setVehField(vs.draft, f, e.target.value);
      redraw();
    });
    root.addEventListener("click", e => {
      const t = e.target;
      if (t.closest("[data-vs-go]")) { state().vehicle = Object.assign({}, vs.draft); vs.editing = false; return save(); }
      if (t.closest("[data-vs-change]")) { vs.editing = true; vs.draft = Object.assign(EMPTY_VEH(), state().vehicle); return redraw(); }
      if (t.closest("[data-vs-cancel]")) { vs.editing = false; return redraw(); }
      if (t.closest("[data-vs-remove]")) { state().vehicle = null; vs.draft = EMPTY_VEH(); vs.editing = false; return save(); }
    });
  }

  /* ---------- Slide-out ---------- */
  const STEPS = ["Vehicle", "Parts", "Appointment", "Cart"];
  let dr = null; // working state for the open drawer

  function ensureDrawer() {
    if ($(".drawer")) return;
    document.body.insertAdjacentHTML("beforeend", `<div class="scrim"></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="Add professional installation"></aside>`);
    $(".scrim").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", e => { if (e.key === "Escape" && dr) closeDrawer(); });
    $(".drawer").addEventListener("click", onDrawerClick);
    $(".drawer").addEventListener("change", onDrawerChange);
  }

  function openInstall(sku, opts) {
    opts = opts || {};
    ensureDrawer();
    const s = state(), svc = svcBy(sku);
    const item = opts.editId ? s.cart.find(c => c.id === opts.editId) : null;
    const veh = item ? item.vehicle : s.vehicle;
    dr = {
      sku, svc, editId: item ? item.id : null,
      vehicle: Object.assign(EMPTY_VEH(), veh),
      store: item ? item.store : s.store,
      date: item ? item.date : null,
      time: item ? item.time : null,
      parts: item ? item.parts.slice() : defaultParts(svc, veh),
      partsKey: partsKey(svc, veh),
      loc: item && item.loc ? item.loc : null,
      showStores: false,
      step: opts.step != null ? opts.step : (vehComplete(veh) ? 1 : 0)
    };
    ensureDate();
    renderDrawer(true);
    requestAnimationFrame(() => { $(".scrim").classList.add("on"); $(".drawer").classList.add("on"); });
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    if (!$(".drawer")) return;
    $(".scrim").classList.remove("on"); $(".drawer").classList.remove("on");
    document.body.style.overflow = "";
    dr = null;
  }

  const vehComplete = v => !!(v && v.year && v.make && v.model && (v.trim || !trimsFor(v).length));
  const drParts = () => pickedParts(dr.svc, dr.vehicle, dr.parts);
  const partsTotal = () => drParts().reduce((a, p) => a + p.price, 0);
  const drDays = storeId => apptDays(dr.sku, storeId || dr.store, drParts());
  // Keeps the chosen date and time valid after the store or parts change.
  function ensureDate() {
    const ds = drDays(), day = ds.find(x => x.key === dr.date);
    if (!day || !day.slots.length) { const f = ds.find(x => x.slots.length); dr.date = f ? f.key : null; }
    const cur = ds.find(x => x.key === dr.date);
    if (!cur || !cur.slots.includes(dr.time)) dr.time = null;
  }

  function stepper(cur) {
    return `<div class="stepper">${STEPS.map((l, i) => `<div class="s ${i < cur ? "done" : i === cur ? "cur" : ""}"><span class="dot">${i < cur ? ic("check", 16, 3) : ""}</span>${l}</div>`).join("")}</div>`;
  }
  function svcHead() {
    const svc = dr.svc;
    return `<div class="svc-head">${art(svc, "xs")}<div><div class="n">${svc.name}</div><div class="m">SKU: ${svc.sku} · Takes ${hrs(svc.hours)}</div></div>${price(svc.price, "p-md")}</div>`;
  }
  function fitBanner() {
    return `<div class="fit"><span class="ok">${ic("check", 16, 3)}</span><div><div><b>This service fits your</b> ${vehText(dr.vehicle)}.</div><div class="links"><button class="link" data-act="veh-change">Change vehicle</button><span class="link-sep"></span><button class="link" data-act="veh-remove">Remove vehicle</button></div></div></div>`;
  }

  function stepVehicle() {
    const v = dr.vehicle;
    const field = (f, label, list, disabled) => `<div class="field"><label for="v-${f}">${label}</label><select id="v-${f}" data-veh="${f}" ${disabled ? "disabled" : ""}>${vehOptions(list, v[f], "Select " + label.toLowerCase())}</select></div>`;
    return `
      <h2 class="dr-title">${ic("car", 36, 1.8)}Tell us about your vehicle</h2>
      ${svcHead()}
      <div class="dr-sub"><h3>Your vehicle</h3></div>
      <p class="dr-help">We'll confirm this service fits and show the parts your installation needs.</p>
      <div class="fields">
        ${field("year", "Year", YEARS, false)}
        ${field("make", "Make", v.year ? makesFor(v.year) : [], !v.year)}
        ${field("model", "Model", v.make ? modelsFor(v.year, v.make) : [], !v.make)}
        <div class="field"><label for="v-trim">Trim</label>${trimSelect(v, `<select id="v-trim" data-veh="trim"`, "Select trim")}</div>
      </div>
      ${vehComplete(v) ? `<div class="note ok">${ic("check", 18, 2.5)}<span><b>Good news:</b> ${dr.svc.name} is available for your ${vehText(v)}.</span></div>` : ""}`;
  }

  function stepAppt() {
    const svc = dr.svc, st = storeBy(dr.store), ds = drDays();
    const day = ds.find(x => x.key === dr.date);
    const shipping = drParts().filter(p => p.avail === "online");
    const stores = dr.showStores ? D.stores.map(s => `
      <label class="sel-card ${s.id === dr.store ? "on" : ""}"><input type="radio" name="store" value="${s.id}" ${s.id === dr.store ? "checked" : ""} data-store><div><div class="n">${s.name}</div><div class="d">${s.addr}</div></div><div class="r">${s.dist}<div class="d" style="font-weight:400">Next: ${fmtDay(drDays(s.id).find(x => x.slots.length).key)}</div></div></label>`).join("") : "";
    return `
      <h2 class="dr-title">${ic("wrench", 36, 1.8)}Schedule your installation</h2>
      <div class="dr-sub"><h3>Installation location</h3><button class="link" data-act="toggle-stores">${dr.showStores ? "Done" : "Change store"}</button></div>
      <p class="dr-help">Current store: ${st.name} · ${st.dist}</p>
      ${stores}
      <div class="dr-sub"><h3>Choose a date</h3></div>
      <p class="dr-help">Installation takes ${hrs(svc.hours)}. Drop off your vehicle at your appointment time.</p>
      ${shipping.length ? `<div class="note ship">${ic("truck", 18)}<span><b>${shipping.map(p => p.model).join(", ")} ships to ${st.name}.</b> It's available online only, so appointments start ${fmtDay(ds.find(x => x.slots.length).key)}. Remove it in Parts for earlier times.</span></div>` : ""}
      <div class="dates">${ds.map(x => {
        const wd = x.d.toLocaleDateString("en-US", { weekday: "short" }), mo = x.d.toLocaleDateString("en-US", { month: "short" });
        return `<button class="date ${x.key === dr.date ? "on" : ""}" data-date="${x.key}" ${x.slots.length ? "" : "disabled"}>${wd}<b>${x.d.getDate()}</b>${mo}<div class="a">${x.slots.length ? x.slots.length + " open" : x.shipping ? "Parts en route" : "Full"}</div></button>`;
      }).join("")}</div>
      <div class="dr-sub"><h3>Choose a time</h3></div>
      <p class="dr-help">${day ? fmtDay(day.key) + " at " + st.name : "Select a date to see times."}</p>
      <div class="slots">${SLOTS.map(t => {
        const ok = day && day.slots.includes(t);
        return `<button class="slot ${ok && t === dr.time ? "on" : ""}" data-time="${t}" ${ok ? "" : "disabled"}>${t}</button>`;
      }).join("")}</div>`;
  }

  function partCard(o, type, name, on) {
    const tag = o.rec ? '<span class="req">Recommended for most installs</span>' : type === "radio" ? '<span class="alt">Alternate</span>' : "";
    const meta = o.model ? `Model: ${o.model} · SKU: ${o.sku}` : `Fits your ${vehText(dr.vehicle)}`;
    const avail = o.avail === "online" ? `<span class="avail online">${ic("truck", 13)}Online only, ships to store</span>` : `<span class="avail">${ic("check", 13, 3)}Available at store</span>`;
    return `<label class="sel-card ${on ? "on" : ""}"><input type="${type}" ${name ? `name="${name}"` : ""} value="${o.id}" ${on ? "checked" : ""} data-part="${type}" data-group="${o.group || ""}"><div><div class="n">${o.name}${tag}</div><div class="d">${meta}</div>${o.note ? `<div class="d">${o.note}</div>` : ""}${o.labor ? `<div class="d">Adds ${o.labor.name.toLowerCase()}, ${money(o.labor.price)} (SKU ${o.labor.sku})</div>` : ""}<div class="d">${avail}</div></div><div class="r">${money(o.price)}${o.labor ? `<div class="d" style="font-weight:400">+ ${money(o.labor.price)} labor</div>` : ""}</div></label>`;
  }
  function stepParts() {
    const svc = dr.svc, f = fitmentFor(svc, dr.vehicle);
    let body;
    if (f) {
      const loc = locationFor(svc, dr.vehicle, dr.loc);
      const locs = f.locations ? `<div class="grp-h"><h3>Which pair?</h3><span>Choose one</span></div>` + f.locations.map(l =>
        `<label class="sel-card ${l.id === loc.id ? "on" : ""}"><input type="radio" name="loc" value="${l.id}" ${l.id === loc.id ? "checked" : ""} data-loc><div><div class="n">${l.label}</div><div class="d">${locSpecs(l)}</div>${l.note ? `<div class="d">${l.note}</div>` : ""}</div><div class="r"></div></label>`).join("") +
        `<p class="dr-help" style="margin-top:4px">This service covers one pair. Add it again for the other pair.</p>` : "";
      body = `<div class="note ok">${ic("check", 18, 2.5)}<span><b>${f.universal ? "Recommended parts for this installation." : `Parts matched to your ${vehText(dr.vehicle)}.`}</b> We've selected the recommended package. Swap in an alternate, or remove anything you already have.</span></div>` + locs +
        groupsFor(f, loc && loc.id).map(g => {
          const opts = groupOptions(g);
          const cards = opts.map(o => partCard(o, g.pick === "one" ? "radio" : "checkbox", g.pick === "one" ? "grp-" + g.id : "", dr.parts.includes(o.id))).join("");
          const none = g.pick === "one" ? `<label class="sel-card none ${opts.some(o => dr.parts.includes(o.id)) ? "" : "on"}"><input type="radio" name="grp-${g.id}" value="" ${opts.some(o => dr.parts.includes(o.id)) ? "" : "checked"} data-part="radio" data-group="${g.id}"><div><div class="n">I'll bring my own</div></div><div class="r"></div></label>` : "";
          return `<div class="grp-h"><h3>${g.label}</h3><span>${g.pick === "one" ? "Choose one" : "Optional"}</span></div>${cards}${none}`;
        }).join("");
    } else {
      const cards = partsCatalog(svc, dr.vehicle).map(o => partCard(o, "checkbox", "", dr.parts.includes(o.id))).join("");
      body = `<p class="dr-help" style="margin-top:16px">Standard installation doesn't include vehicle-specific parts. Add them now and they'll be waiting for you at your appointment.</p>` +
        (cards || '<div class="note info">' + ic("info", 18) + "<span>No additional parts are needed for this service.</span></div>");
    }
    return `
      <h2 class="dr-title">${ic("box", 36, 1.8)}Parts for your ${dr.vehicle.make} ${dr.vehicle.model}</h2>
      ${fitBanner()}
      ${body}
      <div class="note info">${ic("info", 18)}<span>Bring the hardware you want installed. If you already have any of these parts, remove them here and bring them to your appointment.</span></div>`;
  }

  function stepDone() {
    const svc = dr.svc, st = storeBy(dr.store);
    const chosen = drParts();
    return `
      <div class="done-hero"><div class="ck">${ic("check", 34, 3)}</div><h2>${dr.editId ? "Appointment updated" : "Added to cart"}</h2><p class="muted">${dr.date && dr.time ? "Your appointment is held for 30 minutes while you check out." : "You can schedule your appointment from your cart."}</p></div>
      <div class="recap">
        <div class="recap-row">${ic("wrench")}<span class="k">Service</span><span>${svc.name}</span></div>
        <div class="recap-row">${ic("car")}<span class="k">Vehicle</span><span>${vehText(dr.vehicle)}</span></div>
        ${(l => l ? `<div class="recap-row">${ic("wrench")}<span class="k">Speakers</span><span>${l.label}<br><span class="muted">${locSpecs(l)}</span></span></div>` : "")(locationFor(dr.svc, dr.vehicle, dr.loc))}
        <div class="recap-row">${ic("pin")}<span class="k">Location</span><span>${st.name}<br><span class="muted">${st.addr}</span></span></div>
        <div class="recap-row">${ic("cal")}<span class="k">Appointment</span><span>${dr.date && dr.time ? `<b>${fmtDay(dr.date)} at ${dr.time}</b>` : '<span style="color:var(--warn);font-weight:700">Not scheduled yet</span>'}</span></div>
        <div class="recap-row">${ic("box")}<span class="k">Parts</span><span>${chosen.length ? chosen.map(p => p.model ? `${p.model} <span class="muted">· ${money(p.price)}</span>` : p.laborFor ? `${p.name} <span class="muted">· ${money(p.price)}</span>` : p.name).join("<br>") : "None, bringing my own"}</span></div>
      </div>`;
  }

  function renderDrawer(fresh) {
    const el = $(".drawer"), body = $(".dr-body", el);
    const keep = !fresh && body && el.dataset.step === String(dr.step) ? body.scrollTop : 0;
    const strip = $(".dates", el), keepX = !fresh && strip ? strip.scrollLeft : null;
    const step = dr.step;
    const content = [stepVehicle, stepParts, stepAppt, stepDone][step]();
    let foot;
    if (step === 0) foot = `<button class="btn btn-white" data-act="close">No thanks</button><button class="btn btn-yellow" data-act="next" ${vehComplete(dr.vehicle) ? "" : "disabled"}>Continue</button>`;
    else if (step === 1) foot = `<button class="btn btn-white" data-act="back">Back</button><button class="btn btn-yellow" data-act="next">Continue</button>`;
    else if (step === 2) foot = `<button class="btn btn-white" data-act="later">Schedule later</button><button class="btn btn-yellow" data-act="commit" ${dr.date && dr.time ? "" : "disabled"}>${dr.editId ? "Save changes" : "Add to cart"}</button>`;
    else foot = `<button class="btn btn-white" data-act="close">Continue shopping</button><a class="btn btn-yellow" href="cart.html">Go to cart</a>`;
    const sum = step === 1 || step === 2 ? `<div class="dr-sum"><span>Installation ${money(dr.svc.price)}${partsTotal() ? " + parts " + money(partsTotal()) : ""}</span><span>Total <b>${money(dr.svc.price + partsTotal())}</b></span></div>` : "";
    el.dataset.step = step;
    el.innerHTML = `
      <div class="dr-top"><button data-act="close">${ic("left", 18, 2.5)}Continue shopping</button><a href="cart.html">${ic("cart", 24)}Go to cart</a></div>
      ${stepper(step)}
      <div class="dr-body">${content}</div>
      ${sum}
      <div class="dr-foot">${foot}</div>`;
    $(".dr-body", el).scrollTop = keep;
    if (keepX != null && $(".dates", el)) $(".dates", el).scrollLeft = keepX;
    else if ($(".dates .on", el)) $(".dates .on", el).scrollIntoView({ block: "nearest", inline: "center" });
  }

  function commit() {
    const s = state();
    const loc = locationFor(dr.svc, dr.vehicle, dr.loc);
    const data = { sku: dr.sku, vehicle: Object.assign({}, dr.vehicle), store: dr.store, date: dr.time ? dr.date : null, time: dr.time, parts: dr.parts.slice(), loc: loc ? loc.id : null };
    if (dr.editId) Object.assign(s.cart.find(c => c.id === dr.editId), data);
    else s.cart.push(Object.assign({ id: "i" + Date.now().toString(36) }, data));
    s.vehicle = Object.assign({}, dr.vehicle);
    s.store = dr.store;
    if (!dr.time) dr.date = null;
    save();
    dr.step = 3;
    renderDrawer(true);
  }

  function onDrawerClick(e) {
    const t = e.target.closest("[data-act],[data-date],[data-time]");
    if (!t || !dr) return;
    if (t.dataset.date) {
      dr.date = t.dataset.date;
      ensureDate();
      return renderDrawer();
    }
    if (t.dataset.time) { dr.time = t.dataset.time; return renderDrawer(); }
    switch (t.dataset.act) {
      case "close": return closeDrawer();
      case "next":
        if (dr.step === 0 && partsKey(dr.svc, dr.vehicle) !== dr.partsKey) { dr.parts = defaultParts(dr.svc, dr.vehicle); dr.partsKey = partsKey(dr.svc, dr.vehicle); dr.loc = null; }
        dr.step++;
        if (dr.step === 2) ensureDate();
        return renderDrawer(true);
      case "back": dr.step--; return renderDrawer(true);
      case "later": dr.time = null; return commit();
      case "commit": return commit();
      case "toggle-stores": dr.showStores = !dr.showStores; return renderDrawer();
      case "veh-change": dr.step = 0; return renderDrawer(true);
      case "veh-remove": dr.vehicle = EMPTY_VEH(); state().vehicle = null; save(); dr.step = 0; return renderDrawer(true);
    }
  }
  function onDrawerChange(e) {
    const t = e.target;
    if (!dr) return;
    if (t.dataset.veh) {
      setVehField(dr.vehicle, t.dataset.veh, t.value);
      renderDrawer();
    } else if (t.hasAttribute("data-store")) {
      dr.store = t.value;
      ensureDate();
      renderDrawer();
    } else if (t.hasAttribute("data-loc")) {
      // Each pair can need different parts, so switching pairs restores that pair's recommended package.
      const f = fitmentFor(dr.svc, dr.vehicle);
      const differs = JSON.stringify(groupsFor(f, dr.loc)) !== JSON.stringify(groupsFor(f, t.value));
      dr.loc = t.value;
      if (differs) dr.parts = defaultParts(dr.svc, dr.vehicle, dr.loc);
      renderDrawer();
    } else if (t.dataset.part === "radio") {
      // One choice per group: drop the group's other options, then add the pick (empty = bring my own).
      const others = partsCatalog(dr.svc, dr.vehicle).filter(o => o.group === t.dataset.group).map(o => o.id);
      dr.parts = dr.parts.filter(id => !others.includes(id)).concat(t.value ? [t.value] : []);
      renderDrawer();
    } else if (t.dataset.part) {
      dr.parts = t.checked ? dr.parts.concat(t.value) : dr.parts.filter(id => id !== t.value);
      renderDrawer();
    }
  }

  /* ---------- Shared tile ---------- */
  function tile(svc) {
    const s = state(), f = firstAvail(svc.sku, s.store);
    return `<div class="card tile">
      <button class="heart" aria-label="Save">${ic("heart", 18)}</button>
      <a href="product.html?sku=${svc.sku}">${art(svc, "sm")}</a>
      <a class="t" href="product.html?sku=${svc.sku}">${svc.name}</a>
      ${stars(svc.rating, svc.reviews, true)}
      ${vehComplete(s.vehicle) ? `<div class="fits-line">${ic("check", 15, 2.5)}Fits your ${vehText(s.vehicle)}</div>` : ""}
      <div class="bottom">
        <div>${price(svc.price, "p-md")}${svc.was ? `<div style="margin-top:4px"><span class="save">Save ${money(svc.was - svc.price)}</span> <span class="was">Was ${money(svc.was)}</span></div>` : ""}</div>
        <div class="next">${ic("cal", 15)}<span>Next available <b>${fmtDay(f.key)}</b> at ${storeBy(s.store).name}</span></div>
        <button class="btn btn-yellow" data-add="${svc.sku}">${ic("cart", 18)}Add to cart</button>
        <label class="cmp"><input type="checkbox">Compare</label>
      </div>
    </div>`;
  }
  function bindAdd(root) {
    root.addEventListener("click", e => {
      const b = e.target.closest("[data-add]");
      if (b) openInstall(b.dataset.add);
    });
  }

  /* ---------- PLP ---------- */
  function renderPLP() {
    chrome();
    const PRICES = [[50, 99.99, "$50 - $99.99"], [100, 149.99, "$100 - $149.99"], [150, 199.99, "$150 - $199.99"], [200, 249.99, "$200 - $249.99"]];
    const f = { cats: new Set(), prices: new Set(), top: false, sale: false, sort: "best" };
    const count = fn => D.services.filter(fn).length;
    $("#app").innerHTML = `
      <div class="wrap">
        ${crumbs(["Best Buy", "Services", "Car Electronics Professional Installation", "Autotech Services"])}
        <div class="card plp-hero">
          <div><span class="tag-new">NEW</span><h2>Schedule your installation as you shop</h2><p>Add any Autotech service to your cart and pick your vehicle, store, appointment time and parts in one step. No more scheduling after checkout.</p></div>
          <div class="hero-steps"><div>${ic("car", 26, 1.7)}Add your vehicle</div><div>${ic("cal", 26, 1.7)}Pick a time</div><div>${ic("box", 26, 1.7)}Add parts</div><div>${ic("cart", 26, 1.7)}Check out</div></div>
        </div>
        <div class="plp">
          <aside class="card facets">
            <div class="facet-g"><h3>Category</h3>${Object.entries(D.categories).map(([k, v]) => `<label class="facet"><input type="checkbox" data-cat="${k}">${v} <span class="n">(${count(s => s.category === k)})</span></label>`).join("")}</div>
            <div class="facet-g"><h3>Brand</h3><label class="facet"><input type="checkbox" checked disabled>Geek Squad® <span class="n">(${D.services.length})</span></label></div>
            <div class="facet-g"><h3>Price</h3>${PRICES.map((p, i) => `<label class="facet"><input type="checkbox" data-price="${i}">${p[2]} <span class="n">(${count(s => s.price >= p[0] && s.price <= p[1])})</span></label>`).join("")}</div>
            <div class="facet-g"><h3>Customer Rating</h3><label class="facet"><input type="checkbox" data-top>${stars(4.5, 0, true).replace(/<span class="num">.*<\/span>/, "")} 4.5 &amp; Up</label></div>
            <div class="facet-g"><h3>Service Location</h3><label class="facet"><input type="checkbox" checked disabled>In-Store Service</label></div>
          </aside>
          <section>
            <div class="card vs-card" id="vs"></div>
            <h1 class="plp-title">Autotech Services <span id="cnt"></span></h1>
            <div class="plp-bar"><button class="chip" data-sale>On Sale</button><span id="chips"></span>
              <label class="sort">Sort by: <select id="sort"><option value="best">Best Selling</option><option value="low">Price Low to High</option><option value="high">Price High to Low</option><option value="rating">Highest Rated</option></select></label></div>
            <div class="grid" id="grid"></div>
          </section>
        </div>
      </div>`;
    const vsOpts = { prompt: "Find services that fit your vehicle.", button: "Show results", fits: "These items fit your" };
    const drawVS = () => { $("#vs").innerHTML = vehicleBox(vsOpts); };
    function draw() {
      drawVS();
      let list = D.services.filter(s =>
        (!f.cats.size || f.cats.has(s.category)) &&
        (!f.prices.size || [...f.prices].some(i => s.price >= PRICES[i][0] && s.price <= PRICES[i][1])) &&
        (!f.top || s.rating >= 4.5) && (!f.sale || s.was));
      const sorts = { best: (a, b) => b.reviews - a.reviews, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating };
      list = list.slice().sort(sorts[f.sort]);
      $("#cnt").textContent = `(${list.length})`;
      $("#grid").innerHTML = list.length ? list.map(tile).join("") : `<div class="card empty" style="grid-column:1/-1"><h3>No services match these filters</h3><p class="muted">Try removing a filter.</p></div>`;
      $("[data-sale]").classList.toggle("on", f.sale);
    }
    $(".facets").addEventListener("change", e => {
      const t = e.target;
      if (t.dataset.cat) t.checked ? f.cats.add(t.dataset.cat) : f.cats.delete(t.dataset.cat);
      if (t.dataset.price) t.checked ? f.prices.add(+t.dataset.price) : f.prices.delete(+t.dataset.price);
      if (t.hasAttribute("data-top")) f.top = t.checked;
      draw();
    });
    $("[data-sale]").addEventListener("click", () => { f.sale = !f.sale; draw(); });
    $("#sort").addEventListener("change", e => { f.sort = e.target.value; draw(); });
    bindVehicleBox($("#vs"), drawVS);
    bindAdd($("#app"));
    window.addEventListener("demo:change", () => { chrome(); draw(); });
    draw();
  }

  /* ---------- PDP ---------- */
  function renderPDP() {
    chrome();
    const sku = new URLSearchParams(location.search).get("sku") || D.services[0].sku;
    const svc = svcBy(sku) || D.services[0];
    document.title = svc.name + " - Best Buy (Demo)";
    let thumb = 0;
    const thumbs = [svc.icon, "wrench", "cal"];
    const vsOpts = { prompt: "Check if this service fits your vehicle.", button: "Check fit", fits: "This item fits your" };
    function draw() {
      const s = state(), st = storeBy(s.store), f = firstAvail(svc.sku, s.store);
      const v = s.vehicle;
      const related = D.services.filter(x => x.sku !== svc.sku).sort((a, b) => (b.category === svc.category) - (a.category === svc.category)).slice(0, 4);
      $("#app").innerHTML = `
      <div class="wrap">
        ${crumbs(["Best Buy", "Services", "Car Electronics Professional Installation", "Autotech Services", D.categories[svc.category]])}
        <div class="card fit-card" id="vs">${vehicleBox(vsOpts)}</div>
        <div class="pdp">
          <div>
            <div class="card pdp-main">
              <div class="thumbs">${thumbs.map((t, i) => `<button class="${i === thumb ? "on" : ""}" data-thumb="${i}">${art(svc, "xs", t)}</button>`).join("")}</div>
              <div>${art(svc, "", thumbs[thumb])}</div>
              <div class="pdp-info">
                <h1>${svc.name}</h1>
                <div class="sku"><span>Model: GS-${svc.sku.slice(-4)}</span> <span>SKU: ${svc.sku}</span></div>
                ${stars(svc.rating, svc.reviews, true)}
                <div class="sold">Sold by Best Buy</div>
                <h3>About this service</h3>
                <p class="about">${svc.about}</p>
              </div>
            </div>
          </div>
          <aside class="card buy">
            <div class="price-row">${price(svc.price, "p-xl")}<span class="or">or</span><div class="fin"><b>${money(svc.price / 12)}</b>/mo.<br>suggested payments with<br><b style="font-size:13px">12-Month Financing</b></div></div>
            ${svc.was ? `<div style="margin-top:-12px"><span class="save">Save ${money(svc.was - svc.price)}</span> <span class="was">Was ${money(svc.was)}</span></div>` : ""}
            <div>
              <h3>Availability</h3>
              <div class="opt-cards">
                <button class="opt-card" disabled>${ic("store", 24, 1.7)}<span class="h">Pickup</span><span class="s">Not available</span></button>
                <button class="opt-card" disabled>${ic("truck", 24, 1.7)}<span class="h">Shipping</span><span class="s">Not available</span></button>
                <button class="opt-card on">${ic("wrench", 24, 1.7)}<span class="tag-new">NEW</span><span class="h">Installation</span><span class="s">First available<br><b>${fmtDay(f.key)}</b></span></button>
              </div>
            </div>
            <div class="pickup-at">Installation at <a href="#" data-store-pick>${st.name}</a> · takes ${hrs(svc.hours)}</div>
            <div class="callout">${ic("info", 18)}<span>Choose your vehicle, appointment time and parts right after you add to cart. Today this service is delivered by email and scheduled separately.</span></div>
            <div class="buy-actions"><button class="btn btn-yellow" data-add="${svc.sku}">Add to cart</button><button class="icon-btn" aria-label="Save">${ic("heart", 22)}</button></div>
          </aside>
        </div>
        <section class="card pdp-sec"><h2>Features</h2><div class="feat-grid">${D.features.map(x => `<div><h4>${x.h}</h4><p class="muted">${x.p}</p></div>`).join("")}</div></section>
        <section class="card pdp-sec"><h2>Specifications</h2><div class="spec">
          <div>Service Location</div><div>Store</div>
          <div>Estimated Time</div><div>${hrs(svc.hours).replace("about", "About")}</div>
          <div>Scheduling</div><div>Choose your appointment when you add to cart</div>
          <div>Vehicle-Specific Parts</div><div>Sold separately, added in the installation slide-out</div>
          <div>Hardware Included</div><div>No</div>
        </div></section>
        <section class="pdp-sec" style="padding-left:0;padding-right:0"><h2>Similar installation services</h2><div class="rel-row">${related.map(tile).join("")}</div></section>
      </div>`;
    }
    $("#app").addEventListener("click", e => {
      const t = e.target;
      const th = t.closest("[data-thumb]");
      if (th) { thumb = +th.dataset.thumb; return draw(); }
      if (t.closest("[data-store-pick]")) { e.preventDefault(); openInstall(svc.sku, vehComplete(state().vehicle) ? { step: 2 } : {}); dr.showStores = true; return renderDrawer(); }
    });
    bindVehicleBox($("#app"), () => { $("#vs").innerHTML = vehicleBox(vsOpts); });
    bindAdd($("#app"));
    window.addEventListener("demo:change", () => { chrome(); draw(); });
    draw();
  }

  /* ---------- Cart ---------- */
  function renderCart() {
    chrome();
    function draw() {
      const s = state();
      let sub = 0, saving = 0, unscheduled = 0;
      const items = s.cart.map(it => {
        const svc = svcBy(it.sku), st = storeBy(it.store), parts = pickedParts(svc, it.vehicle, it.parts);
        const orig = svc.was || svc.price;
        sub += orig + parts.reduce((a, p) => a + p.price, 0);
        saving += orig - svc.price;
        const sched = it.date && it.time;
        if (!sched) unscheduled++;
        const next = apptDays(it.sku, it.store, parts).find(x => x.slots.length);
        return `<div class="card ci">
          <div class="ci-top">
            <a href="product.html?sku=${svc.sku}">${art(svc, "xs")}</a>
            <div><a class="t" href="product.html?sku=${svc.sku}">${svc.name}</a><div class="sold">Sold by <b>BEST BUY</b></div><div class="fits">${ic("check", 15, 2.5)}Fits a ${vehText(it.vehicle)}</div>${(l => l ? `<div class="fits">${ic("speaker2", 15, 2)}${l.label} (${locSpecs(l)})</div>` : "")(locationFor(svc, it.vehicle, it.loc))}</div>
            <div class="svc-at"><h4>Service at <a href="#" data-edit="${it.id}">${st.name}</a></h4>
              ${sched
                ? `<div class="when">Your appointment is <b>${fmtDay(it.date)} at ${it.time}</b>.</div><span class="appt-pill">${ic("check", 14, 3)}Appointment scheduled</span><br><button class="link" data-edit="${it.id}">Change appointment</button>`
                : `<div class="when">The next available timeslot is <b>${fmtDay(next.key)}</b>.</div><span class="appt-pill warn">${ic("clock", 14, 2.5)}Not scheduled</span><br><button class="link" data-edit="${it.id}">Schedule appointment</button>`}
            </div>
            <div class="qty"><select aria-label="Quantity" disabled><option>1</option></select><button class="link" data-later="${it.id}">Save for later</button><button class="link" data-remove="${it.id}">Remove</button></div>
            <div class="amt">${price(svc.price, "p-md")}${svc.was ? `<div class="was">${money(svc.was)}</div>` : ""}</div>
          </div>
          <div class="ci-sec"><div class="ci-sec-h">Installation Appointment</div>
            <div class="ci-line">${ic("cal", 26, 1.6)}<span>${sched ? `${fmtDay(it.date)} at ${it.time} · ${st.name}<br><span class="muted" style="font-size:13px">${st.addr} · takes ${hrs(svc.hours)}</span>` : `Not scheduled yet. Pick a time now or after checkout.`}</span><button class="link" data-edit="${it.id}">${sched ? "Change" : "Schedule"}</button><span class="v">${sched ? "Held for you" : ""}</span></div>
          </div>
          ${parts.length ? `<div class="ci-sec"><div class="ci-sec-h">Essential Add-ons</div>${parts.map(p => `<div class="ci-line">${ic("box", 26, 1.6)}<span>${p.name}<br><span class="muted" style="font-size:13px">${p.model ? `Model: ${p.model} · SKU: ${p.sku} · ` : p.laborFor ? `SKU: ${p.sku} · ` : ""}${p.avail === "online" ? "Online only, ships to " + st.name : "For your " + vehText(it.vehicle)}</span></span>${p.laborFor ? `<span class="muted" style="font-size:13px">Included with ${parts.find(x => x.id === p.laborFor).model}</span>` : `<button class="link" data-rmpart="${it.id}:${p.id}">Remove</button>`}<span class="v">${money(p.price)}</span></div>`).join("")}</div>` : ""}
        </div>`;
      }).join("");
      const total = sub - saving, tax = total * TAX;
      $("#app").innerHTML = `
      <div class="cart-page">
        <div class="cart-left">
          <h1>Your Cart</h1>
          ${s.cart.length ? `<div class="card offers">${ic("bill", 26, 1.7)}<b>Special Offers</b><span>We found offers available based on items in your cart!</span><a href="#">See all</a></div>${items}`
            : `<div class="card cart-empty"><h2>Your cart is empty</h2><p>Add an installation service to schedule your appointment.</p><a class="btn btn-yellow" href="index.html">Shop Autotech Services</a></div>`}
        </div>
        <aside class="cart-right os">
          <h2>Order Summary</h2>
          <div class="os-row"><span>Subtotal</span><span>${money(sub)}</span></div>
          ${saving ? `<div class="os-row"><span>Savings</span><span>-${money(saving)}</span></div>` : ""}
          <div class="os-row"><span>In-Store Service</span><span>FREE</span></div>
          <div class="os-row"><span>Estimated Sales Tax</span><span>${money(tax)}</span></div>
          <div class="os-total"><span>Total</span><span>${money(total + tax)}</span></div>
          ${unscheduled ? `<div class="warnbox">${ic("clock", 18, 2)}<span>${unscheduled === 1 ? "1 installation isn't" : unscheduled + " installations aren't"} scheduled yet. You can schedule now or after checkout.</span></div>` : ""}
          <p class="legal">By checking out, or using PayPal Checkout, you agree to Best Buy's <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a></p>
          <button class="btn btn-yellow btn-block" data-checkout ${s.cart.length ? "" : "disabled"}>Checkout</button>
          <button class="btn btn-dark btn-block" data-checkout ${s.cart.length ? "" : "disabled"}><span class="paypal">PayPal</span> Checkout</button>
          <p class="muted" style="font-size:14px"><a href="#">Sign in</a> My Best Buy® members enjoy exclusive offers &amp; free shipping on eligible items with no minimum purchase.</p>
        </aside>
      </div>`;
    }
    $("#app").addEventListener("click", e => {
      const t = e.target, s = state();
      const ed = t.closest("[data-edit]");
      if (ed) { e.preventDefault(); const it = s.cart.find(c => c.id === ed.dataset.edit); return openInstall(it.sku, { editId: it.id, step: 2 }); }
      const rm = t.closest("[data-remove]");
      if (rm) { s.cart = s.cart.filter(c => c.id !== rm.dataset.remove); save(); return toast("Removed from cart"); }
      const rp = t.closest("[data-rmpart]");
      if (rp) { const [id, pid] = rp.dataset.rmpart.split(":"); const it = s.cart.find(c => c.id === id); it.parts = it.parts.filter(p => p !== pid); return save(); }
      if (t.closest("[data-later]")) return toast("Save for later isn't part of this demo");
      if (t.closest("[data-checkout]")) return toast("Checkout isn't part of this demo");
    });
    window.addEventListener("demo:change", () => { chrome(); draw(); });
    draw();
  }

  window.BBY = { renderPLP, renderPDP, renderCart };
})();
