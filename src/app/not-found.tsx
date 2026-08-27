import Link from "next/link";
import { T } from "@/components/language-provider";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[#11110f] p-6 text-white"><div className="max-w-3xl text-center"><p className="eyebrow text-white/50"><T en="404 / Off route" zh="404 / 未到达楼层" /></p><h1 className="display mt-8 text-7xl md:text-9xl"><T en="This floor is not served." zh="本楼层暂未开放。" /></h1><p className="mt-7 text-white/55"><T en="The page may have moved, or the address may be incomplete." zh="页面可能已移动，或网址不完整。" /></p><Link href="/" className="button-light mt-10"><T en="Return home" zh="返回首页" /> <span aria-hidden="true">↗</span></Link></div></main>;
}
