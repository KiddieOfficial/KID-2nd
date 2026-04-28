const store = require('../../../lib/donationStore');

module.exports = (req, res) => {
  const SECRET = process.env.SECRET;

  // 🔐 VALIDASI
  if (req.headers["x-secret"] !== SECRET) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const universeId = req.query.universeId;
  const b = req.body || {};

  const donor = b.donator_name || b.donor_name || b.name || "Anon";
  const amount = Number(b.amount) || 0;
  const message = b.message || "";

  if (!universeId) {
    return res.status(400).json({ error: "missing universeId" });
  }

  if (amount <= 0) {
    return res.status(400).json({ error: "invalid amount" });
  }

  console.log("WEBHOOK MASUK:", universeId, donor, amount);

  store.pushDonation({
    universeId,
    donorName: donor,
    amount,
    message,
    source: "saweria"
  });

  return res.json({ ok: true });
};
