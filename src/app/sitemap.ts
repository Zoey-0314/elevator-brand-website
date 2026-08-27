import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/content/site";
import { solutions } from "@/content/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/products", "/solutions", "/projects", "/about", "/quality", "/service", "/contact", "/privacy", "/terms"];
  const dynamicPaths = [...products.map((item) => `/products/${item.slug}`), ...solutions.map((item) => `/solutions/${item.slug}`), ...projects.map((item) => `/projects/${item.slug}`)];
  return [...staticPaths, ...dynamicPaths].map((path) => ({ url: absoluteUrl(path || "/"), changeFrequency: path.includes("/products/") || path.includes("/solutions/") ? "monthly" : "yearly", priority: path === "" ? 1 : path.split("/").length === 2 ? 0.8 : 0.65 }));
}
