import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// True only when both values are set in .env.local
export const isSupabaseConfigured = Boolean(url && key);

if (!isSupabaseConfigured) {
  console.error("Supabase is not set up: add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local, then restart `npm run dev`.");
}

// Placeholders stop the app from crashing when the env values are missing.
export const supabase = createClient(url || "http://localhost:54321", key || "missing-key");
