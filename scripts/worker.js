export default {
  async fetch(request, env, ctx) {
    const response = await fetch(request);
    const newHeaders = new Headers(response.headers);

    // 1. STRICT SECURITY HEADERS
    // Content-Security-Policy: Allows self, analytics, and necessary fonts/images
    newHeaders.set(
      "Content-Security-Policy",
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' https://analytics.ahrefs.com https://cdnjs.cloudflare.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data: https://fonts.gstatic.com; " +
      "connect-src 'self' https://analytics.ahrefs.com https://*.supabase.co; " +
      "upgrade-insecure-requests;"
    );
    
    // Clickjacking Protection
    newHeaders.set("X-Frame-Options", "DENY");
    
    // Mime-type Sniffing Protection
    newHeaders.set("X-Content-Type-Options", "nosniff");
    
    // Referrer Policy
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    
    // HSTS (Force HTTPS)
    newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    
    // Permissions Policy (Camera/Microphone/Geo blocked for privacy)
    newHeaders.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");

    // 2. PERFORMANCE & CACHING HEADERS
    const url = new URL(request.url);
    const extension = url.pathname.split('.').pop();
    const staticExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'css', 'js', 'woff2', 'ico'];

    if (staticExtensions.includes(extension)) {
      // Long-term cache for immutable assets (fingerprinted by Vite)
      newHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      // Standard cache for HTML/other files
      newHeaders.set("Cache-Control", "public, max-age=3600");
    }

    // 3. CANONICAL & SEO INJECTION (Optional but recommended at edge)
    // Ensures the canonical matches the actual request URL to prevent duplicate content issues
    if (response.headers.get("content-type")?.includes("text/html")) {
      // We could rewrite the HTML here, but we'll stick to headers for reliability
      // and handle dynamic canonical in the HTML source as requested.
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
