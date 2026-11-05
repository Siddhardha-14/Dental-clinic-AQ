import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { ClinicAppointment } from '../types/clinic';
import { CLINIC_TIME_SLOTS } from '../config/scheduleConfig';
import {
  Stethoscope,
  Clock,
  User,
  UserCheck,
  Phone,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Sparkles,
  Headphones,
  FileEdit,
  Save,
  LogOut,
  PlusCircle,
  ShieldCheck,
  Search,
  Filter,
  Check,
  X,
  CalendarCheck,
} from 'lucide-react';

export interface DoctorClinicalDashboardProps {
  readonly onBookNewPatient?: () => void;
}

export const DoctorClinicalDashboard: React.FC<DoctorClinicalDashboardProps> = ({
  onBookNewPatient,
}) => {
  const {
    appointments,
    doctorSession,
    doctorLogout,
    updateAppointmentStatus,
    updateDoctorNotes,
    bookAppointment,
    treatments,
    setActiveTab,
    translations,
    language,
  } = useClinic();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>('');

  // Doctor Clinical Schedule Matrix Day Selector (Wednesday vs Thursday)
  const [selectedScheduleDay, setSelectedScheduleDay] = useState<'Wednesday' | 'Thursday'>('Wednesday');

  // Quick Walk-In Booking State for Open Slots
  const [quickBookingSlot, setQuickBookingSlot] = useState<string | null>(null);
  const [walkInPatientName, setWalkInPatientName] = useState<string>('');
  const [walkInTreatmentId, setWalkInTreatmentId] = useState<string>('trt-emergency');

  // Filtered appointments for the patient list
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.treatmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (apt.chiefComplaint && apt.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterStatus === 'chair') return apt.status === 'In Chair';
    if (filterStatus === 'upcoming')
      return apt.status === 'Next Up' || apt.status === 'Arrived / Checked In';
    if (filterStatus === 'completed') return apt.status === 'Completed';

    return true;
  });

  // Summary Metrics
  const inChairCount = appointments.filter((a) => a.status === 'In Chair').length;
  const upcomingCount = appointments.filter(
    (a) => a.status === 'Next Up' || a.status === 'Arrived / Checked In'
  ).length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;

  const handleStartEditNote = (apt: ClinicAppointment) => {
    setEditingNoteId(apt.id);
    setNoteDraft(apt.doctorNotes || '');
  };

  const handleSaveNote = (aptId: string) => {
    updateDoctorNotes(aptId, noteDraft);
    setEditingNoteId(null);
  };

  // All clinical procedure slots for Dr. Sarah Jenkins
  const allDaySlots: string[] = [
    ...CLINIC_TIME_SLOTS.morning,
    '01:15 PM',
    '01:30 PM',
    '02:00 PM',
    '02:45 PM',
    '03:30 PM',
    ...CLINIC_TIME_SLOTS.evening,
  ];

  const handleConfirmWalkInBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInPatientName.trim() || !quickBookingSlot) return;

    const dateStr =
      selectedScheduleDay === 'Wednesday' ? 'Wednesday, Nov 11' : 'Thursday, Nov 12';

    bookAppointment({
      patientName: walkInPatientName.trim(),
      patientPhone: '(555) 888-0199',
      patientEmail: 'walkin@lumina.com',
      treatmentId: walkInTreatmentId,
      date: dateStr,
      timeSlot: quickBookingSlot,
      chiefComplaint: `Direct in-operatory walk-in booking by Dr. Sarah Jenkins for ${quickBookingSlot}.`,
      medicalAlerts: [],
      preferences: {
        boseHeadphones: true,
        gentleNumbing: true,
        quietOperatory: true,
      },
    });

    setQuickBookingSlot(null);
    setWalkInPatientName('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Doctor Header & Session Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-md shrink-0">
            <Stethoscope className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {language === 'te' ? 'ప్రత్యక్ష క్లినికల్ సెషన్' : 'Live Clinical Session'}
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                {doctorSession.operatory}
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-on-surface tracking-tight mt-1">
              {language === 'te' ? `స్వాగతం, ${doctorSession.doctorName}` : `Welcome, ${doctorSession.doctorName}`}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              {language === 'te'
                ? 'ఇది మీ సమకాలీకరించబడిన చికిత్స షెడ్యూల్ · ఎవరు వస్తున్నారు, వారి సమయం మరియు ప్రధాన సమస్యలను పరిశీలించండి.'
                : 'Here is your synchronized treatment schedule · Inspect who is coming, their arrival time, and chief dental complaint.'}
            </p>
          </div>
        </div>

        {/* Doctor Actions */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          {onBookNewPatient && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBookNewPatient}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-semibold text-xs hover:bg-surface-container-highest transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-primary" />
              <span>{language === 'te' ? 'కొత్త రోగి' : 'New Patient'}</span>
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('booking')}
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs hover:bg-primary-container shadow transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'te' ? 'పబ్లిక్ బుకింగ్ వీక్షణ' : 'Public Booking View'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={doctorLogout}
            className="min-h-[44px] px-4 py-2.5 rounded-xl border border-error/30 text-error hover:bg-error/10 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            title="Sign out of Doctor Portal"
          >
            <LogOut className="w-4 h-4" />
            <span>{translations.signOutBtn}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* 2. Quick Clinical Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          onClick={() => setFilterStatus('all')}
          className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all ${
            filterStatus === 'all'
              ? 'bg-primary/5 border-primary ring-2 ring-primary/20 shadow-sm'
              : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
          }`}
        >
          <span className="text-[11px] sm:text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            {translations.totalToday}
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-on-surface mt-1">{appointments.length}</p>
          <p className="text-[11px] sm:text-xs text-on-surface-variant mt-0.5">
            {language === 'te' ? 'షెడ్యూల్ చేసిన రోగులు' : 'Scheduled Patients'}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          onClick={() => setFilterStatus('chair')}
          className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all ${
            filterStatus === 'chair'
              ? 'bg-primary/5 border-primary ring-2 ring-primary/20 shadow-sm'
              : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wider">
              {translations.inChair}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-900 mt-1">{inChairCount}</p>
          <p className="text-[11px] sm:text-xs text-on-surface-variant mt-0.5">
            {language === 'te' ? 'ఆపరేటరీలో చికిత్స పొందుతున్నారు' : 'Active in Operatory'}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          onClick={() => setFilterStatus('upcoming')}
          className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all ${
            filterStatus === 'upcoming'
              ? 'bg-primary/5 border-primary ring-2 ring-primary/20 shadow-sm'
              : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
          }`}
        >
          <span className="text-[11px] sm:text-xs font-bold text-amber-700 uppercase tracking-wider">
            {translations.nextUp}
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-900 mt-1">{upcomingCount}</p>
          <p className="text-[11px] sm:text-xs text-on-surface-variant mt-0.5">
            {language === 'te' ? 'లాంజ్ & వచ్చే దారిలో' : 'Lounge & On Way'}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          onClick={() => setFilterStatus('completed')}
          className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all ${
            filterStatus === 'completed'
              ? 'bg-primary/5 border-primary ring-2 ring-primary/20 shadow-sm'
              : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
          }`}
        >
          <span className="text-[11px] sm:text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            {translations.completed}
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-on-surface mt-1">{completedCount}</p>
          <p className="text-[11px] sm:text-xs text-on-surface-variant mt-0.5">
            {language === 'te' ? 'ఈ రోజు పూర్తయినవి' : 'Finished Today'}
          </p>
        </motion.div>
      </div>

      {/* 3. DOCTOR'S CLINICAL TIME SLOTS & OPERATORY SCHEDULE MATRIX (HIGH VISIBILITY) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-7 border-2 border-primary/20 shadow-md space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-on-surface">
                {translations.scheduleMatrixTitle}
              </h2>
              <p className="text-xs text-on-surface-variant">
                {translations.scheduleMatrixSub}
              </p>
            </div>
          </div>

          {/* Session Day Tabs: Wednesday vs Thursday */}
          <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-2xl border border-outline-variant/30 text-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSelectedScheduleDay('Wednesday')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedScheduleDay === 'Wednesday'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{translations.wednesdaySessionTab}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedScheduleDay('Thursday')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedScheduleDay === 'Thursday'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{translations.thursdaySessionTab}</span>
            </button>
          </div>
        </div>

        {/* TIME SLOTS GRID - HIGH CONTRAST & FULL VISIBILITY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {allDaySlots.map((slot) => {
            // Find if there is an appointment scheduled for this day & slot
            const bookedApt = appointments.find(
              (a) =>
                a.timeSlot === slot &&
                a.date.toLowerCase().includes(selectedScheduleDay.toLowerCase())
            );

            const isBooked = Boolean(bookedApt);

            return (
              <div
                key={slot}
                className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[110px] ${
                  isBooked
                    ? bookedApt?.status === 'In Chair'
                      ? 'border-emerald-500 bg-emerald-50/60 shadow-sm ring-1 ring-emerald-500/20'
                      : 'border-primary/40 bg-surface-container-low shadow-sm'
                    : 'border-outline-variant/40 bg-surface-container-lowest hover:border-primary/60'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                  <div className="flex items-center gap-1.5">
                    <Clock className={`w-4 h-4 ${isBooked ? 'text-primary' : 'text-emerald-700'}`} />
                    <span className="text-sm font-black text-on-surface">{slot}</span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      isBooked
                        ? bookedApt?.status === 'In Chair'
                          ? 'bg-emerald-200/80 text-emerald-900'
                          : 'bg-primary/10 text-primary'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isBooked ? bookedApt?.status || translations.bookedSlotBadge : translations.openSlotBadge}
                  </span>
                </div>

                {isBooked && bookedApt ? (
                  <div className="pt-2 space-y-1">
                    <p className="text-xs font-black text-on-surface truncate">
                      {bookedApt.patientName}
                    </p>
                    <p className="text-[11px] text-on-surface-variant truncate font-medium">
                      {bookedApt.treatmentName}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[10px]">
                      <span className="font-mono text-primary font-bold">{bookedApt.id}</span>
                      {bookedApt.status !== 'Completed' && (
                        <button
                          type="button"
                          onClick={() =>
                            updateAppointmentStatus(
                              bookedApt.id,
                              bookedApt.status === 'In Chair' ? 'Completed' : 'In Chair'
                            )
                          }
                          className="font-bold text-emerald-800 hover:underline cursor-pointer"
                        >
                          {bookedApt.status === 'In Chair' ? 'Finish' : 'Seat'}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-emerald-800 font-semibold">
                      {language === 'te' ? 'ఆపరేటరీ ఖాళీగా ఉంది' : 'Operatory Open'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuickBookingSlot(slot)}
                      className="px-2.5 py-1 rounded-lg bg-primary text-on-primary text-[11px] font-bold shadow-xs hover:bg-primary-container transition-all cursor-pointer flex items-center gap-1"
                    >
                      <PlusCircle className="w-3 h-3" />
                      <span>{translations.quickBookSlotBtn}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* QUICK WALK-IN BOOKING MODAL FOR THE DOCTOR */}
        <AnimatePresence>
          {quickBookingSlot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="p-4 sm:p-5 rounded-2xl bg-surface-container-high border-2 border-primary/30 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-primary" />
                  <h4 className="text-xs sm:text-sm font-extrabold text-on-surface">
                    {language === 'te'
                      ? `${selectedScheduleDay} @ ${quickBookingSlot} వద్ద రోగిని బుక్ చేయండి`
                      : `Book Walk-In Patient for ${selectedScheduleDay} @ ${quickBookingSlot}`}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setQuickBookingSlot(null)}
                  className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:bg-surface cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleConfirmWalkInBooking} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder={language === 'te' ? 'రోగి పూర్తి పేరు' : 'Patient Full Name'}
                  value={walkInPatientName}
                  onChange={(e) => setWalkInPatientName(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-xs text-on-surface font-semibold focus:outline-none focus:border-primary"
                />

                <select
                  value={walkInTreatmentId}
                  onChange={(e) => setWalkInTreatmentId(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-xs text-on-surface font-semibold focus:outline-none focus:border-primary"
                >
                  {treatments.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.duration})
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs shadow hover:bg-primary-container transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{language === 'te' ? 'స్లాట్ ఖరారు చేయండి' : 'Confirm Slot Booking'}</span>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 4. Search and Status Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={translations.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-outline-variant/30 bg-surface text-on-surface text-base sm:text-xs focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterStatus('all')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterStatus === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {language === 'te' ? 'అందరు రోగులు' : 'All Patients'} ({appointments.length})
          </button>
          <button
            onClick={() => setFilterStatus('chair')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterStatus === 'chair'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {translations.inChair} ({inChairCount})
          </button>
          <button
            onClick={() => setFilterStatus('upcoming')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterStatus === 'upcoming'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {translations.nextUp} ({upcomingCount})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterStatus === 'completed'
                ? 'bg-surface-container-highest text-on-surface shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {translations.completed} ({completedCount})
          </button>
        </div>
      </div>

      {/* 5. Patient Treatment Queue Cards (WHO, WHEN, WHAT IS THE PROBLEM) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h2 className="text-lg sm:text-xl font-bold text-on-surface">
            {translations.todaysPatientsTitle} ({filteredAppointments.length})
          </h2>
          <span className="text-xs text-on-surface-variant">
            {language === 'te'
              ? 'ఆన్‌లైన్ రిజర్వేషన్లతో ప్రత్యక్ష సమకాలీకరణ'
              : 'Live auto-synced with patient online reservations'}
          </span>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-3xl p-8 sm:p-12 text-center border border-outline-variant/30 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
            <p className="text-base font-bold text-on-surface">No appointments matching this view</p>
            <p className="text-xs text-on-surface-variant">
              Select &quot;All Patients&quot; or book a new appointment from the public booking form.
            </p>
          </div>
        ) : (
          filteredAppointments.map((apt, idx) => {
            const isEditingNote = editingNoteId === apt.id;

            return (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-7 border transition-all shadow-sm ${
                  apt.status === 'In Chair'
                    ? 'border-2 border-emerald-600 ring-2 ring-emerald-500/10'
                    : apt.isNewBooking
                    ? 'border-2 border-primary ring-2 ring-primary/20'
                    : 'border-outline-variant/30'
                }`}
              >
                {/* Top Row: TIME & WHO & STATUS with HIGH-CONTRAST TIME SLOT */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
                  <div className="flex items-start gap-4">
                    {/* Ultra-Prominent Time Slot Pill */}
                    <div className="p-3 sm:p-3.5 rounded-2xl bg-primary/10 border-2 border-primary/30 text-center min-w-[95px] sm:min-w-[110px] shrink-0 shadow-xs">
                      <div className="flex items-center justify-center gap-1 text-primary text-[10px] font-bold uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        <span>Slot Time</span>
                      </div>
                      <span className="text-base sm:text-xl font-black text-primary block mt-0.5 leading-none">
                        {apt.timeSlot}
                      </span>
                      <span className="text-[11px] font-bold text-on-surface block mt-1">
                        {apt.date}
                      </span>
                    </div>

                    {/* WHO: Patient Name & Contact */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-xl font-extrabold text-on-surface">
                          {apt.patientName}
                        </h3>
                        {apt.patientAge && (
                          <span className="text-xs text-on-surface-variant font-medium">
                            ({apt.patientAge}y &middot; {apt.patientGender || 'Patient'})
                          </span>
                        )}
                        {apt.isNewBooking && (
                          <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider animate-pulse">
                            New Online Booking
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant mt-1">
                        <a
                          href={`tel:${apt.patientPhone}`}
                          className="min-h-[44px] flex items-center gap-1 font-semibold text-primary hover:underline"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{apt.patientPhone}</span>
                        </a>
                        <span>&middot;</span>
                        <span>{apt.insuranceCarrier || 'PPO In-Network'}</span>
                        <span>&middot;</span>
                        <span className="font-mono text-[11px] font-bold text-primary">{apt.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator & Quick Doctor Status Toggle */}
                  <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
                    <span
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        apt.status === 'In Chair'
                          ? 'bg-emerald-100 text-emerald-800'
                          : apt.status === 'Next Up'
                          ? 'bg-amber-100 text-amber-800'
                          : apt.status === 'Completed'
                          ? 'bg-surface-container-high text-on-surface-variant'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {apt.status}
                    </span>

                    {apt.status !== 'In Chair' && apt.status !== 'Completed' && (
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => updateAppointmentStatus(apt.id, 'In Chair')}
                        className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <UserCheck className="w-3.5 h-3.5 shrink-0" />
                        <span>{translations.seatInChairBtn}</span>
                      </motion.button>
                    )}

                    {apt.status === 'In Chair' && (
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                        className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-surface-container-high text-on-surface font-bold text-xs hover:bg-surface-container-highest transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{translations.markCompletedBtn}</span>
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Middle: WHAT IS THE PROBLEM / CLINICAL DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5">
                  {/* Left (8 cols): Chief Complaint & Symptoms */}
                  <div className="md:col-span-8 space-y-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                        {language === 'te' ? 'విధానం & ప్రధాన సమస్య' : 'Procedure & Chief Complaint'}
                      </span>
                      <p className="text-sm font-bold text-on-surface">{apt.treatmentName}</p>
                      <p className="text-xs text-on-surface mt-1 bg-surface-container-low p-3 rounded-2xl border border-outline-variant/20 leading-relaxed font-medium">
                        &ldquo;{apt.chiefComplaint}&rdquo;
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      {apt.toothNumbers && (
                        <div>
                          <span className="text-on-surface-variant font-medium">
                            {language === 'te' ? 'పన్ను: ' : 'Tooth: '}
                          </span>
                          <span className="font-bold text-on-surface">{apt.toothNumbers}</span>
                        </div>
                      )}

                      {apt.painScale !== undefined && apt.painScale > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="text-on-surface-variant font-medium">
                            {language === 'te' ? 'నొప్పి స్కోర్: ' : 'Pain Score: '}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              apt.painScale >= 7
                                ? 'bg-error/15 text-error font-extrabold'
                                : 'bg-surface-container-high text-on-surface'
                            }`}
                          >
                            {apt.painScale}/10
                          </span>
                        </div>
                      )}

                      {apt.medicalAlerts && apt.medicalAlerts.length > 0 && (
                        <div className="flex items-center gap-1 text-error font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{apt.medicalAlerts.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right (4 cols): Operatory & Clinical Charting Notes */}
                  <div className="md:col-span-4 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface">
                        {translations.clinicalNotesTitle}
                      </span>
                      {!isEditingNote ? (
                        <button
                          type="button"
                          onClick={() => handleStartEditNote(apt)}
                          className="min-h-[44px] text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <FileEdit className="w-3 h-3" />
                          <span>{apt.doctorNotes ? translations.editNoteBtn : translations.addNoteBtn}</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSaveNote(apt.id)}
                            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Save className="w-3 h-3" />
                            <span>{translations.saveNoteBtn}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingNoteId(null)}
                            className="text-xs text-on-surface-variant hover:underline cursor-pointer"
                          >
                            {translations.cancelBtn}
                          </button>
                        </div>
                      )}
                    </div>

                    {isEditingNote ? (
                      <textarea
                        rows={3}
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Add clinical observation, excavation findings, or post-op instructions..."
                        className="w-full p-2.5 rounded-xl border border-outline-variant/40 bg-surface text-on-surface text-xs focus:outline-none focus:border-primary"
                      />
                    ) : (
                      <p className="text-xs text-on-surface-variant italic leading-relaxed">
                        {apt.doctorNotes || 'No operative notes charted yet. Click Edit to add diagnosis.'}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DoctorClinicalDashboard;
