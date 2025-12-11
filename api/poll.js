
const store = require('../lib/donationStore');

module.exports = (req, res) => {
  const universeId = req.query.universeId;
  const after = req.query.after || '0';
  if (!universeId) return res.status(400).json({ ok:false, reason:'missing universeId' });
  const list = store.getAfter(universeId, after);
  res.json(list);
};
