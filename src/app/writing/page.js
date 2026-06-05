"use client";

import { supabase } from "../lib/supabase";

export default function WritingPage() {
  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "correo_real_distinto@gmail.com",
      password: "12345678"
    });

    console.log("DATA", data);
    console.log("ERROR", error);
  };

  return (
    <button onClick={handleRegister} className="px-4 py-2 ">
      Test Register
    </button>
  );
}