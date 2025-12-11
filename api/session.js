
const store = require('../lib/donationStore');

module.exports = (req, res) => {
  const universeId = req.method === 'POST' ? (req.body && req.body.universeId) : req.query.universeId;
  if (!universeId) return res.status(400).json({ ok:false, reason:'missing universeId' });
  const token = Math.random().toString(36).slice(2);
  // naive session: return token (not stored)
  res.json({ ok:true, token });
};
