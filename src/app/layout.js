import { Geist } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/layout/Sidebar";

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
      <body className="bg-zinc-950 text-white">
        <div className="flex min-h-screen">

          <Sidebar />

          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}