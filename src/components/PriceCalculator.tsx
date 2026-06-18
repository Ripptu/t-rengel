import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Check, Phone, Clock, MapPin, Sparkles, ShieldCheck, Info } from 'lucide-react';

interface CalculationResult {
  base: number;
  surcharge: number;
  travel: number;
  total: number;
  isCustom: boolean;
}

export default function PriceCalculator() {
  const [service, setService] = useState<'zugefallen' | 'verschlossen' | 'auto' | 'riegelbruch' | 'briefkasten'>('zugefallen');
  const [time, setTime] = useState<'tag' | 'nacht' | 'wochenende'>('tag');
  const [region, setRegion] = useState<'essen' | 'umland'>('essen');

  // Interactive calculation matrix
  const calculatePrice = (): CalculationResult => {
    let base = 69;
    let isCustom = false;

    switch (service) {
      case 'zugefallen':
        base = 69;
        break;
      case 'verschlossen':
        base = 129; // includes simple replacement cylinder
        break;
      case 'auto':
        base = 119;
        break;
      case 'riegelbruch':
        base = 89;
        break;
      case 'briefkasten':
        base = 49;
        break;
    }

    let surcharge = 0;
    if (time === 'nacht' || time === 'wochenende') {
      surcharge = 30;
    }

    let travel = region === 'essen' ? 10 : 15;

    return {
      base,
      surcharge,
      travel,
      total: base + surcharge + travel,
      isCustom
    };
  };

  const totals = calculatePrice();

  return (
    <div className="w-full bg-[#090a0f] border border-neutral-800/90 rounded-3xl p-6 md:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.8)] hover:shadow-[0_30px_90px_rgba(37,99,235,0.15)] transition-all duration-500 relative overflow-hidden">
      
      {/* Cinematic Glowing Background Accents */}
      <div className="absolute top-0 right-[-10%] w-[380px] h-[380px] bg-[#2563EB]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#2563EB]/25 to-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0 shadow-[0_0_25px_rgba(37,99,235,0.2)]">
            <Calculator className="w-5 h-5 stroke-[2.2px]" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-xl md:text-2xl text-white tracking-tight">
              Preiskalkulator
            </h3>
            <p className="text-xs text-neutral-400 font-medium tracking-tight mt-1 font-display">Verbindliche Echtzeit-Ermittlung des Endpreises</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-wider font-display border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse text-emerald-400" />
          <span>FESTPREIS-LIMIT GARANTIERT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Selector Panel (Left columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* 1. Service Type Selector */}
          <div>
            <label className="text-[10px] font-bold tracking-widest text-[#3B82F6] uppercase font-display block mb-3.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span>1. Art der benötigten Dienstleistung</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'zugefallen', label: 'Tür lediglich zugefallen', desc: 'Zerstörungsfreie Öffnung (99%)', base: '69 €' },
                { id: 'verschlossen', label: 'Tür abgeschlossen', desc: 'Inkl. Einbauhilfe & Profilzylinder', base: '129 €' },
                { id: 'auto', label: 'Pkw- / Autoöffnung', desc: 'Spezial-Notöffnung ohne Kratzer', base: '119 €' },
                { id: 'riegelbruch', label: 'Riegel- & Schlüsselbruch', desc: 'Schlosstausch & Reparatur', base: '89 €' },
                { id: 'briefkasten', label: 'Briefkasten- / Zusatzschloss', desc: 'Günstiger Lokaltarif im Ruhrgebiet', base: '49 €' },
              ].map((item) => {
                const isSelected = service === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setService(item.id as any)}
                    className={`group text-left px-5 py-4 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-center cursor-pointer select-none ${
                      isSelected 
                      ? 'border-[#2563EB] bg-[#2563EB]/15 shadow-[0_0_25px_rgba(37,99,235,0.2)] text-white' 
                      : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-neutral-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[13px] font-extrabold tracking-tight font-display mb-0.5">
                        {item.label}
                      </span>
                      <span className={`text-[12px] font-display font-extrabold shrink-0 ${isSelected ? 'text-[#3B82F6]' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                        {item.base}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400 mt-1 leading-relaxed font-medium block truncate font-display">
                      {item.desc}
                    </span>
                    {isSelected && (
                      <div className="absolute right-0 bottom-0 w-6 h-6 bg-[#2563EB] rounded-tl-xl flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white stroke-[3.5px]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* 2. Surtax Time Selector */}
            <div>
              <label className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase font-display block mb-3.5 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-450" />
                <span>2. Wochentag & Uhrzeit</span>
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'tag', label: 'Werktags (Tagestarif)', desc: 'Mo-Fr 08:00 - 18:00 Uhr', extra: 'Basis Preis' },
                  { id: 'nacht', label: 'Werktags (Schichtdienst)', desc: 'Mo-Fr 18:00 - 08:00 Uhr', extra: '+ 30 €' },
                  { id: 'wochenende', label: 'Wochenende & Feiertage', desc: 'Rund um die Uhr besetzt', extra: '+ 30 €' },
                ].map((item) => {
                  const isSelected = time === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setTime(item.id as any)}
                      className={`text-left px-4 py-3.5 rounded-2xl border transition-all duration-300 cursor-pointer select-none flex justify-between items-center ${
                        isSelected 
                        ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                        : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-neutral-300 hover:text-white'
                      }`}
                    >
                      <div className="font-display">
                        <div className="text-[12px] font-extrabold tracking-tight">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-neutral-450 mt-1 font-medium">
                          {item.desc}
                        </div>
                      </div>
                      <span className={`text-[10px] font-extrabold font-display px-2.5 py-1 rounded-full shrink-0 ${
                        isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-neutral-450'
                      }`}>
                        {item.extra}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Distance Region Selector */}
            <div>
              <label className="text-[10px] font-bold tracking-widest text-[#3B82F6] uppercase font-display block mb-3.5 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-450" />
                <span>3. Einsatzgebiet / Anfahrt</span>
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'essen', label: 'Essen Stadtgebiet', desc: 'Alle 50 lokalen Stadtteile', travel: '10 € Fest' },
                  { id: 'umland', label: 'Angrenzendes Ruhrgebiet', desc: 'Mülheim, Bottrop, Gelsenkirchen etc.', travel: '15 € Fest' },
                ].map((item) => {
                  const isSelected = region === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setRegion(item.id as any)}
                      className={`text-left px-4 py-3.5 rounded-2xl border transition-all duration-300 cursor-pointer select-none flex justify-between items-center ${
                        isSelected 
                        ? 'border-[#2563EB] bg-[#2563EB]/15 text-white shadow-[0_0_20px_rgba(37,99,235,0.15)]' 
                        : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-neutral-300 hover:text-white'
                      }`}
                    >
                      <div className="font-display">
                        <div className="text-[12px] font-extrabold tracking-tight">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-neutral-455 mt-1 font-medium">
                          {item.desc}
                        </div>
                      </div>
                      <span className={`text-[10px] font-extrabold font-display px-2.5 py-1 rounded-full shrink-0 ${
                        isSelected ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-neutral-445'
                      }`}>
                        {item.travel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic Calculation Summary Card (Right columns) */}
        <div className="lg:col-span-5 bg-white/[0.015] rounded-3xl p-6 md:p-7 border border-white/5 flex flex-col justify-between h-full relative overflow-hidden backdrop-blur-xl">
          
          {/* Subtle status pulsing point */}
          <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping m-6" />

          <div>
            <h4 className="text-[10px] font-black tracking-widest font-display text-neutral-400 uppercase mb-5 flex items-center gap-1.5 matches-focus">
              <ShieldCheck className="w-4 h-4 text-emerald-450 shrink-0" />
              <span>Verbindliche Preisberechnung</span>
            </h4>

            {/* Calculations Rows using clean Display typography */}
            <div className="flex flex-col gap-3.5 border-b border-white/5 pb-5 mb-5 font-display">
              <div className="flex justify-between text-[12px] text-neutral-300">
                <span className="font-medium">Grundpauschale Öffnung:</span>
                <span className="font-extrabold text-white">{totals.base} €</span>
              </div>
              <div className="flex justify-between text-[12px] text-neutral-300">
                <span className="font-medium">Nacht- / Sonntagsaufschlag:</span>
                <span className="font-extrabold text-white">
                  {totals.surcharge > 0 ? `+ ${totals.surcharge} €` : '0 €'}
                </span>
              </div>
              <div className="flex justify-between text-[12px] text-neutral-300">
                <span className="font-medium">Fahrtkosten-Zollsatz:</span>
                <span className="font-extrabold text-white">+ {totals.travel} €</span>
              </div>
            </div>

            {/* Total Display */}
            <div className="flex items-center justify-between mb-5 font-display">
              <span className="text-[13px] font-black uppercase text-white tracking-wider">ENDPREIS GARANTIERT:</span>
              <div className="flex flex-col items-end">
                <span className="text-5xl font-display font-extrabold text-white leading-none tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">
                  {totals.total} €
                </span>
                <span className="text-[9px] text-neutral-450 font-semibold mt-1.5 uppercase tracking-wide">Inkl. 19% MwSt. | Keine Zusatzkosten</span>
              </div>
            </div>

            {/* Info Hint */}
            <div className="flex items-start gap-3 bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl mb-6 shadow-xl font-display">
              <Info className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
              <p className="text-[11px] text-neutral-300 leading-relaxed font-medium">
                <span className="font-extrabold text-white">Transparenz-Gelübde:</span> Kein Lockvogel­preis. Unsere geschulten Monteure weichen vor Ort nicht um einen Cent von diesem Endpreis ab.
              </p>
            </div>
          </div>

          {/* Large Phone CTA Button */}
          <a
            href="tel:+491776721642"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white py-4 px-6 rounded-2xl shadow-[0_12px_45px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_55px_rgba(37,99,235,0.4)] hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 font-display font-extrabold text-xs tracking-widest uppercase active:scale-95 group text-center select-none cursor-pointer"
          >
            <Phone className="w-4 h-4 fill-current text-white shrink-0 group-hover:animate-bounce" />
            <span>Notdienst rufen & Preis sichern</span>
          </a>

          {/* Subtext info */}
          <div className="text-center mt-4 text-[10px] text-neutral-450 font-medium tracking-tight font-display">
            Abfahrbereit in Essen & Ruhrgebiet – Eintragsdauer ca. 15-30 Min.
          </div>

        </div>

      </div>

    </div>
  );
}
