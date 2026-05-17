"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const toppers = [
  { name: "Nishkarsh Kumar", course: "IIT KANPUR", achievement: "JAM 2025(AIR 2025) | JEST 2025(AIR 13)", image: "/students/nishkarsh-kumar.jpeg" },
  { name: "Ashutosh Dubey", course: "JEE 2026", achievement: "Maths - 99.99 Percentile", image: "/students/ashutosh-dubey.jpeg" },
  { name: "Shreya Goel", course: "Class 12th CBSE", achievement: "93% Aggregate", school: "Sir Padampat Singhania Education Centre", image: "/students/shreya-goel.jpeg" },
  { name: "Ashita Agarwal", course: "Class 12th ISC", achievement: "95% Aggregate", school: "Dr. Virendra Swarup Education Centre", image: "/students/ashita-agarwal.jpeg" },
  { name: "Lucky Mishra", course: "Class 10th CBSE", achievement: "90% Aggregate", school: "Gulmohar Public School", image: "/students/lucky-mishra.jpeg" },
  { name: "Vivan Agarwal", course: "Class 10th ICSE", achievement: "97% Aggregate", school: "Dr. Virendra Swarup Education Centre", image: "/students/vivan-agarwal.jpeg" },
];

export default function Toppers() {
  return (
    <section className="py-24 bg-surface/30 overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Hall of Fame</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Our <span className="text-primary italic">Toppers</span></h2>
          </div>
          <p className="text-muted max-w-md text-right hidden md:block">
            Success stories that inspire us every day. We take pride in our students' achievements.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex marquee-track gap-8 px-6">
          {/* First set */}
          {toppers.map((topper, i) => (
            <div 
              key={i}
              className={`flex-shrink-0 w-80 zed-card p-10 rounded-[3rem] group overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 neon-border overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center bg-surface relative">
                   {topper.image ? (
                     <Image src={topper.image} alt={topper.name} fill className="object-cover" />
                   ) : (
                     <>
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                       <span className="text-4xl font-black text-primary/30 z-0">{topper.name[0]}</span>
                     </>
                   )}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{topper.name}</h3>
              <p className="text-primary text-xs font-bold mb-4 uppercase tracking-[0.2em]">{topper.course}</p>
              {topper.school && (
                <p className="text-muted text-xs mb-6 line-clamp-2">{topper.school}</p>
              )}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 mt-auto">
                <span className="text-white font-black text-sm glow-text">{topper.achievement}</span>
              </div>
            </div>
          ))}
          {/* Duplicated set for seamless loop */}
          {toppers.map((topper, i) => (
            <div 
              key={`dup-${i}`}
              className={`flex-shrink-0 w-80 zed-card p-10 rounded-[3rem] group overflow-hidden flex flex-col`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 neon-border overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center bg-surface relative">
                   {topper.image ? (
                     <Image src={topper.image} alt={topper.name} fill className="object-cover" />
                   ) : (
                     <>
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                       <span className="text-4xl font-black text-primary/30 z-0">{topper.name[0]}</span>
                     </>
                   )}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{topper.name}</h3>
              <p className="text-primary text-xs font-bold mb-4 uppercase tracking-[0.2em]">{topper.course}</p>
              {topper.school && (
                <p className="text-muted text-xs mb-6 line-clamp-2">{topper.school}</p>
              )}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 mt-auto">
                <span className="text-white font-black text-sm glow-text">{topper.achievement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
