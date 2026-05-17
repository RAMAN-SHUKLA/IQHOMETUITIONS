"use client";

import { motion } from "framer-motion";
import { BookOpen, Monitor, Trophy, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";

const services = [
  {
    title: "Home Visit Tuition",
    description: "Personalized one-on-one learning at the comfort of your home. Available across all major areas of Kanpur including Kidwai Nagar, Swaroop Nagar, and Kakadeo.",
    icon: Users,
    image: "/services/home.png",
    features: ["Personalized Attention", "Flexible Timings", "No Travel Hassle", "Safe Environment"],
    color: "from-orange-500/20 to-primary/20"
  },
  {
    title: "Online Live Classes",
    description: "Interactive online sessions with the same expert tutors. Perfect for students who prefer digital learning with advanced whiteboard tools.",
    icon: Monitor,
    image: "/services/online.png",
    features: ["Expert Tutors Nationwide", "Recorded Sessions", "Digital Resources", "Interactive Whiteboard"],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Competitive Exam Prep",
    description: "Specialized coaching for JEE, NEET, CUET, and other entrance exams. Focus on strategy, doubt-clearing, and speed building.",
    icon: Trophy,
    image: "/services/exam.png",
    features: ["Mock Tests", "Strategy Planning", "Personalized Doubt Solving", "Performance Tracking"],
    color: "from-purple-500/20 to-pink-500/20"
  }
];

export default function Services() {
  return (
    <div className="pt-40 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-widest text-sm"
          >
            What We Offer
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mt-6 mb-8 leading-tight"
          >
            Empowering Students with <br />
            <span className="text-primary italic glow-text">Tailored Solutions</span>
          </motion.h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            From primary school foundations to advanced competitive exam strategies, we provide a wide range of educational services in Kanpur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`zed-card rounded-[3rem] bg-gradient-to-br ${service.color} border border-white/5 relative group overflow-hidden flex flex-col`}
            >
              <div className="relative w-full h-56 overflow-hidden">
                <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-8 w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                  <service.icon className="text-primary w-7 h-7" />
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-8 flex-1">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-10">
                  {service.features.map((feat, j) => (
                    <li key={j} className="flex items-center space-x-2 text-xs font-semibold text-white/80">
                      <Star className="text-primary w-3 h-3 fill-current" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/find-tutor"
                  className="flex items-center space-x-2 text-primary font-bold text-sm hover:translate-x-2 transition-transform mt-auto"
                >
                  <span>Book a Session</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="zed-card p-12 md:p-20 rounded-[4rem] border border-white/5 relative overflow-hidden text-center">
           <div className="absolute inset-0 bg-primary/5 -z-10" />
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to transform your <br /><span className="text-primary italic">child's future?</span></h2>
           <p className="text-muted text-lg mb-12 max-w-2xl mx-auto">
             Join thousands of parents in Kanpur who trust IQ Hometuitions for their child's academic success.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="/find-tutor"
                className="bg-primary text-white px-10 py-5 rounded-2xl font-black shadow-2xl shadow-primary/30 hover:scale-105 transition-all"
              >
                Find a Tutor Now
              </Link>
              <Link 
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                className="bg-white/5 text-white px-10 py-5 rounded-2xl font-black border border-white/10 hover:bg-white/10 transition-all"
              >
                Chat on WhatsApp
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
