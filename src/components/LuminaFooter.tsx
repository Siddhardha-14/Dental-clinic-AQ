import React from 'react';
import { clinicInfo } from '../data/mockData';

export interface LuminaFooterProps {
  readonly className?: string;
}

export const LuminaFooter: React.FC<LuminaFooterProps> = ({ className = '' }) => {
  return (
    <footer
      id="location"
      className={`w-full bg-surface-container-low text-on-surface-variant mt-16 border-t border-surface-container ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Column 1: Brand & Accreditation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-lg">
                  dentistry
                </span>
              </div>
              <span className="font-bold text-base text-on-surface">
                {clinicInfo.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Pristine dental care balancing surgical precision with compassionate hospitality. Dedicated to lifelong patient wellness.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface text-xs font-semibold">
                <span className="material-symbols-outlined text-primary text-sm">
                  verified
                </span>
                <span>ADA Accredited</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface text-xs font-semibold">
                <span className="material-symbols-outlined text-primary text-sm">
                  lock
                </span>
                <span>HIPAA Compliant</span>
              </div>
            </div>
          </div>

          {/* Column 2: Clinic Location */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider">
              Clinic Location
            </h4>
            <div className="flex items-start gap-2 text-xs sm:text-sm">
              <span className="material-symbols-outlined text-base text-on-surface-variant mt-0.5">
                location_on
              </span>
              <div>
                <p className="text-on-surface font-semibold">
                  Metro Health Pavilion
                </p>
                <p>{clinicInfo.pavilionAddress}</p>
                <p className="text-outline text-xs mt-1">
                  Central Suite: {clinicInfo.centralAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Operating Hours */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider">
              Operating Hours
            </h4>
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between gap-4">
                <span>Monday – Thursday</span>
                <span className="text-on-surface font-semibold">
                  {clinicInfo.timingsWeekday}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Friday</span>
                <span className="text-on-surface font-semibold">
                  {clinicInfo.timingsFriday}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Saturday</span>
                <span className="text-on-surface font-semibold">
                  {clinicInfo.timingsSaturday}
                </span>
              </div>
              <div className="flex justify-between gap-4 text-error font-medium">
                <span>Sunday</span>
                <span>{clinicInfo.timingsSunday}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Patient Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider">
              Patient Support
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-on-surface-variant">
                  phone
                </span>
                <span>Appointments: {clinicInfo.phoneAppointments}</span>
              </div>

              <div className="flex items-center gap-2 text-error font-bold">
                <span className="material-symbols-outlined text-base">
                  e911_emergency
                </span>
                <a href={`tel:${clinicInfo.phoneEmergency}`} className="hover:underline">
                  Emergency: {clinicInfo.phoneEmergency}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-on-surface-variant">
                  mail
                </span>
                <a href={`mailto:${clinicInfo.email}`} className="hover:underline">
                  {clinicInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2025 Lumina Dental Clinic. All medical information is strictly encrypted in accordance with HIPAA standards.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-on-surface transition-colors">
              Privacy Policy
            </a>
            <a href="#rights" className="hover:text-on-surface transition-colors">
              Patient Rights
            </a>
            <a href="#accessibility" className="hover:text-on-surface transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LuminaFooter;

