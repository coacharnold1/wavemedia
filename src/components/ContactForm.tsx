"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/types/forms";

const field =
  "w-full bg-wave-dark text-wave-white px-4 py-3 rounded-lg border border-wave-gold/20 focus:border-wave-gold focus:outline-none transition-colors";

export default function ContactForm() {
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      const ok = res.ok && body.success;
      setStatus({ ok, message: body.message });
      if (ok) reset();
    } catch {
      setStatus({ ok: false, message: "Something went wrong. Please try again." });
    }
  };

  const err = (msg?: string) => msg && <p className="text-red-400 text-sm mt-1">{msg}</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 bg-wave-charcoal p-8 rounded-lg border border-wave-gold/10"
    >
      <div>
        <label htmlFor="name" className="block text-wave-white font-semibold mb-2">Name *</label>
        <input id="name" type="text" placeholder="Your name" className={field} {...register("name")} />
        {err(errors.name?.message)}
      </div>
      <div>
        <label htmlFor="email" className="block text-wave-white font-semibold mb-2">Email *</label>
        <input id="email" type="email" placeholder="your@email.com" className={field} {...register("email")} />
        {err(errors.email?.message)}
      </div>
      <div>
        <label htmlFor="phone" className="block text-wave-white font-semibold mb-2">Phone</label>
        <input id="phone" type="tel" className={field} {...register("phone")} />
      </div>
      <div>
        <label htmlFor="message" className="block text-wave-white font-semibold mb-2">Message *</label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your project..."
          className={`${field} resize-none`}
          {...register("message")}
        />
        {err(errors.message?.message)}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary text-lg font-semibold disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
      {status && (
        <p role="status" className={status.ok ? "text-wave-gold" : "text-red-400"}>
          {status.message}
        </p>
      )}
    </form>
  );
}
