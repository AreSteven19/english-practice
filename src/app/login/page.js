"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    console.log("Logged in:", data.user);
  };

  return (
    <div className="mx-auto mt-20 max-w-md">
      <h1 className="mb-6 text-3xl font-bold">
        Login
      </h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border border-zinc-700 bg-zinc-900 p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border border-zinc-700 bg-zinc-900 p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 p-3"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}