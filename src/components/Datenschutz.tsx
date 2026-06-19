import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert, Lock, Fingerprint, Eye, EyeOff } from 'lucide-react';

interface DatenschutzProps {
  onBackToHome: () => void;
}

export default function Datenschutz({ onBackToHome }: DatenschutzProps) {
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
            Datenschutz<span className="text-[#2563EB]">.</span>
          </h1>
          <p className="text-[13px] text-neutral-500 font-light mt-3 leading-relaxed">
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Nachfolgend erhalten Sie alle gesetzlich vorgeschriebenen Informationen über die Erfassung und Verarbeitung Ihrer personenbezogenen Daten auf unserer Plattform.
          </p>
        </div>

        {/* Quick core concepts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-5 bg-neutral-50/60 rounded-2xl border border-neutral-150 flex flex-col gap-2.5">
            <Lock className="w-5 h-5 text-[#2563EB]" />
            <h4 className="font-bold text-xs text-neutral-900 uppercase tracking-wider">Tunnelsicherheit</h4>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">Modernste TLS/SSL-Verschlüsselung schützt Ihre Datenübertragung zu jedem Zeitpunkt vor unberechtigter Einsicht.</p>
          </div>
          <div className="p-5 bg-neutral-50/60 rounded-2xl border border-neutral-150 flex flex-col gap-2.5">
            <Fingerprint className="w-5 h-5 text-[#2563EB]" />
            <h4 className="font-bold text-xs text-neutral-900 uppercase tracking-wider">Datenminimierung</h4>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">Wir erheben ausschließlich Daten, die zwingend erforderlich sind, um Ihre Notöffnung oder Anfrage ordnungsgemäß abzuwickeln.</p>
          </div>
          <div className="p-5 bg-neutral-50/60 rounded-2xl border border-neutral-150 flex flex-col gap-2.5">
            <EyeOff className="w-5 h-5 text-[#2563EB]" />
            <h4 className="font-bold text-xs text-neutral-900 uppercase tracking-wider">Keine Tracker</h4>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">Auf unserer Webseite werden keine unaufgeforderten Werbe-Cookies, Remarketing-Pixel oder Spionage-Dienste geladen.</p>
          </div>
        </div>

        {/* Policy document bodies */}
        <div className="flex flex-col gap-10 text-[13.5px] leading-relaxed text-neutral-600 font-light">
          
          {/* Section 1 */}
          <div>
            <h3 className="font-extrabold text-[15px] text-neutral-950 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="text-[#2563EB]">1.</span> Datenschutz auf einen Blick
            </h3>
            <div className="flex flex-col gap-4">
              <p>
                <strong>Verantwortliche Stelle für die Datenverarbeitung auf dieser Webseite:</strong><br />
                Türengel Schlüsselnotdienst &amp; Schlosswechsel<br />
                Hakan Simsek<br />
                Bocholderstr. 207, 45356 Essen<br />
                E-Mail: Kontakt@türengel.de<br />
                Telefon: 0177 6721642
              </p>
              <p>
                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei handelt es sich z.B. um Daten, die Sie uns telefonisch übermitteln, wenn Sie unseren Express-Schlüsselnotdienst anfordern (z.B. Name, genaue Adresse, Telefonnummer). Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="border-t border-neutral-100 pt-8">
            <h3 className="font-extrabold text-[15px] text-neutral-950 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="text-[#2563EB]">2.</span> Ihre gesetzlichen Rechte (DSGVO)
            </h3>
            <p className="mb-4">
              Nach den Bestimmungen der Datenschutz-Grundverordnung (EU-DSGVO) stehen Ihnen als betroffene Person zahlreiche kostenfreie Rechte zur Verfügung:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2.5">
              <li>
                <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht, jederzeit unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.
              </li>
              <li>
                <strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie können verlangen, dass unrichtige oder unvollständige Daten unverzüglich berichtigt werden.
              </li>
              <li>
                <strong>Recht auf Löschung (Art. 17 DSGVO) „Recht auf Vergessenwerden“:</strong> Sie können die Löschung Ihrer Daten verlangen, sofern dem keine gesetzlichen Aufbewahrungsfristen entgegenstehen.
              </li>
              <li>
                <strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie dürfen die Einschränkung der Weiterverarbeitung Ihrer Daten verlangen.
              </li>
              <li>
                <strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können verlangen, dass wir Ihnen Ihre erhobenen Daten in einem maschinenlesbaren Format übergeben.
              </li>
              <li>
                <strong>Widerrufsrecht (Art. 7 Abs. 3 DSGVO):</strong> Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit formlos (z. B. per E-Mail) widerrufen.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="border-t border-neutral-100 pt-8">
            <h3 className="font-extrabold text-[15px] text-neutral-950 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="text-[#2563EB]">3.</span> Beschwerderecht bei der Aufsichtsbehörde
            </h3>
            <p>
              Im Falle von datenschutzrechtlichen Verstößen steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. In Nordrhein-Westfalen ist dies:
              <br /><br />
              <strong className="text-neutral-900 font-medium font-sans">Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)</strong><br />
              Kavalleriestraße 2-4, 40213 Düsseldorf<br />
              E-Mail: poststelle@ldi.nrw.de<br />
              Website: www.ldi.nrw.de
            </p>
          </div>

          {/* Section 4 */}
          <div className="border-t border-neutral-100 pt-8">
            <h3 className="font-extrabold text-[15px] text-neutral-950 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="text-[#2563EB]">4.</span> Datenerfassung auf unserer Webseite
            </h3>
            <div className="flex flex-col gap-4">
              <p>
                <strong>Server-Log-Dateien:</strong> Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 font-mono text-xs text-neutral-500">
                <li>• Browsertyp und Browserversion</li>
                <li>• Verwendetes Betriebssystem und Gerätedaten</li>
                <li>• Referrer URL (die zuvor besuchte Seite)</li>
                <li>• Hostname des zugreifenden Rechners / IP-Adresse (anonymisiert)</li>
                <li>• Uhrzeit und Datum der Serveranfrage</li>
              </ul>
              <p>
                Diese Daten sind nicht bestimmten Personen zuzuordnen. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO, der die Verarbeitung von Daten zur Gewährleistung der Stabilität, Integrität und Netzsicherheit unseres Web-Angebots gestattet.
              </p>
              <p>
                <strong>Notruf und Direktanrufe:</strong> Wenn Sie uns telefonisch für einen Notdienst oder eine Beratung kontaktieren (Klick auf Telefon-Links oder direkte Rufnummerneingabe), erfassen wir Ihren Namen, Ihre Telefonnummer, Ihren Aufenthaltsort in Essen, Gelsenkirchen, Duisburg o.Ä. und die Art der vorliegenden Schlosskomplikation. Dies ist für die Erfüllung des Vertrages bzw. zur Durchführung vorvertraglicher Maßnahmen gem. Art. 6 Abs. 1 lit. b DSGVO zwingend erforderlich.
              </p>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
