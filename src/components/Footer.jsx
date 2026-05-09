import React from 'react';
import { Send, Phone, Mail, MapPin, Linkedin, Twitter, Youtube, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-industrial-charcoal text-white pt-24 pb-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div>
            <Link to="/">
              <img src={logo} alt="IFH Logo" className="h-12 mb-8" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              A 100 Years Old Legacy in Industrial Filtration Technology. Global leaders in Clean Air Technology.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-industrial-blue hover:border-industrial-blue transition-all cursor-pointer">
                <Linkedin size={18} />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-industrial-blue hover:border-industrial-blue transition-all cursor-pointer">
                <Twitter size={18} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-industrial-blue">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/#about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/#industries" className="hover:text-white transition-colors">Industries</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors font-bold text-industrial-blue">Our Blog</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Become A Dealer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become A Vendor</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-industrial-blue">Info & Media</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/blog" className="hover:text-white transition-colors">IFH News</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">IFH Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-industrial-blue">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-4">
                <Phone size={18} className="text-industrial-blue shrink-0" />
                <div>
                  <p>+49 322 12238960</p>
                  <p>+91 93111 59458</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={18} className="text-industrial-blue shrink-0" />
                <p>sales@intensiv-filter-himenviro.com</p>
              </li>
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-industrial-blue shrink-0" />
                <p>Global Headquarters, Germany & India</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">
            Copyright@ All rights reserved By intensiv-filter-himenviro.com.
          </p>
          <div className="flex gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
