'use strict';

// Versión de la app (se ve en la pantalla de inicio). Arreglos y ajustes: 0.1.x; novedades: 0.x.0.
const APP_VERSION = '0.1.0';
const DATA_KEY = 'strike:data';
const DISPLAY_KEY = 'strike:display';
const INSTALL_HINT_KEY = 'strike:installHint';
const LOCALE = 'es-ES';
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MONTHS_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const ICONS = {
  doc: '<path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5a1.5 1.5 0 0 1 1-1.5z"/><path d="M14 3.5V8h4"/><path d="M9 12.5h6M9 16h4"/>',
  bolt: '<path d="M13.5 3L6 13.5h5.5L10 21l8-11h-5.5z"/>',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9.5h16M8.5 3v4M15.5 3v4"/>',
  gift: '<rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M3 9h18M12 9v11"/><path d="M12 9c-2-4-6-4-6-1.5S10 9 12 9zM12 9c2-4 6-4 6-1.5S14 9 12 9z"/>',
  trend: '<path d="M4 17l5-5 4 3 7-7"/><path d="M15 8h5v5"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
  sliders: '<path d="M5 6h9M18 6h1M5 12h3M12 12h7M5 18h11M20 18h-1"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  upload: '<path d="M12 15V4M7.5 8.5L12 4l4.5 4.5"/><path d="M5 14v4.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V14"/>',
  trash: '<path d="M4.5 7h15M10 11v6M14 11v6"/><path d="M6.5 7l1 12.5A1.5 1.5 0 0 0 9 21h6a1.5 1.5 0 0 0 1.5-1.5l1-12.5M9.5 7V4.5h5V7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.9 1.2-1.8-.5-1-.1-2.2 1.1-2.2H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="15" cy="7.5" r="1.2"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r=".6" fill="currentColor"/>',
  chevron: '<path d="M9 5l7 7-7 7"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
};
const icon = (name, size = 22) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

// Logo de StrikeCTRL: anillo fino, anillo discontinuo, arco y una nómina con un rayo
let logoCount = 0;
function logoSVG(size) {
  const id = `stk-g${logoCount++}`;
  return `
    <svg class="logo-mark" viewBox="0 0 120 120" width="${size}" height="${size}" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <defs>
        <linearGradient id="${id}" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stop-color="#e11d48"/><stop offset=".55" stop-color="#f97316"/><stop offset="1" stop-color="#fcd34d"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="52" stroke="url(#${id})" stroke-width="1.2" opacity=".55"/>
      <circle cx="60" cy="60" r="42" stroke="url(#${id})" stroke-width=".8" stroke-dasharray="2 5" opacity=".6"/>
      <path class="logo-arc" pathLength="1" d="M60 8 A52 52 0 1 1 14.97 86" stroke="url(#${id})" stroke-width="3"/>
      <circle class="logo-dot" cx="14.97" cy="86" r="3" fill="#fcd34d" stroke="none"/>
      <path d="M45 35h19l11 11v37a3 3 0 0 1-3 3H45a3 3 0 0 1-3-3V38a3 3 0 0 1 3-3z" stroke="url(#${id})" stroke-width="1.8"/>
      <path d="M64 35v11h11" stroke="url(#${id})" stroke-width="1.4"/>
      <path d="M48 47h10M48 53h7" stroke="url(#${id})" stroke-width="1.4" opacity=".7"/>
      <path d="M63 51l-11 16h8.5l-3.5 13 12-17.5h-8.5z" stroke="url(#${id})" stroke-width="1.8"/>
    </svg>`;
}
document.querySelectorAll('[data-logo]').forEach((el) => { el.innerHTML = logoSVG(Number(el.dataset.logo)); });
document.getElementById('app-version').textContent = `Versión ${APP_VERSION}`;

// ---------- Utilidades ----------

const $ = (id) => document.getElementById(id);
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const sum = (arr, f = (x) => x) => arr.reduce((a, x) => a + (f(x) || 0), 0);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = (n, d = 2) => (n || 0).toLocaleString(LOCALE, { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: 'always' });
const money = (n) => `${num(n)} €`;
// Pérdida: siempre en negativo (o 0)
const loss = (n) => (Math.abs(n) < 0.005 ? money(0) : `−${money(Math.abs(n))}`);
const hoursText = (h) => `${(h || 0).toLocaleString(LOCALE, { maximumFractionDigits: 2 })} h`;
const daysText = (d) => {
  const v = Math.round((d || 0) * 100) / 100;
  return `${v.toLocaleString(LOCALE, { maximumFractionDigits: 2 })} ${v === 1 ? 'día' : 'días'}`;
};
const pctText = (p) => `${(p || 0).toLocaleString(LOCALE, { maximumFractionDigits: 2 })} %`;
const formatInput = (n) => (n || n === 0 ? String(n).replace('.', ',') : '');
const ymOf = (y, m) => `${y}-${String(m).padStart(2, '0')}`;
const ymText = (ym) => `${MONTHS[Number(ym.slice(5)) - 1]} ${ym.slice(0, 4)}`;

// Importes: admite 1.234,56 · 1234.56 · 1.234
function parseAmount(str) {
  let s = String(str).replace(/[^\d.,-]/g, '');
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^-?[1-9]\d{0,2}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (_) {
    return false;
  }
}

// ---------- Datos ----------
// slips: nóminas leídas (solo lo que hace falta: huelga, devoluciones de cotización, IRPF, sueldo).
// years[año]: respuestas a las preguntas de ese año. cfg: ajustes del cálculo.
function normData(d) {
  d = d && typeof d === 'object' ? d : {};
  return {
    slips: Array.isArray(d.slips) ? d.slips : [],
    years: d.years && typeof d.years === 'object' ? d.years : {},
    cfg: { hoursPerDay: 8, annualHours: 1680, rate: null, extraRate: null, ...(d.cfg || {}) },
  };
}
let data = normData(load(DATA_KEY, null));
function persist() { save(DATA_KEY, data); }

function questionsOf(y) {
  const q = data.years[y] ||= {};
  q.pending ||= { on: false, items: [] };          // huelga aún sin descontar en nómina
  q.extraPays ||= { on: false, items: [] };        // pagas adicionales no previstas
  q.raise ||= { on: false, pct: null, from: 1 };   // subida salarial esperada
  q.bonus ||= { on: false, pct: null, perf: 100 }; // bonus sobre la nómina
  return q;
}

// ---------- Lectura de nóminas en PDF ----------
// Igual que en PayCTRL: recibo SAP (Airbus y similares) con la tabla CLAVE · CONCEPTO · FECHA DE
// ORIGEN · HORAS/% · DESCUENTOS · ABONOS · INCIDE EN BASE. La huelga sale como abono negativo:
// «5516 Hrs. conflic. laboral» (cotiza), «5599 Hrs. conf. laboral no cot» (sin cotizar) y, en la
// nómina de la paga extra, «0500 Desc. horas falta p extra». La fecha de origen es el mes de la huelga.
const PDFJS_SRC = 'vendor/pdf.min.js'; // pdf.js 3.11.174 (Apache 2.0), se carga solo al leer un PDF
const PDFJS_WORKER = 'vendor/pdf.worker.min.js';
const NUM_RE = /^\d{1,3}(?:\.\d{3})*,\d{2}-?$/;
const pdfNum = (s) => { const n = parseAmount(s.replace(/-$/, '')); return s.endsWith('-') ? -n : n; };
const EXTRA_CODES = ['0414', '0418', '0096', '0098'];
const STRIKE_CODES = {
  '5516': { kind: 'salary', label: 'Horas de huelga (cotizan)' },
  '5599': { kind: 'salary', label: 'Horas de huelga (sin cotizar)' },
  '0500': { kind: 'extra', label: 'Descuento de la huelga en la paga extra' },
};

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error('script'));
    document.head.append(s);
  });
}
async function loadPdfJs() {
  if (!window.pdfjsLib) await loadScript(PDFJS_SRC);
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  return window.pdfjsLib;
}
async function pdfPages(file) {
  const lib = await loadPdfJs();
  const pdf = await lib.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages = [];
  for (let n = 1; n <= pdf.numPages; n++) {
    const page = await pdf.getPage(n);
    pages.push((await page.getTextContent()).items
      .filter((it) => it.str.trim())
      .map((it) => ({ s: it.str.trim(), x: it.transform[4], y: it.transform[5], w: it.width })));
  }
  return pages;
}

