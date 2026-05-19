import { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SUBJECTS } from "@/data/subjects";

export const metadata: Metadata = {
  title: "Private Tutors in Kanpur | Verified Home Coaching | IQ Home Tuitions",
  description: "Hire qualified private tutors in Kanpur for CBSE, ICSE, UP Board, and competitive exams. Verified home visit teachers for one-on-one attention.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/private-tutors-in-kanpur`,
  },
};

export default function PrivateTutors() {
  return (
    <div className="pt-40 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Users className="w-4 h-4" />
            <span>Verified Local Teachers</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Private Tutors <br />
            <span className="text-primary italic">in Kanpur</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Hire experienced and background-verified private teachers for home coaching. Accelerate your academic growth with tutors specializing in your school curriculum.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              title: "Verified Backgrounds",
              desc: "We screen qualifications, identification documents, and historical teaching results of our private tutors before deploying them to your home."
            },
            {
              title: "Flexible Timings",
              desc: "Schedule private home classes around your child's routine. Keep learning stress-free and highly adaptable."
            },
            {
              title: "Personalized Strategies",
              desc: "Tutors target weak areas, solve textbook doubts, assist with homework, and conduct custom weekly progress tests."
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
            <h2 className="text-4xl font-bold text-white mb-8">Get matched with a private tutor today</h2>
            <Link
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi, I need a private tutor in Kanpur. Can you help?`}
              className="inline-flex items-center space-x-3 bg-white text-primary px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Hire Private Tutor</span>
            </Link>
            <p className="mt-8 text-white/80">Available across all boards & classes in Kanpur</p>
          </div>
        </div>

        {/* Subjects Available */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-10 text-center">Tutors by Subject</h3>
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
