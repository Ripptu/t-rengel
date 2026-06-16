// src/components/ui/cinematic-landing-hero.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Key, Shield, ShieldCheck, Phone, Check, Clock, UserCheck, ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, rgba(15, 23, 42, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.06) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* -------------------------------------------------------------------
     PHYSICAL SKEUOMORPHIC MATERIALS (Restored 3D Depth)
  ---------------------------------------------------------------------- */
  
  /* OUTSIDE THE CARD */
  .text-3d-matte {
      color: #0c0a09;
      text-shadow: 
          0 10px 30px rgba(12, 10, 9, 0.12), 
          0 2px 4px rgba(12, 10, 9, 0.06);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, #0c0a09 0%, #2563EB 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 10px 20px rgba(37, 99, 235, 0.15)) 
          drop-shadow(0px 2px 4px rgba(12, 10, 9, 0.08));
  }

  /* INSIDE THE CARD */
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Deep Physical Card with Dynamic Mouse Lighting - Carbon Black style */
  .premium-depth-card {
      background: linear-gradient(145deg, #1c1917 0%, #0c0a09 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.95),
          0 20px 40px -20px rgba(0, 0, 0, 0.85),
          inset 0 1px 2px rgba(255, 255, 255, 0.08),
          inset 0 -2px 4px rgba(0, 0, 0, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.03);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37,99,235,0.08) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Realistic iPhone Mockup Hardware */
  .iphone-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #44403c, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.95),
          0 15px 25px -5px rgba(0,0,0,0.8);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #444 0%, #111 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.1),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.4),
          inset 0 1px 1px rgba(255,255,255,0.03),
          inset 0 -1px 1px rgba(0,0,0,0.6);
      border: 1px solid rgba(255,255,255,0.02);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(20px); 
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.08),
          0 25px 50px -12px rgba(0, 0, 0, 0.85),
          inset 0 1px 1px rgba(255,255,255,0.15),
          inset 0 -1px 1px rgba(0,0,0,0.6);
  }

  /* Physical Tactile Buttons */
  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F5F5F4 100%);
      color: #0c0a09;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.04);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.04);
  }
  .btn-modern-light:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #F5F5F4 0%, #E7E5E4 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.08);
  }
  
  .btn-modern-orange {
      background: linear-gradient(180deg, #3b82f6 0%, #2563EB 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(37,99,235,0.3), 0 2px 4px rgba(37,99,235,0.2), 0 12px 24px -4px rgba(37,99,235,0.5), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.2);
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-orange:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #60a5fa 0%, #2563EB 100%);
      box-shadow: 0 0 0 1px rgba(37,99,235,0.4), 0 6px 12px -2px rgba(37,99,235,0.3), 0 20px 32px -6px rgba(37,99,235,0.6), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -3px 6px rgba(0,0,0,0.2);
  }
  .btn-modern-orange:active {
      transform: translateY(1px);
      background: #1d4ed8;
      box-shadow: 0 0 0 1px rgba(37,99,235,0.2), inset 0 3px 8px rgba(0,0,0,0.3);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  className?: string;
}

export function CinematicHero({ 
  brandName = "TÜRENGEL",
  tagline1 = "Notöffnung in Essen.",
  tagline2 = "In 20 Minuten vor Ort.",
  cardHeading = "Schnell, fair & zum Festpreis.",
  cardDescription = <><span className="text-white font-semibold">Türengel</span> ist Ihr inhabergeführter, regionaler Partner in Essen. Wir stehen für zerstörungsfreie Türöffnungen, Schlosserarbeiten und Einbruchschutz zum transparenten Festpreis.</>,
  metricValue = 20,
  metricLabel = "Min. Anfahrt",
  ctaHeading = "Ihr Aufsperrnotdienst.",
  ctaDescription = "Einsatzbereit in ganz Essen & Umgebung. Keine Abzocke, keine versteckten Gebühren. Anruf genügt!",
  className, 
  ...props 
}: CinematicHeroProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // 1. High-Performance Mouse Interaction Logic (Using requestAnimationFrame)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  },[]);

  // 2. Complex Cinematic Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Speed up heading load: start closer (y: 30 instead of 60), less heavy starting blur (12px instead of 20px)
      gsap.set(".text-track", { autoAlpha: 0, y: 30, scale: 0.95, filter: "blur(12px)", rotationX: -10 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".scroll-hint", { autoAlpha: 0, y: 15 });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.1 });
      introTl
        .to(".text-track", { duration: 0.7, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "power3.out" })
        .to(".text-days", { duration: 0.7, clipPath: "inset(0 0% 0 0)", ease: "power3.out" }, "-=0.45")
        .to(".scroll-hint", { duration: 0.6, autoAlpha: 1, y: 0, ease: "power3.out" }, "-=0.35");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=6500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".scroll-hint", { autoAlpha: 0, y: 25, duration: 1.0, ease: "power2.inOut" }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 }) 
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", { 
          width: isMobile ? "92vw" : "85vw", 
          height: isMobile ? "92vh" : "85vh", 
          borderRadius: isMobile ? "32px" : "40px", 
          ease: "expo.inOut", 
          duration: 1.8 
        }, "pullback") 
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  },[metricValue]); 

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-stone-50 text-stone-900 font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-40" aria-hidden="true" />

      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        <h1 className="text-track gsap-reveal text-3d-matte text-4xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight mb-2">
          {tagline1}
        </h1>
        <span className="text-days gsap-reveal text-silver-matte text-4xl md:text-7xl lg:text-[5.5rem] font-black tracking-widest text-[#2563EB] block">
          {tagline2}
        </span>
      </div>

      {/* MINIMALIST SCROLL HINT */}
      <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none select-none">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-neutral-400">Scroll nach unten</span>
        <ChevronDown className="w-4 h-4 text-neutral-400 animate-bounce" />
      </div>

      {/* BACKGROUND LAYER 2: Tactile CTA Buttons */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-stone-950">
          {ctaHeading}
        </h2>
        <p className="text-stone-500 text-base md:text-xl mb-12 max-w-xl mx-auto font-normal leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="tel:+491776721642" aria-label="Jetzt anrufen" className="btn-modern-orange flex items-center justify-center gap-3.5 px-8 py-4.5 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2">
            <Phone className="w-6 h-6 transition-transform group-hover:scale-110 animate-pulse fill-current" />
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-widest text-blue-100 uppercase mb-[-1px]">STÄNDIG ERREICHBAR (24H)</div>
              <div className="text-xl font-black leading-none tracking-tight">0177 6721642</div>
            </div>
          </a>
          <a href="#preise" className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 px-10 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
            <span className="text-sm font-bold tracking-widest uppercase">Unsere Preise sehen</span>
          </a>
        </div>
      </div>

      {/* FOREGROUND LAYER: The Physical Deep Slate Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE GRID: Flex-col on mobile to force order, Grid on desktop */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            
            {/* 1. TOP (Mobile) / RIGHT (Desktop): BRAND NAME */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-5xl md:text-[5.5rem] lg:text-[7.5rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0">
                {brandName}
              </h2>
            </div>

            {/* 2. MIDDLE (Mobile) / CENTER (Desktop): IPHONE MOCKUP */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              
              {/* Inner wrapper for safe CSS scaling that doesn't conflict with GSAP */}
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">
                
                {/* The iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d"
                >
                  {/* Physical Hardware Buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Inner Screen Container */}
                  <div className="absolute inset-[7px] bg-[#0c0a09] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island Notch */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
                    </div>

                    {/* App Interface */}
                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      <div className="phone-widget flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-1">Status: Live</span>
                          <span className="text-lg font-black tracking-tight text-white drop-shadow-md">TÜRENGEL</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-stone-200 flex items-center justify-center font-bold text-xs border border-blue-400/20 shadow-lg shadow-black/50">24H</div>
                      </div>

                      <div className="phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                           <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                           <circle className="progress-ring stroke-[#2563EB]" cx="88" cy="88" r="64" fill="none" strokeWidth="12" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="counter-val text-4xl font-black tracking-tighter text-white">0</span>
                          <span className="text-[8px] text-blue-200/60 uppercase tracking-[0.1em] font-bold mt-1">{metricLabel}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="phone-widget widget-depth rounded-2xl p-2.5 flex items-center">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 flex items-center justify-center mr-3 border border-blue-400/20 shadow-inner shrink-0 text-[#2563EB]">
                            <Key className="w-4 h-4 drop-shadow-md" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-bold text-stone-150 truncate">Schadenfreie Türöffnung</div>
                            <div className="text-[9px] text-stone-400">Garantiert zerstörungsfrei</div>
                          </div>
                        </div>
                        <div className="phone-widget widget-depth rounded-2xl p-2.5 flex items-center">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neutral-500/20 to-neutral-600/5 flex items-center justify-center mr-3 border border-neutral-400/20 shadow-inner shrink-0 text-stone-300">
                            <Shield className="w-4 h-4 drop-shadow-md" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-bold text-stone-150 truncate">Zylinderaustausch</div>
                            <div className="text-[9px] text-stone-400">BASI, ABUS, DOM Partner</div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Floating Glass Badges */}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-blue-500/20 to-blue-950/10 flex items-center justify-center border border-blue-400/30 shadow-inner shrink-0">
                    <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">🔑</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Festpreis-Garantie</p>
                    <p className="text-blue-200/50 text-[10px] lg:text-xs font-semibold">Ab 69 € inkl. MwSt.</p>
                  </div>
                </div>
              </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-stone-500/20 to-stone-900/10 flex items-center justify-center border border-stone-400/30 shadow-inner shrink-0">
                    <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">🛡️</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Einbruchschutz</p>
                    <p className="text-stone-300/50 text-[10px] lg:text-xs font-semibold">Geprüfte Markenbeschläge</p>
                  </div>
                </div>

              </div>

            {/* 3. BOTTOM (Mobile) / LEFT (Desktop): MAIN HEADING */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-black mb-1 lg:mb-5 tracking-tight uppercase">
                {cardHeading}
              </h2>
              <p className="hidden md:block text-stone-300/80 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
