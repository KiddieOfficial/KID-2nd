
const store = require('../../../lib/donationStore');
const secret = require('../../../secretkey.json');

module.exports = (req, res) => {
  const universeId = req.query.universeId;
  const b = req.body || {};
  // map fields
  const donor = b.name || b.donor || 'Anon';
  const amount = b.amount || 0;
  const message = b.message || '';

  store.pushDonation({
    universeId,
    donorName: donor,
    amount: amount,
    message: message,
    source: 'sociabuzz'
  });
  res.json({ ok:true });
};
