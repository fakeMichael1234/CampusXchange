import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Search,
  CheckCircle2,
  Lock,
  BookOpen,
  Laptop,
  Bike,
  PenTool,
  Shirt,
  Cpu,
  MapPin,
  Star,
  ChevronRight,
  Users,
  Zap,
  MessageSquare,
  Package,
  Home as HomeIcon,
  Armchair,
} from 'lucide-react';
import { useStore, formatINR } from '../context/StoreContext';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { SceneContainer } from '../components/3d/SceneContainer';
import { NetworkNodes } from '../components/3d/NetworkNodes';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { MobileBottomNav } from '../components/layout/MobileBottomNav';
import { HeroParticles } from '../components/3d/HeroParticles';

/* ── Marketplace Preview Listings (Indian context) ─────────────────────── */
const PREVIEW_LISTINGS = [
  {
    id: 'p1',
    title: 'Engineering Mathematics Vol. 1 & 2',
    category: 'Books',
    price: 650,
    condition: 'Good',
    college: 'SRM IST, Chennai',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'p2',
    title: 'Casio FX-991EX Scientific Calculator',
    category: 'Electronics',
    price: 1200,
    condition: 'Like New',
    college: 'VIT Vellore',
    image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'p3',
    title: 'MacBook Air M1 (2021) — 8GB/256GB',
    category: 'Electronics',
    price: 52000,
    condition: 'Good',
    college: 'IIT Madras',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'p4',
    title: 'Sony WH-1000XM4 Headphones',
    category: 'Electronics',
    price: 8500,
    condition: 'Good',
    college: 'Anna University',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'p5',
    title: 'Wooden Study Table with Shelf',
    category: 'Furniture',
    price: 3200,
    condition: 'Fair',
    college: 'Sathyabama University',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'p7',
    title: 'Wildcraft Campus Backpack 45L',
    category: 'Accessories',
    price: 1800,
    condition: 'Like New',
    college: 'Amrita University',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'p8',
    title: 'Operating Systems — Galvin (10th Ed.)',
    category: 'Books',
    price: 480,
    condition: 'Good',
    college: 'PSG Tech, Coimbatore',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=80',
  },
];

const CATEGORIES = [
  { id: 'books', name: 'Books & Textbooks', icon: BookOpen, count: '120+ listings' },
  { id: 'electronics', name: 'Electronics & Tech', icon: Laptop, count: '85+ listings' },
  { id: 'furniture', name: 'Dorm Furniture', icon: Armchair, count: '45+ listings' },
  { id: 'hostel', name: 'Hostel Essentials', icon: HomeIcon, count: '60+ listings' },

  { id: 'stationery', name: 'Stationery & Tools', icon: PenTool, count: '50+ listings' },
  { id: 'fashion', name: 'Apparel & Accessories', icon: Shirt, count: '40+ listings' },
  { id: 'academic', name: 'Lab & Engineering Kits', icon: Cpu, count: '35+ listings' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    label: 'VERIFY',
    title: 'Verify your identity',
    desc: 'Sign up with your email. We confirm you are a real student before granting access.',
    icon: ShieldCheck,
  },
  {
    step: '02',
    label: 'DISCOVER',
    title: 'Find what you need',
    desc: 'Browse thousands of listings from verified students at your campus — books, devices, furniture and more.',
    icon: Search,
  },
  {
    step: '03',
    label: 'CONNECT',
    title: 'Chat with students',
    desc: 'Message the seller directly, negotiate a fair price, and agree on a safe campus meetup point.',
    icon: MessageSquare,
  },
  {
    step: '04',
    label: 'EXCHANGE',
    title: 'Complete on campus',
    desc: 'Meet directly at your college campus. Inspect the item and complete the handover.',
    icon: Package,
  },
];

const STATS = [
  { value: '12,000+', label: 'Verified Students' },
  { value: '8,500+', label: 'Active Listings' },
  { value: '45+', label: 'Campuses' },
  { value: '98%', label: 'Safe Exchanges' },
];

