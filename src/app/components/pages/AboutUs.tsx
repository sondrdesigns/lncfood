"use client";

import { motion } from "motion/react";
import { Globe, Heart, TrendingUp, Scale, Handshake, Users as UsersIcon, Store, Package, Layers } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { branches } from "@/app/data/locations";

export default function AboutUs() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const ingredients = [
    {
      icon: Globe,
      title: "Integrity in Every Order",
      description: "We believe in honest business practices and transparent communication with all our partners."
    },
    {
      icon: Heart,
      title: "Transparency & Fairness",
      description: "Honesty guides how we do business, building trust through clear pricing and reliable service."
    },
    {
      icon: TrendingUp,
      title: "Hunger for Improvement",
      description: "We continuously evolve our services to better serve your changing needs and challenges."
    },
    {
      icon: Scale,
      title: "Building Economies of Scale",
      description: "Leveraging our network to provide the best value without compromising on quality."
    },
    {
      icon: Handshake,
      title: "Partnership Over Transactions",
      description: "We're not just suppliers – we're invested in your success and growth."
    },
    {
      icon: UsersIcon,
      title: "Collaboration is Key",
      description: "Working together with our partners to create solutions that benefit everyone."
    }
  ];

  const franchiseSolutions = [
    {
      icon: Store,
      title: "Franchise-Ready Distribution",
      description:
        "We work with franchise operators across California to deliver consistent quality and reliable service to every location, so the guest experience stays the same in every market.",
    },
    {
      icon: Package,
      title: "Custom Item Procurement",
      description:
        "Need a specialty ingredient or a recipe-specific SKU? We source custom items to spec — letting you serve a signature menu without sourcing it yourself.",
    },
    {
      icon: Layers,
      title: "A Streamlined Product Line",
      description:
        "We consolidate your sourcing under one trusted partner, simplifying ordering, reducing vendor sprawl, and keeping your line tight and predictable.",
    },
  ];

  const locations = branches;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/about-hero.webp"
            alt="Warehouse with fresh produce"
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
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Building trusted partnerships since 1995
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl text-foreground mb-6" style={{ fontWeight: 700 }}>
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-foreground/70 leading-relaxed">
                <p>
                  Back in 1995 in the city of San Diego, L&C Food Distribution was simply a thought: How can the local food distribution for all the Asian restaurants throughout the United States be improved to be in constant pursuit of a better answer to that question.
                </p>
                <p>
                  Our journey began with a simple mission: to bridge the gap between quality Asian food suppliers and the restaurants that serve their communities. We understood that our success relies on our partners and it is the persistent effort to improve and overcome obstacles that has allowed us the privilege to serve you.
                </p>
                <p>
                  Today, we operate across California with four strategic distribution centers, serving hundreds of restaurant partners with the same dedication and family values that started it all. Our growth is a testament to the trust our partners place in us every single day.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="/images/about-story-section.webp"
                  alt="Distribution truck"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-8 max-w-xs"
              >
                <div className="text-4xl text-primary mb-2" style={{ fontWeight: 700 }}>29+</div>
                <div className="text-foreground/60">Years of Excellence</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ingredients for Success */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-4" style={{ fontWeight: 700 }}>
              Our Ingredients for Success
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              The core principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.title}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center mb-6">
                  <ingredient.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl mb-3" style={{ fontWeight: 600 }}>{ingredient.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{ingredient.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Built for Franchise Operators */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-4" style={{ fontWeight: 700 }}>
              Built for Franchise Operators
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Custom procurement and consistent supply, scaled to every location.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {franchiseSolutions.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="bg-secondary rounded-2xl p-8 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl mb-3" style={{ fontWeight: 600 }}>{item.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-4" style={{ fontWeight: 700 }}>
              Our Locations
            </h2>
            <p className="text-lg text-foreground/70">
              Serving California from four strategic distribution centers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="space-y-6"
            >
              {locations.map((location, index) => (
                <motion.div
                  key={location.city}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl text-primary mb-3" style={{ fontWeight: 600 }}>
                    L&C {location.city}
                  </h3>
                  <p className="text-foreground/70 mb-2">{location.address}</p>
                  <a
                    href={`tel:${location.phone}`}
                    className="text-primary hover:underline"
                    style={{ fontWeight: 500 }}
                  >
                    {location.phone}
                  </a>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.8821207726!2d-118.69192939999999!3d34.020161299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="L&C Food Distribution Locations"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
