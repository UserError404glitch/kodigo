import { ChevronRight } from "lucide-react";
import logo from "../assets/kodigo-logo.png";

/** Colors sampled from the design mockup. */
export const C = {
  bg: "#01132e",
  card: "#0a2a55",
  border: "#1b4f8f",
  cyan: "#14d0e6",
};

/** Icon + wordmark: KODI white, G teal, O yellow. */
export function KodigoLogo({ className = "", size = "h-11", text = "text-[26px]" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src={logo} alt="" className={`${size} w-auto`} />
      <span className={`font-['Poppins','Inter',sans-serif] ${text} font-extrabold leading-none tracking-wide text-white`}>
        KODI
        <span className="bg-gradient-to-b from-[#2ee6c5] to-[#06b6d4] bg-clip-text text-transparent">G</span>
        <span className="bg-gradient-to-b from-[#ffd84a] to-[#fbb024] bg-clip-text text-transparent">O</span>
      </span>
    </div>
  );
}

/**
 * Kody, the robot mascot, drawn as SVG. The drawing is cut flat at the bottom so it
 * sits cleanly on top of the login card. To use your own artwork instead, replace
 * the <svg> with <img src={kodyPng} className="w-56" alt="Kody" />.
 */
export function KodyMascot({ className = "w-56" }) {
  return (
    <svg
      viewBox="0 0 225 158"
      className={className}
      role="img"
      aria-label="Kody, your AI coding companion"
    >
      <defs>
        <linearGradient id="kHead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#a9c8f5" />
        </linearGradient>
        <linearGradient id="kBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6f0ff" />
          <stop offset="1" stopColor="#8db4ee" />
        </linearGradient>
        <linearGradient id="kPhone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1456e0" />
          <stop offset="1" stopColor="#3ea6ff" />
        </linearGradient>
        <radialGradient id="kAura" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3b8cff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3b8cff" stopOpacity="0" />
        </radialGradient>
        <filter id="kGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* soft blue glow behind the head (inside the drawing, so it never leaks over the card) */}
      <circle cx="104" cy="92" r="98" fill="url(#kAura)" />

      {/* yellow rays */}
      <g stroke="#ffc928" strokeWidth="5" strokeLinecap="round">
        <line x1="100" y1="30" x2="100" y2="10" />
        <line x1="126" y1="36" x2="135" y2="17" />
        <line x1="74" y1="36" x2="65" y2="17" />
        <line x1="149" y1="51" x2="163" y2="39" />
        <line x1="51" y1="51" x2="37" y2="39" />
      </g>

      {/* body + left shoulder */}
      <ellipse cx="100" cy="152" rx="40" ry="34" fill="url(#kBody)" />
      <ellipse cx="60" cy="152" rx="17" ry="21" fill="#8db4ee" />

      {/* right arm: short and thick, raised to wave */}
      <path d="M134 154 Q178 160 192 128" fill="none" stroke="#a9c8f8" strokeWidth="19" strokeLinecap="round" />
      <g fill="#c9defc" transform="rotate(-8 198 108)">
        <ellipse cx="198" cy="112" rx="13" ry="14" />
        <ellipse cx="188" cy="96" rx="4" ry="8.5" transform="rotate(-14 188 96)" />
        <ellipse cx="196.5" cy="92" rx="4" ry="9" />
        <ellipse cx="205" cy="94" rx="4" ry="8.5" transform="rotate(12 205 94)" />
        <ellipse cx="212" cy="102" rx="3.6" ry="7.5" transform="rotate(28 212 102)" />
        <ellipse cx="185" cy="113" rx="3.6" ry="7" transform="rotate(-40 185 113)" />
      </g>

      {/* headphones */}
      <rect x="16" y="62" width="28" height="58" rx="14" fill="url(#kPhone)" />
      <rect x="156" y="62" width="28" height="58" rx="14" fill="url(#kPhone)" />
      <rect x="22" y="72" width="10" height="38" rx="5" fill="#8fd0ff" opacity="0.8" />
      <rect x="168" y="72" width="10" height="38" rx="5" fill="#8fd0ff" opacity="0.8" />

      {/* head with a thin white rim and a big dark screen */}
      <rect x="34" y="42" width="132" height="98" rx="48" fill="url(#kHead)" />
      <rect x="43" y="50" width="114" height="82" rx="38" fill="#04122e" />
      <ellipse cx="78" cy="47" rx="26" ry="4.5" fill="#fff" opacity="0.7" />

      {/* face */}
      <g fill="none" stroke="#d6e9ff" strokeWidth="5" strokeLinecap="round" filter="url(#kGlow)">
        <path d="M63 91 q12 -18 24 0" />
        <path d="M113 91 q12 -18 24 0" />
        <path d="M88 109 q12 10 24 0" />
      </g>
    </svg>
  );
}

/** Python logo (simplified two-snake mark). */
export function PythonLogo({ className = "h-12 w-12" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        d="M23 5c-8 0-7.5 3.5-7.5 3.5V12h8v1.2H12.5S6 12.5 6 22c0 9.5 5.5 9.1 5.5 9.1H15v-4.4s-.2-5.6 5.5-5.6h8.8s5.3.1 5.3-5.1V10S35.5 5 23 5z"
        fill="#4b8bd0"
      />
      <path
        d="M25 43c8 0 7.5-3.5 7.5-3.5V36h-8v-1.2H35.5S42 35.5 42 26c0-9.5-5.5-9.1-5.5-9.1H33v4.4s.2 5.6-5.5 5.6h-8.8s-5.3-.1-5.3 5.1V38S12.5 43 25 43z"
        fill="#ffd43b"
      />
      <circle cx="19" cy="9.5" r="1.5" fill="#fff" />
      <circle cx="29" cy="38.5" r="1.5" fill="#fff" />
    </svg>
  );
}

/** Round blue "go" arrow button used on cards. */
export function GoButton({ label }) {
  return (
    <button
      aria-label={label}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#3b82f6]/70 bg-[#1c4ba8]/70 text-white shadow-[0_0_12px_rgba(59,130,246,0.35)] transition hover:bg-[#2459c7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14d0e6]"
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  );
}

/** Progress bar. Colors: "cyan" (track card) or "blue" (continue card). */
export function ProgressBar({ value, tone = "cyan", className = "" }) {
  const fill = tone === "cyan" ? "bg-[#00dff1]" : "bg-gradient-to-r from-[#1d6bff] to-[#3b9cff]";
  return (
    <div
      className={`h-1.5 w-full overflow-hidden rounded-full bg-[#092a53] ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={`h-full rounded-full ${fill}`} style={{ width: `${value}%` }} />
    </div>
  );
}
