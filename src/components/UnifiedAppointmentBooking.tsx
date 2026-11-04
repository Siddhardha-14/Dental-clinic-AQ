import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { ClinicAppointment } from '../types/clinic';
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
  FileText,
  ArrowRight,
  Printer,
  CalendarPlus,
  Stethoscope,
  Smile,
} from 'lucide-react';

export interface UnifiedAppointmentBookingProps {
  readonly onBookingComplete?: (appointment: ClinicAppointment) => void;
  readonly onGoToDoctorPortal?: () => void;
}

const AVAILABLE_DATES = [
  { id: 'today', label: 'Today', dateStr: 'Today, Oct 24', sub: 'Urgent/Fast' },
  { id: 'tomorrow', label: 'Tomorrow', dateStr: 'Tomorrow, Oct 25', sub: 'Available' },
  { id: 'sat', label: 'Saturday', dateStr: 'Sat, Oct 26', sub: 'Morning slots' },
  { id: 'mon', label: 'Monday', dateStr: 'Mon, Oct 28', sub: 'Full day' },
  { id: 'tue', label: 'Tuesday', dateStr: 'Tue, Oct 29', sub: 'Available' },
];

const TIME_SLOTS = {
  morning: ['09:00 AM', '10:00 AM', '10:45 AM', '11:30 AM'],
  afternoon: ['01:15 PM', '02:00 PM', '02:45 PM', '03:30 PM'],
  evening: ['04:15 PM', '05:00 PM'],
};

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
  } = useClinic();

  // Booking Form State
  const [selectedDate, setSelectedDate] = useState<string>('Today, Oct 24');
  const [selectedSlot, setSelectedSlot] = useState<string>('11:30 AM');
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
      setErrorMessage('Please enter your full name to reserve your visit.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please provide a mobile phone number for instant SMS confirmation.');
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
      <div id="booking-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
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
              Appointment Reserved &middot; Real-Time Synced
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface mt-2">
              You&apos;re All Set, {confirmedAppointment.patientName}!
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-lg mx-auto mt-2">
              Your appointment is confirmed and immediately sent to Dr. Sarah Jenkins&apos;s live schedule.
            </p>
          </div>

          {/* Digital Ticket Pass */}
          <div className="bg-surface-container-low rounded-2xl p-5 sm:p-6 border border-outline-variant/30 text-left max-w-xl mx-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div>
                <span className="text-xs text-on-surface-variant font-medium">Confirmation Pass</span>
                <p className="text-base sm:text-lg font-mono font-bold text-primary">{confirmedAppointment.id}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface text-xs font-bold">
                {confirmedAppointment.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-on-surface-variant font-medium">Procedure</p>
                <p className="font-bold text-on-surface text-sm">{confirmedAppointment.treatmentName}</p>
              </div>
              <div>
                <p className="text-on-surface-variant font-medium">Clinician</p>
                <p className="font-bold text-on-surface text-sm">{confirmedAppointment.doctorName}</p>
              </div>
              <div>
                <p className="text-on-surface-variant font-medium">When</p>
                <p className="font-bold text-primary text-sm">{confirmedAppointment.date} &middot; {confirmedAppointment.timeSlot}</p>
              </div>
              <div>
                <p className="text-on-surface-variant font-medium">Location</p>
                <p className="font-bold text-on-surface text-sm">450 Sutter St, Ste 1800, SF</p>
              </div>
            </div>

            {confirmedAppointment.chiefComplaint && (
              <div className="pt-2 border-t border-outline-variant/20 text-xs">
                <p className="text-on-surface-variant font-medium">Clinical Concern / Note</p>
                <p className="text-on-surface font-medium italic mt-0.5">{confirmedAppointment.chiefComplaint}</p>
              </div>
            )}
          </div>

          {/* Action Buttons - Patient Focused */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleResetForNewBooking}
              className="min-h-[48px] px-6 py-3 rounded-full bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-container transition-all flex items-center gap-2 cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Book Another Visit</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.print()}
              className="min-h-[48px] px-5 py-3 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all flex items-center gap-2 text-xs font-bold cursor-pointer"
            >
              <Printer className="w-4 h-4 text-on-surface-variant" />
              <span>Print Pass</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="min-h-[48px] px-5 py-3 rounded-full bg-surface-container-lowest text-on-surface-variant border border-outline-variant/40 hover:text-on-surface transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <span>Done &amp; Return Home</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <section id="booking-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Real-Time Doctor Availability</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
          Reserve Your Dental Visit
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Follow the simple steps below. Your appointment confirms immediately with zero cancellation fees up to 24h prior.
        </p>
      </div>

      <form onSubmit={handleConfirmReservation} className="space-y-10">
        {/* STEP 1: Select Dental Treatment */}
        <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-8 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                1
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-on-surface">Choose Treatment or Concern</h3>
                <p className="text-xs text-on-surface-variant">Select the primary service needed for your visit</p>
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
                    <span className="text-on-surface-variant font-medium">Copay</span>
                    <span className="font-bold text-primary">{treatment.estimatedCopay}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* STEP 2: Choose Date & Time Slot */}
        <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                2
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-on-surface">Select Date &amp; Time</h3>
                <p className="text-xs text-on-surface-variant">With Dr. Sarah Jenkins, DDS (Panoramic Suite 1)</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-primary px-3 py-1 rounded-full bg-primary/10 hidden sm:inline-block">
              Selected: {selectedDate} @ {selectedSlot}
            </span>
          </div>

          {/* Date Selector Pills */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Available Dates
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {AVAILABLE_DATES.map((d) => {
                const isSelected = selectedDate === d.dateStr;
                return (
                  <motion.button
                    key={d.id}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedDate(d.dateStr)}
                    className={`min-h-[50px] p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-on-primary border-primary shadow-sm font-bold'
                        : 'bg-surface border-outline-variant/30 text-on-surface hover:border-primary/50'
                    }`}
                  >
                    <div className="text-xs font-bold">{d.label}</div>
                    <div className={`text-xs mt-0.5 ${isSelected ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                      {d.sub}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Picker by Period */}
          <div className="space-y-4 pt-2">
            {/* Morning */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Morning Sessions</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TIME_SLOTS.morning.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <motion.button
                      key={slot}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSlot(slot)}
                      className={`min-h-[44px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-on-primary border-primary shadow-sm'
                          : 'bg-surface border-outline-variant/30 text-on-surface hover:border-primary/50'
                      }`}
                    >
                      {slot}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Afternoon */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-secondary" />
                <span>Afternoon Sessions</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TIME_SLOTS.afternoon.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <motion.button
                      key={slot}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSlot(slot)}
                      className={`min-h-[44px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-on-primary border-primary shadow-sm'
                          : 'bg-surface border-outline-variant/30 text-on-surface hover:border-primary/50'
                      }`}
                    >
                      {slot}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Evening */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-700" />
                <span>Evening Sessions</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TIME_SLOTS.evening.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <motion.button
                      key={slot}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSlot(slot)}
                      className={`min-h-[44px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-on-primary border-primary shadow-sm'
                          : 'bg-surface border-outline-variant/30 text-on-surface hover:border-primary/50'
                      }`}
                    >
                      {slot}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: Patient Information & Clinical Context */}
        <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/20">
            <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
              3
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-on-surface">Patient Details &amp; Reason for Visit</h3>
              <p className="text-xs text-on-surface-variant">Helps Dr. Jenkins prepare your care plan in advance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Ramirez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-on-surface text-base sm:text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-2">
                Mobile Phone (SMS Reminders) *
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
                Email Address
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
              What brings you in? (Symptoms, tooth pain, or goals)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Sensitivity to cold water on upper right tooth, or regular 6-month checkup."
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-on-surface text-base sm:text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Comfort Preferences & Clinical Alerts */}
          <div className="pt-2 border-t border-outline-variant/20">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
              Comfort &amp; Clinical Preferences
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <label className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={wantsHeadphones}
                  onChange={(e) => setWantsHeadphones(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span>Bose Headphones</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={wantsNitrous}
                  onChange={(e) => setWantsNitrous(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span>Nitrous Oxide Gas</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={hasPenicillinAllergy}
                  onChange={(e) => setHasPenicillinAllergy(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span>Penicillin Allergy</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={hasDentalAnxiety}
                  onChange={(e) => setHasDentalAnxiety(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span>Dental Anxiety</span>
              </label>
            </div>
          </div>
        </div>

        {/* STEP 4: IN-LINE CONFIRMATION DOCK */}
        <div className="bg-surface-container-high rounded-3xl p-5 sm:p-8 border-2 border-primary/30 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-primary">
                Final Step &middot; Instant Reservation
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-on-surface mt-0.5">
                Review &amp; Confirm Booking
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium bg-surface-container-lowest px-3.5 py-1.5 rounded-full border border-outline-variant/30 self-start sm:self-auto">
              <Lock className="w-3.5 h-3.5 text-secondary" />
              <span>HIPAA Encrypted &amp; 100% Guaranteed</span>
            </div>
          </div>

          {/* Quick Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/20 text-xs">
            <div>
              <p className="text-on-surface-variant font-medium">Selected Treatment</p>
              <p className="font-bold text-on-surface text-sm mt-0.5">{currentTreatment.name}</p>
              <p className="text-primary font-semibold">{currentTreatment.duration}</p>
            </div>

            <div>
              <p className="text-on-surface-variant font-medium">Clinician</p>
              <p className="font-bold text-on-surface text-sm mt-0.5">Dr. Sarah Jenkins, DDS</p>
              <p className="text-on-surface-variant">Operatory 1 (Panoramic)</p>
            </div>

            <div>
              <p className="text-on-surface-variant font-medium">Date &amp; Time Slot</p>
              <p className="font-bold text-primary text-sm mt-0.5">{selectedDate}</p>
              <p className="font-bold text-on-surface">{selectedSlot}</p>
            </div>

            <div>
              <p className="text-on-surface-variant font-medium">Estimated Patient Copay</p>
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
              <Lock className="w-5 h-5" />
              <span>Confirm &amp; Reserve Appointment</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="text-center text-xs text-on-surface-variant">
              Free rescheduling &amp; cancellations up to 24h prior &middot; Confirmation sent via SMS &amp; Email
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default UnifiedAppointmentBooking;

