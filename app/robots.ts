import type { MetadataRoute } from "next";

const indexar = process.env.VERAX_INDEXAR === "si";

export default function robots(): MetadataRoute.Robots {
  return indexar ? { rules: { userAgent: "*", allow: "/" } } : { rules: { userAgent: "*", disallow: "/" } };
}