// Recibo SAP: devuelve { year, month, kind, liquid, irpfPct, concepts } o null
function readSapPayslip(pages) {
  const concepts = [];
  let text = '';
  for (const items of pages) {
    text += ' ' + items.map((it) => it.s).join(' ');
    const head = (re) => items.find((it) => re.test(it.s));
    const colOf = (it) => (it ? it.x + it.w / 2 : null);
    const cols = {
      qty: colOf(head(/^HORAS/)), desc: colOf(head(/^DESCUENTOS$/)),
      abono: colOf(head(/^ABONOS$/)), base: colOf(head(/^(INCIDE|INDICE)/)),
    };
    const rows = [];
    [...items].sort((a, b) => b.y - a.y || a.x - b.x).forEach((it) => {
      const row = rows.find((r) => Math.abs(r.y - it.y) < 2.5);
      if (row) row.items.push(it);
      else rows.push({ y: it.y, items: [it] });
    });
    for (const r of rows) {
      r.items.sort((a, b) => a.x - b.x);
      const line = r.items.map((it) => it.s).join(' ');
      const m = line.match(/^(?:([A-D]\d?)\s+)?(\/?[0-9A-Z]{3,4})\s+(.+?)\s+(\d{2}\/\d{4}|[A-Z]\.[A-Z]\.?)(?:\s|$)/);
      if (!m) continue;
      const [, cls = '', code, name, origin] = m;
      const nums = r.items.filter((it) => NUM_RE.test(it.s) && it.x > r.items[0].x + 40);
      if (!nums.length) continue;
      const byCol = {};
      nums.forEach((it) => {
        const c = colOf(it);
        const best = Object.entries(cols).filter(([, x]) => x != null)
          .sort((a, b) => Math.abs(a[1] - c) - Math.abs(b[1] - c))[0];
        byCol[best ? best[0] : 'last'] = pdfNum(it.s);
      });
      const last = pdfNum(nums.at(-1).s);
      const letter = cls[0] || '';
      let type, amount;
      if (letter === 'A' || letter === 'B') { type = 'dev'; amount = byCol.abono ?? last; }
      else if (letter === 'C') { type = 'ded'; amount = byCol.desc ?? last; }
      else if (letter === 'D') { type = 'info'; amount = byCol.base ?? last; }
      else if (code === '/399') { type = 'emp'; amount = last; }
      else if (byCol.desc != null) { type = 'ded'; amount = byCol.desc; }
      else if (byCol.abono != null) { type = 'dev'; amount = byCol.abono; }
      else { type = 'info'; amount = last; }
      concepts.push({ code, name: name.replace(/\s+/g, ' ').trim(), origin, qty: byCol.qty ?? null, type, amount });
    }
  }
  if (!concepts.some((k) => k.type === 'dev')) return null;
  let year = null, month = null, kind = 'monthly';
  const M = MONTHS.join('|');
  const extra = text.match(new RegExp(`Extra\\s+(${M})\\s+(\\d{4})`, 'i'));
  const period = text.match(new RegExp(`(${M})\\s*\\(\\d{2}\\.(\\d{2})\\.(\\d{4})`, 'i'));
  const plain = text.match(new RegExp(`\\b(${M})\\s+((?:19|20)\\d{2})\\b`, 'i'));
  if (extra) { kind = 'extra'; month = MONTHS.indexOf(extra[1].toLowerCase()) + 1; year = Number(extra[2]); }
  else if (period) { month = Number(period[2]); year = Number(period[3]); }
  else if (plain) { month = MONTHS.indexOf(plain[1].toLowerCase()) + 1; year = Number(plain[2]); }
  const codes = concepts.filter((k) => k.type === 'dev').map((k) => k.code);
  if (kind === 'monthly' && !codes.includes('0080') && codes.some((c) => EXTRA_CODES.includes(c))) kind = 'extra';
  const liq = text.match(/L[ÍI]QUIDO A PERCIBIR[ .…]*€\s*(\d{1,3}(?:\.\d{3})*,\d{2})/i);
  return {
    year, month, kind,
    liquid: liq ? parseAmount(liq[1]) : 0,
    irpfPct: concepts.find((k) => k.code === '/401')?.qty ?? null,
    concepts,
  };
}

// Otras empresas: solo los totales del modelo oficial de recibo (bruto, líquido, % de IRPF, periodo).
// Las líneas de huelga se buscan por su nombre («huelga», «conflicto»), con el importe en la misma línea.
function readGenericPayslip(pages) {
  const t = pages.map((items) => items.map((it) => it.s).join(' ')).join(' ').replace(/\s+/g, ' ');
  if (!/L[ÍI]QUIDO|NETO A PERCIBIR/i.test(t) || !/DEVENG|BRUTO/i.test(t)) return null;
  const amountAfter = (re) => {
    const m = t.match(re);
    if (!m) return null;
    const a = t.slice(m.index + m[0].length, m.index + m[0].length + 80).match(/\d{1,3}(?:\.\d{3})+,\d{2}|\d+,\d{2}/);
    return a ? parseAmount(a[0]) : null;
  };
  const gross = amountAfter(/TOTAL\s+DEVENGADO|TOTAL\s+DEVENGOS|TOTAL\s+BRUTO/i);
  const liquid = amountAfter(/L[ÍI]QUIDO\s+(?:TOTAL\s+)?A\s+(?:PERCIBIR|COBRAR)|TOTAL\s+L[ÍI]QUIDO|NETO\s+A\s+PERCIBIR/i);
  if (gross == null || liquid == null) return null;
  const irpfM = t.match(/I\.?\s?R\.?\s?P\.?\s?F\.?[^\d]{0,30}(\d{1,2},\d{1,2})\s*%/i);
  let year = null, month = null;
  const range = t.match(/(\d{1,2})[\/.-](\d{1,2})[\/.-]((?:19|20)\d{2})\s*(?:al?|-|hasta)\s*\d{1,2}[\/.-]\d{1,2}[\/.-](?:19|20)\d{2}/i);
  const named = t.match(new RegExp(`\\b(${MONTHS.join('|')}|setiembre)\\b\\s*(?:de\\s+|\\/\\s*)?((?:19|20)\\d{2})\\b`, 'i'));
  if (range) { month = Number(range[2]); year = Number(range[3]); }
  else if (named) { month = MONTHS.indexOf(named[1].toLowerCase().replace('setiembre', 'septiembre')) + 1; year = Number(named[2]); }
  const extra = /(?:PAGA|GRATIFICACI[ÓO]N)\s+(?:EXTRA|EXTRAORDINARIA)/i.test(t) && !/SALARIO\s+BASE/i.test(t);
  // Líneas de huelga: «Huelga 3 días … 412,50» o «Descuento conflicto laboral … 412,50»
  const strike = [];
  for (const m of t.matchAll(/(HUELGA|CONFLICTO\s+LABORAL)[^\d€]{0,40}?(?:(\d+(?:,\d+)?)\s*(D[ÍI]AS?|HORAS?|H)\b)?[^\d€]{0,30}?(\d{1,3}(?:\.\d{3})*,\d{2})/gi)) {
    const qty = m[2] ? parseAmount(m[2]) : 0;
    const isDays = m[3] && /^D/i.test(m[3]);
    strike.push({ days: isDays ? qty : null, hours: !isDays ? qty : null, amount: parseAmount(m[4]) });
  }
  return { generic: true, year, month, kind: extra ? 'extra' : 'monthly', gross, liquid, irpfPct: irpfM ? parseAmount(irpfM[1]) : null, strike };
}

