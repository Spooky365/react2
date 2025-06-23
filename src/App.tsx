import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Cloud, 
  Code, 
  Mail, 
  MapPin, 
  CheckCircle,
  Menu,
  X,
  ArrowRight,
  Terminal,
  Database,
  Zap,
  Globe,
  Lock,
  Cpu,
  HardDrive
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const services = [
    {
      icon: <Server className="h-8 w-8" />,
      title: "Linux Server Administration",
      description: "Professionelle Verwaltung und Optimierung von Linux-Servern für maximale Performance und Sicherheit.",
      features: ["Ubuntu/CentOS/Debian", "Performance-Tuning", "Monitoring & Alerts", "Backup-Strategien"]
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud DevOps",
      description: "Moderne Cloud-Infrastrukturen mit CI/CD-Pipelines, Container-Orchestrierung und Automatisierung.",
      features: ["AWS/Azure/GCP", "Docker & Kubernetes", "Infrastructure as Code", "CI/CD Pipelines"]
    },
    {
      icon: <Terminal className="h-8 w-8" />,
      title: "Automation & Scripting",
      description: "Prozessautomatisierung durch intelligente Skripte und moderne DevOps-Tools.",
      features: ["Bash/Python/Ansible", "Task Automation", "System Monitoring", "Log Management"]
    }
  ];

  const projects = [
    {
      title: "E-Commerce Infrastructure",
      description: "Skalierbare Kubernetes-Cluster für großen Online-Shop mit 99.9% Uptime",
      tech: ["Kubernetes", "AWS", "Redis", "PostgreSQL"],
      impact: "50% Performance-Steigerung"
    },
    {
      title: "Financial Services Platform",
      description: "Sichere DevOps-Pipeline für Fintech-Startup mit strengen Compliance-Anforderungen",
      tech: ["Docker", "Jenkins", "Vault", "Terraform"],
      impact: "90% Reduzierung der Deployment-Zeit"
    },
    {
      title: "Healthcare Data Processing",
      description: "GDPR-konforme Datenverarbeitungsplattform mit automatisierter Backup-Strategie",
      tech: ["Linux", "Python", "Elasticsearch", "Grafana"],
      impact: "Vollständige Compliance-Erfüllung"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Terminal className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold text-white">Falk Solutions</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'services', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item 
                      ? 'text-cyan-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item === 'home' ? 'Start' : 
                   item === 'services' ? 'Services' :
                   item === 'about' ? 'Über mich' :
                   item === 'projects' ? 'Projekte' : 'Kontakt'}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-slate-700/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'services', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-md w-full text-left"
                >
                  {item === 'home' ? 'Start' : 
                   item === 'services' ? 'Services' :
                   item === 'about' ? 'Über mich' :
                   item === 'projects' ? 'Projekte' : 'Kontakt'}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-8">
              <Zap className="h-4 w-4 mr-2" />
              Professionelle DevOps-Lösungen
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Moderne IT-Infrastrukturen
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                für Ihr Business
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Ich bin Ihr spezialisierter DevOps-Freelancer für Linux-Server-Administration, 
              Cloud-Infrastrukturen und Automatisierung. Lassen Sie uns Ihre IT-Systeme 
              auf das nächste Level bringen.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Projekt besprechen
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <button 
                onClick={() => scrollToSection('services')}
                className="inline-flex items-center px-8 py-4 bg-slate-800/80 text-white font-semibold rounded-lg hover:bg-slate-700 transition-all border border-slate-600"
              >
                Services entdecken
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Meine Services
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Umfassende DevOps-Lösungen für moderne Unternehmen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-cyan-500/50 transition-all hover:transform hover:scale-105 group"
              >
                <div className="text-cyan-400 mb-6 group-hover:text-cyan-300 transition-colors">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Über Falk Solutions
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg">
                  Mit über 8 Jahren Erfahrung in der IT-Branche spezialisiere ich mich auf 
                  DevOps-Praktiken, Linux-Server-Administration und Cloud-Infrastrukturen. 
                  Mein Fokus liegt auf der Automatisierung von Prozessen und der Optimierung 
                  von Systemen für maximale Effizienz.
                </p>
                
                <p>
                  Ich arbeite mit modernsten Technologien und Tools, um Ihnen robuste, 
                  skalierbare und sichere IT-Lösungen zu bieten. Dabei lege ich großen 
                  Wert auf Kommunikation, Zuverlässigkeit und kontinuierliche Verbesserung.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">50+</div>
                  <div className="text-sm text-gray-400">Erfolgreiche Projekte</div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">99.9%</div>
                  <div className="text-sm text-gray-400">System Uptime</div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-6">Expertise</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Globe className="h-5 w-5" />, name: "AWS/Azure/GCP" },
                  { icon: <Cpu className="h-5 w-5" />, name: "Docker/Kubernetes" },
                  { icon: <HardDrive className="h-5 w-5" />, name: "Linux Administration" },
                  { icon: <Lock className="h-5 w-5" />, name: "Security & Compliance" },
                  { icon: <Code className="h-5 w-5" />, name: "Infrastructure as Code" },
                  { icon: <Database className="h-5 w-5" />, name: "Database Management" }
                ].map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-300">
                    <div className="text-cyan-400">{skill.icon}</div>
                    <span className="text-sm">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Erfolgreiche Projekte
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Einblicke in meine jüngsten DevOps- und Infrastruktur-Projekte
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-cyan-500/50 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="text-green-400 font-semibold text-sm">
                  {project.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Kontakt aufnehmen
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Bereit für Ihr nächstes DevOps-Projekt? Lassen Sie uns sprechen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">E-Mail</h3>
                    <p className="text-gray-300">kontakt@falk-solutions.de</p>
                  </div>
                </div>
                                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Standort</h3>
                    <p className="text-gray-300">Deutschland (Remote verfügbar)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Ihr Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="ihre.email@beispiel.de"
                  />
                </div>
                
                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-gray-300 mb-2">
                    Projekt-Art
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500">
                    <option>Linux Server Setup</option>
                    <option>Cloud Migration</option>
                    <option>DevOps Beratung</option>
                    <option>CI/CD Pipeline</option>
                    <option>Security Audit</option>
                    <option>Sonstiges</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    placeholder="Beschreiben Sie Ihr Projekt..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105"
                >
                  Nachricht senden
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Terminal className="h-6 w-6 text-cyan-400" />
              <span className="text-lg font-bold text-white">Falk Solutions</span>
            </div>
            
            <div className="text-gray-400 text-sm">
              © 2024 Falk Solutions. Alle Rechte vorbehalten.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
 
export default App;
