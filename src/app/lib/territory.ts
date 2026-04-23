import { branchBySlug, type Branch, type BranchSlug } from "@/app/data/locations";

// CA zip territories by 3-digit prefix. Adjust ranges here to re-assign zips.
const TERRITORY_RANGES: { min: number; max: number; slug: BranchSlug }[] = [
  // Greater LA (LA County + San Gabriel Valley)
  { min: 900, max: 918, slug: "los-angeles" },
  // San Diego County + Imperial Valley
  { min: 919, max: 922, slug: "san-diego" },
  // Orange County + Inland Empire (serviced from City of Industry)
  { min: 923, max: 929, slug: "los-angeles" },
  // Central Valley + Central Coast + Kern (Bakersfield)
  { min: 930, max: 939, slug: "fresno" },
  // Bay Area + Sacramento + NorCal
  { min: 940, max: 961, slug: "san-jose" },
];

/** Resolve the assigned L&C branch for a zip code. Returns null if outside service area. */
export function getBranchByZip(zip: string): Branch | null {
  const normalized = zip.trim().slice(0, 5);
  if (!/^\d{5}$/.test(normalized)) return null;

  const prefix = parseInt(normalized.slice(0, 3), 10);
  const match = TERRITORY_RANGES.find((r) => prefix >= r.min && prefix <= r.max);
  return match ? branchBySlug(match.slug) : null;
}
