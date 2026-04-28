"use client";

import { Trash2 } from "lucide-react";

export function DeleteJobButton({
  action,
  title,
}: {
  action: () => Promise<void>;
  title: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(`Permanently delete "${title}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 transition-colors text-sm"
        style={{ fontWeight: 500 }}
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </form>
  );
}
