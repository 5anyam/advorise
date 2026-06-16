"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Phone, CheckCircle2, Star, Target, Search,
  Share2, Code2, TrendingUp, Megaphone, Globe,
  Calendar, BookOpen, Quote,
  Bot, Cpu, Sparkles, Link2, DollarSign, MousePointerClick, Smartphone, Zap,
  ChevronRight, BarChart3, ArrowUpRight, Play,
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
  { icon: Target,     href: "/services/google-ads",              title: "Google Ads (PPC)",        desc: "AI-powered Search, Display & YouTube — smart bidding auto-adjusts every hour to maximise ROI and cut waste.", color: "from-orange-500 to-red-500" },
  { icon: Search,     href: "/services/seo",                     title: "SEO & Organic Growth",    desc: "AI-assisted keyword research and white-hat SEO for Page 1 rankings — traffic that compounds over time.", color: "from-emerald-500 to-teal-500" },
  { icon: Share2,     href: "/services/social-media-ads",        title: "Social Media Ads",        desc: "AI audience targeting on Meta, Instagram & LinkedIn — precision ads that flood your pipeline at scale.", color: "from-blue-500 to-violet-500" },
  { icon: Code2,      href: "/services/website-development",     title: "Website Development",     desc: "Blazing-fast, conversion-ready sites on WordPress & Next.js — engineered to turn visitors into customers.", color: "from-sky-500 to-cyan-500" },
  { icon: Megaphone,  href: "/services/brand-bidding",           title: "Brand Bidding",           desc: "Own your brand on Google. Block competitors from hijacking your clicks and stealing hard-earned leads.", color: "from-pink-500 to-rose-500" },
  { icon: Link2,      href: "/services/affiliate-marketing",     title: "Affiliate Marketing",     desc: "CPS, CPL & CPI affiliate campaigns — pay only for real results. Sales, leads, and app installs at scale.", color: "from-amber-500 to-orange-500" },
  { icon: TrendingUp, href: "/services/performance-marketing",   title: "Performance Marketing",   desc: "Full-funnel CPA/CPL/CPS campaigns powered by AI optimisation — zero guesswork, maximum compounding return.", color: "from-violet-500 to-purple-500" },
  { icon: Globe,      href: "/services/international-campaigns", title: "International Campaigns", desc: "Scale to US, UK, UAE, Canada & Australia with AI-personalised, geo-targeted digital strategies.", color: "from-cyan-500 to-sky-500" },
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
  { icon: Bot,      title: "AI Bid Optimisation",    desc: "ML-powered bid strategies auto-adjust every hour — cutting wasted spend while maximising conversions around the clock.", tag: "Smart Bidding",      color: "from-sky-500 to-blue-600" },
  { icon: Cpu,      title: "Predictive Analytics",   desc: "AI models forecast audience behaviour and budget allocation so you know expected returns before spending a single rupee.", tag: "Data Intelligence",  color: "from-violet-500 to-purple-600" },
  { icon: Sparkles, title: "AI Creative Testing",    desc: "Multi-variant testing across hundreds of ad copies — AI identifies winning creatives 10× faster than manual testing.", tag: "Creative AI",        color: "from-amber-500 to-orange-600" },
  { icon: Zap,      title: "Real-Time Optimisation", desc: "Live AI monitoring — underperforming ads paused instantly, winning ads scaled aggressively. No human lag, pure efficiency.", tag: "Auto-Optimise",     color: "from-emerald-500 to-teal-600" },
];

const affiliateModels = [
  {
    icon: DollarSign, model: "CPS", title: "Cost Per Sale",
    desc: "Pay only when a verified sale is completed. Zero upfront risk — perfect for e-commerce, D2C brands, and product launches looking for pure revenue-share performance.",
    tags: ["E-commerce", "D2C", "Revenue Share"],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: MousePointerClick, model: "CPL", title: "Cost Per Lead",
    desc: "Pay per qualified lead captured. Ideal for real estate, finance, insurance, SaaS and education — scalable lead generation at a fixed, predictable cost.",
    tags: ["Real Estate", "Finance", "SaaS", "EdTech"],
    gradient: "from-sky-500 to-blue-500",
  },
  {
    icon: Smartphone, model: "CPI", title: "Cost Per Install",
    desc: "Pay per verified app install from high-intent users on Android & iOS. Drive downloads that actually convert — targeting optimised by AI for active user acquisition.",
    tags: ["Mobile Apps", "Gaming", "Fintech", "Health"],
    gradient: "from-violet-500 to-purple-500",
  },
];

