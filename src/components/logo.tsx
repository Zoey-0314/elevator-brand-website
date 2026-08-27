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
        <path
          d="M31 13.2C30 12.3 28.6 11.8 27.1 11.8C24.7 11.8 23 13.3 23 15.5C23 17.8 24.8 18.8 27.2 19.8C29.5 20.7 31 21.9 31 24.1C31 26.5 29.1 28.2 26.5 28.2C24.8 28.2 23.2 27.6 22.1 26.4"
          stroke="#c98b53"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      <span className={`text-[0.76rem] font-bold tracking-[0.18em] uppercase ${inverse ? "text-white" : "text-[#11110f]"}`}>
        NS Elevator
      </span>
    </Link>
  );
}
