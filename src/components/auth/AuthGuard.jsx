"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/layout/Sidebar";

const publicRoutes = ["/login", "/register"];

export default function AuthGuard({ children }) {
  const { session, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isPublic = publicRoutes.includes(pathname);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-indigo-500" />
          <p className="text-sm text-zinc-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session && !isPublic) {
    router.replace("/login");
    return null;
  }

  if (session && isPublic) {
    router.replace("/dashboard");
    return null;
  }

  if (isPublic) {
    return <>{children}</>;
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
