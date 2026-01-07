"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);

  const subscribe = async () => {
    const value = email.trim();

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!isValid) {
      setMsg({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    try {
      await addDoc(collection(db, "newsletter"), {
        email: value,
        createdAt: serverTimestamp(),
      });

      setEmail("");
      setMsg({ type: "success", text: "Subscribed successfully 🎉" });
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "Something went wrong" });
    }
  };

  return (
    <>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />

      <button onClick={subscribe}>Subscribe</button>

      {msg && <p>{msg.text}</p>}
    </>
  );
}
