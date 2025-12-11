
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    ok: true,
    msg: 'Donation bridge running',
    endpoints: {
      test: 'POST /api/webhook/test',
      saweria: 'POST /api/webhook/saweria/:universeId',
      sociabuzz: 'POST /api/webhook/sociabuzz/:universeId',
      tako: 'POST /api/webhook/tako/:universeId',
      bagibagi: 'POST /api/webhook/bagibagi/:universeId',
      tail: 'GET /api/tail?universeId=xxx',
      poll: 'GET /api/poll?universeId=xxx&after=0'
    }
  }));
};
