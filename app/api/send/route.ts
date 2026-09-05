import { NextResponse } from "next/server";
import { sendFormSubmission, type FormSubmission } from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validate(body: unknown): { data: FormSubmission } | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body." };
  }

  const { type, name, email, message, business, help, date, time } =
    body as Record<string, unknown>;

  if (!isNonEmptyString(name)) return { error: "Name is required." };
  if (!isNonEmptyString(email) || !EMAIL_RE.test(email)) {
    return { error: "A valid email is required." };
  }

  if (type === "contact") {
    if (!isNonEmptyString(message)) return { error: "Message is required." };
    return { data: { type: "contact", name, email, message } };
  }

  if (type === "booking") {
    if (!isNonEmptyString(date)) return { error: "Date is required." };
    if (!isNonEmptyString(time)) return { error: "Time is required." };
    return {
      data: {
        type: "booking",
        name,
        email,
        date,
        time,
        business: isNonEmptyString(business) ? business : undefined,
        help: isNonEmptyString(help) ? help : undefined,
      },
    };
  }

  return { error: "Unknown form type." };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = validate(body);

  if ("error" in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  try {
    await sendFormSubmission(result.data);
  } catch (error) {
    console.error("[api/send] failed to send email", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
