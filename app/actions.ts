"use server";

import type { FormState } from "@/lib/form-state";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function read(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Contact form submission.
 *
 * TODO: swap the console.log for a real delivery mechanism (Resend, Supabase,
 * a CRM webhook). Nothing outside this function needs to change.
 */
export async function submitContact(
  _prev: FormState,
  data: FormData,
): Promise<FormState> {
  const payload = {
    name: read(data, "name"),
    email: read(data, "email"),
    message: read(data, "message"),
  };

  const errors: Record<string, string> = {};
  if (!payload.name) errors.name = "Please tell us your name.";
  if (!payload.email) errors.email = "Please add an email address.";
  else if (!EMAIL.test(payload.email)) errors.email = "That email looks off.";
  if (!payload.message) errors.message = "Please add a short message.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, values: payload };
  }

  console.log("[contact]", payload);

  return {
    ok: true,
    errors: {},
    message: "Thanks — we’ll get back to you within one business day.",
  };
}

/**
 * Booking form submission.
 *
 * TODO: swap the console.log for a real calendar integration (Cal.com,
 * Calendly, Google Calendar) and validate the slot is still free.
 */
export async function submitBooking(
  _prev: FormState,
  data: FormData,
): Promise<FormState> {
  const payload = {
    date: read(data, "date"),
    time: read(data, "time"),
    name: read(data, "name"),
    email: read(data, "email"),
    business: read(data, "business"),
    help: read(data, "help"),
  };

  const errors: Record<string, string> = {};
  if (!payload.date) errors.date = "Pick a date.";
  if (!payload.time) errors.time = "Pick a time slot.";
  if (!payload.name) errors.name = "Please tell us your name.";
  if (!payload.email) errors.email = "Please add an email address.";
  else if (!EMAIL.test(payload.email)) errors.email = "That email looks off.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, values: payload };
  }

  console.log("[booking]", payload);

  return {
    ok: true,
    errors: {},
    message: `You’re booked for ${payload.date} at ${payload.time}. Check your inbox for the confirmation.`,
  };
}
