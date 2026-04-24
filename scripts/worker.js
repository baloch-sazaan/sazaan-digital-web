export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = 'https://sazaanstudios.com';

    if (url.protocol === 'http:') {
      return Response.redirect(`https://${url.host}${url.pathname}${url.search}`, 301);
    }

    const assetResponse = await env.ASSETS.fetch(request);
    const contentType = assetResponse.headers.get('Content-Type') || '';
    const isHtml = contentType.includes('text/html');

    if (isHtml) {
      let html = await assetResponse.text();
      const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
      
      // ── FLATTEN CRITICAL PATH ──
      // 1. Identify critical assets
      const jsMatch = html.match(/src="([^"]+\.js)"/);
      const cssMatch = html.match(/href="([^"]+\.css)"/);
      
      let preloads = '';
      if (jsMatch) preloads += `<link rel="preload" href="${jsMatch[1]}" as="script" nonce="${nonce}">`;
      if (cssMatch) preloads += `<link rel="preload" href="${cssMatch[1]}" as="style" nonce="${nonce}">`;
      
      // 2. Preload Fonts (Montserrat 400, 700, 900 + JetBrains Mono)
      // We manually add preloads for the fonts that @fontsource generates in the assets folder
      // Since we don't know the hash, we scan the built CSS for font-face if possible, 
      // but a more robust way is to just let the browser find them, OR we can try to guess the assets.
      // Better: In index.html we will use standard names and let Vite handle it.
      
      // 3. Inject preloads at the absolute top of <head>
      html = html.replace('<head>', `<head>${preloads}`);

      // 4. Non-Blocking CSS + Critical Inline
      const cssRegex = /<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+\.css)["'][^>]*>/gi;
      html = html.replace(cssRegex, (match, href) => {
        return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${href}"></noscript>`;
      });

      // 5. Inlined Font-Face (Eliminates one network hop for font discovery)
      // We use font-display: swap to ensure text is visible immediately
      const fontFaceCSS = `
        @font-face{font-family:'Montserrat';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4MV96gx7M.woff2) format('woff2')}
        @font-face{font-family:'Montserrat';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4MV96gx7M.woff2) format('woff2')}
        @font-face{font-family:'JetBrains Mono';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/jetbrainsmono/v13/t6X24m62996re8E_M6mSpxpC.woff2) format('woff2')}
      `;
      html = html.replace('</head>', `<style nonce="${nonce}">${fontFaceCSS}</style></head>`);

      // 6. Security (Nonced)
      html = html.replace(/<script(?![^>]*nonce=)/g, `<script nonce="${nonce}"`);
      html = html.replace(/<style(?![^>]*nonce=)/g, `<style nonce="${nonce}"`);

      // 7. Comprehensive CSP
      const cspRules = [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://analytics.ahrefs.com`,
        `script-src-elem 'self' 'nonce-${nonce}' https://analytics.ahrefs.com`,
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https://*.supabase.co https://api.emailjs.com",
        "object-src 'none'",
        "base-uri 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests"
      ].join('; ');

      const response = new Response(html, {
        status: assetResponse.status,
        statusText: assetResponse.statusText,
        headers: new Headers(assetResponse.headers)
      });

      response.headers.set('Content-Type', 'text/html; charset=utf-8');
      response.headers.set('Content-Security-Policy', cspRules);
      response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      response.headers.set('Link', `<${origin}${url.pathname}>; rel="canonical"`);
      
      return response;
    }

    return assetResponse;
  }
};
