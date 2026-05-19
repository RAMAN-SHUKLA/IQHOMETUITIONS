import { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SUBJECTS } from "@/data/subjects";

export const metadata: Metadata = {
  title: "One-to-One Tuition in Kanpur | Personalized Home Classes",
  description: "Improve scores with personalized one-to-one tuition in Kanpur. Experienced tutors for customized learning, flexible timings, and individual attention.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/one-to-one-tuition-in-kanpur`,
  },
};

export default function OneToOneTuition() {
  return (
    <div className="pt-40 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <CheckCircle2 className="w-4 h-4" />
            <span>Dedicated One-on-One Focus</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            One-to-One Tuition <br />
            <span className="text-primary italic">in Kanpur</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Eliminate classroom distractions and learn at your own pace. Our one-to-one home coaching in Kanpur matches your child with a dedicated private tutor who adjusts lessons specifically to their learning speed.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              title: "100% Focused Attention",
              desc: "Unlike crowded school classrooms or coaching centers, our tutors focus entirely on a single student, ensuring every doubt is solved instantly."
            },
            {
              title: "Tailored Study Plans",
              desc: "Lessons are designed around your child's strength and weaknesses. Progress at a pace that ensures deep understanding before moving forward."
            },
            {
              title: "Increased Confidence",
              desc: "Students who are shy to ask questions in class feel safe, encouraged, and confident asking questions in a one-on-one setup."
            }
          ].map((item, i) => (
            <div key={i} className="glass-card p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/30 transition-all">
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Card */}
        <div className="primary-gradient p-12 md:p-20 rounded-[3.5rem] text-center mb-24 relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-8">Ready for personalized one-to-one attention?</h2>
            <Link
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi, I need one-to-one tuition in Kanpur. Can you help?`}
              className="inline-flex items-center space-x-3 bg-white text-primary px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Request 1-on-1 Class</span>
            </Link>
            <p className="mt-8 text-white/80">Schedule your free home demo class today</p>
          </div>
        </div>

        {/* Subjects Available */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-10 text-center">Available Subjects</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {SUBJECTS.map((subject) => (
              <Link
                key={subject.slug}
                href={`/tutors/${subject.slug}`}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:border-primary/50 transition-all hover:bg-white/10"
              >
                {subject.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
