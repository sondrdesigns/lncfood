import { motion } from "motion/react";
import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CheckCircle2 } from "lucide-react";

export default function PartnerApplication() {
  const [submitted, setSubmitted] = useState(false);
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
    setSubmitted(true);
    // In a real application, this would send data to a backend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
            Thank You!
          </h1>
          <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
            We've received your application and will review it shortly. Our team will reach out to you via email with your login information and next steps.
          </p>
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
            src="https://images.unsplash.com/photo-1746494557939-2d305c1c834a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNoZWYlMjBjb29raW5nfGVufDF8fHx8MTc3NjA1OTMwOHww&ixlib=rb-4.1.0&q=80&w=1080"
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
            Please fill out this form if you are interested in becoming a customer or vendor with us. Once we review your application, we will send you an email with your login information.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
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
                <label htmlFor="interestType" className="block mb-2 text-foreground">
                  Choose Interest Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="interestType"
                  name="interestType"
                  required
                  value={formData.interestType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="potential-customer">Potential Customer</option>
                  <option value="potential-vendor">Potential Vendor</option>
                </select>
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
                By submitting this form, you agree to our terms and conditions. We will contact you within 1-2 business days.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
