import React, { useState, useEffect, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { 
  Server, Cloud, Code, CheckCircle, Menu, X, ArrowRight, Terminal, Zap, Globe, 
  Lock, Cpu, HardDrive, GitFork, Power, TrendingUp, Smile, Phone, ArrowLeft 
} from 'lucide-react';

import DeploymentPipeline from './components/DeploymentPipeline'; 
import { R3FSceneCube } from './components/MasterCube.tsx';
const APP_VERSION = "v1.1.6";

const ObfuscatedEmail = ({ user, domain }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(`${user}@${domain}`);
  }, [user, domain]);

  if (!email) {
    return <span>[E-Mail wird geladen...]</span>;
  }
  return <a href={`mailto:${email}`} className="text-lime-400 hover:underline">{email}</a>;
};

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


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [view, setView] = useState('main');

  const [formData, setFormData] = useState({ name: '', email: '', project: 'Linux Server Setup', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  
  const handleInputChange = (e) => { 
    const { name, value } = e.target; 
    setFormData((prev) => ({ ...prev, [name]: value })); 
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    if (!token) { setFormStatus('captcha_error'); return; } 
    setFormStatus('sending'); 
    try { 
      const response = await fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, "h-captcha-token": token }) });
      captchaRef.current.resetCaptcha(); 
      setToken(null); 
      if (response.ok) { 
        setFormStatus('success'); 
        setFormData({ name: '', email: '', project: 'Linux Server Setup', message: '' }); 
      } else { 
        setFormStatus('error'); 
      } 
    } catch (error) { 
      console.error('Submission error:', error); 
      setFormStatus('error'); 
      captchaRef.current.resetCaptcha(); 
      setToken(null); 
    } 
  };

  useEffect(() => { 
    if (view === 'main') { 
      const observer = new IntersectionObserver((entries) => { 
        entries.forEach((entry) => { 
          if (entry.isIntersecting) { 
            setActiveSection(entry.target.id); 
          } 
        }); 
      }, { rootMargin: '-50% 0px -50% 0px' });
      const sections = document.querySelectorAll('section[id]'); 
      sections.forEach((section) => observer.observe(section)); 
      return () => sections.forEach((section) => observer.unobserve(section)); 
    } 
  }, [view]);
  
  const scrollToSection = (sectionId) => { 
    if (view !== 'main') { 
      setView('main'); 
      setTimeout(() => { 
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }); 
      }, 100); 
    } else { 
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }); 
    } 
    setIsMenuOpen(false); 
  };
  
  const switchView = (newView) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const services = [
    { icon: <Server className="h-8 w-8" />, title: "Linux-Server-Administration", description: "Professionelle Verwaltung und Optimierung von Linux-Servern für maximale Performance und Sicherheit.", features: ["Ubuntu/CentOS/Debian", "Performance-Tuning", "Monitoring & Alerts", "Backup-Strategien"] },
    { icon: <Cloud className="h-8 w-8" />, title: "Cloud DevOps", description: "Moderne Cloud-Infrastruktur mit CI/CD-Pipelines, Container-Orchestrierung und Automatisierung.", features: ["Cloud-Anbieter (AWS, OCI, ...)", "Docker & Kubernetes", "Infrastructure as Code", "FluxCD / ArgoCD / Github Actions"] },
    { icon: <Terminal className="h-8 w-8" />, title: "Automation & Scripting", description: "Prozessautomatisierung durch intelligente Skripte und moderne DevOps-Tools.", features: ["Ansible / Bash / Python", "Task Automation", "System Monitoring", "Log Management"] }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-lime-500 selection:text-black">
      <nav className="fixed top-0 left-0 right-0 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <button onClick={() => switchView('main')} className="flex items-center space-x-2 cursor-pointer">
              <Terminal className="h-6 w-6 text-lime-400" />
              <span className="text-lg font-bold text-white">Falk Solutions</span>
            </button>
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'services', 'about', 'projects', 'contact'].map((item) => (
                <a key={item} href={`#${item}`} onClick={(e) => { e.preventDefault(); scrollToSection(item); }} className={`text-sm font-medium transition-colors ${activeSection === item && view === 'main' ? 'text-lime-400' : 'text-gray-300 hover:text-white'}`}>
                  {item === 'home' ? 'Start' : item === 'services' ? 'Leistungen' : item === 'about' ? 'Über mich' : item === 'projects' ? 'Projekte' : 'Kontakt'}
                </a>
              ))}
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
            </div>
          </div>
        </div>
        {isMenuOpen && (<div className="md:hidden bg-gray-900/95 backdrop-blur-sm border-t border-gray-800"><div className="px-2 pt-2 pb-3 space-y-1">{['home', 'services', 'about', 'projects', 'contact'].map((item) => (<a key={item} href={`#${item}`} onClick={(e) => { e.preventDefault(); scrollToSection(item); }} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md w-full text-left">{item === 'home' ? 'Start' : item === 'services' ? 'Leistungen' : item === 'about' ? 'Über mich' : item === 'projects' ? 'Projekte' : 'Kontakt'}</a>))}</div></div>)}
      </nav>

      {view === 'impressum' && <ImpressumPage onBack={() => switchView('main')} />}
      {view === 'datenschutz' && <DatenschutzerklaerungPage onBack={() => switchView('main')} />}
      
      {view === 'main' && (
        <main>
          {/* === THIS IS THE ONLY SECTION THAT HAS BEEN MODIFIED === */}
          <section id="home" className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* This flex container creates the responsive side-by-side layout */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

                {/* Left side: All your original text content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center px-4 py-2 bg-lime-500/10 border border-lime-500/20 rounded-full text-lime-400 text-sm font-medium mb-8">
                    <Zap className="h-4 w-4 mr-2" />
                    Professionelle DevOps-Lösungen
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                    Moderne IT-Infrastruktur
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">für Ihr Unternehmen</span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-10">
                    Ich bin Ihr spezialisierter IT-Freelancer für Linux, Cloud & DevOps-Infrastruktur.
                    Lassen Sie uns Ihre IT-Systeme auf das nächste Level bringen.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <button onClick={() => scrollToSection('contact')} className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-lime-500 to-green-600 text-white font-semibold rounded-lg hover:from-lime-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                      Projekt besprechen
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                    <button onClick={() => scrollToSection('projects')} className="inline-flex items-center px-8 py-4 bg-gray-900/80 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all border border-gray-700">
                      Projekt-Highlight
                    </button>
                  </div>
                </div>

                {/* Right side: The 3D Cube */}
                <div className="flex-1 w-full max-w-sm lg:max-w-md xl:max-w-lg">
                  <div className="aspect-square">
                    <R3FSceneCube />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* === ALL THE FOLLOWING SECTIONS ARE IDENTICAL TO YOUR ORIGINAL FILE === */}
          <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Meine Leistungen</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">Umfassende IT-Lösungen für moderne Unternehmen</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div key={index} className="bg-gray-950/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-lime-500/50 transition-all hover:transform hover:scale-105 group">
                    <div className="text-lime-400 mb-6 group-hover:text-lime-300 transition-colors">{service.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    <ul className="space-y-2">{service.features.map((feature, idx) => (<li key={idx} className="flex items-center text-sm text-gray-400"><CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />{feature}</li>))}</ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Über Falk Solutions</h2>
                  <div className="space-y-6 text-gray-300">
                    <p className="text-lg">Mit über 8 Jahren Erfahrung in der IT-Branche bin ich auf DevOps-Praktiken, Linux-Server-Administration und Cloud-Infrastruktur spezialisiert. Mein Fokus liegt auf der Automatisierung von Prozessen und der Optimierung von Systemen für maximale Effizienz.</p>
                    <p>Ich arbeite mit modernsten Technologien und Tools, um Ihnen robuste, skalierbare und sichere IT-Lösungen zu bieten. Dabei lege ich großen Wert auf Kommunikation, Zuverlässigkeit und kontinuierliche Verbesserung.</p>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-6">
                    <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800 transition-all hover:transform hover:scale-105 hover:border-lime-500/50"><div className="flex items-center text-2xl font-bold text-lime-400 mb-1">24/7<Phone className="ml-2 h-6 w-6" /></div><div className="text-sm text-gray-400">erreichbar</div></div>
                    <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800 transition-all hover:transform hover:scale-105 hover:border-lime-500/50"><div className="flex items-center text-2xl font-bold text-lime-400 mb-1">100 %<Smile className="ml-2 h-6 w-6" /></div><div className="text-sm text-gray-400">kundenorientiert</div></div>
                  </div>
                </div>
                <div className="bg-gray-950/50 rounded-xl p-8 border border-gray-800 transition-all hover:transform hover:scale-105 hover:border-lime-500/50">
                  <h3 className="text-xl font-bold text-white mb-6">Expertise</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {[{ icon: <Globe className="h-5 w-5" />, name: "Cloud-Infrastruktur" }, { icon: <Cpu className="h-5 w-5" />, name: <>Docker<br />Kubernetes</> }, { icon: <HardDrive className="h-5 w-5" />, name: "Linux-Administration" }, { icon: <Code className="h-5 w-5" />, name: "Infrastructure as Code" }, { icon: <Zap className="h-5 w-5" />, name: "Ansible-Automatisierung" }, { icon: <Lock className="h-5 w-5" />, name: "Firewalls & Security" }, { icon: <GitFork className="h-5 w-5" />, name: "Loadbalancing" }, { icon: <Power className="h-5 w-5" />, name: "High Availability" }, { icon: <TrendingUp className="h-5 w-5" />, name: "Scaling" }].map((skill, index) => (<div key={index} className="flex items-center space-x-3 text-gray-300"><div className="text-lime-400">{skill.icon}</div><span className="text-sm leading-tight">{skill.name}</span></div>))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Projekt-Highlight:</h2>
              	<p className="text-xl text-gray-300 max-w-2xl mx-auto">Einblick in eine vollautomatisierte CI/CD-Pipeline von der Entwicklung bis zum Live-System.</p>
		          </div>
              <div className="flex justify-center">
                <div className="max-w-4xl w-full bg-gray-950/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-lime-500/50 transition-all hover:transform hover:scale-105">
                  <h3 className="text-2xl font-bold text-white mb-4">Projekt-Highlight: Vollautomatisierte CI/CD-Pipeline</h3>
                  <p className="text-gray-300 mb-6">Entwicklung einer kompletten CI/CD-Pipeline, die eine React-Webanwendung mittels FluxCD vollautomatisch von einem Git-Repository auf AWS bereitstellt.</p>
                  <ul className="space-y-3 mb-6 text-gray-300">
                     <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" /><span><strong>Automatisierte Builds:</strong> GitHub Actions für Testing und Docker-Image Erstellung.</span></li>
                     <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" /><span><strong>Infrastructure as Code:</strong> Terraform für die Bereitstellung der AWS-Ressourcen.</span></li>
                     <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" /><span><strong>Cluster-Setup:</strong> Ansible für die schnelle Konfiguration eines K3s Kubernetes-Clusters.</span></li>
                     <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" /><span><strong>GitOps-Workflow:</strong> FluxCD rollt neue Versionen nach einem Push in unter einer Minute live aus.</span></li>
                     <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" /><span><strong>Sicherheit & Komfort:</strong> Inklusive automatischem SSL-Zertifikatsmanagement mittels Cert-Manager.</span></li>
                     <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" /><span><strong>Loadbalancing & Ingress:</strong> AWS Load-Balancer für die Kubernetes Control Plane und HAProxy Ingress für optimale Ressourcennutzung.</span></li>
                     <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" /><span><strong>Verfügbarkeit & Skalierung:</strong> Konzipiert für High Availability und einfache Skalierung der Workloads.</span></li>
                  </ul>
                  <div className="flex flex-wrap gap-2 mb-6">{['React', 'GitHub Actions', 'FluxCD', 'Terraform', 'Ansible', 'K3s', 'AWS'].map((tech) => (<span key={tech} className="px-3 py-1 bg-lime-500/10 text-lime-400 text-xs rounded-full border border-lime-500/20">{tech}</span>))}</div>
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700"><p className="text-green-400 font-semibold text-center">Resultat: Deployment von Zero-to-Live in wenigen Minuten und vollautomatisierte Updates.</p></div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-6xl mx-auto mb-6 px-2 pt-6 overflow-x-auto">
              <DeploymentPipeline />
            </div>
          </section>

          <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/50">
             <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Kontakt aufnehmen</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">Bereit für Ihr nächstes Projekt? Lassen Sie uns sprechen.</p>
              </div>
              <div className="flex justify-center">
                <div className="bg-gray-950/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 w-full max-w-xl">
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500" placeholder="Ihr Name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">E-Mail</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500" placeholder="ihre.email@beispiel.de" />
                    </div>
                    <div>
                      <label htmlFor="project" className="block text-sm font-medium text-gray-300 mb-2">Projekt-Art</label>
                      <select id="project" name="project" value={formData.project} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500">
                        <option>Linux Server Setup</option><option>Cloud Migration</option><option>DevOps Beratung</option><option>CI/CD Pipeline</option><option>Security Audit</option><option>Sonstiges</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Nachricht</label>
                      <textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500" placeholder="Beschreiben Sie Ihr Projekt..."></textarea>
                    </div>
                    <div className="flex justify-center">
                       <HCaptcha sitekey="6deca056-c39a-49a2-897c-cf467d7c521c" onVerify={(verifiedToken) => { setToken(verifiedToken); setFormStatus(''); }} onExpire={() => setToken(null)} ref={captchaRef} theme="dark" />
                    </div>
                    <div>
                      <button type="submit" disabled={formStatus === 'sending'} className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-lime-500 to-green-600 text-white font-semibold rounded-lg hover:from-lime-600 hover:to-green-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                        {formStatus === 'sending' ? 'Wird gesendet...' : 'Nachricht senden (verschlüsselt)'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                      {formStatus === 'success' && <p className="text-green-400 mt-4 text-center">Vielen Dank! Ihre Nachricht wurde sicher verschlüsselt gesendet.</p>}
                      {formStatus === 'error' && <p className="text-red-400 mt-4 text-center">Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut.</p>}
                      {formStatus === 'captcha_error' && <p className="text-yellow-400 mt-4 text-center">Bitte bestätigen Sie, dass Sie kein Roboter sind.</p>}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <button onClick={() => switchView('main')} className="flex items-center space-x-2 cursor-pointer">
              <Terminal className="h-6 w-6 text-lime-400" />
              <span className="text-lg font-bold text-white">Falk Solutions</span>
            </button>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center">
              <div className="text-gray-400 text-sm">
                <span>© {new Date().getFullYear()} Falk Solutions, LLC. Alle Rechte vorbehalten.</span>
                <span className="mx-2 text-gray-600">|</span>
                <button onClick={() => switchView('impressum')} className="hover:text-white transition-colors">Impressum</button>
                <span className="mx-2 text-gray-600">|</span>
                <button onClick={() => switchView('datenschutz')} className="hover:text-white transition-colors">Datenschutz</button>
              </div>
              <div className="text-gray-500 text-sm">{APP_VERSION}</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
 
export default App;
