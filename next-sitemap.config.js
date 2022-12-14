const siteUrl = "https://blogs.yourappitunity.co.uk/";

module.exports = {
  siteUrl,
  generateRobotsTxt: true, // (optional)
  additionalSitemaps: [
    `${siteUrl}/sitemap.xml`,
    `${siteUrl}/server-sitemap.xml`,
  ],
  // ...other options
};
