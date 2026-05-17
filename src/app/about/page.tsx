"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Target, Users, Award, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function About() {
  const stats = [
    { label: "Verified Tutors", value: "500+", icon: Users },
    { label: "Success Stories", value: "2000+", icon: Award },
    { label: "Areas Covered", value: "15+", icon: Target },
    { label: "Trust Score", value: "100%", icon: ShieldCheck },
  ];

  return (
    <div className="pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-widest text-sm"
          >
            Our Mission & Vision
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mt-6 mb-8 leading-tight"
          >
            Kanpur's Most Trusted <br />
            <span className="text-primary italic glow-text">Home Tuition Network</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg leading-relaxed"
          >
            IQ Hometutions was founded with a single mission: to provide every student in Kanpur with 
            personalized, high-quality education right at their doorstep. We believe that every 
            child has a unique learning style and deserves a mentor who understands their pace.
          </motion.p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="zed-card p-8 rounded-[2.5rem] text-center group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                <stat.icon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-3xl font-black text-white mb-1 tracking-tight">{stat.value}</h3>
              <p className="text-muted text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">Why We Started <br /><span className="text-primary">IQ Hometutions?</span></h2>
            <div className="space-y-6 text-muted text-lg leading-relaxed">
              <p>
                As educators and residents of Kanpur, we noticed a significant gap between traditional classroom 
                teaching and the actual learning needs of students. Large coaching centers in areas like Kakadeo 
                often focus on the average student, leaving both quick learners and those needing extra help 
                behind.
              </p>
              <p>
                We decided to bridge this gap by creating a network of verified, passionate subject experts 
                who can provide one-on-one attention. Whether it's complex Physics problems or simple Hindi 
                grammar, our tutors are trained to simplify and inspire.
              </p>
            </div>
            <ul className="space-y-4">
              {["Rigorous Tutor Verification", "Personalized Subject Matching", "Safe Learning Environment", "Regular Progress Tracking"].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-white font-medium">
                  <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl relative z-10 group">
               {/* Add your photo named 'nelson-mandela.jpg' to the 'public' folder */}
               <Image 
                  src="/nelson-mandela.jpg" 
                  alt="Nelson Mandela" 
                  fill 
                  unoptimized={true}
                  className="object-cover grayscale opacity-50 group-hover:scale-105 transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
               <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <p className="text-2xl md:text-3xl font-serif text-white italic mb-8 leading-relaxed shadow-sm">
                    "Education is the most powerful weapon which you can use to change the world."
                  </p>
                  <p className="text-[#cba365] font-bold tracking-widest uppercase text-sm">
                    - Nelson Mandela
                  </p>
               </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
