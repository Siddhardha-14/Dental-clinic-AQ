import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { ClinicNavbar } from '../components/ClinicNavbar';
import { ClinicHero } from '../components/ClinicHero';
import { UnifiedAppointmentBooking } from '../components/UnifiedAppointmentBooking';
import { DoctorClinicalDashboard } from '../components/DoctorClinicalDashboard';
import { UserProfileView } from '../components/UserProfileView';
import { DentalAiChatModal } from '../components/DentalAiChatModal';
import { ClinicFooter } from '../components/ClinicFooter';
import {
  Sparkles,
} from 'lucide-react';

export interface LuminaAppProps {
  readonly className?: string;
}

export const LuminaApp: React.FC<LuminaAppProps> = ({ className = '' }) => {
  const { activeTab, setActiveTab, doctorSession, translations } = useClinic();
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);

  const handleScrollToBooking = () => {
    setActiveTab('booking');
    setTimeout(() => {
      const el = document.getElementById('booking-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleOpenProfile = () => {
    setActiveTab('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDoctorAccessClick = () => {
    if (doctorSession.isAuthenticated) {
      setActiveTab('doctor');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex flex-col min-h-screen w-full bg-surface text-on-surface font-sans overflow-x-hidden ${className}`}>
      {/* 1. Modern Sticky Top Navigation */}
      <ClinicNavbar
        onOpenAiAssistant={() => setIsAiChatOpen(true)}
        onOpenProfile={handleOpenProfile}
      />

      {/* Main Content Area - pt-20 to cleanly clear 80px fixed navbar */}
      <main className="flex-1 w-full pt-20 bg-surface">
        <AnimatePresence mode="wait">
          {/* VIEW 1: HOME (Hero Page + Seamless Unified Booking) */}
          {activeTab === 'home' && (
            <motion.div
              key="view-home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full space-y-12"
            >
              <ClinicHero
                onBookClick={handleScrollToBooking}
                onOpenProfile={handleOpenProfile}
                onOpenAiAssistant={() => setIsAiChatOpen(true)}
              />

              <UnifiedAppointmentBooking
                onBookingComplete={(apt) => {
                  console.log('Successfully booked appointment:', apt.id);
                }}
                onGoToDoctorPortal={handleDoctorAccessClick}
              />
            </motion.div>
          )}

          {/* VIEW 2: DEDICATED APPOINTMENT BOOKING PAGE */}
          {activeTab === 'booking' && (
            <motion.div
              key="view-booking"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full py-6"
            >
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <button
                  onClick={() => {
                    setActiveTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1.5 min-h-[44px]"
                >
                  <span>&larr; Back to Clinic Overview</span>
                </button>
              </div>

              <UnifiedAppointmentBooking
                onBookingComplete={(apt) => {
                  console.log('Successfully booked appointment:', apt.id);
                }}
                onGoToDoctorPortal={handleDoctorAccessClick}
              />
            </motion.div>
          )}

          {/* VIEW 3: PROFILE PAGE WITH INTEGRATED DOCTOR LOGIN */}
          {activeTab === 'profile' && (
            <motion.div
              key="view-profile"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full py-6"
            >
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                <button
                  onClick={() => {
                    setActiveTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1.5 min-h-[44px]"
                >
                  <span>&larr; Back to Clinic Home</span>
                </button>
              </div>

              <UserProfileView
                onGoToDoctorSchedule={() => {
                  setActiveTab('doctor');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onGoToBooking={handleScrollToBooking}
              />
            </motion.div>
          )}

          {/* VIEW 4: DOCTOR CLINICAL PORTAL (When Authenticated) */}
          {activeTab === 'doctor' && (
            <motion.div
              key="view-doctor"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full"
            >
              {doctorSession.isAuthenticated ? (
                <DoctorClinicalDashboard
                  onBookNewPatient={() => {
                    setActiveTab('booking');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ) : (
                /* If not logged in yet, show the Profile page with Doctor Login */
                <div className="w-full py-6">
                  <UserProfileView
                    onGoToDoctorSchedule={() => {
                      setActiveTab('doctor');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onGoToBooking={handleScrollToBooking}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modern Global Footer */}
      <ClinicFooter
        onOpenProfile={handleOpenProfile}
        onOpenAiAssistant={() => setIsAiChatOpen(true)}
      />

      {/* Floating AI Concierge Action Pill (Bottom Right) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAiChatOpen(true)}
          className="min-h-[48px] px-4 py-2.5 rounded-full bg-on-surface text-surface shadow-2xl transition-shadow hover:shadow-primary/20 flex items-center gap-2.5 border border-outline-variant/30 cursor-pointer"
          aria-label="Open AI Dental Concierge"
        >
          <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold tracking-tight">{translations.navAi}</span>
        </motion.button>
      </div>

      {/* AI Dental Assistant Modal */}
      <DentalAiChatModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        onBookAppointment={handleScrollToBooking}
      />
    </div>
  );
};

export default LuminaApp;
