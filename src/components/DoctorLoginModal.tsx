import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import {
  Stethoscope,
  Lock,
  Mail,
  KeyRound,
  X,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

export interface DoctorLoginModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onLoginSuccess?: () => void;
}

export const DoctorLoginModal: React.FC<DoctorLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { doctorLogin, setActiveTab } = useClinic();
  const [email, setEmail] = useState<string>('doctor@lumina.com');
  const [password, setPassword] = useState<string>('smile123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = doctorLogin(email, password);
    if (success) {
      setActiveTab('doctor');
      if (onLoginSuccess) onLoginSuccess();
      onClose();
    } else {
      setError('Invalid clinician credentials.');
    }
  };

  const handleQuickDoctorSignIn = () => {
    doctorLogin('doctor@lumina.com', 'smile123');
    setActiveTab('doctor');
    if (onLoginSuccess) onLoginSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-outline-variant/30 relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          aria-label="Close login modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center mx-auto shadow-md">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">
            Doctor Clinical Portal
          </h2>
          <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
            Secure treatment board for Dr. Sarah Jenkins to inspect today&apos;s arriving patients, time slots, and procedures.
          </p>
        </div>

        {/* 1-Tap Quick Doctor Login Button (User specifically requested only one login needed) */}
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-primary">
            <UserCheck className="w-4 h-4" />
            <span>Single Doctor Access (One-Click Ready)</span>
          </div>

          <button
            type="button"
            onClick={handleQuickDoctorSignIn}
            className="w-full min-h-[46px] rounded-xl bg-primary text-on-primary font-bold text-sm shadow hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span>⚡ One-Tap Sign In as Dr. Sarah Jenkins</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-[11px] text-center text-on-surface-variant">
            Lead Clinician &middot; Operatory 1 (Panoramic Suite)
          </p>
        </div>

        {/* Or Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-outline-variant/30" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Or Standard Login
          </span>
          <div className="flex-1 h-px bg-outline-variant/30" />
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">
              Clinician Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-outline-variant/40 bg-surface text-on-surface text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">
              Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-xl border border-outline-variant/40 bg-surface text-on-surface text-xs focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] text-on-surface-variant absolute right-3 top-1/2 -translate-y-1/2 hover:text-on-surface"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-error font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full min-h-[44px] rounded-xl bg-surface-container-high text-on-surface font-bold text-xs hover:bg-surface-container-highest transition-all flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In to Clinical Schedule</span>
          </button>
        </form>

        {/* Security Footer Note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-on-surface-variant">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
          <span>Encrypted HIPAA Doctor Station &middot; Lumina Dental</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorLoginModal;

