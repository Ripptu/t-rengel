import React, { useEffect, useRef, useState, ReactNode } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronDown, 
  Phone, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Award, 
  Check, 
  Shield, 
  Settings, 
  Activity, 
  CheckCircle,
  HelpCircle,
  FileText,
  UserCheck
} from 'lucide-react';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { CinematicHero } from '@/components/ui/cinematic-landing-hero';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import PriceCalculator from './components/PriceCalculator';
import LocalMapSection from './components/LocalMapSection';

// TÜRENGEL Logo: An elegant high-contrast locksmith wing and typographic symbol
function TurengelLogo({ className = "h-5 text-neutral-900" }: { className?: string }) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img src="https://s1.directupload.eu/images/260620/v3lo3c5m.png" alt="Türengel Logo" className="h-[40px] md:h-[50px] w-auto object-contain" referrerPolicy="no-referrer" />
    </div>
  );
}

// Reveal: Motion wrapper for cinematic viewport fade-in
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// NavItem: Clean, minimalist transition link like Apple's header
interface NavItemProps {
  text: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function NavItem({ text, href = "#", onClick }: NavItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-neutral-600 hover:text-[#2563EB] text-[11px] font-bold tracking-widest transition-all duration-300 uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#2563EB] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
    >
      {text}
    </a>
  );
}

// CTA Button: Beautiful minimalist pill button with scale and sliding arrow micro-interactions
interface CTAButtonProps {
  text: string;
  variant?: "dark" | "light" | "accent";
}

function CTAButton({ text, variant = "dark" }: CTAButtonProps) {
  let btnClasses = "";
  if (variant === "light") {
    btnClasses = "bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-50 hover:border-neutral-300 shadow-sm";
  } else if (variant === "accent") {
    btnClasses = "bg-[#2563EB] border-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-[0_4px_20px_rgba(37,99,235,0.15)]";
  } else {
    btnClasses = "bg-neutral-950 border-neutral-950 text-white hover:bg-neutral-850 shadow-[0_4px_24px_rgba(0,0,0,0.06)]";
  }

  return (
    <div
      className={`group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full transition-all duration-300 border cursor-pointer select-none font-sans font-bold text-xs tracking-widest uppercase hover:scale-[1.03] active:scale-[0.97] ${btnClasses}`}
    >
      <span>{text}</span>
      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5 shrink-0 text-current" />
    </div>
  );
}

// Stateful FAQ Item component with elegant motion height transitions
interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal delay={index * 0.05}>
      <div 
        className="border-b border-neutral-200/60 last:border-b-0 w-full"
        id={`faq-item-${index}`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] group select-none cursor-pointer"
          aria-expanded={isOpen}
        >
          <span className="font-sans text-[15px] md:text-base font-bold text-neutral-800 group-hover:text-[#2563EB] transition-colors duration-200">
            {question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-400 group-hover:text-neutral-900 shrink-0 ml-4 transition-colors duration-200"
          >
            <ChevronDown className="w-4 h-4 md:w-5 h-5" />
          </motion.div>
        </button>
        
        <motion.div
          initial={false}
          animate={{ 
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="pb-5 text-[13px] md:text-sm text-neutral-600 leading-relaxed font-normal font-sans pr-6">
            {answer}
          </p>
        </motion.div>
      </div>
    </Reveal>
  );
}

// Route parsing helpers
function parseCityName(segment: string): string {
  if (!segment || segment.toLowerCase() === 'index.html' || segment.toLowerCase() === 'home' || segment.toLowerCase() === 'index') {
    return 'Essen';
  }
  try {
    const decoded = decodeURIComponent(segment).trim();
    return decoded
      .split(/[\s_-]+/)
      .map(word => {
        if (!word) return '';
        if (['an', 'der', 'am', 'im', 'in'].includes(word.toLowerCase())) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  } catch {
    return 'Essen';
  }
}

function getRouteInfo() {
  if (typeof window === 'undefined') {
    return { page: 'home' as const, city: 'Essen' };
  }
  const path = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '').toLowerCase();
  const hash = window.location.hash.toLowerCase();

  const segments = path ? path.split('/') : [];
  
  let page: 'home' | 'impressum' | 'datenschutz' = 'home';
  let cityNormalized = 'Essen';

  if (segments.length === 0) {
    if (hash === '#terms') page = 'impressum';
    else if (hash === '#privacy') page = 'datenschutz';
    else page = 'home';
  } else if (segments.length === 1) {
    const first = segments[0];
    if (first === 'impressum' || hash === '#terms') {
      page = 'impressum';
    } else if (first === 'datenschutz' || hash === '#privacy') {
      page = 'datenschutz';
    } else {
      cityNormalized = parseCityName(first);
      if (hash === '#terms') page = 'impressum';
      else if (hash === '#privacy') page = 'datenschutz';
      else page = 'home';
    }
  } else if (segments.length >= 2) {
    const first = segments[0];
    const second = segments[1];
    cityNormalized = parseCityName(first);
    if (second === 'impressum') {
      page = 'impressum';
    } else if (second === 'datenschutz') {
      page = 'datenschutz';
    }
  }

  return { page, city: cityNormalized };
}

export default function App() {
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 400, 700], [0, 0, -150]);

  const [currentPage, setCurrentPage] = useState<'home' | 'impressum' | 'datenschutz'>(() => {
    return getRouteInfo().page;
  });
  const [city, setCity] = useState<string>(() => {
    return getRouteInfo().city;
  });
  const [showStickyCall, setShowStickyCall] = useState(false);

  const navigateTo = (page: 'home' | 'impressum' | 'datenschutz', targetCity?: string) => {
    const currentCity = targetCity || city;
    let newPath = '';
    
    if (page === 'home') {
      if (currentCity.toLowerCase() === 'essen') {
        newPath = '/';
      } else {
        newPath = `/${currentCity.toLowerCase()}`;
      }
    } else {
      if (currentCity.toLowerCase() === 'essen') {
        newPath = `/${page}`;
      } else {
        newPath = `/${currentCity.toLowerCase()}/${page}`;
      }
    }
    
    try {
      window.history.pushState(null, '', newPath);
    } catch (e) {
      console.warn('Failed to pushState in sandbox/iframe:', e);
    }
    setCurrentPage(page);
    if (targetCity) {
      setCity(targetCity);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleNavSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    navigateTo('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  useEffect(() => {
    const handlePopState = () => {
      const { page, city: newCity } = getRouteInfo();
      setCurrentPage(page);
      setCity(newCity);
    };

    const handleHash = () => {
      const hash = window.location.hash;
      const { page, city: newCity } = getRouteInfo();
      
      if (page !== currentPage) {
        setCurrentPage(page);
      }
      if (newCity !== city) {
        setCity(newCity);
      }

      if (hash.startsWith('#') && hash.length > 1) {
        if (hash !== '#terms' && hash !== '#privacy' && hash !== '#privacy-policy') {
          setCurrentPage('home');
          setTimeout(() => {
            const id = hash.substring(1);
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHash);

    if (window.location.hash) {
      handleHash();
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHash);
    };
  }, [currentPage, city]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyCall(true);
      } else {
        setShowStickyCall(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    let lenis: any = null;
    let rafId: number | null = null;

    const initLenis = () => {
      if (mediaQuery.matches) {
        if (!lenis) {
          const LenisConstructor = (Lenis as any).default || Lenis;
          lenis = new LenisConstructor({ lerp: 0.1 });
          const raf = (time: number) => {
            lenis?.raf(time);
            rafId = requestAnimationFrame(raf);
          };
          rafId = requestAnimationFrame(raf);
        }
      } else {
        if (lenis) {
          lenis.destroy();
          lenis = null;
          if (rafId) cancelAnimationFrame(rafId);
        }
      }
    };

    initLenis();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', initLenis);
    } else if (mediaQuery.addListener) {
      (mediaQuery as any).addListener(initLenis);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', initLenis);
      } else if (mediaQuery.removeListener) {
        (mediaQuery as any).removeListener(initLenis);
      }
      if (lenis) {
        lenis.destroy();
        if (rafId) cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Brand logos for the slider with their visual dimensions / aspects
  const brandLogos = [
    { name: "DOM Security", url: "https://vectorseek.com/wp-content/uploads/2024/02/Dom-Logo-Vector.svg--300x209.png" },
    { name: "IKON ASSA ABLOY", url: "https://shop-fuer-sicherheit.de/media/image/79/ff/1c/70015_ikon_logo.png" },
    { name: "BASI", url: "https://basi.eu/wp-content/uploads/2019/01/basi-logo-130x156.jpg" },
    { name: "EVVA", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/EVVA-Logo.svg/3840px-EVVA-Logo.svg.png" },
    { name: "BKS", url: "https://www.bks.de/static/logo/bks.svg" },
    { name: "ABUS Security Tech Germany", url: "https://upload.wikimedia.org/wikipedia/commons/6/61/ABUS_Logo.svg" },
  ];

  return (
    <div className="relative min-h-screen bg-neutral-50 font-sans text-neutral-900 overflow-x-hidden antialiased selection:bg-[#2563EB] selection:text-white">
      
      {/* 1. Fixed Premium Light Background with Subtle Spotlights */}
      <div className="fixed inset-0 z-0 bg-[#FAFAF9] overflow-hidden pointer-events-none">
        {/* Subtle decorative mesh gradients for elite premium feel */}
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-neutral-200/40 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[55%] h-[55%] rounded-full bg-[#2563EB]/5 blur-[150px]" />
        {/* Crisp minimal architectural grid pattern */}
        <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* 2. Fixed Animated Header */}
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: headerY }}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-5xl pointer-events-auto"
      >
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-md border border-neutral-200/50 rounded-full px-6 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
          {/* Left: Branding */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home');
            }}
            className="flex items-center hover:opacity-90 transition-all"
          >
            <TurengelLogo className="h-5" />
          </a>

          {/* Center/Right: Apple Minimal Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <nav className="flex items-center gap-8">
              <NavItem text="Preise" href="#preise" onClick={(e) => handleNavSectionClick(e, 'preise')} />
              <NavItem text="Dienstleistungen" href="#leistungen" onClick={(e) => handleNavSectionClick(e, 'leistungen')} />
              <NavItem text="Sicherheitnotdienst" href="#vorteile" onClick={(e) => handleNavSectionClick(e, 'vorteile')} />
              <NavItem text="Häufige Fragen" href="#faq" onClick={(e) => handleNavSectionClick(e, 'faq')} />
              <NavItem text="Verfügbarkeit" href="#gebiete" onClick={(e) => handleNavSectionClick(e, 'gebiete')} />
            </nav>
            <a 
              href="tel:+491776721642" 
              className="bg-neutral-950 hover:bg-[#2563EB] text-white px-5 py-2.5 rounded-full font-sans text-[11px] font-bold tracking-widest hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 uppercase select-none cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>0177 6721642</span>
            </a>
          </div>

          {/* Mobile Direct Call Panel */}
          <div className="lg:hidden flex items-center gap-2">
            <a 
              href="tel:+491776721642" 
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-1.5 rounded-full font-sans text-[10px] font-extrabold tracking-widest hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 uppercase flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-white" />
              <span>NOTRUF</span>
            </a>
          </div>
        </div>
      </motion.header>

      {/* 3. Static/Scrollable content layer */}
      <main className="relative z-10 pointer-events-auto">

        {currentPage === 'home' && (
          <>
            {/* CINEMATIC HERO SEQUENCE */}
            <CinematicHero 
              tagline1={
                <>
                  <span className="block mb-2">Türengel</span>
                  <span className="block text-2xl md:text-[3.8rem] lg:text-[4.5rem] font-bold tracking-tight text-neutral-800 leading-none mt-2">
                    Schlüsseldienst &amp; Schlüsselnotdienst in {city}
                  </span>
                </>
              }
              tagline2="Türöffnung ab 69 € Festpreis"
              cardHeading="Schnell, fair & zum Festpreis."
              cardDescription={`Als zuverlässiger und ortsansässiger Schlüsselnotdienst und Schlüsseldienst in ${city} und dem gesamten Ruhrgebiet bieten wir sofortige, materialschonende Türöffnungen, professionelles Schlosswechsel-Service und Einbruchschutz-Beratung rund um die Uhr. Unser Versprechen: Eine zerstörungsfreie Türöffnung ab 69 € Festpreis inklusive Mehrwertsteuer – 24 Std. express für Sie erreichbar, kompetent, ohne Callcenter-Abzocke und in 15 bis 30 Minuten direkt bei Ihnen vor Ort.`}
              ctaHeading="Ihr Aufsperrnotdienst."
              ctaDescription={`Schnelle Hilfe in ${city} und Umgebung bei Schlüsselverlust, defektem Schloss oder ausgesperrter Wohnungstür. Wir garantieren eine fachmännische und 100% zerstörungsfreie Türöffnung zum fairen, transparenten Festpreis – ganz ohne Callcenter-Abzocke, dubiose Vermittler oder unfaire Feiertags-Aufschläge. Wir sind in 15 bis 30 Minuten eilig und einsatzbereit bei Ihnen in ${city}.`}
            />

        {/* NEW SECTION 2: WEICH AUSBLENDENDER LOGO SLIDER */}
        <section className="w-full py-6 bg-white/70 border-y border-neutral-200/50 backdrop-blur-sm relative overflow-hidden select-none">
          <div className="relative h-[80px] md:h-[100px] w-full overflow-hidden flex items-center">
            {/* Elegant fade to white at left and right edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-neutral-50 via-neutral-50/80 to-transparent pointer-events-none z-20" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-neutral-50 via-neutral-50/80 to-transparent pointer-events-none z-20" />

            <InfiniteSlider 
              className="flex h-full w-full items-center" 
              duration={30}
              gap={80}
            >
              {brandLogos.map((brand, idx) => (
                <div 
                  key={`${brand.name}-${idx}`} 
                  className="flex w-40 items-center justify-center h-12 md:h-16 shrink-0 px-2"
                >
                  <img
                    src={brand.url}
                    alt={brand.name}
                    title={brand.name}
                    className="h-8 md:h-12 w-auto object-contain max-w-[140px] opacity-60 hover:opacity-100 transition-all duration-300 filter grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </section>

        {/* NEW SECTION 3: "UNSERE PREISE" TABLE / SECTION */}
        <section className="w-[92%] max-w-5xl mx-auto py-16 md:py-24" id="preise">
          <Reveal delay={0.1} className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] leading-tight font-extrabold tracking-tight text-neutral-950 mb-4">
              Günstige Schlüsseldienst Preise &amp; Türöffnung Festpreis Essen im Jahr 2026
            </h2>
            <p className="text-[13px] md:text-[14px] text-neutral-500 font-light leading-relaxed mb-6">
              Als ehrlicher Schlüsselnotdienst legen wir Wert auf vollkommene Preistransparenz. Um böse Überraschungen oder die gefürchtete Abzocke im Schlüsseldienst-Gewerbe zu vermeiden, stimmen wir alle anfallenden Kosten und Fahrtkosten vor Beginn der Arbeiten verbindlich ab.
            </p>
            
            {/* Attention Note in Blue Banner */}
            <div className="mt-6 p-4 rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/15 text-left md:text-center shadow-sm">
              <p className="text-[12px] md:text-[13px] text-neutral-800 leading-relaxed font-medium">
                <span className="text-[#2563EB] font-bold uppercase mr-1.5">[!] Wichtiger Hinweis:</span>
                Seien Sie skeptisch bei Angeboten wie „Türöffnung ab 20 €“, da es sich häufig um Lockpreise handelt. Ein seriöser Partner klärt Sie sofort auf.
              </p>
            </div>
          </Reveal>

          {/* Three price items shown clearly in cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Mon-Fri Day */}
            <Reveal delay={0.15}>
              <div className="bg-white border border-neutral-200/60 rounded-2xl p-8 hover:border-neutral-300 hover:shadow-md transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-neutral-400 group-hover:bg-[#2563EB] transition-colors" />
                <span className="font-mono text-[10px] text-neutral-400 block mb-2 font-bold uppercase">WERKTAGS (TAG)</span>
                <h4 className="text-sm font-extrabold text-neutral-900 font-sans mb-1">Montag - Freitag</h4>
                <p className="text-xs text-neutral-500 font-light mb-8">8:00 - 18:00 Uhr</p>
                
                <div className="flex items-baseline gap-1 mt-auto">
                  <span className="text-5xl font-extrabold tracking-tight font-mono text-neutral-950">69€</span>
                  <span className="text-xs text-neutral-400 font-medium ml-1">inkl. MwSt.</span>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Mon-Fri Night */}
            <Reveal delay={0.2}>
              <div className="bg-white border border-neutral-200/60 rounded-2xl p-8 hover:border-[#2563EB] hover:shadow-lg transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#2563EB]" />
                <div className="absolute top-4 right-4 bg-[#2563EB]/10 text-[#2563EB] font-mono text-[9px] font-bold px-2 py-0.5 rounded-full">POPULÄR</div>
                <span className="font-mono text-[10px] text-[#2563EB] block mb-2 font-bold uppercase">WERKTAGS (NACHT)</span>
                <h4 className="text-sm font-extrabold text-neutral-900 font-sans mb-1">Montag - Freitag</h4>
                <p className="text-xs text-neutral-500 font-light mb-8 font-semibold">18:00 - 8:00 Uhr (Nachtnotdienst)</p>
                
                <div className="flex items-baseline gap-1 mt-auto">
                  <span className="text-5xl font-extrabold tracking-tight font-mono text-[#2563EB]">99€</span>
                  <span className="text-xs text-neutral-400 font-medium ml-1">inkl. MwSt.</span>
                </div>
              </div>
            </Reveal>

            {/* Card 3: Weekend */}
            <Reveal delay={0.25}>
              <div className="bg-white border border-neutral-200/60 rounded-2xl p-8 hover:border-neutral-300 hover:shadow-md transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-neutral-950 group-hover:bg-[#2563EB] transition-colors" />
                <span className="font-mono text-[10px] text-neutral-400 block mb-2 font-bold uppercase">FEIERTAG &amp; WOCHENENDE</span>
                <h4 className="text-sm font-extrabold text-neutral-900 font-sans mb-1">Samstag und Sonntag</h4>
                <p className="text-xs text-neutral-500 font-light mb-8">24 Std. besetzt</p>
                
                <div className="flex items-baseline gap-1 mt-auto">
                  <span className="text-5xl font-extrabold tracking-tight font-mono text-neutral-950">99€</span>
                  <span className="text-xs text-neutral-400 font-medium ml-1">inkl. MwSt.</span>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Interactive Cost Estimator for SEO & local conversions */}
          <Reveal delay={0.28} className="mt-12">
            <PriceCalculator />
          </Reveal>

          {/* Pricing disclaimer */}
          <Reveal delay={0.3} className="text-center mt-8">
            <p className="text-[12px] text-neutral-500 leading-normal max-w-3xl mx-auto font-light">
              Bei beschädigten Türschlössern, verschlossenen Türen oder besonders aufwendigen Arbeiten können die Preise variieren. Die Kosten für An- und Abfahrt erfragen Sie bitte telefonisch. Stand: 01.03.2026.
            </p>
          </Reveal>
        </section>

        {/* SECTION 4: "WAS KÖNNEN SIE TUN" GRID */}
        <section className="w-[92%] max-w-5xl mx-auto py-16 md:py-24 border-t border-neutral-200/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text left */}
            <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
              <Reveal delay={0.1}>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950 font-sans">
                  Was können Sie tun, wenn Ihnen in Essen die Tür zugefallen ist? Erste Hilfe vom Schlüsselnotdienst
                </h3>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="text-[14px] text-neutral-600 leading-relaxed font-normal">
                  Wenn in Essen die Tür zugefallen ist und der Schlüssel von innen steckt oder in der Wohnung liegt, ist der erste Impuls oft Stress oder gar Panik. Versuchen Sie unbedingt ruhig zu bleiben und voreilige Selbstversuche zu vermeiden, da diese die Türzarge oder das Schloss nachhaltig beschädigen können. In fast 99% aller Fälle kann eine fachgerechte Türöffnung vollkommen zerstörungsfrei und extrem schnell erledigt werden. Ein erfahrener Schlüsselnotdienst Essen weiß genau, welche materialschonenden Spezialwerkzeuge eingesetzt werden können, um Sie schadensfrei wieder in Ihre Wohnung zu lassen.
                </p>
                <p className="text-[14px] text-neutral-600 leading-relaxed font-normal mt-3">
                  Wichtig ist für Sie als Betroffene, dass Sie direkt einen seriösen und ortsansässigen Experten kontaktieren und nach einem garantierten Schlüsseldienst Essen Festpreis fragen. Ein qualifizierter, vertrauenswürdiger Aufsperrdienst erklärt Ihnen den geplanten Ablauf bereits am Telefon transparent Schritt für Schritt. Dadurch behalten Sie in dieser Ausnahmesituation stets die volle Budgetkontrolle über alle anfallenden Kosten und können darauf vertrauen, dass keine dubiosen Zusatzgebühren verlangt werden.
                </p>
              </Reveal>

              {/* Bullet checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                <Reveal delay={0.2} className="flex gap-2.5 items-start">
                  <div className="p-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[13px] text-neutral-700 font-medium">Ruhe bewahren &amp; Standort sichern</span>
                </Reveal>
                <Reveal delay={0.22} className="flex gap-2.5 items-start">
                  <div className="p-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[13px] text-neutral-700 font-medium">Möglichen Zweitschlüssel prüfen</span>
                </Reveal>
                <Reveal delay={0.24} className="flex gap-2.5 items-start">
                  <div className="p-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[13px] text-neutral-700 font-medium">Schlüsseldienst direkt kontaktieren</span>
                </Reveal>
                <Reveal delay={0.26} className="flex gap-2.5 items-start">
                  <div className="p-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[13px] text-neutral-700 font-medium">Festpreis vor Arbeitsbeginn klären</span>
                </Reveal>
              </div>

              <Reveal delay={0.3} className="pt-2">
                <a href="tel:+491776721642">
                  <CTAButton text={`DIREKT HILFE IN ${city.toUpperCase()} RUFEN`} variant="dark" />
                </a>
              </Reveal>
            </div>

            {/* Image right */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
              <Reveal delay={0.2} className="w-full">
                <div className="relative p-2.5 bg-white border border-neutral-200/60 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.02)] scale-[1.01] overflow-hidden group">
                  <div className="absolute inset-0 bg-neutral-900/5 hover:bg-transparent transition-all z-10 pointer-events-none" />
                  <img 
                    src="https://schluesseldienst-sarfeld.de/wp-content/uploads/2023/05/Schloss-oeffnen.jpg" 
                    alt="Schlüsseldienst Türengel Essen - Zerstörungsfreie Türöffnung einer zugefallenen Wohnungstür vor Ort in Essen" 
                    width={480}
                    height={360}
                    loading="lazy"
                    className="w-full h-auto rounded-2xl object-cover aspect-[4/3] sm:aspect-video lg:aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* SECTION 5: "WEITERE DIENSTLEISTUNGEN" BENTO-LIKE GRID */}
        <section className="w-[92%] max-w-5xl mx-auto py-16 md:py-24 border-t border-neutral-200/40" id="leistungen">
          <Reveal delay={0.1} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] leading-tight font-extrabold tracking-tight text-neutral-950 mb-3">
              Professioneller Schlüsseldienst Essen: Unsere weiteren Aufsperrdienste &amp; Leistungen im Ruhrgebiet
            </h2>
            <p className="text-[13px] md:text-[14px] text-neutral-500 font-light leading-relaxed">
              Als Ihr moderner und vielseitiger Schlüsseldienst Essen helfen wir Ihnen kompetent bei jedem erdenklichen Problem im Bereich der Schließtechnik, Zylinderreparatur und des Objektschutzes. Unsere mobilen Einsatzkräfte sind rund um die Uhr bestens geschult und ausgerüstet, um weitaus mehr als nur klassische, zerstörungsfreie Türöffnungen durchzuführen. Im Folgenden finden Sie einen Einblick in unsere typischen Fachleistungen für Privat- und Gewerbekunden in der gesamten Region:
            </p>
          </Reveal>

          {/* 4 Column layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Col 1: Autoöffnung */}
            <Reveal delay={0.15}>
              <div className="bg-white border border-neutral-200/50 rounded-2xl p-6 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mb-5 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-neutral-950 mb-4">Autoöffnung</h4>
                <ul className="flex flex-col gap-2.5 font-sans justify-end mt-auto text-xs text-neutral-600">
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> verschlossene Autotüren</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> KFZ Türen</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> PKW Türen</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Auto-Dachboxen</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Kofferräume</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Motorradschlösser</li>
                </ul>
              </div>
            </Reveal>

            {/* Col 2: Briefkasten */}
            <Reveal delay={0.2}>
              <div className="bg-white border border-neutral-200/50 rounded-2xl p-6 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mb-5 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-neutral-950 mb-4">Briefkastenöffnung</h4>
                <ul className="flex flex-col gap-2.5 font-sans justify-end mt-auto text-xs text-neutral-600">
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Briefkastenöffnung</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Briefkasten-Schlosswechsel</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Schlösser bekannter Marken</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Schlosswechsel bei Renz</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Schlosswechsel bei Ju</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Schlosswechsel Burg Wächter</li>
                </ul>
              </div>
            </Reveal>

            {/* Col 3: Tresore */}
            <Reveal delay={0.25}>
              <div className="bg-white border border-neutral-200/50 rounded-2xl p-6 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mb-5 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-neutral-950 mb-4">Tresore</h4>
                <ul className="flex flex-col gap-2.5 font-sans justify-end mt-auto text-xs text-neutral-600">
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Tresoröffnungen aller Art</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Safes &amp; Geldschränke</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Wand- &amp; Privat-Tresore</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Stand- &amp; Dokumententresore</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Elektronisch verschlüsselte Safes</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Möbeltresore &amp; Geldkassetten</li>
                </ul>
              </div>
            </Reveal>

            {/* Col 4: Garagen */}
            <Reveal delay={0.3}>
              <div className="bg-white border border-neutral-200/50 rounded-2xl p-6 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mb-5 shrink-0">
                  <Settings className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-neutral-950 mb-4">Garagenöffnung</h4>
                <ul className="flex flex-col gap-2.5 font-sans justify-end mt-auto text-xs text-neutral-600">
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Garagenöffnungen</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Garagen-Schlossaustausch</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Schlossaustausch beim Wandschalter</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Unterputz Schlüsselschalter</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Aufputz Schlüsselschalter</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#2563EB] text-[13px] font-bold">+</span> Extraction Schlüsselbruchstück</li>
                </ul>
              </div>
            </Reveal>

          </div>
        </section>

        {/* INTERACTIVE SEO-CORE SPECIALTIES SECTION (Addressing Keyword Gaps reported in SEO Audit) */}
        <section className="w-[92%] max-w-5xl mx-auto py-16 md:py-24 border-t border-neutral-200/40" id="spezialgebiete">
          <Reveal delay={0.1} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] leading-tight font-extrabold tracking-tight text-neutral-950 mb-3">
              Fachbetrieb für Sicherheitstechnik, zerstörungsfreie Türöffnung &amp; Einbruchschutz
            </h2>
            <p className="text-[13px] md:text-[14px] text-neutral-500 font-light leading-relaxed">
              Als qualifizierter und weithin empfohlener Schlüsseldienst in Essen decken wir alle relevanten Services rund um Ihre Schlüssel, Türen, Schließzylinder und Sicherheitsanlagen kompetent, materialschonend und transparent ab. Hier finden Sie detaillierte Informationen zu unseren vier Kern-Dienstleistungen:
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            
            {/* Card 1: Non-destructive opening costs */}
            <Reveal delay={0.15}>
              <div className="bg-white border border-neutral-200/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 relative group overflow-hidden flex flex-col justify-between min-h-[250px]">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold text-sm">1</span>
                    <h3 className="text-lg font-black tracking-tight text-neutral-950">{`Türöffnungen in ${city}`}</h3>
                  </div>
                  <p className="text-[13px] text-neutral-600 leading-relaxed font-normal">
                    Wie viel kostet die professionelle <strong className="font-bold text-neutral-900">{`Türöffnung in ${city}`}</strong> für eine zugefallene Haustür oder Wohnungstür? Wir setzen auf lückenlose und ehrliche Preistransparenz: Bei Türengel erhalten Sie eine schnelle, materialschonende Türöffnung oder Schlüsselnotdienst-Hilfe werktags tagsüber bereits ab unschlagbaren <strong className="font-bold text-neutral-900">69 € inklusive Mehrwertsteuer</strong>. Es gibt keinerlei versteckte Nebenkosten oder dubiose Vermittler-Zuschläge – jeder Preis wird vor Beginn abgesprochen.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium font-mono">100% zerstörungsfreie Garantie</span>
                  <a href="#preise" className="text-xs text-[#2563EB] font-bold hover:underline">Preise einsehen &rarr;</a>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Safe lock replacement apartment door */}
            <Reveal delay={0.2}>
              <div className="bg-white border border-neutral-200/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 relative group overflow-hidden flex flex-col justify-between min-h-[250px]">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold text-sm">2</span>
                    <h3 className="text-lg font-black tracking-tight text-neutral-950">{`Schlosswechsel & Einbruchschutz in ${city}`}</h3>
                  </div>
                  <p className="text-[13px] text-neutral-600 leading-relaxed font-normal">
                    Wann sollten Sie das Türschloss oder den Schließzylinder austauschen lassen an Ihrer Wohnungstür? Bei akutem Schlüsselverlust, dem Einzug in eine neue Immobilie oder einem bereits hakenden Zylinder ist schnelles Handeln zum Schutz Ihrer Privatsphäre unverzichtbar. Unser ausgebildeter Schlüsseldienst Essen führt den Schlosswechsel absolut fachmännisch durch und verbaut ausschließlich geprüfte Sicherheitszylinder und Schutzbeschläge führender deutscher Markenhersteller (Sicherheitsklasse ABUS, DOM, BKS).
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium font-mono">Zylinder- &amp; Schlossberatung</span>
                  <a href="tel:+491776721642" className="text-xs text-[#2563EB] font-bold hover:underline">Jetzt beraten &rarr;</a>
                </div>
              </div>
            </Reveal>

            {/* Card 3: Car lockout nearby */}
            <Reveal delay={0.25}>
              <div className="bg-white border border-neutral-200/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 relative group overflow-hidden flex flex-col justify-between min-h-[250px]">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold text-sm">3</span>
                    <h3 className="text-lg font-black tracking-tight text-neutral-950">{`Autoöffnung für ${city}`}</h3>
                  </div>
                  <p className="text-[13px] text-neutral-600 leading-relaxed font-normal">
                    Ihr Autoschlüssel liegt versehentlich im verschlossenen Fahrzeug-Innenraum oder direkt im Kofferraum? Unser hochspezialisierter Sofortservice für eine zerstörungsfreie <strong className="font-bold text-neutral-900">{`Autoöffnung in ${city}`}</strong> operiert rasant im gesamten Stadtgebiet. We open PKWs, LKWs and rasant im gesamten Stadtgebiet. Wir öffnen PKWs, LKWs und Nutzfahrzeuge aller gängigen Marken vollkommen lackschonend über moderne Turbo-Decoder und Lishi-Werkzeuge ohne Kratzer an Karosserie, Lack oder Scheibendichtungen.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium font-mono">Schonende KFZ-Notöffnung</span>
                  <a href="tel:+491776721642" className="text-xs text-[#2563EB] font-bold hover:underline">Auto aufmachen &rarr;</a>
                </div>
              </div>
            </Reveal>

            {/* Card 4: Burglary protection assessment */}
            <Reveal delay={0.3}>
              <div className="bg-white border border-neutral-200/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 relative group overflow-hidden flex flex-col justify-between min-h-[250px]">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold text-sm">4</span>
                    <h3 className="text-lg font-black tracking-tight text-neutral-950">Einbruchschutz Beratung</h3>
                  </div>
                  <p className="text-[13px] text-neutral-600 leading-relaxed font-normal">
                    Wirksame Einbruchsprävention verhindert unbefugte Zutritte, bevor überhaupt ein Schaden an Ihrer Immobilie entsteht. Im Rahmen unserer fundierten und herstellerneutralen <strong className="font-bold text-neutral-900">Einbruchschutz Beratung in Essen</strong> analysieren wir Schwachstellen an Fenstern, Terrassentüren und Haupteingängen. Anschließend installieren wir robuste Querriegel, einbruchhemmende Panzerriegel, Stangenschlösser oder mechanische Zusatzsicherungen fachgerecht und sauber.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium font-mono">Sicherheits-Check vom Profi</span>
                  <a href="tel:+491776721642" className="text-xs text-[#2563EB] font-bold hover:underline">Termin vereinbaren &rarr;</a>
                </div>
              </div>
            </Reveal>

          </div>
        </section>

        {/* SECTION: EINSATZGEBIETE & VERFÜGBARKEITEN */}
        <section className="w-[92%] max-w-6xl mx-auto py-16 md:py-24 border-t border-neutral-200/40" id="gebiete">
          <Reveal delay={0.1} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] leading-tight font-extrabold tracking-tight text-neutral-950 mb-3">
              Unsere Einsatzgebiete &amp; Verfügbarkeiten in Essen und dem Ruhrgebiet
            </h2>
            <p className="text-[13px] md:text-[14px] text-neutral-500 font-light leading-relaxed">
              Als Ihr zuverlässiger lokaler Schlüsseldienst und Schlüsselnotdienst für Essen sind wir rund um die Uhr mit mehreren mobilen Monteuren im Einsatz. Dank strategisch verteilter Stützpunkte garantieren wir Ihnen extrem kurze Wartezeiten von 15 bis 30 Minuten in sämtlichen Essener Stadtteilen sowie im umliegenden Ruhrgebiet.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <LocalMapSection />
          </Reveal>
        </section>

        {/* SECTION 6: "WORAN ERKENNEN SIE EINEN FAIREN SCHLÜSSELDIENST" */}
        <section className="w-[100%] py-16 md:py-24 bg-neutral-900 text-white relative overflow-hidden" id="vorteile">
          {/* Subtle grid in background for content structure */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          <div className="w-[92%] max-w-5xl mx-auto">
            <Reveal delay={0.1} className="max-w-3xl mb-12">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {`Seriöser Partner: Woran erkennen Sie einen fairen Schlüsseldienst in ${city}?`}
              </h2>
              <p className="text-neutral-450 text-[13px] md:text-[14px] leading-relaxed font-light mt-3 text-neutral-400 font-sans">
                {`In der Schlüsseldienst-Branche machen sich viele verunsicherte Kunden verständlicherweise Sorgen vor betrügerischen Abzock-Methoden und explodierenden Kosten nach einer Notöffnung. Daher ist es ratsam, die Arbeitsweise eines Dienstleisters bereits vor Auftragserteilung genau zu hinterfragen. Ein seriöser Schlüsselnotdienst in ${city} zeichnet sich durch ehrliche Beratung am Telefon aus. Wir nennen Ihnen vorab eine realistische Spanne für Fahrtkosten und Arbeitsaufwand und garantieren Ihnen feste Konditionen ab 69 € für die einfache Türöffnung. Wir sprechen alle anfallenden Schritte vor Beginn transparent ab, um Ihnen absolute Sicherheit zu garantieren.`}
              </p>
            </Reveal>

            {/* Wichtige Punkte layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              
              {/* Item 1: Klare Preisinfo */}
              <Reveal delay={0.15}>
                <div className="bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 p-6 rounded-2xl h-full flex flex-col gap-3.5 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-[#2563EB]/15 text-[#2563EB] flex items-center justify-center shrink-0 font-bold font-mono text-[11px]">
                    €
                  </div>
                  <h4 className="text-sm font-extrabold text-white">Klare Preisinfo</h4>
                  <p className="text-[12px] text-neutral-400 leading-relaxed font-light mt-auto">
                    Fragen Sie nach dem Schlüsseldienst Preis. Ein guter, ehrlicher regionaler Anbieter nennt Ihnen direkt am Telefon eine realistische Spanne.
                  </p>
                </div>
              </Reveal>

              {/* Item 2: Lokaler Anbieter */}
              <Reveal delay={0.2}>
                <div className="bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 p-6 rounded-2xl h-full flex flex-col gap-3.5 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-[#2563EB]/15 text-[#2563EB] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <h4 className="text-sm font-extrabold text-white">Schnelle Anfahrtszeit</h4>
                  <p className="text-[12px] text-neutral-400 leading-relaxed font-light mt-auto">
                    {`Durchschnittliche Anfahrtszeit vor Ort in ${city} und allen angrenzenden Stadtteilen.`}
                  </p>
                </div>
              </Reveal>

              {/* Item 3: Schonende Öffnung */}
              <Reveal delay={0.25}>
                <div className="bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 p-6 rounded-2xl h-full flex flex-col gap-3.5 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-[#2563EB]/15 text-[#2563EB] flex items-center justify-center shrink-0">
                    <Settings className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <h4 className="text-sm font-extrabold text-[#2563EB]">Zerstörungsfreie Türöffnung</h4>
                  <p className="text-[12px] text-neutral-400 leading-relaxed font-light mt-auto">
                    {`Zerstörungsfreie Notöffnungen bei lediglich ins Schloss gefallenen Wohnungstüren durch unsere Profi-Techniker direkt in ${city}.`}
                  </p>
                </div>
              </Reveal>

              {/* Item 4: Verständliche Rechnung */}
              <Reveal delay={0.3}>
                <div className="bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 p-6 rounded-2xl h-full flex flex-col gap-3.5 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-[#2563EB]/15 text-[#2563EB] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <h4 className="text-sm font-extrabold text-white">Verständliche Rechnung</h4>
                  <p className="text-[12px] text-neutral-400 leading-relaxed font-light mt-auto">
                    Alle entstandenen Schlüsseldienst Kosten müssen auf der gedruckten oder digitalen Quittung transparent, sauber und verständlich aufgeschlüsselt sein.
                  </p>
                </div>
              </Reveal>

              {/* Item 5: Ruhig und Professionell */}
              <Reveal delay={0.35}>
                <div className="bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 p-6 rounded-2xl h-full flex flex-col gap-3.5 transition-all duration-300 lg:col-span-2">
                  <div className="w-8 h-8 rounded-full bg-[#2563EB]/15 text-[#2563EB] flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <h4 className="text-sm font-extrabold text-white">Rund um die Uhr erreichbar</h4>
                  <p className="text-[12px] text-neutral-400 leading-relaxed font-light mt-auto">
                    {`Echte Erreichbarkeit rund um die Uhr in ${city}. Kein anonymes Callcenter, sondern immer der direkte Draht zum Techniker vor Ort.`}
                  </p>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* SECTION 7: "WIE ENTSTEHEN DIE KOSTEN" GRID */}
        <section className="w-[92%] max-w-5xl mx-auto py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text column - Left */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal delay={0.1}>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950">
                  Kostenzusammensetzung: Wie entstehen die Schlüsseldienst Essen Preise für eine Türöffnung?
                </h2>
              </Reveal>

              <Reveal delay={0.15} className="flex flex-col gap-3">
                <p className="text-[14px] text-neutral-600 leading-relaxed font-normal">
                  Viele ausgesperrte Betroffene fragen sich vor beziehungsweise nach dem dringenden Notruf verständlicherweise, wie sich die Schlüsseldienst Preise im Einzelnen zusammensetzen. Die Entstehung der tatsächlichen Schlüsseldienst Kosten für Türöffnungen und Notdiensteinsätze in Essen hängt im Wesentlichen von verschiedenen, nachvollziehbaren Faktoren ab:
                </p>
                <p className="text-[14px] text-neutral-600 leading-relaxed font-normal">
                  Der erste und wichtigste Faktor ist die physische Beschaffenheit und der Zustand der versperrten Tür. Liegt lediglich eine zugefallene Wohnungstür vor, lässt sich diese fast immer ohne Beschädigung in wenigen Handgriffen durch den Schlüsselnotdienst Essen öffnen. Ein zweifach verriegeltes Schloss, Riegelbrüche oder eine elektronische Schließanlage hingegen verlangen den Einsatz von Bohrern und Zylinder-Fräsmaschinen, was naturgemäß einen höheren Arbeits- und Materialaufwand (z.B. Einbau eines neuen Ersatzschlosses) bedeutet.
                </p>
                <p className="text-[14px] text-neutral-600 leading-relaxed font-normal">
                  Darüber hinaus bestimmt die Tageszeit und der Wochentag den finalen Gesamtpreis. Einsätze während unserer regulären Geschäftszeiten an Werktagen sind besonders preiswert. Zu nächtlicher Stunde, am Wochenende oder an gesetzlichen Feiertagen fallen allgemein übliche Bereitschaftszuschläge an. Ein seriöser, kundenorientierter Schlüsseldienst in Essen bespricht sämtliche Faktoren jedoch direkt am Telefon mit Ihnen und klärt Sie fair und ehrlich auf, bevor der Einsatzwagen losfährt.
                </p>
              </Reveal>

              <Reveal delay={0.2} className="pt-2">
                <a href="tel:+491776721642">
                  <CTAButton text="ZUM KONKRETEN PREIS FRAGEN" variant="dark" />
                </a>
              </Reveal>
            </div>

            {/* Image column - Right (using pexels-jakubzerdzicki) */}
            <div className="lg:col-span-5 flex justify-center">
              <Reveal delay={0.2} className="w-full">
                <div className="relative p-2.5 bg-white border border-neutral-200/60 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.02)] overflow-hidden group">
                  <img 
                    src="https://www.assos-schluesselnotdienst.de/wp-content/uploads/2022/02/schluesselnotdienst-tueroeffnung-e1644311333479.jpg" 
                    alt="Schlüsseldienst Essen Preise - Faire und transparente Preisermittlung und Rechnungserstellung direkt vor Ort" 
                    width={480}
                    height={360}
                    loading="lazy"
                    className="w-full h-auto rounded-2xl object-cover aspect-[4/3] sm:aspect-video lg:aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* SECTION 8: "WANN SOLLTE EIN SCHLOSS AUSGETAUSCHT WERDEN" */}
        <section className="w-[92%] max-w-5xl mx-auto py-16 md:py-24 border-t border-neutral-200/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Column */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <Reveal delay={0.2} className="w-full">
                <div className="relative p-2.5 bg-white border border-neutral-200/60 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.02)] overflow-hidden group">
                  <img 
                    src="https://aktivschluesseldienst.de/wp-content/uploads/2023/10/aktiv-schluesseldienst_wechsel2-1024x683.jpeg" 
                    alt="Schlosswechsel Essen - Professioneller Zylinderaustausch und Einbruchschutz Beratung an der Wohnungstür" 
                    width={480}
                    height={360}
                    loading="lazy"
                    className="w-full h-auto rounded-2xl object-cover aspect-[4/3] sm:aspect-video lg:aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Reveal>
            </div>

            {/* Right Text Column */}
            <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
              <Reveal delay={0.1}>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950">
                  Zylindertausch &amp; Einbruchschutz: Wann sollte ein Türschloss in Essen gewechselt werden?
                </h2>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="text-[14px] text-neutral-600 leading-relaxed font-normal font-sans">
                  Bei manchen Haus- und Wohnungstüren reicht eine bloße materialschonende Türöffnung im Nachhinein schlichtweg nicht aus, um Ihre volle Haussicherheit zu gewährleisten. Wenn Ihr verbautes Türschloss bereits veraltet, extrem verschlissen, mechanisch defekt oder im Zuge eines Einbruchversuchs grob beschädigt worden ist, zahlt sich ein rascher Schlossaustausch oder Zylinderwechsel unmittelbar aus. Ein zeitgemäßer Sicherheitszylinder mit Bohrschutz und Sicherungskarte wehrt unbefugte Einwirkungsversuche effektiv ab und schützt Ihre Familie wie auch Ihr Hab und Gut verlässlich.
                </p>
                <p className="text-[14px] text-neutral-600 leading-relaxed font-normal mt-2 font-bold text-neutral-900 font-sans">
                  Häufige Gründe und Indikatoren für einen raschen, professionellen Schlosswechsel durch den Schlüsseldienst Essen:
                </p>
              </Reveal>

              {/* Reasons Grid Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <Reveal delay={0.2} className="p-4 bg-white border border-neutral-200/50 rounded-xl">
                  <span className="font-mono text-[11px] font-bold text-[#2563EB]">01 / VERLUST</span>
                  <h5 className="font-bold text-xs text-neutral-900 mt-1">Schlüssel verloren</h5>
                  <p className="text-[11px] text-neutral-500 mt-1">Gefahr durch unbefugten Fremdzugriff verhindern.</p>
                </Reveal>

                <Reveal delay={0.22} className="p-4 bg-white border border-neutral-200/50 rounded-xl">
                  <span className="font-mono text-[11px] font-bold text-[#2563EB]">02 / DEFEKT</span>
                  <h5 className="font-bold text-xs text-neutral-900 mt-1">Schloss hakt / ist defekt</h5>
                  <p className="text-[11px] text-neutral-500 mt-1">Das Aufschließen fällt zunehmend schwerer.</p>
                </Reveal>

                <Reveal delay={0.24} className="p-4 bg-white border border-neutral-200/50 rounded-xl">
                  <span className="font-mono text-[11px] font-bold text-[#2563EB]">03 / EINBRUCH</span>
                  <h5 className="font-bold text-xs text-neutral-900 mt-1">Nach Einbruchsversuch</h5>
                  <p className="text-[11px] text-neutral-500 mt-1">Zylinder oder Türbeschläge wurden manipuliert.</p>
                </Reveal>

                <Reveal delay={0.26} className="p-4 bg-white border border-neutral-200/50 rounded-xl">
                  <span className="font-mono text-[11px] font-bold text-[#2563EB]">04 / UPGRADE</span>
                  <h5 className="font-bold text-xs text-neutral-900 mt-1">Neue Sicherheitsanforderung</h5>
                  <p className="text-[11px] text-neutral-500 mt-1">Einbau modernerer Schlösser mit Bohrschutz.</p>
                </Reveal>
              </div>

              <Reveal delay={0.3} className="pt-2">
                <a href="tel:+491776721642">
                  <CTAButton text="ZYLINDERBERATUNG STARTEN" variant="dark" />
                </a>
              </Reveal>
            </div>

          </div>
        </section>

        {/* SECTION 9: INTERACTIVE BULLET TAGS KEYWORDS SECTION */}
        <section className="w-[92%] max-w-5xl mx-auto py-12 md:py-16 border-t border-neutral-200/45">
          <Reveal delay={0.1} className="mb-0 text-center">
            <h4 className="text-xl font-extrabold tracking-tight text-neutral-950">Türengel 24 Std Schlüsseldienst in Essen</h4>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* List 1 */}
            <Reveal delay={0.15} className="bg-white border border-neutral-200/50 rounded-2xl p-6">
              <span className="font-mono text-[#2563EB] text-[10px] font-bold tracking-wider block mb-4 uppercase"># SCHLÜSSELDIENST</span>
              <div className="flex flex-col gap-2.5 text-xs text-neutral-600 font-medium">
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Schlüsseldienst Essen</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Schlüsselnotdienst Essen</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Schlosswechsel Essen</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Zylinderaustausch</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Einbruchschutz Beratung</span>
              </div>
            </Reveal>

            {/* List 2 */}
            <Reveal delay={0.2} className="bg-white border border-neutral-200/50 rounded-2xl p-6">
              <span className="font-mono text-[#2563EB] text-[10px] font-bold tracking-wider block mb-4 uppercase"># MOBILES SERVICE</span>
              <div className="flex flex-col gap-2.5 text-xs text-neutral-600 font-medium">
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Autoöffnung PKW</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Garagentoröffnung</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Briefkastenöffnung</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Safe- &amp; Geldschranköffnung</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Schlüsselnotdienst Gelsenkirchen</span>
              </div>
            </Reveal>

            {/* List 3 */}
            <Reveal delay={0.25} className="bg-white border border-neutral-200/50 rounded-2xl p-6">
              <span className="font-mono text-[#2563EB] text-[10px] font-bold tracking-wider block mb-4 uppercase"># TÜRÖFFNUNG VOM PROFI</span>
              <div className="flex flex-col gap-2.5 text-xs text-neutral-600 font-medium">
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Zerstörungsfreie Öffnung</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Tür zugefallen Hilfe</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Tür abgeschlossen Notdienst</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> fairer Notdienst</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" /> Festpreisgarantie Essen</span>
              </div>
            </Reveal>

          </div>
        </section>

        {/* SECTION 10: HIGH CONTRAST MOBILE/VAN HERO BANNER */}
        <section className="w-[92%] max-w-5xl mx-auto py-12 md:py-16">
          <Reveal delay={0.15}>
            <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white min-h-[340px] flex flex-col justify-between p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
              {/* Semi-transparent image overlay to preserve exact background design of previous premium site */}
              <div className="absolute inset-0 z-0 opacity-40">
                <img 
                  src="https://xn--trengel-q9a.de/images/2026/05/12/schluesseldienst-schnell.png" 
                  alt="Schlüsselnotdienst Essen - Mobiles Türengel Einsatzfahrzeug für schnelle Türöffnung im Ruhrgebiet"                   width={1024}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900/90 to-transparent pointer-events-none z-10" />

              {/* Banner content */}
              <div className="relative z-20 max-w-xl flex flex-col gap-4">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                  Wie finden Sie einen zuverlässigen &amp; günstigen Schlüsseldienst in Essen?
                </h2>
                <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-light">
                  Sprechen Sie ohne Umwege direkt mit unseren lokalen Schlüsselnotdienst-Profis vor Ort. Wir stehen für uneingeschränkte, 24 Std. tägliche Erreichbarkeit im gesamten Ruhrgebiet, blitzschnelle Anfahrtszeiten unter 20 Minuten und absolut saubere, materialschonende, zerstörungsfreie Türöffnung ohne unfaire Preisschwankungen oder künstlich in die Höhe getriebene Rechnungen. Vertrauen Sie dem Original für Essen!
                </p>
              </div>

              {/* Dynamic Action Trigger Panel with Phone */}
              <div className="relative z-20 mt-8 flex flex-wrap gap-4 items-center bg-white/10 backdrop-blur-md border border-white/10 self-start p-3 rounded-full hover:bg-white/15 transition-all">
                <a 
                  href="tel:+491776721642" 
                  className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#2563EB] text-white hover:bg-[#1d4ed8] font-sans font-bold text-xs tracking-wider uppercase transition-colors shrink-0"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Jetzt anrufen: 0177 6721642</span>
                </a>
                <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-white px-3 hidden sm:inline select-none">
                  [ 24 Std Notdienst Essen ]
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 11: "HÄUFIG GESTELLTE FRAGEN" ACCORDION */}
        <section className="w-[92%] max-w-3xl mx-auto py-16 md:py-24" id="faq">
          <div className="bg-white border border-neutral-200/70 p-6 md:p-12 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.01)]">
            <Reveal delay={0.1}>
              <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] leading-tight font-extrabold tracking-tight text-neutral-950 mb-8 text-center">
                Häufig gestellte Fragen (F.A.Q)
              </h2>
            </Reveal>

            <div className="flex flex-col mt-4">
              <FAQItem 
                index={0}
                question="Wie schnell ist der Schlüsseldienst vor Ort?"
                answer={`Da unsere Techniker strategisch direkt im Raum ${city} verteilt sind, beträgt die Wartezeit selten mehr als 20 Minuten.`}
              />
              <FAQItem 
                index={1}
                question="Was kostet eine Türöffnung?"
                answer={`Wir setzen auf absolute Preissicherheit. Den exakten Festpreis besprechen wir vor Arbeitsbeginn mit Ihnen – mit günstigen und transparenten Anfahrtskosten für die Region ${city}.`}
              />
              <FAQItem 
                index={2}
                question="Kann jede Tür ohne Schaden geöffnet werden?"
                answer={`Zu 99% nicht. Unsere Techniker nutzen Spezialwerkzeuge für komplett zerstörungsfreie Notöffnungen in ${city}.`}
              />
              <FAQItem 
                index={3}
                question="Muss das Schloss ausgetauscht werden?"
                answer="Nicht zwingend. Wenn Ihre Tür lediglich zugefallen ist, bleibt das Schloss vollauf intakt. Nur wenn der Schlüssel verloren ging, das Schloss defekt war oder beschädigt wurde, empfehlen wir einen präventiven Zähleraustausch zum Erhalt der Sicherheit."
              />
              <FAQItem 
                index={4}
                question="Öffnen Sie auch Autos oder Tresore?"
                answer="Ja. Neben Haus- und Wohnungstüren bieten wir einen schonenden Spezial-Notdienst für PKW, Kfz-Schlösser, Garagentore, Briefkästen sowie verschlossene Safes oder Privattresore jeder Sicherheitsklasse."
              />
              <FAQItem 
                index={5}
                question="Ist der Schlüsseldienst rund um die Uhr erreichbar?"
                answer="Ja, unser Schlüsselnotdienst ist für ganz Essen und das nahegelegene Ruhrgebiet an 365 Tagen im Jahr – auch an Feiertagen und mitten in der Nacht – vollauf besetzt. Sie sprechen bei uns direkt mit dem diensthabenden Techniker auf Mobiltelefon."
              />
              <FAQItem 
                index={6}
                question="Gibt es versteckte Kosten?"
                answer="Nein! Bei Türengel steht fairness an oberster Stelle. Alle anfallenden Festpreise und eventuellen Fahrtkosten werden Ihnen verbindlich vor Arbeitsbeginn mitgeteilt, so dass Sie immer die volle Budgetkontrolle behalten."
              />
            </div>
          </div>
        </section>

        {/* SECTION 12: "WARUM EIN LOKALER SCHLÜSSELNOTDIENST SINNVOLL IST" */}
        <section className="w-[92%] max-w-5xl mx-auto py-16 md:py-24 border-t border-neutral-200/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side Image showing the store front / technician */}
            <div className="lg:col-span-5 flex justify-center">
              <Reveal delay={0.2} className="w-full">
                <div className="relative p-2.5 bg-white border border-neutral-200/60 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.02)] overflow-hidden group">
                  <img 
                    src="https://gokey.at/wp-content/uploads/2024/09/Aufsperrdienst-1190-Wien-Locksmith-scaled.jpg" 
                    alt="Aufsperrdienst Essen - Erfahrener Schlüsseldienst Techniker öffnet versperrtes Türschloss fachgerecht vor Ort" 
                    width={480}
                    height={360}
                    loading="lazy"
                    className="w-full h-auto rounded-2xl object-cover aspect-[4/3] sm:aspect-video lg:aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle 24h store badge sticker */}
                  <div className="absolute bottom-6 left-6 z-25 bg-neutral-950 text-white flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold font-mono tracking-widest shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                    <span>LOKAL VOR ORT</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right side Text */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal delay={0.1}>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950">
                  Soforthilfe vor Ort: Warum ein lokaler Schlüsselnotdienst in Essen die beste Wahl ist
                </h2>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="text-[14px] text-neutral-600 leading-relaxed font-normal">
                  Ein ortsansässiger und fest verankerter Schlüsselnotdienst kennt die genauen Straßen, Schleichwege und gesamten Stadtbezirke in Essen (von Altenessen, Borbeck über Holsterhausen bis Werden oder Kettwig). Dadurch kann der beauftragte Schlüsseldienst Essen Techniker die Anfahrtswege und Fahrtzeiten im dichten Ruhrgebietsverkehr auf ein absolutes Minimum reduzieren und bereits nach durchschnittlich 15 bis 30 Minuten direkt an Ihrer Haustür eintreffen. Gerade im winterlichen Frost, bei strömendem Regen oder zu tiefer Nachtstunde zahlt sich jede Minute Wartezeitersparnis spürbar für Ihr Wohlbefinden aus.
                </p>
                <p className="text-[14px] text-neutral-600 leading-relaxed font-normal mt-1.5 font-sans">
                  Zudem arbeitet ein regional ansässiges Familienunternehmen oder lokaler Fachbetrieb weitaus persönlicher und kundenfreundlicher als anonyme, oft dubiose bundesweite Vermittlungsportale oder Callcenter. Sie sprechen am Kundentelefon immer direkt mit einem versierten, echten Techniker vor Ort, der Sie individuell berät und vollumfänglich für die einwandfreie, schadensfreie Arbeit geradesteht. Kurze, transparente Wege bilden hierbei das Fundament für nachhaltiges Kundenvertrauen.
                </p>
                <p className="text-[14px] text-neutral-600 leading-relaxed font-normal mt-1.5 font-sans">
                  Sollten Sie somit akute, kompetente Unterstützung bei einer Türöffnung, Autoöffnung oder Tresoröffnung benötigen oder Ihren individuellen Einbruchschutz mit mechanischen Zusatzsicherungen modernisieren wollen, rufen Sie uns direkt an. Unser bestens ausgerüstetes Einsatzfahrzeug macht sich nach Ihrem Anruf unverzüglich auf den Weg zu Ihnen.
                </p>
              </Reveal>

              <Reveal delay={0.2} className="pt-2">
                <a href="tel:+491776721642">
                  <CTAButton text={`DIREKT HILFE IN ${city.toUpperCase()} RUFEN`} variant="accent" />
                </a>
              </Reveal>
            </div>

          </div>
        </section>
          </>
        )}

        {currentPage === 'impressum' && (
          <Impressum onBackToHome={() => navigateTo('home')} />
        )}

        {currentPage === 'datenschutz' && (
          <Datenschutz onBackToHome={() => navigateTo('home')} />
        )}

        {/* SECTION 14: FOOTER (ELITE GLASS CARD) */}
        <footer 
          className="pointer-events-auto mt-16 md:mt-24"
          style={{ width: '92%', margin: '0 auto', paddingBottom: '64px' }}
        >
          {/* Inner crystal glassmorphism card designed for light mode */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(35px)',
            WebkitBackdropFilter: 'blur(35px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: 'clamp(32px, 4vw, 64px)',
            borderRadius: '28px',
            boxShadow: '0 20px 55px rgba(0, 0, 0, 0.03)'
          }}>
            
            {/* CTA SECTION */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '40px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
              paddingBottom: 'clamp(48px, 4vw, 80px)'
            }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.05
              }} className="text-neutral-950 font-sans">
                Schlüssel verloren, Schloss defekt oder ausgesperrt?<br />
                <span className="text-[#2563EB]">Ihr zuverlässiger Schlüsseldienst Essen ist 24/7 erreichbar!</span>
              </h2>
              <a href="tel:+491776721642" className="block">
                <CTAButton text={`DIREKT HILFE IN ${city.toUpperCase()} RUFEN`} variant="accent" />
              </a>
            </div>

            {/* FOOTER LINKS GRID */}
            <div style={{
              paddingTop: 'clamp(48px, 4vw, 64px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 'clamp(32px, 3vw, 48px)'
            }}>
              {/* Column 1: Brand details */}
              <div className="flex flex-col gap-4">
                <TurengelLogo className="text-neutral-900 self-start animate-pulse" />
                <p style={{ fontSize: '13px', color: 'rgba(0, 0, 0, 0.55)', maxWidth: '240px', lineHeight: '1.45' }}>
                  {`TÜRENGEL — Ihr verlässlicher, fairer Schlüsselnotdienst für ${city} und Umgebung.`}
                </p>
              </div>

              {/* Column 2: Company */}
              <div className="flex flex-col gap-4">
                <h4 style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.12em', color: 'rgba(0, 0, 0, 0.45)', fontWeight: 800 }}>TÜRENGEL</h4>
                <div className="flex flex-col gap-2.5" style={{ fontSize: '13.5px', color: 'rgba(0, 0, 0, 0.7)' }}>
                  <a href="#preise" onClick={(e) => handleNavSectionClick(e, 'preise')} className="hover:text-[#2563EB] transition-colors duration-200">Preise &amp; Infos</a>
                  <a href="#gebiete" onClick={(e) => handleNavSectionClick(e, 'gebiete')} className="hover:text-[#2563EB] transition-colors duration-200">Einsatzgebiete</a>
                  <a href="#vorteile" onClick={(e) => handleNavSectionClick(e, 'vorteile')} className="hover:text-[#2563EB] transition-colors duration-200">Gute Gründe</a>
                  <a href="tel:+491776721642" className="hover:text-[#2563EB] transition-colors duration-200">Notruf Direkt</a>
                </div>
              </div>

              {/* Column 3: Services */}
              <div className="flex flex-col gap-4">
                <h4 style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.12em', color: 'rgba(0, 0, 0, 0.45)', fontWeight: 800 }}>LEISTUNGEN</h4>
                <div className="flex flex-col gap-2.5" style={{ fontSize: '13.5px', color: 'rgba(0, 0, 0, 0.7)' }}>
                  <a href="#leistungen" onClick={(e) => handleNavSectionClick(e, 'leistungen')} className="hover:text-[#2563EB] transition-colors duration-200 font-sans">Türöffnungen</a>
                  <a href="#leistungen" onClick={(e) => handleNavSectionClick(e, 'leistungen')} className="hover:text-[#2563EB] transition-colors duration-200 font-sans">Autoöffnungen</a>
                  <a href="#leistungen" onClick={(e) => handleNavSectionClick(e, 'leistungen')} className="hover:text-[#2563EB] transition-colors duration-200 font-sans">Zylinderwechsel</a>
                  <a href="#leistungen" onClick={(e) => handleNavSectionClick(e, 'leistungen')} className="hover:text-[#2563EB] transition-colors duration-200 font-sans">Tresoröffnungen</a>
                </div>
              </div>

              {/* Column 4: Contact */}
              <div className="flex flex-col gap-4">
                <h4 style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.12em', color: 'rgba(0, 0, 0, 0.45)', fontWeight: 800 }}>KONTAKT</h4>
                <div className="flex flex-col gap-2 font-mono text-[11px] leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  <span className="font-sans font-medium text-neutral-800">Bocholderstr. 207</span>
                  <span className="font-sans font-medium text-neutral-800">45356 Essen</span>
                  <a href="tel:+491776721642" className="text-neutral-900 font-extrabold hover:underline hover:text-[#2563EB] transition-all duration-200">
                    Mobil: 0177 6721642
                  </a>
                  <span className="text-neutral-400">24 Std. besetzt</span>
                </div>
              </div>
            </div>

            {/* COPYRIGHT BAR */}
            <div style={{
              marginTop: '56px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(0, 0, 0, 0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {`© 2026 TÜRENGEL. ALLE RECHTE VORBEHALTEN. LOKALER SCHLÜSSELNOTDIENST ${city.toUpperCase()}.`}
              </span>
              <div style={{ display: 'flex', gap: '24px', fontSize: '11px', fontFamily: 'monospace', color: 'rgba(0, 0, 0, 0.4)', letterSpacing: '0.1em' }}>
                <a 
                  href="#privacy" 
                  onClick={(e) => { e.preventDefault(); navigateTo('datenschutz'); }}
                  className="hover:text-[#2563EB] transition-colors duration-200"
                >
                  DATENSCHUTZ
                </a>
                <span>|</span>
                <a 
                  href="#terms" 
                  onClick={(e) => { e.preventDefault(); navigateTo('impressum'); }}
                  className="hover:text-[#2563EB] transition-colors duration-200"
                >
                  IMPRESSUM
                </a>
              </div>
            </div>

          </div>
        </footer>

      </main>

      {/* Dynamic Thumb-safe mobile call widget - only visible past 400px scroll on mobile */}
      {showStickyCall && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 lg:hidden pointer-events-auto"
        >
          <a
            href="tel:+491776721642"
            title="Schlüsseldienst Essen anrufen"
            className="flex items-center gap-3 bg-[#2563EB] text-white p-4 rounded-full shadow-[0_12px_40px_rgba(37,99,235,0.45)] hover:bg-[#1D4ED8] transition-all border border-blue-400/20 active:scale-95 group"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <Phone className="w-3.5 h-3.5 text-white fill-current shrink-0" />
            </div>
            <div className="flex flex-col text-left pr-2">
              <span className="text-[8px] font-black tracking-widest text-blue-100 uppercase leading-none mb-0.5">24h Express</span>
              <span className="text-xs font-black tracking-tight leading-none mb-[-1px]">Anrufen</span>
            </div>
          </a>
        </motion.div>
      )}
    </div>
  );
}
