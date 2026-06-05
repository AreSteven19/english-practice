"use client";

import { useAuth } from "@/context/AuthContext";
import { Headphones, Pen, BookOpen } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    href: "/listening",
    label: "Listening",
    desc: "Practice emails, phone numbers, addresses, and names",
    icon: Headphones,
  },
  {
    href: "/writing",
    label: "Writing",
    desc: "Improve your writing skills with AI feedback",
    icon: Pen,
  },
  {
    href: "/modulo1",
    label: "Module 1",
    desc: "Structured learning with units and exercises",
    icon: BookOpen,
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Welcome{user?.email ? `, ${user.email}` : ""}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500/20">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="font-semibold">{card.label}</h2>
              <p className="mt-1 text-sm text-zinc-500">{card.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
