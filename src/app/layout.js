import { Geist } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "English Practice App",
  description: "Improve listening and writing skills with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="bg-zinc-950 text-white antialiased">
        <AuthProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}