"use client"; // This is required for Next.js App Router

import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Mail, ArrowRight, Globe, Shield, Database, Brain } from 'lucide-react';

// --- Types for TypeScript ---
interface NavProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

// --- Mock Data & Assets ---
const ASSETS = {
  // Ensure these files are in your 'public' folder
  logoWhite: "/Eikon Partners White.png", 
  logoBlue: "/Eikon Partners Blue.png",
  hero: "/Gemini_Generated_Image_5wl03m5wl03m5wl0.png", 
  team: [
    {
      id: 1,
      name: "Sarah Jenkins",
      title: "Managing Partner",
      bio: "20+ years in investment banking across London and Hong Kong. Specializing in cross-border M&A and institutional strategy.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "David Chen",
      title: "Head of Strategy",
      bio: "Former Tech Lead at top-tier cybersecurity firms. Expert in bridging Web3 infrastructure with traditional finance.",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Elena Rossi",
      title: "Director of Operations",
      bio: "Expert in operational scaling for FinTech startups entering the SEA market. Focus on regulatory compliance and partnerships.",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop"
    }
  ]
};

// --- Components ---

const Navbar = ({ activePage, setActivePage }: NavProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if navbar should use dark theme (for light backgrounds)
  const useDarkTheme = activePage !== 'home' || scrolled;

  const navLinks = [
    { name: 'Home', id: 'home' },
    // { name: 'Team', id: 'team' }, // Hidden for now
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${useDarkTheme ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div 
          className="cursor-pointer flex items-center gap-2"
          onClick={() => setActivePage('home')}
        >
          {!imgError ? (
            <img 
              src={useDarkTheme ? ASSETS.logoBlue : ASSETS.logoWhite} 
              alt="Eikon Partners Asia" 
              className="h-12 w-auto object-contain transition-opacity duration-300"
              onError={() => setImgError(true)} 
            />
          ) : (
            <div className="flex items-center gap-2 animate-fade-in-up">
              <div className={`w-10 h-10 rounded-sm flex items-center justify-center border-2 ${useDarkTheme ? 'border-[#0866A6]' : 'border-white'}`}>
                 <Globe size={20} className={useDarkTheme ? 'text-[#0866A6]' : 'text-white'} />
              </div>
              <div className="flex flex-col justify-center -space-y-1">
                <span className={`font-header font-bold text-xl tracking-wide leading-none ${useDarkTheme ? 'text-[#0866A6]' : 'text-white'}`}>
                  EIKON
                </span>
                <span className={`font-header font-semibold text-sm tracking-[0.2em] uppercase leading-none ${useDarkTheme ? 'text-gray-600' : 'text-gray-200'}`}>
                  Partners
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${
                activePage === link.id 
                  ? 'text-[#0866A6]' 
                  : useDarkTheme ? 'text-gray-700 hover:text-[#0866A6]' : 'text-gray-200 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => setActivePage('contact')}
            className={`px-5 py-2 rounded-sm text-sm font-semibold transition-all duration-300 border ${
              useDarkTheme 
                ? 'border-[#0866A6] text-[#0866A6] hover:bg-[#0866A6] hover:text-white' 
                : 'border-white text-white hover:bg-white hover:text-[#0866A6]'
            }`}
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X color={useDarkTheme ? '#111' : '#fff'} /> 
          ) : (
            <Menu color={useDarkTheme ? '#111' : '#fff'} />
          )}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t animate-fade-in-up">
          <div className="flex flex-col p-6 space-y-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setActivePage(link.id); setMobileMenuOpen(false); }}
                className={`text-left font-header font-bold text-lg border-b border-gray-100 pb-2 ${activePage === link.id ? 'text-[#0866A6]' : 'text-gray-800'}`}
              >
                {link.name}
              </button>
            ))}
            <button 
                onClick={() => { setActivePage('contact'); setMobileMenuOpen(false); }}
                className="w-full bg-[#0866A6] text-white py-3 rounded-sm font-bold uppercase text-sm"
            >
                Get In Touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ setActivePage }: NavProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${ASSETS.hero}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.85) contrast(1.05) saturate(1.1)',
        }}
      >
        {/* Top gradient for navbar contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1929]/85 via-transparent to-transparent h-32"></div>
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1929]/95 via-[#0a1929]/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl px-6 md:px-12 w-full mt-20 animate-fade-in-up flex flex-col md:items-start items-center text-center md:text-left">
        <h1 className="font-header font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8 drop-shadow-lg">
          Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4dabf7] to-white">Bold Tech</span> <br/>to Asia
        </h1>
        <p className="font-body text-lg md:text-xl text-gray-200 max-w-2xl mb-12 leading-relaxed font-light">
          Eikon Partners is a bespoke consultancy that acts as the strategic nexus between high-growth early-stage startups and Asia's most prestigious institutions.
        </p>
        <div className="flex flex-col md:flex-row gap-5 w-full md:w-auto">
          <button 
            onClick={() => setActivePage('contact')}
            className="bg-[#0866A6] text-white px-10 py-4 rounded-sm font-bold text-sm tracking-wider uppercase hover:bg-[#064d7d] transition-all duration-300 shadow-[0_0_20px_rgba(8,102,166,0.3)] hover:shadow-[0_0_30px_rgba(8,102,166,0.5)] flex items-center justify-center gap-3 group"
          >
            Start the Conversation
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          {/* Hidden for now
          <button 
            onClick={() => setActivePage('team')}
            className="bg-white/10 backdrop-blur-sm border border-white/40 text-white px-10 py-4 rounded-sm font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-[#0866A6] transition-all duration-300 flex items-center justify-center"
          >
            Meet the Partners
          </button>
          */}
        </div>
      </div>
    </div>
  );
};

