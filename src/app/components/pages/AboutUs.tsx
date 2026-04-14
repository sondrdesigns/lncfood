import { motion } from "motion/react";
import { Globe, Heart, TrendingUp, Scale, Handshake, Users as UsersIcon } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

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

  const customers = [
    { name: "Royal India", logo: "RI" },
    { name: "Sansei Seafood", logo: "SS" },
    { name: "Yoshinova", logo: "YN" },
    { name: "AFC Sushi", logo: "AFC" },
    { name: "Golden Dragon", logo: "GD" },
    { name: "Tokyo Express", logo: "TE" },
  ];

  const locations = [
    {
      city: "San Diego",
      address: "8724 Approach Rd, San Diego, CA 92154",
      phone: "(619) 710-2030"
    },
    {
      city: "Los Angeles",
      address: "15320 Salt Lake Ave, City of Industry, CA 91745",
      phone: "(626) 465-7855"
    },
    {
      city: "Fresno",
      address: "471 S Teilman Ave, Fresno, CA 93706",
      phone: "(559) 264-0298"
    },
    {
      city: "San Jose",
      address: "1309 Old Bayshore Hwy, San Jose, CA 95112",
      phone: "(408) 998-8211"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1752010284872-76526682bfee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxmb29kJTIwZGlzdHJpYnV0aW9uJTIwd2FyZWhvdXNlJTIwbG9naXN0aWNzfGVufDF8fHx8MTc3NjE0MjYxNHww&ixlib=rb-4.1.0&q=80&w=1080"
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
                  src="https://images.unsplash.com/photo-1681514583222-0579e6835666?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxmb29kJTIwZGlzdHJpYnV0aW9uJTIwd2FyZWhvdXNlJTIwbG9naXN0aWNzfGVufDF8fHx8MTc3NjE0MjYxNHww&ixlib=rb-4.1.0&q=80&w=1080"
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

      {/* Our Customers */}
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
              Our Customers
            </h2>
            <p className="text-lg text-foreground/70">
              Trusted by leading restaurants across California
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {customers.map((customer, index) => (
              <motion.div
                key={customer.name}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="aspect-square bg-secondary rounded-2xl flex items-center justify-center p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-3xl text-primary mb-2" style={{ fontWeight: 700 }}>
                    {customer.logo}
                  </div>
                  <div className="text-sm text-foreground/60">{customer.name}</div>
                </div>
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
