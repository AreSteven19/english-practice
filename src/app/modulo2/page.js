import Link from "next/link";

export default function Modulo2() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Modulo 2</h1>

      <Link
        href="/modulo2/unidad1"
        className="block p-4 bg-zinc-900 rounded-xl"
      >
        Unidad 1
      </Link>

      <Link
        href="/modulo2/unidad2"
        className="block p-4 bg-zinc-900 rounded-xl"
      >
        Unidad 2
      </Link>
    </div>
  );
}