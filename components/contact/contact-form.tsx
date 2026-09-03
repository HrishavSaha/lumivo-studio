"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact } from "@/app/actions";
import { emptyFormState } from "@/lib/form-state";
import { Button, Caret } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/field";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="pillCream"
      disabled={pending}
      className="whitespace-nowrap"
    >
      {pending ? "Sending…" : "Confirm booking"}
      {pending ? null : <Caret />}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, emptyFormState);

  if (state.ok) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-display text-3xl text-cream">Message sent.</p>
        <p className="text-sm text-cream/85">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 px-6 py-8 sm:px-9"
    >
      <Input
        name="name"
        label="Full Name:"
        autoComplete="name"
        required
        defaultValue={state.values?.name}
        error={state.errors.name}
      />
      <Input
        name="email"
        type="email"
        label="Email Address"
        autoComplete="email"
        required
        defaultValue={state.values?.email}
        error={state.errors.email}
      />
      <Textarea
        name="message"
        label="Messages"
        rows={3}
        required
        defaultValue={state.values?.message}
        error={state.errors.message}
      />
      <SubmitButton />
    </form>
  );
}
