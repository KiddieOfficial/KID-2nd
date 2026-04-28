let store = {}; // { universeId: [donations] }

function ensure(u) {
  if (!store[u]) store[u] = [];
}

// 📥 push data dari webhook
function pushDonation(d) {
  ensure(d.universeId);

  const item = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    universeId: d.universeId,
    donorName: d.donorName || "Anon",
    amount: Number(d.amount) || 0,
    message: d.message || "",
    source: d.source || "unknown",
    ts: Date.now()
  };

  store[d.universeId].push(item);

  console.log("STORE MASUK:", item); // 🔥 debug

  return item;
}

// 📤 ambil semua + clear (ANTI DUPLICATE)
function getAndClear(universeId) {
  ensure(universeId);

  const data = store[universeId];
  store[universeId] = []; // 🔥 reset

  return data;
}

module.exports = {
  pushDonation,
  getAndClear
};
