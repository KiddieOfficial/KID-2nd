
const store = require('../lib/donationStore');

module.exports = (req, res) => {
  // simple auth via secret key in body or header
  const key = req.headers['x-admin-key'] || (req.body && req.body.admin_key);
  const secret = require('../secretkey.json');
  if (!key || key !== secret.admin_key) return res.status(403).json({ ok:false, reason:'forbidden' });

  const body = req.body || {};
  if (!body.universeId || !body.donorName || !body.amount) return res.status(400).json({ ok:false, reason:'missing fields' });

  const saved = store.pushDonation({
    universeId: body.universeId,
    donorName: body.donorName,
    amount: body.amount,
    message: body.message || '',
    source: 'manual'
  });

  res.json({ ok:true, saved });
};
