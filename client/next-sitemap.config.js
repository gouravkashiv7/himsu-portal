/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://himsu.in",
  generateRobotsTxt: false, // We now use app/robots.ts
  exclude: ["/api/*", "/admin/*", "/dashboard/*", "/login", "/icon.png"],
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    // Custom priorities per route
    const priorities = {
      "/": 1.0,
      "/blood-donation": 0.9,
      "/resources": 0.8,
      "/faq": 0.7,
      "/join": 0.6,
    };

    const changefreqs = {
      "/": "daily",
      "/blood-donation": "daily",
      "/resources": "weekly",
      "/faq": "weekly",
      "/join": "monthly",
    };

    return {
      loc: path,
      changefreq: changefreqs[path] || config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
