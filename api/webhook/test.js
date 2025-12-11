
const store = require('../../lib/donationStore');

module.exports = (req, res) => {
  const body = req.body || {};
  store.pushDonation({
    universeId: body.universeId || 'test',
    donorName: body.donorName || body.donator || 'Tester',
    amount: body.amount || 0,
    message: body.message || 'test',
    source: 'test'
  });
  res.json({ ok:true });
};