// Nómina tal como se guarda: solo lo que usa el cálculo
function slipFromSap(r, fileName) {
  const dev = r.concepts.filter((k) => k.type === 'dev');
  const byCode = (c) => round2(sum(dev.filter((k) => k.code === c), (k) => k.amount));
  const strike = [];
  for (const k of dev) {
    const known = STRIKE_CODES[k.code];
    const kind = known?.kind ?? (/falta.*extra/i.test(k.name) ? 'extra' : /conflic|huelga/i.test(k.name) ? 'salary' : null);
    if (!kind || k.amount >= 0) continue;
    const om = k.origin.match(/^(\d{2})\/(\d{4})$/);
    strike.push({
      kind, code: k.code, name: known?.label ?? k.name, cot: k.code !== '5599',
      origin: om ? `${om[2]}-${om[1]}` : ymOf(r.year, r.month),
      hours: Math.abs(k.qty || 0), amount: round2(-k.amount),
    });
  }
  // Cotización devuelta: líneas «/398» en negativo (regularización de un mes anterior)
  const ssBack = r.concepts.filter((k) => k.code === '/398' && k.type === 'ded' && k.amount < 0)
    .map((k) => { const om = k.origin.match(/^(\d{2})\/(\d{4})$/); return { origin: om ? `${om[2]}-${om[1]}` : '', amount: round2(-k.amount) }; });
  const bonus = dev.find((k) => k.code === '2142' && k.qty);
  return {
    id: uid(), source: 'sap', file: fileName,
    year: r.year, month: r.month, kind: r.kind,
    gross: round2(sum(dev, (k) => k.amount)), liquid: r.liquid, irpfPct: r.irpfPct,
    base: byCode('0080'), regular: round2(byCode('0080') + byCode('0100')),
    extraGross: r.kind === 'extra' ? round2(sum(dev.filter((k) => EXTRA_CODES.includes(k.code)), (k) => k.amount)) : 0,
    bonusPct: bonus ? bonus.qty : null,
    strike, ssBack,
  };
}
function slipFromGeneric(r, fileName, hoursPerDay) {
  const ym = ymOf(r.year, r.month);
  return {
    id: uid(), source: 'generic', file: fileName,
    year: r.year, month: r.month, kind: r.kind,
    gross: r.gross, liquid: r.liquid, irpfPct: r.irpfPct,
    base: 0, regular: r.kind === 'monthly' ? round2(r.gross + sum(r.strike, (s) => s.amount)) : 0,
    extraGross: r.kind === 'extra' ? r.gross : 0, bonusPct: null,
    // Sin fecha de origen: se cuenta en el mes de la nómina
    strike: r.strike.map((s) => ({
      kind: 'salary', code: '', name: 'Descuento por huelga', cot: true, origin: ym,
      hours: s.hours ?? (s.days || 0) * hoursPerDay, amount: s.amount,
    })),
    ssBack: [],
  };
}

async function importFiles(list) {
  const files = [...list].filter((f) => /pdf$/i.test(f.type) || /\.pdf$/i.test(f.name));
  if (!files.length) { toast('Elige nóminas en PDF'); return; }
  let ok = 0;
  const failed = [];
  toast(files.length > 1 ? `Leyendo ${files.length} nóminas…` : 'Leyendo la nómina…', { stay: true });
  for (const f of files) {
    try {
      const pages = await pdfPages(f);
      const sap = readSapPayslip(pages);
      const gen = sap ? null : readGenericPayslip(pages);
      const slip = sap ? slipFromSap(sap, f.name) : gen ? slipFromGeneric(gen, f.name, data.cfg.hoursPerDay) : null;
      if (!slip || !slip.year || !slip.month) { failed.push(f.name); continue; }
      // La misma nómina (mes y tipo) se sustituye
      data.slips = data.slips.filter((s) => !(s.year === slip.year && s.month === slip.month && s.kind === slip.kind));
      data.slips.push(slip);
      selYear = slip.year;
      ok++;
    } catch (_) {
      failed.push(f.name);
    }
  }
  persist();
  render();
  if (failed.length) toast(`${ok ? `${ok} leída${ok > 1 ? 's' : ''}. ` : ''}No se ha podido leer: ${failed.join(', ')}`, { warn: true });
  else toast(ok > 1 ? `${ok} nóminas leídas` : 'Nómina leída');
}

// ---------- Cálculo ----------
// Todo por año (el de las nóminas). Importes en positivo = dinero que se deja de cobrar.
// - Nóminas: lo descontado por huelga, menos la cotización que te devuelven («/398» negativa del
//   mismo mes de huelga) y menos el IRPF que ya no te retienen (al % de esa nómina).
// - Pagas extra: julio se genera de enero a junio y diciembre de julio a diciembre; cada hora de
//   huelga del semestre resta (paga extra ÷ horas del semestre). Lo ya descontado (0500) se lee de
//   la nómina; lo que falta se estima.
// - Pagas adicionales, subida (atrasos) y bonus: estimación con las respuestas a las preguntas.
const lastOf = (arr) => arr.slice().sort((a, b) => a.year - b.year || a.month - b.month || (a.kind === 'extra') - (b.kind === 'extra')).at(-1);

