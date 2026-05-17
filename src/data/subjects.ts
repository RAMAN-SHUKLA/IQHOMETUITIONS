export interface Subject {
  id: number;
  name: string;
  slug: string;
  category: "school" | "competitive" | "language";
  classes: string[];
  boards: string[];
  seoContent: string;
}

export const SUBJECTS: Subject[] = [
  {
    id: 1,
    name: "Mathematics",
    slug: "maths",
    category: "school",
    classes: ["Class 6-8", "Class 9-10", "Class 11-12", "JEE"],
    boards: ["CBSE", "UP Board", "ICSE"],
    seoContent: "Mathematics is a core subject where conceptual clarity is key. Our tutors simplify complex problems for Kanpur students.",
  },
  {
    id: 2,
    name: "Science",
    slug: "science",
    category: "school",
    classes: ["Class 6-8", "Class 9-10"],
    boards: ["CBSE", "UP Board", "ICSE"],
    seoContent: "From Physics to Biology, our science tutors provide hands-on learning experiences for middle and high school students.",
  },
  {
    id: 3,
    name: "Physics",
    slug: "physics",
    category: "school",
    classes: ["Class 11-12", "JEE", "NEET"],
    boards: ["CBSE", "UP Board", "ICSE"],
    seoContent: "Expert Physics home tuition for competitive exams and board preparations in Kanpur.",
  },
  {
    id: 4,
    name: "Chemistry",
    slug: "chemistry",
    category: "school",
    classes: ["Class 11-12", "JEE", "NEET"],
    boards: ["CBSE", "UP Board", "ICSE"],
    seoContent: "Organic, Inorganic, and Physical Chemistry made easy with our specialized home tutors.",
  },
  {
    id: 5,
    name: "Biology",
    slug: "biology",
    category: "school",
    classes: ["Class 11-12", "NEET"],
    boards: ["CBSE", "UP Board", "ICSE"],
    seoContent: "Prepare for NEET and Board exams with top Biology home tutors in Kanpur.",
  },
  {
    id: 6,
    name: "English",
    slug: "english",
    category: "school",
    classes: ["Class 1-12", "Spoken English"],
    boards: ["CBSE", "UP Board", "ICSE"],
    seoContent: "Improve communication skills and academic performance with our English language experts.",
  },
  {
    id: 7,
    name: "JEE Preparation",
    slug: "jee",
    category: "competitive",
    classes: ["Class 11-12", "Droppers"],
    boards: ["CBSE", "UP Board"],
    seoContent: "Targeting IITs? Get personalized coaching from Kanpur's best JEE home tutors.",
  },
  {
    id: 8,
    name: "NEET Preparation",
    slug: "neet",
    category: "competitive",
    classes: ["Class 11-12", "Droppers"],
    boards: ["CBSE", "UP Board"],
    seoContent: "Achieve your medical dream with dedicated NEET home tuition in Kanpur.",
  },
];
