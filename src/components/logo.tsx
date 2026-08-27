import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" aria-label="NS Elevator home" className="flex items-center gap-3">
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="h-9 w-9"
        fill="none"
      >
        <rect x="0.75" y="0.75" width="38.5" height="38.5" stroke={inverse ? "white" : "#11110f"} strokeWidth="1.5" />
        <path d="M10 28V12L20 28V12" stroke={inverse ? "white" : "#11110f"} strokeWidth="2.2" />
        <path d="M23 12H31L23 28H31" stroke="#c98b53" strokeWidth="2.2" />
      </svg>
      <span className={`text-[0.76rem] font-bold tracking-[0.18em] uppercase ${inverse ? "text-white" : "text-[#11110f]"}`}>
        NS Elevator
      </span>
    </Link>
  );
}
