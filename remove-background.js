// Vercel Node.js serverless function. Configure REMOVE_BG_API_KEY in Vercel Project Settings.
export const config = { api: { bodyParser: { sizeLimit: '5mb' } } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  const apiKey = process.env.REMOVE_BG_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Background removal is not configured yet. Add REMOVE_BG_API_KEY in Vercel project environment variables.' });

  try {
    const { imageBase64, mimeType } = req.body || {};
    if (typeof imageBase64 !== 'string' || !imageBase64 || imageBase64.length > 4_000_000) {
      return res.status(400).json({ error: 'Please upload an image smaller than approximately 3 MB.' });
    }
    const allowed = new Set(['image/png', 'image/jpeg', 'image/webp']);
    const type = allowed.has(mimeType) ? mimeType : 'image/png';
    const bytes = Buffer.from(imageBase64, 'base64');
    if (!bytes.length) return res.status(400).json({ error: 'The uploaded image could not be read.' });

    const form = new FormData();
    form.append('image_file', new Blob([bytes], { type }), `upload.${type === 'image/jpeg' ? 'jpg' : type.split('/')[1]}`);
    form.append('size', 'auto');
    const upstream = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: { 'X-Api-Key': apiKey },
      body: form
    });
    if (!upstream.ok) {
      const detail = await upstream.text();
      return res.status(502).json({ error: `Background provider error (${upstream.status}). Check your provider account and API usage.`, detail: detail.slice(0, 500) });
    }
    const result = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).json({ error: 'Background removal could not be completed. Please try again.' });
  }
}
