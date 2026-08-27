import type { Metadata } from "next";
import { CtaBand, PageHero, ProductCard } from "@/components/ui";
import { T } from "@/components/language-provider";
import { products } from "@/content/products";

export const metadata: Metadata = { title: "Elevator Products", description: "Explore six project-configured elevator and escalator product families from NS Elevator.", alternates: { canonical: "/products" } };

export default function ProductsPage() {
  return <><PageHero eyebrow="Product system" eyebrowZh="产品体系" title="Six ways upward." titleZh="六种向上的方式。" intro="A shared engineering platform, configured around different passengers, loads, spaces, and operating patterns." introZh="基于统一工程平台，针对不同乘客、荷载、空间和运营模式进行配置。" index="Products / 01—06" indexZh="产品 / 01—06" /><section className="container-site py-16 md:py-24"><div className="grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div><div className="mt-16 border-t hairline pt-6 text-sm leading-6 text-[#6b6962]"><strong className="text-[#11110f]"><T en="Configuration note." zh="配置说明。" /></strong> <T en="Published specifications are intentionally withheld until product engineering data and target-market compliance information are verified." zh="在产品工程数据和目标市场合规信息完成核实前，暂不公开具体技术参数。" /></div></section><CtaBand title="Define the right configuration." titleZh="确定合适的产品配置。" /></>;
}
