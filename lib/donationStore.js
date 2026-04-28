let store = {}; 
let lastUpdate = {}; 

const TTL = 15000; // 15 detik (biar ga cepat hilang)

function ensure(u) {
  if (!store[u]) store[u] = [];
}

// 📥 simpan donasi
function pushDonation(d) {
  ensure(d.universeId);

  const item = {
    id: Date.now() + Math.floor(Math.random()*1000),
    donorName: d.donorName || "Anon",
    amount: Number(d.amount) || 0,
    message: d.message || "",
    ts: Date.now()
  };

  store[d.universeId].push(item);
  lastUpdate[d.universeId] = Date.now();

  console.log("STORE:", item);

  return item;
}

// 📤 ambil + clear (ANTI DUPLICATE)
function getAndClear(universeId) {
  ensure(universeId);

  const now = Date.now();

  // 🔥 kalau terlalu lama → reset
  if (now - (lastUpdate[universeId] || 0) > TTL) {
    store[universeId] = [];
    return [];
  }

  const data = store[universeId];
  store[universeId] = [];

  return data;
}

module.exports = {
  pushDonation,
  getAndClear
};
