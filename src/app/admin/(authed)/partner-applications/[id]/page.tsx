import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Calendar, Download, Landmark, Mail, MapPin, Phone, Search, FileText, UserCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function maskEin(ein: string): string {
  const digits = ein.replace(/\D/g, "");
  if (digits.length <= 4) return `••-•••${digits}`;
  return `••-•••${digits.slice(-4)}`;
}

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-green-100 text-green-700",
  REVIEWED: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-amber-100 text-amber-700",
  ARCHIVED: "bg-foreground/10 text-foreground/60",
};

type Params = { id: string };

export default async function AdminPartnerApplicationDetail({
  params,
}: {
  params: Params;
}) {
  const found = await prisma.partnerApplication.findUnique({ where: { id: params.id } });
  if (!found) notFound();
  const app =
    found.status === "NEW"
      ? await prisma.partnerApplication.update({
          where: { id: found.id },
          data: { status: "REVIEWED" },
        })
      : found;

  const fullAddress = `${app.address}, ${app.city}, ${app.state} ${app.zipCode}`;

  return (
    <div>
      <Link
        href="/admin/partner-applications"
        className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary mb-6 transition-colors"
        style={{ fontWeight: 500 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to partner applications
      </Link>

      <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl mb-1" style={{ fontWeight: 700 }}>
              {app.firstName} {app.lastName}
            </h1>
            <p className="text-foreground/60">
              {app.businessName} ·{" "}
              <span style={{ fontWeight: 600 }}>
                {app.interestType === "BUYER" ? "Wants to buy" : "Wants to sell"}
              </span>
            </p>
          </div>
          <span
            className={`inline-flex px-3 py-1 rounded-md text-xs ${STATUS_STYLES[app.status]}`}
            style={{ fontWeight: 600 }}
          >
            {app.status[0] + app.status.slice(1).toLowerCase()}
          </span>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 mt-1 text-primary shrink-0" />
            <div>
              <dt className="text-sm text-foreground/60">Cell phone</dt>
              <dd>
                <a href={`tel:${app.cellPhone}`} className="hover:text-primary" style={{ fontWeight: 500 }}>
                  {app.cellPhone}
                </a>
              </dd>
            </div>
          </div>
          {app.businessPhone && (
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-1 text-primary shrink-0" />
              <div>
                <dt className="text-sm text-foreground/60">Business phone</dt>
                <dd>
                  <a href={`tel:${app.businessPhone}`} className="hover:text-primary" style={{ fontWeight: 500 }}>
                    {app.businessPhone}
                  </a>
                </dd>
              </div>
            </div>
          )}
          {app.email && (
            <div className="flex items-start gap-3 sm:col-span-2">
              <Mail className="w-4 h-4 mt-1 text-primary shrink-0" />
              <div>
                <dt className="text-sm text-foreground/60">Email</dt>
                <dd>
                  <a href={`mailto:${app.email}`} className="hover:text-primary" style={{ fontWeight: 500 }}>
                    {app.email}
                  </a>
                </dd>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3 sm:col-span-2">
            <Building2 className="w-4 h-4 mt-1 text-primary shrink-0" />
            <div>
              <dt className="text-sm text-foreground/60">Business</dt>
              <dd style={{ fontWeight: 500 }}>{app.businessName}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3 sm:col-span-2">
            <MapPin className="w-4 h-4 mt-1 text-primary shrink-0" />
            <div>
              <dt className="text-sm text-foreground/60">Business address</dt>
              <dd style={{ fontWeight: 500 }}>{fullAddress}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Search className="w-4 h-4 mt-1 text-primary shrink-0" />
            <div>
              <dt className="text-sm text-foreground/60">How they found us</dt>
              <dd style={{ fontWeight: 500 }}>{app.howDidYouFind}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 mt-1 text-primary shrink-0" />
            <div>
              <dt className="text-sm text-foreground/60">Received</dt>
              <dd style={{ fontWeight: 500 }}>{app.createdAt.toLocaleString()}</dd>
            </div>
          </div>
        </dl>

        {app.productCatalogUrl && (
          <div className="mt-2 pt-6 border-t border-border">
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Product catalog
            </h2>
            <a
              href={`/admin/partner-applications/${app.id}/catalog`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-4 px-4 py-3 bg-secondary border border-border rounded-xl hover:border-primary transition-colors max-w-md"
            >
              <span className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-primary shrink-0" />
                <span className="min-w-0">
                  <span className="block truncate text-sm" style={{ fontWeight: 500 }}>
                    {app.productCatalogFilename ?? "catalog"}
                  </span>
                  <span className="block text-xs text-foreground/60">
                    {app.productCatalogSize ? formatBytes(app.productCatalogSize) : ""}
                    {app.productCatalogSize && app.productCatalogMimeType ? " · " : ""}
                    {app.productCatalogMimeType ?? ""}
                  </span>
                </span>
              </span>
              <Download className="w-4 h-4 text-foreground/60 shrink-0" />
            </a>
          </div>
        )}

        {app.creditAgreedAt && (
          <div className="mt-2 pt-6 border-t border-border">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-lg" style={{ fontWeight: 700 }}>
                Credit application
              </h2>
              <span
                className="ml-2 inline-flex px-2 py-0.5 rounded-md text-xs bg-amber-50 text-amber-800 border border-amber-200"
                style={{ fontWeight: 600 }}
              >
                Requested {app.creditAgreedAt.toLocaleDateString()}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider text-foreground/60 mb-3" style={{ fontWeight: 600 }}>
                Business
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-foreground/60">Legal name</dt>
                  <dd style={{ fontWeight: 500 }}>{app.businessLegalName ?? "—"}</dd>
                </div>
                {app.dba && (
                  <div>
                    <dt className="text-sm text-foreground/60">DBA</dt>
                    <dd style={{ fontWeight: 500 }}>{app.dba}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm text-foreground/60">EIN</dt>
                  <dd style={{ fontWeight: 500 }} className="font-mono">
                    {app.ein ? maskEin(app.ein) : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-foreground/60">Years in business</dt>
                  <dd style={{ fontWeight: 500 }}>{app.yearsInBusiness ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-foreground/60">Business type</dt>
                  <dd style={{ fontWeight: 500 }}>{app.businessType ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-foreground/60">Est. monthly purchases</dt>
                  <dd style={{ fontWeight: 500 }}>{app.estimatedMonthlyPurchases ?? "—"}</dd>
                </div>
              </dl>
            </div>

            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider text-foreground/60 mb-3" style={{ fontWeight: 600 }}>
                Bank reference
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Landmark className="w-4 h-4 mt-1 text-primary shrink-0" />
                  <div>
                    <dt className="text-sm text-foreground/60">Bank</dt>
                    <dd style={{ fontWeight: 500 }}>{app.bankName ?? "—"}</dd>
                  </div>
                </div>
                <div>
                  <dt className="text-sm text-foreground/60">Account (last 4)</dt>
                  <dd style={{ fontWeight: 500 }} className="font-mono">
                    {app.bankAccountLast4 ? `•••• ${app.bankAccountLast4}` : "—"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider text-foreground/60 mb-3" style={{ fontWeight: 600 }}>
                Trade references
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-foreground/60">Reference 1</dt>
                  <dd style={{ fontWeight: 500 }}>{app.tradeReference1Name ?? "—"}</dd>
                  {app.tradeReference1Phone && (
                    <a
                      href={`tel:${app.tradeReference1Phone}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {app.tradeReference1Phone}
                    </a>
                  )}
                </div>
                <div>
                  <dt className="text-sm text-foreground/60">Reference 2</dt>
                  <dd style={{ fontWeight: 500 }}>{app.tradeReference2Name ?? "—"}</dd>
                  {app.tradeReference2Phone && (
                    <a
                      href={`tel:${app.tradeReference2Phone}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {app.tradeReference2Phone}
                    </a>
                  )}
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider text-foreground/60 mb-3" style={{ fontWeight: 600 }}>
                Authorized signer
              </h3>
              <div className="flex items-start gap-3">
                <UserCheck className="w-4 h-4 mt-1 text-primary shrink-0" />
                <div>
                  <dt className="text-sm text-foreground/60">Name &amp; title</dt>
                  <dd style={{ fontWeight: 500 }}>
                    {app.signerName ?? "—"}
                    {app.signerTitle ? ` — ${app.signerTitle}` : ""}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        )}

        {app.notes && (
          <div className="mt-6 pt-6 border-t border-border">
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Internal notes
            </h2>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line bg-secondary rounded-xl p-4 md:p-6">
              {app.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
