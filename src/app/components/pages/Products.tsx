import { motion } from "motion/react";
import { useState } from "react";
import { Search } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const categories = [
    { id: "all", name: "All Products" },
    { id: "vegetables", name: "Fresh Vegetables" },
    { id: "meat", name: "Meat Products" },
    { id: "dry", name: "Dry Groceries" },
    { id: "disposables", name: "Disposables" },
    { id: "frozen", name: "Frozen Items" }
  ];

  const products = [
    {
      category: "vegetables",
      name: "Fresh Leafy Greens",
      description: "Premium quality lettuce, spinach, and mixed greens delivered fresh daily. Perfect for salads and garnishes.",
      image: "https://images.unsplash.com/photo-1545898073-346e42dc7357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: true
    },
    {
      category: "vegetables",
      name: "Fresh Tomatoes & Peppers",
      description: "Vine-ripened tomatoes and crisp bell peppers sourced from local farms for maximum freshness.",
      image: "https://images.unsplash.com/photo-1598357850706-0188bc0372b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      category: "vegetables",
      name: "Asian Vegetables Mix",
      description: "Authentic selection of bok choy, Chinese cabbage, and specialty Asian greens for traditional dishes.",
      image: "https://images.unsplash.com/photo-1564753907916-f3a2ad1b01fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      category: "vegetables",
      name: "Root Vegetables",
      description: "Fresh carrots, radishes, and specialty root vegetables perfect for soups and stir-fries.",
      image: "https://images.unsplash.com/photo-1554359360-2eb012d74470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      category: "meat",
      name: "Premium Chicken",
      description: "USDA certified chicken products including breast, thighs, and whole birds. Fresh or frozen options available.",
      image: "https://images.unsplash.com/photo-1717838207789-62684e75a770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNoZWYlMjBjb29raW5nfGVufDF8fHx8MTc3NjA1OTMwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: true
    },
    {
      category: "meat",
      name: "Premium Pork Cuts",
      description: "High-quality pork including belly, shoulder, and specialty cuts for Asian cuisine preparations.",
      image: "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNoZWYlMjBjb29raW5nfGVufDF8fHx8MTc3NjA1OTMwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      category: "meat",
      name: "Seafood Selection",
      description: "Fresh and frozen seafood including shrimp, fish fillets, and specialty items for sushi and Asian dishes.",
      image: "https://images.unsplash.com/photo-1594394490830-4cf54dd62910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNoZWYlMjBjb29raW5nfGVufDF8fHx8MTc3NjA1OTMwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      category: "dry",
      name: "Rice & Noodles",
      description: "Premium jasmine, sushi, and specialty rice. Wide selection of fresh and dried noodles for every dish.",
      image: "https://images.unsplash.com/photo-1675856900136-037204ff1a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      category: "dry",
      name: "Sauces & Condiments",
      description: "Comprehensive range of soy sauce, fish sauce, oyster sauce, and specialty Asian condiments from trusted brands.",
      image: "https://images.unsplash.com/photo-1650012048722-c81295ccbe79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: true
    },
    {
      category: "dry",
      name: "Oils & Cooking Essentials",
      description: "Vegetable oil, sesame oil, and specialty cooking oils in bulk sizes for commercial kitchens.",
      image: "https://images.unsplash.com/photo-1676454954620-e560cc3ccc7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      category: "disposables",
      name: "Food Containers & Packaging",
      description: "Eco-friendly takeout containers, food storage solutions, and packaging materials in various sizes.",
      image: "https://images.unsplash.com/photo-1733809708507-e9f9c2b7bc53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGlzdHJpYnV0aW9uJTIwd2FyZWhvdXNlJTIwbG9naXN0aWNzfGVufDF8fHx8MTc3NjE0MjYxNHww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      category: "disposables",
      name: "Utensils & Supplies",
      description: "Complete range of disposable utensils, napkins, and food service supplies for efficient operations.",
      image: "https://images.unsplash.com/photo-1512149519538-136d1b8c574a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNoZWYlMjBjb29raW5nfGVufDF8fHx8MTc3NjA1OTMwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      category: "frozen",
      name: "Frozen Dumplings & Dim Sum",
      description: "Authentic frozen dumplings, buns, and dim sum items ready to steam or fry for quick service.",
      image: "https://images.unsplash.com/photo-1746494557235-9e99f3193101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNoZWYlMjBjb29raW5nfGVufDF8fHx8MTc3NjA1OTMwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: true
    },
    {
      category: "frozen",
      name: "Frozen Vegetables",
      description: "Flash-frozen vegetables maintaining peak freshness and nutrition for consistent quality year-round.",
      image: "https://images.unsplash.com/photo-1621295563504-849958800bd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1753156381986-1fa79eb124bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8ZnJlc2glMjBwcm9kdWNlJTIwdmVnZXRhYmxlcyUyMG1hcmtldCUyMHdob2xlc2FsZXxlbnwxfHx8fDE3NzYxNDI2MTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Fresh produce market"
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
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Comprehensive selection of quality ingredients for your restaurant
          </motion.p>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 w-full lg:w-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-secondary text-foreground/70 hover:bg-accent"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.name}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {product.featured && (
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-primary text-white rounded-full text-sm" style={{ fontWeight: 600 }}>
                      Featured
                    </div>
                  )}
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-3" style={{ fontWeight: 600 }}>{product.name}</h3>
                  <p className="text-foreground/60 leading-relaxed mb-4">{product.description}</p>
                  <button
                    className="text-primary hover:underline flex items-center gap-2"
                    style={{ fontWeight: 600 }}
                  >
                    Contact for Pricing
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-foreground/60">No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import { ArrowRight } from "lucide-react";