function calc(Y) {
  const cfg = data.cfg;
  const q = questionsOf(Y);
  const hpd = cfg.hoursPerDay || 8;
  const annual = cfg.annualHours || 1680;
  const slips = data.slips.filter((s) => s.year === Y).sort((a, b) => a.month - b.month || (a.kind === 'extra') - (b.kind === 'extra'));
  const all = data.slips;
  const regularRef = lastOf(slips.filter((s) => s.regular > 0)) || lastOf(all.filter((s) => s.regular > 0));
  const irpfRef = lastOf(slips.filter((s) => s.irpfPct != null))?.irpfPct ?? lastOf(all.filter((s) => s.irpfPct != null))?.irpfPct ?? 0;

  // Líneas de huelga en las nóminas del año
  const lines = slips.flatMap((s) => s.strike.map((l) => ({ ...l, slip: s })));
  const salLines = lines.filter((l) => l.kind === 'salary');
  const extraLines = lines.filter((l) => l.kind === 'extra');
  const strikeMonths = new Set(all.flatMap((s) => s.strike.filter((l) => l.kind === 'salary' && !l.cot).map((l) => l.origin)));

  // Precio de la hora de huelga: el de las nóminas o, sin líneas, el sueldo del mes × 12 ÷ jornada
  const detH = sum(salLines.filter((l) => l.hours), (l) => l.hours);
  const detE = sum(salLines.filter((l) => l.hours), (l) => l.amount);
  const autoRate = detH ? detE / detH : regularRef ? (regularRef.regular * 12) / annual : 0;
  const rate = cfg.rate || autoRate;
  // Precio de la hora en la paga extra: paga ÷ horas del semestre (jornada ÷ 2)
  const extraRef = lastOf(slips.filter((s) => s.extraGross > 0)) || lastOf(all.filter((s) => s.extraGross > 0));
  const extraAmount = extraRef?.extraGross || regularRef?.regular || 0;
  const autoExtraRate = extraAmount / (annual / 2);
  const extraRate = cfg.extraRate || autoExtraRate;
  const ratioRead = extraLines.filter((l) => l.hours).length ? sum(extraLines, (l) => l.amount) / sum(extraLines, (l) => l.hours) : null;

  // Proporción de cotización devuelta sobre lo descontado (para estimar la huelga pendiente)
  let ssSeen = 0, ssBase = 0;

  // Impacto en cada nómina
  const perSlip = slips.map((s) => {
    const sal = s.strike.filter((l) => l.kind === 'salary');
    const ext = s.strike.filter((l) => l.kind === 'extra');
    const gross = round2(sum(s.strike, (l) => l.amount));
    const ss = round2(sum(s.ssBack.filter((b) => strikeMonths.has(b.origin)), (b) => b.amount));
    const noCot = sum(sal.filter((l) => !l.cot), (l) => l.amount);
    if (ss && noCot) { ssSeen += ss; ssBase += noCot; }
    const irpf = round2(gross * (s.irpfPct || 0) / 100);
    return { slip: s, sal, ext, gross, ss, irpf, net: round2(gross - ss - irpf) };
  }).filter((x) => x.gross || x.ss);
  const ssRatio = ssBase ? ssSeen / ssBase : 0;

  // Huelga aún sin descontar (respuesta 1)
  const pending = (q.pending.on ? q.pending.items : []).map((it) => {
    const hours = (Number(it.days) || 0) * hpd;
    const gross = round2(hours * rate);
    const ss = round2(gross * ssRatio);
    const irpf = round2(gross * irpfRef / 100);
    const dup = salLines.some((l) => l.origin === ymOf(Y, it.month));
    return { ...it, hours, gross, ss, irpf, net: round2(gross - ss - irpf), dup };
  });

  // Horas de huelga por mes del año (las de nóminas, por su mes de origen, más las pendientes)
  const hoursByMonth = Array(13).fill(0);
  const grossByMonth = Array(13).fill(0);
  for (const l of salLines) {
    if (!l.origin.startsWith(`${Y}-`)) continue;
    const m = Number(l.origin.slice(5));
    hoursByMonth[m] += l.hours || (rate ? l.amount / rate : 0);
    grossByMonth[m] += l.amount;
  }
  for (const p of pending) { hoursByMonth[p.month] += p.hours; grossByMonth[p.month] += p.gross; }
  const totalHours = sum(hoursByMonth);

  // Pagas extra: julio (ene–jun) y diciembre (jul–dic)
  const extras = [
    { key: 'jul', name: 'Paga extra de julio', from: 1, to: 6, paid: 7 },
    { key: 'dic', name: 'Paga extra de diciembre', from: 7, to: 12, paid: 12 },
  ].map((e) => {
    const hours = sum(hoursByMonth.slice(e.from, e.to + 1));
    // El descuento de la extra (0500) se cobra en julio o en diciembre (o en el mes de antes/después)
    const applied = extraLines.filter((l) => (e.key === 'jul' ? l.slip.month <= 9 : l.slip.month > 9));
    const appliedH = sum(applied, (l) => l.hours);
    const appliedE = round2(sum(applied, (l) => l.amount));
    const appliedIrpf = round2(sum(applied, (l) => l.amount * (l.slip.irpfPct || 0) / 100));
    const pendingH = Math.max(0, hours - appliedH);
    const pendingE = round2(pendingH * extraRate);
    const gross = round2(appliedE + pendingE);
    const irpf = round2(appliedIrpf + pendingE * irpfRef / 100);
    const slipLoaded = slips.some((s) => s.kind === 'extra' && s.month === e.paid);
    return { ...e, hours, appliedH, appliedE, pendingH, pendingE, gross, irpf, net: round2(gross - irpf), slipLoaded };
  });

  // Pagas adicionales no previstas (respuesta 2): proporción de horas de huelga en su periodo
  const extraPays = (q.extraPays.on ? q.extraPays.items : []).map((it) => {
    const from = Math.min(it.from || 1, it.to || 12), to = Math.max(it.from || 1, it.to || 12);
    const hours = sum(hoursByMonth.slice(from, to + 1));
    const periodH = (annual / 12) * (to - from + 1);
    const gross = round2(Math.min(1, periodH ? hours / periodH : 0) * (Number(it.amount) || 0));
    const irpf = round2(gross * irpfRef / 100);
    return { ...it, from, to, hours, gross, irpf, net: round2(gross - irpf) };
  });

  // Subida salarial (respuesta 3): los atrasos de los meses de huelga desde que se aplica
  let raise = null;
  if (q.raise.on && q.raise.pct) {
    const p = q.raise.pct / 100;
    const from = q.raise.from || 1;
    const salary = sum(grossByMonth.slice(from));
    const extraPart = sum(hoursByMonth.slice(from), (h) => h * extraRate);
    const gross = round2((salary + extraPart) * p);
    const irpf = round2(gross * irpfRef / 100);
    raise = { pct: q.raise.pct, from, gross, irpf, net: round2(gross - irpf) };
  }

  // Bonus (respuesta 4): % sobre el salario base que no se cobra × performance
  const bonusPctAuto = lastOf(all.filter((s) => s.bonusPct))?.bonusPct ?? null;
  let bonus = null;
  if (q.bonus.on) {
    const pct = q.bonus.pct ?? bonusPctAuto ?? 0;
    const perf = q.bonus.perf ?? 100;
    const baseShare = regularRef?.base && regularRef.regular ? regularRef.base / regularRef.regular : 1;
    const lost = sum(grossByMonth) + sum(extras, (e) => e.gross) + (raise ? raise.gross : 0);
    const gross = round2(lost * baseShare * (pct / 100) * (perf / 100));
    const irpf = round2(gross * irpfRef / 100);
    bonus = { pct, perf, baseShare, gross, irpf, net: round2(gross - irpf) };
  }

  const blocks = [
    { key: 'slips', name: 'Nóminas', note: 'descontado por huelga', gross: sum(perSlip, (x) => sum(x.sal, (l) => l.amount)), net: null },
    { key: 'pending', name: 'Huelga sin descontar', note: 'estimado', gross: sum(pending, (p) => p.gross) },
    ...extras.map((e) => ({ key: e.key, name: e.name, note: e.pendingE ? (e.appliedE ? 'parte estimada' : 'estimado') : 'descontado', gross: e.gross })),
    { key: 'extraPays', name: 'Pagas adicionales', note: 'estimado', gross: sum(extraPays, (x) => x.gross), hide: !q.extraPays.on },
    { key: 'raise', name: 'Subida salarial', note: 'atrasos, estimado', gross: raise?.gross || 0, hide: !q.raise.on },
    { key: 'bonus', name: 'Bonus', note: 'se cobra después, estimado', gross: bonus?.gross || 0, hide: !q.bonus.on },
  ];
  // Neto de cada bloque
  const salSS = sum(perSlip, (x) => x.ss);
  const salIrpf = sum(perSlip, (x) => sum(x.sal, (l) => l.amount) * (x.slip.irpfPct || 0) / 100);
  blocks[0].net = round2(blocks[0].gross - salSS - salIrpf);
  blocks[1].net = round2(sum(pending, (p) => p.net));
  blocks[2].net = extras[0].net;
  blocks[3].net = extras[1].net;
  blocks[4].net = round2(sum(extraPays, (x) => x.net));
  blocks[5].net = raise?.net || 0;
  blocks[6].net = bonus?.net || 0;
  const gross = round2(sum(blocks, (b) => b.gross));
  const net = round2(sum(blocks, (b) => b.net));

  return {
    Y, slips, perSlip, pending, extras, extraPays, raise, bonus, blocks, gross, net,
    totalHours, days: totalHours / hpd, hoursByMonth, rate, autoRate, extraRate, autoExtraRate, ratioRead,
    irpfRef, ssRatio, bonusPctAuto, hpd, annual,
  };
}

// ---------- Pantalla ----------

let selYear = new Date().getFullYear();
function years() {
  const ys = new Set(data.slips.map((s) => s.year));
  Object.entries(data.years).forEach(([y, q]) => { if (q.pending?.items?.length || q.extraPays?.items?.length) ys.add(Number(y)); });
  ys.add(selYear);
  return [...ys].sort((a, b) => a - b);
}

