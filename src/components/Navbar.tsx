"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, MessageCircle, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Find a Tutor", href: "/find-tutor" },
    { name: "Register", href: "/register-tutor" },
    { name: "Founder's Desk", href: "/founder-desk" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-full py-3 px-8 flex justify-between items-center shadow-xl shadow-black/20 border border-white/10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-12 h-12">
              <img src="/logo-512.png" alt="IQ Hometutions Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#171717]">
              IQHometutions
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-[#171717] hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="text-sm font-medium text-[#171717] hover:text-primary transition-colors">About</Link>
            <Link href="/services" className="text-sm font-medium text-[#171717] hover:text-primary transition-colors">Services</Link>
            <Link href="/find-tutor" className="text-sm font-medium text-[#171717] hover:text-primary transition-colors">Find a Tutor</Link>
            <Link href="/founder-desk" className="text-sm font-medium text-[#171717] hover:text-primary transition-colors">Founder's Desk</Link>
            <Link href="/blog" className="text-sm font-medium text-[#171717] hover:text-primary transition-colors">Blog</Link>
            <Link href="/contact" className="text-sm font-medium text-[#171717] hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              className="hidden md:flex items-center space-x-2 bg-[#a85c3d] hover:bg-[#8e4d33] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-md shadow-[#a85c3d]/20"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-black"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden container mx-auto mt-4 px-2">
          <div className="bg-[#171717] rounded-3xl p-8 flex flex-col space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col space-y-6">
              <Link href="/" className="text-xl font-bold text-white" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/about" className="text-xl font-bold text-white" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link href="/services" className="text-xl font-bold text-white" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
              <Link href="/find-tutor" className="text-xl font-bold text-white" onClick={() => setIsMobileMenuOpen(false)}>Find a Tutor</Link>
              <Link href="/register-tutor" className="text-xl font-bold text-white" onClick={() => setIsMobileMenuOpen(false)}>Join as Tutor</Link>
              <Link href="/founder-desk" className="text-xl font-bold text-white" onClick={() => setIsMobileMenuOpen(false)}>Founder's Desk</Link>
              <Link href="/blog" className="text-xl font-bold text-white" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              <Link href="/contact" className="text-xl font-bold text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
            <Link
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              className="flex items-center justify-center space-x-2 bg-[#a85c3d] text-white py-4 rounded-full font-bold shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Us Now</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

