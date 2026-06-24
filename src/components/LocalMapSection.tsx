import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Clock, Building2, Phone, ArrowUpRight, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function LocalMapSection() {
  const [activeArea, setActiveArea] = useState<'essen' | 'umland'>('essen');

  // Essen local neighborhoods list for SEO density
  const essenNeighborhoods = [
    { name: "Altenessen", zip: "45326", time: "15 Min", popular: true },
    { name: "Rüttenscheid", zip: "45130", time: "15 Min", popular: true },
    { name: "Frohnhausen", zip: "45147", time: "15 Min", popular: false },
    { name: "Bredeney", zip: "45133", time: "20 Min", popular: false },
    { name: "Borbeck", zip: "45355", time: "10 Min", popular: true },
    { name: "Holsterhausen", zip: "45147", time: "15 Min", popular: false },
    { name: "Steele", zip: "45276", time: "20 Min", popular: true },
    { name: "Kettwig", zip: "45219", time: "25 Min", popular: false },
    { name: "Werden", zip: "45239", time: "25 Min", popular: false },
    { name: "Katernberg", zip: "45327", time: "20 Min", popular: false },
    { name: "Stoppenberg", zip: "45141", time: "15 Min", popular: false },
    { name: "Heisingen", zip: "45259", time: "20 Min", popular: false }
  ];

  // Surrounding Ruhrgebiet cities with SEO keywords
  const umlandCities = [
    { name: "Bottrop", distance: "8 km", time: "15-20 Min" },
    { name: "Gelsenkirchen", distance: "11 km", time: "15-25 Min" },
    { name: "Oberhausen", distance: "12 km", time: "15-25 Min" },
    { name: "Mülheim a.d. Ruhr", distance: "9 km", time: "15-20 Min" },
    { name: "Gladbeck", distance: "14 km", time: "20-25 Min" },
    { name: "Bochum", distance: "19 km", time: "20-30 Min" },
    { name: "Duisburg", distance: "21 km", time: "20-30 Min" },
    { name: "Moers", distance: "28 km", time: "25-35 Min" }
  ];

  return (
    <div className="w-full bg-white border border-neutral-200/80 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.04)] relative overflow-hidden font-sans">
      
      {/* Subtle top ambient lighting */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Card Top Dispatch Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-xs font-bold tracking-wider text-neutral-800 uppercase font-mono">
            Live Notdienst Leitstelle: <span className="text-emerald-600">Einsatzbereitschaft Aktiv</span>
          </span>
        </div>

        <div className="flex items-center gap-2 bg-neutral-100/80 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-600">
          <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
          <span>Keine überteuerten Anfahrtskosten</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        
        {/* Left Side: Interactive Map Frame & Highlights (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-950 leading-tight">Zentrale Einsatzbasis Essen</h3>
                  <span className="text-xs text-neutral-500 block">Bocholderstraße 207, 45356 Essen</span>
                </div>
              </div>

              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Bocholderstr.+207,+45356+Essen"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] bg-[#2563EB]/5 hover:bg-[#2563EB]/10 px-3 py-2 rounded-xl transition-colors"
              >
                <span>Route anzeigen</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Premium Map Frame */}
            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] rounded-3xl overflow-hidden border border-neutral-200/90 bg-stone-100 shadow-inner group mt-2">
              <iframe 
                title="Türengel Schlüsseldienst Essen Standortsicht"
                src="https://maps.google.com/maps?q=Bocholderstr.%20207%2C%2045356%20Essen&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'contrast(1.03) saturate(0.9)' }}
                allowFullScreen={false}
                loading="lazy"
              />
              
              {/* Floating Live Dispatch Badge inside Map */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-neutral-200/60 flex items-center gap-2 pointer-events-none">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
                <span className="text-xs font-extrabold text-neutral-900">Ø 15 Min. vor Ort</span>
              </div>

              {/* Geo Coordinates Overlay */}
              <div className="absolute bottom-4 left-4 bg-neutral-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-[10px] font-mono text-stone-300 flex items-center gap-2.5 border border-white/10 pointer-events-none shadow-md">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ESSEN-ZENTRALE
                </span>
                <span className="text-stone-600">|</span>
                <span>LAT: 51.4818° N</span>
                <span className="text-stone-600">|</span>
                <span>LNG: 6.9744° E</span>
              </div>
            </div>
          </div>

          {/* Operating Area Highlights Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 bg-neutral-50/80 hover:bg-neutral-50 rounded-2xl border border-neutral-200/60 transition-colors flex items-center sm:items-start sm:flex-col gap-3 sm:gap-1.5">
              <div className="p-2 rounded-xl bg-white shadow-sm border border-neutral-100 text-neutral-700 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold font-mono text-neutral-400 uppercase tracking-wider block">Standort</span>
                <span className="text-xs sm:text-sm font-extrabold text-neutral-900">45356 Essen</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/50 hover:bg-emerald-50/80 rounded-2xl border border-emerald-500/20 transition-colors flex items-center sm:items-start sm:flex-col gap-3 sm:gap-1.5">
              <div className="p-2 rounded-xl bg-white shadow-sm border border-emerald-100 text-emerald-600 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold font-mono text-emerald-600/80 uppercase tracking-wider block">Bereitschaft</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-950">24 Std. / 365 Tage</span>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-[#2563EB] to-blue-700 rounded-2xl text-white shadow-md flex items-center sm:items-start sm:flex-col gap-3 sm:gap-1.5">
              <div className="p-2 rounded-xl bg-white/10 text-white shrink-0">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold font-mono text-blue-200 uppercase tracking-wider block">Ø Reisedauer</span>
                <span className="text-xs sm:text-sm font-black text-white">15 - 30 Min.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Area Selectors & Optimized Locational SEO densities (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-50/90 rounded-3xl p-6 sm:p-8 border border-neutral-200/70">
          
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black tracking-widest font-mono text-neutral-800 uppercase block">
                Einsatzgebiete &amp; Zeiten
              </span>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded font-bold">
                ● 100% Abgedeckt
              </span>
            </div>

            {/* Sleek Toggle Area Switcher */}
            <div className="grid grid-cols-2 gap-1.5 bg-neutral-200/70 p-1.5 rounded-2xl mb-5 text-xs font-extrabold relative">
              <button
                type="button"
                onClick={() => setActiveArea('essen')}
                className={`py-2.5 px-3 rounded-xl text-center transition-all cursor-pointer select-none relative z-10 ${
                  activeArea === 'essen' 
                  ? 'text-neutral-950 shadow-sm bg-white' 
                  : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Essen Stadtteile
              </button>
              <button
                type="button"
                onClick={() => setActiveArea('umland')}
                className={`py-2.5 px-3 rounded-xl text-center transition-all cursor-pointer select-none relative z-10 ${
                  activeArea === 'umland' 
                  ? 'text-neutral-950 shadow-sm bg-white' 
                  : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Ruhrgebiet Umland
              </button>
            </div>

            {/* Structured Grid of Cities/Neighborhoods */}
            <div className="relative h-[260px] sm:h-[280px] overflow-y-auto pr-1.5 select-none flex flex-col gap-2 scrollbar-thin">
              <AnimatePresence mode="wait">
                {activeArea === 'essen' ? (
                  <motion.div 
                    key="essen"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-2"
                  >
                    {essenNeighborhoods.map((area) => (
                      <div 
                        key={area.name}
                        className="group flex items-center justify-between bg-white border border-neutral-200/80 hover:border-[#2563EB]/40 px-4 py-2.5 rounded-2xl text-xs transition-all shadow-[0_2px_8px_rgba(0,0,0,0.015)] hover:shadow-md hover:translate-x-0.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                          <span className="font-bold text-neutral-900">{area.name}</span>
                          <span className="text-[11px] text-neutral-400 font-mono">({area.zip})</span>
                          {area.popular && (
                            <span className="hidden sm:inline text-[9px] bg-blue-50 text-[#2563EB] px-1.5 py-0.5 rounded font-mono font-bold">
                              Beliebt
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-emerald-600 hidden xs:inline" />
                          <span className="text-[11px] font-mono text-emerald-700 font-extrabold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200/50">
                            {area.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="umland"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-2"
                  >
                    {umlandCities.map((city) => (
                      <div 
                        key={city.name}
                        className="group flex items-center justify-between bg-white border border-neutral-200/80 hover:border-[#2563EB]/40 px-4 py-2.5 rounded-2xl text-xs transition-all shadow-[0_2px_8px_rgba(0,0,0,0.015)] hover:shadow-md hover:translate-x-0.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-[#2563EB] group-hover:scale-125 transition-transform" />
                          <span className="font-bold text-neutral-900">{city.name}</span>
                          <span className="text-[10px] text-neutral-400 font-mono">({city.distance})</span>
                        </div>
                        <span className="text-[11px] font-mono text-[#2563EB] font-extrabold bg-[#2563EB]/5 px-2 py-1 rounded-lg border border-[#2563EB]/10">
                          {city.time}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Direct booking CTA panel */}
          <div className="border-t border-neutral-200/80 pt-5 mt-5 bg-white/60 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-3xl">
            <div className="flex items-start gap-2.5 mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[12px] text-neutral-600 leading-relaxed">
                <strong className="text-neutral-900 font-bold">Express-Garantie:</strong> Unser mobiler Notdienst ist dauerhaft auf den Essener Straßen unterwegs. Wir sind sofort einsatzbereit.
              </p>
            </div>

            <a 
              href="tel:+491776721642"
              className="group flex items-center justify-center gap-3 bg-neutral-900 text-white py-3.5 px-4 rounded-2xl hover:bg-[#2563EB] transition-all duration-300 font-bold text-xs tracking-wider uppercase select-none shadow-md hover:shadow-xl"
            >
              <Phone className="w-4 h-4 fill-current text-[#2563EB] group-hover:text-white transition-colors" />
              <span>Sofort-Monteur anfordern: 0177 6721642</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
