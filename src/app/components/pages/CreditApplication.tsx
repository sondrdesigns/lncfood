"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function CreditApplication() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
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
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            Credit application received!
          </h1>
          <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
            Thanks — we've got your credit application. Our team will review it along with your partner application and follow up by email.
          </p>
          <p className="text-lg text-foreground/60">
            Expected response time: 3-5 business days
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[280px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/application-hero.webp"
            alt="Restaurant kitchen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl text-white mb-6"
            style={{ fontWeight: 700 }}
          >
            Credit Application
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Apply for a credit account so you can order on terms instead of paying up front.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/partner-application"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary mb-6 transition-colors"
            style={{ fontWeight: 500 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to partner application
          </Link>

          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Business Info */}
              <div>
                <h2 className="text-xl mb-5" style={{ fontWeight: 700 }}>
                  Business information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="businessLegalName" className="block mb-2 text-foreground">
                      Business Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="businessLegalName"
                      name="businessLegalName"
                      required
                      value={formData.businessLegalName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="dba" className="block mb-2 text-foreground">
                      DBA (if different)
                    </label>
                    <input
                      type="text"
                      id="dba"
                      name="dba"
                      value={formData.dba}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="ein" className="block mb-2 text-foreground">
                      EIN / Tax ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="ein"
                      name="ein"
                      required
                      value={formData.ein}
                      onChange={handleChange}
                      placeholder="XX-XXXXXXX"
                      className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="yearsInBusiness" className="block mb-2 text-foreground">
                      Years in Business <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="yearsInBusiness"
                      name="yearsInBusiness"
                      required
                      min={0}
                      value={formData.yearsInBusiness}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessType" className="block mb-2 text-foreground">
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      required
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="llc">LLC</option>
                      <option value="corporation">Corporation</option>
                      <option value="s-corp">S-Corporation</option>
                      <option value="partnership">Partnership</option>
                      <option value="sole-prop">Sole Proprietorship</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="estimatedMonthlyPurchases" className="block mb-2 text-foreground">
                      Estimated Monthly Purchases (USD) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="estimatedMonthlyPurchases"
                      name="estimatedMonthlyPurchases"
                      required
                      value={formData.estimatedMonthlyPurchases}
                      onChange={handleChange}
                      placeholder="$5,000"
                      className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Reference */}
              <div className="pt-4 border-t border-border">
                <h2 className="text-xl mb-5" style={{ fontWeight: 700 }}>
                  Bank reference
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="bankName" className="block mb-2 text-foreground">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      required
                      value={formData.bankName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="bankAccountLast4" className="block mb-2 text-foreground">
                      Account Last 4 Digits <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="bankAccountLast4"
                      name="bankAccountLast4"
                      required
                      inputMode="numeric"
                      pattern="[0-9]{4}"
                      maxLength={4}
                      value={formData.bankAccountLast4}
                      onChange={handleChange}
                      placeholder="1234"
                      className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Trade References */}
              <div className="pt-4 border-t border-border">
                <h2 className="text-xl mb-2" style={{ fontWeight: 700 }}>
                  Trade references
                </h2>
                <p className="text-foreground/60 mb-5">
                  Two suppliers or vendors you've done business with.
                </p>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="tradeReference1Name" className="block mb-2 text-foreground">
                        Reference 1 — Company <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="tradeReference1Name"
                        name="tradeReference1Name"
                        required
                        value={formData.tradeReference1Name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="tradeReference1Phone" className="block mb-2 text-foreground">
                        Reference 1 — Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="tradeReference1Phone"
                        name="tradeReference1Phone"
                        required
                        value={formData.tradeReference1Phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                        className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="tradeReference2Name" className="block mb-2 text-foreground">
                        Reference 2 — Company <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="tradeReference2Name"
                        name="tradeReference2Name"
                        required
                        value={formData.tradeReference2Name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="tradeReference2Phone" className="block mb-2 text-foreground">
                        Reference 2 — Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="tradeReference2Phone"
                        name="tradeReference2Phone"
                        required
                        value={formData.tradeReference2Phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                        className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Authorized Signer */}
              <div className="pt-4 border-t border-border">
                <h2 className="text-xl mb-5" style={{ fontWeight: 700 }}>
                  Authorized signer
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="signerName" className="block mb-2 text-foreground">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="signerName"
                      name="signerName"
                      required
                      value={formData.signerName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="signerTitle" className="block mb-2 text-foreground">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="signerTitle"
                      name="signerTitle"
                      required
                      value={formData.signerTitle}
                      onChange={handleChange}
                      placeholder="Owner, CFO, etc."
                      className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Submit Credit Application
                </motion.button>
              </div>

              <p className="text-sm text-foreground/60 text-center">
                By submitting this form, you authorize L&amp;C Food Distribution to verify the information above,
                including contacting the bank and trade references you listed. Your information is handled under
                our{" "}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>{" "}
                and{" "}
                <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.
                Response time: 3&ndash;5 business days.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
