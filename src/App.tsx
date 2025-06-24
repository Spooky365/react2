// MODIFIED: Added useRef
import React, { useState, useEffect, useRef } from 'react';

// NEW: Import the hCaptcha component
import HCaptcha from '@hcaptcha/react-hcaptcha';

import { 
  Server, Cloud, Code, CheckCircle, Menu, X, ArrowRight, Terminal,
  Zap, Globe, Lock, Cpu, HardDrive, GitFork, Power, TrendingUp, Smile, Phone
} from 'lucide-react';

const APP_VERSION = "v1.1.4"; 

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: 'Linux Server Setup',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState('');

  // NEW: State for the hCaptcha token and a ref to the component
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // MODIFIED: The form submission handler now includes the hCaptcha token
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // NEW: Check if the CAPTCHA was completed
    if (!token) {
      setFormStatus('captcha_error'); // Use a specific status for CAPTCHA error
      return; // Stop the submission
    }

    setFormStatus('sending');

    try {
      // MODIFIED: Send the token along with the form data
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add the h-captcha-token to the body
        body: JSON.stringify({ ...formData, "h-captcha-token": token }),
      });

      // NEW: Reset the CAPTCHA after submission, regardless of success or error
      captchaRef.current.resetCaptcha();
      setToken(null);

      if (response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          project: 'Linux Server Setup',
          message: '',
        });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('error');
      // NEW: Also reset CAPTCHA on network error
      captchaRef.current.resetCaptcha();
      setToken(null);
    }
  };

  useEffect(() => {
    // ... (Your existing useEffect for IntersectionObserver remains unchanged) ...
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' } 
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = (sectionId) => {
    // ... (Your existing scrollToSection remains unchanged) ...
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  
  // ... (All your other components and sections (Hero, Services, etc.) remain unchanged) ...
  const services = [/* ... */];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* ... (Your nav, hero, services, about, and projects sections are all here and unchanged) ... */}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Kontakt aufnehmen
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Bereit für Ihr nächstes Projekt? Lassen Sie uns sprechen.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 w-full max-w-xl">
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* ... (Your name, email, project, and message inputs remain unchanged) ... */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" placeholder="Ihr Name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">E-Mail</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" placeholder="ihre.email@beispiel.de" />
                </div>
                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-gray-300 mb-2">Projekt-Art</label>
                  <select id="project" name="project" value={formData.project} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500">
                    <option>Linux Server Setup</option> <option>Cloud Migration</option> <option>DevOps Beratung</option> <option>CI/CD Pipeline</option> <option>Security Audit</option> <option>Sonstiges</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Nachricht</label>
                  <textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" placeholder="Beschreiben Sie Ihr Projekt..."></textarea>
                </div>
                
                {/* NEW: Add the hCaptcha component here */}
                <div className="flex justify-center">
                   <HCaptcha
                     sitekey="6deca056-c39a-49a2-897c-cf467d7c521c"
                     onVerify={(token) => {
                       setToken(token);
                       setFormStatus(''); // Clear any previous captcha error
                     }}
                     onExpire={() => setToken(null)}
                     ref={captchaRef}
                     theme="dark" 
                   />
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'sending' ? 'Wird gesendet...' : 'Nachricht senden'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>

                  {/* MODIFIED: Updated feedback messages */}
                  {formStatus === 'success' && (
                    <p className="text-green-400 mt-4 text-center">
                      Vielen Dank! Ihre Nachricht wurde sicher verschlüsselt gesendet.
                    </p>
                  )}
                  {formStatus === 'error' && (
                    <p className="text-red-400 mt-4 text-center">
                      Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut.
                    </p>
                  )}
                  {/* NEW: Specific message for CAPTCHA error */}
                  {formStatus === 'captcha_error' && (
                    <p className="text-yellow-400 mt-4 text-center">
                      Bitte bestätigen Sie, dass Sie kein Roboter sind.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ... (Your footer remains unchanged) ... */}
    </div>
  );
}
 
export default App;
