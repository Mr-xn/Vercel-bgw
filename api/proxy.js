const ALLOWED_HOST = 'api.64clouds.com';

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

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return res.status(400).json({ error: 1, message: 'Invalid URL' });
  }

  if (parsed.hostname !== ALLOWED_HOST) {
    return res.status(403).json({ error: 1, message: `Only ${ALLOWED_HOST} is allowed` });
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
