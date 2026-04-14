import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, TrendingUp, Users } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export default function Home() {
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

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1684695749267-233af13276d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxmb29kJTIwZGlzdHJpYnV0aW9uJTIwd2FyZWhvdXNlJTIwbG9naXN0aWNzfGVufDF8fHx8MTc3NjE0MjYxNHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Modern warehouse facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <span className="text-white/90 text-sm" style={{ fontWeight: 500 }}>Trusted Since 1995</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight" style={{ fontWeight: 700 }}>
              Your Trusted Asian Food Distribution Partner
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed" style={{ fontWeight: 400 }}>
              More than just supply – Global Foods, Local Solutions
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/partner-application">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center gap-2 transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Partner With Us
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Browse Catalog
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
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
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1549194388-f61be84a6e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxmb29kJTIwZGlzdHJpYnV0aW9uJTIwd2FyZWhvdXNlJTIwbG9naXN0aWNzfGVufDF8fHx8MTc3NjE0MjYxNHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Warehouse operations"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl text-foreground mb-6" style={{ fontWeight: 700 }}>
                About L&C Food Distribution
              </h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                At L&C Food Distribution, we don't just deliver products – we deliver peace of mind. As a business partner, our mission is to make your sourcing solution simple, consistent, and cost-effective.
              </p>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                Ready to experience the difference? Since 1995, we've been serving restaurants across California with unwavering commitment to quality and reliability.
              </p>
              <Link to="/about">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-primary flex items-center gap-2"
                  style={{ fontWeight: 600 }}
                >
                  Learn More About Us
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
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
              Our Services
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Comprehensive food distribution solutions tailored to your business needs
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                image: "https://images.unsplash.com/photo-1598357850706-0188bc0372b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
                title: "Fresh Vegetables",
                description: "Farm-fresh produce delivered daily to keep your menu vibrant and healthy."
              },
              {
                image: "https://images.unsplash.com/photo-1545898073-346e42dc7357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
                title: "Meat Products",
                description: "Premium quality meats sourced from trusted suppliers for your customers."
              },
              {
                image: "https://images.unsplash.com/photo-1564753907916-f3a2ad1b01fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
                title: "Dry Groceries",
                description: "Comprehensive selection of pantry staples and specialty Asian ingredients."
              },
              {
                image: "https://images.unsplash.com/photo-1650012048722-c81295ccbe79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
                title: "Disposables",
                description: "Complete range of food service supplies and packaging solutions."
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-2" style={{ fontWeight: 600 }}>{service.title}</h3>
                  <p className="text-foreground/60">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-12"
          >
            {[
              { icon: Users, value: "500+", label: "Restaurant Partners" },
              { icon: Truck, value: "4", label: "Distribution Centers" },
              { icon: Shield, value: "29", label: "Years of Excellence" },
              { icon: TrendingUp, value: "99%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-white/80" />
                <div className="text-4xl md:text-5xl mb-2" style={{ fontWeight: 700 }}>{stat.value}</div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1717838207789-62684e75a770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNoZWYlMjBjb29raW5nfGVufDF8fHx8MTc3NjA1OTMwOHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Chef cooking"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
            </div>

            <div className="relative z-10 px-12 py-20 md:py-28 text-center">
              <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontWeight: 700 }}>
                Ready to Partner With Us?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join hundreds of successful restaurants across California who trust L&C Food Distribution for their supply needs.
              </p>
              <Link to="/partner-application">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white text-primary rounded-xl flex items-center gap-2 mx-auto hover:bg-white/95 transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
