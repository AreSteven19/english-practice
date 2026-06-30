"use client";

import { useState, useCallback, useEffect } from "react";
import Flashcard from "./Flashcard";
import { createClient } from "@/lib/supabase/client";
import { ChevronLeft, ChevronRight, Check, X, RotateCcw } from "lucide-react";

export default function FlashcardViewer({ cards: initialCards, deckId }) {
  const [cards, setCards] = useState(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewed, setReviewed] = useState(new Set());

  const supabase = createClient();

  const current = cards[currentIndex];
  const hasNext = currentIndex < cards.length - 1;
  const hasPrev = currentIndex > 0;

  const goNext = useCallback(() => {
    if (hasNext) setCurrentIndex((i) => i + 1);
  }, [hasNext]);

  const goPrev = useCallback(() => {
    if (hasPrev) setCurrentIndex((i) => i - 1);
  }, [hasPrev]);

  const recordReview = useCallback(
    async (difficulty) => {
      if (!current) return;

      await supabase
        .from("cards")
        .update({ difficulty, last_seen: new Date().toISOString() })
        .eq("id", current.id);

      setReviewed((prev) => new Set(prev).add(current.id));

      if (hasNext) {
        setTimeout(() => setCurrentIndex((i) => i + 1), 300);
      }
    },
    [current, hasNext, supabase],
  );

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900">
          <RotateCcw className="h-6 w-6 text-zinc-600" />
        </div>
        <p className="text-sm text-zinc-500">
          No cards yet. Add some cards to start studying.
        </p>
      </div>
    );
  }

  if (reviewed.size === cards.length) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900/30">
          <Check className="h-6 w-6 text-green-400" />
        </div>
        <p className="text-lg font-semibold text-white">All done!</p>
        <p className="text-sm text-zinc-500">
          You reviewed all {cards.length} cards.
        </p>
        <button
          onClick={() => {
            setReviewed(new Set());
            setCurrentIndex(0);
          }}
          className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Review again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Progress */}
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <span className="font-medium text-white">
          {currentIndex + 1}
        </span>
        <span>/</span>
        <span>{cards.length}</span>
        <span className="ml-2 text-xs">
          ({reviewed.size} reviewed)
        </span>
      </div>

      {/* Card */}
      <Flashcard
        card={current}
        onSwipeLeft={recordReview.bind(null, "hard")}
        onSwipeRight={recordReview.bind(null, "easy")}
      />

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={goPrev}
          disabled={!hasPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => recordReview("hard")}
          className="flex items-center gap-2 rounded-full border border-red-900/50 bg-red-950/30 px-5 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-950/50"
        >
          <X className="h-4 w-4" />
          Didn&apos;t remember
        </button>

        <button
          onClick={() => recordReview("easy")}
          className="flex items-center gap-2 rounded-full border border-green-900/50 bg-green-950/30 px-5 py-2 text-sm font-medium text-green-400 transition-colors hover:bg-green-950/50"
        >
          <Check className="h-4 w-4" />
          Remembered
        </button>

        <button
          onClick={goNext}
          disabled={!hasNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
