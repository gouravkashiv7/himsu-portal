/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://himsu.in",
  generateRobotsTxt: true,
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://himsu.in/server-sitemap.xml", // If we have dynamic server-side sitemap in future
    ],
  },
};
