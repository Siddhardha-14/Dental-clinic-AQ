import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import {
  User,
  Stethoscope,
  Lock,
  Mail,
  KeyRound,
  ShieldCheck,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  LogOut,
  UserCheck,
  Sparkles,
  Phone,
  FileText,
} from 'lucide-react';

export interface UserProfileViewProps {
  readonly onGoToDoctorSchedule?: () => void;
  readonly onGoToBooking?: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  onGoToDoctorSchedule,
  onGoToBooking,
}) => {
  const {
    doctorSession,
    doctorLogin,
    doctorLogout,
    appointments,
    setActiveTab,
  } = useClinic();

  const [email, setEmail] = useState<string>('doctor@lumina.com');
  const [password, setPassword] = useState<string>('smile123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [loginSuccessMsg, setLoginSuccessMsg] = useState<string>('');

  // Find any new online bookings from the patient
  const recentPatientBookings = appointments.filter((a) => a.isNewBooking);

  const handleDoctorLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = doctorLogin(email, password);
    if (success) {
      setLoginSuccessMsg('Successfully signed in as Dr. Sarah Jenkins.');
      if (onGoToDoctorSchedule) {
        onGoToDoctorSchedule();
      } else {
        setActiveTab('doctor');
      }
    } else {
      setLoginError('Invalid doctor credentials.');
    }
  };

  const handleOneTapDoctorLogin = () => {
    doctorLogin('doctor@lumina.com', 'smile123');
    setLoginSuccessMsg('Successfully signed in as Dr. Sarah Jenkins.');
    if (onGoToDoctorSchedule) {
      onGoToDoctorSchedule();
    } else {
      setActiveTab('doctor');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* 1. Profile Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-surface-container-lowest rounded-3xl p-5 sm:p-8 border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center border border-outline-variant/30 shadow-sm shrink-0">
            {doctorSession.isAuthenticated ? (
              <Stethoscope className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            ) : (
              <User className="w-7 h-7 sm:w-8 sm:h-8 text-on-surface-variant" />
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {doctorSession.isAuthenticated ? 'Clinician Account' : 'Patient & Member Portal'}
              </span>
              {doctorSession.isAuthenticated && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Online &middot; Operatory 1</span>
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-on-surface tracking-tight mt-1">
              {doctorSession.isAuthenticated ? doctorSession.doctorName : 'Lumina Account & Profile'}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              {doctorSession.isAuthenticated
                ? 'Lead Clinician &middot; Operatory 1 (Panoramic Suite)'
                : 'Manage your visits, dental passes, and doctor clinical sign-in.'}
            </p>
          </div>
        </div>

        {doctorSession.isAuthenticated && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={doctorLogout}
            className="min-h-[44px] px-4 py-2.5 rounded-xl border border-error/30 text-error hover:bg-error/10 font-semibold text-xs transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Doctor</span>
          </motion.button>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: DOCTOR CLINICAL LOGIN SECTION */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="bg-surface-container-lowest rounded-3xl p-5 sm:p-8 border-2 border-primary/20 shadow-md space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-sm">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-on-surface">
                    Doctor Clinical Login
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Exclusive staff access for Dr. Sarah Jenkins
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-primary px-3 py-1 rounded-full bg-primary/10">
                1-Login Only
              </span>
            </div>

            {doctorSession.isAuthenticated ? (
              /* ALREADY LOGGED IN AS DOCTOR VIEW */
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <UserCheck className="w-4 h-4 text-emerald-700" />
                    <span>Active Doctor Session Verified</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    You are signed in as <strong>{doctorSession.doctorName}</strong>. You have full clinical authorization to inspect arriving patients, adjust treatment statuses, and chart clinical notes.
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-xs text-emerald-900 font-semibold">
                    <span>Scheduled Today: {appointments.length} Patients</span>
                    <span>&middot;</span>
                    <span>Operatory: Suite 1</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (onGoToDoctorSchedule) {
                        onGoToDoctorSchedule();
                      } else {
                        setActiveTab('doctor');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="w-full min-h-[50px] rounded-2xl bg-primary text-on-primary font-bold text-sm shadow hover:bg-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Stethoscope className="w-5 h-5" />
                    <span>Open Doctor Schedule &amp; Treatment Board</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <p className="text-center text-xs text-on-surface-variant">
                    View who is coming for treatment and when they are scheduled.
                  </p>
                </div>
              </div>
            ) : (
              /* DOCTOR LOGIN FORM */
              <div className="space-y-5">
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  To view today&apos;s arriving patients, time slots, and medical concerns, sign in to the clinic doctor portal below.
                </p>

                {/* 1-Tap Quick Doctor Login */}
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <UserCheck className="w-4 h-4" />
                    <span>Single Doctor Login (Fast Access)</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleOneTapDoctorLogin}
                    className="w-full min-h-[48px] rounded-xl bg-primary text-on-primary font-bold text-sm shadow hover:bg-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>⚡ One-Tap Sign In as Dr. Sarah Jenkins</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <p className="text-[11px] text-center text-on-surface-variant">
                    Pre-authorized for Dr. Sarah Jenkins &middot; Operatory 1
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-outline-variant/30" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                    Or Enter Credentials
                  </span>
                  <div className="flex-1 h-px bg-outline-variant/30" />
                </div>

                <form onSubmit={handleDoctorLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-2">
                      Clinician Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-on-surface text-base sm:text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-2">
                      Doctor Passcode
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-on-surface text-base sm:text-xs focus:outline-none focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="min-h-[44px] px-2 text-[11px] text-on-surface-variant absolute right-1.5 top-1/2 -translate-y-1/2 hover:text-on-surface font-medium flex items-center"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <p className="text-xs text-error font-semibold">{loginError}</p>
                  )}
                  {loginSuccessMsg && (
                    <p className="text-xs text-emerald-700 font-semibold">{loginSuccessMsg}</p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full min-h-[46px] rounded-xl bg-surface-container-high text-on-surface font-bold text-xs hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-primary" />
                    <span>Sign In to Doctor Schedule</span>
                  </motion.button>
                </form>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-on-surface-variant pt-2 border-t border-outline-variant/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                  <span>Encrypted HIPAA Station &middot; Lumina Dental SF</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* RIGHT COLUMN: PATIENT VISIT HISTORY & PASSES */}
        <div className="lg:col-span-5 space-y-6">
          {/* Patient Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h3 className="text-base font-bold text-on-surface">Patient Details &amp; Insurance</h3>
              <span className="text-xs text-primary font-semibold">Active Member</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Default Clinic</span>
                <span className="font-bold text-on-surface">450 Sutter St, SF</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Insurance Carrier</span>
                <span className="font-bold text-on-surface">Delta Dental PPO / Self-Pay</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Assigned Clinician</span>
                <span className="font-bold text-primary">Dr. Sarah Jenkins, DDS</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (onGoToBooking) {
                  onGoToBooking();
                } else {
                  setActiveTab('booking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="w-full min-h-[44px] py-2.5 rounded-xl bg-surface-container-high text-on-surface font-semibold text-xs hover:bg-surface-container-highest transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-primary" />
              <span>Book New Dental Visit</span>
            </motion.button>
          </motion.div>

          {/* Recent Reservations */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-sm space-y-4"
          >
            <h3 className="text-base font-bold text-on-surface">Your Recent Reservations</h3>

            {recentPatientBookings.length > 0 ? (
              <div className="space-y-3">
                {recentPatientBookings.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface">{apt.treatmentName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {apt.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{apt.date} @ {apt.timeSlot}</span>
                    </div>
                    <p className="text-[11px] font-mono text-primary">Pass ID: {apt.id}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-surface-container-low text-center text-xs text-on-surface-variant space-y-1">
                <p className="font-medium text-on-surface">No reservations booked yet</p>
                <p>Reserve an appointment to get your instant digital pass.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;

