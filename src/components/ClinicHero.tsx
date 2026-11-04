import React from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import {
  Sparkles,
  CalendarCheck,
  ShieldCheck,
  Clock,
  CheckCircle2,
  HeartHandshake,
  Star,
  ArrowRight,
  Headphones,
  Award,
  Zap,
} from 'lucide-react';

export interface ClinicHeroProps {
  readonly onBookClick: () => void;
  readonly onOpenDoctorLogin?: () => void;
  readonly onOpenProfile?: () => void;
  readonly onOpenAiAssistant?: () => void;
}

export const ClinicHero: React.FC<ClinicHeroProps> = ({
  onBookClick,
  onOpenDoctorLogin: _onOpenDoctorLogin,
  onOpenProfile: _onOpenProfile,
  onOpenAiAssistant,
}) => {
  const { treatments, setSelectedTreatmentForBooking, setActiveTab, translations } = useClinic();

  const handleSelectTreatmentAndBook = (treatmentId: string) => {
    setSelectedTreatmentForBooking(treatmentId);
    setActiveTab('booking');
    setTimeout(() => {
      const el = document.getElementById('booking-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  return (
    <div className="w-full flex flex-col space-y-16 pb-12 overflow-hidden">
      {/* 1. Grand Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pt-6 sm:pt-8 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Pill / Status */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/30 text-primary text-xs font-semibold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] sm:text-xs">{translations.heroPill}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Copy */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.15]">
                {translations.heroTitle1}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">
                  {translations.heroTitleHighlight}
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                {translations.heroSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onBookClick}
                  className="min-h-[48px] px-6 sm:px-7 py-3 rounded-full bg-primary text-on-primary font-bold text-sm sm:text-base shadow-lg hover:bg-primary-container transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <CalendarCheck className="w-5 h-5" />
                  <span>{translations.bookApptBtn}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>

                {onOpenAiAssistant && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onOpenAiAssistant}
                    className="min-h-[48px] px-5 sm:px-6 py-3 rounded-full bg-surface-container-lowest text-secondary font-semibold text-xs sm:text-sm border border-secondary/30 hover:bg-secondary/5 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span>{translations.askAiBtn}</span>
                  </motion.button>
                )}
              </div>

              {/* Trust Indicators Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-outline-variant/30">
                <div className="p-2 sm:p-0">
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-base sm:text-lg">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>4.9 / 5.0</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium">{translations.ratingReviews}</p>
                </div>
                <div className="p-2 sm:p-0">
                  <div className="flex items-center gap-1 text-primary font-bold text-base sm:text-lg">
                    <Clock className="w-4 h-4" />
                    <span>{translations.zeroWait}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium">{translations.zeroWaitSub}</p>
                </div>
                <div className="p-2 sm:p-0">
                  <div className="flex items-center gap-1 text-teal-700 font-bold text-base sm:text-lg">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{translations.noSurprises}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium">{translations.noSurprisesSub}</p>
                </div>
                <div className="p-2 sm:p-0">
                  <div className="flex items-center gap-1 text-secondary font-bold text-base sm:text-lg">
                    <Zap className="w-4 h-4" />
                    <span>{translations.sameDay}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium">{translations.sameDaySub}</p>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-8 shadow-xl border border-outline-variant/30 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-on-surface">{translations.doctorName}</h2>
                      <p className="text-xs text-on-surface-variant font-medium">{translations.doctorRole}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {translations.inClinicToday}
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-on-surface">{translations.eduTitle}</p>
                      <p className="text-on-surface-variant">{translations.eduSub}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                    <Headphones className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-on-surface">{translations.anxietyTitle}</p>
                      <p className="text-on-surface-variant">{translations.anxietySub}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                    <HeartHandshake className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-on-surface">{translations.insuranceTitle}</p>
                      <p className="text-on-surface-variant">{translations.insuranceSub}</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBookClick}
                  className="w-full min-h-[46px] py-3 rounded-2xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{translations.selectSlotBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Core Dental Services Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-primary px-3 py-1 rounded-full bg-primary/10">
            {translations.menuPill}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface">
            {translations.menuTitle}
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            {translations.menuSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment, idx) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group hover:border-primary"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant">
                    {treatment.category}
                  </span>
                  {treatment.tag && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      {treatment.tag}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    {treatment.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                    {treatment.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-outline-variant/20 flex items-center justify-between">
                <div>
                  <p className="text-xs text-on-surface-variant font-medium">{translations.estimatedCopay}</p>
                  <p className="text-base font-bold text-primary">{treatment.estimatedCopay}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectTreatmentAndBook(treatment.id)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-semibold text-xs group-hover:bg-primary group-hover:text-on-primary transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{translations.reserveBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Patient Assurance & Comfort Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-surface-container-low rounded-3xl p-6 sm:p-8 lg:p-12 border border-outline-variant/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-on-surface">{translations.assurance1Title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {translations.assurance1Desc}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-on-surface">{translations.assurance2Title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {translations.assurance2Desc}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-700 text-on-primary flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-on-surface">{translations.assurance3Title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {translations.assurance3Desc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClinicHero;

