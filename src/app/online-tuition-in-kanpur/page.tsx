import { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Monitor, CheckCircle2, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SUBJECTS } from "@/data/subjects";

export const metadata: Metadata = {
  title: "Online Tuition in Kanpur | Live Interactive Classes | IQ Home Tutors",
  description: "Get the best online tuition in Kanpur. Learn from top tutors with interactive live sessions, digital whiteboards, and personalized guidance for all classes.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/online-tuition-in-kanpur`,
  },
};

export default function OnlineTuition() {
  return (
    <div className="pt-40 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Monitor className="w-4 h-4" />
            <span>Interactive Digital Learning</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Online Tuition <br />
            <span className="text-primary italic">in Kanpur</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Bridge the distance with Kanpur's best online tutors. Live one-to-one interactive classes with digital whiteboard tools, screen sharing, and recorded sessions.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              title: "Learn Anywhere, Anytime",
              desc: "No travel time or geographic limitations. Access the best verified tutors in Kanpur from the comfort and safety of your home."
            },
            {
              title: "Recorded Live Sessions",
              desc: "Every online class is recorded. Students can rewatch sessions anytime to revise complex math formulas, science concepts, or language rules."
            },
            {
              title: "Interactive Whiteboard",
              desc: "Tutors use virtual whiteboards, real-time quizzes, and screen-sharing to make learning highly collaborative and engaging."
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
            <h2 className="text-4xl font-bold text-white mb-8">Start your online tuition trial today</h2>
            <Link
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi, I want to inquire about Online Tuition in Kanpur. Can you help?`}
              className="inline-flex items-center space-x-3 bg-white text-primary px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Book Online Session</span>
            </Link>
            <p className="mt-8 text-white/80">Interactive live learning for all boards</p>
          </div>
        </div>

        {/* Subjects Available */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-10 text-center">Popular Subjects for Online Tuition</h3>
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
