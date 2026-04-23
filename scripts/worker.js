/**
 * Sazaan Digital: Fortress Security & Performance Engine
 * Objectives: 100/100 Mozilla Grade, 100/100 SEO, Zero-Lag Execution.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = 'https://sazaandigital.com';

    // ── HTTPS Enforced ──
    if (url.protocol === 'http:') {
      return Response.redirect(`https://${url.host}${url.pathname}${url.search}`, 301);
    }

    // ── Technical SEO: Robots.txt ──
    if (url.pathname === '/robots.txt') {
      return new Response(`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml`, {
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // ── Technical SEO: Sitemap.xml ──
    if (url.pathname === '/sitemap.xml') {
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
      return new Response(sitemap, {
        headers: { 'Content-Type': 'application/xml' }
      });
    }

    const response = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(response.headers);

    // ── Titan Security Shield ──
    newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    newHeaders.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-eval' https://analytics.ahrefs.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none'; upgrade-insecure-requests;");
    newHeaders.set('X-Frame-Options', 'DENY');
    newHeaders.set('X-Content-Type-Options', 'nosniff');
    newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    newHeaders.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');
    newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');
    newHeaders.set('Cross-Origin-Resource-Policy', 'same-origin');

    // ── SEO Authority ──
    newHeaders.set('Link', `<${origin}${url.pathname}>; rel="canonical"`);

    // ── Asset Optimization ──
    if (url.pathname.includes('/assets/') || url.pathname.endsWith('.webp')) {
      newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }
};
