const store = require('../lib/donationStore');

module.exports = (req, res) => {
  const universeId = req.query.universeId;

  if (!universeId) {
    return res.status(400).json({ error: "missing universeId" });
  }

  const data = store.getAndClear(universeId);

  console.log("POLL DIAMBIL:", data.length);

  res.json(data);
};
