import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, CheckCircle2, MapPin, ArrowRight } from "lucide-react";
import { KANPUR_AREAS } from "@/data/areas";
import { SUBJECTS } from "@/data/subjects";
import { SITE_CONFIG } from "@/config/site";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = KANPUR_AREAS.find((a) => a.slug === slug);
  if (!area) return {};

  return {
    title: `Home Tutors in ${area.name}, Kanpur | IQ Hometutions`,
    description: `Find expert home tutors in ${area.name}, Kanpur for CBSE, UP Board, JEE, and NEET. Verified local teachers available for all subjects.`,
  };
}

export async function generateStaticParams() {
  return KANPUR_AREAS.map((area) => ({
    slug: area.slug,
  }));
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = KANPUR_AREAS.find((a) => a.slug === slug);

  if (!area) {
    notFound();
  }

  const relatedAreas = KANPUR_AREAS.filter((a) => 
    area.relatedAreas.includes(a.slug)
  );

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <MapPin className="w-4 h-4" />
            <span>Serving {area.name}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Home Tutors in <br />
            <span className="text-primary italic">{area.name}, Kanpur</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {area.seoContent || `Providing high-quality home tuition services in ${area.name}. Connect with verified local tutors for personalized learning success.`}
          </p>
        </div>

        {/* Action Card */}
        <div className="glass-card p-10 md:p-16 rounded-[3rem] border border-white/5 text-center mb-24 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-8">Need a tutor in {area.name}?</h2>
            <Link
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi, I need a home tutor in ${area.name}, Kanpur. Can you help?`}
              className="inline-flex items-center space-x-3 bg-primary text-white px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Find Tutor on WhatsApp</span>
            </Link>
            <p className="mt-6 text-muted text-sm italic">✓ Quick response ✓ Verified tutors ✓ No matching fee</p>
          </div>
        </div>

        {/* Subjects in this area */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-white mb-8">Subjects Available in {area.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SUBJECTS.map((subject) => (
              <div key={subject.slug} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all group">
                <CheckCircle2 className="w-5 h-5 text-primary/40 group-hover:text-primary mb-4 transition-colors" />
                <span className="text-white font-medium">{subject.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works for this area */}
        <div className="bg-white/[0.02] p-12 rounded-[3rem] border border-white/5 mb-24">
          <h3 className="text-2xl font-bold text-white mb-12 text-center">3 Steps to Get a Tutor in {area.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { t: "Message Us", d: "WhatsApp us your requirement for Class & Subject." },
              { t: "Get Match", d: `We pick the best tutor available in ${area.name}.` },
              { t: "Free Demo", d: "Schedule a trial class at your home at your convenience." }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl">
                  {i + 1}
                </div>
                <h4 className="text-white font-bold mb-2">{step.t}</h4>
                <p className="text-muted text-sm">{step.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Areas */}
        {relatedAreas.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Other Nearby Areas</h3>
            <div className="flex flex-wrap gap-4">
              {relatedAreas.map((ra) => (
                <Link
                  key={ra.slug}
                  href={`/areas/${ra.slug}`}
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-muted hover:text-white hover:border-primary/50 transition-all"
                >
                  {ra.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
