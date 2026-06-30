"use client";

import { useState } from "react";

export default function CardForm({ onSubmit, onCancel, initial }) {
  const [front, setFront] = useState(initial?.front ?? "");
  const [back, setBack] = useState(initial?.back ?? "");
  const [loading, setLoading] = useState(false);

  const isEditing = !!initial;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;
    setLoading(true);
    await onSubmit({ front: front.trim(), back: back.trim() });
    setLoading(false);
    if (!isEditing) {
      setFront("");
      setBack("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-300">
          Front (English word)
        </label>
        <input
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder="e.g. Run"
          required
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-300">
          Back (Translation or explanation)
        </label>
        <textarea
          value={back}
          onChange={(e) => setBack(e.target.value)}
          placeholder="e.g. Correr"
          rows={3}
          required
          className="resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading || !front.trim() || !back.trim()}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEditing
              ? "Save changes"
              : "Add card"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
