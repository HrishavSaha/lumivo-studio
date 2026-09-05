import type { BookingSubmission, ContactSubmission } from "@/lib/mailer";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Field = { label: string; value: string; multiline?: boolean };

function fieldRow({ label, value, multiline }: Field) {
  return `
    <tr>
      <td style="padding:14px 0;border-top:1px solid rgba(23,21,15,0.08);">
        <p style="margin:0 0 4px;font-family:'Poppins',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#57514a;">
          ${escapeHtml(label)}
        </p>
        <p style="margin:0;font-family:'Poppins',Arial,sans-serif;font-size:15px;line-height:1.5;color:#17150f;${
          multiline ? "white-space:pre-wrap;" : ""
        }">
          ${escapeHtml(value)}
        </p>
      </td>
    </tr>`;
}

function shell({
  previewText,
  kicker,
  heading,
  subheading,
  fields,
}: {
  previewText: string;
  kicker: string;
  heading: string;
  subheading: string;
  fields: Field[];
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(kicker)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#efe3d6;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(
      previewText,
    )}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#efe3d6;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#f6ede4;border-radius:20px;overflow:hidden;">
            <tr>
              <td style="background-color:#17150f;padding:28px 32px;">
                <p style="margin:0;font-family:Georgia,'Playfair Display',serif;font-size:22px;letter-spacing:0.02em;color:#f6ede4;">
                  Lumivo Studio
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px 12px;">
                <span style="display:inline-block;padding:6px 14px;border-radius:999px;background-color:#f0530a;font-family:'Poppins',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#f6ede4;">
                  ${escapeHtml(kicker)}
                </span>
                <h1 style="margin:20px 0 6px;font-family:Georgia,'Playfair Display',serif;font-size:28px;line-height:1.25;color:#17150f;">
                  ${escapeHtml(heading)}
                </h1>
                <p style="margin:0 0 8px;font-family:'Poppins',Arial,sans-serif;font-size:14px;color:#57514a;">
                  ${subheading}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:4px 32px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${fields.map(fieldRow).join("")}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background-color:#efe3d6;">
                <p style="margin:0;font-family:'Poppins',Arial,sans-serif;font-size:12px;color:#57514a;">
                  Sent from the lumivo.studio site &mdash; reply to this email to respond directly.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function mailtoLink(email: string) {
  return `<a href="mailto:${escapeHtml(email)}" style="color:#f0530a;text-decoration:none;">${escapeHtml(
    email,
  )}</a>`;
}

export function renderContactEmail(submission: ContactSubmission) {
  const subject = `New contact form message from ${submission.name}`;

  const html = shell({
    previewText: submission.message.slice(0, 120),
    kicker: "New contact form message",
    heading: submission.name,
    subheading: `wants to hear back at ${mailtoLink(submission.email)}`,
    fields: [{ label: "Message", value: submission.message, multiline: true }],
  });

  const text = [
    "New contact form message",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    "",
    submission.message,
  ].join("\n");

  return { subject, html, text };
}

export function renderBookingEmail(submission: BookingSubmission) {
  const subject = `New booking request from ${submission.name}`;

  const fields: Field[] = [
    { label: "Date", value: submission.date },
    { label: "Time", value: submission.time },
    { label: "Business", value: submission.business || "—" },
    { label: "What they'd like help with", value: submission.help || "—", multiline: true },
  ];

  const html = shell({
    previewText: `${submission.name} booked ${submission.date} at ${submission.time}`,
    kicker: "New booking request",
    heading: submission.name,
    subheading: `wants to hear back at ${mailtoLink(submission.email)}`,
    fields,
  });

  const text = [
    "New booking request",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Date: ${submission.date}`,
    `Time: ${submission.time}`,
    `Business: ${submission.business || "—"}`,
    `Help: ${submission.help || "—"}`,
  ].join("\n");

  return { subject, html, text };
}
