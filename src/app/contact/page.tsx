"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { SITE_CONFIG } from "@/config/site";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Call Us",
      value: SITE_CONFIG.contactNumbers[0],
      sub: "Mon-Sat, 9am - 8pm",
      href: `tel:${SITE_CONFIG.contactNumbers[0].replace(/\s/g, '')}`
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with Experts",
      sub: "Instant Support",
      href: `https://wa.me/${SITE_CONFIG.whatsappNumber}`
    },
    {
      icon: Mail,
      label: "Email Us",
      value: "hometutionsiq@gmail.com",
      sub: "24/7 Support",
      href: "mailto:hometutionsiq@gmail.com"
    }
  ];

  return (
    <div className="pt-40 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-widest text-sm"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mt-6 mb-8 leading-tight"
          >
            Let's Start Your <br />
            <span className="text-primary italic glow-text">Learning Journey</span>
          </motion.h1>
          <p className="text-muted text-lg">
            Have questions? Our team in Kanpur is here to help you find the perfect tutor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={i}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="zed-card p-8 rounded-3xl flex items-center space-x-6 hover:border-primary/40 transition-all group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-1">{info.label}</p>
                    <h4 className="text-xl font-bold text-white mb-0.5">{info.value}</h4>
                    <p className="text-muted text-xs">{info.sub}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="zed-card p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-white">Our Main Office</h3>
              <div className="flex items-start space-x-4">
                <MapPin className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                <p className="text-muted leading-relaxed">
                  IQ Hometuitions, Kidwai Nagar <br />
                  Kanpur, Uttar Pradesh 208011,<br />
                  India
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="zed-card p-10 md:p-12 rounded-[3rem] relative overflow-hidden">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 space-y-6"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
                  <p className="text-muted">Thank you for reaching out. Our team will contact you shortly.</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-primary font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted uppercase tracking-widest ml-2">Your Name</label>
                      <input
                        required
                        type="text"
                        placeholder="YOUR NAME"
                        className="w-full bg-white/5 border border-white/5 focus:border-primary rounded-2xl p-4 text-white outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted uppercase tracking-widest ml-2">Phone Number</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-white/5 border border-white/5 focus:border-primary rounded-2xl p-4 text-white outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-widest ml-2">Subject</label>
                    <select className="w-full bg-white/5 border border-white/5 focus:border-primary rounded-2xl p-4 text-white outline-none transition-all appearance-none">
                      <option className="bg-[#171717]">Finding a Tutor</option>
                      <option className="bg-[#171717]">Registering as a Tutor</option>
                      <option className="bg-[#171717]">Partnership Inquiry</option>
                      <option className="bg-[#171717]">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-widest ml-2">Your Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we help you today?"
                      className="w-full bg-white/5 border border-white/5 focus:border-primary rounded-2xl p-4 text-white outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="rounded-[4rem] overflow-hidden border-8 border-white/5 h-[500px] shadow-2xl relative group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114312.44973347915!2d80.25413158462804!3d26.447388701046274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c4770326274f3%3A0xa11ff7602c304246!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1715880000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
          ></iframe>
          <div className="absolute top-8 right-8 z-10">
            <div className="zed-card p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
              <p className="text-white font-bold text-sm">Serving all 50+ sectors in Kanpur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
