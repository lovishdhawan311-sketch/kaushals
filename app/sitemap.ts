import type { MetadataRoute } from "next";
const pages = ["", "/shop", "/collections", "/about", "/contact", "/cart", "/wishlist", "/search", "/checkout", "/products/aarohi-chandbalis", "/products/nura-pearl-drops", "/products/saanjh-layered-chain"];
export default function sitemap(): MetadataRoute.Sitemap { const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://kaushals.example"; return pages.map(url => ({ url: `${origin}${url}`, lastModified: new Date(), changeFrequency: "weekly", priority: url === "" ? 1 : .7 })); }
