"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquiryFormSchema, type InquiryFormData } from "@/types/forms";

const serviceOptions = [
  { value: "cinematography", label: "Cinematography" },
  { value: "photography", label: "Photography" },
  { value: "events", label: "Event Production" },
  { value: "retainer", label: "Monthly Retainer" },
];

const budgetOptions = ["Under $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "$10,000+", "Not sure yet"];
const timelineOptions = ["ASAP", "Within 1 month", "1–3 months", "3+ months", "Flexible"];

const field =
  "w-full bg-wave-charcoal border border-wave-dark rounded-lg px-4 py-3 text-wave-white focus:outline-none focus:border-wave-gold";

export default function BookingForm() {
  const params = useSearchParams();
  const preset = serviceOptions.find((o) => o.value === params.get("service"))?.value;
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: preset
      ? { serviceType: preset as InquiryFormData["serviceType"] }
      : undefined,
  });

  const onSubmit = async (data: InquiryFormData) => {
    setStatus(null);
    try {
      const res = await fetch("/api/inquiry", {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block mb-2 text-wave-gray">Name</label>
          <input id="name" className={field} {...register("name")} />
          {err(errors.name?.message)}
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-wave-gray">Email</label>
          <input id="email" type="email" className={field} {...register("email")} />
          {err(errors.email?.message)}
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 text-wave-gray">Phone</label>
          <input id="phone" type="tel" className={field} {...register("phone")} />
          {err(errors.phone?.message)}
        </div>
        <div>
          <label htmlFor="serviceType" className="block mb-2 text-wave-gray">Service</label>
          <select id="serviceType" className={field} defaultValue={preset ?? ""} {...register("serviceType")}>
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {err(errors.serviceType && "Please select a service")}
        </div>
        <div>
          <label htmlFor="budget" className="block mb-2 text-wave-gray">Budget (optional)</label>
          <select id="budget" className={field} defaultValue="" {...register("budget")}>
            <option value="">Select a range</option>
            {budgetOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="block mb-2 text-wave-gray">Timeline (optional)</label>
          <select id="timeline" className={field} defaultValue="" {...register("timeline")}>
            <option value="">Select a timeline</option>
            {timelineOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="details" className="block mb-2 text-wave-gray">Project details</label>
        <textarea id="details" rows={6} className={field} {...register("details")} />
        {err(errors.details?.message)}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
        {isSubmitting ? "Sending…" : "Send Inquiry"}
      </button>

      {status && (
        <p role="status" className={status.ok ? "text-wave-gold" : "text-red-400"}>
          {status.message}
        </p>
      )}
    </form>
  );
}
