import type { Metadata } from "next";
import { CtaBand, PageHero, ProductCard } from "@/components/ui";
import { products } from "@/content/products";

export const metadata: Metadata = { title: "Elevator Products", description: "Explore six project-configured elevator and escalator product families from NS Elevator.", alternates: { canonical: "/products" } };

export default function ProductsPage() {
  return <><PageHero eyebrow="Product system" title="Six ways upward." intro="A shared engineering platform, configured around different passengers, loads, spaces, and operating patterns." index="Products / 01—06" /><section className="container-site py-16 md:py-24"><div className="grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div><div className="mt-16 border-t hairline pt-6 text-sm leading-6 text-[#6b6962]"><strong className="text-[#11110f]">Configuration note.</strong> Published specifications are intentionally withheld until product engineering data and target-market compliance information are verified.</div></section><CtaBand title="Define the right configuration." /></>;
}
