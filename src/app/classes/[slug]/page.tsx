import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, GraduationCap, CheckCircle2, BookOpen } from "lucide-react";
import { CLASS_LEVELS } from "@/data/classes";
import { KANPUR_AREAS } from "@/data/areas";
import { SITE_CONFIG } from "@/config/site";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const classLevel = CLASS_LEVELS.find((c) => c.slug === slug);
  if (!classLevel) return {};

  return {
    title: `${classLevel.title} | IQ Hometuitions`,
    description: classLevel.description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/classes/${classLevel.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return CLASS_LEVELS.map((classLevel) => ({
    slug: classLevel.slug,
  }));
}

export default async function ClassPage({ params }: Props) {
  const { slug } = await params;
  const classLevel = CLASS_LEVELS.find((c) => c.slug === slug);

  if (!classLevel) {
    notFound();
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <GraduationCap className="w-4 h-4" />
            <span>Dedicated Tutors for {classLevel.name}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Home Tuition for <br />
            <span className="text-primary italic">{classLevel.name} in Kanpur</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {classLevel.seoContent} Our verified home tutors are experienced with all major academic boards (CBSE, ICSE, and UP Board).
          </p>
        </div>

        {/* Subjects list */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Subjects Covered</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {classLevel.subjects.map((sub, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-white/5 flex items-center space-x-4 hover:border-primary/30 transition-all group">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-white font-semibold text-lg">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Card */}
        <div className="primary-gradient p-12 md:p-20 rounded-[3.5rem] text-center mb-24 relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-8">Get experienced {classLevel.name} tutors now</h2>
            <Link
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi, I need a home tutor for ${classLevel.name} in Kanpur. Can you help?`}
              className="inline-flex items-center space-x-3 bg-white text-primary px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Connect on WhatsApp</span>
            </Link>
            <p className="mt-8 text-white/80">Personalized one-to-one home coaching</p>
          </div>
        </div>

        {/* Tutors by Area */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-10 text-center">Available Across All Areas of Kanpur</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {KANPUR_AREAS.slice(0, 12).map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="p-4 rounded-xl border border-white/5 text-center text-muted hover:text-white hover:border-primary/50 transition-all hover:bg-white/5"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
