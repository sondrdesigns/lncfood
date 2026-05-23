"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ArrowRight, FileText, Send, X } from "lucide-react";
import {
  submitApplicationAction,
  type ApplicationFormState,
} from "@/lib/actions/applications";

const initialState: ApplicationFormState = {};

const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const RESUME_ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const RESUME_ALLOWED_EXT = /\.(pdf|doc|docx)$/i;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type Props = {
  jobSlug: string;
  jobTitle: string;
  branchLabel?: string; // e.g. "L&C San Jose"
};

export function JobApplicationForm({ jobSlug, jobTitle, branchLabel }: Props) {
  const [state, action] = useFormState(submitApplicationAction, initialState);
  const errorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);

  useEffect(() => {
    if (state.error) {
      errorRef.current?.focus();
    }
  }, [state.error]);

  function handleResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setResumeError(null);
    if (!file) {
      setResumeFile(null);
      return;
    }
    if (file.size > RESUME_MAX_BYTES) {
      setResumeError("Resume must be 5 MB or smaller.");
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (file.type && !RESUME_ALLOWED_MIME.has(file.type)) {
      setResumeError("Resume must be a PDF, DOC, or DOCX file.");
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (!file.type && !RESUME_ALLOWED_EXT.test(file.name)) {
      setResumeError("Resume must be a PDF, DOC, or DOCX file.");
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setResumeFile(file);
  }

  function clearResume() {
    setResumeFile(null);
    setResumeError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const resumeServerError = state.fieldErrors?.resume;

  return (
    <form action={action} className="space-y-6" noValidate encType="multipart/form-data">
      <input type="hidden" name="jobSlug" value={jobSlug} />
      <input type="hidden" name="jobTitle" value={jobTitle} />
      {/* Honeypot — real users leave this empty; bots fill it. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {branchLabel && (
        <div className="flex items-center gap-2 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl text-sm">
          <span className="text-foreground/60">Applying to:</span>
          <span className="text-primary" style={{ fontWeight: 600 }}>{branchLabel}</span>
        </div>
      )}

      {state.error && (
        <motion.div
          ref={errorRef}
          tabIndex={-1}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 outline-none focus:ring-2 focus:ring-red-300"
          role="alert"
          aria-live="assertive"
        >
          {state.error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="First name"
          name="firstName"
          required
          autoComplete="given-name"
          error={state.fieldErrors?.firstName}
        />
        <Field
          label="Last name"
          name="lastName"
          required
          autoComplete="family-name"
          error={state.fieldErrors?.lastName}
        />
      </div>

      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        error={state.fieldErrors?.email}
      />
      <Field
        label="Phone"
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        error={state.fieldErrors?.phone}
      />

      <div>
        <label
          htmlFor="experience"
          className="block text-base mb-2 text-foreground"
          style={{ fontWeight: 600 }}
        >
          Experience &amp; references <span aria-hidden="true" className="text-red-600">*</span><span className="sr-only">required</span>
        </label>
        <p className="text-sm text-foreground/60 mb-2">
          Tell us about your relevant experience, qualifications, and any references you'd like to share.
        </p>
        <textarea
          id="experience"
          name="experience"
          required
          rows={7}
          minLength={20}
          maxLength={5000}
          aria-invalid={!!state.fieldErrors?.experience}
          aria-describedby={state.fieldErrors?.experience ? "experience-error" : undefined}
          className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors text-base resize-y"
          placeholder="e.g. 5 years driving Class A in San Diego County, current TWIC card, references available on request..."
        />
        {state.fieldErrors?.experience && (
          <p id="experience-error" className="mt-2 text-sm text-red-600">
            {state.fieldErrors.experience}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="resume"
          className="block text-base mb-2 text-foreground"
          style={{ fontWeight: 600 }}
        >
          Resume <span className="text-foreground/50" style={{ fontWeight: 400 }}>(optional)</span>
        </label>
        <p className="text-sm text-foreground/60 mb-2">
          PDF, DOC, or DOCX up to 5 MB. Helpful for roles that need extra qualification detail.
        </p>
        {resumeFile ? (
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 bg-white border border-border rounded-xl"
            aria-live="polite"
          >
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="w-5 h-5 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="truncate text-sm" style={{ fontWeight: 500 }}>
                  {resumeFile.name}
                </p>
                <p className="text-xs text-foreground/60">{formatBytes(resumeFile.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearResume}
              className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-red-600 transition-colors"
              aria-label="Remove resume"
            >
              <X className="w-4 h-4" />
              Remove
            </button>
          </div>
        ) : (
          <label
            htmlFor="resume"
            className="flex items-center gap-3 px-4 py-3 bg-white border border-dashed border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <FileText className="w-5 h-5 text-foreground/50" />
            <span className="text-sm text-foreground/70">Choose a file to upload</span>
          </label>
        )}
        <input
          ref={fileInputRef}
          id="resume"
          name="resume"
          type="file"
          accept={RESUME_ACCEPT}
          onChange={handleResumeChange}
          aria-invalid={!!(resumeError || resumeServerError)}
          aria-describedby={resumeError || resumeServerError ? "resume-error" : undefined}
          className={resumeFile ? "sr-only" : "sr-only"}
        />
        {(resumeError || resumeServerError) && (
          <p id="resume-error" className="mt-2 text-sm text-red-600">
            {resumeError ?? resumeServerError}
          </p>
        )}
      </div>

      <SubmitButton hasResume={!!resumeFile} />
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-base mb-2 text-foreground"
        style={{ fontWeight: 600 }}
      >
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-red-600"> *</span>
            <span className="sr-only"> required</span>
          </>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors text-base"
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton({ hasResume }: { hasResume: boolean }) {
  const { pending } = useFormStatus();
  return (
    <motion.button
      type="submit"
      disabled={pending}
      whileHover={pending ? undefined : { scale: 1.02 }}
      whileTap={pending ? undefined : { scale: 0.98 }}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-base transition-colors"
      style={{ fontWeight: 600 }}
    >
      {pending ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          {hasResume ? "Uploading resume..." : "Submitting..."}
        </>
      ) : (
        <>
          <Send className="w-4 h-4" />
          Submit Application
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </motion.button>
  );
}
