import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Building2, Phone, ArrowUpRight } from 'lucide-react';

export default function LocalMapSection() {
  const [activeArea, setActiveArea] = useState<'essen' | 'umland'>('essen');

  // Essen local neighborhoods list for SEO density
  const essenNeighborhoods = [
    { name: "Altenessen", zip: "45326", time: "15 Min" },
    { name: "Rüttenscheid", zip: "45130", time: "20 Min" },
    { name: "Frohnhausen", zip: "45147", time: "15 Min" },
    { name: "Bredeney", zip: "45133", time: "20 Min" },
    { name: "Borbeck", zip: "45355", time: "10 Min" },
    { name: "Holsterhausen", zip: "45147", time: "15 Min" },
    { name: "Steele", zip: "45276", time: "25 Min" },
    { name: "Kettwig", zip: "45219", time: "25 Min" },
    { name: "Werden", zip: "45239", time: "25 Min" },
    { name: "Katernberg", zip: "45327", time: "20 Min" },
    { name: "Stoppenberg", zip: "45141", time: "15 Min" },
    { name: "Heisingen", zip: "45259", time: "25 Min" }
  ];

  // Surrounding Ruhrgebiet cities with SEO keywords
  const umlandCities = [
    { name: "Bottrop", distance: "8 km", time: "15-20 Min" },
    { name: "Gelsenkirchen", distance: "11 km", time: "15-25 Min" },
    { name: "Oberhausen", distance: "12 km", time: "15-25 Min" },
    { name: "Mülheim an der Ruhr", distance: "9 km", time: "15-20 Min" },
    { name: "Duisburg", distance: "21 km", time: "20-30 Min" },
    { name: "Bochum", distance: "19 km", time: "20-30 Min" },
    { name: "Moers", distance: "28 km", time: "25-35 Min" },
    { name: "Gladbeck", distance: "14 km", time: "20-30 Min" }
  ];

  return (
    <div className="w-full bg-white border border-neutral-200/70 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
      
      {/* Upper Grid: Map & Primary info panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Interactive Map Frame & Address Authority (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#2563EB]" />
              <h3 className="font-sans font-bold text-lg text-neutral-950">Einsatzbasis Essen & Ruhrgebiet</h3>
            </div>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Bocholderstr.+207,+45356+Essen"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline"
            >
              <span>Route planen</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Fully styled Map Frame (OpenStreetMap focused at Bocholderstr. 207 Essen) */}
          <div className="relative w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden border border-neutral-200/80 bg-stone-100 shadow-inner group">
            <iframe 
              title="Türengel Schlüsseldienst Essen Standortsicht"
              src="https://maps.google.com/maps?q=Bocholderstr.%20207%2C%2045356%20Essen&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(0.12) contrast(1.05)' }}
              allowFullScreen={false}
              loading="lazy"
            />
            {/* Absolute overlay badge with coordinates for Local schema search signals */}
            <div className="absolute bottom-3 left-3 bg-neutral-950/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[9px] font-mono text-stone-200 flex gap-2 border border-white/5 pointer-events-none">
              <span>LAT: 51.4818° N</span>
              <span className="text-stone-500">|</span>
              <span>LNG: 6.9744° E</span>
            </div>
          </div>

          {/* Operating Area Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-2">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-150 flex flex-col gap-1">
              <Building2 className="w-4 h-4 text-neutral-500" />
              <span className="text-[10px] font-black font-mono text-neutral-400 uppercase tracking-wider">Betriebssitz</span>
              <span className="text-xs font-bold text-neutral-800">45356 Essen</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-150 flex flex-col gap-1">
              <Clock className="w-4 h-4 text-neutral-500" />
              <span className="text-[10px] font-black font-mono text-neutral-400 uppercase tracking-wider">Erreichbarkeit</span>
              <span className="text-xs font-bold text-neutral-800">24 Std. / 365 Tage</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-150 flex flex-col gap-1 col-span-2 sm:col-span-1">
              <Navigation className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[10px] font-black font-mono text-neutral-400 uppercase tracking-wider">Ø Reisedauer</span>
              <span className="text-xs font-bold text-[#2563EB]">15 - 30 Min.</span>
            </div>
          </div>

        </div>

        {/* Right Side: Area Selectors & Optimized Locational SEO densities (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-50 rounded-2xl p-6 border border-neutral-200/50">
          
          <div className="w-full">
            <span className="text-[10px] font-black tracking-widest font-mono text-neutral-400 uppercase block mb-3.5">
              Servicegebiete und Verfügbarkeiten
            </span>

            {/* Toggle Area Switcher */}
            <div className="grid grid-cols-2 gap-2 bg-neutral-200/50 p-1 rounded-xl mb-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveArea('essen')}
                className={`py-2 px-3 rounded-lg text-center transition-all cursor-pointer select-none ${
                  activeArea === 'essen' 
                  ? 'bg-white text-neutral-950 shadow-sm' 
                  : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Essen Stadtteile
              </button>
              <button
                type="button"
                onClick={() => setActiveArea('umland')}
                className={`py-2 px-3 rounded-lg text-center transition-all cursor-pointer select-none ${
                  activeArea === 'umland' 
                  ? 'bg-white text-neutral-950 shadow-sm' 
                  : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Ruhrgebiet Umland
              </button>
            </div>

            {/* Structured Grid of Cities/Neighborhoods */}
            <div className="relative h-[230px] overflow-y-auto pr-1 select-none flex flex-col gap-1.5 scrollbar-thin">
              {activeArea === 'essen' ? (
                essenNeighborhoods.map((area, idx) => (
                  <div 
                    key={area.name}
                    className="flex items-center justify-between bg-white border border-neutral-150 px-3.5 py-2 rounded-xl text-xs hover:border-neutral-250 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.015)]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="font-bold text-neutral-800">{area.name}</span>
                      <span className="text-[10px] text-neutral-450 font-mono">({area.zip})</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                      {area.time}
                    </span>
                  </div>
                ))
              ) : (
                umlandCities.map((city, idx) => (
                  <div 
                    key={city.name}
                    className="flex items-center justify-between bg-white border border-neutral-150 px-3.5 py-2 rounded-xl text-xs hover:border-neutral-250 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.015)]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      <span className="font-bold text-neutral-800">{city.name}</span>
                      <span className="text-[9px] text-neutral-450 font-mono font-medium">({city.distance})</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#2563EB] font-bold bg-[#2563EB]/5 px-2 py-0.5 rounded-md">
                      {city.time}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Direct booking help details */}
          <div className="border-t border-neutral-200/60 pt-4 mt-4">
            <p className="text-[11px] text-stone-500 leading-normal font-light">
              <span className="font-bold text-stone-800">Direktkontakt vor Ort:</span> Unser technischer Notdienst ist in allen gelisteten Regionen mobil stationiert. Wir garantieren Anfahrtszeiten von meist unter 30 Minuten ab Ihrem Anruf.
            </p>
            <a 
              href="tel:+491776721642"
              className="flex items-center justify-center gap-2.5 bg-neutral-900 text-white mt-3.5 py-3 rounded-xl hover:bg-neutral-950 transition-all font-sans font-bold text-[11px] tracking-widest uppercase select-none text-center"
            >
              <Phone className="w-3.5 h-3.5 fill-current text-[#2563EB]" />
              <span>Zentrale rufen: 0177 6721642</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
