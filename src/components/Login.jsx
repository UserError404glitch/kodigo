import { useState } from "react";
import { User, Lock, Eye, EyeOff, Mail, ArrowRight } from "lucide-react";
import { KodigoLogo, KodyMascot } from "./shared";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const GoogleG = () => (
  <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden>
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.5 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.8c4.3-4 6.9-9.9 6.9-17.2z" />
    <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-2.9-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.8c-2.1 1.4-4.8 2.3-8.5 2.3-6.3 0-11.6-4-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

function Field({ icon: Icon, trailing, ...props }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-[#1b4f8f] bg-[#0b2a52]/70 px-4 py-4 transition focus-within:border-[#14d0e6] focus-within:shadow-[0_0_0_3px_rgba(20,208,230,0.15)]">
      <Icon className="h-6 w-6 shrink-0 fill-[#9bb5e0] text-[#9bb5e0]" aria-hidden />
      <input
        {...props}
        className="w-full bg-transparent text-base text-white placeholder:text-[#809fbe] focus:outline-none"
      />
      {trailing}
    </label>
  );
}

const socialBtn =
  "relative flex w-full items-center justify-center rounded-2xl border border-[#1b4f8f] bg-[#0a2a55]/50 py-4 text-[15px] font-semibold text-white transition hover:border-[#14d0e6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14d0e6]";

export default function Login({ onSignUp }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const friendlyError = (message = "") => {
    if (/invalid login credentials/i.test(message)) return "Wrong email or password. Please try again.";
    if (/email not confirmed/i.test(message)) return "Please confirm your email first. Check your inbox.";
    if (/failed to fetch|network/i.test(message)) return "Can't reach the server. Check your internet and try again.";
    return message || "Something went wrong. Please try again.";
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!isSupabaseConfigured) {
      setError("Supabase is not set up yet. Check your .env.local file.");
      return;
    }
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: identifier.trim(),
      password,
    });
    setLoading(false);
    // On success, App.jsx notices the new session and shows the dashboard.
    if (authError) setError(friendlyError(authError.message));
  };

  const loginWithGoogle = async () => {
    setError("");
    setInfo("");
    if (!isSupabaseConfigured) {
      setError("Supabase is not set up yet. Check your .env.local file.");
      return;
    }
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (oauthError) setError(friendlyError(oauthError.message));
  };

  return (
    <main className="min-h-screen bg-[#01132e] bg-[radial-gradient(ellipse_at_50%_0%,#06214a_0%,#01132e_60%)] font-['Poppins','Inter',sans-serif] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 pb-8 pt-8">
        <KodigoLogo className="justify-center" size="h-14" text="text-[34px]" />

        {/* Greeting + mascot (mascot tucks behind the card) */}
        <header className="mt-7 flex items-end justify-between">
          <div className="pb-6">
            <h1 className="text-[40px] font-bold leading-[1.08]">
              Welcome
              <br />
              Back! <span aria-hidden>👋</span>
            </h1>
            <p className="mt-3 max-w-[11rem] text-sm leading-snug text-slate-200">
              Log in to continue your coding journey.
            </p>
          </div>
          <KodyMascot className="w-56" />
        </header>

        {/* Form card */}
        <form
          onSubmit={submit}
          className="relative z-10 space-y-4 rounded-3xl border border-[#1b4f8f]/70 border-l-[#14d0e6]/60 border-t-[#14d0e6]/60 bg-[#0a2a55]/55 p-5 shadow-[0_0_22px_-14px_rgba(20,208,230,0.35)] backdrop-blur"
        >
          <Field
            icon={User}
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <Field
            icon={Lock}
            type={showPw ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            trailing={
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? "Hide password" : "Show password"}
                className="rounded text-[#9bb5e0] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14d0e6]"
              >
                {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            }
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-[#9bb5e0]">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-5 w-5 appearance-none rounded-md border-2 border-[#14d0e6] bg-transparent checked:bg-[#14d0e6]"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => setInfo("Password reset is coming soon.")}
              className="font-semibold text-[#14d0e6] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p role="alert" className="rounded-xl border border-[#ef4444]/40 bg-[#ef4444]/10 px-3 py-2 text-sm text-[#fca5a5]">
              {error}
            </p>
          )}
          {info && (
            <p role="status" className="rounded-xl border border-[#14d0e6]/40 bg-[#14d0e6]/10 px-3 py-2 text-sm text-[#67e8f9]">
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#fdd243] to-[#fdb628] py-4 text-base font-bold text-[#0b1530] shadow-lg shadow-amber-500/25 transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {loading ? "Logging in…" : <>Log In <ArrowRight className="h-5 w-5" aria-hidden /></>}
          </button>

          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="h-px flex-1 bg-[#1b4f8f]/60" />
            or continue with
            <span className="h-px flex-1 bg-[#1b4f8f]/60" />
          </div>

          <button type="button" onClick={loginWithGoogle} className={socialBtn}>
            <span className="absolute left-[14%]"><GoogleG /></span>
            Continue with Google
          </button>
          <button type="button" className={socialBtn}>
            <span className="absolute left-[14%] grid h-6 w-6 place-items-center rounded-full bg-[#b9d2f5] text-[#0a2a55]">
              <Mail className="h-3.5 w-3.5" aria-hidden />
            </span>
            Continue with Email
          </button>
        </form>

        <p className="mt-auto pt-8 text-center text-sm text-slate-200">
          Don&apos;t have an account?{" "}
          <button type="button" onClick={onSignUp} className="font-bold text-[#fdc830] hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </main>
  );
}
