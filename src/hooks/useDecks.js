import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useDecks(user) {
  const [decks, setDecks] = useState([]);
  const [cardCounts, setCardCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("decks")
        .select("id, name, description, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setDecks(data ?? []);

      if (data && data.length > 0) {
        const deckIds = data.map((d) => d.id);
        const { data: counts } = await supabase
          .from("cards")
          .select("deck_id, id")
          .in("deck_id", deckIds);

        const map = {};
        for (const c of counts ?? []) {
          map[c.deck_id] = (map[c.deck_id] || 0) + 1;
        }
        setCardCounts(map);
      }

      setLoading(false);
    };

    load();
  }, [user, supabase]);

  const reload = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("decks")
      .select("id, name, description, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setDecks(data ?? []);

    if (data && data.length > 0) {
      const deckIds = data.map((d) => d.id);
      const { data: counts } = await supabase
        .from("cards")
        .select("deck_id, id")
        .in("deck_id", deckIds);

      const map = {};
      for (const c of counts ?? []) {
        map[c.deck_id] = (map[c.deck_id] || 0) + 1;
      }
      setCardCounts(map);
    }
  };

  return { decks, cardCounts, loading, reload };
}
