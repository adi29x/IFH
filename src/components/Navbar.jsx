import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/#about-us' },
    { name: 'Industries', path: '/#industries' },
    { name: 'Solutions', path: '/#solutions' },
    { name: 'Blog', path: '/blog' },
    { name: 'Career', path: '/#career' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-500`}>
      {/* Top Bar */}
      <div className={`hidden lg:flex justify-between items-center px-20 py-2 text-[10px] font-bold uppercase tracking-widest ${isScrolled ? 'bg-industrial-charcoal text-white' : 'bg-white/90 text-industrial-charcoal border-b border-gray-100'}`}>
        <div className="flex gap-8">
          <a href="tel:+4920534200990" className="flex items-center gap-2 hover:text-industrial-blue transition-colors">
            <Phone size={12} /> +49-2053-4200990
          </a>
          <a href="tel:+919311159458" className="flex items-center gap-2 hover:text-industrial-blue transition-colors">
            <Phone size={12} /> +91 93111 59458
          </a>
          <a href="mailto:sales@intensiv-filter-himenviro.com" className="flex items-center gap-2 hover:text-industrial-blue transition-colors">
            <Mail size={12} /> sales@intensiv-filter-himenviro.com
          </a>
        </div>
        <div className="flex gap-6 items-center">
          <span className="text-industrial-blue">since 1922</span>
          <span className="w-[1px] h-3 bg-gray-300"></span>
          <span>ISO 9001:2015</span>
        </div>
      </div>

      <nav className={`transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl py-3 shadow-xl border-b border-white/20' : 'bg-white/95 py-5 shadow-sm'}`}>
        <div className="container mx-auto px-6 lg:px-20 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4">
            <img 
              src={logo} 
              alt="Intensiv-Filter Himenviro" 
              className={`h-10 lg:h-14 w-auto object-contain transition-all duration-500`}
            />
            <div className="hidden xl:block h-8 w-[1px] bg-gray-200 ml-2"></div>
            <span className="hidden xl:block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-tight">
              Pioneers of <br /> Filter Technology
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className={`flex gap-6 font-bold text-[10px] uppercase tracking-[0.15em] text-industrial-charcoal`}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.path.startsWith('/#') ? (
                    <a href={link.path} className="hover:text-industrial-blue transition-colors">{link.name}</a>
                  ) : (
                    <Link to={link.path} className={`hover:text-industrial-blue transition-colors ${location.pathname === link.path ? 'text-industrial-blue' : ''}`}>{link.name}</Link>
                  )}
                </li>
              ))}
            </ul>
            
            <button className="flex items-center gap-2 px-7 py-3 bg-industrial-blue text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 shadow-lg transition-all">
              Contact Us <ArrowUpRight size={14} />
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-[60] flex flex-col p-10 animate-fade-in">
          <div className="flex justify-between items-center mb-12">
            <img src={logo} alt="IFH Logo" className="h-10 w-auto" />
            <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
          </div>
          <ul className="flex flex-col gap-6 text-2xl font-bold tracking-tighter text-industrial-charcoal">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className={location.pathname === link.path ? 'text-industrial-blue' : ''}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li><a href="#" onClick={() => setMobileMenuOpen(false)}>Contact Us</a></li>
          </ul>
          <div className="mt-auto pt-8 border-t border-gray-100">
            <p className="text-gray-400 text-[10px] mb-4 uppercase tracking-widest font-bold">100+ Years of Excellence</p>
            <p className="text-lg font-bold text-industrial-charcoal mb-1">+49-2053-4200990</p>
            <p className="text-sm text-gray-500">sales@intensiv-filter-himenviro.com</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
