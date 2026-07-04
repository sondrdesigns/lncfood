import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { id: string };

function contentDisposition(filename: string) {
  const fallback = filename.replace(/[^A-Za-z0-9._-]+/g, "_") || "resume";
  const encoded = encodeURIComponent(filename);
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}

export async function GET(_request: Request, { params }: { params: Params }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const app = await prisma.application.findUnique({
    where: { id: params.id },
    select: {
      resumeUrl: true,
      resumeFilename: true,
      resumeMimeType: true,
    },
  });

  if (!app?.resumeUrl) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  const blob = await get(app.resumeUrl, { access: "private", useCache: false });
  if (!blob || blob.statusCode !== 200) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  const headers = new Headers();
  headers.set(
    "content-type",
    app.resumeMimeType || blob.blob.contentType || "application/octet-stream",
  );
  headers.set("content-disposition", contentDisposition(app.resumeFilename ?? "resume"));
  if (blob.blob.size) {
    headers.set("content-length", String(blob.blob.size));
  }
  headers.set("cache-control", "private, no-store");
  headers.set("x-content-type-options", "nosniff");

  return new Response(blob.stream, { headers });
}
