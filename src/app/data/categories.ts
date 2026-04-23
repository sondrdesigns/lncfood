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
    image:
      "https://images.unsplash.com/photo-1598357850706-0188bc0372b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
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
    image:
      "https://images.unsplash.com/photo-1594394490830-4cf54dd62910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNoZWYlMjBjb29raW5nfGVufDF8fHx8MTc3NjA1OTMwOHww&ixlib=rb-4.1.0&q=80&w=1080",
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
    image:
      "https://images.unsplash.com/photo-1650012048722-c81295ccbe79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxmcmVzaCUyMHByb2R1Y2UlMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwd2hvbGVzYWxlfGVufDF8fHx8MTc3NjE0MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
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
    image:
      "https://images.unsplash.com/photo-1733809708507-e9f9c2b7bc53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGlzdHJpYnV0aW9uJTIwd2FyZWhvdXNlJTIwbG9naXN0aWNzfGVufDF8fHx8MTc3NjE0MjYxNHww&ixlib=rb-4.1.0&q=80&w=1080",
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
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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
