// src/components/ImpressumPage.tsx
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ObfuscatedEmail from './ObfuscatedEmail'; // Make sure the path is correct relative to this file

const ImpressumPage = ({ onBack }) => {
  return (
    <main className="text-gray-300">
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="inline-flex items-center mb-12 text-lime-400 hover:text-lime-300 transition-colors group">
          <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Zurück zur Hauptseite
        </button>
        <div className="bg-gray-950/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 md:p-12 space-y-8">
          <h1 className="text-4xl font-bold text-white">Impressum</h1>
          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">Angaben gemäß § 5 TMG</h2>
            <p className="leading-relaxed">FALK SOLUTIONS LLC<br />30 N Gould St Ste R<br />Sheridan, WY, 82801, USA</p>
            <p className="mt-2"><strong>Rechtsform:</strong> Limited Liability Company (LLC)</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">Kontakt</h2>
            <p><strong>E-Mail:</strong> <ObfuscatedEmail user="kontakt" domain="falksolutions.net" /></p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">Registereintrag</h2>
            <p>Eingetragen im Handelsregister des Staates Wyoming</p>
            <p><strong>Registerführende Behörde:</strong> Wyoming Secretary of State</p>
            <p><strong>File Number (Registernummer):</strong> 2024-001509709</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">Umsatzsteuer</h2>
            <p className="leading-relaxed">Als US-amerikanisches Unternehmen ohne Niederlassung in der Europäischen Union unterliegen unsere Dienstleistungen nicht der deutschen Umsatzsteuer. Bei Geschäften mit anderen Unternehmen in der EU findet ggf. das Reverse-Charge-Verfahren Anwendung.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p className="leading-relaxed">Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ImpressumPage;
