import React, { useState, useEffect } from 'react';
import {
  dentalServices,
  clinicians,
  BookingState,
} from '../data/mockData';

export interface LiveReservationSummaryProps {
  readonly booking: BookingState;
  readonly onConfirm: () => void;
  readonly onNextStep?: () => void;
  readonly className?: string;
}

export const LiveReservationSummary: React.FC<LiveReservationSummaryProps> = ({
  booking,
  onConfirm,
  onNextStep,
  className = '',
}) => {
  const selectedService =
    dentalServices.find((s) => s.id === booking.selectedServiceId) || dentalServices[0];
  const selectedDoctor =
    clinicians.find((d) => d.id === booking.selectedDentistId) || clinicians[0];

  // 15-minute hold timer countdown
  const [secondsRemaining, setSecondsRemaining] = useState(885); // 14:45

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`space-y-4 lg:sticky lg:top-24 ${className}`}>
      {/* Live Reservation Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden border border-surface-container">
        {/* Top Gradient Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary"></div>

        {/* Card Header */}
        <div className="flex items-center justify-between mb-5 pt-1">
          <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
            Appointment Summary
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-secondary-fixed text-on-secondary-container px-2.5 py-1 rounded-full font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            <span>Hold {formatTimer(secondsRemaining)}</span>
          </span>
        </div>

        {/* Location Indicator */}
        <div className="flex items-start gap-3 p-3.5 bg-surface rounded-xl mb-4 border border-surface-container">
          <span className="material-symbols-outlined text-primary text-xl mt-0.5">
            location_on
          </span>
          <div>
            <div className="text-sm font-bold text-on-surface">
              Lumina Dental Central
            </div>
            <p className="text-xs text-on-surface-variant leading-snug mt-0.5">
              450 Sutter St, Suite 1200<br />San Francisco, CA 94108
            </p>
          </div>
        </div>

        {/* Service & Doctor Details */}
        <div className="space-y-3 pb-4 mb-4 border-b border-surface-container">
          {/* Procedure */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-base">dentistry</span>
            </div>
            <div>
              <span className="text-[11px] text-on-surface-variant font-medium block">
                Procedure
              </span>
              <span className="text-sm font-bold text-on-surface">
                {selectedService.name}
              </span>
            </div>
          </div>

          {/* Clinician */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-base">person</span>
            </div>
            <div>
              <span className="text-[11px] text-on-surface-variant font-medium block">
                Clinician
              </span>
              <span className="text-sm font-bold text-on-surface">
                {selectedDoctor.name}
              </span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-base">calendar_today</span>
            </div>
            <div>
              <span className="text-[11px] text-on-surface-variant font-medium block">
                Date &amp; Time
              </span>
              <span className="text-sm font-bold text-primary">
                Thursday, Oct 24, 2024 @ {booking.selectedSlot}
              </span>
              <span className="text-[11px] text-on-surface-variant block mt-0.5">
                {selectedDoctor.operatory}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-surface-container px-2 py-0.5 rounded-full mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Slot Selected &amp; Held</span>
              </span>
            </div>
          </div>
        </div>

        {/* Transparent Fee Breakdown */}
        <div className="bg-surface rounded-xl p-4 mb-5 border border-surface-container">
          <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold block mb-2.5">
            Estimated Cost Breakdown
          </span>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-on-surface-variant">
              <span>Standard Dental Prophylaxis</span>
              <span className="font-semibold text-on-surface">
                ${selectedService.price}.00
              </span>
            </div>

            <div className="flex justify-between text-on-surface-variant">
              <span>4 Bitewing Digital Radiographs</span>
              <span className="font-semibold text-on-surface">$65.00</span>
            </div>

            <div className="flex justify-between text-on-surface-variant">
              <span>Periodic Oral Exam &amp; Cancer Screen</span>
              <span className="font-semibold text-on-surface">$85.00</span>
            </div>

            <div className="flex justify-between text-secondary pt-1 font-semibold border-t border-surface-container">
              <span>Estimated Insurance Benefit ({booking.insuranceCarrier.split(' ')[0]})</span>
              <span>-$300.00</span>
            </div>

            <div className="flex justify-between items-baseline pt-2.5 text-on-surface font-bold text-sm border-t border-surface-container">
              <span>Estimated Patient Copay</span>
              <span className="text-primary text-xl font-bold">
                $0.00 – $35.00
              </span>
            </div>
          </div>
        </div>

        {/* Submit CTA Button */}
        <button
          type="button"
          onClick={booking.step >= 3 ? onConfirm : (onNextStep || onConfirm)}
          className="w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">
            {booking.step >= 3 ? 'lock' : 'arrow_forward'}
          </span>
          <span>
            {booking.step === 1
              ? 'Continue to Doctor & Slot'
              : booking.step === 2
              ? 'Confirm Slot & Continue'
              : 'Confirm & Reserve Appointment'}
          </span>
        </button>

        {/* Cancellation Policy */}
        <p className="text-xs text-center text-on-surface-variant mt-3 flex items-center justify-center gap-1.5 font-medium">
          <span className="material-symbols-outlined text-base text-secondary">
            check_circle
          </span>
          <span>Free rescheduling &amp; cancellations up to 24h prior</span>
        </p>
      </div>

      {/* Trust Badges & Patient Assurance Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-4 border border-surface-container">
        {/* Google Rating */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-amber-500 font-bold shrink-0">
            <span className="material-symbols-outlined text-xl">star</span>
          </div>
          <div>
            <div className="flex items-center gap-1 text-sm font-bold text-on-surface">
              <span>4.9 / 5.0 Rating</span>
              <span className="text-xs font-normal text-on-surface-variant">
                (1,420+ Reviews)
              </span>
            </div>
            <span className="text-xs text-on-surface-variant block">
              Top-rated cosmetic &amp; restorative clinic in SF
            </span>
          </div>
        </div>

        {/* Guarantee Badge */}
        <div className="flex items-center gap-3 pt-2 border-t border-surface-container">
          <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-xl">price_check</span>
          </div>
          <div>
            <span className="text-sm font-bold text-on-surface block">
              No Surprise Bills Guarantee
            </span>
            <span className="text-xs text-on-surface-variant block">
              Prior authorization verified before any procedure begins
            </span>
          </div>
        </div>

        {/* Clinic Operatory Photo Preview */}
        <div className="relative rounded-xl overflow-hidden h-28 bg-surface-container">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwmze1PTcHbgNJzuHh9OPC-9ymNh8RGC6SeOOVnsgGVR47BphLopGv6TgG-WNBod-gl6cOjMdgteOjpd_Vguh7hUjsHI634vj4GFNxAiTx8c4sfdfC7KunoPyM-8EkOni71J39bKn73QceL0l_-nzgru9smTcBZT03z5lRRDKNLWScmplBLM2r6OH2cnGEor94wT7MylkpeN4iZHWUJbkkHjxLVNN6ibvAkh-9mTI1"
            alt="Operatory 1 Room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 to-transparent flex items-end p-2.5">
            <span className="text-inverse-on-surface text-xs font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-secondary-fixed">
                chair
              </span>
              <span>Operatory 1 • Sanitized &amp; Prepared</span>
            </span>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-surface-container-high rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-lg">
              e911_emergency
            </span>
            <span className="text-xs font-bold text-on-surface">
              Urgent or After-Hours?
            </span>
          </div>
          <a
            href="tel:5552348901"
            className="text-xs font-bold text-error hover:underline"
          >
            (555) 234-8901
          </a>
        </div>
      </div>
    </div>
  );
};

export default LiveReservationSummary;