const WhatWeDo = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="font-header text-[#0866A6] text-sm font-bold tracking-widest uppercase mb-4">What We Do</h2>
            <h3 className="font-header text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The Power of <br/>Trusted Networks
            </h3>
          </div>
          <div>
            <p className="font-body text-gray-600 text-lg leading-relaxed">
              We don't just advise; We engineer Go-To-Market motion through our trusted connections in Asia. Eikon Partners help bridge breakthrough technologies in Cybersecurity, AI and Blockchain to Asia's largest Web2 and Web3 financial institutions and government agencies. Leverage networks built over 20 years of trust advisory and relationships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OurExpertise = () => {
  const expertise = [
    { icon: <Shield size={32} />, title: "Cybersecurity", desc: "Bridging cutting-edge cybersecurity solutions to Asia's largest financial institutions and government agencies through trusted networks." },
    { icon: <Database size={32} />, title: "Blockchain & Cryptocurrency", desc: "Connecting Web3 and blockchain infrastructure to traditional financial institutions and regulatory bodies across Asia." },
    { icon: <Brain size={32} />, title: "AI", desc: "Facilitating AI technology adoption by connecting innovative AI startups with Asia's leading financial and governmental institutions." },
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-header text-[#0866A6] text-sm font-bold tracking-widest uppercase mb-4">Our Expertise</h2>
          <h3 className="font-header text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Core Capabilities
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {expertise.map((item, i) => (
            <div key={i} className="p-8 border border-gray-100 bg-white hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-sm group">
              <div className="w-14 h-14 bg-[#0866A6]/10 rounded-full flex items-center justify-center text-[#0866A6] mb-6 group-hover:bg-[#0866A6] group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h4 className="font-header font-bold text-xl text-gray-900 mb-3">{item.title}</h4>
              <p className="font-body text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-header text-[#0866A6] text-sm font-bold tracking-widest uppercase mb-4">Our Leadership</h2>
          <h3 className="font-header text-4xl font-bold text-gray-900 mb-6">Experience You Can Trust</h3>
          <p className="font-body text-gray-600 text-lg">
            A collective of veterans from tier-one investment banks, government defense sectors, and unicorn startups.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {ASSETS.team.map((member) => (
            <div key={member.id} className="bg-white group overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 rounded-sm">
              <div className="h-80 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#0866A6]/0 group-hover:bg-[#0866A6]/20 transition-colors duration-500 z-10"></div>
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="p-8 relative">
                <div className="absolute top-0 left-8 -translate-y-1/2 bg-[#0866A6] text-white px-4 py-1 text-xs font-bold uppercase tracking-wider shadow-md">
                  {member.title}
                </div>
                <h4 className="font-header font-bold text-2xl text-gray-900 mt-4 mb-2">{member.name}</h4>
                <p className="font-body text-gray-500 text-base leading-relaxed">
                  {member.bio}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100 flex gap-4">
                   <a href="#" className="text-gray-400 hover:text-[#0866A6] transition-colors"><Mail size={18} /></a>
                   <a href="#" className="text-gray-400 hover:text-[#0866A6] transition-colors"><Globe size={18} /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', company: '', message: '' });
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-6 flex-grow w-full">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="font-header text-[#0866A6] text-sm font-bold tracking-widest uppercase mb-4">Contact Us</h2>
              <h3 className="font-header text-4xl font-bold text-gray-900 mb-6">Let's Discuss Your Strategy</h3>
              <p className="font-body text-gray-600 text-lg leading-relaxed">
                If you're an early-stage startup in the area of cybersecurity, AI or blockchain, and you're ready to penetrate the Asian market, Eikon Partners is the partner for you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-50 p-3 rounded-full text-[#0866A6]"><MapPin size={24}/></div>
                <div>
                  <h5 className="font-header font-bold text-gray-900">Headquarters</h5>
                  <p className="font-body text-gray-500">14 Robinson Road, #08-01A<br/>Far East Finance Building<br/>Singapore 048545</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-gray-50 p-3 rounded-full text-[#0866A6]"><Mail size={24}/></div>
                <div>
                  <h5 className="font-header font-bold text-gray-900">Email</h5>
                  <p className="font-body text-gray-500">admin@eikonpartners.asia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-8 md:p-10 rounded-sm shadow-lg border border-gray-100">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 animate-fade-in-up">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Shield size={32} />
                </div>
                <h4 className="font-header font-bold text-2xl text-gray-900">Message Received</h4>
                <p className="font-body text-gray-600">Thank you for reaching out. One of our partners will review your inquiry and respond within 24 hours.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-[#0866A6] font-semibold underline hover:text-[#064d7d]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#0866A6] focus:ring-1 focus:ring-[#0866A6] outline-none transition-all rounded-sm"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Work Email</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#0866A6] focus:ring-1 focus:ring-[#0866A6] outline-none transition-all rounded-sm"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Company / Organization</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#0866A6] focus:ring-1 focus:ring-[#0866A6] outline-none transition-all rounded-sm"
                    value={formState.company}
                    onChange={(e) => setFormState({...formState, company: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Message</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#0866A6] focus:ring-1 focus:ring-[#0866A6] outline-none transition-all rounded-sm"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#0866A6] text-white font-bold py-4 rounded-sm hover:bg-[#064d7d] transition-all duration-300 shadow-md hover:shadow-lg flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Sending...</span>
                  ) : (
                    "Send Inquiry"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ setActivePage }: NavProps) => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
               <img src={ASSETS.logoWhite} alt="Eikon Partners" className="h-8 w-auto opacity-90" />
            </div>
            <p className="font-body text-gray-400 text-sm leading-relaxed max-w-xs">
              Bridging Bold Tech to Asia.
            </p>
          </div>
          
          <div>
            <h4 className="font-header font-bold text-sm text-gray-200 uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2 font-body text-gray-400 text-sm">
              <li><button onClick={() => setActivePage('home')} className="hover:text-white transition-colors">Home</button></li>
              {/* <li><button onClick={() => setActivePage('team')} className="hover:text-white transition-colors">The Team</button></li> */} {/* Hidden for now */}
              <li><button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-header font-bold text-sm text-gray-200 uppercase tracking-widest mb-4">Locations</h4>
            <ul className="space-y-2 font-body text-gray-400 text-sm">
              <li>Singapore</li>
              <li>Seoul</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center font-body text-xs text-gray-500">
          <p>&copy; 2024 Eikon Partners Asia. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

const App = () => {
  const [activePage, setActivePage] = useState('home');

  // Reset scroll position on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-screen font-sans bg-white text-gray-900 selection:bg-[#0866A6] selection:text-white">
      {/* Font Injection (Simulating local font loading) */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Roboto:wght@300;400;500&display=swap');
        
        .font-header { font-family: 'Montserrat', sans-serif; }
        .font-body { font-family: 'Roboto', sans-serif; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}} />

      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main>
        {activePage === 'home' && (
          <>
            <Hero setActivePage={setActivePage} activePage={activePage} />
            <WhatWeDo />
            <OurExpertise />
          </>
        )}
        {/* {activePage === 'team' && <Team />} */} {/* Hidden for now */}
        {activePage === 'contact' && <Contact />}
      </main>

      <Footer setActivePage={setActivePage} activePage={activePage} />
    </div>
  );
};

export default App;
