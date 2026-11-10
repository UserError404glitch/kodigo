import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Login from "./components/Login";
import HomeDashboard from "./components/HomeDashboard";

export default function App() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // 1) Is someone already logged in? (Supabase remembers the session in the browser)
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    // 2) Update the screen whenever the user logs in or out
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (checking) {
    return <div className="min-h-screen bg-[#070913]" aria-busy="true" />;
  }

  if (!session) {
    return <Login onSignUp={() => alert("Sign Up screen coming soon")} />;
  }

  const user = session.user;
  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Learner";

  return (
    <HomeDashboard
      userName={userName}
      onSignOut={() => supabase.auth.signOut()}
      onNavigate={(tab) => console.log("navigate:", tab)}
      onStartCoding={() => console.log("start coding")}
    />
  );
}
