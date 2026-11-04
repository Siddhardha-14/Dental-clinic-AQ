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
    translations,
    language,
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
    <div className="w-full max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Profile Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6"
      >
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center border border-outline-variant/30 shadow-sm shrink-0">
            {doctorSession.isAuthenticated ? (
              <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            ) : (
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-on-surface-variant" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
              <span className="text-[10px] sm:text-xs uppercase tracking-normal sm:tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary whitespace-nowrap">
                {doctorSession.isAuthenticated
                  ? (language === 'te' ? 'వైద్యుల ఖాతా' : 'Clinician Account')
                  : (language === 'te' ? 'రోగి & సభ్యుల పోర్టల్' : 'Patient & Member Portal')}
              </span>
              {doctorSession.isAuthenticated && (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>{language === 'te' ? 'ఆన్‌లైన్ · ఆపరేటరీ 1' : 'Online · Operatory 1'}</span>
                </span>
              )}
            </div>
            <h1 className="text-lg sm:text-3xl font-extrabold text-on-surface tracking-tight mt-0.5 leading-tight">
              {doctorSession.isAuthenticated ? doctorSession.doctorName : translations.profileTitle}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
              {doctorSession.isAuthenticated
                ? (language === 'te' ? 'ప్రధాన వైద్యులు · ఆపరేటరీ 1 (పనోరమిక్ సూట్)' : 'Lead Clinician · Operatory 1 (Panoramic Suite)')
                : translations.profileSubtitle}
            </p>
          </div>
        </div>

        {doctorSession.isAuthenticated && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={doctorLogout}
            className="min-h-[44px] px-4 py-2.5 rounded-xl border border-error/30 text-error hover:bg-error/10 font-semibold text-xs transition-all flex items-center justify-center gap-2 self-stretch sm:self-auto cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{translations.signOutBtn}</span>
          </motion.button>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* LEFT COLUMN: DOCTOR CLINICAL LOGIN SECTION */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-outline-variant/40 shadow-sm space-y-5 sm:space-y-6"
          >
            <div className="flex items-center justify-between gap-2.5 pb-3 sm:pb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-sm shrink-0">
                  <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-xl font-extrabold text-on-surface leading-tight">
                    {translations.doctorLoginTitle}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant truncate">
                    {translations.doctorLoginSubtitle}
                  </p>
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10 whitespace-nowrap shrink-0">
                {language === 'te' ? '1-లాగిన్' : '1-Login Only'}
              </span>
            </div>

            {doctorSession.isAuthenticated ? (
              /* ALREADY LOGGED IN AS DOCTOR VIEW */
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <UserCheck className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'te' ? 'యాక్టివ్ డాక్టర్ సెషన్ ధృవీకరించబడింది' : 'Active Doctor Session Verified'}</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    {language === 'te'
                      ? `మీరు ${doctorSession.doctorName} గా లాగిన్ అయ్యారు. మీకు వచ్చే రోగులను పరిశీలించడానికి, చికిత్స స్థితిని నవీకరించడానికి మరియు క్లినికల్ నోట్స్ రికార్డ్ చేయడానికి పూర్తి అనుమతి ఉంది.`
                      : `You are signed in as ${doctorSession.doctorName}. You have full clinical authorization to inspect arriving patients, adjust treatment statuses, and chart clinical notes.`}
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-xs text-emerald-900 font-semibold">
                    <span>{language === 'te' ? `ఈ రోజు షెడ్యూల్: ${appointments.length} రోగులు` : `Scheduled Today: ${appointments.length} Patients`}</span>
                    <span>&middot;</span>
                    <span>{language === 'te' ? 'ఆపరేటరీ: సూట్ 1' : 'Operatory: Suite 1'}</span>
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
                    <span>{translations.openScheduleBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <p className="text-center text-xs text-on-surface-variant">
                    {language === 'te' ? 'ఎవరు చికిత్స కోసం వస్తున్నారో మరియు ఎప్పుడు షెడ్యూల్ చేయబడ్డారో చూడండి.' : 'View who is coming for treatment and when they are scheduled.'}
                  </p>
                </div>
              </div>
            ) : (
              /* DOCTOR LOGIN FORM */
              <div className="space-y-5">
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {language === 'te'
                    ? 'ఈ రోజు వచ్చే రోగులు, సమయ స్లాట్లు మరియు సమస్యలను వీక్షించడానికి, క్రింద ఉన్న క్లినిక్ డాక్టర్ పోర్టల్‌కు సైన్ ఇన్ చేయండి.'
                    : 'To view today\'s arriving patients, time slots, and medical concerns, sign in to the clinic doctor portal below.'}
                </p>

                {/* 1-Tap Quick Doctor Login */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-primary/5 border border-primary/20 space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <UserCheck className="w-4 h-4 shrink-0" />
                    <span>{translations.oneTapDoctorBtn}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleOneTapDoctorLogin}
                    className="w-full min-h-[48px] px-3 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs sm:text-sm shadow hover:bg-primary-container transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
                  >
                    <span className="truncate">⚡ {translations.oneTapDoctorBtn}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </motion.button>

                  <p className="text-[11px] text-center text-on-surface-variant">
                    {translations.oneTapDoctorSub}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-outline-variant/30" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                    {translations.orEnterCreds}
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
                        {showPassword ? (language === 'te' ? 'దాచు' : 'Hide') : (language === 'te' ? 'చూపించు' : 'Show')}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <p className="text-xs text-error font-semibold">
                      {language === 'te' ? 'చెల్లని డాక్టర్ ఆధారాలు.' : loginError}
                    </p>
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
                    <span>{translations.signInBtn}</span>
                  </motion.button>
                </form>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-on-surface-variant pt-2 border-t border-outline-variant/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                  <span>{language === 'te' ? 'ఎన్‌క్రిప్ట్ చేయబడిన HIPAA స్టేషన్ · లుమినా డెంటల్' : 'Encrypted HIPAA Station · Lumina Dental SF'}</span>
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
            className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-outline-variant/30 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h3 className="text-base font-bold text-on-surface">
                {language === 'te' ? 'రోగి వివరాలు & బీమా' : 'Patient Details & Insurance'}
              </h3>
              <span className="text-xs text-primary font-semibold">
                {language === 'te' ? 'క్రియాశీల సభ్యుడు' : 'Active Member'}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">
                  {language === 'te' ? 'డిఫాల్ట్ క్లినిక్' : 'Default Clinic'}
                </span>
                <span className="font-bold text-on-surface">450 Sutter St, SF</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">
                  {language === 'te' ? 'బీమా ప్రొవైడర్' : 'Insurance Carrier'}
                </span>
                <span className="font-bold text-on-surface">Delta Dental PPO / Self-Pay</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">
                  {language === 'te' ? 'కేటాయించిన వైద్యులు' : 'Assigned Clinician'}
                </span>
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
              <span>{translations.bookVisit}</span>
            </motion.button>
          </motion.div>

          {/* Recent Reservations */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-outline-variant/30 shadow-sm space-y-4"
          >
            <h3 className="text-base font-bold text-on-surface">
              {language === 'te' ? 'మీ ఇటీవలి రిజర్వేషన్లు' : 'Your Recent Reservations'}
            </h3>

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
                <p className="font-medium text-on-surface">
                  {language === 'te' ? 'ఇంకా రిజర్వేషన్లు బుక్ చేయబడలేదు' : 'No reservations booked yet'}
                </p>
                <p>
                  {language === 'te'
                    ? 'మీ తక్షణ డిజిటల్ పాస్ పొందడానికి అపాయింట్‌మెంట్‌ను రిజర్వ్ చేసుకోండి.'
                    : 'Reserve an appointment to get your instant digital pass.'}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;

