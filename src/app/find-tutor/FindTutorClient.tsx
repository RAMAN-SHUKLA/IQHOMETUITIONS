"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Search, 
  Users, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { KANPUR_AREAS } from "@/data/areas";
import { SUBJECTS } from "@/data/subjects";
import Image from "next/image";

export default function FindTutorClient() {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect <br />
              <span className="text-primary italic">Home Tutor</span>
            </h1>
            <p className="text-muted text-xl max-w-2xl mx-auto">
              Our free matching service connects you with the best-verified tutors in Kanpur. 
              Simple, fast, and reliable.
            </p>
          </motion.div>
        </div>

        {/* Major CTA Card */}
        <div className="primary-gradient p-12 rounded-[3rem] text-center mb-24 relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-8">Ready to start? WhatsApp us your requirements</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi, I'm looking for a home tutor for Class [X], Subject [Y] in [Area], Kanpur.`}
                className="w-full md:w-auto bg-white text-primary px-10 py-6 rounded-2xl font-bold text-2xl flex items-center justify-center space-x-3 hover:scale-105 transition-all shadow-xl"
              >
                <MessageCircle className="w-8 h-8" />
                <span>Chat on WhatsApp</span>
              </Link>
            </div>
            <p className="mt-8 text-white/80 font-medium">Average matching time: Under 2 hours</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { title: "Verified Tutors", desc: "Every tutor undergoes a strict verification process.", icon: CheckCircle2, img: "/features/verified.png" },
            { title: "Free Matching", desc: "No charges for parents to find and connect with tutors.", icon: Users, img: "/features/free-matching.png" },
            { title: "Local Presence", desc: "Tutors available in all major areas of Kanpur.", icon: Search, img: "/features/local-presence.png" },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-3xl border border-white/5 overflow-hidden flex flex-col group bg-black/20">
              <div className="relative w-full h-48 overflow-hidden bg-white/5">
                <Image src={item.img} alt={item.title} fill unoptimized={true} className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
                <div className="absolute bottom-4 left-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 z-10">
                  <item.icon className="text-primary w-6 h-6" />
                </div>
              </div>
              <div className="p-8 flex-1 relative z-10">
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Subject Quick Links */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-white mb-8">Popular Subjects</h3>
          <div className="flex flex-wrap gap-3">
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

        {/* Area Quick Links */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-white mb-8">Tutors by Area</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {KANPUR_AREAS.map((area) => (
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

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {[
              { q: "Is the matching service really free?", a: "Yes, we do not charge parents any commission or fee for matching them with a tutor." },
              { q: "Can I get a demo class?", a: "Most of our tutors provide a first demo class. You can discuss this directly with the tutor we recommend." },
              { q: "How do you verify tutors?", a: "We check their educational qualifications, identity proof, and teaching experience before adding them to our network." },
              { q: "What if I don't like the recommended tutor?", a: "No problem! Just let us know and we will find another match for you." },
            ].map((faq, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl border border-white/5">
                <h4 className="text-white font-bold mb-2">Q: {faq.q}</h4>
                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
