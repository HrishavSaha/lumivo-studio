"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitBooking } from "@/app/actions";
import { emptyFormState } from "@/lib/form-state";
import { Button, Caret } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { Calendar } from "@/components/book/calendar";
import { TimeSlots } from "@/components/book/time-slots";

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="pillCream"
      disabled={disabled || pending}
      className="mx-auto"
    >
      {pending ? "Booking…" : "Confirm booking"}
      {pending ? null : <Caret />}
    </Button>
  );
}

export function BookingWidget({
  /** Prefilled from ?service= on the Extra Services "Book Now !" buttons. */
  defaultHelp = "",
}: {
  defaultHelp?: string;
}) {
  const [state, formAction] = useActionState(submitBooking, emptyFormState);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  if (state.ok) {
    return (
      <div className="rounded-3xl bg-charcoal px-6 py-20 text-center sm:px-10">
        <p className="font-display text-4xl text-cream">You&rsquo;re booked.</p>
        <p className="mx-auto mt-4 max-w-md text-sm text-cream/85">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-3xl bg-charcoal px-5 py-10 sm:px-8 lg:px-12"
    >
      <input type="hidden" name="date" value={date ?? ""} />
      <input type="hidden" name="time" value={time ?? ""} />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:divide-x lg:divide-cream/20">
        <Calendar selected={date} onSelect={setDate} />
        <div className="lg:pl-12">
          <TimeSlots selected={time} onSelect={setTime} disabled={!date} />
        </div>
      </div>

      {state.errors.date || state.errors.time ? (
        <p role="alert" className="mt-6 text-center text-xs font-medium text-brand-warm">
          {state.errors.date ?? state.errors.time}
        </p>
      ) : null}

      <div className="mt-10 grid gap-8 rounded-3xl bg-brand-warm px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] lg:gap-12">
        <h3 className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
          <span className="block">Tell us a</span>
          <span className="block">bit about</span>
          <span className="block">you.</span>
        </h3>

        <div className="flex flex-col gap-6">
          <Input
            name="name"
            tone="ink"
            label="Full Name:"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            error={state.errors.name}
          />
          <Input
            name="email"
            type="email"
            tone="ink"
            label="Email Address"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            error={state.errors.email}
          />
          <Input
            name="business"
            tone="ink"
            label="Business:"
            autoComplete="organization"
            defaultValue={state.values?.business}
          />
          <Input
            name="help"
            tone="ink"
            label="What would you like help with?"
            defaultValue={state.values?.help ?? defaultHelp}
          />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <SubmitButton disabled={!date || !time} />
      </div>
    </form>
  );
}
