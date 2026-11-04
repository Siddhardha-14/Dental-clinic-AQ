import React from 'react';
import { insuranceCarriers, dentalServices, clinicians, BookingState } from '../data/mockData';

export interface PatientInformationFormProps {
  readonly booking: BookingState;
  readonly onUpdateField: (field: keyof BookingState, value: unknown) => void;
  readonly onTogglePreference: (key: 'nitrousOxide' | 'wheelchair' | 'quietOperatory') => void;
  readonly onConfirmBooking?: () => void;
  readonly onBackToSlots?: () => void;
  readonly className?: string;
}

export const PatientInformationForm: React.FC<PatientInformationFormProps> = ({
  booking,
  onUpdateField,
  onTogglePreference,
  onConfirmBooking,
  onBackToSlots,
  className = '',
}) => {
  const selectedService =
    dentalServices.find((s) => s.id === booking.selectedServiceId) || dentalServices[0];
  const selectedDoctor =
    clinicians.find((d) => d.id === booking.selectedDentistId) || clinicians[0];

  return (
    <section
      className={`bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3.5 pb-6 border-b border-surface-container mb-6">
        <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-sm">
          <span className="material-symbols-outlined text-2xl">
            badge
          </span>
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
            Patient Information &amp; Coverage
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
            We coordinate directly with your dental benefits carrier
          </p>
        </div>
      </div>

      {/* New vs Returning Patient Toggle */}
      <div className="inline-flex p-1 bg-surface-container rounded-full mb-6">
        <button
          type="button"
          onClick={() => onUpdateField('patientType', 'new')}
          className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            booking.patientType === 'new'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          New Patient
        </button>
        <button
          type="button"
          onClick={() => onUpdateField('patientType', 'returning')}
          className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            booking.patientType === 'returning'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Returning Patient
        </button>
      </div>

      {/* Patient Demographics Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* First Name */}
        <div>
          <label className="block text-xs font-bold text-on-surface mb-1">
            First Name *
          </label>
          <input
            type="text"
            value={booking.firstName}
            onChange={(e) => onUpdateField('firstName', e.target.value)}
            placeholder="e.g., Alexander"
            className="w-full h-11 px-4 rounded-xl bg-surface border border-surface-container text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-bold text-on-surface mb-1">
            Last Name *
          </label>
          <input
            type="text"
            value={booking.lastName}
            onChange={(e) => onUpdateField('lastName', e.target.value)}
            placeholder="e.g., Hayes"
            className="w-full h-11 px-4 rounded-xl bg-surface border border-surface-container text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium"
          />
        </div>

        {/* Mobile Phone */}
        <div>
          <label className="block text-xs font-bold text-on-surface mb-1">
            Mobile Phone Number *
          </label>
          <input
            type="tel"
            value={booking.phone}
            onChange={(e) => onUpdateField('phone', e.target.value)}
            placeholder="e.g., (555) 438-9210"
            className="w-full h-11 px-4 rounded-xl bg-surface border border-surface-container text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-bold text-on-surface mb-1">
            Email Address (for instant wallet pass) *
          </label>
          <input
            type="email"
            value={booking.email}
            onChange={(e) => onUpdateField('email', e.target.value)}
            placeholder="e.g., a.hayes@caltech.edu"
            className="w-full h-11 px-4 rounded-xl bg-surface border border-surface-container text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium"
          />
        </div>

        {/* Date of Birth */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-on-surface mb-1">
            Date of Birth *
          </label>
          <input
            type="date"
            value={booking.dateOfBirth}
            onChange={(e) => onUpdateField('dateOfBirth', e.target.value)}
            className="w-full md:w-1/2 h-11 px-4 rounded-xl bg-surface border border-surface-container text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium"
          />
        </div>
      </div>

      {/* Insurance Section */}
      <div className="pt-6 border-t border-surface-container mb-6">
        <h3 className="text-base font-bold text-on-surface mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-lg">
            verified_user
          </span>
          <span>Dental Benefits &amp; Insurance Carrier</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-on-surface mb-1">
              Select Primary Insurance Plan
            </label>
            <select
              value={booking.insuranceCarrier}
              onChange={(e) => onUpdateField('insuranceCarrier', e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-surface border border-surface-container text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium cursor-pointer"
            >
              {insuranceCarriers.map((carrier: string) => (
                <option key={carrier} value={carrier}>
                  {carrier}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">
              Member ID / Subscriber ID
            </label>
            <input
              type="text"
              value={booking.memberId}
              onChange={(e) => onUpdateField('memberId', e.target.value)}
              placeholder="e.g., DEL-8820194"
              className="w-full h-11 px-4 rounded-xl bg-surface border border-surface-container text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-on-surface mb-1">
              Group Number (Optional)
            </label>
            <input
              type="text"
              value={booking.groupNumber}
              onChange={(e) => onUpdateField('groupNumber', e.target.value)}
              placeholder="e.g., GRP-10492"
              className="w-full h-11 px-4 rounded-xl bg-surface border border-surface-container text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium"
            />
          </div>
        </div>
      </div>

      {/* Patient Comfort & Accessibility Preferences */}
      <div className="pt-6 border-t border-surface-container">
        <h3 className="text-base font-bold text-on-surface mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-lg">
            spa
          </span>
          <span>Sanctuary Experience &amp; Accessibility (Complimentary)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <label className="flex items-center gap-2.5 p-3.5 rounded-xl bg-surface hover:bg-surface-container cursor-pointer transition-colors border border-surface-container">
            <input
              type="checkbox"
              checked={booking.preferences.nitrousOxide}
              onChange={() => onTogglePreference('nitrousOxide')}
              className="accent-primary rounded w-4 h-4 cursor-pointer"
            />
            <span className="text-xs font-medium text-on-surface">
              Nitrous Oxide / Anxiety Support
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-3.5 rounded-xl bg-surface hover:bg-surface-container cursor-pointer transition-colors border border-surface-container">
            <input
              type="checkbox"
              checked={booking.preferences.wheelchair}
              onChange={() => onTogglePreference('wheelchair')}
              className="accent-primary rounded w-4 h-4 cursor-pointer"
            />
            <span className="text-xs font-medium text-on-surface">
              Wheelchair Accessibility
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-3.5 rounded-xl bg-surface hover:bg-surface-container cursor-pointer transition-colors border border-surface-container">
            <input
              type="checkbox"
              checked={booking.preferences.quietOperatory}
              onChange={() => onTogglePreference('quietOperatory')}
              className="accent-primary rounded w-4 h-4 cursor-pointer"
            />
            <span className="text-xs font-medium text-on-surface">
              Prefer Quiet Operatory
            </span>
          </label>
        </div>
      </div>

      {/* Direct In-Form Booking Confirmation Dock */}
      {onConfirmBooking && (
        <div className="mt-8 pt-6 border-t border-surface-container bg-surface-container-low p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Ready to Confirm
              </span>
            </div>
            <p className="text-base sm:text-lg font-bold text-on-surface">
              {selectedService.name} • {selectedDoctor.name}
            </p>
            <p className="text-xs text-on-surface-variant flex items-center gap-2 flex-wrap">
              <span>📅 Thursday, Oct 24 @ {booking.selectedSlot}</span>
              <span>•</span>
              <span>📍 {selectedDoctor.operatory}</span>
              <span>•</span>
              <strong className="text-primary font-bold">Estimated Copay: $0.00 – $35.00</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {onBackToSlots && (
              <button
                type="button"
                onClick={onBackToSlots}
                className="px-5 py-3.5 min-h-[44px] rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs transition-colors cursor-pointer"
              >
                ← Change Slot
              </button>
            )}

            <button
              type="button"
              onClick={onConfirmBooking}
              className="px-8 py-3.5 min-h-[44px] rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">lock</span>
              <span>Confirm &amp; Reserve Appointment</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PatientInformationForm;
