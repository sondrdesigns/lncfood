export type BranchSlug = "san-diego" | "los-angeles" | "fresno" | "san-jose";

export type Branch = {
  slug: BranchSlug;
  city: string;
  address: string;
  phone: string;
  image?: string;
  lat?: number;
  lng?: number;
};

export const branches: Branch[] = [
  {
    slug: "san-diego",
    city: "San Diego",
    address: "8724 Approach Rd, San Diego, CA 92154",
    phone: "(619) 710-2030",
    image: "/images/locations/enhanced/san-diego-hero.jpeg",
    lat: 32.5726,
    lng: -116.9708,
  },
  {
    slug: "los-angeles",
    city: "Los Angeles",
    address: "15320 Salt Lake Ave, City of Industry, CA 91745",
    phone: "(626) 465-7855",
    lat: 34.0179,
    lng: -117.9335,
  },
  {
    slug: "fresno",
    city: "Fresno",
    address: "471 S Teilman Ave, Fresno, CA 93706",
    phone: "(559) 264-0298",
    lat: 36.735,
    lng: -119.7964,
  },
  {
    slug: "san-jose",
    city: "San Jose",
    address: "1309 Old Bayshore Hwy, San Jose, CA 95112",
    phone: "(408) 998-8211",
    image: "/images/locations/enhanced/san-jose-hero.jpeg",
    lat: 37.357,
    lng: -121.8983,
  },
];

export const directionsUrl = (address: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

export const branchBySlug = (slug: BranchSlug): Branch =>
  branches.find((b) => b.slug === slug)!;
