import { put } from "@vercel/blob";

export type FileUpload = {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
};

export function safeFilename(name: string, fallback = "file") {
  const base = name.split(/[\\/]/).pop() ?? fallback;
  return base.replace(/[^A-Za-z0-9._-]+/g, "_").slice(0, 120) || fallback;
}

export type FileValidationOk = { ok: true };
export type FileValidationErr = { ok: false; message: string };
export type FileValidationResult = FileValidationOk | FileValidationErr;

export async function uploadBlob(
  file: File,
  prefix: string,
  opts: {
    maxBytes: number;
    allowedMime: Set<string>;
    allowedExt: RegExp;
    mimeError: string;
    fallbackName?: string;
  },
): Promise<{ upload: FileUpload } | { error: string }> {
  if (file.size === 0) return { error: "File appears to be empty." };
  if (file.size > opts.maxBytes) {
    return { error: `File must be ${(opts.maxBytes / (1024 * 1024)).toFixed(0)} MB or smaller.` };
  }
  if (file.type && !opts.allowedMime.has(file.type)) {
    return { error: opts.mimeError };
  }
  if (!file.type && !opts.allowedExt.test(file.name)) {
    return { error: opts.mimeError };
  }

  const filename = safeFilename(file.name, opts.fallbackName);
  try {
    const blob = await put(`${prefix}/${Date.now()}-${filename}`, file, {
      access: "private",
      contentType: file.type || "application/octet-stream",
      addRandomSuffix: true,
    });
    return {
      upload: {
        url: blob.url,
        filename,
        size: file.size,
        mimeType: file.type || "application/octet-stream",
      },
    };
  } catch (e) {
    console.error("[upload] blob upload failed", e);
    return { error: "Upload failed. Please try again." };
  }
}
