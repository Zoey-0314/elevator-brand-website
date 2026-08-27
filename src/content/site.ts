export const siteConfig = {
  name: "NS Elevator",
  legalName: "NS Elevator",
  title: "NS Elevator — Engineering Vertical Movement",
  description:
    "Project-led elevator systems for residential, commercial, healthcare, hospitality, infrastructure, and industrial buildings.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ns-elevator.example",
  accent: "#c98b53",
  nav: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/solutions", label: "Solutions" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/service", label: "Service" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function buildQuoteHref(product?: string, source?: string) {
  const search = new URLSearchParams();
  if (product) search.set("product", product);
  if (source) search.set("source", source);
  const query = search.toString();
  return `/contact${query ? `?${query}` : ""}#inquiry`;
}
