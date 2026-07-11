"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  textarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  textarea?: boolean;
}) {
  const shared = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    placeholder: " ",
    className:
      "peer w-full rounded-xl bg-transparent px-4 pt-5 pb-2 text-[14px] text-foreground outline-none transition-colors duration-300 border" +
      (error ? " border-destructive" : " border-border focus:border-primary"),
  };

  return (
    <div className="relative">
      {textarea ? (
        <textarea {...shared} rows={4} className={shared.className + " resize-none"} />
      ) : (
        <input {...shared} type={type} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 text-[14px] text-muted-foreground transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
      >
        {label}
      </label>
      {error && <p className="mt-1.5 text-[12px] text-destructive">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Required";
    if (!email.trim()) next.email = "Required";
    else if (!EMAIL_RE.test(email)) next.email = "Enter a valid email";
    if (!message.trim()) next.message = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject: "Portfolio contact form", message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="uicard items-center text-center gap-3 py-8"
      >
        <CheckCircle2 size={28} style={{ color: "var(--success)" }} />
        <p className="text-[15px] font-semibold text-foreground">Message sent</p>
        <p className="text-[13px] text-muted-foreground max-w-[32ch]">
          Thanks for reaching out — I usually reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 text-[13px] text-primary hover:opacity-80 transition-opacity"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="uicard gap-4">
      <Field id="contact-name" label="Your name" value={name} onChange={setName} error={errors.name} />
      <Field id="contact-email" label="Email address" type="email" value={email} onChange={setEmail} error={errors.email} />
      <Field id="contact-message" label="Message" value={message} onChange={setMessage} error={errors.message} textarea />

      {status === "error" && (
        <p className="flex items-center gap-1.5 text-[13px]" style={{ color: "var(--destructive)" }}>
          <AlertCircle size={14} /> Something went wrong — try again, or email me directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="gradient-btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        <Send size={14} />
      </button>
    </form>
  );
}
