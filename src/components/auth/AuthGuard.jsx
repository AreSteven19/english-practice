"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import Sidebar from "@/components/layout/Sidebar";

export default function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setLoading(false);

      if (!session && pathname !== "/login") {
        router.replace("/login");
      }

      if (session && pathname === "/login") {
        router.replace("/");
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (!session) {
        router.replace("/login");
      } else if (pathname === "/login") {
        router.replace("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // Permitir que la página de login se vea sin sesión
  if (!session && pathname === "/login") {
    return children;
  }

  // Mientras redirige
  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto p-6 pt-20 lg:pt-6">
        {children}
      </main>
    </div>
  );
}