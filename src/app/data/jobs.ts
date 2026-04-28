export type JobType = "WAREHOUSE" | "DELIVERY" | "SALES" | "ADMIN";

export type Job = {
  slug: string;
  title: string;
  type: JobType;
  location: string;
  schedule: string;
  description: string;
  requirements: string[];
  applyUrl: string;
};

const mailto = (title: string) =>
  `mailto:info@lncfood.com?subject=${encodeURIComponent(`Application: ${title}`)}`;

export const jobs: Job[] = [
  {
    slug: "warehouse-associate",
    title: "Warehouse Associate",
    type: "WAREHOUSE",
    location: "Los Angeles, CA",
    schedule: "Full-time",
    description:
      "We're seeking reliable warehouse associates to join our team. Responsibilities include receiving shipments, organizing inventory, and preparing orders for delivery.",
    requirements: [
      "Ability to lift up to 50 lbs",
      "Forklift certification preferred",
      "Strong attention to detail",
      "Team player with good communication skills",
    ],
    applyUrl: mailto("Warehouse Associate"),
  },
  {
    slug: "delivery-driver",
    title: "Delivery Driver",
    type: "DELIVERY",
    location: "San Diego, CA",
    schedule: "Full-time",
    description:
      "Looking for experienced drivers to deliver quality food products to our restaurant partners. Must have clean driving record and excellent customer service skills.",
    requirements: [
      "Valid commercial driver's license",
      "Clean driving record",
      "Customer service experience",
      "Early morning availability",
    ],
    applyUrl: mailto("Delivery Driver"),
  },
  {
    slug: "sales-representative",
    title: "Sales Representative",
    type: "SALES",
    location: "Fresno, CA",
    schedule: "Full-time",
    description:
      "Join our sales team to build relationships with restaurant owners and expand our partner network. Ideal candidate has food service industry experience.",
    requirements: [
      "2+ years sales experience",
      "Food service industry knowledge",
      "Excellent communication skills",
      "Self-motivated and goal-oriented",
    ],
    applyUrl: mailto("Sales Representative"),
  },
  {
    slug: "inventory-manager",
    title: "Inventory Manager",
    type: "WAREHOUSE",
    location: "Los Angeles, CA",
    schedule: "Full-time",
    description:
      "Oversee inventory operations across our distribution center. Manage stock levels, coordinate with suppliers, and ensure efficient warehouse operations.",
    requirements: [
      "3+ years inventory management experience",
      "Proficient with inventory management systems",
      "Strong organizational skills",
      "Leadership experience",
    ],
    applyUrl: mailto("Inventory Manager"),
  },
  {
    slug: "account-manager",
    title: "Account Manager",
    type: "SALES",
    location: "San Jose, CA",
    schedule: "Full-time",
    description:
      "Manage relationships with existing restaurant partners and identify opportunities for growth. Provide exceptional service and support to ensure customer satisfaction.",
    requirements: [
      "Account management experience",
      "Strong relationship-building skills",
      "Problem-solving abilities",
      "Bilingual (English/Mandarin/Cantonese) preferred",
    ],
    applyUrl: mailto("Account Manager"),
  },
  {
    slug: "administrative-assistant",
    title: "Administrative Assistant",
    type: "ADMIN",
    location: "Los Angeles, CA",
    schedule: "Full-time",
    description:
      "Support our operations team with administrative tasks, data entry, and customer communications. Detail-oriented individual with strong organizational skills.",
    requirements: [
      "Proficient in Microsoft Office",
      "Excellent written communication",
      "Strong organizational skills",
      "Previous administrative experience",
    ],
    applyUrl: mailto("Administrative Assistant"),
  },
  {
    slug: "night-shift-warehouse-lead",
    title: "Night Shift Warehouse Lead",
    type: "WAREHOUSE",
    location: "San Diego, CA",
    schedule: "Full-time (Night)",
    description:
      "Lead our night shift warehouse team. Coordinate operations, ensure quality control, and maintain safety standards throughout the shift.",
    requirements: [
      "2+ years warehouse leadership",
      "Forklift certification required",
      "Available for night shifts",
      "Strong team management skills",
    ],
    applyUrl: mailto("Night Shift Warehouse Lead"),
  },
  {
    slug: "route-delivery-driver",
    title: "Route Delivery Driver",
    type: "DELIVERY",
    location: "Fresno, CA",
    schedule: "Full-time",
    description:
      "Establish and maintain delivery routes to restaurant partners. Build relationships with customers while ensuring timely and accurate deliveries.",
    requirements: [
      "Valid commercial driver's license",
      "Route delivery experience",
      "Excellent time management",
      "Customer-focused attitude",
    ],
    applyUrl: mailto("Route Delivery Driver"),
  },
];

export function jobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
