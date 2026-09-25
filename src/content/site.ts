export const siteConfig = {
  name: "NS Elevator",
  legalName: "NS Elevator",
  title: "NS Elevator — Engineering Vertical Movement",
  description:
    "NS Elevator provides complete elevator manufacturing, parts machining, and component production for elevator manufacturers, installers, maintenance providers, and distributors.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ns-elevator.example",
  accent: "#c98b53",
  nav: [
    { href: "/", label: "Home", labelZh: "首页" },
    { href: "/products", label: "Products", labelZh: "产品" },
    { href: "/solutions", label: "Solutions", labelZh: "解决方案" },
    { href: "/projects", label: "Projects", labelZh: "项目" },
    { href: "/about", label: "About", labelZh: "关于我们" },
    { href: "/service", label: "Service", labelZh: "服务" },
    { href: "/contact", label: "Contact", labelZh: "联系我们" },
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
