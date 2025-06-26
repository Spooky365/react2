// src/components/DatenschutzerklaerungPage.tsx
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ObfuscatedEmail from './ObfuscatedEmail'; // Make sure the path is correct relative to this file

const DatenschutzerklaerungPage = ({ onBack }) => {
  return (
    <main className="text-gray-300">
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="inline-flex items-center mb-12 text-lime-400 hover:text-lime-300 transition-colors group">
          <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Zurück zur Hauptseite
        </button>
        <div className="bg-gray-950/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 md:p-12 space-y-8">
          <h1 className="text-4xl font-bold text-white">Datenschutzerklärung</h1>
          <p><strong>Stand:</strong> {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Verantwortlicher</h2>
            <p className="leading-relaxed">
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br /><br />
              <strong>Falk Solutions, LLC</strong><br />
              30 N Gould St Ste R<br />
              Sheridan, WY, 82801, USA<br /><br />
              <strong>E-Mail:</strong> <ObfuscatedEmail user="kontakt" domain="falksolutions.net" />
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Ihre Rechte als betroffene Person</h2>
            <p className="leading-relaxed">Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch gegen die Verarbeitung, Datenübertragbarkeit und das Recht, sich bei einer Aufsichtsbehörde zu beschweren. Sie können Einwilligungen jederzeit mit Wirkung für die Zukunft widerrufen.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Datenverarbeitung auf unserer Website</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">a) Hosting und Server-Log-Dateien</h3>
                <p className="leading-relaxed">Unser Hostinganbieter erhebt bei jedem Zugriff auf die Website Daten in sog. Server-Log-Dateien. Dazu gehören Ihre IP-Adresse, Browsertyp, Betriebssystem, Referrer URL und Uhrzeit. Diese Verarbeitung dient unserem berechtigten Interesse an einer sicheren und effizienten Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO). Die Daten werden nach kurzer Zeit gelöscht.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">b) Kontaktformular</h3>
                <p className="leading-relaxed">Bei Nutzung des Kontaktformulars verarbeiten wir Ihre eingegebenen Daten (Name, E-Mail, etc.) zur Bearbeitung Ihrer Anfrage. Dies geschieht zur Durchführung vorvertraglicher Maßnahmen oder zur Erfüllung eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO) bzw. auf Basis unseres berechtigten Interesses an einer effektiven Kommunikation (Art. 6 Abs. 1 lit. f DSGVO). Ihre Daten werden nach Abschluss der Bearbeitung gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">c) hCaptcha</h3>
                <p className="leading-relaxed">Wir nutzen hCaptcha (Anbieter: Intuition Machines, Inc., USA) zum Schutz vor Spam. Dabei werden Daten wie Ihre IP-Adresse und Ihr Nutzerverhalten an Server in den USA übertragen. Die USA gelten als Drittland mit einem potenziell geringeren Datenschutzniveau. Die Rechtsgrundlage ist unser berechtigtes Interesse am Schutz unserer Website (Art. 6 Abs. 1 lit. f DSGVO). Die Datenübermittlung stützt sich auf Standardvertragsklauseln der EU-Kommission.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">4. SSL/TLS-Verschlüsselung</h2>
            <p className="leading-relaxed">Diese Seite nutzt aus Sicherheitsgründen eine SSL/TLS-Verschlüsselung, erkennbar am "https://" in der Adresszeile und am Schloss-Symbol.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DatenschutzerklaerungPage;
