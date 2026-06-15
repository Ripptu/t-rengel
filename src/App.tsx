import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './components/ScrollReveal';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260521_064421_279656fd-e76f-40a0-8fed-7456d4f7715a.mp4';

// TÜRENGEL Logo: An elegant high-contrast locksmith wing and typographic symbol
function TurengelLogo({ className = "h-5 text-white" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-white shrink-0"
      >
        {/* Elegant angel wing structure integrated with safe key notches */}
        <path d="M21 2c-4 0-7 2.5-9 6.5C10 4.5 7 2 3 2c0 8 4 12 9 13.5v6.5h2v-2.5h2v-2h-4v-2c5-1.5 9-5.5 9-13.5Z" />
        <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      </svg>
      <span className="font-sans font-bold tracking-tight text-white text-sm md:text-base uppercase">
        Türengel
      </span>
    </div>
  );
}

// High-tech wireframe Globe SVG
function GlobeIcon({ className = "w-[71px] h-[43px]" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 71 43" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <ellipse cx="35.5" cy="21.5" rx="34.5" ry="20.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="1" y1="21.5" x2="70" y2="21.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M6 13.5 C 16 17, 55 17, 65 13.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
      <path d="M6 29.5 C 16 26, 55 26, 65 29.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
      <ellipse cx="35.5" cy="21.5" rx="20" ry="20.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <ellipse cx="35.5" cy="21.5" rx="8" ry="20.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="35.5" y1="1" x2="35.5" y2="42" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// NavItem: Clean, minimalist transition link like Apple's header
function NavItem({ text, href = "#" }: { text: string; href?: string }) {
  return (
    <a
      href={href}
      className="text-white/70 hover:text-white text-xs font-semibold tracking-wide transition-all duration-300 uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
    >
      {text}
    </a>
  );
}

// CTA Button: Beautiful minimalist pill button with scale and sliding arrow micro-interactions
interface CTAButtonProps {
  text: string;
  variant?: "dark" | "light";
}

function CTAButton({ text, variant = "dark" }: CTAButtonProps) {
  const isLight = variant === "light";

  return (
    <div
      className={`group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full transition-all duration-300 border cursor-pointer select-none font-sans font-bold text-xs tracking-wider uppercase hover:scale-[1.02] active:scale-[0.98] ${
        isLight
          ? "bg-white border-white text-black hover:bg-transparent hover:text-white hover:scale-[1.02] active:scale-[0.98]"
          : "bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white hover:text-black hover:border-white shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
      }`}
    >
      <span>{text}</span>
      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
    </div>
  );
}

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(true); // Load instantly without pre-loader
  const screen3Ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 500, 800], [0, 0, -150]);

  // Video initialization and mobile compatibility setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force strict low-power and iOS properties programmatically
    video.setAttribute('muted', 'true');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.muted = true;
    video.playsInline = true;

    // Prime the video context so mobile browsers don't show a black screen
    const primeVideo = async () => {
      try {
        video.load();
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
          video.pause();
        }
      } catch (err) {
        console.log("Normal mobile auto-play restriction; unlocking will occur on interaction.", err);
      }
    };

    primeVideo();

    // Secondary unlock trigger: prime on first touch or scroll interaction to bypass mobile browser sandboxes safely
    const handleGesture = () => {
      if (video) {
        video.play().then(() => {
          video.pause();
        }).catch(() => {});
      }
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('scroll', handleGesture);
    };

    window.addEventListener('touchstart', handleGesture, { passive: true });
    window.addEventListener('scroll', handleGesture, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('scroll', handleGesture);
    };
  }, []);

  // Multi-platform ultra-smooth scroll-to-video-frame interpolation controller
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let targetTime = 0;
    let interpolatedTime = 0;
    let rafId: number;

    const updateFrame = () => {
      if (!video.duration || isNaN(video.duration) || !isFinite(video.duration)) {
        rafId = requestAnimationFrame(updateFrame);
        return;
      }

      // Smooth interpolation physics
      const ease = 0.085;
      interpolatedTime += (targetTime - interpolatedTime) * ease;

      // Update frame render state
      const timeDiff = Math.abs(video.currentTime - interpolatedTime);
      if (timeDiff > 0.012) {
        video.currentTime = Math.max(0, Math.min(video.duration - 0.02, interpolatedTime));
      }

      rafId = requestAnimationFrame(updateFrame);
    };

    const handleScroll = () => {
      if (!screen3Ref.current || !video.duration) return;

      const rect = screen3Ref.current.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      const stopScroll = Math.max(1, absoluteTop - (window.innerHeight * 0.15));
      const scrollFraction = Math.max(0, Math.min(1, window.scrollY / stopScroll));
      
      targetTime = scrollFraction * video.duration;
    };

    // Initialize animation loop
    rafId = requestAnimationFrame(updateFrame);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Hook metadata load to align duration instantly
    const handleMetadata = () => {
      handleScroll();
    };
    video.addEventListener('loadedmetadata', handleMetadata);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('loadedmetadata', handleMetadata);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black font-sans text-white overflow-x-hidden antialiased selection:bg-white selection:text-black">
      
      {/* 1. Fixed Video Background with premium dark radial gradient fallback */}
      <div ref={videoContainerRef} className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-stone-950 to-black overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover opacity-70"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        />
        {/* Subtle background vignette for absolute luxury darkness */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/25 to-black/85" />
      </div>

      {/* 2. Fixed Animated Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: headerY }}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-5xl pointer-events-auto"
      >
        <div className="flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Left: Branding */}
          <a href="#" className="flex items-center hover:opacity-80 transition-opacity">
            <TurengelLogo className="h-5 text-white" />
          </a>

          {/* Center/Right: Apple Minimal Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <NavItem text="Türöffnung" href="#leistungen" />
              <NavItem text="Autoöffnung" href="#leistungen" />
              <NavItem text="Sicherheit" href="#leistungen" />
              <NavItem text="Preise" href="#leistungen" />
            </nav>
            <a 
              href="tel:+492014764314" 
              className="bg-white hover:bg-neutral-200 text-black px-5 py-2.5 rounded-full font-sans text-[11px] font-bold tracking-wider hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 uppercase select-none cursor-pointer flex items-center justify-center shrink-0"
            >
              24H ANRUFEN
            </a>
          </div>

          {/* Simple Mobile Call Button to maintain usability on phones */}
          <div className="lg:hidden">
            <a 
              href="tel:+492014764314" 
              className="bg-white hover:bg-neutral-200 text-black px-4 py-1.5 rounded-full font-sans text-[10px] font-bold tracking-wider hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 uppercase"
            >
              ANRUFEN
            </a>
          </div>
        </div>
      </motion.header>

      {/* 3. Scrollable Content Layer */}
      <main className="relative z-10 pointer-events-none">

        {/* SECTION 1: HERO CONTAINER */}
        <section className="w-[90%] mx-auto h-screen flex flex-col justify-between py-8 md:py-12 lg:py-16 pb-12">
          {/* Spacer to push content to middle/bottom */}
          <div className="h-16" />

          {/* Interactive Hero Content Grid */}
          <div className="flex-1 w-full pointer-events-auto flex flex-col justify-end md:grid md:grid-cols-12 md:grid-rows-[1fr_auto] gap-y-12 md:gap-y-0 md:gap-x-8">
            
            {/* 1. Leading Heading (bottom-left) */}
            <div className="md:row-start-2 md:col-start-1 md:col-span-8 flex items-end">
              <Reveal delay={0.2}>
                <h1 className="text-[clamp(2.1rem,5vw,4.5rem)] leading-[1.05] font-medium tracking-tight text-white select-none">
                  Türengel. <br />
                  Ihr 24 Std Schlüsselnotdienst.
                </h1>
              </Reveal>
            </div>

            {/* 2. Description paragraph (center-right) */}
            <div className="md:row-start-1 md:col-start-8 md:col-span-5 flex flex-col justify-end items-start md:items-end text-left md:text-right mt-auto">
              <Reveal delay={0.3}>
                <p className="text-[clamp(0.95rem,1.4vw,1.25rem)] text-white/64 leading-[1.4] font-normal max-w-[480px] md:relative md:-top-[60px]">
                  Schnelle Hilfe in Essen und Umgebung. Wir garantieren zerstörungsfreie Türöffnungen zum fairen Festpreis – ohne Callcenter-Abzocke und dubiose Aufschläge. <strong className="font-semibold text-white">Wir sind in 20 Minuten bei Ihnen.</strong>
                </p>
              </Reveal>
            </div>

            {/* 3. CTA Action Button (bottom-right) */}
            <div className="md:row-start-2 md:col-start-8 md:col-span-5 flex items-end justify-start md:justify-end">
              <Reveal delay={0.4}>
                <a href="tel:+492014764314" className="block">
                  <CTAButton text="JETZT HILFE RUFEN" variant="dark" />
                </a>
              </Reveal>
            </div>

          </div>
        </section>

        {/* SECTION 1.5: SPACER */}
        <div className="h-[200px] w-full" />

        {/* SECTION 2: SCROLL REVEAL TEXT + FEATURE GRID */}
        <section className="w-[90%] mx-auto min-h-screen flex flex-col justify-center py-8 md:py-12 lg:py-16 pointer-events-auto">
          <div className="max-w-[1200px] w-full mx-auto">
            
            {/* Word-by-word scroll driven reveal component */}
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
              textClassName="text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.1] font-medium tracking-tight text-white w-full"
            >
              Komplette Notöffnung & Sicherheitstechnik für Essen und Ruhrgebiet. Wir bauen auf ehrliche Preise, zerstörungsfreie Methoden und sekundenschnelle Reaktion.
            </ScrollReveal>

            {/* Three-Column bento grid - Redesigned for the 3 Core Metrics */}
            <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
              
              {/* Col 1: 20 min */}
              <Reveal delay={0.1} className="md:col-span-4 flex flex-col gap-4 border-t border-white/10 pt-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-semibold tracking-tight text-white font-mono">20 Min</span>
                </div>
                <h3 className="text-lg font-medium text-white font-sans mt-2">Durchschnittliche Anfahrtszeit</h3>
                <p className="text-[14px] text-white/64 leading-relaxed font-light">
                  Wir sind direkt in Essen und Umgebung für Sie unterwegs – ohne lange Wartezeiten oder unvorhersehbare Verzögerungen.
                </p>
              </Reveal>

              {/* Col 2: 99 % */}
              <Reveal delay={0.2} className="md:col-span-4 flex flex-col gap-4 border-t border-white/10 pt-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-semibold tracking-tight text-white font-mono">99 %</span>
                </div>
                <h3 className="text-lg font-medium text-white font-sans mt-2">Zerstörungsfreie Öffnung</h3>
                <p className="text-[14px] text-white/64 leading-relaxed font-light">
                  Bei zugefallenen Türen garantieren unsere geschulten Profi-Techniker eine schadens- und spurlos zerstörungsfreie Notöffnung.
                </p>
              </Reveal>

              {/* Col 3: 24/7 */}
              <Reveal delay={0.3} className="md:col-span-4 flex flex-col gap-4 border-t border-white/10 pt-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-semibold tracking-tight text-white font-mono">24/7</span>
                </div>
                <h3 className="text-lg font-medium text-white font-sans mt-2">Direkter Notruf</h3>
                <p className="text-[14px] text-white/64 leading-relaxed font-light">
                  Keine teuren Callcenter, keine Abzocke. Sie sprechen bei uns direkt mit dem Techniker, der sich sofort auf den Weg zu Ihnen macht.
                </p>
              </Reveal>

            </div>

          </div>
        </section>

        {/* SECTION 2.7: MINIMALIST SERVICES GRID */}
        <section className="w-[90%] mx-auto py-16 md:py-24 pointer-events-auto" id="leistungen">
          <div className="max-w-[1200px] w-full mx-auto">
            <Reveal delay={0.1}>
              <div className="text-[11px] font-mono tracking-widest text-white/40 uppercase mb-4">
                UNSER SERVICEPORTFOLIO
              </div>
              <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] leading-tight font-medium tracking-tight text-white mb-16">
                Professionelle Dienstleistungen auf Abruf.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Türöffnung */}
              <Reveal delay={0.2} className="bg-white/4 backdrop-blur-[40px] border border-white/10 p-8 rounded-sm hover:border-white/20 transition-all duration-300">
                <span className="font-mono text-xs text-white/40 block mb-6">01 / TÜRÖFFNUNG</span>
                <h4 className="text-xl font-medium text-white mb-3">Türöffnungen aller Art</h4>
                <p className="text-[14px] text-white/64 leading-relaxed font-light">
                  Egal ob Haus- oder Wohnungstür, einfach zugefallen oder zweifach verriegelt – wir öffnen Ihre Tür schnell, zuverlässig und zu transparenten Preisen.
                </p>
              </Reveal>

              {/* Card 2: Autoöffnung */}
              <Reveal delay={0.3} className="bg-white/4 backdrop-blur-[40px] border border-white/10 p-8 rounded-sm hover:border-white/20 transition-all duration-300">
                <span className="font-mono text-xs text-white/40 block mb-6">02 / AUTOÖFFNUNG</span>
                <h4 className="text-xl font-medium text-white mb-3">Materialschonende Autoöffnung</h4>
                <p className="text-[14px] text-white/64 leading-relaxed font-light">
                  Spezialnotdienst für PKW, Kfz-Türen, Kofferräume und Dachboxen aller Marken. Wir garantieren absolut materialschonendes Vorgehen ohne Lackschäden.
                </p>
              </Reveal>

              {/* Card 3: Schlosswechsel */}
              <Reveal delay={0.4} className="bg-white/4 backdrop-blur-[40px] border border-white/10 p-8 rounded-sm hover:border-white/20 transition-all duration-300">
                <span className="font-mono text-xs text-white/40 block mb-6">03 / SCHLOSSWECHSEL</span>
                <h4 className="text-xl font-medium text-white mb-3">Schloss- & Zylinderwechsel</h4>
                <p className="text-[14px] text-white/64 leading-relaxed font-light">
                  Sofortiger Austausch von defekten Schlössern oder Profilzylindern nach Schlüsselverlust oder zur nachhaltigen Erhöhung Ihres Einbruchschutzes.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SECTION 2.5: SPACER */}
        <div className="h-[200px] w-full" />

        {/* SECTION 3: FOOTER CARD (SCROLL TRIGGER REFERENCE CONTAINER) */}
        <footer 
          ref={screen3Ref}
          className="pointer-events-auto"
          style={{ width: '90%', margin: '0 auto', paddingBottom: '64px' }}
        >
          {/* Inner crystal glassmorphism card */}
          <div style={{
            backgroundColor: 'rgba(26, 26, 26, 0.6)',
            backdropFilter: 'blur(80px)',
            WebkitBackdropFilter: 'blur(80px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: 'clamp(32px, 4vw, 64px)',
            borderRadius: '4px'
          }}>
            
            {/* CTA SECTION */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '40px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: 'clamp(48px, 4vw, 80px)'
            }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.05
              }} className="text-white">
                Schlüssel verloren /<br />oder ausgesperrt?
              </h2>
              <a href="tel:+492014764314" className="block">
                <CTAButton text="DIREKT ANRUFEN (24/7)" variant="light" />
              </a>
            </div>

            {/* FOOTER LINKS GRID */}
            <div style={{
              paddingTop: 'clamp(48px, 4vw, 64px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 'clamp(32px, 3vw, 48px)'
            }}>
              {/* Column 1: Brand details */}
              <div className="flex flex-col gap-4">
                <TurengelLogo className="text-white self-start" />
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.4)', maxWidth: '220px', lineHeight: '1.4' }}>
                  Ihr verlässlicher, fairer Schlüsseldienst und Schlüsselnotdienst für Essen und Umgebung.
                </p>
              </div>

              {/* Column 2: Company */}
              <div className="flex flex-col gap-4">
                <h4 style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.3)', fontWeight: 600 }}>TÜRENGEL</h4>
                <div className="flex flex-col gap-2" style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
                  <a href="#leistungen" className="hover:text-white transition-colors duration-200">Preise & Infos</a>
                  <a href="#leistungen" className="hover:text-white transition-colors duration-200">Einsatzgebiete</a>
                  <a href="#leistungen" className="hover:text-white transition-colors duration-200">Über Uns</a>
                  <a href="tel:+492014764314" className="hover:text-white transition-colors duration-200">Notruf Direkt</a>
                </div>
              </div>

              {/* Column 3: Services */}
              <div className="flex flex-col gap-4">
                <h4 style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.3)', fontWeight: 600 }}>LEISTUNGEN</h4>
                <div className="flex flex-col gap-2" style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
                  <a href="#leistungen" className="hover:text-white transition-colors duration-200">Türöffnungen</a>
                  <a href="#leistungen" className="hover:text-white transition-colors duration-200">Autoöffnungen</a>
                  <a href="#leistungen" className="hover:text-white transition-colors duration-200">Zylinderwechsel</a>
                  <a href="#leistungen" className="hover:text-white transition-colors duration-200">Einbruchschutz</a>
                </div>
              </div>

              {/* Column 4: Contact */}
              <div className="flex flex-col gap-4">
                <h4 style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.3)', fontWeight: 600 }}>KONTAKT</h4>
                <div className="flex flex-col gap-2 font-mono text-[11px] leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  <span>Bocholder Str. 226</span>
                  <span>45355 Essen</span>
                  <a href="tel:+492014764314" className="text-white hover:underline transition-all duration-200">Tel: +49 (0) 201 476 43 14</a>
                  <span className="text-white/40">24 Std. besetzt</span>
                </div>
              </div>
            </div>

            {/* COPYRIGHT BAR */}
            <div style={{
              marginTop: '56px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.25)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                2026 TÜRENGEL. DE. ALLE RECHTE VORBEHALTEN.
              </span>
              <div style={{ display: 'flex', gap: '24px', fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.25)', letterSpacing: '0.1em' }}>
                <a href="#privacy" className="hover:text-white transition-colors duration-200">DATENSCHUTZ</a>
                <span>|</span>
                <a href="#terms" className="hover:text-white transition-colors duration-200">IMPRESSUM</a>
              </div>
            </div>

          </div>
        </footer>

      </main>
    </div>
  );
}
