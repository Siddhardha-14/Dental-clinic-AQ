import React from 'react';
import {
  clinicians,
  Clinician,
  morningSlots,
  afternoonSlots,
  TimeSlot,
} from '../data/mockData';

export interface ClinicianAndSlotPickerProps {
  readonly selectedDentistId: string;
  readonly selectedDate: string;
  readonly selectedSlot: string;
  readonly onSelectDentist: (dentistId: string) => void;
  readonly onSelectDate: (date: string) => void;
  readonly onSelectSlot: (slot: string) => void;
  readonly onConfirmSlot?: () => void;
  readonly className?: string;
}

export const ClinicianAndSlotPicker: React.FC<ClinicianAndSlotPickerProps> = ({
  selectedDentistId,
  selectedDate,
  selectedSlot,
  onSelectDentist,
  onSelectDate,
  onSelectSlot,
  onConfirmSlot,
  className = '',
}) => {
  const selectedDoctor: Clinician =
    clinicians.find((c) => c.id === selectedDentistId) || clinicians[0];
  // Calendar days for October 2024
  const daysInOctober = [
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
  ];

  return (
    <section
      id="dentists"
      className={`bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3.5 pb-6 border-b border-surface-container mb-6">
        <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-sm">
          <span className="material-symbols-outlined text-2xl">
            person_check
          </span>
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
            Choose Clinician &amp; Preferred Time
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
            Select an assigned provider or match with the first available chair
          </p>
        </div>
      </div>

      {/* Doctor Selection Bento (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {clinicians.map((doctor: Clinician) => {
          const isSelected = selectedDentistId === doctor.id;

          return (
            <label
              key={doctor.id}
              onClick={() => onSelectDentist(doctor.id)}
              className={`relative flex flex-col p-5 rounded-2xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-surface-container-low border-primary ring-2 ring-primary/20 shadow-sm'
                  : 'bg-surface-container-lowest border-surface-container hover:bg-surface-container-low hover:border-outline-variant shadow-sm'
              }`}
            >
              <input
                type="radio"
                name="dentist_preference"
                checked={isSelected}
                onChange={() => onSelectDentist(doctor.id)}
                className="absolute top-4 right-4 accent-primary cursor-pointer w-4 h-4"
              />

              <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container mb-3 shadow-inner">
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-base font-bold text-on-surface">
                {doctor.name}
              </span>
              <span className="text-xs font-semibold text-primary mt-0.5">
                {doctor.role}
              </span>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                {doctor.bio}
              </p>

              <div className="mt-3.5 pt-3 border-t border-surface-container flex items-center gap-1.5 text-xs">
                <span className="material-symbols-outlined text-amber-500 text-sm">
                  star
                </span>
                <span className="font-bold text-on-surface">{doctor.rating}</span>
                <span className="text-on-surface-variant">
                  ({doctor.reviewsCount} reviews)
                </span>
              </div>
            </label>
          );
        })}
      </div>

      {/* Date & Slot Picker Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-surface rounded-2xl p-4 sm:p-6 border border-surface-container">
        {/* Calendar Navigation (Left 5 Cols) */}
        <div className="md:col-span-5 bg-surface-container-lowest p-4 sm:p-5 rounded-xl shadow-sm border border-surface-container">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-on-surface">
              October 2024
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
                aria-label="Previous Month"
              >
                <span className="material-symbols-outlined text-base">
                  chevron_left
                </span>
              </button>
              <button
                type="button"
                className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
                aria-label="Next Month"
              >
                <span className="material-symbols-outlined text-base">
                  chevron_right
                </span>
              </button>
            </div>
          </div>

          {/* Calendar Weekdays */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-on-surface-variant mb-2">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {daysInOctober.map((item, index) => {
              const dateStr = `2024-10-${item.day < 10 ? '0' + item.day : item.day}`;
              const isSelected = selectedDate === dateStr && item.isCurrentMonth;

              return (
                <button
                  key={index}
                  type="button"
                  disabled={!item.isCurrentMonth}
                  onClick={() => item.isCurrentMonth && onSelectDate(dateStr)}
                  className={`py-2 rounded-full font-semibold transition-all ${
                    !item.isCurrentMonth
                      ? 'text-on-surface-variant/40 cursor-not-allowed'
                      : isSelected
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {item.day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots (Right 7 Cols) */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-on-surface">
              Thursday, Oct 24
            </span>
            <span className="text-xs font-semibold text-secondary flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              8 slots open
            </span>
          </div>

          {/* Morning Slots */}
          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-on-surface-variant block mb-2">
              Morning Slots
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {morningSlots.map((slot: TimeSlot) => {
                const isSelected = selectedSlot === slot.time;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => onSelectSlot(slot.time)}
                    className={`py-2 px-3 rounded-full text-center text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-md scale-[1.02]'
                        : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-surface-container'
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Afternoon Slots */}
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-on-surface-variant block mb-2">
              Afternoon Slots
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {afternoonSlots.map((slot: TimeSlot) => {
                const isSelected = selectedSlot === slot.time;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => onSelectSlot(slot.time)}
                    className={`py-2 px-3 rounded-full text-center text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-md scale-[1.02]'
                        : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-surface-container'
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Slot Inline Confirmation & Continue Dock */}
        <div className="mt-8 pt-6 border-t border-surface-container bg-surface-container-low p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary shadow-xs shrink-0">
              <span className="material-symbols-outlined text-2xl">
                event_available
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Slot Selected &amp; Held
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-on-surface">
                Thursday, Oct 24, 2024 @ {selectedSlot}
              </p>
              <span className="text-xs text-on-surface-variant">
                With {selectedDoctor.name} • {selectedDoctor.operatory}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onConfirmSlot}
            className="w-full sm:w-auto px-7 py-3.5 min-h-[44px] rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Confirm Slot &amp; Proceed</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClinicianAndSlotPicker;

