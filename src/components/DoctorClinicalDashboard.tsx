import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { ClinicAppointment } from '../types/clinic';
import {
  Stethoscope,
  Clock,
  User,
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
    setActiveTab,
    translations,
    language,
  } = useClinic();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>('');

  // Filtered appointments
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* 1. Doctor Header & Session Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-surface-container-lowest rounded-3xl p-5 sm:p-8 border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
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

      {/* 3. Search and Status Filter Bar */}
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

      {/* 4. Patient Treatment Queue Cards (WHO, WHEN, WHAT IS THE PROBLEM) */}
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
                className={`bg-surface-container-lowest rounded-3xl p-5 sm:p-7 border transition-all shadow-sm ${
                  apt.status === 'In Chair'
                    ? 'border-2 border-emerald-600 ring-2 ring-emerald-500/10'
                    : apt.isNewBooking
                    ? 'border-2 border-primary ring-2 ring-primary/20'
                    : 'border-outline-variant/30'
                }`}
              >
                {/* Top Row: TIME & WHO & STATUS */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
                  <div className="flex items-start gap-4">
                    {/* Time Slot Pill */}
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-center min-w-[85px] sm:min-w-[90px] shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
                        Time Slot
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-primary block mt-0.5">
                        {apt.timeSlot}
                      </span>
                      <span className="text-[10px] font-medium text-on-surface-variant block">
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
                        <span className="font-mono text-[11px]">{apt.id}</span>
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
                        className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-all flex items-center gap-1 cursor-pointer"
                      >
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
                            className={`font-bold px-2 py-0.5 rounded-full text-xs ${
                              apt.painScale >= 6
                                ? 'bg-error/10 text-error'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {apt.painScale} / 10
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Medical Alerts & Comfort Notes */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {apt.medicalAlerts &&
                        apt.medicalAlerts.map((alert, idxAlert) => (
                          <span
                            key={idxAlert}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error/10 text-error text-[11px] font-bold"
                          >
                            <AlertTriangle className="w-3 h-3" />
                            <span>{alert}</span>
                          </span>
                        ))}

                      {apt.preferences?.boseHeadphones && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface text-[11px] font-medium">
                          <Headphones className="w-3 h-3 text-secondary" />
                          <span>{translations.prefHeadphones}</span>
                        </span>
                      )}

                      {apt.preferences?.nitrousOxide && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface text-[11px] font-medium">
                          <Sparkles className="w-3 h-3 text-primary" />
                          <span>{translations.prefNitrous}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right (4 cols): Doctor's Clinical Note Pad */}
                  <div className="md:col-span-4 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                          {translations.clinicalNotesTitle}
                        </span>
                        {!isEditingNote && (
                          <button
                            onClick={() => handleStartEditNote(apt)}
                            className="min-h-[44px] text-primary hover:underline text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <FileEdit className="w-3 h-3" />
                            <span>{apt.doctorNotes ? (language === 'te' ? 'సవరించు' : 'Edit') : translations.addNoteBtn}</span>
                          </button>
                        )}
                      </div>

                      {isEditingNote ? (
                        <div className="space-y-2">
                          <textarea
                            rows={3}
                            value={noteDraft}
                            onChange={(e) => setNoteDraft(e.target.value)}
                            placeholder={language === 'te' ? 'క్లినికల్ రోగ నిర్ధారణ, అనస్థీషియా మోతాదును టైప్ చేయండి...' : 'Type clinical diagnosis, anesthetic dosage, or restorative plan...'}
                            className="w-full p-2 text-base sm:text-xs rounded-xl border border-primary bg-surface text-on-surface focus:outline-none"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingNoteId(null)}
                              className="min-h-[44px] px-3 py-1 rounded-lg text-xs font-medium text-on-surface-variant hover:bg-surface-container"
                            >
                              {language === 'te' ? 'రద్దు' : 'Cancel'}
                            </button>
                            <button
                              onClick={() => handleSaveNote(apt.id)}
                              className="min-h-[44px] px-3.5 py-1 rounded-lg bg-primary text-on-primary text-xs font-bold flex items-center gap-1"
                            >
                              <Save className="w-3 h-3" />
                              <span>{language === 'te' ? 'భద్రపరచు' : 'Save'}</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-on-surface leading-relaxed italic">
                          {apt.doctorNotes || (language === 'te' ? 'ఇంకా క్లినికల్ నోట్ జోడించబడలేదు. నమోదు చేయడానికి "నోట్ జోడించండి" క్లిక్ చేయండి.' : 'No clinician note added yet. Click "Add Note" to chart.')}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-on-surface-variant">
                      <span>Operatory: Suite 1</span>
                      <span className="font-semibold text-primary">Dr. Sarah Jenkins</span>
                    </div>
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

