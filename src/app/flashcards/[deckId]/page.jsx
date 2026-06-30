"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";
import CardForm from "@/components/flashcards/CardForm";
import FlashcardViewer from "@/components/flashcards/FlashcardViewer";
import {
  ArrowLeft,
  Plus,
  BookOpen,
  Pencil,
  Trash2,
  Layers,
} from "lucide-react";

export default function DeckDetailPage() {
  const { deckId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();

  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [studying, setStudying] = useState(false);

  const fetchDeck = useCallback(async () => {
    const { data } = await supabase
      .from("decks")
      .select("*")
      .eq("id", deckId)
      .single();

    if (!data) {
      router.push("/flashcards");
      return;
    }

    setDeck(data);
  }, [deckId, router, supabase]);

  const fetchCards = useCallback(async () => {
    const { data } = await supabase
      .from("cards")
      .select("*")
      .eq("deck_id", deckId)
      .order("created_at", { ascending: true });

    setCards(data ?? []);
  }, [deckId, supabase]);

  useEffect(() => {
    if (!user) return;

    const init = async () => {
      await fetchDeck();
      await fetchCards();
      setLoading(false);
    };

    init();
  }, [user, fetchDeck, fetchCards]);

  const handleAddCard = async ({ front, back }) => {
    const { error } = await supabase.from("cards").insert({
      deck_id: deckId,
      front,
      back,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setShowAddForm(false);
    fetchCards();
  };

  const handleEditCard = async ({ front, back }) => {
    const { error } = await supabase
      .from("cards")
      .update({ front, back })
      .eq("id", editingCard.id);

    if (error) {
      alert(error.message);
      return;
    }

    setEditingCard(null);
    fetchCards();
  };

  const handleDeleteCard = async (id) => {
    if (!confirm("Delete this card?")) return;
    await supabase.from("cards").delete().eq("id", id);
    fetchCards();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-indigo-500" />
      </div>
    );
  }

  if (!deck) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <button
            onClick={() => router.push("/flashcards")}
            className="mb-3 flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to decks
          </button>

          <h1 className="text-3xl font-bold tracking-tight">{deck.name}</h1>
          {deck.description && (
            <p className="mt-1 text-sm text-zinc-400">{deck.description}</p>
          )}
          <p className="mt-1 text-xs text-zinc-600">
            {cards.length} {cards.length === 1 ? "card" : "cards"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {cards.length > 0 && (
            <button
              onClick={() => setStudying(!studying)}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              <BookOpen className="h-4 w-4" />
              {studying ? "Manage cards" : "Study"}
            </button>
          )}
        </div>
      </div>

      {/* Study Mode */}
      {studying ? (
        <div className="space-y-6">
          <FlashcardViewer cards={cards} deckId={deckId} />
          <div className="text-center">
            <button
              onClick={() => setStudying(false)}
              className="text-sm text-zinc-500 transition-colors hover:text-white"
            >
              Exit study mode
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Add Card Form */}
          {showAddForm ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                New card
              </h2>
              <CardForm
                onSubmit={handleAddCard}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-800 py-4 text-sm text-zinc-500 transition-colors hover:border-zinc-600 hover:text-white"
            >
              <Plus className="h-4 w-4" />
              Add card
            </button>
          )}

          {/* Edit Card Form */}
          {editingCard && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Edit card
              </h2>
              <CardForm
                initial={editingCard}
                onSubmit={handleEditCard}
                onCancel={() => setEditingCard(null)}
              />
            </div>
          )}

          {/* Cards List */}
          {cards.length === 0 && !showAddForm ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900">
                <Layers className="h-8 w-8 text-zinc-600" />
              </div>
              <div>
                <p className="font-semibold text-white">No cards yet</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Add your first card to start studying
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-start justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition-colors hover:border-zinc-700"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white truncate">
                      {card.front}
                    </p>
                    <p className="mt-0.5 text-sm text-zinc-500 line-clamp-2">
                      {card.back}
                    </p>
                    <p className="mt-1 text-xs text-zinc-700">
                      {card.difficulty === "easy" && "✅ Easy"}
                      {card.difficulty === "hard" && "❌ Hard"}
                      {card.difficulty === "medium" && "◼ Medium"}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 ml-4">
                    <button
                      onClick={() => setEditingCard(card)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-800 hover:text-white"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-red-950/50 hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
