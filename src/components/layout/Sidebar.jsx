import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-900 p-6">

      <h1 className="mb-10 text-2xl font-bold">
        English AI
      </h1>

      <nav className="flex flex-col gap-4">

        <Link href="/">
          Home
        </Link>

        <Link href="/listening">
          Listening
        </Link>

        <Link href="/writing">
          Writing
        </Link>

        <Link href="/dashboard">
          Dashboard
        </Link>

      </nav>

    </aside>
  );
}