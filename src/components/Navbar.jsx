// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info, Newspaper, Image, CalendarDays } from 'lucide-react';
import { useApp } from '../context/AppContext';
import NotificationPrompt from './NotificationPrompt';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { logo } = useApp();

  const navLinks = [
    { path: '/', label: 'Beranda', icon: <Home size={15} /> },
    { path: '/informasi', label: 'Struktur', icon: <Info size={15} /> },
    { path: '/berita', label: 'Berita', icon: <Newspaper size={15} /> },
    { path: '/galeri', label: 'Galeri', icon: <Image size={15} /> },
    { path: '/agenda', label: 'Agenda', icon: <CalendarDays size={15} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-nav sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src={logo || '/img/logo.png'}
              alt="Logo"
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain rounded-full"
              onError={(e) => { e.target.src = '/img/logo.png'; }}
            />
            <div className="hidden sm:block leading-tight">
              <p className="text-white font-poppins font-bold text-xs lg:text-sm">HIMMAH NW</p>
              <p className="text-green-300 text-[10px] lg:text-xs">Komisariat STMIK</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive(link.path)
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-green-100/80 hover:bg-white/8 hover:text-white'
                }`}
              >
                {link.icon}
                <span className="hidden xl:inline">{link.label}</span>
              </Link>
            ))}
            {/* Garis pemisah + Notifikasi */}
            <div className="ml-1.5 pl-1.5 border-l border-white/15">
              <NotificationPrompt />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-3 space-y-1 border-t border-white/10 bg-[#001a0c]/95 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-white/15 text-white'
                  : 'text-green-100 hover:bg-white/8 hover:text-white'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10 mt-2">
            <NotificationPrompt />
          </div>
        </div>
      </div>
    </nav>
  );
}