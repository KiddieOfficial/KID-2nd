
const fs = require('fs');
const path = require('path');

const USE_FILE_PERSIST = false; // set true for simple file persistence (not recommended for Vercel)
const PERSIST_FILE = path.join(__dirname, '../data/donations.json');

let store = {}; // { universeId: [ {id, donorName, amount, message, source, ts} ] }

if (USE_FILE_PERSIST) {
  try {
    if (fs.existsSync(PERSIST_FILE)) {
      store = JSON.parse(fs.readFileSync(PERSIST_FILE, 'utf8'));
    }
  } catch(e) { console.warn('Failed to load persist file', e); }
}

function saveFile() {
  if (!USE_FILE_PERSIST) return;
  try {
    fs.mkdirSync(path.dirname(PERSIST_FILE), { recursive: true });
    fs.writeFileSync(PERSIST_FILE, JSON.stringify(store, null, 2));
  } catch(e) { console.warn('Failed to write persist file', e); }
}

function ensure(u) {
  if (!store[u]) store[u] = [];
}

function pushDonation(d) {
  ensure(d.universeId);
  const id = Date.now();
  const item = {
    id: id,
    universeId: d.universeId,
    donorName: d.donorName || 'Anon',
    amount: d.amount || 0,
    message: d.message || '',
    source: d.source || 'unknown',
    ts: Date.now()
  };
  store[d.universeId].push(item);
  saveFile();
  return item;
}

function getAfter(universeId, after) {
  ensure(universeId);
  const numAfter = Number(after) || 0;
  return store[universeId].filter(x => Number(x.id) > numAfter);
}

function getTail(universeId) {
  ensure(universeId);
  if (store[universeId].length === 0) return '0';
  return String(store[universeId][store[universeId].length - 1].id);
}

// Admin manual trigger across instance (note: in-memory only affects single instance)
function manualTrigger(data) {
  return pushDonation(data);
}

module.exports = {
  pushDonation,
  getAfter,
  getTail,
  manualTrigger
};
