import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/logo";

export default function AdminLoginPage() {
  return <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]"><div className="relative hidden lg:block"><Image src="/images/brand/cabin-concept.png" alt="Concept visualization of an elevator cabin" fill priority sizes="55vw" className="object-cover" /><span className="absolute left-7 top-7 bg-black px-3 py-2 text-[0.58rem] font-bold tracking-[0.15em] text-white uppercase">Authorized access</span></div><div className="flex min-h-screen items-center p-6 sm:p-12 lg:p-20"><div className="mx-auto w-full max-w-md"><Logo /><p className="eyebrow mt-20">Inquiry administration</p><h1 className="display mt-8 text-6xl">Sign in.</h1><p className="mt-6 text-sm leading-7 text-[#68665f]">Authentication is provided by Supabase. Access also requires explicit inclusion in the server-side admin allowlist.</p><LoginForm /><Link href="/" className="link-arrow mt-8">Back to website <span aria-hidden="true">↗</span></Link></div></div></div>;
}
