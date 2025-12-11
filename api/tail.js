
const store = require('../lib/donationStore');

module.exports = (req, res) => {
  const universeId = req.query.universeId;
  if (!universeId) return res.status(400).json({ ok:false, reason:'missing universeId' });
  const tail = store.getTail(universeId);
  res.json({ ok:true, tail });
};
