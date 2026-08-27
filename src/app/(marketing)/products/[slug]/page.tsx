import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, ConceptLabel, CtaBand, JsonLd } from "@/components/ui";
import { getProduct, products } from "@/content/products";
import { absoluteUrl, buildQuoteHref } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.seoDescription, alternates: { canonical: `/products/${product.slug}` }, openGraph: { title: product.seoTitle, description: product.seoDescription, images: [product.heroImage.src] } };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const quoteHref = buildQuoteHref(product.name, `/products/${product.slug}`);
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.overview, image: absoluteUrl(product.heroImage.src), brand: { "@type": "Brand", name: "NS Elevator" }, url: absoluteUrl(`/products/${product.slug}`) }} />
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.name }]} />
    <section className="container-site pb-16 md:pb-24">
      <div className="grid gap-10 border-t hairline pt-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <div><p className="eyebrow">{product.index} / {product.category}</p><h1 className="display mt-8 text-[clamp(4rem,9vw,9.5rem)] leading-[0.82]">{product.name}</h1></div>
        <div><p className="display text-3xl leading-tight">{product.tagline}</p><p className="mt-7 text-sm leading-7 text-[#65635d]">{product.overview}</p><Link href={quoteHref} className="button-dark mt-8">Request this product <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
    <section className="container-site"><div className="relative aspect-[16/8] overflow-hidden bg-[#d7d4cc]"><ConceptLabel /><Image priority src={product.heroImage.src} alt={product.heroImage.alt} fill sizes="100vw" className="object-cover" /></div><p className="mt-3 text-xs text-[#77746d]">{product.heroImage.caption}</p></section>
    <section className="container-site py-20 md:py-32"><div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]"><div><span className="eyebrow">Design intent</span><h2 className="display mt-8 text-5xl md:text-7xl">Engineered around the brief.</h2></div><div className="grid gap-8 sm:grid-cols-2">{product.benefits.map((benefit, index) => <article key={benefit} className="border-t hairline pt-6"><p className="text-[0.62rem] font-bold tracking-[0.15em] text-[#a96e3e]">{String(index + 1).padStart(2, "0")}</p><h3 className="display mt-10 text-3xl">{benefit}</h3><p className="mt-4 text-sm leading-6 text-[#6b6962]">Detailed performance and project outcomes are confirmed during engineering selection.</p></article>)}</div></div></section>
    <section className="bg-[#11110f] py-20 text-white md:py-28"><div className="container-site grid gap-14 lg:grid-cols-[0.6fr_1.4fr]"><div><span className="eyebrow text-white/50">Configuration framework</span><h2 className="display mt-8 text-5xl">Specification starts with context.</h2><p className="mt-6 text-sm leading-7 text-white/55">Values shown here are not performance claims. Final selections depend on traffic analysis, local codes, site conditions, and approved technical data.</p></div><div className="border-t border-white/20">{product.specifications.map((spec) => <div key={spec.label} className="grid gap-3 border-b border-white/20 py-5 sm:grid-cols-2"><dt className="text-[0.65rem] font-bold tracking-[0.13em] text-white/45 uppercase">{spec.label}</dt><dd className="text-sm text-white/85">{spec.value}</dd></div>)}</div></div></section>
    <section className="container-site py-20 md:py-32"><div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div className="relative aspect-[4/5] overflow-hidden"><ConceptLabel /><Image src={product.gallery[0].src} alt={product.gallery[0].alt} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" /></div><div className="flex flex-col justify-between gap-12"><div className="relative aspect-[16/10] overflow-hidden"><ConceptLabel /><Image src={product.gallery[1].src} alt={product.gallery[1].alt} fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover" /></div><div className="border-t hairline pt-7"><span className="eyebrow">Applications</span><div className="mt-6 flex flex-wrap gap-2">{product.applications.map((application) => <span key={application} className="border hairline px-4 py-3 text-[0.65rem] font-bold tracking-[0.11em] uppercase">{application}</span>)}</div><div className="mt-8 flex items-center justify-between border-t hairline pt-6"><div><p className="text-sm font-bold">Product brochure</p><p className="mt-1 text-xs text-[#77746d]">Technical brochure pending verification.</p></div><span className="text-[0.64rem] font-bold tracking-[0.13em] text-[#99968e] uppercase">Unavailable</span></div></div></div></div></section>
    <CtaBand title={`Discuss ${product.name.toLowerCase()} planning.`} />
  </>;
}
