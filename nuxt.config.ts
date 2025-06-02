// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@qirolab/nuxt-sanctum-authentication",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "@nuxtjs/seo",
    "nuxt-lodash",
    "nuxt-tiptap-editor",
  ],
  laravelSanctum: {
    apiUrl: process.env.LARAVEL_URL,
    authMode: "token",
    redirect: {
      enableIntendedRedirect: true,
      redirectToAfterLogin: "/panel/dashboard",
    },
    middlewareNames: {
      auth: "sanctum:auth",
      guest: "sanctum:guest",
    },
  },
  lodash: {
    upperAfterPrefix: false,
    prefix: "_",
  },
  tiptap: {
    prefix: "Tiptap",
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  future: {
    typescriptBundlerResolution: true,
  },
  features: {
    inlineStyles: false,
  },
  css: ["~/asses/css/tailwind.css"],
  experimental: {
    inlineRouteRules: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
  routeRules: {
    "/panel/**": { ssr: false },
    "/admin": { redirect: "/panel/dashboard" },
    "/dashboard": { redirect: "/panel/dashboard" },
  },
  $development: {
    seo: {
      debug: true,
    },
    experimental: {
      watcher: "parcel",
    },
    fonts: {
      devtools: true,
    },
  },
  $production: {
    robots: {
      sitemap: ["/sitemap.xml"],
      groups: [
        {
          userAgent: ["*"],
          allow: ["/"],
          disallow: ["/panel"],
        },
      ],
    },
    site: {
      trailingSlash: true,
      name: process.env.NUXT_APP_NAME,
      exclude: ["/dashboard/**", "/verify"],
    },
    nitro: {
      routeRules: {
        "/_nuxt/**": {
          headers: { "cache-control": `public,max-age=900,s-maxage=900` },
        },
        "/icons/**": {
          headers: {
            "cache-control": `public,max-age=31536000,s-maxage=31536000`,
          },
        },
      },
    },
  },
});
