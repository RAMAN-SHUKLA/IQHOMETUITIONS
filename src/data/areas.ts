export interface Area {
  id: number;
  name: string;
  slug: string;
  isPopular: boolean;
  seoContent: string;
  relatedAreas: string[];
}

export const KANPUR_AREAS: Area[] = [
  {
    id: 1,
    name: "Civil Lines",
    slug: "civil-lines",
    isPopular: true,
    seoContent: "Civil Lines is Kanpur's most prominent residential and commercial area. Home tuition in Civil Lines is in high demand for CBSE and UP Board students seeking excellence.",
    relatedAreas: ["harsh-nagar", "swaroop-nagar", "mall-road"],
  },
  {
    id: 2,
    name: "Kakadeo",
    slug: "kakadeo",
    isPopular: true,
    seoContent: "Known as the coaching hub of Kanpur, Kakadeo is home to thousands of students preparing for JEE and NEET. Expert home tutors here specialize in competitive exam prep.",
    relatedAreas: ["geeta-nagar", "kalyanpur", "sharda-nagar"],
  },
  {
    id: 3,
    name: "Swaroop Nagar",
    slug: "swaroop-nagar",
    isPopular: true,
    seoContent: "Swaroop Nagar is an upscale neighborhood where parents prioritize quality education. We provide top-rated tutors for all subjects from Class 1 to 12.",
    relatedAreas: ["civil-lines", "arya-nagar", "tilak-nagar"],
  },
  {
    id: 4,
    name: "Kidwai Nagar",
    slug: "kidwai-nagar",
    isPopular: true,
    seoContent: "Kidwai Nagar has a large concentration of school-going children. Our home tutors in Kidwai Nagar cover CBSE, ICSE, and UP Board curricula extensively.",
    relatedAreas: ["yashoda-nagar", "govind-nagar", "barra"],
  },
  {
    id: 5,
    name: "Kalyanpur",
    slug: "kalyanpur",
    isPopular: true,
    seoContent: "Near IIT Kanpur, Kalyanpur is a scholarly area. We offer home tuition for higher secondary and entrance exam preparation in this locality.",
    relatedAreas: ["kakadeo", "panki", "indira-nagar"],
  },
  // Adding more areas as per PRD's list of 35
  { id: 6, name: "Govind Nagar", slug: "govind-nagar", isPopular: false, seoContent: "", relatedAreas: ["kidwai-nagar", "barra"] },
  { id: 7, name: "Arya Nagar", slug: "arya-nagar", isPopular: false, seoContent: "", relatedAreas: ["swaroop-nagar", "harsh-nagar"] },
  { id: 8, name: "Indira Nagar", slug: "indira-nagar", isPopular: false, seoContent: "", relatedAreas: ["kalyanpur", "kakadeo"] },
  { id: 9, name: "Harsh Nagar", slug: "harsh-nagar", isPopular: false, seoContent: "", relatedAreas: ["civil-lines", "swaroop-nagar"] },
  { id: 10, name: "Shyam Nagar", slug: "shyam-nagar", isPopular: false, seoContent: "", relatedAreas: ["ramadevi", "lal-bangla"] },
  { id: 11, name: "Panki", slug: "panki", isPopular: false, seoContent: "", relatedAreas: ["kalyanpur", "armapur"] },
  { id: 12, name: "Rawatpur", slug: "rawatpur", isPopular: false, seoContent: "", relatedAreas: ["kakadeo", "geeta-nagar"] },
  { id: 13, name: "Barra", slug: "barra", isPopular: false, seoContent: "", relatedAreas: ["govind-nagar", "kidwai-nagar"] },
  { id: 14, name: "Vikas Nagar", slug: "vikas-nagar", isPopular: false, seoContent: "", relatedAreas: ["kakadeo", "indira-nagar"] },
  { id: 15, name: "Lajpat Nagar", slug: "lajpat-nagar", isPopular: false, seoContent: "", relatedAreas: ["gumti", "ashok-nagar"] },
];
