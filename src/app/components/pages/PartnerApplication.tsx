"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FileText, Phone, MapPin, UtensilsCrossed, Truck, ArrowRight, ArrowLeft, X } from "lucide-react";
import { getBranchByZip } from "@/app/lib/territory";
import type { Branch } from "@/app/data/locations";
import { submitPartnerApplicationAction } from "@/lib/actions/partner-applications";
import { useLocale } from "@/app/components/LocaleProvider";

const CATALOG_MAX_BYTES = 10 * 1024 * 1024;
const CATALOG_ACCEPT = ".pdf,.xlsx,.xls,.csv,.docx,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const CATALOG_ALLOWED_MIME = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const CATALOG_ALLOWED_EXT = /\.(pdf|xlsx|xls|csv|docx)$/i;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type CreditFormState = {
  businessLegalName: string;
  dba: string;
  ein: string;
  yearsInBusiness: string;
  businessType: string;
  estimatedMonthlyPurchases: string;
  bankName: string;
  bankAccountLast4: string;
  tradeReference1Name: string;
  tradeReference1Phone: string;
  tradeReference2Name: string;
  tradeReference2Phone: string;
  signerName: string;
  signerTitle: string;
};

const initialCreditState: CreditFormState = {
  businessLegalName: "",
  dba: "",
  ein: "",
  yearsInBusiness: "",
  businessType: "llc",
  estimatedMonthlyPurchases: "",
  bankName: "",
  bankAccountLast4: "",
  tradeReference1Name: "",
  tradeReference1Phone: "",
  tradeReference2Name: "",
  tradeReference2Phone: "",
  signerName: "",
  signerTitle: "",
};