const monthOptions = (sel) => MONTHS.map((m, i) => `<option value="${i + 1}" ${sel === i + 1 ? 'selected' : ''}>${cap(m)}</option>`).join('');
const toggle = (path, on) => `<button type="button" class="switch ${on ? 'on' : ''}" data-toggle="${path}" role="switch" aria-checked="${on}"><span></span></button>`;

function slipTitle(s) {
  return s.kind === 'extra' ? `Paga extra de ${MONTHS[s.month - 1]}` : cap(MONTHS[s.month - 1]);
}

function render() {
  const C = calc(selYear);
  const q = questionsOf(selYear);
  const ys = years();
  const view = $('view');
  const hasSlips = C.slips.length > 0;

  view.innerHTML = `
    ${ys.length > 1 ? `<div class="years" role="tablist">${ys.map((y) => `<button type="button" class="${y === selYear ? 'on' : ''}" data-year="${y}">${y}</button>`).join('')}</div>` : ''}

    <section class="hero card">
      <p class="label">Impacto de la huelga · ${selYear}</p>
      <p class="hero-net">${loss(C.net)}</p>
      <p class="hero-sub">netos estimados · ${loss(C.gross)} brutos</p>
      <div class="hero-stats">
        <span><b>${daysText(C.days)}</b><small>de huelga</small></span>
        <span><b>${hoursText(C.totalHours)}</b><small>a ${money(C.rate)}/h</small></span>
        <span><b>${C.days ? loss(C.net / C.days) : '—'}</b><small>netos por día</small></span>
      </div>
    </section>

    <section class="group">
      <h2 class="label">Nóminas</h2>
      ${hasSlips ? `
        <div class="list">
          ${C.slips.filter((s) => C.perSlip.some((p) => p.slip === s)).map((s) => {
            const x = C.perSlip.find((p) => p.slip === s);
            const hours = x ? sum(x.sal, (l) => l.hours) : 0;
            const sub = x
              ? [x.sal.length ? `${hoursText(hours)} de huelga de ${[...new Set(x.sal.map((l) => MONTHS[Number(l.origin.slice(5)) - 1]))].join(' y ')}` : '',
                 x.ext.length ? 'descuento en la extra' : '', x.ss ? `te devuelven ${money(x.ss)} de cotización` : ''].filter(Boolean).join(' · ')
              : s.source === 'generic' ? 'Otra empresa: solo totales' : 'Sin descuentos por huelga';
            return `<button type="button" class="row ${x ? 'hit' : ''}" data-slip="${s.id}">
              <span class="row-icon">${icon(s.kind === 'extra' ? 'gift' : x ? 'bolt' : 'doc', 18)}</span>
              <span class="row-text"><b>${slipTitle(s)}</b><small>${sub}</small></span>
              <span class="row-amt">${x ? `<b>${loss(x.net)}</b><small>${loss(x.gross)} bruto</small>` : `<small class="ok">sin impacto</small>`}</span>
            </button>`;
          }).join('')}
          ${C.slips.some((s) => !C.perSlip.some((p) => p.slip === s)) ? `
            <div class="card calm">
              <p class="small muted">Sin impacto de la huelga</p>
              <div class="chips">${C.slips.filter((s) => !C.perSlip.some((p) => p.slip === s)).map((s) =>
                `<button type="button" class="chip" data-slip="${s.id}">${s.kind === 'extra' ? `Extra ${MONTHS_SHORT[s.month - 1]}` : cap(MONTHS_SHORT[s.month - 1])}${s.source === 'generic' ? ' *' : ''}</button>`).join('')}</div>
              ${C.slips.some((s) => s.source === 'generic' && !C.perSlip.some((p) => p.slip === s)) ? '<p class="small muted">* De otra empresa: solo se leen los totales. Si tuvo huelga, añádela en la primera pregunta.</p>' : ''}
            </div>` : ''}
        </div>` : `
        <button type="button" class="empty card" data-add>
          ${icon('upload', 28)}
          <b>Añade tus nóminas en PDF</b>
          <small>Una o varias del mismo año. Se leen en tu dispositivo: no se suben a ningún sitio.</small>
        </button>`}
      ${hasSlips ? `<button type="button" class="ghost-btn add-more" data-add>${icon('plus', 18)} Añadir nóminas</button>` : ''}
    </section>

    <section class="group">
      <h2 class="label">Pagas extra</h2>
      <div class="extras">
        ${C.extras.map((e) => `
          <div class="card extra">
            <p class="extra-name">${icon('gift', 18)} ${e.name}</p>
            <p class="extra-amt">${loss(e.net)}</p>
            <p class="small muted">${loss(e.gross)} bruto · ${hoursText(e.hours)} de huelga de ${MONTHS_SHORT[e.from - 1]} a ${MONTHS_SHORT[e.to - 1]}</p>
            ${e.appliedE ? `<p class="small">Descontado en nómina: <b>${loss(e.appliedE)}</b> (${hoursText(e.appliedH)})</p>` : ''}
            ${e.pendingE ? `<p class="small warn-t">Pendiente de descontar: <b>${loss(e.pendingE)}</b> (${hoursText(e.pendingH)} × ${money(C.extraRate)})</p>` : ''}
            ${!e.hours ? '<p class="small ok">Sin huelga en el semestre</p>' : ''}
          </div>`).join('')}
      </div>
    </section>

    <section class="group">
      <h2 class="label">Preguntas</h2>
      <div class="checklist">
        <div class="card q ${q.pending.on ? 'open' : ''}">
          <div class="q-head">${icon('calendar', 20)}<span><b>¿Hay días de huelga que aún no salen en las nóminas?</b><small>Huelga reciente que se descontará más adelante</small></span>${toggle('pending', q.pending.on)}</div>
          ${q.pending.on ? `
            <div class="q-body">
              ${C.pending.map((p) => `
                <div class="q-row" data-pending="${p.id}">
                  <label class="field"><span>Mes</span><select data-f="month">${monthOptions(p.month)}</select></label>
                  <label class="field"><span>Días</span><input data-f="days" inputmode="decimal" value="${formatInput(p.days)}" placeholder="0"></label>
                  <span class="q-amt">${loss(p.gross)}</span>
                  <button type="button" class="mini-btn" data-del aria-label="Quitar">${icon('close', 16)}</button>
                  ${p.dup ? '<p class="small warn-t q-note">Ese mes ya tiene descuento por huelga en una nómina: no lo cuentes dos veces.</p>' : ''}
                </div>`).join('')}
              <button type="button" class="ghost-btn small-btn" data-add-pending>${icon('plus', 16)} Añadir mes</button>
              <p class="small muted">Cada día: ${hoursText(C.hpd)} × ${money(C.rate)}/h${C.ssRatio ? `, menos la cotización (${pctText(C.ssRatio * 100)}) y` : ', menos'} el IRPF (${pctText(C.irpfRef)}).</p>
            </div>` : ''}
        </div>

        <div class="card q ${q.extraPays.on ? 'open' : ''}">
          <div class="q-head">${icon('gift', 20)}<span><b>¿Habrá pagas adicionales no previstas?</b><small>Una paga de convenio, un pago único… que se genere por días trabajados</small></span>${toggle('extraPays', q.extraPays.on)}</div>
          ${q.extraPays.on ? `
            <div class="q-body">
              ${C.extraPays.map((p) => `
                <div class="q-row wide" data-pay="${p.id}">
                  <label class="field grow"><span>Nombre</span><input data-f="name" value="${esc(p.name)}" placeholder="Paga adicional"></label>
                  <label class="field"><span>Importe bruto</span><input data-f="amount" inputmode="decimal" value="${formatInput(p.amount)}" placeholder="0,00"></label>
                  <label class="field"><span>Se genera de</span><select data-f="from">${monthOptions(p.from)}</select></label>
                  <label class="field"><span>a</span><select data-f="to">${monthOptions(p.to)}</select></label>
                  <span class="q-amt">${loss(p.gross)}</span>
                  <button type="button" class="mini-btn" data-del aria-label="Quitar">${icon('close', 16)}</button>
                </div>`).join('')}
              <button type="button" class="ghost-btn small-btn" data-add-pay>${icon('plus', 16)} Añadir paga</button>
              <p class="small muted">Se pierde la parte de las horas de huelga sobre las horas del periodo (jornada de ${num(C.annual, 0)} h al año).</p>
            </div>` : ''}
        </div>

        <div class="card q ${q.raise.on ? 'open' : ''}">
          <div class="q-head">${icon('trend', 20)}<span><b>¿Esperas una subida salarial?</b><small>Con atrasos: también se pierde en los días de huelga</small></span>${toggle('raise', q.raise.on)}</div>
          ${q.raise.on ? `
            <div class="q-body">
              <div class="q-row" data-raise>
                <label class="field"><span>Subida</span><span class="unit"><input data-f="pct" inputmode="decimal" value="${formatInput(q.raise.pct)}" placeholder="0"><i>%</i></span></label>
                <label class="field"><span>Se aplica desde</span><select data-f="from">${monthOptions(q.raise.from)}</select></label>
                <span class="q-amt">${loss(C.raise?.gross || 0)}</span>
              </div>
              <p class="small muted">Sobre lo descontado por huelga (nóminas y pagas extra) desde ${MONTHS[(q.raise.from || 1) - 1]} de ${selYear}.</p>
            </div>` : ''}
        </div>

        <div class="card q ${q.bonus.on ? 'open' : ''}">
          <div class="q-head">${icon('star', 20)}<span><b>¿Cobras un bonus sobre la nómina?</b><small>Un % del salario, según el performance (100 % = objetivo)</small></span>${toggle('bonus', q.bonus.on)}</div>
          ${q.bonus.on ? `
            <div class="q-body">
              <div class="q-row" data-bonus>
                <label class="field"><span>Bonus</span><span class="unit"><input data-f="pct" inputmode="decimal" value="${formatInput(q.bonus.pct)}" placeholder="${C.bonusPctAuto != null ? formatInput(C.bonusPctAuto) : '0'}"><i>%</i></span></label>
                <label class="field"><span>Performance</span><span class="unit"><input data-f="perf" inputmode="decimal" value="${formatInput(q.bonus.perf)}" placeholder="100"><i>%</i></span></label>
                <span class="q-amt">${loss(C.bonus?.gross || 0)}</span>
              </div>
              <p class="small muted">${C.bonusPctAuto != null && q.bonus.pct == null ? `${pctText(C.bonusPctAuto)} leído de tus nóminas (complemento por resultado). ` : ''}Se calcula sobre el salario base que no cobras${C.bonus && C.bonus.baseShare < 0.999 ? ` (${pctText(C.bonus.baseShare * 100)} de lo descontado)` : ''}, con la subida si la hay.</p>
            </div>` : ''}
        </div>
      </div>
    </section>

    <section class="group">
      <h2 class="label">Resumen del impacto</h2>
      <div class="card table">
        <div class="t-row t-head"><span></span><span>Bruto</span><span>Neto</span></div>
        ${C.blocks.filter((b) => !b.hide).map((b) => `
          <div class="t-row"><span>${b.name}<small>${b.note}</small></span><span>${loss(b.gross)}</span><span>${loss(b.net)}</span></div>`).join('')}
        <div class="t-row t-total"><span>Total ${selYear}</span><span>${loss(C.gross)}</span><span>${loss(C.net)}</span></div>
      </div>
      <p class="note">Neto: lo bruto menos la cotización que te devuelven y el IRPF que no te retienen (al % de cada nómina; en lo estimado, ${pctText(C.irpfRef)}). Es una aproximación: la Renta del año puede ajustar el IRPF.</p>
    </section>

    <section class="group">
      <details class="card settings">
        <summary>${icon('sliders', 20)}<span>Ajustes del cálculo</span>${icon('chevron', 16)}</summary>
        <div class="set-grid" data-cfg>
          <label class="field"><span>Horas por día de huelga</span><input data-f="hoursPerDay" inputmode="decimal" value="${formatInput(data.cfg.hoursPerDay)}"></label>
          <label class="field"><span>Jornada anual (horas)</span><input data-f="annualHours" inputmode="decimal" value="${formatInput(data.cfg.annualHours)}"></label>
          <label class="field"><span>Precio hora de huelga (€)</span><input data-f="rate" inputmode="decimal" value="${formatInput(data.cfg.rate)}" placeholder="${num(C.autoRate)}"></label>
          <label class="field"><span>Precio hora en paga extra (€)</span><input data-f="extraRate" inputmode="decimal" value="${formatInput(data.cfg.extraRate)}" placeholder="${num(C.autoExtraRate)}"></label>
        </div>
        <p class="small muted">Vacío = automático. La hora de huelga sale de tus nóminas${C.ratioRead ? `; en la paga extra, tus nóminas dan ${money(C.ratioRead)}/h` : ''}. La hora en la paga extra es la paga ÷ media jornada anual (cada extra se genera en un semestre).</p>
      </details>
    </section>

    <p class="note">Todo se calcula y se guarda en este dispositivo.</p>`;

  bindView(view);
}

