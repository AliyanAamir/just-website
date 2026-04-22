export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  outcome: string;
  gradient: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "helix",
    client: "Helix",
    category: "Brand Identity",
    outcome: "Redesigned visual system; 40% increase in brand recall.",
    gradient: "linear-gradient(135deg, #7C6EFF 0%, #14B8A6 100%)",
  },
  {
    id: "orbit",
    client: "Orbit",
    category: "Web Platform",
    outcome: "0 → 100k users in 6 months post-launch.",
    gradient: "linear-gradient(135deg, #0F172A 0%, #7C6EFF 60%, #F97373 100%)",
  },
  {
    id: "pulse",
    client: "Pulse",
    category: "Motion System",
    outcome: "Component library with 200+ animated primitives.",
    gradient: "linear-gradient(135deg, #14B8A6 0%, #0F172A 100%)",
  },
];
