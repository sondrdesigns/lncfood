"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, ExternalLink } from "lucide-react";
import type { FormState } from "@/lib/actions/jobs";
import type { JobType } from "@/lib/validators/job";

export type JobFormValues = {
  title?: string;
  type?: JobType;
  location?: string;
  schedule?: string;
  description?: string;
  requirements?: string[];
  applyUrl?: string;
  published?: boolean;
};

const TYPE_OPTIONS: { value: JobType; label: string }[] = [
  { value: "WAREHOUSE", label: "Warehouse" },
  { value: "DELIVERY", label: "Delivery" },
  { value: "SALES", label: "Sales" },
  { value: "ADMIN", label: "Administrative" },
];

const initialState: FormState = {};

export function JobForm({
  defaults,
  action,
  submitLabel,
  publicSlug,
  initialSuccess,
}: {
  defaults?: JobFormValues;
  action: (prev: FormState | undefined, fd: FormData) => Promise<FormState>;
  submitLabel: string;
  publicSlug?: string;
  initialSuccess?: { title: string; detail?: string };
}) {
  const [state, dispatch] = useFormState(action, initialState);
  const [showInitial, setShowInitial] = useState(!!initialSuccess);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const errs = state?.fieldErrors ?? {};

  useEffect(() => {
    if (state?.saved) {
      setShowInitial(false);
      bannerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (state?.error) {
      bannerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state?.saved, state?.error]);

  const successTitle = state?.saved
    ? "Changes saved"
    : showInitial
      ? initialSuccess!.title
      : null;
  const publishedAfterSave = state?.saved ? !!state.published : !!defaults?.published;
  const successDetail = state?.saved
    ? publishedAfterSave
      ? "Your edits are live on /careers."
      : "This posting is still a draft (Published is off)."
    : showInitial
      ? initialSuccess!.detail
      : undefined;
  const showLiveLink = !!successTitle && !!publicSlug && publishedAfterSave;

  return (
    <form action={dispatch} className="space-y-6">
      <div ref={bannerRef}>
        {state?.error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
            {state.error}
          </div>
        )}
        {successTitle && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3.5"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-green-800" style={{ fontWeight: 600 }}>
                {successTitle}
              </p>
              {successDetail && (
                <p className="text-xs text-green-700/90 mt-0.5">{successDetail}</p>
              )}
            </div>
            {showLiveLink && (
              <a
                href={`/careers/${publicSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-green-800 hover:text-green-900 underline-offset-2 hover:underline flex-shrink-0"
                style={{ fontWeight: 600 }}
              >
                View live posting
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>

      <Field label="Title" name="title" error={errs.title}>
        <input
          name="title"
          defaultValue={defaults?.title}
          required
          className="w-full px-3 py-2.5 bg-secondary rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Type" name="type" error={errs.type}>
          <select
            name="type"
            defaultValue={defaults?.type ?? "WAREHOUSE"}
            required
            className="w-full px-3 py-2.5 bg-secondary rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Schedule" name="schedule" error={errs.schedule} hint="e.g. Full-time, Part-time, Seasonal">
          <input
            name="schedule"
            defaultValue={defaults?.schedule}
            required
            className="w-full px-3 py-2.5 bg-secondary rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
          />
        </Field>
      </div>

      <Field label="Location" name="location" error={errs.location} hint="e.g. Los Angeles, CA">
        <input
          name="location"
          defaultValue={defaults?.location}
          required
          className="w-full px-3 py-2.5 bg-secondary rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
        />
      </Field>

      <Field label="Description" name="description" error={errs.description}>
        <textarea
          name="description"
          defaultValue={defaults?.description}
          required
          rows={6}
          className="w-full px-3 py-2.5 bg-secondary rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors resize-y"
        />
      </Field>

      <Field
        label="Requirements"
        name="requirements"
        error={errs.requirements}
        hint="One requirement per line."
      >
        <textarea
          name="requirements"
          defaultValue={(defaults?.requirements ?? []).join("\n")}
          required
          rows={6}
          className="w-full px-3 py-2.5 bg-secondary rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors resize-y font-mono text-sm"
        />
      </Field>

      <Field
        label="Apply URL"
        name="applyUrl"
        error={errs.applyUrl}
        hint="A web URL (https://…), mailto:, tel:, or internal path (/partner-application)."
      >
        <input
          name="applyUrl"
          defaultValue={defaults?.applyUrl}
          required
          className="w-full px-3 py-2.5 bg-secondary rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
        />
      </Field>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="published"
          defaultChecked={defaults?.published ?? false}
          className="w-4 h-4 accent-primary"
        />
        <span style={{ fontWeight: 500 }}>Published (visible on /careers)</span>
      </label>

      <div className="flex justify-end gap-3 pt-2">
        <SubmitButton submitLabel={submitLabel} />
      </div>
    </form>
  );
}

function SubmitButton({ submitLabel }: { submitLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
      style={{ fontWeight: 600 }}
    >
      {pending ? "Saving…" : submitLabel}
    </button>
  );
}

function Field({
  label,
  name,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm mb-1.5" style={{ fontWeight: 500 }}>
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-foreground/60 mt-1.5">{hint}</p>}
      {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}
