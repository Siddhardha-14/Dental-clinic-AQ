import React from 'react';
import { BookingState } from '../data/mockData';

export interface QrPassModalProps {
  readonly isOpen: boolean;
  readonly booking: BookingState;
  readonly onClose: () => void;
  readonly className?: string;
}

export const QrPassModal: React.FC<QrPassModalProps> = ({
  isOpen,
  booking,
  onClose,
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-on-surface/50 backdrop-blur-md p-4 transition-all duration-300 animate-fadeIn ${className}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-surface-container flex flex-col">
        {/* Modal Top Header */}
        <div className="bg-surface-container-low px-6 py-5 border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-xl">
                dentistry
              </span>
            </div>
            <div>
              <h3 className="font-bold text-base text-on-surface">
                Mobile Check-in Pass
              </h3>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                <span className="font-mono text-primary font-bold">
                  #{booking.bookingRef}
                </span>
                <span>•</span>
                <span>Lumina Dental</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 flex flex-col items-center">
          <div className="w-full bg-surface rounded-2xl p-5 border border-surface-container flex flex-col items-center">
            {/* Patient & Operatory Row */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-surface-container mb-4 text-xs">
              <div className="text-left">
                <p className="uppercase tracking-wider text-on-surface-variant font-bold text-[10px]">
                  Patient
                </p>
                <p className="font-bold text-sm text-on-surface">
                  {booking.firstName} {booking.lastName}
                </p>
              </div>

              <div className="text-right">
                <p className="uppercase tracking-wider text-on-surface-variant font-bold text-[10px]">
                  Operatory
                </p>
                <p className="font-bold text-sm text-primary">
                  Suite 1 (Dr. Jenkins)
                </p>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container flex items-center justify-center">
              <svg
                className="w-48 h-48"
                viewBox="0 0 140 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="140" height="140" fill="currentColor" className="text-surface-container-lowest" rx="8" />
                <rect x="14" y="14" width="36" height="36" rx="4" fill="currentColor" className="text-primary" />
                <rect x="19" y="19" width="26" height="26" rx="2" fill="currentColor" className="text-surface-container-lowest" />
                <rect x="24" y="24" width="16" height="16" rx="1" fill="currentColor" className="text-primary" />

                <rect x="90" y="14" width="36" height="36" rx="4" fill="currentColor" className="text-primary" />
                <rect x="95" y="19" width="26" height="26" rx="2" fill="currentColor" className="text-surface-container-lowest" />
                <rect x="100" y="24" width="16" height="16" rx="1" fill="currentColor" className="text-primary" />

                <rect x="14" y="90" width="36" height="36" rx="4" fill="currentColor" className="text-primary" />
                <rect x="19" y="95" width="26" height="26" rx="2" fill="currentColor" className="text-surface-container-lowest" />
                <rect x="24" y="100" width="16" height="16" rx="1" fill="currentColor" className="text-primary" />

                {/* Data Matrix Dots */}
                <rect x="56" y="16" width="8" height="8" fill="currentColor" className="text-on-surface" />
                <rect x="70" y="16" width="8" height="16" fill="currentColor" className="text-primary" />
                <rect x="56" y="32" width="16" height="8" fill="currentColor" className="text-on-surface" />
                <rect x="76" y="40" width="10" height="8" fill="currentColor" className="text-primary" />
                <rect x="20" y="58" width="16" height="8" fill="currentColor" className="text-on-surface" />
                <rect x="56" y="58" width="12" height="12" fill="currentColor" className="text-primary" />
                <rect x="74" y="58" width="14" height="8" fill="currentColor" className="text-on-surface" />
                <rect x="96" y="58" width="16" height="14" fill="currentColor" className="text-primary" />
                <rect x="56" y="76" width="8" height="16" fill="currentColor" className="text-primary" />
                <rect x="70" y="76" width="18" height="8" fill="currentColor" className="text-on-surface" />
                <rect x="94" y="78" width="14" height="14" fill="currentColor" className="text-on-surface" />
                <rect x="114" y="78" width="12" height="12" fill="currentColor" className="text-primary" />
                <rect x="56" y="98" width="14" height="10" fill="currentColor" className="text-on-surface" />
                <rect x="76" y="98" width="12" height="12" fill="currentColor" className="text-primary" />
                <rect x="94" y="98" width="10" height="22" fill="currentColor" className="text-on-surface" />
                <rect x="110" y="98" width="16" height="8" fill="currentColor" className="text-primary" />
                <rect x="56" y="116" width="18" height="10" fill="currentColor" className="text-primary" />
                <rect x="80" y="116" width="8" height="10" fill="currentColor" className="text-on-surface" />
                <rect x="112" y="116" width="14" height="10" fill="currentColor" className="text-primary" />
              </svg>
            </div>

            <p className="text-xs text-on-surface-variant text-center mt-3 leading-relaxed">
              Scan this pass on arrival at the front desk kiosk or show it to your operatory assistant for instantaneous chair entry.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-full bg-primary text-on-primary hover:bg-primary-container text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrPassModal;

