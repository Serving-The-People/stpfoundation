import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/philosophy",
        "/proposals",
        "/mission",
        "/meetings",
        "/chan",
        "/podcast",
        "/support",
        "/store",
      ],
      disallow: "/",
    },
    sitemap: "https://stp.world/sitemap.xml",
  };
}
