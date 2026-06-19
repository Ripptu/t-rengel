import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MapPin, FileText, ExternalLink } from 'lucide-react';

interface ImpressumProps {
  onBackToHome: () => void;
}

export default function Impressum({ onBackToHome }: ImpressumProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-[92%] max-w-4xl mx-auto py-24 md:py-32 relative z-20"
    >
      {/* Return button */}
      <button
        onClick={onBackToHome}
        className="group inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 shadow-sm text-xs font-bold tracking-widest uppercase transition-all mb-8 cursor-pointer select-none"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Zurück zur Startseite</span>
      </button>

      {/* Main glassmorphism container */}
      <div className="bg-white/90 backdrop-blur-3xl border border-neutral-200/60 rounded-3xl p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.03)] selection:bg-[#2563EB] selection:text-white">
        
        {/* Header section */}
        <div className="border-b border-neutral-200/60 pb-8 mb-10">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-950 font-sans leading-none">
            Impressum<span className="text-[#2563EB]">.</span>
          </h1>
          <p className="text-[13px] text-neutral-500 font-light mt-3 leading-relaxed">
            Pflichtangaben nach § 5 TMG (Telemediengesetz) und allgemeine Verbraucherinformationen für den Betrieb der Webseite.
          </p>
        </div>

        {/* Legal disclosures layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Card 1: Angabe gemäß § 5 TMG */}
          <div className="flex flex-col gap-5 p-6 bg-neutral-50/50 border border-neutral-150 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-neutral-950 uppercase tracking-wider">Angaben gemäß § 5 TMG</h3>
            </div>
            
            <div className="flex flex-col gap-2.5 text-[14px] leading-relaxed text-neutral-700">
              <span className="font-bold text-neutral-900 block text-[15px]">Türengel Schlüsselnotdienst</span>
              <p className="font-light">
                Inhaber: Hakan Simsek<br />
                Bocholderstr. 207<br />
                45356 Essen
              </p>
            </div>
          </div>

          {/* Card 2: Kontaktkanäle */}
          <div className="flex flex-col gap-5 p-6 bg-neutral-50/50 border border-neutral-150 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-neutral-950 uppercase tracking-wider">Erreichbarkeit &amp; Kontakt</h3>
            </div>
            
            <div className="flex flex-col gap-3 text-[14px] leading-relaxed text-neutral-700">
              <a href="tel:+491776721642" className="flex items-center gap-2.5 hover:text-[#2563EB] transition-colors font-medium">
                <span className="font-mono text-[11px] text-stone-400">Mobil / 24h:</span>
                0177 6721642
              </a>
              <a href="tel:+492014764314" className="flex items-center gap-2.5 hover:text-[#2563EB] transition-colors font-medium">
                <span className="font-mono text-[11px] text-stone-400">Büro Festnetz:</span>
                0201 476 43 14
              </a>
              <a href="mailto:Kontakt@türengel.de" className="flex items-center gap-2.5 hover:text-[#2563EB] transition-colors font-medium">
                <span className="font-mono text-[11px] text-stone-400">E-Mail:</span>
                Kontakt@türengel.de
              </a>
            </div>
          </div>

        </div>

        {/* Extra Legal Sections */}
        <div className="flex flex-col gap-8 mt-10 text-[13.5px] leading-relaxed text-neutral-600 font-light">
          
          <div className="border-t border-neutral-100 pt-8">
            <h4 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider mb-3">Umsatzsteuer-ID</h4>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              <strong className="font-mono text-xs text-neutral-800 font-semibold uppercase bg-neutral-100 px-1.5 py-0.5 rounded">Wird nachgereicht / folgt noch</strong>
            </p>
          </div>

          <div className="border-t border-neutral-100 pt-8">
            <h4 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider mb-3">EU-Streitschlichtung</h4>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter folgendem Link finden:&nbsp;
              <a 
                href="https://ec.europa.eu/consumers/odr/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#2563EB] font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>https://ec.europa.eu/consumers/odr/</span>
                <ExternalLink className="w-3.5 h-3.5 inline" />
              </a>.
              <br />
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div className="border-t border-neutral-100 pt-8">
            <h4 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider mb-3">Haftungsausschluss (Disclaimer)</h4>
            <div className="flex flex-col gap-4">
              <p>
                <strong>Haftung für Inhalte:</strong> Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
              </p>
              <p>
                <strong>Haftung für Links:</strong> Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
