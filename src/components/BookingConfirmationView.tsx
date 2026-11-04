import React, { useState } from 'react';
import {
  dentalServices,
  clinicians,
  BookingState,
} from '../data/mockData';

export interface BookingConfirmationViewProps {
  readonly booking: BookingState;
  readonly onReschedule: () => void;
  readonly onOpenQrModal: () => void;
  readonly onGoToDashboard: () => void;
  readonly className?: string;
}

export const BookingConfirmationView: React.FC<BookingConfirmationViewProps> = ({
  booking,
  onReschedule,
  onOpenQrModal,
  onGoToDashboard,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [questionnaireStarted, setQuestionnaireStarted] = useState(false);
  const [cardUploaded, setCardUploaded] = useState(false);

  const selectedService =
    dentalServices.find((s) => s.id === booking.selectedServiceId) || dentalServices[0];
  const selectedDoctor =
    clinicians.find((d) => d.id === booking.selectedDentistId) || clinicians[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(booking.bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Lumina Dental - ${selectedService.name}\nDESCRIPTION:Appointment with ${selectedDoctor.name} at Lumina Dental Central\\nBooking Ref: ${booking.bookingRef}\nLOCATION:450 Sutter St, Suite 1200, San Francisco, CA 94108\nDTSTART:20241024T104500\nDTEND:20241024T114500\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `lumina-appointment-${booking.bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      {/* Celebration Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-surface-container-lowest p-6 sm:p-10 md:p-12 mb-8 shadow-sm border border-surface-container">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
              <span className="material-symbols-outlined text-base">
                verified
              </span>
              <span className="uppercase tracking-wider">
                Appointment Confirmed &amp; Reserved
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
              You&apos;re all set, {booking.firstName}!
            </h1>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              A confirmation email and SMS with contact-free digital check-in details have been dispatched to{' '}
              <span className="font-semibold text-on-surface underline decoration-secondary">
                {booking.email}
              </span>{' '}
              and{' '}
              <span className="font-semibold text-on-surface">
                {booking.phone}
              </span>.
            </p>
          </div>

          {/* Reference Code Container */}
          <div className="flex flex-col items-start md:items-end justify-center gap-2 bg-surface p-5 rounded-2xl border border-surface-container shadow-sm">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
              Booking Reference
            </span>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xl sm:text-2xl font-bold text-primary tracking-wider">
                #{booking.bookingRef}
              </span>

              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-semibold transition-all cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <span className="text-xs text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>Encrypted HIPAA Record</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Column: Primary Clinical Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 border border-surface-container">
            {/* Date & Time Highlights */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-surface-container-low border border-surface-container">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex flex-col items-center justify-center shadow-sm shrink-0">
                  <span className="text-[10px] uppercase font-bold leading-none">OCT</span>
                  <span className="text-2xl font-bold leading-tight">24</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-on-surface">
                    Thursday, October 24, 2024
                  </h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">
                    <span className="material-symbols-outlined text-primary text-base">
                      schedule
                    </span>
                    <span>10:45 AM – 11:45 AM</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary font-semibold text-xs">
                      60 Mins
                    </span>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary font-bold text-xs shadow-sm border border-surface-container self-start sm:self-center">
                <span className="material-symbols-outlined text-base">
                  event_available
                </span>
                <span>Confirmed in Chair</span>
              </div>
            </div>

            {/* Doctor & Operatory Profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-surface-container">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-surface-container">
                  <img
                    src={selectedDoctor.photoUrl}
                    alt={selectedDoctor.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-secondary border-2 border-surface-container-lowest"
                    title="Active Provider"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-base text-on-surface">
                      {selectedDoctor.name}
                    </h4>
                    <span className="material-symbols-outlined text-primary text-base">
                      verified
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-primary">
                    {selectedDoctor.credentials}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    14+ Years Clinical Excellence
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-surface-container">
                <div className="w-12 h-12 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">chair</span>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base text-on-surface">
                      Operatory 1 (Panoramic Suite)
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold">
                      Sterilized
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Equipped with ultra-quiet electric handpieces &amp; ambient acoustic isolation.
                  </p>
                </div>
              </div>
            </div>

            {/* Treatment Breakdown */}
            <div className="p-5 rounded-xl bg-surface border border-surface-container space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm sm:text-base text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">
                    medical_services
                  </span>
                  <span>{selectedService.name}</span>
                </span>
                <span className="text-xs font-semibold text-secondary bg-surface-container px-2.5 py-0.5 rounded-full">
                  Preventative Care
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div className="p-3 rounded-lg bg-surface-container-lowest flex items-center gap-2 border border-surface-container">
                  <span className="material-symbols-outlined text-primary text-base">
                    clean_hands
                  </span>
                  <span className="font-medium text-on-surface">
                    Ultrasonic Cavitron Scaling
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-surface-container-lowest flex items-center gap-2 border border-surface-container">
                  <span className="material-symbols-outlined text-primary text-base">
                    radiology
                  </span>
                  <span className="font-medium text-on-surface">
                    4 Bitewing HD X-Rays
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-surface-container-lowest flex items-center gap-2 border border-surface-container">
                  <span className="material-symbols-outlined text-primary text-base">
                    dentistry
                  </span>
                  <span className="font-medium text-on-surface">
                    Diamond Polish &amp; Fluoride
                  </span>
                </div>
              </div>
            </div>

            {/* Location & Directions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl bg-surface-container-low border border-surface-container">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-xl">
                    location_on
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">
                    Lumina Dental Central
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    450 Sutter St, Suite 1200, San Francisco, CA 94108
                  </p>
                  <p className="text-[11px] text-outline mt-0.5">
                    Floor 12, West Tower Pavilion
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=450+Sutter+St+San+Francisco+CA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest hover:bg-surface-container text-primary font-bold text-xs transition-all shadow-sm border border-surface-container"
              >
                <span className="material-symbols-outlined text-base">
                  directions
                </span>
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Sync to Calendar & Wallet Pass Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 border border-surface-container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
              <div>
                <h3 className="font-bold text-lg text-on-surface">
                  Sync to Personal Calendar
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Automated reminders will sync directly to your preferred calendar.
                </p>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Instant 1-Click
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm transition-all shadow-sm border border-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary text-lg">
                  calendar_month
                </span>
                <span>Google Calendar</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadIcs}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm transition-all shadow-sm border border-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-on-surface text-lg">
                  calendar_today
                </span>
                <span>Apple iCal</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadIcs}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm transition-all shadow-sm border border-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-tertiary text-lg">
                  event_note
                </span>
                <span>Outlook</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadIcs}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm transition-all shadow-sm border border-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-outline text-lg">
                  download
                </span>
                <span>Download .ICS</span>
              </button>
            </div>

            {/* Mobile Wallet Pass Strip */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-surface-container-low border border-surface-container">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-xl">
                    smartphone
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">
                    Digital Mobile Wallet Pass
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Add pass with live check-in QR code &amp; suite access.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onOpenQrModal}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-on-surface text-surface hover:opacity-90 text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">
                    account_balance_wallet
                  </span>
                  <span>Apple Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenQrModal}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-bold transition-all shadow-sm border border-surface-container cursor-pointer"
                >
                  <span className="material-symbols-outlined text-primary text-base">
                    wallet
                  </span>
                  <span>Google Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenQrModal}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-secondary-container text-on-secondary-container hover:opacity-90 text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">
                    qr_code_2
                  </span>
                  <span>View QR Pass</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Fast Digital Check-In, Insurance Copay & Parking (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Fast Digital Check-In Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm space-y-4 border border-surface-container">
            <div className="flex items-center justify-between pb-1">
              <h3 className="font-bold text-base text-on-surface">
                Fast Digital Check-In
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                Save 15 Mins
              </span>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Complete the remaining items now to fast-track directly to Operatory 1 on arrival.
            </p>

            <div className="space-y-3">
              {/* Item 1: Health Questionnaire */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-surface-container-high text-primary flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-on-surface">
                      Medical History Questionnaire
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-error bg-error-container px-2 py-0.5 rounded-full">
                    {questionnaireStarted ? 'Completed' : '2 min left'}
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant pl-7">
                  Update medications, allergies, and recent dental procedures.
                </p>

                <div className="pl-7">
                  <button
                    type="button"
                    onClick={() => setQuestionnaireStarted(!questionnaireStarted)}
                    className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary hover:bg-primary-container text-xs font-bold transition-all cursor-pointer"
                  >
                    {questionnaireStarted ? 'Review Responses' : 'Start Now'}
                  </button>
                </div>
              </div>

              {/* Item 2: Insurance Photos */}
              <div className="p-4 rounded-xl bg-surface border border-surface-container flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-surface-container text-outline flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-on-surface">
                      Insurance Card Photos
                    </span>
                  </div>
                  <span className="text-[11px] text-outline bg-surface-container px-2 py-0.5 rounded-full">
                    {cardUploaded ? 'Uploaded' : 'Optional'}
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant pl-7">
                  Snap and upload front &amp; back images of your card.
                </p>

                <div className="pl-7">
                  <button
                    type="button"
                    onClick={() => setCardUploaded(!cardUploaded)}
                    className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-semibold transition-all cursor-pointer"
                  >
                    {cardUploaded ? 'Replace Card' : 'Upload Card'}
                  </button>
                </div>
              </div>

              {/* Item 3: Preferences Saved */}
              <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-on-surface">
                    Comfort Preferences Saved
                  </span>
                </div>

                <div className="pl-7 space-y-1 text-xs text-on-surface">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-sm">done</span>
                    <span>Nitrous Oxide Anxiety Support</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-sm">done</span>
                    <span>Noise-Canceling Operatory Setup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance Copay Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm space-y-3 border border-surface-container">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                Insurance Eligibility
              </span>
              <span className="inline-flex items-center gap-1 text-secondary text-xs font-bold">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                <span>Active</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-on-surface">
                    {booking.insuranceCarrier}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Member ID: {booking.memberId}
                  </p>
                </div>
                <span className="text-[11px] bg-surface-container-lowest px-2 py-0.5 rounded-full text-primary font-bold border border-surface-container">
                  100% In-Network
                </span>
              </div>

              <div className="pt-2 flex items-baseline justify-between border-t border-surface-container">
                <span className="text-xs text-on-surface-variant">
                  Estimated Copay:
                </span>
                <span className="text-lg font-bold text-primary">
                  $0.00 – $35.00
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert(`Downloading Benefit Explanation PDF for ${booking.bookingRef}`)}
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary-container text-xs font-bold transition-colors pt-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">receipt_long</span>
              <span>Download Estimate Breakdown (PDF)</span>
            </button>
          </div>

          {/* Parking & Arrival Protocol */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm space-y-3 border border-surface-container">
            <div className="flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-primary text-xl">
                local_parking
              </span>
              <h4 className="font-bold text-sm">
                Parking &amp; Arrival Protocol
              </h4>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Free validated parking is provided at the{' '}
              <strong className="text-on-surface">Sutter-Stockton Garage</strong>{' '}
              (bring ticket inside). Please arrive 10 minutes prior to your slot.
            </p>

            <div className="p-3 rounded-lg bg-surface flex items-center gap-2 text-xs text-on-surface-variant border border-surface-container">
              <span className="material-symbols-outlined text-primary text-base">
                air
              </span>
              <span>Operatory 1 is equipped with HEPA-14 medical filtration.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final Action Bar */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-surface-container">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={onGoToDashboard}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-primary text-on-primary hover:bg-primary-container font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Go to Clinic Dashboard</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>

          <button
            type="button"
            onClick={onReschedule}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">edit_calendar</span>
            <span>Reschedule or Modify Visit</span>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
          <span className="material-symbols-outlined text-error text-2xl">
            ring_volume
          </span>
          <div className="text-left">
            <p className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
              Immediate Assistance
            </p>
            <a
              href="tel:5552348900"
              className="text-sm font-bold text-on-surface hover:text-primary transition-colors"
            >
              Direct Concierge: (555) 234-8900
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationView;

