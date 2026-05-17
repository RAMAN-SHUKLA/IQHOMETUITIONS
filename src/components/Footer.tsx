import Link from "next/link";
import { MessageCircle, Mail, MapPin, Globe, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { KANPUR_AREAS } from "@/data/areas";
import { SUBJECTS } from "@/data/subjects";

export default function Footer() {
  return (
    <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-14 h-14">
                <img src="/logo-512.png" alt="IQ Hometutions Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                IQHometutions
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Kanpur's most trusted home tuition platform. We connect parents with verified, expert tutors to ensure personalized learning success.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted hover:text-primary hover:bg-white/10 transition-all">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted hover:text-primary hover:bg-white/10 transition-all">
                <Phone className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links - Subjects */}
          <div>
            <h4 className="text-white font-semibold mb-6">Popular Subjects</h4>
            <ul className="space-y-3">
              {SUBJECTS.slice(0, 5).map((subject) => (
                <li key={subject.slug}>
                  <Link href={`/tutors/${subject.slug}`} className="text-sm text-muted hover:text-primary transition-colors">
                    {subject.name} Tutors
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Areas */}
          <div>
            <h4 className="text-white font-semibold mb-6">Top Areas</h4>
            <ul className="space-y-3">
              {KANPUR_AREAS.filter(a => a.isPopular).slice(0, 5).map((area) => (
                <li key={area.slug}>
                  <Link href={`/areas/${area.slug}`} className="text-sm text-muted hover:text-primary transition-colors">
                    Tutors in {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold">Get in Touch</h4>
            <div className="space-y-4">
              <Link
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                className="flex items-center space-x-3 text-sm text-muted hover:text-primary group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span>{SITE_CONFIG.contactNumbers[0]}</span>
              </Link>
              <div className="flex items-center space-x-3 text-sm text-muted">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span>hometutionsiq@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Kidwai Nagar, Kanpur, UP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} IQ Hometutions. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-xs text-muted hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-xs text-muted hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
