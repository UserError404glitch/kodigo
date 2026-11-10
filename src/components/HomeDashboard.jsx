import { useState } from "react";
import {
  Bell, ChevronDown, Flame, Star, Target, Code2, Home, BookOpen,
  BarChart3, ArrowRight, ListChecks, LogOut,
} from "lucide-react";
import { KodigoLogo, PythonLogo, GoButton, ProgressBar } from "./shared";

// Swap these for real data from Supabase later.
const DATA = {
  name: "Learner",
  streak: 7,
  lessonsCompleted: 3,
  challengesSolved: 1,
  currentTrack: "Python",
  track: { title: "Python Basics", blurb: "Master the fundamentals and build your first programs.", done: 3, total: 12, percent: 25 },
  daily: { title: "Variables and Data Types", blurb: "Learn how to store and work with different types of data in Python.", available: true },
  resume: { title: "Variables and Data Types", meta: "Python • 5 min left", percent: 30 },
};

const cardBase =
  "rounded-2xl border border-[#1b6fb8]/60 bg-[#031f41]/80 shadow-[0_0_24px_-10px_rgba(20,208,230,0.45)]";

function StatCard({ icon, value, label, valueSize = "text-xl" }) {
  return (
    <div className={`${cardBase} flex flex-1 items-center gap-2 px-3 py-3`}>
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#0a2a55]">{icon}</div>
      <div className="min-w-0">
        <p className={`${valueSize} font-bold leading-none text-white`}>{value}</p>
        <p className="mt-0.5 text-[10px] leading-tight text-[#8fb0d8]">{label}</p>
      </div>
    </div>
  );
}

const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "practice", label: "Practice", icon: Code2 },
  { id: "progress", label: "Progress", icon: BarChart3 },
];

