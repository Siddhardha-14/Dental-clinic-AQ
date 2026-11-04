import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import {
  PhoneCall,
  Sparkles,
  User,
  Stethoscope,
  Menu,
  X,
  CalendarCheck,
} from 'lucide-react';

export interface ClinicNavbarProps {
  readonly onOpenAiAssistant?: () => void;
  readonly onOpenProfile?: () => void;
}

export const ClinicNavbar: React.FC<ClinicNavbarProps> = ({
  onOpenAiAssistant,
  onOpenProfile,
}) => {
  const { activeTab, setActiveTab, doctorSession } = useClinic();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleNavClick = (tab: 'home' | 'booking' | 'profile') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    if (onOpenProfile) {
      onOpenProfile();
    } else {
      setActiveTab('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-on-primary shadow-md transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-2xl font-bold">dentistry</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-on-surface">Lumina</span>
                <span className="text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Dental
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium">Gentle &amp; Modern Care</p>
            </div>
          </motion.div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30">
            <button
              onClick={() => handleNavClick('home')}
              className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'home'
                  ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('booking')}
              className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'booking'
                  ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <CalendarCheck className="w-4 h-4 text-primary" />
              <span>Book Appointment</span>
            </button>
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="min-h-[44px] px-4 py-2 rounded-full text-sm font-medium text-on-surface-variant hover:text-primary transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>Ask AI Dental</span>
              </button>
            )}
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:5552348901"
              className="min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs font-semibold hover:border-primary transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-primary" />
              <span>Emergency (555) 234-8901</span>
            </a>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavClick('booking')}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-sm font-semibold shadow hover:bg-primary-container transition-all cursor-pointer"
            >
              <span>Book Visit</span>
            </motion.button>

            {/* Profile Button with Doctor Login indicator */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProfileClick}
              title={doctorSession.isAuthenticated ? 'Doctor Profile (Dr. Sarah Jenkins)' : 'Profile & Doctor Login'}
              className={`relative min-h-[44px] min-w-[44px] w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                activeTab === 'profile'
                  ? 'bg-primary text-on-primary ring-2 ring-primary/40 shadow-sm'
                  : doctorSession.isAuthenticated
                  ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500 hover:bg-emerald-200'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant/40'
              }`}
              aria-label="User Profile and Doctor Login"
            >
              {doctorSession.isAuthenticated ? (
                <>
                  <Stethoscope className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-surface animate-pulse" />
                </>
              ) : (
                <User className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {/* Mobile Right Bar: Profile Icon + Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleProfileClick}
              className={`relative min-h-[44px] min-w-[44px] w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                activeTab === 'profile'
                  ? 'bg-primary text-on-primary'
                  : doctorSession.isAuthenticated
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-surface-container-high text-on-surface'
              }`}
              aria-label="Open Profile and Doctor Login"
            >
              {doctorSession.isAuthenticated ? (
                <>
                  <Stethoscope className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-surface animate-pulse" />
                </>
              ) : (
                <User className="w-5 h-5" />
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] w-11 h-11 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-surface border-b border-outline-variant/30 px-4 pt-3 pb-6 space-y-3"
          >
            <button
              onClick={() => handleNavClick('home')}
              className="w-full min-h-[44px] text-left px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-semibold text-sm flex items-center justify-between"
            >
              <span>Home Overview</span>
              <span className="text-xs text-on-surface-variant font-normal">Welcome</span>
            </button>

            <button
              onClick={() => handleNavClick('booking')}
              className="w-full min-h-[44px] text-left px-4 py-3 rounded-xl bg-primary text-on-primary font-semibold text-sm flex items-center justify-between"
            >
              <span>Book Appointment</span>
              <CalendarCheck className="w-4 h-4 text-on-primary" />
            </button>

            {onOpenAiAssistant && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAssistant();
                }}
                className="w-full min-h-[44px] text-left px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-semibold text-sm flex items-center justify-between"
              >
                <span>Ask AI Dental Q&amp;A</span>
                <Sparkles className="w-4 h-4 text-secondary" />
              </button>
            )}

            {/* Profile & Doctor Login in Mobile Menu */}
            <button
              onClick={handleProfileClick}
              className="w-full min-h-[44px] text-left px-4 py-3 rounded-xl bg-surface-container-high text-on-surface font-semibold text-sm flex items-center justify-between"
            >
              <span>{doctorSession.isAuthenticated ? 'Doctor Profile (Dr. Sarah Jenkins)' : 'Profile & Doctor Login'}</span>
              {doctorSession.isAuthenticated ? (
                <Stethoscope className="w-4 h-4 text-primary" />
              ) : (
                <User className="w-4 h-4 text-primary" />
              )}
            </button>

            <div className="pt-2 text-center">
              <a
                href="tel:5552348901"
                className="min-h-[44px] text-xs font-semibold text-primary inline-flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Dental Helpline: (555) 234-8901</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default ClinicNavbar;
