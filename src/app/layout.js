import { Geist } from "next/font/google";
import "./globals.css";

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
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}