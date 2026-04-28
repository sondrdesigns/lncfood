export type UseCaseIcon = "CupSoda" | "Soup" | "ChefHat" | "Fish";

export type UseCase = {
  slug: string;
  name: string;
  icon: UseCaseIcon;
  tagline: string;
  items: string[];
  linkedCategorySlug?: string;
};

export const useCases: UseCase[] = [
  {
    slug: "boba-shop",
    name: "Boba Shop",
    icon: "CupSoda",
    tagline: "Drinks, toppings, packaging — every shift covered.",
    items: [
      "Boba & tapioca pearls",
      "Powders & flavor syrups",
      "Cups, lids & sealing film",
      "Milk, creamers & teas",
      "Add-ons (jellies, popping boba)",
    ],
    linkedCategorySlug: "beverages",
  },
  {
    slug: "pho-restaurant",
    name: "Pho Restaurant",
    icon: "Soup",
    tagline: "Stock the broth, the bowl, and everything between.",
    items: [
      "Beef bones & cuts",
      "Rice noodles (banh pho)",
      "Fish sauce & hoisin",
      "Fresh herbs & sprouts",
      "To-go bowls & utensils",
    ],
    linkedCategorySlug: "meat-seafood",
  },
  {
    slug: "chinese-kitchen",
    name: "Chinese Kitchen",
    icon: "ChefHat",
    tagline: "Bulk staples and authentic ingredients on schedule.",
    items: [
      "Bulk rice & noodles",
      "Soy, oyster & XO sauces",
      "Wok-grade oils",
      "Specialty Asian greens",
      "Seasonings & marinades",
    ],
    linkedCategorySlug: "dry-grocery",
  },
  {
    slug: "sushi-bar",
    name: "Sushi Bar",
    icon: "Fish",
    tagline: "Sashimi-grade seafood and the rest of the line.",
    items: [
      "Sushi-grade fish",
      "Nori & wrappers",
      "Sushi rice & vinegar",
      "Wasabi & soy",
      "Take-out trays & sauce cups",
    ],
    linkedCategorySlug: "meat-seafood",
  },
];
