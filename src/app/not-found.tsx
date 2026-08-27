import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[#11110f] p-6 text-white"><div className="max-w-3xl text-center"><p className="eyebrow text-white/50">404 / Off route</p><h1 className="display mt-8 text-7xl md:text-9xl">This floor is not served.</h1><p className="mt-7 text-white/55">The page may have moved, or the address may be incomplete.</p><Link href="/" className="button-light mt-10">Return home <span aria-hidden="true">↗</span></Link></div></main>;
}
