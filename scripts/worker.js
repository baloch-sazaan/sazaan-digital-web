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

    // Fetch the asset from the binding
    const assetResponse = await env.ASSETS.fetch(request);
    const contentType = assetResponse.headers.get('Content-Type') || '';
    const isHtml = contentType.includes('text/html');

    // Create a new response with mutable headers
    let response;
    let nonce = '';

    if (isHtml) {
      // Generate a 128-bit random nonce
      nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
      
      let html = await assetResponse.text();
      // Inject the secret nonce into your script tags automatically
      html = html.replace(/<script/g, `<script nonce="${nonce}"`);
      
      response = new Response(html, assetResponse);
      response.headers.set('Content-Type', 'text/html; charset=utf-8');

      // ── Performance Preloading ──
      const preloads = [];
      const cssMatch = html.match(/href="([^"]+\.css)"/);
      if (cssMatch) preloads.push(`<${cssMatch[1]}>; rel=preload; as=style`);
      
      const fontMatches = html.matchAll(/href="([^"]+\.woff2)"/g);
      for (const m of fontMatches) {
        preloads.push(`<${m[1]}>; rel=preload; as=font; type="font/woff2"; crossorigin`);
      }

      const heroMatch = html.match(/src="([^"]+laptop-hero[^"]+\.webp)"/);
      if (heroMatch) preloads.push(`<${heroMatch[1]}>; rel=preload; as=image; fetchpriority=high`);
      
      if (preloads.length > 0) response.headers.set('Link', preloads.join(', '));

    } else {
      response = new Response(assetResponse.body, assetResponse);
      if (contentType.includes('text/') && !contentType.includes('charset')) {
        response.headers.set('Content-Type', `${contentType}; charset=utf-8`);
      }
    }

    // ── Titan Security Shield ──
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    const cspRules = [
      "default-src 'self'",
      `script-src 'self' ${nonce ? `'nonce-${nonce}'` : ''} 'unsafe-eval' https://analytics.ahrefs.com`,
      "style-src 'self' 'unsafe-inline'", // Tailwind/Framer requirement
      "font-src 'self' data:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://*.supabase.co https://api.emailjs.com",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].filter(Boolean).join('; ');

    response.headers.set('Content-Security-Policy', cspRules);
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
    
    // ── SEO Authority & Link Merging ──
    const existingLink = response.headers.get('Link') || '';
    const canonical = `<${origin}${url.pathname}>; rel="canonical"`;
    response.headers.set('Link', existingLink ? `${existingLink}, ${canonical}` : canonical);

    // ── Asset Optimization ──
    if (url.pathname.includes('/assets/') || url.pathname.endsWith('.webp')) {
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    return response;
  }
};
