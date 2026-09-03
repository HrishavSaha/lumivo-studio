/**
 * Shared shape for the server-action form results.
 *
 * This deliberately lives outside app/actions.ts: a "use server" module may
 * only export async functions, so a value exported from there arrives on the
 * client as `undefined`.
 */
export type FormState = {
  ok: boolean;
  errors: Record<string, string>;
  message?: string;
  /**
   * What the user submitted, echoed back on failure. React 19 resets an
   * uncontrolled form after its action runs, so the fields are re-seeded from
   * here via `defaultValue` — otherwise one bad email wipes the whole form.
   */
  values?: Record<string, string>;
};

export const emptyFormState: FormState = { ok: false, errors: {} };
