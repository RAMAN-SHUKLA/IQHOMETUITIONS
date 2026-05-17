"use client";

import Image from "next/image";
import {
  MessageCircle,
  Quote,
  Star,
  ArrowRight,
  Users,
  MapPin,
  Phone,
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";
import { motion } from "framer-motion";

export default function FounderDesk() {
  const founder = {
    name: "Aman Shukla",
    role: "Founder & Director",
    msg: "Our mission is to make quality, personalized home education accessible to every student in Kanpur. We believe in life-changing mentorship, not just rote academic coaching.",
    initials: "AS",
    demoImage: "/founder-aman.jpg"
  };

  return (
    <div className="pt-40 pb-20 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">

        {/* Hero Section */}
        <div className="text-center mb-24 space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-[0.3em] text-xs"
          >
            Founder's Desk & Vision
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            Empowering Minds <br />
            <span className="text-primary italic glow-text">Across Kanpur</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted max-w-3xl mx-auto text-lg leading-relaxed"
          >
            We started IQ Hometuitions with one single goal: to revolutionize the home tuition landscape
            in Kanpur through trust, technology, and highly qualified verified home tutors.
          </motion.p>
        </div>

        {/* Profile Card Section */}
        <div className="flex justify-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="zed-card p-10 md:p-12 rounded-[3.5rem] text-center flex flex-col items-center max-w-2xl w-full relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

            {/* Profile Image Wrapper */}
            <div className="relative mb-8">
              <div className="w-40 h-40 rounded-full p-1 border-2 border-primary/20 neon-border overflow-hidden">
                <div className="w-full h-full rounded-full bg-[#1A1A1A] flex items-center justify-center bw-image relative overflow-hidden">
                  {founder.demoImage ? (
                    <img src={founder.demoImage} alt={founder.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-black text-primary/40">{founder.initials}</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{founder.name}</h3>
            <p className="text-primary text-sm font-bold mb-6 uppercase tracking-[0.2em]">{founder.role}</p>

            <div className="relative max-w-lg mb-8">
              <Quote className="absolute -top-4 -left-6 w-10 h-10 text-primary/5" />
              <p className="text-muted/90 leading-relaxed italic text-base">
                "{founder.msg}"
              </p>
            </div>


          </motion.div>
        </div>

        {/* Detailed Message & SEO Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">

          {/* Main Story & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-primary font-bold uppercase tracking-widest text-xs">Our Background</span>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Personalized Mentorship for <br />
                <span className="text-primary italic">Kanpur's Brightest Future</span>
              </h2>
            </div>

            <div className="space-y-6 text-muted text-lg leading-relaxed font-light">
              <p>
                Growing up and pursuing my higher education, I witnessed the academic system's gaps first-hand. In traditional large classroom setups, many talented students fall behind simply because their unique pacing, doubts, and learning styles are overlooked.
              </p>
              <p>
                This inspired me to start <strong className="text-white font-semibold">IQ Hometuitions</strong>, with the primary mission of providing premier, verified <strong className="text-white font-semibold">home tutors in Kanpur</strong>. We believe that every student, whether preparing for school boards or challenging national competitive exams, deserves one-on-one attention from a mentor who understands them.
              </p>
              <p>
                Whether you need a <strong className="text-white font-semibold">home tutor for Class 10 CBSE/ICSE</strong>, a <strong className="text-white font-semibold">Class 12 board specialist</strong>, or advanced tutors for competitive exams like <strong className="text-white font-semibold">IIT-JAM, JEE, NEET</strong>, and <strong className="text-white font-semibold">JEST</strong>, we source the highly qualified and personally verified educators in Kanpur.
              </p>
            </div>
          </motion.div>

          {/* Why We Are Different & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="zed-card p-10 rounded-[3rem] border border-white/5 relative group overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

              <h3 className="text-2xl font-bold text-white mb-6">Key Statistics & Reach</h3>

              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-8 pb-8 border-b border-white/5">
                  <div className="space-y-1">
                    <h4 className="text-4xl font-black text-white">500+</h4>
                    <p className="text-primary text-xs font-bold uppercase tracking-widest">Verified Tutors</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-4xl font-black text-white">2000+</h4>
                    <p className="text-primary text-xs font-bold uppercase tracking-widest">Success Stories</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-sm">Providing Tutors Across Kanpur:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-muted/80">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-primary" />
                      <span>Kakadeo</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-primary" />
                      <span>Kidwai Nagar</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-primary" />
                      <span>Civil Lines</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-primary" />
                      <span>Swaroop Nagar</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-primary" />
                      <span>Kalyanpur</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-primary" />
                      <span>Lajpat Nagar</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/register-tutor"
                    className="bg-primary text-white text-center px-8 py-4 rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-primary/20"
                  >
                    Join as Tutor
                  </Link>
                  <Link
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                    className="bg-white/5 text-white text-center px-8 py-4 rounded-2xl font-bold text-sm border border-white/10 hover:bg-white/10 transition-all"
                  >
                    WhatsApp Us
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Academic Strategy & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Verified Experts Only",
              description: "Every home tutor is thoroughly vetted with document checks and performance demos before joining our Kanpur tutor network.",
              icon: Award
            },
            {
              title: "Guided Pedagogy",
              description: "Our curricula and tutor matches are tailored using scientific learning principles and personal, systematic review processes.",
              icon: GraduationCap
            },
            {
              title: "Comprehensive Coverage",
              description: "From primary classes to advanced university exams like JAM, JEST, and boards (CBSE, ICSE, ISC, UP Board).",
              icon: BookOpen
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