export default function PartnerApplication() {
  const { t } = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [hasSelectedRole, setHasSelectedRole] = useState(false);
  const [assignedBranch, setAssignedBranch] = useState<Branch | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interestType: "potential-customer",
    businessName: "",
    cellPhone: "",
    businessPhone: "",
    address: "",
    city: "",
    state: "CA",
    zipCode: "",
    howDidYouFind: ""
  });
  const [wantsCredit, setWantsCredit] = useState<boolean>(false);
  const [creditData, setCreditData] = useState<CreditFormState>(initialCreditState);

  // Product catalog state (vendor only).
  const catalogInputRef = useRef<HTMLInputElement>(null);
  const [catalogFile, setCatalogFile] = useState<File | null>(null);
  const [catalogError, setCatalogError] = useState<string | null>(null);

  function handleCatalogChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCatalogError(null);
    if (!file) { setCatalogFile(null); return; }
    if (file.size > CATALOG_MAX_BYTES) {
      setCatalogError(t.partner.form.catalogSizeError);
      setCatalogFile(null);
      if (catalogInputRef.current) catalogInputRef.current.value = "";
      return;
    }
    if (file.type && !CATALOG_ALLOWED_MIME.has(file.type)) {
      setCatalogError(t.partner.form.catalogTypeError);
      setCatalogFile(null);
      if (catalogInputRef.current) catalogInputRef.current.value = "";
      return;
    }
    if (!file.type && !CATALOG_ALLOWED_EXT.test(file.name)) {
      setCatalogError(t.partner.form.catalogTypeError);
      setCatalogFile(null);
      if (catalogInputRef.current) catalogInputRef.current.value = "";
      return;
    }
    setCatalogFile(file);
  }

  function clearCatalog() {
    setCatalogFile(null);
    setCatalogError(null);
    if (catalogInputRef.current) catalogInputRef.current.value = "";
  }

  const catalogServerError = fieldErrors.productCatalog;

  // Buyers default-expand the credit section once they've chosen "buyer";
  // vendors stay collapsed.
  useEffect(() => {
    if (!hasSelectedRole) return;
    if (formData.interestType === "potential-customer") {
      setWantsCredit(true);
    } else {
      setWantsCredit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSelectedRole, formData.interestType]);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    fd.set("interestType", formData.interestType);
    fd.set("credit_optIn", wantsCredit ? "1" : "0");

    const result = await submitPartnerApplicationAction(undefined, fd);

    if (result.ok) {
      const isBuyer = formData.interestType === "potential-customer";
      const branch =
        isBuyer && formData.state === "CA" ? getBranchByZip(formData.zipCode) : null;
      setAssignedBranch(branch);
      setSubmitted(true);
      setSubmitting(false);
      return;
    }

    setFormError(result.error ?? t.partner.form.genericError);
    setFieldErrors(result.fieldErrors ?? {});
    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setCreditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectRole = (interestType: string) => {
    setFormData((prev) => ({ ...prev, interestType }));
    setHasSelectedRole(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-secondary">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto px-6 py-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>
            {t.partner.success.title}
          </h1>
          <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
            {t.partner.success.body}
          </p>

          {formData.interestType === "potential-customer" && (
            assignedBranch ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 text-left"
              >
                <p className="text-sm uppercase tracking-wider text-primary mb-2" style={{ fontWeight: 600 }}>
                  {t.partner.success.branchLabel}
                </p>
                <h2 className="text-2xl md:text-3xl mb-4" style={{ fontWeight: 700 }}>
                  L&amp;C {assignedBranch.city}
                </h2>
                <p className="text-foreground/70 mb-4">
                  {t.partner.success.branchHint}
                </p>
                <div className="space-y-3">
                  <a
                    href={`tel:${assignedBranch.phone.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-3 text-primary hover:underline"
                    style={{ fontWeight: 600 }}
                  >
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span>{assignedBranch.phone}</span>
                  </a>
                  <div className="flex items-start gap-3 text-foreground/70">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{assignedBranch.address}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 text-left"
              >
                <p className="text-foreground/70">
                  {t.partner.success.outsideTerritoryPrefix}{" "}
                  <a href="tel:6264657855" className="text-primary hover:underline" style={{ fontWeight: 600 }}>
                    (626) 465-7855
                  </a>
                  {t.partner.success.outsideTerritorySuffix}
                </p>
              </motion.div>
            )
          )}

          <p className="text-lg text-foreground/60">
            {t.partner.success.responseTime}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/application-hero.webp"
            alt="Chef preparing food"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl text-white mb-6"
            style={{ fontWeight: 700 }}
          >
            {t.partner.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            {t.partner.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Audience Selection Section */}
      {!hasSelectedRole && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4" style={{ fontWeight: 700 }}>
                {t.partner.selection.title}
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                {t.partner.selection.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <button
                type="button"
                onClick={() => handleSelectRole("potential-customer")}
                className="text-left bg-secondary rounded-2xl p-8 border-2 border-transparent hover:border-primary hover:shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <UtensilsCrossed className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl mb-3" style={{ fontWeight: 700 }}>
                  {t.partner.selection.buyerCard.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  {t.partner.selection.buyerCard.description}
                </p>
                <span className="inline-flex items-center gap-2 text-primary" style={{ fontWeight: 600 }}>
                  {t.partner.selection.buyerCard.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectRole("potential-vendor")}
                className="text-left bg-secondary rounded-2xl p-8 border-2 border-transparent hover:border-primary hover:shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Truck className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl mb-3" style={{ fontWeight: 700 }}>
                  {t.partner.selection.vendorCard.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  {t.partner.selection.vendorCard.description}
                </p>
                <span className="inline-flex items-center gap-2 text-primary" style={{ fontWeight: 600 }}>
                  {t.partner.selection.vendorCard.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center text-foreground/60 mt-8 max-w-2xl mx-auto"
            >
              {t.partner.selection.fallback}{" "}
              <a href="tel:6264657855" className="text-primary hover:underline" style={{ fontWeight: 600 }}>
                {t.partner.selection.fallbackPhone}
              </a>
              .
            </motion.p>
          </div>
        </section>
      )}

      {/* Form Section */}
      {hasSelectedRole && (
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setHasSelectedRole(false)}
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary mb-6 transition-colors"
            style={{ fontWeight: 500 }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t.partner.backToSelection}
          </button>
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-8" noValidate encType="multipart/form-data">
              {/* Honeypot — bots fill this; real users don't see it. */}
              <div aria-hidden="true" className="hidden" tabIndex={-1}>
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              {formError && (
                <div
                  role="alert"
                  className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3"
                >
                  {formError}
                </div>
              )}
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-foreground">
                    {t.partner.form.firstName} <span className="text-red-500">{t.partner.form.requiredAsterisk}</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2 text-foreground">
                    {t.partner.form.lastName} <span className="text-red-500">{t.partner.form.requiredAsterisk}</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Interest Type */}
              <div>
                <span className="block mb-3 text-foreground">
                  {t.partner.form.iAmA} <span className="text-red-500">{t.partner.form.requiredAsterisk}</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label={t.partner.form.iAmA}>
                  {[
                    {
                      value: "potential-customer",
                      title: t.partner.form.buyer.title,
                      subtitle: t.partner.form.buyer.subtitle,
                      Icon: UtensilsCrossed,
                    },
                    {
                      value: "potential-vendor",
                      title: t.partner.form.vendor.title,
                      subtitle: t.partner.form.vendor.subtitle,
                      Icon: Truck,
                    },
                  ].map(({ value, title, subtitle, Icon }) => {
                    const isActive = formData.interestType === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        onClick={() =>
                          setFormData({ ...formData, interestType: value })
                        }
                        className={`text-left p-5 rounded-xl border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          isActive
                            ? "border-primary bg-primary/5"
                            : "border-transparent bg-secondary hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              isActive ? "bg-primary text-white" : "bg-primary/10 text-primary"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-foreground" style={{ fontWeight: 600 }}>
                              {title}
                            </div>
                            <div className="text-sm text-foreground/60 mt-1">
                              {subtitle}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label htmlFor="businessName" className="block mb-2 text-foreground">
                  {t.partner.form.businessName} <span className="text-red-500">{t.partner.form.requiredAsterisk}</span>
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  required
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-foreground">
                  {t.partner.form.email} <span className="text-red-500">{t.partner.form.requiredAsterisk}</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="you@yourbusiness.com"
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                  aria-invalid={Boolean(fieldErrors.email)}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                )}
              </div>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cellPhone" className="block mb-2 text-foreground">
                    {t.partner.form.cellPhone} <span className="text-red-500">{t.partner.form.requiredAsterisk}</span>
                  </label>
                  <input
                    type="tel"
                    id="cellPhone"
                    name="cellPhone"
                    required
                    value={formData.cellPhone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="businessPhone" className="block mb-2 text-foreground">
                    {t.partner.form.businessPhone}
                  </label>
                  <input
                    type="tel"
                    id="businessPhone"
                    name="businessPhone"
                    value={formData.businessPhone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Business Address */}
              <div>
                <label htmlFor="address" className="block mb-2 text-foreground">
                  {t.partner.form.address} <span className="text-red-500">{t.partner.form.requiredAsterisk}</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={t.partner.form.addressPlaceholder}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* City, State, Zip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="city" className="block mb-2 text-foreground">
                    {t.partner.form.city} <span className="text-red-500">{t.partner.form.requiredAsterisk}</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block mb-2 text-foreground">
                    {t.partner.form.state} <span className="text-red-500">{t.partner.form.requiredAsterisk}</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="CA">California</option>
                    <option value="AZ">Arizona</option>
                    <option value="NV">Nevada</option>
                    <option value="OR">Oregon</option>
                    <option value="WA">Washington</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="zipCode" className="block mb-2 text-foreground">
                    {t.partner.form.zipCode} <span className="text-red-500">{t.partner.form.requiredAsterisk}</span>
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="12345"
                    className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* How Did You Find Us */}
              <div>
                <label htmlFor="howDidYouFind" className="block mb-2 text-foreground">
                  {t.partner.form.howDidYouFind} <span className="text-red-500">{t.partner.form.requiredAsterisk}</span>
                </label>
                <select
                  id="howDidYouFind"
                  name="howDidYouFind"
                  required
                  value={formData.howDidYouFind}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">{t.partner.form.howOptions.select}</option>
                  <option value="google">{t.partner.form.howOptions.google}</option>
                  <option value="referral">{t.partner.form.howOptions.referral}</option>
                  <option value="social-media">{t.partner.form.howOptions.social}</option>
                  <option value="sales-rep">{t.partner.form.howOptions.salesRep}</option>
                  <option value="trade-show">{t.partner.form.howOptions.tradeShow}</option>
                  <option value="other">{t.partner.form.howOptions.other}</option>
                </select>
              </div>

              {/* Credit Application (optional, buyers only) */}
              {formData.interestType === "potential-customer" && (
              <div className="pt-4 border-t border-border">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={wantsCredit}
                    onChange={(e) => setWantsCredit(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-foreground/30 text-primary focus:ring-primary"
                  />
                  <span>
                    <span className="block text-foreground" style={{ fontWeight: 600 }}>
                      {t.credit.hero.title}
                    </span>
                    <span className="block text-sm text-foreground/60 mt-1">
                      {t.credit.hero.subtitle}
                    </span>
                  </span>
                </label>

                {wantsCredit && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 space-y-8">
                      {/* Business Info */}
                      <div>
                        <h3 className="text-lg sm:text-xl mb-5" style={{ fontWeight: 700 }}>
                          {t.credit.sections.businessInfo}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <label htmlFor="credit_businessLegalName" className="block mb-2 text-foreground">
                              {t.credit.labels.businessLegalName} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="credit_businessLegalName"
                              name="credit_businessLegalName"
                              required={wantsCredit}
                              value={creditData.businessLegalName}
                              onChange={handleCreditChange}
                              aria-invalid={Boolean(fieldErrors.credit_businessLegalName)}
                              className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                            />
                            {fieldErrors.credit_businessLegalName && (
                              <p className="mt-1 text-sm text-red-600">{fieldErrors.credit_businessLegalName}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="credit_dba" className="block mb-2 text-foreground">
                              {t.credit.labels.dba}
                            </label>
                            <input
                              type="text"
                              id="credit_dba"
                              name="credit_dba"
                              value={creditData.dba}
                              onChange={handleCreditChange}
                              className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label htmlFor="credit_ein" className="block mb-2 text-foreground">
                              {t.credit.labels.ein} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="credit_ein"
                              name="credit_ein"
                              required={wantsCredit}
                              value={creditData.ein}
                              onChange={handleCreditChange}
                              placeholder={t.credit.placeholders.einExample}
                              aria-invalid={Boolean(fieldErrors.credit_ein)}
                              className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                            />
                            {fieldErrors.credit_ein && (
                              <p className="mt-1 text-sm text-red-600">{fieldErrors.credit_ein}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="credit_yearsInBusiness" className="block mb-2 text-foreground">
                              {t.credit.labels.yearsInBusiness} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              id="credit_yearsInBusiness"
                              name="credit_yearsInBusiness"
                              required={wantsCredit}
                              min={0}
                              value={creditData.yearsInBusiness}
                              onChange={handleCreditChange}
                              aria-invalid={Boolean(fieldErrors.credit_yearsInBusiness)}
                              className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                            />
                            {fieldErrors.credit_yearsInBusiness && (
                              <p className="mt-1 text-sm text-red-600">{fieldErrors.credit_yearsInBusiness}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="credit_businessType" className="block mb-2 text-foreground">
                              {t.credit.labels.businessType} <span className="text-red-500">*</span>
                            </label>
                            <select
                              id="credit_businessType"
                              name="credit_businessType"
                              required={wantsCredit}
                              value={creditData.businessType}
                              onChange={handleCreditChange}
                              className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                            >
                              <option value="llc">{t.credit.businessTypes.llc}</option>
                              <option value="corporation">{t.credit.businessTypes.corporation}</option>
                              <option value="s-corp">{t.credit.businessTypes.sCorp}</option>
                              <option value="partnership">{t.credit.businessTypes.partnership}</option>
                              <option value="sole-prop">{t.credit.businessTypes.soleProp}</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label htmlFor="credit_estimatedMonthlyPurchases" className="block mb-2 text-foreground">
                              {t.credit.labels.monthlyPurchases} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="credit_estimatedMonthlyPurchases"
                              name="credit_estimatedMonthlyPurchases"
                              required={wantsCredit}
                              value={creditData.estimatedMonthlyPurchases}
                              onChange={handleCreditChange}
                              placeholder={t.credit.placeholders.monthlyExample}
                              aria-invalid={Boolean(fieldErrors.credit_estimatedMonthlyPurchases)}
                              className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bank Reference */}
                      <div className="pt-4 border-t border-border">
                        <h3 className="text-xl mb-5" style={{ fontWeight: 700 }}>
                          {t.credit.sections.bankReference}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="credit_bankName" className="block mb-2 text-foreground">
                              {t.credit.labels.bankName} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="credit_bankName"
                              name="credit_bankName"
                              required={wantsCredit}
                              value={creditData.bankName}
                              onChange={handleCreditChange}
                              className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label htmlFor="credit_bankAccountLast4" className="block mb-2 text-foreground">
                              {t.credit.labels.accountLast4} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="credit_bankAccountLast4"
                              name="credit_bankAccountLast4"
                              required={wantsCredit}
                              inputMode="numeric"
                              pattern="[0-9]{4}"
                              maxLength={4}
                              value={creditData.bankAccountLast4}
                              onChange={handleCreditChange}
                              placeholder={t.credit.placeholders.accountExample}
                              aria-invalid={Boolean(fieldErrors.credit_bankAccountLast4)}
                              className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                            />
                            {fieldErrors.credit_bankAccountLast4 && (
                              <p className="mt-1 text-sm text-red-600">{fieldErrors.credit_bankAccountLast4}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Trade References */}
                      <div className="pt-4 border-t border-border">
                        <h3 className="text-xl mb-2" style={{ fontWeight: 700 }}>
                          {t.credit.sections.tradeReferences}
                        </h3>
                        <p className="text-foreground/60 mb-5">
                          {t.credit.sections.tradeReferencesSubtitle}
                        </p>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="credit_tradeReference1Name" className="block mb-2 text-foreground">
                                {t.credit.labels.ref1Company} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="credit_tradeReference1Name"
                                name="credit_tradeReference1Name"
                                required={wantsCredit}
                                value={creditData.tradeReference1Name}
                                onChange={handleCreditChange}
                                className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                              />
                            </div>
                            <div>
                              <label htmlFor="credit_tradeReference1Phone" className="block mb-2 text-foreground">
                                {t.credit.labels.ref1Phone} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="tel"
                                id="credit_tradeReference1Phone"
                                name="credit_tradeReference1Phone"
                                required={wantsCredit}
                                value={creditData.tradeReference1Phone}
                                onChange={handleCreditChange}
                                placeholder={t.credit.placeholders.phoneExample}
                                className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="credit_tradeReference2Name" className="block mb-2 text-foreground">
                                {t.credit.labels.ref2Company} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="credit_tradeReference2Name"
                                name="credit_tradeReference2Name"
                                required={wantsCredit}
                                value={creditData.tradeReference2Name}
                                onChange={handleCreditChange}
                                className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                              />
                            </div>
                            <div>
                              <label htmlFor="credit_tradeReference2Phone" className="block mb-2 text-foreground">
                                {t.credit.labels.ref2Phone} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="tel"
                                id="credit_tradeReference2Phone"
                                name="credit_tradeReference2Phone"
                                required={wantsCredit}
                                value={creditData.tradeReference2Phone}
                                onChange={handleCreditChange}
                                placeholder={t.credit.placeholders.phoneExample}
                                className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Authorized Signer */}
                      <div className="pt-4 border-t border-border">
                        <h3 className="text-xl mb-5" style={{ fontWeight: 700 }}>
                          {t.credit.sections.authorizedSigner}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="credit_signerName" className="block mb-2 text-foreground">
                              {t.credit.labels.signerName} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="credit_signerName"
                              name="credit_signerName"
                              required={wantsCredit}
                              value={creditData.signerName}
                              onChange={handleCreditChange}
                              className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label htmlFor="credit_signerTitle" className="block mb-2 text-foreground">
                              {t.credit.labels.signerTitle} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="credit_signerTitle"
                              name="credit_signerTitle"
                              required={wantsCredit}
                              value={creditData.signerTitle}
                              onChange={handleCreditChange}
                              placeholder={t.credit.placeholders.signerTitleExample}
                              className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              )}

              {/* Product catalog — vendors only */}
              {formData.interestType === "potential-vendor" && (
                <div className="pt-4 border-t border-border">
                  <label className="block mb-1 text-foreground" style={{ fontWeight: 600 }}>
                    {t.partner.form.catalogLabel}
                    <span className="ml-1 text-foreground/50" style={{ fontWeight: 400 }}>({t.partner.form.catalogOptional})</span>
                  </label>
                  <p className="text-sm text-foreground/60 mb-3">{t.partner.form.catalogHint}</p>
                  {catalogFile ? (
                    <div
                      className="flex items-center justify-between gap-3 px-4 py-3 bg-secondary border border-border rounded-xl"
                      aria-live="polite"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-5 h-5 text-primary shrink-0" />
                        <div className="min-w-0">
                          <p className="truncate text-sm" style={{ fontWeight: 500 }}>{catalogFile.name}</p>
                          <p className="text-xs text-foreground/60">{formatBytes(catalogFile.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={clearCatalog}
                        className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-red-600 transition-colors"
                        aria-label={t.partner.form.catalogRemove}
                      >
                        <X className="w-4 h-4" />
                        {t.partner.form.catalogRemove}
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="productCatalog"
                      className="flex items-center gap-3 px-4 py-3 bg-secondary border border-dashed border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      <FileText className="w-5 h-5 text-foreground/50" />
                      <span className="text-sm text-foreground/70">{t.partner.form.catalogChooseFile}</span>
                    </label>
                  )}
                  <input
                    ref={catalogInputRef}
                    id="productCatalog"
                    name="productCatalog"
                    type="file"
                    accept={CATALOG_ACCEPT}
                    onChange={handleCatalogChange}
                    className="sr-only"
                  />
                  {(catalogError || catalogServerError) && (
                    <p className="mt-2 text-sm text-red-600">{catalogError ?? catalogServerError}</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={submitting ? undefined : { scale: 1.02 }}
                  whileTap={submitting ? undefined : { scale: 0.98 }}
                  className="w-full px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ fontWeight: 600 }}
                >
                  {submitting ? t.partner.form.submitting : t.partner.form.submit}
                </motion.button>
              </div>

              <p className="text-sm text-foreground/60 text-center">
                {t.partner.form.terms.prefix}{" "}
                <Link href="/terms" className="text-primary hover:underline">{t.partner.form.terms.tos}</Link>{" "}
                {t.partner.form.terms.middle}{" "}
                <Link href="/privacy" className="text-primary hover:underline">{t.partner.form.terms.privacy}</Link>
                {t.partner.form.terms.suffix}
              </p>
            </form>
          </motion.div>
        </div>
      </section>
      )}
    </div>
  );
}
