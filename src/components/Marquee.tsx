"use client";

const techStack = [
  "CBSE", "UP Board", "ICSE", "CISCE", "ISC", "JEE", "NEET", "NDA",
  "Class 1-12", "Spoken English", "Maths", "Science",
  "Physics", "Chemistry", "Biology", "Accountancy",
  "Economics", "Computer Science"
];

export default function Marquee() {
  return (
    <section className="border-y border-white/5 bg-white/[0.02] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="text-center text-[10px] uppercase tracking-[0.2em] text-muted mb-4 font-bold">
          Trusted by students from top schools in Kanpur
        </div>
        <div className="relative">
          <div className="marquee-track gap-12 whitespace-nowrap items-center">
            {/* First set */}
            {techStack.map((item, i) => (
              <span key={i} className="flex items-center gap-12 text-muted/60 font-semibold text-lg">
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              </span>
            ))}
            {/* Duplicated set for seamless loop */}
            {techStack.map((item, i) => (
              <span key={`dup-${i}`} className="flex items-center gap-12 text-muted/60 font-semibold text-lg">
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
