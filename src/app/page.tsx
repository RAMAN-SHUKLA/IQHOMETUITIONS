"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  Search, 
  MapPin, 
  Star,
  Users,
  GraduationCap,
  BookOpen,
  Phone
} from "lucide-react";
import { KANPUR_AREAS } from "@/data/areas";
import { SUBJECTS } from "@/data/subjects";
import { SITE_CONFIG } from "@/config/site";
import Marquee from "@/components/Marquee";
import Testimonials from "@/components/Testimonials";
import Toppers from "@/components/Toppers";


export default function Home() {
  const popularAreas = KANPUR_AREAS.filter(area => area.isPopular);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "IQ Home Tuitions",
    "image": "https://iqhometuitions.in/logo-transparent.png",
    "url": "https://iqhometuitions.in",
    "telephone": "+916387687518",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kidwai Nagar",
      "addressLocality": "Kanpur",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "208011",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.4473887,
      "longitude": 80.2541315
    },
    "areaServed": "Kanpur",
    "priceRange": "$$"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you provide tutors in all areas of Kanpur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, tutors are available across major areas of Kanpur. We have a robust network of 500+ verified home tutors ready to serve you."
        }
      },
      {
        "@type": "Question",
        "name": "Which classes are covered?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tuition is available for all classes from primary (Class 1-5), middle school (Class 6-8), secondary classes (Class 9-10), to senior secondary (Class 11-12)."
        }
      },
      {
        "@type": "Question",
        "name": "Which subjects are covered?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major subjects including Mathematics, Science (Physics, Chemistry, Biology), English, Accounts, Economics, Business Studies, and Computer Science (Python/Java)."
        }
      },
      {
        "@type": "Question",
        "name": "Are online classes available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, both online and offline tuition services are available. You can choose the format that best fits your convenience and your child's preferences."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide tutors for competitive exams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide specialized home tutors for competitive exams such as JEE, NEET, CUET, NDA, and SSC coaching."
        }
      }
    ]
  };

  return (
    <div className="overflow-hidden">
      {/* Schema Markups */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 md:pt-56 md:pb-48 px-6 flex items-center justify-center min-h-[90vh]">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/hero-bg.png')" }}
          />
          <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay */}
        </div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center space-x-2 border border-[#cba365]/50 px-4 py-2 rounded-full text-[#cba365] text-xs font-bold uppercase tracking-wider mb-6">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Home Tutors in Kanpur</span>
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-[1.1] text-white tracking-wide">
              Best Home Tuition <br />
              <span className="text-[#cba365] italic font-medium">Services in Kanpur</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Unlock personalized learning with Kanpur's most trusted home tuition platform. 
              We connect you with expert tutors tailored to your child's unique needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/find-tutor"
                className="w-full sm:w-auto bg-[#cba365] text-white px-10 py-4 rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-[#b58e50] transition-all"
              >
                <span>Find a Tutor</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/register-tutor"
                className="w-full sm:w-auto bg-transparent border border-white/40 text-white px-10 py-4 rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-white/10 transition-all"
              >
                <span>Register as Teacher</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Marquee />

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Verified Tutors", value: "500+", icon: Users },
              { label: "Successful Matches", value: "2000+", icon: CheckCircle2 },
              { label: "Subjects Covered", value: "20+", icon: BookOpen },
              { label: "Kanpur Areas", value: "35+", icon: MapPin },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="mb-2 flex justify-center text-primary/60 group-hover:text-primary transition-colors">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-muted uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Subjects */}
      <section className="py-24 px-6" id="subjects">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Expert Home Tutors for <br /><span className="text-primary italic">All Classes</span></h2>
              <p className="text-muted max-w-md">Whether it's school boards or competitive exams, we have the right expert for you.</p>
            </div>
            <Link href="/find-tutor" className="text-primary font-semibold flex items-center space-x-2 group">
              <span>View all subjects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUBJECTS.slice(0, 8).map((subject, i) => (
              <motion.div
                key={subject.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={`/tutors/${subject.slug}`}
                  className="group block p-8 rounded-2xl glass-card hover:bg-white/5 border border-white/5 hover:border-primary/30 transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{subject.name}</h3>
                  <p className="text-sm text-muted mb-6 line-clamp-2">{subject.seoContent}</p>
                  <div className="text-xs font-bold text-primary uppercase tracking-widest flex items-center space-x-2">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Personalized One-to-One Tuition</h2>
            <p className="text-muted">Simple 3-step process to find your perfect tutor.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/4 left-1/3 right-1/3 h-px bg-white/10" />
            
            {[
              { title: "WhatsApp Us", desc: "Send us your requirements like subject, class, and area.", icon: MessageCircle },
              { title: "We Match", desc: "We find the best-verified tutor from our local network.", icon: Search },
              { title: "Start Learning", desc: "Get introduced and schedule your first home demo.", icon: GraduationCap },
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-20 h-20 primary-gradient rounded-3xl mx-auto mb-8 flex items-center justify-center text-white shadow-xl shadow-primary/20 relative z-10">
                  <step.icon className="w-8 h-8" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-white text-black font-bold rounded-full flex items-center justify-center text-sm">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose IQ Home Tuitions</h2>
            <p className="text-muted max-w-2xl mx-auto">Kanpur's preferred choice for personalized, high-impact education at home.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tutors for CBSE, ICSE & State Boards",
                desc: "We offer specialized home coaching for CBSE, ICSE, ISC, and UP Board students. Our tutors align with the school syllabus, prepare students for regular tests, and ensure maximum clarity for board exams.",
                icon: BookOpen
              },
              {
                title: "JEE, NEET & Competitive Exam Coaching",
                desc: "Get competitive exam coaching at home. Our experienced tutors guide students through JEE, NEET, CUET, NDA, and Olympiads with custom preparation strategies, mock tests, and time management skills.",
                icon: GraduationCap
              },
              {
                title: "Online and Offline Tuition Available",
                desc: "Choose between offline home visits and interactive online live classes. Both options provide personalized, one-to-one learning tailored to your child's schedule, pace, and individual academic goals.",
                icon: CheckCircle2
              }
            ].map((item, i) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] border border-white/5 flex flex-col hover:border-primary/30 transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-24 px-6 bg-white/[0.02]" id="areas">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Providing Tutors Across Kanpur</h2>
            <p className="text-muted">Find expert home tuition in your neighborhood.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {KANPUR_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="p-4 rounded-xl border border-white/5 hover:border-primary/50 text-center transition-all hover:bg-white/5"
              >
                <span className="text-sm font-medium text-muted hover:text-white transition-colors">{area.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <Toppers />

      {/* Google Maps Section */}
      <section className="py-24 px-6 bg-surface/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-6">
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Our Location</span>
              <h2 className="text-4xl font-bold text-white">Find Us in <span className="text-primary italic">Kanpur</span></h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary w-5 h-5" />
                  </div>
                  <p className="text-muted text-sm leading-relaxed">
                    Main Office: Kidwai Nagar, Kanpur, Uttar Pradesh 208011
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    {SITE_CONFIG.contactNumbers.map(num => (
                      <p key={num} className="text-muted text-sm">{num}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 h-[450px] rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114312.44973347915!2d80.25413158462804!3d26.447388701046274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c4770326274f3%3A0xa11ff7602c304246!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1715880000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10 rounded-[3rem]" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white/[0.02]" id="faqs">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted">Find answers to common questions about our home tuition services in Kanpur.</p>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "Do you provide tutors in all areas of Kanpur?",
                a: "Yes, tutors are available across major areas of Kanpur. We have a robust network of 500+ verified home tutors ready to serve you."
              },
              {
                q: "Which classes are covered?",
                a: "Tuition is available for all classes from primary (Class 1-5), middle school (Class 6-8), secondary classes (Class 9-10), to senior secondary (Class 11-12)."
              },
              {
                q: "Which subjects are covered?",
                a: "We cover all major subjects including Mathematics, Science (Physics, Chemistry, Biology), English, Accounts, Economics, Business Studies, and Computer Science (Python/Java)."
              },
              {
                q: "Are online classes available?",
                a: "Yes, both online and offline tuition services are available. You can choose the format that best fits your convenience and your child's preferences."
              },
              {
                q: "Do you provide tutors for competitive exams?",
                a: "Yes, we provide specialized home tutors for competitive exams such as JEE, NEET, CUET, NDA, and SSC coaching."
              }
            ].map((faq, idx) => (
              <div key={idx} className="glass-card p-8 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                  <span className="text-primary">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-muted text-sm leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="primary-gradient p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to find the <br />perfect tutor?</h2>
              <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
                Don't let your child fall behind. Start personalized home tuition today and see the difference.
              </p>
              <Link
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                className="inline-flex items-center space-x-3 bg-white text-primary px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl"
              >
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp Us Now</span>
              </Link>
              <p className="mt-6 text-white/60 text-sm font-medium">Free introduction & trial class available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
