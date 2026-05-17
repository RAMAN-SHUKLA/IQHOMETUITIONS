"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    name: "Rinki Agarwal",
    handle: "@rinki_a",
    content: "The best home tuition service in Kanpur! My son's Maths grades improved from C to A in just 3 months.",
    verified: true,
  },
  {
    name: "Rajesh Mishra",
    handle: "@rajesh_m",
    content: "Found a wonderful English tutor for my daughter in Civil Lines. Very professional and punctual.",
    verified: true,
  },
  {
    name: "Mohd. Ali Azhar",
    handle: "@ali_azhar",
    content: "IQ Hometutions is a lifesaver. No more wandering around for verified tutors. Highly recommended!",
    verified: false,
  },
  {
    name: "Priyanka Agarwal",
    handle: "@priyanka_a",
    content: "The free matching service is actually great. They understood my requirements perfectly.",
    verified: true,
  },
  {
    name: "Aarti Agarwal",
    handle: "@aarti_a",
    content: "Excellent chemistry tutor. Concepts are much clearer now. Thank you IQ!",
    verified: true,
  },
  {
    name: "Shweta Kesharwani",
    handle: "@shweta_k",
    content: "The demo class was very helpful in deciding. Glad I chose them.",
    verified: false,
  },
  {
    name: "Shashi Goel",
    handle: "@shashi_g",
    content: "Very satisfied with the tutors provided by IQ Hometutions. They are professional and knowledgeable.",
    verified: true,
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" id="testimonials">
      <div className="container mx-auto max-w-6xl mb-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by <span className="text-primary italic">thousands of parents</span></h2>
          <p className="text-muted">Here's what our users have to say about IQ Hometutions.</p>
        </div>
      </div>

      <div className="relative">
        <div className="flex marquee-track gap-6 px-6" style={{ animationDuration: '40s' }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-80 zed-card p-10 rounded-[3rem] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center space-x-4 mb-8 relative">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl neon-border overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bw-image bg-surface">
                    {t.name[0]}
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-white font-bold text-sm tracking-tight">{t.name}</h4>
                    {t.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-current" />}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted/90 leading-relaxed mb-8 italic relative">
                "{t.content}"
              </p>
              <div className="flex items-center text-primary relative">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current glow-text" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