function BottomNav({ active, onNavigate }) {
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-20 border-t border-[#1b4f8f]/60 bg-[#0b1a3d]/95 backdrop-blur">
      <ul className="mx-auto flex max-w-md items-center justify-around px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {NAV.map(({ id, label, icon: Icon }) => {
          const on = id === active;
          return (
            <li key={id} className="flex-1">
              <button
                onClick={() => onNavigate?.(id)}
                aria-current={on ? "page" : undefined}
                className={`mx-auto flex w-full max-w-[76px] flex-col items-center gap-1 rounded-2xl py-1.5 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14d0e6] ${
                  on
                    ? "border border-[#14d0e6]/50 bg-[#0e2a55]/70 text-[#fdc830] shadow-[0_0_14px_-4px_rgba(20,208,230,0.6)]"
                    : "border border-transparent text-[#9bb5e0] hover:text-white"
                }`}
              >
                <Icon className={`h-6 w-6 ${on ? "fill-[#fdc830]" : ""}`} aria-hidden />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function HomeDashboard({ onNavigate, onStartCoding, onSignOut, userName, data = DATA }) {
  const name = userName || data.name;
  const { streak, lessonsCompleted, challengesSolved, currentTrack, track, daily, resume } = data;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#01112c] bg-[radial-gradient(ellipse_at_50%_0%,#0a2a55_0%,#01112c_55%)] font-['Poppins','Inter',sans-serif] text-white">
      <main className="mx-auto w-full max-w-md space-y-4 px-5 pb-28 pt-5">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <KodigoLogo size="h-10" />
          <div className="relative flex items-center gap-4">
            <button aria-label="Notifications" className="relative rounded-full p-1 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14d0e6]">
              <Bell className="h-6 w-6" />
              <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[#fdc830] ring-2 ring-[#01112c]" />
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14d0e6] rounded-lg"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/80 bg-gradient-to-br from-[#5eead4] to-[#3b82f6] text-xl" aria-hidden>🧑</span>
              <span className="mt-0.5 flex max-w-[84px] items-center gap-0.5 truncate text-[10px] text-slate-200">
                <span className="truncate">{name}</span> <ChevronDown className="h-3 w-3 shrink-0" aria-hidden />
              </span>
            </button>
            {menuOpen && (
              <div role="menu" className="absolute right-0 top-[4.5rem] z-30 w-40 rounded-xl border border-[#1b4f8f] bg-[#0a2a55] p-1 shadow-xl">
                <button
                  role="menuitem"
                  onClick={onSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-[#1b4f8f]/50"
                >
                  <LogOut className="h-4 w-4" aria-hidden /> Log out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Greeting + streak */}
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0 pt-1">
            <h1 className="truncate text-[26px] font-bold leading-tight">Hi, {name}! <span aria-hidden>👋</span></h1>
            <p className="mt-1.5 max-w-[11.5rem] text-xs leading-snug text-slate-200">
              Keep going! You&apos;re doing great on your coding journey!
            </p>
          </div>
          <div className={`${cardBase} flex shrink-0 items-center gap-2 border-[#14d0e6]/50 px-4 py-3`}>
            <Flame className="h-9 w-9 fill-[#fb923c] text-[#f59e0b]" aria-hidden />
            <div>
              <p className="text-3xl font-bold leading-none">{streak}</p>
              <p className="mt-1 text-[11px] text-slate-200">Day Streak</p>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="flex gap-2.5">
          <StatCard icon={<BarChart3 className="h-5 w-5 text-[#22c55e]" aria-hidden />} value={lessonsCompleted} label="Lessons Completed" />
          <StatCard icon={<Star className="h-5 w-5 fill-[#fdc830] text-[#fdc830]" aria-hidden />} value={challengesSolved} label="Challenges Solved" />
          <StatCard icon={<Target className="h-5 w-5 text-[#14d0e6]" aria-hidden />} value={currentTrack} label="Current Track" valueSize="text-base" />
        </div>

        {/* Python Basics */}
        <section className={`${cardBase} p-4`}>
          <div className="flex items-center gap-4">
            <PythonLogo className="h-14 w-14 shrink-0" />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold">{track.title}</h2>
              <p className="text-xs leading-snug text-slate-300">{track.blurb}</p>
            </div>
            <GoButton label={`Open ${track.title}`} />
          </div>
          <div className="mt-3 flex items-center gap-3">
            <ProgressBar value={track.percent} tone="cyan" />
            <span className="shrink-0 text-xs text-slate-300">{track.percent}%</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">{track.done} / {track.total} lessons</p>
        </section>

        {/* Daily Challenge */}
        <section className={`${cardBase} p-3`}>
          <div className="flex items-center gap-3 px-1 pt-1">
            <Target className="h-8 w-8 shrink-0 text-[#fdc830]" aria-hidden />
            <div className="min-w-0 flex-1">
              <h2 className="font-bold">Daily Challenge</h2>
              <p className="text-xs text-slate-300">Solve today&apos;s problem and earn rewards!</p>
            </div>
            {daily.available && (
              <span className="flex items-center gap-1.5 rounded-full bg-[#0b3a40] px-2.5 py-1 text-[11px] font-medium text-[#34d399]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" /> Available
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[#1b6fb8]/50 bg-[#0a3a70]/70 p-3">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#0e4b8f]">
              <Code2 className="h-7 w-7 text-[#38bdf8]" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold">{daily.title}</h3>
              <p className="text-xs leading-snug text-slate-300">{daily.blurb}</p>
            </div>
            <GoButton label="Start daily challenge" />
          </div>
        </section>

        {/* Continue learning */}
        <div className="flex items-center justify-between pt-1">
          <h2 className="font-bold">Continue Learning</h2>
          <button className="flex items-center gap-1 text-sm font-semibold text-[#14d0e6] hover:underline">
            View All <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <section className={`${cardBase} p-3`}>
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#0a2a55]">
              <ListChecks className="h-8 w-8 text-[#3b9cff]" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold">{resume.title}</h3>
              <p className="text-xs text-slate-300">{resume.meta}</p>
              <div className="mt-2 flex items-center gap-3">
                <ProgressBar value={resume.percent} tone="blue" />
                <span className="shrink-0 text-xs text-slate-300">{resume.percent}%</span>
              </div>
            </div>
            <GoButton label={`Resume ${resume.title}`} />
          </div>
        </section>

        <button
          onClick={onStartCoding}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#fdd243] to-[#fdb628] py-3.5 text-base font-bold text-[#0b1530] shadow-lg shadow-amber-500/25 transition hover:brightness-110 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Code2 className="h-5 w-5" aria-hidden /> Start Coding <ArrowRight className="h-5 w-5" aria-hidden />
        </button>
      </main>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}