// Guarda un número de un campo (vacío = null)
const fieldNum = (el) => (el.value.trim() === '' ? null : parseAmount(el.value));

function bindView(view) {
  view.querySelectorAll('[data-year]').forEach((b) => b.addEventListener('click', () => { selYear = Number(b.dataset.year); render(); }));
  view.querySelectorAll('[data-add]').forEach((b) => b.addEventListener('click', () => $('file-input').click()));
  view.querySelectorAll('[data-slip]').forEach((b) => b.addEventListener('click', () => openSlipSheet(b.dataset.slip)));
  const q = questionsOf(selYear);
  view.querySelectorAll('[data-toggle]').forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.toggle;
    q[k].on = !q[k].on;
    if (q[k].on && k === 'pending' && !q.pending.items.length) q.pending.items.push({ id: uid(), month: new Date().getMonth() + 1, days: null });
    if (q[k].on && k === 'extraPays' && !q.extraPays.items.length) q.extraPays.items.push({ id: uid(), name: '', amount: null, from: 1, to: 12 });
    persist(); render();
  }));
  const onChange = (sel, fn) => view.querySelectorAll(sel).forEach((row) => row.querySelectorAll('[data-f]').forEach((el) => el.addEventListener('change', () => { fn(row, el); persist(); render(); })));
  onChange('[data-pending]', (row, el) => {
    const it = q.pending.items.find((x) => x.id === row.dataset.pending);
    it[el.dataset.f] = el.dataset.f === 'month' ? Number(el.value) : fieldNum(el);
  });
  onChange('[data-pay]', (row, el) => {
    const it = q.extraPays.items.find((x) => x.id === row.dataset.pay);
    const f = el.dataset.f;
    it[f] = f === 'name' ? el.value.trim() : f === 'amount' ? fieldNum(el) : Number(el.value);
  });
  onChange('[data-raise]', (row, el) => { q.raise[el.dataset.f] = el.dataset.f === 'from' ? Number(el.value) : fieldNum(el); });
  onChange('[data-bonus]', (row, el) => { q.bonus[el.dataset.f] = fieldNum(el); });
  onChange('[data-cfg]', (row, el) => {
    const f = el.dataset.f;
    const v = fieldNum(el);
    data.cfg[f] = (f === 'rate' || f === 'extraRate') ? (v || null) : (v || (f === 'hoursPerDay' ? 8 : 1680));
  });
  view.querySelectorAll('[data-pending] [data-del]').forEach((b) => b.addEventListener('click', () => {
    q.pending.items = q.pending.items.filter((x) => x.id !== b.closest('[data-pending]').dataset.pending);
    persist(); render();
  }));
  view.querySelectorAll('[data-pay] [data-del]').forEach((b) => b.addEventListener('click', () => {
    q.extraPays.items = q.extraPays.items.filter((x) => x.id !== b.closest('[data-pay]').dataset.pay);
    persist(); render();
  }));
  view.querySelector('[data-add-pending]')?.addEventListener('click', () => { q.pending.items.push({ id: uid(), month: new Date().getMonth() + 1, days: null }); persist(); render(); });
  view.querySelector('[data-add-pay]')?.addEventListener('click', () => { q.extraPays.items.push({ id: uid(), name: '', amount: null, from: 1, to: 12 }); persist(); render(); });
  // Los ajustes se quedan abiertos al volver a pintar
  const det = view.querySelector('details.settings');
  if (det) { det.open = settingsOpen; det.addEventListener('toggle', () => { settingsOpen = det.open; }); }
}
let settingsOpen = false;