const testimonials = [
  { name: "Vikram Mehta",   role: "Founder, D2C Brand — Mumbai",   rating: 5, text: "Advorise completely flipped our digital performance. Within 45 days, our leads tripled and cost-per-acquisition dropped by half. The team is sharp, transparent, and genuinely invested." },
  { name: "Divya Joshi",    role: "CEO, E-commerce Startup",       rating: 5, text: "Their brand bidding play stopped competitors from eating our traffic overnight. ROAS jumped from 2x to over 6x in just a few weeks. Remarkable results." },
  { name: "Manish Agarwal", role: "MD, Real Estate Group — Delhi", rating: 5, text: "We expanded from India to UAE and the UK with Advorise's international campaigns. 320% ROI in under 90 days — genuinely exceeded every expectation." },
  { name: "Kavya Reddy",    role: "Co-Founder, HealthTech SaaS",   rating: 5, text: "Best performance marketing team we've ever worked with. Deep product understanding, copy that converts, and reporting that's fully transparent. Exactly what we needed." },
];

const process = [
  { step: "01", title: "Discovery Call",    desc: "We understand your goals, market, and competition — then map a clear growth path. No pressure, just clarity.", icon: "🎯" },
  { step: "02", title: "Build Strategy",    desc: "A bespoke AI-assisted blueprint tailored to your goals, model (CPS/CPL/CPI or PPC), and budget. Nothing off-the-shelf.", icon: "🧠" },
  { step: "03", title: "Launch & Optimise", desc: "Live campaigns with AI monitoring, automated A/B testing, and real-time bid management — optimising 24/7.", icon: "🚀" },
  { step: "04", title: "Scale & Report",    desc: "AI identifies what wins and scales it aggressively. You get transparent weekly reports with clear attribution — every time.", icon: "📈" },
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
function Badge({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-bold rounded-full px-4 py-1.5 tracking-wide ${
      dark
        ? "text-sky-300 bg-sky-500/10 border border-sky-500/20"
        : "text-sky-700 bg-sky-50 border border-sky-200"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-sky-400" : "bg-sky-500"}`} />
      {text}
    </span>
  );
}

const StatItem = ({ value, suffix, label, trigger, delay = 0, dark = false }: {
  value: number; suffix: string; label: string; trigger: boolean; delay?: number; dark?: boolean;
}) => {
  const count = useCountUp(value, 2000, trigger);
  return (
    <div className="text-center" style={{
      opacity: trigger ? 1 : 0,
      transform: trigger ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      <div className={`text-4xl sm:text-5xl font-black tabular-nums ${dark ? "text-white" : "text-gray-900"}`}>
        {count}<span className="text-sky-400">{suffix}</span>
      </div>
      <div className={`text-xs uppercase tracking-widest font-semibold mt-1.5 ${dark ? "text-white/40" : "text-gray-400"}`}>{label}</div>
    </div>
  );
};

const Marquee = () => {
  const items = [...ticker, ...ticker, ...ticker, ...ticker];
  return (
    <div className="border-y border-white/10 bg-[#050510] py-4 overflow-hidden select-none">
      <div className="flex gap-10 animate-marquee whitespace-nowrap w-max">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 text-white/30 text-[11px] font-bold uppercase tracking-widest flex-shrink-0 hover:text-sky-400 transition-colors duration-200">
            <span className="w-1.5 h-1.5 bg-sky-500/60 rounded-full flex-shrink-0" />
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
  const statsSection          = useInView(0.2);

  useEffect(() => {
    fetch(`${WP_API_URL}/posts?_embed&per_page=3`)
      .then(r => r.ok ? r.json() : []).then(setPosts).catch(() => {});
  }, []);

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-[#050510]">

        {/* Background glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-sky-600/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[100px]" />
          <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
        </div>

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 pt-16 pb-20 lg:pt-24 lg:pb-28 w-full">

          {/* Centered hero content */}
          <div className="text-center max-w-5xl mx-auto">

            <div className="mb-6" style={{ animation: "heroFadeIn 0.5s ease 0.05s both" }}>
              <Badge text="Meta & Google Certified · AI-Powered Marketing" dark />
            </div>

            <h1 className="text-[48px] sm:text-7xl lg:text-[88px] font-black leading-[1.0] tracking-tight mb-8"
              style={{ animation: "heroFadeIn 0.6s ease 0.15s both" }}>
              <span className="text-white">Performance</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                Marketing
              </span>
              <br />
              <span className="text-white">That Pays Back.</span>
            </h1>

            <p className="text-white/50 text-base sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
              style={{ animation: "heroFadeIn 0.6s ease 0.25s both" }}>
              Advorise is a performance-first agency delivering AI-powered Google Ads, SEO,
              Affiliate Marketing and full-funnel campaigns that generate real, measurable
              ROI — across every market.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
              style={{ animation: "heroFadeIn 0.6s ease 0.35s both" }}>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-2xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-0.5 text-sm sm:text-base group">
                Let&apos;s Talk Growth
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2.5 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 text-sm sm:text-base backdrop-blur-sm">
                <Phone className="w-4 h-4 text-sky-400" /> {PHONE_DISP}
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-5" style={{ animation: "heroFadeIn 0.6s ease 0.45s both" }}>
              <div className="flex -space-x-2.5">
                {avatars.map((src, i) => (
                  <img key={i} src={src} alt="client"
                    className="w-9 h-9 rounded-full border-2 border-[#050510] object-cover"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-white/40 text-xs"><span className="text-white font-bold">450+</span> businesses trust Advorise</p>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10" />
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/40 text-xs font-medium">Active campaigns running</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5"
            style={{ animation: "heroFadeIn 0.6s ease 0.55s both" }}>
            {stats.map(({ value, suffix, label }, i) => (
              <div key={i} className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors px-6 py-7 text-center">
                <div className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                  {value}<span className="text-sky-400">{suffix}</span>
                </div>
                <div className="text-white/35 text-xs uppercase tracking-widest font-semibold mt-1.5">{label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════ MARQUEE ══════════════════════════════ */}
      <Marquee />

      {/* ════════════════════════ SERVICES ═══════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <Badge text="What We Do" />
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 mt-4 mb-4 leading-tight">
              Full-Service Digital<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Marketing & Development</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
              Every service is engineered around results — no fluff, no retainer traps, just measurable growth.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ icon: Icon, title, desc, href, color }, i) => (
              <ScaleIn key={i} delay={i * 55}>
                <Link href={href}
                  className="group relative bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden">
                  {/* Gradient corner accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${color} opacity-5 group-hover:opacity-10 rounded-bl-[80px] transition-opacity duration-300`} />
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-black text-gray-900 text-sm mb-2.5 group-hover:text-sky-600 transition-colors leading-snug">
                    {title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed flex-1">{desc}</p>
                  <div className="mt-5 inline-flex items-center gap-1 text-sky-500 text-xs font-bold">
                    Learn more <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </ScaleIn>
            ))}
          </div>

          <FadeUp delay={200} className="mt-8 text-center">
            <Link href="/services"
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 font-semibold px-6 py-3 rounded-xl hover:border-sky-400 hover:text-sky-600 transition-all duration-200 text-sm">
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════ STATS BAND ════════════════════════════ */}
      <div ref={statsSection.ref} className="bg-[#050510] py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {stats.map((s, i) => (
              <StatItem key={i} {...s} trigger={statsSection.inView} delay={i * 100} dark />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════ EXPERTISE / ABOUT ════════════════════════ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            <FadeLeft>
              <Badge text="Our Expertise" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08] mt-4 mb-5">
                <span className="text-gray-900">Decisions Backed</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">by Data,</span><br />
                <span className="text-gray-900">Results Backed</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">by Us</span>
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed text-sm sm:text-base max-w-lg">
                At Advorise, we engineer AI-powered digital marketing strategies — combining
                performance advertising, affiliate campaigns, and data analytics for
                zero-guesswork, compounding business growth.
              </p>
              <div className="grid grid-cols-1 gap-3 mb-8">
                {expertise.map((item, i) => (
                  <FadeUp key={i} delay={i * 50}>
                    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-sky-200 hover:shadow-sm transition-all duration-200">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{item}</span>
                    </div>
                  </FadeUp>
                ))}
              </div>
              <Link href="/about"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-all shadow-lg shadow-sky-500/25 group">
                About Advorise <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </FadeLeft>

            <FadeRight delay={100}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Team at work"
                    className="rounded-3xl w-full h-52 sm:h-64 object-cover shadow-xl"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Analytics dashboard"
                    className="rounded-3xl w-full h-52 sm:h-64 object-cover shadow-xl mt-10"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#050510] border border-white/10 rounded-2xl px-6 py-4 text-center shadow-2xl w-48">
                  <div className="text-3xl font-black text-white">7<span className="text-sky-400">+</span></div>
                  <div className="text-white/40 text-xs mt-0.5 leading-snug">Years in Performance Marketing</div>
                </div>
              </div>
            </FadeRight>

          </div>
        </div>
      </section>

      {/* ══════════════════════ AI-POWERED SECTION ═══════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#050510] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[80px]" />
          <div className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeUp className="text-center mb-14">
            <Badge text="Powered by Artificial Intelligence" dark />
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-4 mb-4 leading-tight">
              Marketing That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                Thinks for Itself
              </span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-sm sm:text-base">
              Every campaign we run is backed by AI — smarter bidding, faster testing,
              and real-time optimisation that never sleeps.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {aiFeatures.map(({ icon: Icon, title, desc, tag, color }, i) => (
              <ScaleIn key={i} delay={i * 70}>
                <div className="bg-white/[0.03] border border-white/8 rounded-3xl p-6 hover:bg-white/[0.06] hover:border-white/15 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/50 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide mb-3 w-fit">
                    {tag}
                  </span>
                  <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
                  <p className="text-white/35 text-xs leading-relaxed flex-1">{desc}</p>
                </div>
              </ScaleIn>
            ))}
          </div>

          <FadeUp delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-sky-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                </div>
                <p className="text-white/50 text-sm">
                  <span className="text-white font-bold">AI is not a buzzword for us</span> — it&apos;s how every rupee of your budget gets maximised.
                </p>
              </div>
              <Link href="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all group">
                See How It Works <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════ AFFILIATE MARKETING ══════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <Badge text="Affiliate Marketing" />
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 mt-4 mb-4 leading-tight">
              Pay Only for <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Real Results</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
              Advorise runs AI-optimised affiliate campaigns across three proven performance models
              — zero wasted budget, 100% outcome-based billing.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {affiliateModels.map(({ icon: Icon, model, title, desc, tags, gradient }, i) => (
              <ScaleIn key={i} delay={i * 100}>
                <div className="relative bg-white border border-gray-100 rounded-3xl p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden group">
                  {/* Top gradient bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-xs font-black px-4 py-1.5 rounded-full text-white bg-gradient-to-r ${gradient} shadow-md`}>{model}</span>
                  </div>
                  <h3 className="font-black text-gray-900 text-xl mb-3">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="text-[11px] font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">{tag}</span>
                    ))}
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>

          <FadeUp delay={200}>
            <div className="bg-[#050510] rounded-3xl p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/15 rounded-full blur-[60px]" />
              </div>
              <div className="relative z-10 grid sm:grid-cols-3 gap-8 text-center mb-8">
                {[
                  { value: "0 Upfront",   label: "No Setup Risk",          sub: "Pay only when results happen" },
                  { value: "AI-Tracked",  label: "Real-Time Attribution",  sub: "Every conversion traced & verified" },
                  { value: "All Niches",  label: "Flexible Verticals",     sub: "E-commerce, apps, leads & more" },
                ].map(({ value, label, sub }, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-white mb-1">{value}</div>
                    <div className="text-sm font-bold text-white/60">{label}</div>
                    <div className="text-xs text-white/30 mt-0.5">{sub}</div>
                  </div>
                ))}
              </div>
              <div className="relative z-10 text-center">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-2xl shadow-sky-500/30 text-sm group">
                  Start an Affiliate Campaign
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════ PROCESS ════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <Badge text="How It Works" />
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 mt-4 leading-tight">
              Simple. <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Transparent.</span> Effective.
            </h2>
          </FadeUp>

          <div className="relative">
            {/* Connecting line on desktop */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent z-0" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {process.map(({ step, title, desc, icon }, i) => (
                <FadeUp key={i} delay={i * 100}>
                  <div className="bg-white border border-gray-100 rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full group text-center">
                    <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-sky-500/25 group-hover:scale-110 transition-transform duration-300">
                      {icon}
                    </div>
                    <div className="text-xs font-black text-sky-500 uppercase tracking-widest mb-2">Step {step}</div>
                    <h3 className="font-black text-gray-900 text-base mb-3 group-hover:text-sky-600 transition-colors">{title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ TESTIMONIALS ═══════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#050510] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-sky-600/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeUp className="text-center mb-14">
            <Badge text="Client Stories" dark />
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-4 leading-tight">
              Results That <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Speak for Us</span>
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <ScaleIn key={i} delay={i * 80}>
                <div className="bg-white/[0.03] border border-white/8 rounded-3xl p-7 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-5 flex-shrink-0">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-sky-500/30 mb-3 flex-shrink-0" />
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed italic mb-6 flex-1">{t.text}</p>
                  <div className="flex items-center gap-3 border-t border-white/5 pt-5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-black">{t.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-black text-white text-sm">{t.name}</div>
                      <div className="text-sky-400/70 text-xs mt-0.5">{t.role}</div>
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
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <FadeUp className="mb-10">
              <div className="flex items-end justify-between">
                <div>
                  <Badge text="Insights" />
                  <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mt-3 leading-tight">
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
                    className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
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
                    <div className="p-6 flex flex-col flex-1">
                      <div className="text-gray-400 text-xs mb-3 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        {fmtDate(post.date)}
                      </div>
                      <h3 className="font-black text-gray-900 text-sm mb-2.5 group-hover:text-sky-600 transition-colors line-clamp-2 flex-1 leading-snug">
                        {post.title.rendered}
                      </h3>
                      <p className="text-gray-400 text-xs line-clamp-2 mb-4 leading-relaxed">
                        {stripHtml(post.excerpt.rendered)}
                      </p>
                      <div className="inline-flex items-center text-sky-600 text-xs font-bold group-hover:text-sky-700 transition-colors">
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
      <section className="py-20 lg:py-28 bg-gradient-to-br from-sky-600 via-blue-600 to-violet-600 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[60px]" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-[60px]" />
        </div>
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center relative z-10">
          <FadeUp>
            <div className="inline-flex items-center gap-2 text-white/60 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide mb-6">
              <span className="w-1.5 h-1.5 bg-white/60 rounded-full" /> Ready to Grow?
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-black text-white mt-2 mb-5 leading-tight">
              Let&apos;s Build Something<br />
              That Actually Works.
            </h2>
            <p className="text-white/60 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join 450+ businesses already growing with Advorise — AI-powered ads,
              affiliate campaigns, and performance marketing with zero guesswork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-black px-10 py-4 rounded-2xl transition-all duration-200 shadow-2xl shadow-black/20 hover:-translate-y-0.5 text-sm sm:text-base group">
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold px-10 py-4 rounded-2xl transition-all duration-200 text-sm sm:text-base backdrop-blur-sm">
                <Phone className="w-4 h-4" /> {PHONE_DISP}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {["Meta & Google Certified", "No Lock-in Contracts", "Dedicated Strategist", "Weekly Reporting"].map(b => (
                <div key={b} className="flex items-center gap-1.5 text-xs text-white/50 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white/50 flex-shrink-0" /> {b}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
