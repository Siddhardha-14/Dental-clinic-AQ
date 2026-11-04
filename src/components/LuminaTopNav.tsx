import React, { useState } from 'react';

export interface LuminaTopNavProps {
  readonly activeView: 'booking' | 'schedule' | 'confirmation' | 'doctor';
  readonly onNavigate: (view: 'booking' | 'schedule' | 'confirmation' | 'doctor') => void;
  readonly onOpenAssistant?: () => void;
  readonly onOpenQuickGuide?: () => void;
  readonly onHelpClick?: () => void;
  readonly className?: string;
}

export const LuminaTopNav: React.FC<LuminaTopNavProps> = ({
  activeView,
  onNavigate,
  onOpenAssistant,
  onOpenQuickGuide,
  onHelpClick,
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleHomeClick = () => {
    if (activeView !== 'booking') {
      onNavigate('booking');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleBookClick = () => {
    if (activeView !== 'booking') {
      onNavigate('booking');
    }
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('booking-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleServicesClick = () => {
    if (activeView !== 'booking') {
      onNavigate('booking');
    }
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleDentistsClick = () => {
    if (activeView !== 'booking') {
      onNavigate('booking');
    }
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('dentists');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleScheduleClick = () => {
    onNavigate('schedule');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleDoctorPortalClick = () => {
    onNavigate('doctor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl border-b border-surface-container shadow-card ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-4">
          {/* Left: Brand Identity & Desktop Navigation */}
          <div className="flex items-center gap-4 xl:gap-7">
            {/* Logo */}
            <button
              type="button"
              onClick={handleHomeClick}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-secondary text-2xl">
                  dentistry
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-on-surface tracking-tight leading-none">
                  Lumina Dental
                </span>
                <span className="text-xs uppercase tracking-wider text-on-surface-variant font-medium mt-0.5">
                  Modern Clinic
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                type="button"
                onClick={handleHomeClick}
                className={`px-3 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                  activeView === 'booking'
                    ? 'bg-primary-container text-on-primary-container shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={handleBookClick}
                className="px-3 py-2 rounded-full text-xs xl:text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all cursor-pointer"
              >
                Book Appointment
              </button>

              {/* Doctor's Clinical Hub */}
              <button
                type="button"
                onClick={handleDoctorPortalClick}
                className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'doctor'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container text-primary hover:bg-surface-container-high'
                }`}
                title="View Who Is Coming, Schedules & Patient Symptoms"
              >
                <span className="material-symbols-outlined text-base">
                  stethoscope
                </span>
                <span>Doctor Portal</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </button>

              {/* Receptionist Schedule */}
              <button
                type="button"
                onClick={handleScheduleClick}
                className={`px-3 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'schedule'
                    ? 'bg-primary-container text-on-primary-container shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  calendar_month
                </span>
                <span>Operatories</span>
              </button>

              <button
                type="button"
                onClick={handleServicesClick}
                className="px-3 py-2 rounded-full text-xs xl:text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all cursor-pointer"
              >
                Services
              </button>

              {/* Quick Guide Trigger */}
              {onOpenQuickGuide && (
                <button
                  type="button"
                  onClick={onOpenQuickGuide}
                  className="px-3 py-2 rounded-full text-xs xl:text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">menu_book</span>
                  <span>Quick Guide</span>
                </button>
              )}

              {activeView === 'confirmation' && (
                <button
                  type="button"
                  onClick={() => onNavigate('confirmation')}
                  className="px-3 py-2 rounded-full text-xs xl:text-sm font-semibold bg-secondary-fixed text-on-secondary-fixed-variant transition-all cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Confirmation</span>
                </button>
              )}
            </nav>
          </div>

          {/* Right: Ask AI Assistant Button, Emergency Hotline, Profile & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ask AI Concierge Button */}
            {onOpenAssistant && (
              <button
                type="button"
                onClick={onOpenAssistant}
                className="px-3.5 py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant hover:bg-secondary-fixed-dim text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                title="Ask Lumina Dental AI Assistant"
              >
                <span className="material-symbols-outlined text-base animate-pulse">smart_toy</span>
                <span className="hidden sm:inline">Ask AI</span>
              </button>
            )}

            {/* Emergency Hotline Banner */}
            <a
              href="tel:5552348901"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-error-container text-on-error-container text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-base text-error">
                e911_emergency
              </span>
              <span>Emergency (555) 234-8901</span>
            </a>

            {/* Need Help Button */}
            <button
              type="button"
              onClick={onHelpClick}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container text-xs font-semibold transition-all cursor-pointer"
            >
              Need Help?
            </button>

            {/* User Profile Avatar */}
            <div
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm"
              title="Alexander Hayes (Patient Profile)"
            >
              <span className="material-symbols-outlined text-lg">
                person
              </span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-surface-container-high text-on-surface cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-surface-container bg-surface flex flex-col gap-2">
            <button
              type="button"
              onClick={handleHomeClick}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer ${
                activeView === 'booking'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-lg">home</span>
              <span>Home &amp; Hero Overview</span>
            </button>

            {/* Mobile Doctor's Clinical View Link */}
            <button
              type="button"
              onClick={handleDoctorPortalClick}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer ${
                activeView === 'doctor'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-lg">stethoscope</span>
              <span>Doctor Portal (Who, When &amp; Symptoms)</span>
            </button>

            {/* Mobile AI Assistant Trigger */}
            {onOpenAssistant && (
              <button
                type="button"
                onClick={() => {
                  onOpenAssistant();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold bg-secondary-fixed text-on-secondary-fixed-variant flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">smart_toy</span>
                <span>Ask Lumina AI Assistant (Google AI)</span>
              </button>
            )}

            {/* Mobile Quick Guide Trigger */}
            {onOpenQuickGuide && (
              <button
                type="button"
                onClick={() => {
                  onOpenQuickGuide();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-primary hover:bg-surface-container flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">menu_book</span>
                <span>Patient Quick Guide &amp; Triage</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleBookClick}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">calendar_add_on</span>
              <span>Book Appointment (4 Steps)</span>
            </button>

            <button
              type="button"
              onClick={handleScheduleClick}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer ${
                activeView === 'schedule'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-lg">chair</span>
              <span>Clinic Schedule &amp; Operatories</span>
            </button>

            <button
              type="button"
              onClick={handleServicesClick}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-on-surface hover:bg-surface-container flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">medical_services</span>
              <span>Services &amp; Pricing</span>
            </button>

            <button
              type="button"
              onClick={handleDentistsClick}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-on-surface hover:bg-surface-container flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">badge</span>
              <span>Our Clinicians</span>
            </button>

            {activeView === 'confirmation' && (
              <button
                type="button"
                onClick={() => {
                  onNavigate('confirmation');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold bg-secondary-fixed text-on-secondary-fixed-variant flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">check_circle</span>
                <span>Active Confirmation Pass</span>
              </button>
            )}

            <div className="pt-2 border-t border-surface-container flex items-center justify-between px-2">
              <a
                href="tel:5552348901"
                className="text-xs font-semibold text-error flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">call</span>
                <span>Emergency: (555) 234-8901</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  if (onHelpClick) onHelpClick();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-primary"
              >
                Need Help?
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LuminaTopNav;