// ---------- Detalle de una nómina ----------

function closeSheet() {
  document.querySelector('.sheet-backdrop')?.remove();
}
function newSheet(center = false) {
  closeSheet();
  const back = document.createElement('div');
  back.className = `sheet-backdrop${center ? ' center' : ''}`;
  document.body.append(back);
  back.addEventListener('click', (e) => { if (e.target === back) closeSheet(); });
  return back;
}

function openSlipSheet(id) {
  const s = data.slips.find((x) => x.id === id);
  if (!s) return;
  const C = calc(s.year);
  const x = C.perSlip.find((p) => p.slip === s);
  const back = newSheet();
  back.innerHTML = `
    <div class="sheet" role="dialog" aria-modal="true" aria-label="${slipTitle(s)}">
      <h2 class="sheet-title">${slipTitle(s)} ${s.year}</h2>
      <p class="small muted">${esc(s.file || '')}${s.liquid ? ` · líquido ${money(s.liquid)}` : ''}${s.irpfPct != null ? ` · IRPF ${pctText(s.irpfPct)}` : ''}</p>
      ${x ? `
        <div class="card table">
          ${s.strike.map((l) => `<div class="t-row two"><span>${esc(l.name)}<small>${l.kind === 'extra' ? 'en esta nómina' : `huelga de ${ymText(l.origin)}`}${l.hours ? ` · ${hoursText(l.hours)} (${daysText(l.hours / C.hpd)})` : ''}</small></span><span>${loss(l.amount)}</span></div>`).join('')}
          ${x.ss ? `<div class="t-row two"><span>Cotización que te devuelven<small>no cotizas los días de huelga</small></span><span class="ok">+${money(x.ss)}</span></div>` : ''}
          ${x.irpf ? `<div class="t-row two"><span>IRPF que no te retienen<small>al ${pctText(s.irpfPct)} de esta nómina</small></span><span class="ok">+${money(x.irpf)}</span></div>` : ''}
          <div class="t-row two t-total"><span>Impacto neto</span><span>${loss(x.net)}</span></div>
        </div>` : `<p class="small">${s.source === 'generic'
          ? 'Esta nómina no es del formato SAP: se leen solo los totales y no se ha encontrado ninguna línea de huelga. Si la hay, añade esos días en la primera pregunta.'
          : 'Sin descuentos por huelga en esta nómina.'}</p>`}
      <div class="sheet-actions">
        <button type="button" class="ghost-btn danger" data-del>${icon('trash', 18)} Quitar</button>
        <button type="button" class="done-btn" data-close>Cerrar</button>
      </div>
    </div>`;
  back.querySelector('[data-close]').addEventListener('click', closeSheet);
  back.querySelector('[data-del]').addEventListener('click', () => {
    data.slips = data.slips.filter((v) => v.id !== id);
    persist(); closeSheet(); render();
    toast('Nómina quitada');
  });
}

// ---------- Menú ⋯ ----------

const MENU = [
  { label: 'Añadir nóminas', icon: 'upload', run: () => $('file-input').click() },
  { label: 'Opciones de visualización', icon: 'palette', run: () => openDisplaySheet() },
  { label: 'Borrar todo', icon: 'trash', run: () => confirmClear() },
  { label: 'Información', icon: 'info', run: () => openInfoSheet() },
];

function openMenu() {
  const menu = $('menu');
  menu.innerHTML = MENU.map((m, i) =>
    `<button class="menu-item" role="menuitem" data-i="${i}">${icon(m.icon, 20)}<span>${m.label}</span></button>`).join('');
  menu.querySelectorAll('.menu-item').forEach((b) => b.addEventListener('click', () => {
    closeMenu();
    MENU[b.dataset.i].run();
  }));
  const r = $('menu-btn').getBoundingClientRect();
  menu.style.top = `${r.bottom + 6}px`;
  menu.style.right = `${Math.max(8, window.innerWidth - r.right)}px`;
  menu.hidden = false;
  $('menu-btn').setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  $('menu').hidden = true;
  $('menu-btn').setAttribute('aria-expanded', 'false');
}
$('menu-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  if ($('menu').hidden) openMenu();
  else closeMenu();
});
document.addEventListener('click', (e) => {
  if (!$('menu').hidden && !e.target.closest('#menu')) closeMenu();
});
window.addEventListener('resize', closeMenu);

$('add-btn').addEventListener('click', () => $('file-input').click());
$('file-input').addEventListener('change', (e) => {
  const list = e.target.files;
  if (list?.length) importFiles(list);
  e.target.value = '';
});
// Arrastrar PDFs a la ventana (escritorio)
document.addEventListener('dragover', (e) => { e.preventDefault(); });
document.addEventListener('drop', (e) => {
  e.preventDefault();
  if (e.dataTransfer?.files?.length) importFiles(e.dataTransfer.files);
});

function confirmClear() {
  const back = newSheet(true);
  back.innerHTML = `
    <div class="sheet" role="dialog" aria-modal="true" aria-label="Borrar todo">
      <h2 class="sheet-title">¿Borrar todo?</h2>
      <p class="small muted">Se quitan las nóminas leídas, las respuestas y los ajustes de este dispositivo.</p>
      <div class="sheet-actions">
        <button type="button" class="ghost-btn" data-close>Cancelar</button>
        <button type="button" class="done-btn danger-fill" data-ok>Borrar</button>
      </div>
    </div>`;
  back.querySelector('[data-close]').addEventListener('click', closeSheet);
  back.querySelector('[data-ok]').addEventListener('click', () => {
    data = normData(null);
    persist(); closeSheet(); render();
    toast('Datos borrados');
  });
}

function openInfoSheet() {
  const back = newSheet(true);
  back.innerHTML = `
    <div class="sheet" role="dialog" aria-modal="true" aria-label="Información">
      <span class="install-logo">${logoSVG(56)}</span>
      <h2 class="sheet-title">StrikeCTRL</h2>
      <p class="small muted">Versión ${APP_VERSION} · by OmT Finance</p>
      <p class="small">Lee tus nóminas en PDF y calcula lo que te han costado los días de huelga: en cada nómina, en las pagas extra de julio y diciembre y, según tus respuestas, en pagas adicionales, en la subida salarial y en el bonus.</p>
      <p class="small muted">Las nóminas se leen en tu dispositivo y no se guardan: solo se guardan los importes necesarios para el cálculo.</p>
      <div class="sheet-actions"><button type="button" class="done-btn" data-close>Cerrar</button></div>
    </div>`;
  back.querySelector('[data-close]').addEventListener('click', closeSheet);
}

// ---------- Opciones de visualización (modo y fondo) ----------

