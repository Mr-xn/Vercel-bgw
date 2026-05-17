export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 1, message: 'Missing ?url= parameter' });
  }

  try {
    const r = await fetch(url);
    const data = await r.text();
    res.setHeader('Content-Type', 'application/json');
    res.status(r.status).send(data);
  } catch (e) {
    res.status(502).json({ error: 1, message: `Proxy error: ${e.message}` });
  }
}
