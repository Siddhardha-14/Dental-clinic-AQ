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
  Languages,
} from 'lucide-react';

export interface ClinicNavbarProps {
  readonly onOpenAiAssistant?: () => void;
  readonly onOpenProfile?: () => void;
}

export const ClinicNavbar: React.FC<ClinicNavbarProps> = ({
  onOpenAiAssistant,
  onOpenProfile,
}) => {
  const { activeTab, setActiveTab, doctorSession, language, setLanguage, translations } = useClinic();
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

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
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
            <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-on-primary shadow-md transition-transform group-hover:scale-105 shrink-0">
              <span className="material-symbols-outlined text-2xl font-bold">dentistry</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-on-surface">{translations.brandName}</span>
                <span className="text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {language === 'te' ? 'దంత సంరక్షణ' : 'Dental'}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium">{translations.brandTagline}</p>
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
              {translations.navHome}
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
              <span>{translations.navBook}</span>
            </button>
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="min-h-[44px] px-4 py-2 rounded-full text-sm font-medium text-on-surface-variant hover:text-primary transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>{translations.navAi}</span>
              </button>
            )}
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher Pill */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="min-h-[44px] px-3.5 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs font-bold hover:border-primary transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title={language === 'en' ? 'తెలుగులోకి మార్చండి' : 'Switch to English'}
              aria-label="Switch Language"
            >
              <Languages className="w-4 h-4 text-primary" />
              <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
            </motion.button>

            <a
              href="tel:5552348901"
              className="min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs font-semibold hover:border-primary transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-primary" />
              <span>{translations.navEmergency}</span>
            </a>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavClick('booking')}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-sm font-semibold shadow hover:bg-primary-container transition-all cursor-pointer"
            >
              <span>{translations.bookVisit}</span>
            </motion.button>

            {/* Profile Button with Doctor Login indicator */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProfileClick}
              title={doctorSession.isAuthenticated ? translations.doctorProfile : translations.patientProfile}
              className={`relative min-h-[44px] min-w-[44px] w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-primary text-on-primary ring-2 ring-primary/40 shadow-sm'
                  : doctorSession.isAuthenticated
                  ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500 hover:bg-emerald-200'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant/40'
              }`}
              aria-label={translations.patientProfile}
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

          {/* Mobile Right Bar: Language Toggle + Profile Icon + Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={toggleLanguage}
              className="min-h-[44px] px-2.5 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-xs font-bold flex items-center gap-1 cursor-pointer"
              aria-label="Toggle language"
            >
              <Languages className="w-3.5 h-3.5 text-primary" />
              <span>{language === 'en' ? 'తె' : 'EN'}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleProfileClick}
              className={`relative min-h-[44px] min-w-[44px] w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-primary text-on-primary'
                  : doctorSession.isAuthenticated
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-surface-container-high text-on-surface'
              }`}
              aria-label={translations.patientProfile}
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
              className="min-h-[44px] min-w-[44px] w-11 h-11 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
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
            {/* Language Selector Row */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <div className="flex items-center gap-2 text-xs font-semibold text-on-surface">
                <Languages className="w-4 h-4 text-primary" />
                <span>{language === 'te' ? 'భాష / Language' : 'Language / భాష'}:</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`min-h-[44px] px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    language === 'en' ? 'bg-primary text-on-primary' : 'bg-surface text-on-surface border border-outline-variant/30'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('te')}
                  className={`min-h-[44px] px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    language === 'te' ? 'bg-primary text-on-primary' : 'bg-surface text-on-surface border border-outline-variant/30'
                  }`}
                >
                  తెలుగు
                </button>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('home')}
              className="w-full min-h-[44px] text-left px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-semibold text-sm flex items-center justify-between cursor-pointer"
            >
              <span>{translations.navHome}</span>
              <span className="text-xs text-on-surface-variant font-normal">{language === 'te' ? 'ప్రధాన పేజీ' : 'Welcome'}</span>
            </button>

            <button
              onClick={() => handleNavClick('booking')}
              className="w-full min-h-[44px] text-left px-4 py-3 rounded-xl bg-primary text-on-primary font-semibold text-sm flex items-center justify-between cursor-pointer"
            >
              <span>{translations.navBook}</span>
              <CalendarCheck className="w-4 h-4 text-on-primary" />
            </button>

            {onOpenAiAssistant && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAssistant();
                }}
                className="w-full min-h-[44px] text-left px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-semibold text-sm flex items-center justify-between cursor-pointer"
              >
                <span>{translations.navAi}</span>
                <Sparkles className="w-4 h-4 text-secondary" />
              </button>
            )}

            {/* Profile & Doctor Login in Mobile Menu */}
            <button
              onClick={handleProfileClick}
              className="w-full min-h-[44px] text-left px-4 py-3 rounded-xl bg-surface-container-high text-on-surface font-semibold text-sm flex items-center justify-between cursor-pointer"
            >
              <span>{doctorSession.isAuthenticated ? translations.doctorProfile : translations.patientProfile}</span>
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
                <span>{translations.emergencyHotlineTitle}: (555) 234-8901</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default ClinicNavbar;