export const LandingPage = ({ onNavigate }) => {
  const { products, selectedCampus, setSearchQuery } = useStore();
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setSearchQuery(heroSearch);
      onNavigate('/marketplace');
    }
  };

  return (
    <div className="min-h-screen bg-cx-950 text-cx-0 font-sans flex flex-col selection:bg-cx-0 selection:text-cx-950">

      {/* Navbar */}
      <Navbar currentPath="/" onNavigate={onNavigate} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — Full-viewport with particle background + 3D scene
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-cx-950">
        {/* Particle canvas fills the full section */}
        <HeroParticles className="absolute inset-0 w-full h-full" />

        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-cx-950/20 via-transparent to-cx-950 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-cx-950/60 via-cx-950/20 to-cx-950/20 pointer-events-none" />

        <Container size="xl" className="relative z-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* ── Left Content ────────────────────────────────────────────────── */}
            <div className="lg:col-span-6 space-y-8">
              {/* Label badge */}
              <div className="inline-flex items-center space-x-2 border border-cx-700 bg-cx-900/60 backdrop-blur-sm px-4 py-2 rounded-full font-mono text-xs text-cx-300 tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-cx-0 shrink-0" />
                <span>VERIFIED CAMPUS MARKETPLACE</span>
              </div>

              {/* Main heading */}
              <div className="space-y-2">
                <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter text-cx-0 leading-[1.0] uppercase">
                  YOUR CAMPUS.
                </h1>
                <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.0] uppercase text-cx-400">
                  YOUR MARKETPLACE.
                </h1>
              </div>

              {/* Supporting text */}
              <p className="text-base sm:text-lg text-cx-400 font-normal leading-relaxed max-w-xl">
                Buy, sell and exchange with verified students within your campus community.
                Books, devices, furniture — anything you need, someone nearby already has.
              </p>

              {/* Search bar */}
              <form onSubmit={handleHeroSearch} className="flex items-center max-w-lg bg-cx-900/80 backdrop-blur border border-cx-700 rounded-xl p-1.5 shadow-lg focus-within:border-cx-500 transition-colors">
                <Search className="w-4 h-4 text-cx-500 ml-3 shrink-0" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search books, laptops, monitors, calculators..."
                  className="w-full bg-transparent px-3 py-2 text-sm text-cx-0 placeholder-cx-500 focus:outline-none font-sans"
                />
                <Button type="submit" variant="primary" size="sm" className="shrink-0 font-mono text-xs uppercase">
                  Search
                </Button>
              </form>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => onNavigate('/marketplace')}
                >
                  Explore Marketplace
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => onNavigate('/dashboard/listings/create')}
                >
                  Sell an Item
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-cx-500 pt-2">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cx-300 inline-block" />
                  <span>EMAIL VERIFIED</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cx-400 inline-block" />
                  <span>INSTANT CAMPUS PICKUP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cx-500 inline-block" />
                  <span>ZERO SHIPPING FEES</span>
                </div>
              </div>
            </div>

            {/* ── Right — 3D Canvas ────────────────────────────────────────────── */}
            <div className="lg:col-span-6 relative hidden lg:block">
              <SceneContainer cameraPosition={[0, 0, 5.5]} className="w-full h-[520px]">
                <NetworkNodes />
              </SceneContainer>
            </div>

          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 font-mono text-[10px] text-cx-600 tracking-widest">
          <span>SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-cx-600 to-transparent" />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          STATS STRIP
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-y border-cx-800 bg-cx-900/40 backdrop-blur-sm">
        <Container size="xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-cx-800">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-6 py-8 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-cx-0 tracking-tight">{stat.value}</div>
                <div className="text-xs font-mono text-cx-500 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          WHY CAMPUSXCHANGE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-cx-950">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="space-y-6">
              <span className="font-mono text-xs text-cx-500 uppercase tracking-widest block">
                WHY CAMPUSXCHANGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-cx-0 tracking-tight leading-tight uppercase">
                A MARKETPLACE BUILT<br />
                <span className="text-cx-400">ONLY FOR STUDENTS.</span>
              </h2>
              <p className="text-sm text-cx-400 leading-relaxed">
                Public classifieds are full of strangers, shipping risks, and scams.
                CampusXchange is different — every user is a verified college student,
                every exchange happens on campus, and every item is priced for students.
              </p>
              <div className="space-y-4">
                {[
                  'Every account verified with a valid email address',
                  'Campus-only exchanges — meet directly at your college campus',
                  'Student reputation ratings after every successful handover',
                  'Zero shipping costs — everything is within walking distance',
                ].map((text, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-cx-0 shrink-0 mt-0.5" />
                    <span className="text-sm text-cx-300">{text}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="primary" size="md" onClick={() => onNavigate('/signup')}>
                  Get Started
                </Button>
                <Button variant="secondary" size="md" onClick={() => onNavigate('/about')}>
                  Safety Guide
                </Button>
              </div>
            </div>

            {/* Trust card panel */}
            <div className="space-y-4">
              <div className="bg-cx-900 border border-cx-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-cx-0 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-cx-950" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-cx-0">Campus Safety Standard</h4>
                    <p className="text-xs font-mono text-cx-500">Peer Handover Protocol</p>
                  </div>
                </div>
                <p className="text-xs text-cx-400 leading-relaxed">
                  Every trade happens inside verified college grounds. Inspect the item together before completing the exchange.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cx-900 border border-cx-800 rounded-xl p-5 space-y-2">
                  <Users className="w-5 h-5 text-cx-300" />
                  <div className="text-lg font-bold text-cx-0">12,000+</div>
                  <div className="text-xs font-mono text-cx-500">Verified Students</div>
                </div>
                <div className="bg-cx-900 border border-cx-800 rounded-xl p-5 space-y-2">
                  <Zap className="w-5 h-5 text-cx-300" />
                  <div className="text-lg font-bold text-cx-0">45+ Campuses</div>
                  <div className="text-xs font-mono text-cx-500">Across India</div>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HOW IT WORKS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-cx-900/30 border-y border-cx-800">
        <Container size="xl">
          <div className="text-center mb-16 space-y-3">
            <span className="font-mono text-xs text-cx-500 uppercase tracking-widest block">SIMPLE PROCESS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-cx-0 tracking-tight uppercase">
              HOW IT WORKS
            </h2>
            <p className="text-sm text-cx-400 max-w-xl mx-auto leading-relaxed">
              From sign-up to successful exchange — getting started takes less than two minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative group">
                  {/* Connector line */}
                  {idx < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden xl:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-cx-700 to-transparent z-0 -translate-y-px" />
                  )}
                  <div className="relative z-10 bg-cx-950 border border-cx-800 hover:border-cx-600 rounded-2xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-cx-900 border border-cx-750 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-cx-0" />
                      </div>
                      <span className="font-mono text-3xl font-bold text-cx-800 leading-none">{step.step}</span>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-cx-500 mb-1">{step.label}</div>
                      <h3 className="text-base font-bold text-cx-0 mb-2">{step.title}</h3>
                      <p className="text-xs text-cx-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CATEGORY GRID
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-cx-950">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs text-cx-500 uppercase tracking-widest block">BROWSE BY CATEGORY</span>
              <h2 className="text-3xl font-extrabold text-cx-0 tracking-tight uppercase">POPULAR CATEGORIES</h2>
            </div>
            <button
              onClick={() => onNavigate('/marketplace')}
              className="text-xs font-mono text-cx-400 hover:text-cx-0 flex items-center space-x-1.5 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => onNavigate(`/marketplace?category=${cat.id}`)}
                  className="bg-cx-900 border border-cx-800 hover:border-cx-600 rounded-xl p-5 text-left transition-all duration-200 group hover:-translate-y-1 space-y-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-cx-850 border border-cx-750 flex items-center justify-center text-cx-0 group-hover:bg-cx-0 group-hover:text-cx-950 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-cx-0">{cat.name}</h3>
                    <p className="text-[11px] font-mono text-cx-500 mt-0.5">{cat.count}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MARKETPLACE PREVIEW
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-cx-900/30 border-y border-cx-800">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs text-cx-500 uppercase tracking-widest block">LIVE LISTINGS</span>
              <h2 className="text-3xl font-extrabold text-cx-0 tracking-tight uppercase">MARKETPLACE PREVIEW</h2>
            </div>
            <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={() => onNavigate('/marketplace')}>
              Browse All Listings
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PREVIEW_LISTINGS.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('/marketplace')}
                className="group bg-cx-950 border border-cx-800 hover:border-cx-600 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden h-44">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cx-950/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-cx-950/90 border border-cx-700 px-2 py-0.5 rounded font-mono text-[10px] text-cx-300 uppercase">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-cx-900/90 border border-cx-700 px-2 py-0.5 rounded font-mono text-[10px] text-cx-400">
                      {item.condition}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold text-cx-0 leading-snug line-clamp-2 group-hover:text-cx-0">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-cx-0">{formatINR(item.price)}</span>
                    <ChevronRight className="w-4 h-4 text-cx-500 group-hover:text-cx-0 transition-colors" />
                  </div>
                  <div className="flex items-center space-x-1.5 pt-1 border-t border-cx-800">
                    <MapPin className="w-3 h-3 text-cx-500 shrink-0" />
                    <span className="text-[11px] font-mono text-cx-500 truncate">{item.college}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FINAL CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 bg-cx-950 overflow-hidden">
        <HeroParticles className="absolute inset-0 w-full h-full opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-cx-950/50 via-cx-950/30 to-cx-950/80 pointer-events-none" />
        <Container size="xl" className="relative z-10 text-center space-y-8">
          <span className="font-mono text-xs text-cx-500 uppercase tracking-widest block">GET STARTED TODAY</span>
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-cx-0 tracking-tighter uppercase leading-tight">
            FIND IT ON CAMPUS.
          </h2>
          <p className="text-base text-cx-400 max-w-xl mx-auto leading-relaxed">
            Your next book, device, monitor or hostel essential could already be a few minutes away — listed by a student just like you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => onNavigate('/marketplace')}
            >
              Explore CampusXchange
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('/dashboard/listings/create')}
            >
              Sell an Item
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 pt-4 font-mono text-xs text-cx-600">
            <span>FREE TO JOIN</span>
            <span className="w-px h-3 bg-cx-800 hidden sm:block" />
            <span>COLLEGE VERIFIED</span>
            <span className="w-px h-3 bg-cx-800 hidden sm:block" />
            <span>ZERO COMMISSIONS</span>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

      {/* Mobile Bottom Nav */}
      <MobileBottomNav currentPath="/" onNavigate={onNavigate} />

    </div>
  );
};
