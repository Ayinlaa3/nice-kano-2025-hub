import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async (userId: string | undefined) => {
      if (!userId) {
        setIsAdmin(false);
        return;
      }
      const { data } = await supabase.rpc("is_admin_role", { _user_id: userId });
      setIsAdmin(Boolean(data));
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      // Defer Supabase calls out of the callback to avoid deadlocks
      setTimeout(() => {
        checkAdmin(newSession?.user?.id);
      }, 0);
    });

    supabase.auth.getSession().then(({ data: { session: existing } }) => {
      setSession(existing);
      checkAdmin(existing?.user?.id).finally(() => setLoading(false));
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, isAdmin, loading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
