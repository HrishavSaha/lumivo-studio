import { Resend } from "resend";
import { renderBookingEmail, renderContactEmail } from "@/lib/email-template";

/** Single inbox every form on the site delivers to. */
export const TO_EMAIL = "milenalouwet2007@gmail.com";

const FROM_EMAIL = "Lumivo Studio <onboarding@resend.dev>";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactSubmission = {
  type: "contact";
  name: string;
  email: string;
  message: string;
};

export type BookingSubmission = {
  type: "booking";
  name: string;
  email: string;
  business?: string;
  help?: string;
  date: string;
  time: string;
};

export type FormSubmission = ContactSubmission | BookingSubmission;

function renderEmail(submission: FormSubmission) {
  return submission.type === "contact"
    ? renderContactEmail(submission)
    : renderBookingEmail(submission);
}

/** Sends a contact or booking submission to the single studio inbox. */
export async function sendFormSubmission(submission: FormSubmission) {
  const { subject, html, text } = renderEmail(submission);

  await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: submission.email,
    subject,
    html,
    text,
  });
}
