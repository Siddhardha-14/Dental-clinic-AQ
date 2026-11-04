import React, { useState } from 'react';
import { mockDoctorAppointments, DoctorAppointment } from '../data/mockDoctorData';
import { clinicians, Clinician } from '../data/mockData';
import { askGeminiAssistant } from '../services/geminiService';

export interface DoctorClinicalPortalViewProps {
  readonly onBackToReception?: () => void;
  readonly onBookNewAppointment?: () => void;
  readonly className?: string;
}

export const DoctorClinicalPortalView: React.FC<DoctorClinicalPortalViewProps> = ({
  onBackToReception,
  onBookNewAppointment,
  className = '',
}) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('dentist-jenkins');
  const [appointments, setAppointments] = useState<DoctorAppointment[]>(mockDoctorAppointments);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>('apt-101');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState<string | null>(null);
  const [activeDoctorNotes, setActiveDoctorNotes] = useState<string>('');
  const [notesSavedToast, setNotesSavedToast] = useState<boolean>(false);
  const [activeImagePreview, setActiveImagePreview] = useState<string | null>(null);

  // Filter appointments for the selected doctor
  const doctorAppointments = appointments.filter(
    (apt) => apt.doctorId === selectedDoctorId && (filterStatus === 'all' || apt.status === filterStatus)
  );

  // Current selected appointment
  const currentAppointment =
    appointments.find((apt) => apt.id === selectedAppointmentId) ||
    doctorAppointments[0] ||
    appointments[0];

  // Selected Doctor info
  const currentDoctor: Clinician =
    clinicians.find((c) => c.id === selectedDoctorId) || clinicians[0];

  // Update appointment status
  const handleUpdateStatus = (id: string, newStatus: DoctorAppointment['status']) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  // Save clinical notes
  const handleSaveNotes = () => {
    if (!currentAppointment) return;
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === currentAppointment.id
          ? { ...apt, doctorNotes: activeDoctorNotes || apt.doctorNotes }
          : apt
      )
    );
    setNotesSavedToast(true);
    setTimeout(() => setNotesSavedToast(false), 3000);
  };

  // Use Gemini AI to generate a clinical SOAP summary & triage assessment
  const handleGenerateAiSoapSummary = async () => {
    if (!currentAppointment) return;
    setIsAiGenerating(true);
    setAiGeneratedSummary(null);

    const prompt = `As an expert dental clinical advisor, generate a concise SOAP clinical note and pre-procedure checklist for Dr. ${currentDoctor.name}:
Patient: ${currentAppointment.patientName}, Age: ${currentAppointment.patientAge}, Gender: ${currentAppointment.patientGender}
Chief Complaint: ${currentAppointment.chiefComplaint}
Tooth Involved: ${currentAppointment.toothNumbers || 'Not specified'}
Reported Pain Scale: ${currentAppointment.painScale}/10
Reported Symptoms: ${currentAppointment.symptoms.join(', ')}
Medical Alerts & Allergies: ${currentAppointment.medicalAlerts.join(', ')}
Preferences: ${currentAppointment.patientPreferences.nitrousOxide ? 'Requested Nitrous Oxide' : 'Standard local anesthesia'}, ${currentAppointment.patientPreferences.quietOperatory ? 'Quiet suite' : 'Standard'}

Please format with:
1. S (Subjective): Key patient reported symptoms and chief complaint summary
2. O (Objective): Radiographic & clinical diagnostic focus areas
3. A (Assessment): Differential dental diagnoses
4. P (Plan & Precaution): Surgical/restorative plan and high-priority allergy/medical warnings.
Keep it concise, high-yield, and professional for a licensed dental surgeon.`;

    try {
      const response = await askGeminiAssistant(prompt);
      setAiGeneratedSummary(response.text);
    } catch {
      setAiGeneratedSummary(
        'Unable to reach AI Clinical Scribe at this moment. Proceed with standard diagnostic cold test and periapical radiograph review.'
      );
    } finally {
      setIsAiGenerating(false);
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 ${className}`}>
      {/* Toast Notification */}
      {notesSavedToast && (
        <div className="fixed top-24 right-8 z-50 p-4 rounded-2xl bg-secondary-fixed text-on-secondary-fixed-variant shadow-xl border border-secondary flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-xl">check_circle</span>
          <span className="text-xs sm:text-sm font-bold">
            Clinical chart notes saved to patient record #{currentAppointment?.id}
          </span>
        </div>
      )}

      {/* Header: Doctor Clinical Portal Title & Doctor Selector */}
      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-md">
              <img
                src={currentDoctor.photoUrl}
                alt={currentDoctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-surface-container-lowest flex items-center justify-center">
              <span className="material-symbols-outlined text-[10px] text-white">stethoscope</span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[11px] font-bold uppercase tracking-wider">
                Doctor&apos;s Clinical View
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold">
                {currentDoctor.operatory}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight mt-1">
              {currentDoctor.name}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              {currentDoctor.credentials} • Daily Operatory Schedule &amp; Patient Diagnostic Hub
            </p>
          </div>
        </div>

        {/* Doctor Switcher Pills */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="p-1 rounded-2xl bg-surface-container flex items-center gap-1 border border-surface-container">
            {clinicians.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => {
                  setSelectedDoctorId(doc.id);
                  const firstApt = appointments.find((a) => a.doctorId === doc.id);
                  if (firstApt) setSelectedAppointmentId(firstApt.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedDoctorId === doc.id
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>{doc.name.split(',')[0]}</span>
              </button>
            ))}
          </div>

          {onBackToReception && (
            <button
              type="button"
              onClick={onBackToReception}
              className="px-4 py-2 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">dashboard</span>
              <span>Reception Matrix</span>
            </button>
          )}

          {onBookNewAppointment && (
            <button
              type="button"
              onClick={onBookNewAppointment}
              className="px-4 py-2 rounded-2xl bg-primary text-on-primary hover:bg-primary-container text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>Add Patient</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Clinical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================== */}
        {/* LEFT COLUMN: TODAY'S PATIENT TIMELINE & QUEUE (4 Cols) */}
        {/* ============================================================== */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  calendar_clock
                </span>
                <h3 className="font-bold text-sm text-on-surface">
                  Today&apos;s Schedule ({doctorAppointments.length})
                </h3>
              </div>

              {/* Status filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-xs bg-surface-container px-2 py-1 rounded-lg text-on-surface border border-surface-container focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="In Chair">In Chair</option>
                <option value="Arrived / Checked In">Arrived</option>
                <option value="Next Up">Next Up</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Patient Cards List */}
            <div className="space-y-3">
              {doctorAppointments.length === 0 ? (
                <div className="p-6 text-center text-on-surface-variant text-xs">
                  No appointments match the selected filter.
                </div>
              ) : (
                doctorAppointments.map((apt) => {
                  const isSelected = apt.id === currentAppointment?.id;

                  const statusColors = {
                    'In Chair': 'bg-amber-100 text-amber-800 border-amber-300',
                    'Arrived / Checked In': 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    'Next Up': 'bg-blue-100 text-blue-800 border-blue-300',
                    'Completed': 'bg-slate-100 text-slate-700 border-slate-300',
                  }[apt.status];

                  return (
                    <button
                      key={apt.id}
                      type="button"
                      onClick={() => {
                        setSelectedAppointmentId(apt.id);
                        setActiveDoctorNotes(apt.doctorNotes);
                        setAiGeneratedSummary(null);
                      }}
                      className={`w-full p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-secondary-fixed/30 border-primary shadow-sm scale-[1.01]'
                          : 'bg-surface-container-low hover:bg-surface-container border-surface-container'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-bold text-sm text-primary flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">schedule</span>
                          <span>{apt.timeSlot}</span>
                        </span>

                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors}`}
                        >
                          {apt.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-on-surface">{apt.patientName}</h4>
                        <span className="text-xs text-on-surface-variant">
                          {apt.patientAge}y • {apt.patientType === 'New Patient' ? '⭐ New' : 'Returning'}
                        </span>
                      </div>

                      {/* Chief complaint snippet */}
                      <p className="text-xs text-on-surface-variant line-clamp-2 mt-1.5 leading-relaxed">
                        {apt.chiefComplaint}
                      </p>

                      {/* Tooth tag & pain scale */}
                      <div className="mt-2.5 pt-2 border-t border-surface-container/60 flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-primary">
                          {apt.toothNumbers || 'General Consultation'}
                        </span>

                        {apt.painScale > 0 && (
                          <span
                            className={`px-1.5 py-0.5 rounded font-bold ${
                              apt.painScale >= 7
                                ? 'bg-error-container text-error'
                                : 'bg-surface-container text-on-surface-variant'
                            }`}
                          >
                            Pain: {apt.painScale}/10
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Doctor Daily Stats */}
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container shadow-xs space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-on-surface-variant">
              Operatory 1 Sensor Telemetry
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                <span className="text-[11px] text-on-surface-variant">HEPA-14 Air Quality</span>
                <p className="font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>99.99% Sterile</span>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                <span className="text-[11px] text-on-surface-variant">Autoclave Cycle</span>
                <p className="font-bold text-on-surface flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-sm text-secondary">
                    verified
                  </span>
                  <span>Validated 07:45</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: CLINICAL PATIENT CHART ("Who, When, What's Problem") */}
        {/* ============================================================== */}
        <div className="lg:col-span-8 space-y-6">
          {currentAppointment ? (
            <div className="bg-surface-container-lowest rounded-3xl border border-surface-container shadow-sm overflow-hidden">
              {/* Patient Banner & Status Controls */}
              <div className="p-6 border-b border-surface-container bg-surface-container-low/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-xs font-bold">
                        {currentAppointment.patientType}
                      </span>
                      <span className="text-xs font-semibold text-on-surface-variant">
                        Patient ID #{currentAppointment.id}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                      {currentAppointment.patientName}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant mt-1.5">
                      <span>Age: <strong>{currentAppointment.patientAge}</strong></span>
                      <span>•</span>
                      <span>Gender: <strong>{currentAppointment.patientGender}</strong></span>
                      <span>•</span>
                      <a href={`tel:${currentAppointment.patientPhone}`} className="text-primary font-semibold hover:underline">
                        {currentAppointment.patientPhone}
                      </a>
                      <span>•</span>
                      <span>{currentAppointment.patientEmail}</span>
                    </div>
                  </div>

                  {/* Operatory & Status Action Changer */}
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <div className="text-xs font-semibold text-right">
                      <span className="text-on-surface-variant">Time Slot:</span>{' '}
                      <strong className="text-primary text-sm">{currentAppointment.timeSlot}</strong>
                      <p className="text-[11px] text-on-surface-variant">{currentAppointment.operatory}</p>
                    </div>

                    {/* Status Changer Buttons */}
                    <div className="flex items-center gap-1.5 bg-surface-container p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(currentAppointment.id, 'Arrived / Checked In')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                          currentAppointment.status === 'Arrived / Checked In'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        Arrived
                      </button>

                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(currentAppointment.id, 'In Chair')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                          currentAppointment.status === 'In Chair'
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        In Chair
                      </button>

                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(currentAppointment.id, 'Completed')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                          currentAppointment.status === 'Completed'
                            ? 'bg-slate-700 text-white shadow-xs'
                            : 'text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Chart Details */}
              <div className="p-6 space-y-6">
                {/* ========================================================== */}
                {/* 1. "WHAT'S THE PROBLEM" - CHIEF COMPLAINT & SYMPTOMS */}
                {/* ========================================================== */}
                <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-error-container text-error flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-lg">problem</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-on-surface">
                          What is the Problem? (Chief Complaint)
                        </h3>
                        <p className="text-[11px] text-on-surface-variant">
                          Patient reported primary symptoms &amp; clinical reason for visit
                        </p>
                      </div>
                    </div>

                    {currentAppointment.toothNumbers && (
                      <span className="px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold">
                        Target: {currentAppointment.toothNumbers}
                      </span>
                    )}
                  </div>

                  {/* Primary Narrative */}
                  <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container">
                    <p className="text-sm font-semibold text-on-surface leading-relaxed">
                      &quot;{currentAppointment.chiefComplaint}&quot;
                    </p>
                  </div>

                  {/* Symptoms & Pain Intensity */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Pain Scale Bar (4 cols) */}
                    <div className="md:col-span-4 p-3.5 rounded-xl bg-surface-container-lowest border border-surface-container">
                      <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                        <span>Pain Intensity</span>
                        <span className={currentAppointment.painScale >= 6 ? 'text-error' : 'text-primary'}>
                          {currentAppointment.painScale} / 10
                        </span>
                      </div>

                      <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            currentAppointment.painScale >= 7
                              ? 'bg-error'
                              : currentAppointment.painScale >= 4
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.max(currentAppointment.painScale * 10, 5)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-on-surface-variant mt-1 block">
                        {currentAppointment.painScale >= 7 ? 'Acute throbbing pain' : 'Mild to moderate discomfort'}
                      </span>
                    </div>

                    {/* Reported Symptoms Tags (8 cols) */}
                    <div className="md:col-span-8 flex flex-wrap gap-2">
                      {currentAppointment.symptoms.map((sym, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-surface-container text-xs font-medium text-on-surface flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                          <span>{sym}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ========================================================== */}
                {/* 2. MEDICAL ALERTS & ALLERGIES (CRITICAL SAFETY BANNER) */}
                {/* ========================================================== */}
                <div className="p-4 rounded-2xl bg-error-container/40 border border-error/30 space-y-2">
                  <div className="flex items-center gap-2 text-error font-bold text-xs uppercase tracking-wider">
                    <span className="material-symbols-outlined text-lg">warning</span>
                    <span>Medical Alerts, Allergies &amp; Precautions</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {currentAppointment.medicalAlerts.map((alert, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-error text-on-error text-xs font-bold shadow-xs"
                      >
                        ⚠️ {alert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ========================================================== */}
                {/* 3. "WHO IS COMING" - INSURANCE, COMFORT & AMENITIES */}
                {/* ========================================================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Insurance Card Info */}
                  <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                      <span className="material-symbols-outlined text-primary text-base">payments</span>
                      <span>Dental Insurance Verification</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container text-xs space-y-1">
                      <p className="font-bold text-on-surface">{currentAppointment.insuranceCarrier}</p>
                      <p className="text-on-surface-variant">Member ID: <strong>{currentAppointment.memberId}</strong></p>
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        <span>Eligibility Verified • Pre-Auth Active</span>
                      </span>
                    </div>
                  </div>

                  {/* Patient Sanctuary Comfort Requests */}
                  <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                      <span className="material-symbols-outlined text-secondary text-base">spa</span>
                      <span>Requested Patient Amenities</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                        currentAppointment.patientPreferences.nitrousOxide
                          ? 'bg-secondary-fixed text-on-secondary-fixed-variant border-secondary'
                          : 'bg-surface-container-lowest text-on-surface-variant border-surface-container opacity-60'
                      }`}>
                        <span className="material-symbols-outlined text-sm">air</span>
                        <span className="font-bold">Nitrous Oxide</span>
                      </div>

                      <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                        currentAppointment.patientPreferences.boseHeadphones
                          ? 'bg-secondary-fixed text-on-secondary-fixed-variant border-secondary'
                          : 'bg-surface-container-lowest text-on-surface-variant border-surface-container opacity-60'
                      }`}>
                        <span className="material-symbols-outlined text-sm">headphones</span>
                        <span className="font-bold">Bose Headset</span>
                      </div>

                      <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                        currentAppointment.patientPreferences.quietOperatory
                          ? 'bg-secondary-fixed text-on-secondary-fixed-variant border-secondary'
                          : 'bg-surface-container-lowest text-on-surface-variant border-surface-container opacity-60'
                      }`}>
                        <span className="material-symbols-outlined text-sm">volume_off</span>
                        <span className="font-bold">Quiet Suite</span>
                      </div>

                      <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                        currentAppointment.patientPreferences.wheelchair
                          ? 'bg-secondary-fixed text-on-secondary-fixed-variant border-secondary'
                          : 'bg-surface-container-lowest text-on-surface-variant border-surface-container opacity-60'
                      }`}>
                        <span className="material-symbols-outlined text-sm">accessible</span>
                        <span className="font-bold">Wheelchair</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================== */}
                {/* 4. DIAGNOSTIC IMAGING & RADIOGRAPHS */}
                {/* ========================================================== */}
                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                      <span className="material-symbols-outlined text-primary text-base">radiology</span>
                      <span>Diagnostic Imaging Ready for Review</span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant">Low-dose digital sensor format</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {/* Bitewing Radiographs */}
                    <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-on-surface">Bitewing HD X-Rays</span>
                          <span className="material-symbols-outlined text-primary text-base">image</span>
                        </div>
                        <p className="text-[11px] text-on-surface-variant">4-view interproximal bitewings captured today</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveImagePreview('Bitewing Radiographs: Clear distal-occlusal radiolucency approaching pulpal chamber on #19.')}
                        className="mt-3 py-1.5 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-bold text-center cursor-pointer"
                      >
                        Inspect X-Ray
                      </button>
                    </div>

                    {/* iTero 3D Scan */}
                    <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-on-surface">iTero® 3D Scan</span>
                          <span className="material-symbols-outlined text-secondary text-base">view_in_ar</span>
                        </div>
                        <p className="text-[11px] text-on-surface-variant">Full-arch optical mesh &amp; contact points</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveImagePreview('iTero 3D Optical Scan: 3D model loaded with 4.5mm overbite and interocclusal contact clearance.')}
                        className="mt-3 py-1.5 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-bold text-center cursor-pointer"
                      >
                        Open 3D Model
                      </button>
                    </div>

                    {/* Intraoral Camera */}
                    <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-on-surface">Intraoral Photos</span>
                          <span className="material-symbols-outlined text-tertiary text-base">photo_camera</span>
                        </div>
                        <p className="text-[11px] text-on-surface-variant">Direct macro photography of margins</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveImagePreview('Intraoral Macro Photo: Microcrack propagation visible on lingual cusp of #19.')}
                        className="mt-3 py-1.5 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-bold text-center cursor-pointer"
                      >
                        View Photos
                      </button>
                    </div>
                  </div>
                </div>

                {/* Diagnostic preview modal/banner */}
                {activeImagePreview && (
                  <div className="p-4 rounded-xl bg-inverse-surface text-inverse-on-surface text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-primary-fixed">visibility</span>
                      <span>{activeImagePreview}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveImagePreview(null)}
                      className="px-2 py-1 bg-surface-container-highest/20 rounded hover:bg-surface-container-highest/40 text-[11px] font-bold"
                    >
                      Close
                    </button>
                  </div>
                )}

                {/* ========================================================== */}
                {/* 5. AI CLINICAL SCRIBE */}
                {/* ========================================================== */}
                <div className="p-5 rounded-2xl bg-secondary-fixed/20 border border-secondary/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-lg">neurology</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-on-surface">
                          Clinical AI Assistant &amp; Scribe
                        </h4>
                        <p className="text-[11px] text-on-surface-variant">
                          Generate pre-op SOAP assessment notes and high-risk allergy checks
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGenerateAiSoapSummary}
                      disabled={isAiGenerating}
                      className="px-4 py-3 min-h-[44px] rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-base">
                        {isAiGenerating ? 'hourglass_top' : 'auto_awesome'}
                      </span>
                      <span>{isAiGenerating ? 'Consulting Gemini...' : 'Generate AI SOAP Summary'}</span>
                    </button>
                  </div>

                  {aiGeneratedSummary && (
                    <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container text-xs space-y-2 text-on-surface animate-in fade-in">
                      <div className="flex items-center justify-between pb-2 border-b border-surface-container font-bold text-primary">
                        <span>Gemini Clinical Pre-Op Briefing</span>
                        <span className="text-[10px] text-on-surface-variant">Model: gemini-3.5-flash-lite</span>
                      </div>
                      <div className="whitespace-pre-line leading-relaxed text-on-surface">
                        {aiGeneratedSummary}
                      </div>
                    </div>
                  )}
                </div>

                {/* ========================================================== */}
                {/* 6. DOCTOR'S CLINICAL TREATMENT NOTES & ACTION DOCK */}
                {/* ========================================================== */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="doctor-notes-input" className="font-bold text-sm text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-base">edit_note</span>
                      <span>Doctor&apos;s Clinical Treatment &amp; Chart Notes</span>
                    </label>
                    <span className="text-[11px] text-on-surface-variant">Stored directly into patient EHR</span>
                  </div>

                  <textarea
                    id="doctor-notes-input"
                    rows={4}
                    value={activeDoctorNotes || currentAppointment.doctorNotes}
                    onChange={(e) => setActiveDoctorNotes(e.target.value)}
                    placeholder="Enter surgical findings, local anesthetic carpules, restorative material, occlusion check, and patient tolerance..."
                    className="w-full p-4 rounded-2xl border border-surface-container bg-surface text-on-surface text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-sans"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm text-secondary">lock</span>
                      <span>Encrypted HIPAA Clinical Record</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSaveNotes}
                        className="px-6 py-3 min-h-[44px] rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">save</span>
                        <span>Save Clinical Chart</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(currentAppointment.id, 'Completed')}
                        className="px-5 py-3 min-h-[44px] rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-bold text-xs hover:bg-secondary-fixed-dim transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">check</span>
                        <span>Complete Procedure</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest p-12 rounded-3xl text-center text-on-surface-variant">
              Select a patient from the schedule to inspect clinical details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorClinicalPortalView;