const WALLS = {
  brasa: { name: 'Brasa', c: ['225 29 72', '251 146 60', '249 115 22', '159 18 57'] },
  acero: { name: 'Acero', c: ['100 116 139', '148 163 184', '59 130 246', '30 64 175'] },
  jade: { name: 'Jade', c: ['45 212 191', '103 232 249', '20 184 166', '8 145 178'] },
  oro: { name: 'Oro', c: ['251 191 36', '253 230 138', '245 158 11', '180 83 9'] },
};
const lightQuery = matchMedia('(prefers-color-scheme: light)');
let display = { theme: 'auto', wall: 'brasa', ...load(DISPLAY_KEY, {}) };
if (!WALLS[display.wall]) display.wall = 'brasa';

function applyDisplay() {
  const light = display.theme === 'light' || (display.theme === 'auto' && lightQuery.matches);
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  document.documentElement.dataset.wall = display.wall;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', light ? '#fdf4f1' : '#140a0b');
}
lightQuery.addEventListener('change', () => { if (display.theme === 'auto') applyDisplay(); });

function wallPreview(key) {
  const [c1, c2, c3, c4] = WALLS[key].c;
  const light = document.documentElement.dataset.theme === 'light';
  const a = light ? 0.4 : 0.5;
  const base = light ? '#fdf4f1' : '#140a0b';
  return `radial-gradient(70% 60% at 15% 10%, rgb(${c1} / ${a}), transparent 70%), radial-gradient(60% 55% at 90% 25%, rgb(${c2} / ${a * 0.8}), transparent 72%),
    radial-gradient(70% 60% at 75% 95%, rgb(${c3} / ${a * 0.85}), transparent 70%), radial-gradient(60% 55% at 5% 85%, rgb(${c4} / ${a * 0.8}), transparent 72%), ${base}`;
}

function openDisplaySheet() {
  const back = newSheet();
  const draw = () => {
    back.innerHTML = `
      <div class="sheet" role="dialog" aria-modal="true" aria-label="Opciones de visualización">
        <h2 class="sheet-title">Opciones de visualización</h2>
        <p class="opt-label">Modo</p>
        <div class="seg" role="group" aria-label="Modo">
          ${[['dark', 'Oscuro'], ['light', 'Claro'], ['auto', 'Automático']].map(([v, l]) =>
            `<button type="button" data-theme-opt="${v}" class="${display.theme === v ? 'on' : ''}" aria-pressed="${display.theme === v}">${l}</button>`).join('')}
        </div>
        <p class="muted small">${display.theme === 'auto' ? 'Sigue el modo claro u oscuro del sistema.' : '&nbsp;'}</p>
        <p class="opt-label">Fondo</p>
        <div class="walls">
          ${Object.entries(WALLS).map(([k, w]) =>
            `<button type="button" class="wall ${display.wall === k ? 'on' : ''}" data-wall-opt="${k}" style="background:${wallPreview(k)}" aria-pressed="${display.wall === k}">${w.name}</button>`).join('')}
        </div>
        <div class="sheet-actions"><button class="done-btn" type="button">Listo</button></div>
      </div>`;
    back.querySelectorAll('[data-theme-opt]').forEach((b) => b.addEventListener('click', () => {
      display.theme = b.dataset.themeOpt;
      save(DISPLAY_KEY, display);
      applyDisplay();
      draw();
    }));
    back.querySelectorAll('[data-wall-opt]').forEach((b) => b.addEventListener('click', () => {
      display.wall = b.dataset.wallOpt;
      save(DISPLAY_KEY, display);
      applyDisplay();
      draw();
    }));
    back.querySelector('.done-btn').addEventListener('click', closeSheet);
  };
  draw();
}

// ---------- Aviso breve ----------

let toastTimer = 0;
function toast(text, { warn = false, stay = false } = {}) {
  const el = $('toast');
  el.textContent = text;
  el.classList.toggle('warn', warn);
  el.hidden = false;
  clearTimeout(toastTimer);
  if (!stay) toastTimer = setTimeout(() => { el.hidden = true; }, warn ? 5000 : 2400);
}

// ---------- Pantalla de inicio ----------
// Sin botón Entrar: el logo aparece (el arco se dibuja), se ve un instante y se pasa sola a la app
// con la transición de cristal, como en las demás apps.
const SPLASH_HOLD_MS = 1700;
const SPLASH_OUT_MS = 1200;
function enterApp() {
  const body = document.body;
  if (!$('splash') || body.classList.contains('entering')) return;
  body.classList.add('entering');
  setTimeout(() => {
    $('splash').remove();
    body.classList.remove('booting', 'entering');
    maybeShowInstallHint();
  }, SPLASH_OUT_MS);
}
setTimeout(enterApp, SPLASH_HOLD_MS);

// ---------- Aviso: añadir a la pantalla de inicio (solo móvil y tablet) ----------

const ua = navigator.userAgent;
const isIOS = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
const isAndroid = /Android/.test(ua);
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const HINT_ICONS = {
  share: '<path d="M12 3.5v11M8 7.5l4-4 4 4"/><path d="M7 10.5H6a1.5 1.5 0 0 0-1.5 1.5v7A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-1"/>',
  more: '<circle cx="12" cy="5.5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="18.5" r="1.5" fill="currentColor"/>',
  add: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="M12 8.5v7M8.5 12h7"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
};
const hintIcon = (name) =>
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${HINT_ICONS[name]}</svg>`;

function maybeShowInstallHint() {
  if (!(isIOS || isAndroid) || isStandalone()) return;
  if (load(INSTALL_HINT_KEY, null) === 'off') return;
  const steps = isIOS
    ? [
        ['share', 'Pulsa el botón <b>Compartir</b> de Safari (abajo en el iPhone, arriba en el iPad).'],
        ['add', 'Desliza hacia abajo y elige <b>Añadir a pantalla de inicio</b>.'],
        ['check', 'Pulsa <b>Añadir</b>. El icono de StrikeCTRL aparecerá junto a tus apps.'],
      ]
    : [
        ['more', 'Pulsa el menú <b>⋮</b> de Chrome, arriba a la derecha.'],
        ['add', 'Elige <b>Añadir a pantalla de inicio</b> o <b>Instalar aplicación</b>.'],
        ['check', 'Confirma con <b>Instalar</b>. El icono de StrikeCTRL aparecerá junto a tus apps.'],
      ];
  const back = newSheet(true);
  back.innerHTML = `
    <div class="sheet install-sheet" role="dialog" aria-modal="true" aria-labelledby="install-title">
      <span class="install-logo">${logoSVG(56)}</span>
      <h2 class="sheet-title" id="install-title">Añade StrikeCTRL a tu pantalla de inicio</h2>
      <p class="muted small">Así la abrirás como una app más, a pantalla completa y con un solo toque.</p>
      <ol class="install-steps">
        ${steps.map(([ic, text]) => `<li><span class="step-icon">${hintIcon(ic)}</span><span>${text}</span></li>`).join('')}
      </ol>
      <div class="install-footer">
        <label class="no-more"><input type="checkbox" id="install-no-more" /> No mostrar más</label>
        <button class="done-btn" type="button" id="install-ok">Aceptar</button>
      </div>
    </div>`;
  back.querySelector('#install-ok').addEventListener('click', () => {
    if (back.querySelector('#install-no-more').checked) save(INSTALL_HINT_KEY, 'off');
    closeSheet();
  });
}

// ---------- Siempre en vertical ----------
try { screen.orientation?.lock?.('portrait').catch(() => {}); } catch (_) { /* no compatible */ }

// ---------- Sin zoom (Safari en iOS ignora user-scalable=no) ----------
document.addEventListener('gesturestart', (e) => e.preventDefault());

applyDisplay();
// Año inicial: el de la última nómina
if (data.slips.length) selYear = lastOf(data.slips).year;
render();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
