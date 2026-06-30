"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useDecks } from "@/hooks/useDecks";
import DeckCard from "@/components/flashcards/DeckCard";
import DeckForm from "@/components/flashcards/DeckForm";
import { Plus, Layers } from "lucide-react";

export default function FlashcardsPage() {
  const [showForm, setShowForm] = useState(false);

  const { user } = useAuth();
  const { decks, cardCounts, loading, reload } = useDecks(user);
  const supabase = createClient();

  const handleCreate = async ({ name, description }) => {
    const { error } = await supabase.from("decks").insert({
      name,
      description,
      user_id: user.id,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setShowForm(false);
    reload();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this deck and all its cards?")) return;

    await supabase.from("decks").delete().eq("id", id);
    reload();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-indigo-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flashcards</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Create decks and study with spaced repetition
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" />
          New deck
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5">
          <DeckForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {decks.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900">
            <Layers className="h-8 w-8 text-zinc-600" />
          </div>
          <div>
            <p className="font-semibold text-white">No decks yet</p>
            <p className="mt-1 text-sm text-zinc-500">
              Create your first deck to start studying
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            Create your first deck
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <DeckCard
              key={deck.id}
              deck={deck}
              cardCount={cardCounts[deck.id] ?? 0}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
