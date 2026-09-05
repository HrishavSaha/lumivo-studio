"use server";

import type { FormState } from "@/lib/form-state";
import { sendFormSubmission } from "@/lib/mailer";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function read(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

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

  try {
    await sendFormSubmission({ type: "contact", ...payload });
  } catch (error) {
    console.error("[contact] failed to send email", error);
    return {
      ok: false,
      errors: {
        message: "Something went wrong sending your message. Please try again.",
      },
      values: payload,
    };
  }

  return {
    ok: true,
    errors: {},
    message: "Thanks — we’ll get back to you within one business day.",
  };
}

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

  try {
    await sendFormSubmission({ type: "booking", ...payload });
  } catch (error) {
    console.error("[booking] failed to send email", error);
    return {
      ok: false,
      errors: {
        date: "Something went wrong confirming your booking. Please try again.",
      },
      values: payload,
    };
  }

  return {
    ok: true,
    errors: {},
    message: `You’re booked for ${payload.date} at ${payload.time}. Check your inbox for the confirmation.`,
  };
}
