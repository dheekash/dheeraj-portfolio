"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Field ids double as the focus targets when submit surfaces errors. */
const IDS = { name: "contact-name", email: "contact-email", message: "contact-message" } as const;

function Field({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  onKeyDown,
  error,
  textarea = false,
  autoComplete,
  inputMode,
  spellCheck,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  textarea?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email";
  spellCheck?: boolean;
}) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    onKeyDown,
    autoComplete,
    spellCheck,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    placeholder: " ",
    /* 16px on mobile: anything smaller makes iOS Safari zoom the viewport on
       focus. Steps down to 14px once there is no touch keyboard to trigger it. */
    className:
      "peer w-full rounded-xl bg-transparent px-4 pt-5 pb-2 text-[16px] md:text-[14px] text-foreground outline-none border " +
      "transition-[border-color,box-shadow] duration-200 " +
      (error ? "border-destructive" : "border-border focus:border-primary"),
  };

  return (
    <div className="relative">
      {textarea ? (
        <textarea {...shared} rows={4} className={shared.className + " resize-none"} />
      ) : (
        <input {...shared} type={type} inputMode={inputMode} />
      )}
      <label
        htmlFor={id}
        /* Explicit property list: `transition-all` also animates layout and
           paint properties the compositor cannot handle. */
        className="pointer-events-none absolute left-4 top-4 text-[16px] md:text-[14px] text-muted-foreground transition-[top,font-size,color] duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
      >
        {label}
      </label>
      {error && (
        <p id={errorId} className="mt-1.5 text-[12px] text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  /* Values are trimmed at the boundary, not while typing: trimming during
     onChange stops the user from typing a space between words. */
  const trimmed = { name: name.trim(), email: email.trim(), message: message.trim() };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!trimmed.name) next.name = "Required";
    if (!trimmed.email) next.email = "Required";
    else if (!EMAIL_RE.test(trimmed.email)) next.email = "Enter a valid email";
    if (!trimmed.message) next.message = "Required";
    return next;
  };

  const submit = async () => {
    const next = validate();
    setErrors(next);

    // Move focus to the first invalid field so the error is not just visual.
    const firstBad = (["name", "email", "message"] as const).find((k) => next[k]);
    if (firstBad) {
      document.getElementById(IDS[firstBad])?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...trimmed, subject: "Portfolio contact form" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submit();
  };

  /* Enter already submits from a single-line input. A textarea swallows it,
     so the conventional shortcut is Cmd/Ctrl+Enter. */
  const onMessageKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      void submit();
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        aria-live="polite"
        className="uicard items-center text-center gap-3 py-8"
      >
        <CheckCircle2 size={28} aria-hidden style={{ color: "var(--success)" }} />
        <p className="text-[15px] font-semibold text-foreground">Message sent</p>
        <p className="text-[13px] text-muted-foreground max-w-[32ch]">
          Thanks for reaching out. I usually reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 text-[13px] text-primary transition-opacity duration-200 hover:opacity-80"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="uicard gap-3">
      <Field
        id={IDS.name} name="name" label="Your name" autoComplete="name"
        value={name} onChange={setName} error={errors.name}
      />
      <Field
        id={IDS.email} name="email" label="Email address" type="email"
        autoComplete="email" inputMode="email" spellCheck={false}
        value={email} onChange={setEmail} error={errors.email}
      />
      <Field
        id={IDS.message} name="message" label="Message" textarea
        value={message} onChange={setMessage} error={errors.message}
        onKeyDown={onMessageKeyDown}
      />

      {/* Live region is always mounted so assistive tech announces the error
          when it appears, rather than only noticing a new node. */}
      <p aria-live="polite" className="sr-only">
        {status === "error" ? "Message failed to send." : ""}
      </p>

      {status === "error" && (
        <p className="flex items-center gap-1.5 text-[13px]" style={{ color: "var(--destructive)" }}>
          <AlertCircle size={14} aria-hidden /> Something went wrong. Try again, or email me directly.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        /* Label is kept while submitting and a spinner is added beside it;
           swapping the label out loses the button's accessible name mid-action. */
        className="gradient-btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold transition-[background,transform,box-shadow] duration-200 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
      >
        Send message
        {submitting ? (
          <Loader2 size={14} aria-hidden className="animate-spin" />
        ) : (
          <Send size={14} aria-hidden />
        )}
      </button>
    </form>
  );
}
