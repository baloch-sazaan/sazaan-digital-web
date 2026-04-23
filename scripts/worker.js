/**
 * Sazaan Digital: High-Performance Security & SEO Cloudflare Worker
 * Injects A+ Security Headers and Optimizes Caching at the Edge.
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Fetch from assets binding if available, otherwise fallback to global fetch
    const response = env.ASSETS ? await env.ASSETS.fetch(request) : await fetch(request);

    // 1. Initialize Headers
    const newHeaders = new Headers(response.headers);

    // 2. Strict Security Headers (Grade A+)
    newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    
    // Content Security Policy: Self, Google Fonts, and common CDNs
    newHeaders.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' https://analytics.ahrefs.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https:; upgrade-insecure-requests;");
    
    newHeaders.set("X-Frame-Options", "DENY");
    newHeaders.set("X-Content-Type-Options", "nosniff");
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    newHeaders.set("X-XSS-Protection", "1; mode=block");
    newHeaders.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");

    // 3. Dynamic Canonical Header (SEO)
    newHeaders.set("Link", `<${url.origin}${url.pathname}>; rel="canonical"`);
    
    // 4. Performance: Edge Caching for Static Assets
    const extension = url.pathname.split('.').pop();
    const staticAssets = ['webp', 'avif', 'woff2', 'css', 'js', 'png', 'svg', 'ico'];
    
    if (staticAssets.includes(extension)) {
      newHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      newHeaders.set("Cache-Control", "public, max-age=0, must-revalidate");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }
};
