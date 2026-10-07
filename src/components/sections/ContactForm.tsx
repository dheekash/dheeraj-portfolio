"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IDS = { name: "contact-name", email: "contact-email", message: "contact-message" } as const;

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error m-0">
          {error}
        </p>
      )}
    </div>
  );
}

/** Short form with visible labels. Email stays the primary route. */
export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = async () => {
    const t = { name: values.name.trim(), email: values.email.trim(), message: values.message.trim() };
    const next: Errors = {};
    if (!t.name) next.name = "Enter your name.";
    if (!t.email) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(t.email)) next.email = "Enter an email address like name@company.com.";
    if (!t.message) next.message = "Enter a message.";
    setErrors(next);

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
        body: JSON.stringify({ ...t, subject: "Portfolio contact form" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const invalid = (k: keyof Errors) =>
    errors[k] ? { "aria-invalid": true as const, "aria-describedby": `${IDS[k]}-error` } : {};

  if (status === "success") {
    return (
      <div className="card" role="status">
        <p className="title-3 m-0">Message sent</p>
        <p className="small" style={{ marginTop: 8 }}>
          Thanks for getting in touch. I usually reply within 24 hours.
        </p>
        <button type="button" className="link-arrow" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="card form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      aria-labelledby="form-title"
    >
      <h3 id="form-title" className="title-3" style={{ fontSize: "1.125rem" }}>
        Send a message
      </h3>
      <Field id={IDS.name} label="Name" error={errors.name}>
        <input id={IDS.name} name="name" autoComplete="name" value={values.name} onChange={set("name")} {...invalid("name")} />
      </Field>
      <Field id={IDS.email} label="Email" error={errors.email}>
        <input
          id={IDS.email}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          value={values.email}
          onChange={set("email")}
          {...invalid("email")}
        />
      </Field>
      <Field id={IDS.message} label="Message" error={errors.message}>
        <textarea
          id={IDS.message}
          name="message"
          rows={4}
          value={values.message}
          onChange={set("message")}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              void submit();
            }
          }}
          {...invalid("message")}
        />
      </Field>

      <p aria-live="polite" className="form-status m-0" style={{ color: "#F0A190" }}>
        {status === "error" ? "The message didn’t send. Try again, or email me directly." : ""}
      </p>

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"} style={{ justifySelf: "start" }}>
        Send message
        {status === "submitting" && <Loader2 size={16} className="animate-spin" aria-hidden />}
      </button>
    </form>
  );
}
