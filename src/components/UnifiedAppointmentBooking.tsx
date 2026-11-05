import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { ClinicAppointment } from '../types/clinic';
import {
  ALLOWED_CLINIC_DAYS,
  CLINIC_TIME_SLOTS,
  getUpcomingClinicDates,
  AvailableSessionDate,
} from '../config/scheduleConfig';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Lock,
  Headphones,
  Printer,
  CalendarPlus,
  Stethoscope,
  Smile,
  ChevronRight,
  ShieldCheck,
  Check,
  PhoneCall,
  CalendarCheck2,
} from 'lucide-react';

export interface UnifiedAppointmentBookingProps {
  readonly onBookingComplete?: (appointment: ClinicAppointment) => void;
  readonly onGoToDoctorPortal?: () => void;
}

export const UnifiedAppointmentBooking: React.FC<UnifiedAppointmentBookingProps> = ({
  onBookingComplete,
  onGoToDoctorPortal: _onGoToDoctorPortal,
}) => {
  const {
    treatments,
    selectedTreatmentForBooking,
    setSelectedTreatmentForBooking,
    bookAppointment,
    setActiveTab,
    translations,
    language,
  } = useClinic();

  // Dynamic Wednesday & Thursday session dates
  const availableDates: AvailableSessionDate[] = useMemo(() => {
    return getUpcomingClinicDates(6, language);
  }, [language]);

  // Day Filter: All Sessions, Wednesdays Only, or Thursdays Only
  const [dayFilter, setDayFilter] = useState<'all' | 'wed' | 'thu'>('all');

  const filteredDates = useMemo(() => {
    if (dayFilter === 'wed') return availableDates.filter((d) => d.isWednesday);
    if (dayFilter === 'thu') return availableDates.filter((d) => d.isThursday);
    return availableDates;
  }, [availableDates, dayFilter]);

  // Stable ID-based Date Selection to prevent desync when language toggles
  const [selectedDateId, setSelectedDateId] = useState<string>(
    availableDates[0]?.id || 'slot-2026-11-11'
  );

  // Synchronize when availableDates changes
  useEffect(() => {
    if (!availableDates.some((d) => d.id === selectedDateId) && availableDates.length > 0) {
      setSelectedDateId(availableDates[0].id);
    }
  }, [availableDates, selectedDateId]);

  const activeDateObj = useMemo(() => {
    return availableDates.find((d) => d.id === selectedDateId) || availableDates[0];
  }, [availableDates, selectedDateId]);

  const selectedDate = activeDateObj?.dateStr || 'Wednesday, Nov 11';
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [chiefComplaint, setChiefComplaint] = useState<string>('');
  const [wantsHeadphones, setWantsHeadphones] = useState<boolean>(true);
  const [wantsNitrous, setWantsNitrous] = useState<boolean>(false);
  const [hasPenicillinAllergy, setHasPenicillinAllergy] = useState<boolean>(false);
  const [hasDentalAnxiety, setHasDentalAnxiety] = useState<boolean>(false);

  // Errors & Confirmed State
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<ClinicAppointment | null>(null);

  const currentTreatment =
    treatments.find((t) => t.id === selectedTreatmentForBooking) || treatments[0];

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage(
        language === 'te'
          ? 'దయచేసి మీ పూర్తి పేరును నమోదు చేయండి.'
          : 'Please enter your full name to reserve your visit.'
      );
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage(
        language === 'te'
          ? 'తక్షణ SMS నిర్ధారణ కోసం దయచేసి మొబైల్ ఫోన్ నంబర్‌ను అందించండి.'
          : 'Please provide a mobile phone number for instant SMS confirmation.'
      );
      return;
    }

    const alerts: string[] = [];
    if (hasPenicillinAllergy) alerts.push('Penicillin Allergy');
    if (hasDentalAnxiety) alerts.push('Dental Anxiety / Gentle Protocol');

    const appointment = bookAppointment({
      patientName: fullName.trim(),
      patientPhone: phoneNumber.trim(),
      patientEmail: emailAddress.trim() || 'patient@lumina.com',
      treatmentId: currentTreatment.id,
      date: selectedDate,
      timeSlot: selectedSlot,
      chiefComplaint:
        chiefComplaint.trim() ||
        `Scheduled for ${currentTreatment.name}. Patient requested comfort check and initial consultation.`,
      medicalAlerts: alerts,
      preferences: {
        boseHeadphones: wantsHeadphones,
        nitrousOxide: wantsNitrous,
        gentleNumbing: true,
        quietOperatory: true,
      },
    });

    setConfirmedAppointment(appointment);
    if (onBookingComplete) {
      onBookingComplete(appointment);
    }
  };

  const handleResetForNewBooking = () => {
    setConfirmedAppointment(null);
    setFullName('');
    setPhoneNumber('');
    setEmailAddress('');
    setChiefComplaint('');
  };

  // If already confirmed, render the high-contrast Confirmation Pass
  if (confirmedAppointment) {
    return (
      <div id="booking-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-primary/20 text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
            className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner"
          >
            <CheckCircle className="w-9 h-9 text-emerald-700" />
          </motion.div>

          <div>
            <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {translations.passConfirmedBadge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface mt-2">
              {translations.passConfirmedTitle}, {confirmedAppointment.patientName}!
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-lg mx-auto mt-2">
              {translations.passConfirmedSub}
            </p>
          </div>

          {/* Digital Ticket Pass with High-Visibility Date & Time */}
          <div className="bg-surface-container-low rounded-2xl p-5 sm:p-6 border border-outline-variant/30 text-left max-w-xl mx-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div>
                <span className="text-xs text-on-surface-variant font-medium">{translations.passIdLabel}</span>
                <p className="text-base sm:text-lg font-mono font-bold text-primary">{confirmedAppointment.id}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface text-xs font-bold">
                {confirmedAppointment.status}
              </span>
            </div>

            {/* High-Contrast Slot & Time Highlight */}
            <div className="p-3.5 rounded-xl bg-primary/10 border-2 border-primary/30 flex items-center gap-3">
              <Clock className="w-6 h-6 text-primary shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {translations.selectedSlotTimeLabel}
                </span>
                <p className="text-base sm:text-lg font-black text-on-surface">
                  {confirmedAppointment.date} &middot; <span className="text-primary">{confirmedAppointment.timeSlot}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div>
                <p className="text-on-surface-variant font-medium">{translations.passProcedure}</p>
                <p className="font-bold text-on-surface text-sm">{confirmedAppointment.treatmentName}</p>
              </div>
              <div>
                <p className="text-on-surface-variant font-medium">{translations.passClinician}</p>
                <p className="font-bold text-on-surface text-sm">{confirmedAppointment.doctorName}</p>
              </div>
              <div>
                <p className="text-on-surface-variant font-medium">{translations.passLocation}</p>
                <p className="font-bold text-on-surface text-sm">450 Sutter St, Ste 1800, SF</p>
              </div>
              <div>
                <p className="text-on-surface-variant font-medium">{translations.estimatedCopay}</p>
                <p className="font-bold text-primary text-sm">{currentTreatment.estimatedCopay}</p>
              </div>
            </div>

            {confirmedAppointment.chiefComplaint && (
              <div className="pt-2 border-t border-outline-variant/20 text-xs">
                <p className="text-on-surface-variant font-medium">{language === 'te' ? 'క్లినికల్ సమస్య / గమనిక' : 'Clinical Concern / Note'}</p>
                <p className="text-on-surface font-medium italic mt-0.5">{confirmedAppointment.chiefComplaint}</p>
              </div>
            )}
          </div>

          {/* Action Buttons - Patient Focused & Mobile Optimized */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 w-full">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleResetForNewBooking}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-full bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4 shrink-0" />
              <span>{translations.bookAnotherBtn}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.print()}
              className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2 text-xs font-bold cursor-pointer"
            >
              <Printer className="w-4 h-4 text-on-surface-variant shrink-0" />
              <span>{translations.printPassBtn}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-full bg-surface-container-lowest text-on-surface-variant border border-outline-variant/40 hover:text-on-surface transition-all flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <span>{translations.returnHomeBtn}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <section id="booking-section" className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-10 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>{translations.bookingPill}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
          {translations.bookingTitle}
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          {translations.bookingSubtitle}
        </p>

        {/* 4-Step Visual Progress Breadcrumb */}
        <div className="pt-4 flex items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-on-surface-variant overflow-x-auto py-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap font-bold">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-bold">1</span>
            <span>{language === 'te' ? 'సేవ' : 'Service'}</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-outline-variant shrink-0" />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap font-bold">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-bold">2</span>
            <span>{language === 'te' ? 'బుధ & గురు స్లాట్లు' : 'Wed & Thu Slots'}</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-outline-variant shrink-0" />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface whitespace-nowrap">
            <span className="w-5 h-5 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center text-[10px] font-bold">3</span>
            <span>{language === 'te' ? 'వివరాలు' : 'Details'}</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-outline-variant shrink-0" />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface whitespace-nowrap">
            <span className="w-5 h-5 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center text-[10px] font-bold">4</span>
            <span>{language === 'te' ? 'నిర్ధారణ' : 'Confirm'}</span>
          </span>
        </div>
      </div>

      <form onSubmit={handleConfirmReservation} className="space-y-8 sm:space-y-10">
        {/* STEP 1: Select Dental Treatment */}
        <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                1
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-on-surface">{translations.step1Title}</h3>
                <p className="text-xs text-on-surface-variant">{translations.step1Sub}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {treatments.map((treatment) => {
              const isSelected = selectedTreatmentForBooking === treatment.id;
              return (
                <motion.div
                  key={treatment.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedTreatmentForBooking(treatment.id)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all border text-left flex flex-col justify-between ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-sm ring-2 ring-primary/20'
                      : 'border-outline-variant/30 bg-surface hover:border-primary/50'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-bold text-on-surface-variant">
                        {treatment.duration}
                      </span>
                      {isSelected ? (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-outline-variant/60" />
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-on-surface">{treatment.name}</h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {treatment.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant font-medium">{translations.estimatedCopay}</span>
                    <span className="font-bold text-primary">{treatment.estimatedCopay}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* STEP 2: Highly Visible Clinical Date & Time Selection (Wednesday & Thursday Exclusivity) */}
        <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-primary/20 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                2
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-on-surface">{translations.step2Title}</h3>
                <p className="text-xs text-on-surface-variant">{translations.step2Sub}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-primary px-3 py-1.5 rounded-full bg-primary/10 self-start sm:self-auto">
              {translations.selectedSessionPrompt}: {selectedDate} @ {selectedSlot}
            </span>
          </div>

          {/* ULTRA-PROMINENT ACTIVE SLOT & TIME BANNER */}
          <div className="p-4 sm:p-5 rounded-2xl bg-primary/10 border-2 border-primary/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-md">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                  {translations.selectedSlotTimeLabel}
                </span>
                <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
                  <span className="text-base sm:text-xl font-black text-on-surface">
                    {selectedDate}
                  </span>
                  <span className="text-base sm:text-xl font-black text-primary">
                    &middot; {selectedSlot}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {activeDateObj?.sessionTitle || 'Comprehensive Dental Care'} &middot; Dr. Sarah Jenkins
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-center">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>{activeDateObj?.sessionBadge || 'Full Clinic'}</span>
              </span>
            </div>
          </div>

          {/* Prominent Clinical Schedule Notice: Wednesday & Thursday Operating Policy */}
          <div className="rounded-2xl p-4 sm:p-5 bg-emerald-50/70 border border-emerald-200/70 text-on-surface space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Calendar className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-emerald-950">
                  {translations.scheduleNoticeTitle}
                </h4>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900">
                {translations.scheduleNoticePill}
              </span>
            </div>

            <p className="text-xs text-emerald-900/90 leading-relaxed">
              {translations.scheduleNoticeDesc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <div className="inline-flex items-center gap-1.5 font-bold text-emerald-950">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'te' ? 'బుధవారం: పూర్తి క్లినికల్ & సంప్రదింపులు' : 'Wednesday: Full Clinical & Consults'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 font-bold text-emerald-950">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'te' ? 'గురువారం: శస్త్రచికిత్స & సమగ్ర సంరక్షణ' : 'Thursday: Surgical & Comprehensive Care'}</span>
              </div>
              <a
                href="tel:5552348901"
                className="ml-auto inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 font-semibold underline text-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{translations.scheduleEmergencyCall}</span>
              </a>
            </div>
          </div>

          {/* Session Day Filter Tabs */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{translations.availableDates}</span>
              </label>

              {/* Day filter pills */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto bg-surface-container-low p-1 rounded-xl border border-outline-variant/20 text-xs">
                <button
                  type="button"
                  onClick={() => setDayFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    dayFilter === 'all'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {translations.allSessionsFilter}
                </button>
                <button
                  type="button"
                  onClick={() => setDayFilter('wed')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    dayFilter === 'wed'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {translations.wednesdaysOnlyFilter}
                </button>
                <button
                  type="button"
                  onClick={() => setDayFilter('thu')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    dayFilter === 'thu'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {translations.thursdaysOnlyFilter}
                </button>
              </div>
            </div>

            {/* High-Contrast Date Selection Cards Grid (Strictly Wednesdays & Thursdays) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredDates.map((item) => {
                const isSelected = item.id === selectedDateId;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDateId(item.id)}
                    className={`cursor-pointer rounded-2xl p-4 transition-all text-left flex flex-col justify-between min-h-[96px] ${
                      isSelected
                        ? 'border-2 border-primary bg-primary/10 shadow-md ring-2 ring-primary/30'
                        : 'border-2 border-outline-variant/40 bg-surface-container-lowest hover:border-primary/60 hover:bg-surface-container-low shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-md ${
                              item.isWednesday
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-teal-100 text-teal-800'
                            }`}
                          >
                            {item.dayName}
                          </span>
                          <span className="text-sm font-extrabold text-on-surface">
                            {item.formattedDate}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface font-semibold mt-1.5 line-clamp-1">
                          {item.sessionTitle}
                        </p>
                      </div>

                      <div className="shrink-0 mt-0.5">
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-outline-variant/60" />
                        )}
                      </div>
                    </div>

                    <div className="pt-2 mt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                      <span className="text-[11px] font-bold text-primary">
                        {item.sessionBadge}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700">
                        {item.availableSlotsCount} {translations.slotsOpenBadge}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Time Slot Picker by Clinical Period with High Contrast Visibility */}
          <div className="space-y-5 pt-2">
            {/* Morning Sessions */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                <span>{translations.morningSlots} (09:00 AM – 11:30 AM)</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CLINIC_TIME_SLOTS.morning.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <motion.button
                      key={slot}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSlot(slot)}
                      className={`min-h-[50px] py-2.5 px-3 rounded-xl border-2 text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-primary text-on-primary border-primary ring-2 ring-primary/40 shadow-md font-black'
                          : 'bg-surface-container-lowest border-outline-variant/40 text-on-surface hover:border-primary/80 hover:bg-primary/5 shadow-xs'
                      }`}
                    >
                      <Clock className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-on-primary' : 'text-primary'}`} />
                      <span>{slot}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] shrink-0 text-on-primary ml-auto sm:ml-0" />}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Afternoon Sessions */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-secondary" />
                <span>{translations.afternoonSlots} (01:15 PM – 03:30 PM)</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CLINIC_TIME_SLOTS.afternoon.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <motion.button
                      key={slot}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSlot(slot)}
                      className={`min-h-[50px] py-2.5 px-3 rounded-xl border-2 text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-primary text-on-primary border-primary ring-2 ring-primary/40 shadow-md font-black'
                          : 'bg-surface-container-lowest border-outline-variant/40 text-on-surface hover:border-primary/80 hover:bg-primary/5 shadow-xs'
                      }`}
                    >
                      <Clock className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-on-primary' : 'text-secondary'}`} />
                      <span>{slot}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] shrink-0 text-on-primary ml-auto sm:ml-0" />}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Evening Sessions */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-700" />
                <span>{translations.eveningSlots} (04:15 PM – 05:00 PM)</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CLINIC_TIME_SLOTS.evening.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <motion.button
                      key={slot}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSlot(slot)}
                      className={`min-h-[50px] py-2.5 px-3 rounded-xl border-2 text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-primary text-on-primary border-primary ring-2 ring-primary/40 shadow-md font-black'
                          : 'bg-surface-container-lowest border-outline-variant/40 text-on-surface hover:border-primary/80 hover:bg-primary/5 shadow-xs'
                      }`}
                    >
                      <Clock className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-on-primary' : 'text-teal-700'}`} />
                      <span>{slot}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] shrink-0 text-on-primary ml-auto sm:ml-0" />}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: Patient Information & Clinical Context */}
        <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-outline-variant/30 shadow-sm space-y-5 sm:space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/20">
            <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
              3
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-on-surface">{translations.step3Title}</h3>
              <p className="text-xs text-on-surface-variant">{translations.step3Sub}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-2">
                {translations.fullNameLabel} *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder={language === 'te' ? 'ఉదా. రవి వర్మ' : 'e.g. Maya Ramirez'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-on-surface text-base sm:text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-2">
                {translations.phoneLabel} *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="(555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-on-surface text-base sm:text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-2">
                {translations.emailLabel}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-on-surface text-base sm:text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface mb-2">
              {translations.symptomLabel}
            </label>
            <textarea
              rows={2}
              placeholder={
                language === 'te'
                  ? 'ఉదా. చల్లటి నీరు తాగినప్పుడు పంటి నొప్పి, లేదా సాధారణ దంత తనిఖీ.'
                  : 'e.g. Sensitivity to cold water on upper right tooth, or regular 6-month checkup.'
              }
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-on-surface text-base sm:text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Comfort Preferences & Clinical Alerts */}
          <div className="pt-2 border-t border-outline-variant/20">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
              {translations.comfortPrefsTitle}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <label className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={wantsHeadphones}
                  onChange={(e) => setWantsHeadphones(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span>{translations.prefHeadphones}</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={wantsNitrous}
                  onChange={(e) => setWantsNitrous(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span>{translations.prefNitrous}</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={hasPenicillinAllergy}
                  onChange={(e) => setHasPenicillinAllergy(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span>{translations.prefPenicillin}</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={hasDentalAnxiety}
                  onChange={(e) => setHasDentalAnxiety(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span>{translations.prefAnxiety}</span>
              </label>
            </div>
          </div>
        </div>

        {/* STEP 4: IN-LINE CONFIRMATION DOCK */}
        <div className="bg-surface-container-high rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-primary/30 shadow-lg space-y-5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-primary">
                {language === 'te' ? 'తుది దశ · తక్షణ రిజర్వేషన్' : 'Final Step · Instant Reservation'}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-on-surface mt-0.5">
                {translations.step4Title}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium bg-surface-container-lowest px-3.5 py-1.5 rounded-full border border-outline-variant/30 self-start sm:self-auto">
              <Lock className="w-3.5 h-3.5 text-secondary" />
              <span>{translations.hipaaBadge}</span>
            </div>
          </div>

          {/* Quick Summary Grid with High Contrast Slot Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/20 text-xs">
            <div>
              <p className="text-on-surface-variant font-medium">{translations.passProcedure}</p>
              <p className="font-bold text-on-surface text-sm mt-0.5">{currentTreatment.name}</p>
              <p className="text-primary font-semibold">{currentTreatment.duration}</p>
            </div>

            <div>
              <p className="text-on-surface-variant font-medium">{translations.passClinician}</p>
              <p className="font-bold text-on-surface text-sm mt-0.5">Dr. Sarah Jenkins, DDS</p>
              <p className="text-on-surface-variant">Operatory 1 (Panoramic Suite)</p>
            </div>

            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-primary font-bold uppercase tracking-wider text-[10px]">{translations.selectedSlotTimeLabel}</p>
              <p className="font-black text-on-surface text-sm mt-0.5">{selectedDate}</p>
              <p className="font-black text-primary text-sm">{selectedSlot}</p>
            </div>

            <div>
              <p className="text-on-surface-variant font-medium">{translations.estimatedCopay}</p>
              <p className="text-lg font-extrabold text-primary mt-0.5">{currentTreatment.estimatedCopay}</p>
              <p className="text-on-surface-variant">PPO / Self-Pay Eligible</p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-error/10 border border-error/30 text-error text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* THE BIG PROMINENT CONFIRM BUTTON */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full min-h-[54px] rounded-2xl bg-primary text-on-primary font-bold text-sm sm:text-base shadow-xl hover:bg-primary-container transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Lock className="w-5 h-5 shrink-0" />
              <span>{translations.confirmBtn}</span>
            </motion.button>

            <p className="text-center text-xs text-on-surface-variant">
              {translations.confirmGuarantee}
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default UnifiedAppointmentBooking;
