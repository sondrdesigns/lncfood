export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  items: string[];
};

export const categories: Category[] = [
  {
    slug: "fruits-vegetables",
    name: "Fruits & Vegetables",
    tagline: "Fresh produce, delivered daily",
    description:
      "Farm-fresh vegetables, fruits, and specialty Asian produce sourced from trusted growers and delivered on a consistent schedule.",
    image: "/images/cat-fruits-vegetables.webp",
    items: [
      "Specialty Asian Vegetables",
      "Fresh Fruits",
      "Green Vegetables (Broccoli, Cabbage, Lettuce, Green Onion)",
      "Root Vegetables (Carrot, Onion, Potato)",
      "Peppers (Bell Peppers, Chilis)",
      "Fungi (Mushroom, Woodear)",
    ],
  },
  {
    slug: "meat-seafood",
    name: "Meat & Seafood",
    tagline: "Premium proteins for every menu",
    description:
      "USDA-certified meats and a deep selection of fresh and frozen seafood, cut and packaged for commercial kitchens.",
    image: "/images/cat-meat-seafood.webp",
    items: [
      "Poultry (Fresh/Frozen)",
      "Beef",
      "Pork",
      "Lamb",
      "Shrimp",
      "Fish",
      "Squid",
      "Other Seafood",
      "Specialty Proteins",
    ],
  },
  {
    slug: "dry-grocery",
    name: "Dry Grocery",
    tagline: "Pantry staples & specialty ingredients",
    description:
      "Everything your line needs day in and day out — from bulk rice and oils to authentic Asian sauces and seasonings.",
    image: "/images/cat-dry-grocery.webp",
    items: [
      "Starches & Oils",
      "Sauces",
      "Seasonings",
      "Canned Goods",
      "Rices & Noodles/Pasta",
      "Nuts",
    ],
  },
  {
    slug: "disposables",
    name: "Disposables",
    tagline: "Front-of-house & packaging supplies",
    description:
      "Keep service moving with reliable stock of to-go containers, utensils, paper goods, and cleaning essentials.",
    image: "/images/cat-disposables.webp",
    items: [
      "Food Containers",
      "Cups & Lids",
      "Utensils & Paper Napkins/Towels",
      "Cleaning Supplies",
    ],
  },
  {
    slug: "beverages",
    name: "Beverages",
    tagline: "From water to boba, fully stocked",
    description:
      "A full beverage program for restaurants and boba shops — bottled water, sodas, syrups, boba powders and add-ons, and specialty drinks.",
    image: "/images/cat-beverages.webp",
    items: [
      "Water",
      "Soft Drink (Glass/Canned/Syrup)",
      "Snapple",
      "Boba (Powder, Add-Ons)",
      "Specialty Drinks",
    ],
  },
];

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
