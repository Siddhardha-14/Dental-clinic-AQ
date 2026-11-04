import React from 'react';
import { useClinic } from '../context/ClinicContext';
import {
  PhoneCall,
  Clock,
  ShieldCheck,
  Heart,
  User,
} from 'lucide-react';

export interface ClinicFooterProps {
  readonly onOpenDoctorLogin?: () => void;
  readonly onOpenProfile?: () => void;
  readonly onOpenAiAssistant?: () => void;
}

export const ClinicFooter: React.FC<ClinicFooterProps> = ({
  onOpenDoctorLogin: _onOpenDoctorLogin,
  onOpenProfile,
  onOpenAiAssistant,
}) => {
  const { setActiveTab } = useClinic();

  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/30 text-on-surface py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">dentistry</span>
            </div>
            <span className="text-lg font-bold text-on-surface">Lumina Dental</span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Modern, gentle, and anxiety-free dental care in San Francisco. Equipped with 3D digital imaging, quiet suites, and 100% upfront copay transparency.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>ADA Accredited &middot; HIPAA Compliant</span>
          </div>
        </div>

        {/* Col 2: Clinic Location & Hours */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Location &amp; Hours
          </h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            450 Sutter St, Suite 1800<br />
            San Francisco, CA 94108
          </p>
          <div className="space-y-1 text-xs text-on-surface-variant">
            <p className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Mon &ndash; Fri: 8:00 AM &ndash; 6:00 PM</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span>Saturday: 9:00 AM &ndash; 3:00 PM</span>
            </p>
            <p className="text-[11px] text-on-surface-variant font-medium">Sunday: Emergency on-call</p>
          </div>
        </div>

        {/* Col 3: Direct Emergency Contact */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Urgent Patient Care
          </h4>
          <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
            <p className="text-xs font-bold text-on-surface">24/7 Emergency Line</p>
            <a
              href="tel:5552348901"
              className="text-sm font-bold text-primary hover:underline flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4 text-primary" />
              <span>(555) 234-8901</span>
            </a>
            <p className="text-[11px] text-on-surface-variant">
              Same-day relief for throbbing pain, broken teeth &amp; trauma.
            </p>
          </div>
        </div>

        {/* Col 4: Quick Portals */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Quick Navigation
          </h4>
          <ul className="space-y-1 text-xs">
            <li>
              <button
                onClick={() => {
                  setActiveTab('booking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="min-h-[44px] text-on-surface-variant hover:text-primary transition-colors font-medium flex items-center"
              >
                Book Dental Visit
              </button>
            </li>
            {onOpenAiAssistant && (
              <li>
                <button
                  onClick={onOpenAiAssistant}
                  className="min-h-[44px] text-on-surface-variant hover:text-secondary transition-colors font-medium flex items-center"
                >
                  Ask AI Dental Concierge
                </button>
              </li>
            )}
            <li>
              <button
                onClick={() => {
                  if (onOpenProfile) {
                    onOpenProfile();
                  } else {
                    setActiveTab('profile');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="min-h-[44px] text-on-surface-variant hover:text-primary transition-colors font-medium flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Patient Account &amp; Profile</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between text-xs text-on-surface-variant gap-4">
        <p>&copy; {new Date().getFullYear()} Lumina Dental Studio. All rights reserved.</p>
        <p className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-error fill-error" />
          <span>for modern gentle dentistry</span>
        </p>
      </div>
    </footer>
  );
};

export default ClinicFooter;

