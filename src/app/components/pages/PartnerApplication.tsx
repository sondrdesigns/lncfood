"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CheckCircle2, Phone, MapPin, UtensilsCrossed, Truck, FileText, ArrowRight, ArrowLeft } from "lucide-react";
import { getBranchByZip } from "@/app/lib/territory";
import type { Branch } from "@/app/data/locations";

export default function PartnerApplication() {
  const [submitted, setSubmitted] = useState(false);
  const [hasSelectedRole, setHasSelectedRole] = useState(false);
  const [assignedBranch, setAssignedBranch] = useState<Branch | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isBuyer = formData.interestType === "potential-customer";
    const branch = isBuyer && formData.state === "CA" ? getBranchByZip(formData.zipCode) : null;
    setAssignedBranch(branch);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            Thank You!
          </h1>
          <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
            We've received your application and will review it shortly. Our team will reach out to you via email with your login information and next steps.
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
                  Your assigned branch
                </p>
                <h2 className="text-2xl md:text-3xl mb-4" style={{ fontWeight: 700 }}>
                  L&amp;C {assignedBranch.city}
                </h2>
                <p className="text-foreground/70 mb-4">
                  Need to reach us before you hear back? Contact your local branch directly.
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
                  Your location is outside our current service territory. Our team will follow up directly to discuss how we can support you — in the meantime you can reach our main line at{" "}
                  <a href="tel:6264657855" className="text-primary hover:underline" style={{ fontWeight: 600 }}>
                    (626) 465-7855
                  </a>
                  .
                </p>
              </motion.div>
            )
          )}

          {formData.interestType === "potential-customer" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 mb-8 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-2" style={{ fontWeight: 700 }}>
                    Need a credit application?
                  </h3>
                  <p className="text-foreground/70 mb-5 leading-relaxed">
                    Want to set up a credit account so you can order on terms instead of paying up front? Fill out our credit application and we'll review it with your partner application.
                  </p>
                  <Link
                    href="/credit-application"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    Start credit application
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          <p className="text-lg text-foreground/60">
            Expected response time: 1-2 business days
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
          <ImageWithFallback
            src="/images/application-hero.webp"
            alt="Chef preparing food"
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
            Let's Partner Up
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Want to buy food from us, or sell food to us? Fill out this form and we'll get back to you in 1-2 business days.
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
              <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700 }}>
                Which one are you?
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Pick the option that sounds like you and we&rsquo;ll take you to the right form.
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
                  I want to buy food
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  You run a restaurant, market, or food business, and you need someone to deliver fresh ingredients and Asian food products to your kitchen.
                </p>
                <span className="inline-flex items-center gap-2 text-primary" style={{ fontWeight: 600 }}>
                  Continue as a buyer
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
                  I want to sell food
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  You grow, make, or import food, and you want us to carry your products and deliver them to restaurants across California.
                </p>
                <span className="inline-flex items-center gap-2 text-primary" style={{ fontWeight: 600 }}>
                  Continue as a vendor
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
              Neither one fits? Give us a call at{" "}
              <a href="tel:6264657855" className="text-primary hover:underline" style={{ fontWeight: 600 }}>
                (626) 465-7855
              </a>{" "}
              and we'll point you in the right direction.
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
            Back to selection
          </button>
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-foreground">
                    First Name <span className="text-red-500">*</span>
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
                    Last Name <span className="text-red-500">*</span>
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
                  I am a... <span className="text-red-500">*</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Interest type">
                  {[
                    {
                      value: "potential-customer",
                      title: "Potential Customer",
                      subtitle: "I want to buy food from L&C",
                      Icon: UtensilsCrossed,
                    },
                    {
                      value: "potential-vendor",
                      title: "Potential Vendor",
                      subtitle: "I want to sell my food to L&C",
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
                  Business Name <span className="text-red-500">*</span>
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

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cellPhone" className="block mb-2 text-foreground">
                    Cell Phone Number <span className="text-red-500">*</span>
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
                    Business Phone Number
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
                  Business Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* City, State, Zip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="city" className="block mb-2 text-foreground">
                    City <span className="text-red-500">*</span>
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
                    State <span className="text-red-500">*</span>
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
                    Zip Code <span className="text-red-500">*</span>
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
                  How Did You Find Us? <span className="text-red-500">*</span>
                </label>
                <select
                  id="howDidYouFind"
                  name="howDidYouFind"
                  required
                  value={formData.howDidYouFind}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="google">Google Search</option>
                  <option value="referral">Referral from Another Restaurant</option>
                  <option value="social-media">Social Media</option>
                  <option value="sales-rep">Sales Representative</option>
                  <option value="trade-show">Trade Show / Event</option>
                  <option value="other">Other</option>
                </select>
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
                  Submit Application
                </motion.button>
              </div>

              <p className="text-sm text-foreground/60 text-center">
                By submitting this form, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
                and acknowledge our{" "}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                We&rsquo;ll contact you within 1&ndash;2 business days.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
      )}
    </div>
  );
}
