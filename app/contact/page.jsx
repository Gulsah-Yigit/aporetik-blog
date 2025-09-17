"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const form = e.target;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/mwpndnww", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    setStatus("idle");

    if (res.ok) {
      router.push("/"); // ✅ Gönderim başarılı → anasayfaya yönlendir
    } else {
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Drop Me a Line, Let Me Know What You Think
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot (spam botları için gizli input) */}
        <input type="text" name="_gotcha" className="hidden" />

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Ad *</label>
            <input
              name="firstName"
              required
              className="w-full border-b border-black/60 focus:border-black outline-none py-2"
              placeholder="..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Soyad *</label>
            <input
              name="lastName"
              required
              className="w-full border-b border-black/60 focus:border-black outline-none py-2"
              placeholder="..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border-b border-black/60 focus:border-black outline-none py-2"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Mesaj</label>
          <textarea
            name="message"
            rows={6}
            className="w-full border-b border-black/60 focus:border-black outline-none py-2"
            placeholder="Mesaj..."
          />
        </div>

        {/* Formspree ayarları */}
        <input
          type="hidden"
          name="_subject"
          value="New message from contact form"
        />
        <input type="hidden" name="_next" value="http://localhost:3000" />

        <div className="flex justify-center">
          <button
            disabled={status === "loading"}
            className="px-10 py-3 rounded-md bg-[#6C00FF] text-white font-medium disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Gönder"}
          </button>
        </div>
      </form>
    </main>
  );
}
