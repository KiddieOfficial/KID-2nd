const store = require('../../../lib/donationStore');

module.exports = (req, res) => {
  const SECRET = process.env.SECRET;

  if (req.headers["x-secret"] !== SECRET) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const universeId = req.query.universeId;
  const b = req.body || {};

  const donor = b.donator_name || b.donor_name || "Anon";
  const amount = Number(b.amount) || 0;
  const message = b.message || "";

  if (!universeId || amount <= 0) {
    return res.status(400).json({ error: "Invalid data" });
  }

  console.log("WEBHOOK:", donor, amount);

  store.pushDonation({
    universeId,
    donorName: donor,
    amount,
    message
  });

  res.json({ ok: true });
};
