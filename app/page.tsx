"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Phone, CheckCircle2, Star, Target, Search,
  Share2, Code2, TrendingUp, Megaphone, Globe,
  Calendar, BookOpen, Quote,
  Bot, Cpu, Sparkles, Link2, DollarSign, MousePointerClick, Smartphone, Zap,
  ChevronRight, BarChart3,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface WordPressPost {
  id: number; date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  _embedded?: { "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }> };
}
const WP_API_URL = "https://cms.advorise.com/wp-json/wp/v2";

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useCountUp(end: number, duration = 2400, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let s: number | null = null;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, trigger]);
  return count;
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Animation Primitives ────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView(0.08);
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0px)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function FadeLeft({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView(0.08);
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0px)" : "translateX(-48px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function FadeRight({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView(0.08);
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0px)" : "translateX(48px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function ScaleIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView(0.08);
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "scale(1)" : "scale(0.92)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const PHONE      = "+919999207132";
const PHONE_DISP = "+91 9999207132";

const services = [
  { icon: Target,     href: "/services/google-ads",              title: "Google Ads (PPC)",        desc: "AI-powered Search, Display & YouTube — smart bidding auto-adjusts every hour to maximise ROI and cut waste." },
  { icon: Search,     href: "/services/seo",                     title: "SEO & Organic Growth",    desc: "AI-assisted keyword research and white-hat SEO for Page 1 rankings — traffic that compounds over time." },
  { icon: Share2,     href: "/services/social-media-ads",        title: "Social Media Ads",        desc: "AI audience targeting on Meta, Instagram & LinkedIn — precision ads that flood your pipeline at scale." },
  { icon: Code2,      href: "/services/website-development",     title: "Website Development",     desc: "Blazing-fast, conversion-ready sites on WordPress & Next.js — engineered to turn visitors into customers." },
  { icon: Megaphone,  href: "/services/brand-bidding",           title: "Brand Bidding",           desc: "Own your brand on Google. Block competitors from hijacking your clicks and stealing hard-earned leads." },
  { icon: Link2,      href: "/services/affiliate-marketing",     title: "Affiliate Marketing",     desc: "CPS, CPL & CPI affiliate campaigns — pay only for real results. Sales, leads, and app installs at scale." },
  { icon: TrendingUp, href: "/services/performance-marketing",   title: "Performance Marketing",   desc: "Full-funnel CPA/CPL/CPS campaigns powered by AI optimisation — zero guesswork, maximum compounding return." },
  { icon: Globe,      href: "/services/international-campaigns", title: "International Campaigns", desc: "Scale to US, UK, UAE, Canada & Australia with AI-personalised, geo-targeted digital strategies." },
];

const stats = [
  { value: 450, suffix: "+", label: "Campaigns Delivered" },
  { value: 120, suffix: "+", label: "Clients Scaled" },
  { value: 7,   suffix: "+", label: "Years of Expertise" },
  { value: 320, suffix: "%", label: "Average ROI" },
];

const expertise = [
  "Google Search, Display & Shopping Campaigns",
  "AI-Powered Bid Strategies & Smart Automation",
  "Facebook & Instagram Performance Ads",
  "Affiliate Marketing — CPS, CPL & CPI Models",
  "Brand Protection & Competitor Conquest Bidding",
  "Conversion Rate & Landing Page Optimisation",
  "YouTube Video Strategy & Ad Management",
  "Global Multi-Market Campaign Execution",
];

const aiFeatures = [
  { icon: Bot,      title: "AI Bid Optimisation",  desc: "ML-powered bid strategies auto-adjust every hour — cutting wasted spend while maximising conversions around the clock.", tag: "Smart Bidding" },
  { icon: Cpu,      title: "Predictive Analytics", desc: "AI models forecast audience behaviour and budget allocation so you know expected returns before spending a single rupee.", tag: "Data Intelligence" },
  { icon: Sparkles, title: "AI Creative Testing",  desc: "Multi-variant testing across hundreds of ad copies — AI identifies winning creatives 10× faster than manual testing.", tag: "Creative AI" },
  { icon: Zap,      title: "Real-Time Optimisation", desc: "Live AI monitoring — underperforming ads paused instantly, winning ads scaled aggressively. No human lag, pure efficiency.", tag: "Auto-Optimise" },
];

const affiliateModels = [
  {
    icon: DollarSign, model: "CPS", title: "Cost Per Sale",
    desc: "Pay only when a verified sale is completed. Zero upfront risk — perfect for e-commerce, D2C brands, and product launches looking for pure revenue-share performance.",
    tags: ["E-commerce", "D2C", "Revenue Share"],
    accent: "emerald",
  },
  {
    icon: MousePointerClick, model: "CPL", title: "Cost Per Lead",
    desc: "Pay per qualified lead captured. Ideal for real estate, finance, insurance, SaaS and education — scalable lead generation at a fixed, predictable cost.",
    tags: ["Real Estate", "Finance", "SaaS", "EdTech"],
    accent: "sky",
  },
  {
    icon: Smartphone, model: "CPI", title: "Cost Per Install",
    desc: "Pay per verified app install from high-intent users on Android & iOS. Drive downloads that actually convert — targeting optimised by AI for active user acquisition.",
    tags: ["Mobile Apps", "Gaming", "Fintech", "Health"],
    accent: "violet",
  },
];

const testimonials = [
  { name: "Vikram Mehta",   role: "Founder, D2C Brand — Mumbai",   rating: 5, text: "Advorise completely flipped our digital performance. Within 45 days, our leads tripled and cost-per-acquisition dropped by half. The team is sharp, transparent, and genuinely invested." },
  { name: "Divya Joshi",    role: "CEO, E-commerce Startup",       rating: 5, text: "Their brand bidding play stopped competitors from eating our traffic overnight. ROAS jumped from 2x to over 6x in just a few weeks. Remarkable results." },
  { name: "Manish Agarwal", role: "MD, Real Estate Group — Delhi", rating: 5, text: "We expanded from India to UAE and the UK with Advorise's international campaigns. 320% ROI in under 90 days — genuinely exceeded every expectation." },
  { name: "Kavya Reddy",    role: "Co-Founder, HealthTech SaaS",   rating: 5, text: "Best performance marketing team we've ever worked with. Deep product understanding, copy that converts, and reporting that's fully transparent. Exactly what we needed." },
];

const process = [
  { step: "01", title: "Discovery Call",    desc: "We understand your goals, market, and competition — then map a clear growth path. No pressure, just clarity." },
  { step: "02", title: "Build Strategy",    desc: "A bespoke AI-assisted blueprint tailored to your goals, model (CPS/CPL/CPI or PPC), and budget. Nothing off-the-shelf." },
  { step: "03", title: "Launch & Optimise", desc: "Live campaigns with AI monitoring, automated A/B testing, and real-time bid management — optimising 24/7." },
  { step: "04", title: "Scale & Report",    desc: "AI identifies what wins and scales it aggressively. You get transparent weekly reports with clear attribution — every time." },
];

const ticker = [
  "Google Ads", "AI Marketing", "Performance Marketing", "SEO", "Brand Bidding",
  "Facebook Ads", "Affiliate Marketing", "CPS Campaigns", "CPL Lead Gen", "CPI App Installs",
  "YouTube Campaigns", "AI Bid Optimisation", "Conversion Optimisation",
  "Web Development", "Landing Pages", "CRO", "Lead Generation", "AI Creative Testing",
];

const avatars = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/68.jpg",
  "https://randomuser.me/api/portraits/women/17.jpg",
];

// ─── Sub-components ──────────────────────────────────────────────────────────
function Pill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 rounded-full px-3.5 py-1.5">
      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
      {text}
    </span>
  );
}

const StatItem = ({ value, suffix, label, trigger, delay = 0 }: {
  value: number; suffix: string; label: string; trigger: boolean; delay?: number;
}) => {
  const count = useCountUp(value, 2000, trigger);
  return (
    <div className="text-center" style={{
      opacity: trigger ? 1 : 0,
      transform: trigger ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      <div className="text-4xl sm:text-5xl font-black text-gray-900 tabular-nums">
        {count}<span className="text-sky-500">{suffix}</span>
      </div>
      <div className="text-gray-400 text-xs uppercase tracking-widest font-semibold mt-1.5">{label}</div>
    </div>
  );
};

const Marquee = () => {
  const items = [...ticker, ...ticker, ...ticker, ...ticker];
  return (
    <div className="border-y border-gray-100 bg-gray-50 py-3.5 overflow-hidden select-none">
      <div className="flex gap-10 animate-marquee whitespace-nowrap w-max">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 text-gray-400 text-[11px] font-bold uppercase tracking-widest flex-shrink-0 hover:text-sky-500 transition-colors duration-200">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

function stripHtml(html: string) { return html.replace(/<[^>]*>/g, "").substring(0, 120) + "..."; }
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [posts, setPosts]     = useState<WordPressPost[]>([]);
  const [activeT, setActiveT] = useState(0);
  const statsSection          = useInView(0.2);

  useEffect(() => {
    fetch(`${WP_API_URL}/posts?_embed&per_page=3`)
      .then(r => r.ok ? r.json() : []).then(setPosts).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveT(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden bg-white">

        {/* Subtle background grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Blue glow top-right */}
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-sky-100 rounded-full blur-[100px] opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left: Headline + CTAs */}
            <div>
              <div className="mb-6" style={{ animation: "heroFadeIn 0.5s ease 0.05s both" }}>
                <Pill text="Meta & Google Certified · AI-Powered Marketing" />
              </div>

              <h1 className="text-[42px] sm:text-6xl lg:text-[68px] font-black leading-[1.05] tracking-tight mb-6"
                style={{ animation: "heroFadeIn 0.6s ease 0.15s both" }}>
                <span className="text-gray-900">Performance</span>
                <br />
                <span className="text-gray-900">Marketing</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                  That Pays Back.
                </span>
              </h1>

              <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
                style={{ animation: "heroFadeIn 0.6s ease 0.25s both" }}>
                Advorise is a performance-first agency delivering AI-powered Google Ads, SEO,
                Affiliate Marketing and full-funnel campaigns that generate real, measurable
                ROI — across every market.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10"
                style={{ animation: "heroFadeIn 0.6s ease 0.35s both" }}>
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-0.5 text-sm group">
                  Let&apos;s Talk
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold px-7 py-3.5 rounded-xl hover:border-sky-400 hover:bg-sky-50 transition-all duration-200 text-sm">
                  <Phone className="w-4 h-4 text-sky-500" /> {PHONE_DISP}
                </a>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4"
                style={{ animation: "heroFadeIn 0.6s ease 0.45s both" }}>
                <div className="flex -space-x-2.5">
                  {avatars.map((src, i) => (
                    <img key={i} src={src} alt="client"
                      className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-gray-400 text-xs"><span className="text-gray-700 font-bold">450+</span> clients trust Advorise</p>
                </div>
              </div>
            </div>

            {/* ── Right: Stats + Features bento */}
            <FadeRight delay={150}>
              <div className="grid grid-cols-2 gap-3">
                {/* Stat cards */}
                {stats.map(({ value, suffix, label }, i) => (
                  <div key={i}
                    className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-sky-300 hover:-translate-y-0.5 transition-all duration-200">
                    <div className="text-3xl font-black text-gray-900 mb-0.5">
                      {value}{suffix === "%" ? "" : ""}<span className="text-sky-500">{suffix}</span>
                    </div>
                    <div className="text-xs text-gray-400 font-medium">{label}</div>
                  </div>
                ))}
                {/* Wide bottom feature card */}
                <div className="col-span-2 bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-5 text-white shadow-lg shadow-sky-500/20">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Bot className="w-5 h-5 opacity-80" />
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">AI-Powered Campaigns</span>
                  </div>
                  <p className="text-sm font-semibold leading-snug opacity-90">
                    Smart bidding, predictive analytics & real-time optimisation — 24/7.
                  </p>
                </div>
                {/* Certified badge */}
                <div className="col-span-2 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">7+ Years Experience</div>
                      <div className="text-xs text-gray-400">India · UK · UAE · USA</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
              </div>
            </FadeRight>

          </div>
        </div>
      </section>

      {/* ══════════════════════════ MARQUEE ══════════════════════════════ */}
      <Marquee />

      {/* ════════════════════════ SERVICES ═══════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeUp className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <Pill text="What We Do" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mt-3 leading-tight">
                  Full-Service Digital<br />
                  <span className="text-sky-500">Marketing & Development</span>
                </h2>
              </div>
              <Link href="/services"
                className="hidden sm:inline-flex items-center gap-1.5 text-sky-600 font-semibold text-sm hover:text-sky-700 transition-colors group flex-shrink-0">
                View all services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map(({ icon: Icon, title, desc, href }, i) => (
              <ScaleIn key={i} delay={i * 60}>
                <Link href={href}
                  className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/8 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                  <div className="w-10 h-10 bg-sky-50 border border-sky-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sky-100 group-hover:border-sky-200 transition-all duration-200">
                    <Icon className="w-5 h-5 text-sky-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-sky-600 transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed flex-1">{desc}</p>
                  <div className="mt-4 flex items-center text-sky-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </div>
                </Link>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ STATS BAR ══════════════════════════════ */}
      <div ref={statsSection.ref} className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((s, i) => (
              <StatItem key={i} {...s} trigger={statsSection.inView} delay={i * 100} />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════ EXPERTISE / ABOUT ════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            <FadeLeft>
              <div className="relative rounded-3xl overflow-hidden">
                <div className="grid grid-cols-2 gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Team at work"
                    className="rounded-2xl w-full h-48 sm:h-60 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Analytics dashboard"
                    className="rounded-2xl w-full h-48 sm:h-60 object-cover mt-10"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-2xl px-6 py-4 text-center shadow-xl w-44">
                  <div className="text-3xl font-black text-gray-900">7<span className="text-sky-500">+</span></div>
                  <div className="text-gray-400 text-xs mt-0.5 leading-snug">Years in Performance Marketing</div>
                </div>
              </div>
            </FadeLeft>

            <FadeRight delay={100}>
              <Pill text="Our Expertise" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08] mt-3 mb-5">
                <span className="text-gray-900">Decisions Backed</span><br />
                <span className="text-sky-500">by Data,</span><br />
                <span className="text-gray-900">Results Backed</span><br />
                <span className="text-sky-500">by Us</span>
              </h2>
              <p className="text-gray-500 mb-7 leading-relaxed text-sm sm:text-base">
                At Advorise, we engineer AI-powered digital marketing strategies — combining
                performance advertising, affiliate campaigns, and data analytics for
                zero-guesswork, compounding business growth.
              </p>
              <div className="space-y-2.5 mb-8">
                {expertise.map((item, i) => (
                  <FadeUp key={i} delay={i * 50}>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  </FadeUp>
                ))}
              </div>
              <Link href="/about"
                className="inline-flex items-center gap-2 text-sky-600 font-bold text-sm hover:text-sky-700 transition-colors group">
                About Advorise <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </FadeRight>

          </div>
        </div>
      </section>

      {/* ══════════════════════ AI-POWERED SECTION ═══════════════════════ */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <Pill text="Powered by Artificial Intelligence" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mt-3 mb-3">
              Marketing That{" "}
              <span className="text-sky-500">Thinks for Itself</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm mt-2">
              Every campaign we run is backed by AI — smarter bidding, faster testing,
              and real-time optimisation that never sleeps.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {aiFeatures.map(({ icon: Icon, title, desc, tag }, i) => (
              <ScaleIn key={i} delay={i * 70}>
                <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <span className="inline-flex items-center gap-1.5 bg-sky-50 border border-sky-100 text-sky-700 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide mb-4 w-fit">
                    <span className="w-1 h-1 bg-sky-500 rounded-full" />{tag}
                  </span>
                  <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center mb-3 flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-sky-600" style={{ width: 18, height: 18 }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed flex-1">{desc}</p>
                </div>
              </ScaleIn>
            ))}
          </div>

          <FadeUp delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                </div>
                <p className="text-gray-600 text-sm">
                  <span className="text-gray-900 font-bold">AI is not a buzzword for us</span> — it&apos;s how every rupee of your budget gets maximised.
                </p>
              </div>
              <Link href="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all group">
                See How It Works <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════ AFFILIATE MARKETING ══════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <Pill text="Affiliate Marketing" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mt-3 mb-3">
              Pay Only for <span className="text-sky-500">Real Results</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Advorise runs AI-optimised affiliate campaigns across three proven performance models
              — zero wasted budget, 100% outcome-based billing.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {affiliateModels.map(({ icon: Icon, model, title, desc, tags, accent }, i) => (
              <ScaleIn key={i} delay={i * 100}>
                <div className={`bg-white border-2 ${
                  accent === "emerald" ? "border-emerald-100 hover:border-emerald-300" :
                  accent === "sky"     ? "border-sky-100 hover:border-sky-300" :
                                        "border-violet-100 hover:border-violet-300"
                } rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col`}>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      accent === "emerald" ? "bg-emerald-50" :
                      accent === "sky"     ? "bg-sky-50" : "bg-violet-50"
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        accent === "emerald" ? "text-emerald-600" :
                        accent === "sky"     ? "text-sky-600" : "text-violet-600"
                      }`} />
                    </div>
                    <span className={`text-xs font-black px-3 py-1 rounded-full text-white ${
                      accent === "emerald" ? "bg-emerald-500" :
                      accent === "sky"     ? "bg-sky-500" : "bg-violet-500"
                    }`}>{model}</span>
                  </div>
                  <h3 className="font-black text-gray-900 text-lg mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map(tag => (
                      <span key={tag} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        accent === "emerald" ? "bg-emerald-50 text-emerald-700" :
                        accent === "sky"     ? "bg-sky-50 text-sky-700" : "bg-violet-50 text-violet-700"
                      }`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>

          <FadeUp delay={200}>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                {[
                  { value: "0 Upfront",   label: "No Setup Risk",          sub: "Pay only when results happen" },
                  { value: "AI-Tracked",  label: "Real-Time Attribution",  sub: "Every conversion traced & verified" },
                  { value: "All Niches",  label: "Flexible Verticals",     sub: "E-commerce, apps, leads & more" },
                ].map(({ value, label, sub }, i) => (
                  <div key={i}>
                    <div className="text-xl font-black text-gray-900 mb-0.5">{value}</div>
                    <div className="text-sm font-bold text-gray-700">{label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-sky-500/20 text-sm group">
                  Start an Affiliate Campaign
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════ PROCESS ════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <Pill text="How It Works" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mt-3">
              Simple. <span className="text-sky-500">Transparent.</span> Effective.
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map(({ step, title, desc }, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full group">
                  <div className="text-6xl font-black text-sky-50 group-hover:text-sky-100 transition-colors tabular-nums mb-4 leading-none select-none">{step}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-sky-600 transition-colors">{title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px z-10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-300/50 to-transparent" />
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ TESTIMONIALS ═══════════════════════════ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <Pill text="Client Stories" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mt-3">
              Results That <span className="text-sky-500">Speak for Us</span>
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <ScaleIn key={i} delay={i * 80}>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-7 hover:border-sky-300 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <Quote className="w-7 h-7 text-sky-200 mb-4 flex-shrink-0" />
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic mb-6 flex-1">{t.text}</p>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-black text-gray-900 text-sm">{t.name}</div>
                      <div className="text-sky-600 text-xs mt-0.5">{t.role}</div>
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ BLOG ════════════════════════════════════ */}
      {posts.length > 0 && (
        <section className="py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <FadeUp className="mb-10">
              <div className="flex items-end justify-between">
                <div>
                  <Pill text="Insights" />
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3">
                    From the Advorise Blog
                  </h2>
                </div>
                <Link href="/blogs"
                  className="hidden sm:inline-flex items-center gap-1 text-sky-600 font-semibold hover:text-sky-700 transition-colors text-sm group">
                  View All <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <FadeUp key={post.id} delay={i * 100}>
                  <Link href={`/${post.slug}`}
                    className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                    <div className="aspect-video overflow-hidden flex-shrink-0 bg-sky-50">
                      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                        <img
                          src={post._embedded["wp:featuredmedia"][0].source_url}
                          alt={post.title.rendered}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-sky-200" />
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="text-gray-400 text-xs mb-2.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        {fmtDate(post.date)}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-sky-600 transition-colors line-clamp-2 flex-1">
                        {post.title.rendered}
                      </h3>
                      <p className="text-gray-400 text-xs line-clamp-2 mb-3 leading-relaxed">
                        {stripHtml(post.excerpt.rendered)}
                      </p>
                      <div className="inline-flex items-center text-sky-600 text-xs font-semibold group-hover:text-sky-700 transition-colors">
                        Read More <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════ BOTTOM CTA ═════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <FadeUp>
            <Pill text="Ready to Grow?" />
            <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-black text-gray-900 mt-4 mb-5 leading-tight">
              Let&apos;s Build Something<br />
              <span className="text-sky-500">That Actually Works.</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Join 450+ businesses already growing with Advorise — AI-powered ads,
              affiliate campaigns, and performance marketing with zero guesswork.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-9 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/25 hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base group">
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold px-9 py-4 rounded-xl hover:border-sky-400 hover:bg-sky-50 transition-all duration-200 text-sm sm:text-base">
                <Phone className="w-4 h-4 text-sky-500" /> {PHONE_DISP}
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {["Meta & Google Certified", "No Lock-in Contracts", "Dedicated Strategist", "Weekly Reporting"].map(b => (
                <div key={b} className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" /> {b}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
