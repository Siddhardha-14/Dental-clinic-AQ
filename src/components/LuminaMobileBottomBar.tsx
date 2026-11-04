import React from 'react';
import { dentalServices, clinicians, BookingState } from '../data/mockData';

export interface LuminaMobileBottomBarProps {
  readonly booking: BookingState;
  readonly onNextStep: () => void;
  readonly onConfirmBooking: () => void;
  readonly className?: string;
}

export const LuminaMobileBottomBar: React.FC<LuminaMobileBottomBarProps> = ({
  booking,
  onNextStep,
  onConfirmBooking,
  className = '',
}) => {
  const selectedService =
    dentalServices.find((s) => s.id === booking.selectedServiceId) || dentalServices[0];
  const selectedDoctor =
    clinicians.find((d) => d.id === booking.selectedDentistId) || clinicians[0];

  const isFinalStep = booking.step >= 3;

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-surface/95 backdrop-blur-xl border-t border-surface-container shadow-2xl px-4 py-3 flex items-center justify-between gap-3 ${className}`}
    >
      {/* Left: Selected Slot & Copay Summary */}
      <div className="flex flex-col text-left leading-tight min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span className="text-[11px] font-bold text-primary truncate">
            {booking.selectedSlot ? `Oct 24 @ ${booking.selectedSlot}` : 'Select Time'}
          </span>
        </div>

        <span className="text-xs font-bold text-on-surface truncate mt-0.5">
          {selectedService.name}
        </span>

        <span className="text-[10px] text-on-surface-variant truncate">
          Copay: <strong className="text-primary">$0 – $35</strong> • {selectedDoctor.name.split(',')[0]}
        </span>
      </div>

      {/* Right: Direct Action CTA Button */}
      <button
        type="button"
        onClick={isFinalStep ? onConfirmBooking : onNextStep}
        className="px-5 py-3 min-h-[44px] rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
      >
        <span className="material-symbols-outlined text-base">
          {isFinalStep ? 'lock' : 'arrow_forward'}
        </span>
        <span>
          {isFinalStep
            ? 'Confirm Booking'
            : booking.step === 1
            ? 'Choose Doctor'
            : 'Confirm Slot'}
        </span>
      </button>
    </div>
  );
};

export default LuminaMobileBottomBar;

