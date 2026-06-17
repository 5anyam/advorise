import Link from "next/link";
import {
  Phone, Mail, MapPin, MessageSquare,
  Facebook, Twitter, Linkedin, Instagram,
  ArrowUpRight, Zap
} from "lucide-react";

const PHONE      = "+919999207132";
const PHONE_DISP = "+91 9999207132";
const EMAIL      = "marketing@advorise.com";

function Logo() {
  return (
    <img
      src="/advorise-logo.jpeg"
      alt="Advorise"
      className="h-9 w-auto object-contain"
    />
  );
}

const quickLinks = [
  { label: "About Us",        href: "/about" },
  { label: "Our Services",    href: "/services" },
  { label: "Case Studies",    href: "/case-studies" },
  { label: "Blog & Insights", href: "/blogs" },
  { label: "Careers",         href: "/career" },
  { label: "Contact Us",      href: "/contact" },
];

const services = [
  { label: "Google Ads (PPC)",         href: "/services/google-ads" },
  { label: "SEO & Organic Growth",     href: "/services/seo" },
  { label: "Facebook & Instagram Ads", href: "/services/social-media-ads" },
  { label: "Performance Marketing",    href: "/services/performance-marketing" },
  { label: "International Campaigns",  href: "/services/international-campaigns" },
  { label: "YouTube Advertising",      href: "/services/youtube-ads" },
  { label: "Website Development",      href: "/services/website-development" },
];

const usefulLinks = [
  { label: "Google Ads Manager",     href: "https://ads.google.com" },
  { label: "Google Analytics",       href: "https://analytics.google.com" },
  { label: "Google Search Console",  href: "https://search.google.com/search-console" },
  { label: "Meta Ads Manager",       href: "https://www.facebook.com/adsmanager" },
  { label: "Google Merchant Center", href: "https://merchants.google.com" },
  { label: "Disclaimer",             href: "/disclaimer", internal: true },
];

const socialLinks = [
  { icon: Facebook,  href: "https://www.facebook.com/advorise",         label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/advorise",        label: "Instagram" },
  { icon: Linkedin,  href: "https://www.linkedin.com/company/advorise", label: "LinkedIn" },
  { icon: Twitter,   href: "https://twitter.com/advorise",              label: "X (Twitter)" },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 relative overflow-hidden border-t border-gray-200">

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />

      {/* Background blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-sky-100/60 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* ── Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <Logo />
              </Link>

              <p className="text-gray-500 mb-7 leading-relaxed text-sm">
                Advorise is a performance-first digital agency delivering data-driven
                Google Ads, SEO, Social Media campaigns and Website Development — with
                proven ROI across India and international markets.
              </p>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-sky-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-500 leading-snug">
                    MU-75, Second Floor, Pitampura, New Delhi - 110034, India
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-sky-500 mt-0.5 flex-shrink-0" />
                  <a href={`tel:${PHONE}`}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">
                    {PHONE_DISP}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-sky-500 flex-shrink-0" />
                  <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">
                    {PHONE_DISP} (WhatsApp)
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-sky-500 flex-shrink-0" />
                  <a href={`mailto:${EMAIL}`}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>

            {/* ── Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">
                Quick Links
              </h3>
              <div className="space-y-3">
                {quickLinks.map(({ label, href }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm transition-colors duration-200 group">
                    <span className="w-1 h-1 bg-sky-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Services */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">
                Our Services
              </h3>
              <div className="space-y-3">
                {services.map(({ label, href }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm transition-colors duration-200 group">
                    <span className="w-1 h-1 bg-sky-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Useful Links */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">
                Useful Links
              </h3>
              <div className="space-y-3">
                {usefulLinks.map(({ label, href, internal }) =>
                  internal ? (
                    <Link key={href} href={href}
                      className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm transition-colors duration-200 group">
                      <span className="w-1 h-1 bg-sky-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {label}
                    </Link>
                  ) : (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm transition-colors duration-200 group">
                      <span className="w-1 h-1 bg-sky-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity ml-auto" />
                    </a>
                  )
                )}
              </div>
            </div>

            {/* ── Agency Info + Social */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">
                Agency Info
              </h3>

              {/* Working Hours */}
              <div className="mb-6 bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Working Hours
                </p>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Mon – Sat</span>
                    <span className="text-gray-700 font-medium">10:00 AM – 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-red-500">Closed</span>
                  </div>
                </div>
              </div>

              {/* Why Us */}
              <div className="mb-7 bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Why Us
                </p>
                <div className="space-y-2">
                  {[
                    "Meta & Google Certified",
                    "7+ Years of Experience",
                    "450+ Campaigns Delivered",
                    "India + International Markets",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-sky-500 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Follow Us
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-sky-600 hover:border-sky-400 hover:bg-sky-50 transition-all duration-200">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom Bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs text-center md:text-left">
              © {new Date().getFullYear()} Advorise Digital. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              {[
                { label: "Privacy Policy",   href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Disclaimer",       href: "/disclaimer" },
              ].map(({ label, href }) => (
                <Link key={href} href={href}
                  className="text-gray-400 hover:text-gray-700 text-xs transition-colors duration-200">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
