import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 };

/* Best-effort rate limit: 5 messages per IP per 10 minutes. It lives in the
   serverless instance's memory, so it slows bursts rather than guaranteeing
   a global cap. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();
const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid request");
  }
  if (!body || typeof body !== "object") return bad("Invalid request");

  // Honeypot: a hidden field people never see. Bots that fill it get a
  // normal-looking success so they don't retry.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = oneLine(str(body.name));
  const email = oneLine(str(body.email));
  const subject = oneLine(str(body.subject)) || "Portfolio contact form";
  const message = str(body.message);

  if (!name || !email || !message) return bad("Name, email and message are required");
  if (!EMAIL_RE.test(email)) return bad("Enter a valid email address");
  if (name.length > LIMITS.name || email.length > LIMITS.email || subject.length > LIMITS.subject || message.length > LIMITS.message) {
    return bad("Message is too long");
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return bad("Too many messages. Please try again later, or email me directly.", 429);

  if (!process.env.RESEND_API_KEY) {
    // Fail loudly rather than pretending the message was delivered.
    console.error("Contact form: RESEND_API_KEY is not set; message not sent.");
    return bad("Messaging is unavailable right now. Please email me directly.", 503);
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["kash.dheeraj.yap@gmail.com"],
      replyTo: email,
      subject: `[Portfolio] ${subject} - from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return bad("Failed to send message", 500);
  }
}
