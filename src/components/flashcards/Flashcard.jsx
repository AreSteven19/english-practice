"use client";

import { useState } from "react";

export default function Flashcard({ card, onSwipeLeft, onSwipeRight }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => setFlipped((prev) => !prev);

  return (
    <div
      className="perspective mx-auto w-full max-w-md cursor-pointer select-none"
      onClick={handleClick}
      onTouchEnd={(e) => {
        const touch = e.changedTouches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const width = rect.width;

        if (x < width * 0.3 && onSwipeLeft) {
          onSwipeLeft();
        } else if (x > width * 0.7 && onSwipeRight) {
          onSwipeRight();
        } else {
          handleClick();
        }
      }}
    >
      <div
        className={`relative h-64 w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 p-6 [backface-visibility:hidden]">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            English
          </p>
          <p className="mt-3 text-center text-2xl font-bold text-white">
            {card.front}
          </p>
          <p className="mt-4 text-xs text-zinc-600">Tap to flip</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-indigo-900/50 bg-zinc-900 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
            Translation
          </p>
          <p className="mt-3 text-center text-xl font-semibold text-white">
            {card.back}
          </p>
          <p className="mt-4 text-xs text-zinc-600">Tap to flip back</p>
        </div>
      </div>
    </div>
  );
}
