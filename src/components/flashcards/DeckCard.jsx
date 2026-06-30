import Link from "next/link";
import { Layers, Trash2 } from "lucide-react";

export default function DeckCard({ deck, cardCount, onDelete }) {
  return (
    <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700">
      <Link href={`/flashcards/${deck.id}`} className="block">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
          <Layers className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-white">{deck.name}</h3>
        {deck.description && (
          <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
            {deck.description}
          </p>
        )}
        <p className="mt-3 text-xs text-zinc-600">
          {cardCount} {cardCount === 1 ? "card" : "cards"}
        </p>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          onDelete(deck.id);
        }}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 opacity-0 transition-all hover:bg-red-950/50 hover:text-red-400 group-hover:opacity-100"
        title="Delete deck"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
