# PixiePic updated Vercel project

## What changed
- Kept the existing HTML/CSS/JavaScript interface and browser-based tools.
- Added independently addressable static tool pages under `/tools/<tool>/` with unique titles, descriptions, canonical URLs, instructions, tips and FAQs.
- Added independently addressable `/about/`, `/privacy/`, `/disclaimer/`, `/terms/`, and `/contact/` routes using the existing legal/about content.
- Kept the homepage as a tool directory; tool selection updates the URL and direct route refreshes select the corresponding tool.
- Added `sitemap.xml`, `robots.txt`, and an `ads.txt` placeholder.
- Moved the Remove.bg secret to a Vercel serverless function (`/api/remove-background.js`). No provider secret is exposed in browser JavaScript.
- Changed the misleading “Watermark Remover” feature name to “Basic Image Enhancer”; its current operation only adjusts contrast and saturation and does not remove watermarks.
- Changed the contact form to open a prefilled email in the visitor's mail application instead of falsely claiming that a message was delivered.
- Updated the privacy wording to disclose the third-party background-processing provider.

## Deploy to Vercel
1. Upload the contents of this folder to your project repository (keep the folder structure).
2. In Vercel, open Project Settings → Environment Variables.
3. Add `REMOVE_BG_API_KEY` with the API key from your Remove.bg account. Do not add it to HTML or client-side JavaScript.
4. Redeploy after adding the variable. If you do not want to enable background removal yet, leave the variable unset; the tool will show a setup message.
5. Replace `https://www.pixiepic.com` in canonical URLs, Open Graph URLs, `sitemap.xml`, and `robots.txt` if your real domain is different. The original source used this domain, but it has not been verified as your deployed domain.
6. Replace `support@pixiepic.com` in the contact page and mailto handler if that is not your monitored support email.
7. Review the privacy policy against the exact services you actually use (hosting, analytics, ads, and background provider). Do not claim analytics or advertising are active unless they are.
8. Add the exact AdSense publisher record to `ads.txt` only when Google provides it. Do not invent a publisher ID.

## Important limitations before AdSense application
- This is a code update, not an AdSense approval or compliance guarantee.
- The contact form currently uses a `mailto:` handoff, not a server-side message inbox. It depends on the visitor having an email application configured.
- Background removal requires a valid Remove.bg API key and may incur provider charges or usage limits. Confirm the provider's current terms and pricing.
- The existing image-processing functions have not been fully browser-tested on every device or format. Test each tool before publishing.
- The existing policy/legal text is a starting point and must be reviewed for your real business details and data practices.
- The source HTML loads Tailwind from its CDN. Consider a production build/self-hosted CSS later for performance and reliability.
