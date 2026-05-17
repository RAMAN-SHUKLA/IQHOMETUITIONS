import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { SUBJECTS } from "@/data/subjects";
import { KANPUR_AREAS } from "@/data/areas";
import { SITE_CONFIG } from "@/config/site";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const subject = SUBJECTS.find((s) => s.slug === slug);
  if (!subject) return {};

  return {
    title: `Home ${subject.name} Tutors in Kanpur | Expert Teachers | IQ Hometuitions`,
    description: `Expert home ${subject.name} tutors in Kanpur for CBSE, UP Board, and ICSE. Personalized 1-on-1 coaching for ${subject.classes.join(", ")}.`,
  };
}

export async function generateStaticParams() {
  return SUBJECTS.map((subject) => ({
    slug: subject.slug,
  }));
}

export default async function SubjectPage({ params }: Props) {
  const { slug } = await params;
  const subject = SUBJECTS.find((s) => s.slug === slug);

  if (!subject) {
    notFound();
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Expert {subject.name} Tuition</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Home <span className="text-primary italic">{subject.name}</span> <br />
            Tutors in Kanpur
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {subject.seoContent} We provide highly qualified teachers specializing in {subject.name} across all major boards including CBSE, ICSE, and UP Board.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-primary" /> Classes Covered
            </h3>
            <div className="flex flex-wrap gap-3">
              {subject.classes.map(cls => (
                <span key={cls} className="px-4 py-2 bg-white/5 rounded-lg text-sm text-white border border-white/5">{cls}</span>
              ))}
            </div>
          </div>
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-primary" /> Boards Supported
            </h3>
            <div className="flex flex-wrap gap-3">
              {subject.boards.map(board => (
                <span key={board} className="px-4 py-2 bg-white/5 rounded-lg text-sm text-white border border-white/5">{board}</span>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="primary-gradient p-12 md:p-20 rounded-[3.5rem] text-center mb-24 relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-8">Get the best {subject.name} tutor for your child</h2>
            <Link
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi, I need a home tutor for ${subject.name} in Kanpur. Can you help?`}
              className="inline-flex items-center space-x-3 bg-white text-primary px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Connect on WhatsApp</span>
            </Link>
            <p className="mt-8 text-white/80">Available in all major areas of Kanpur</p>
          </div>
        </div>

        {/* Coverage Areas */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-10 text-center">Tutors Available in These Areas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {KANPUR_AREAS.filter(a => a.isPopular).map((area) => (
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
