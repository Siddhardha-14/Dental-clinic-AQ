import { useState } from 'react';
import { initialBookingState, BookingState } from '../data/mockData';

export function useLuminaBooking() {
  const [booking, setBooking] = useState<BookingState>(initialBookingState);
  const [activeView, setActiveView] = useState<'booking' | 'schedule' | 'confirmation' | 'doctor'>('booking');
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [selectedOperatoryTab, setSelectedOperatoryTab] = useState<string>('all');

  const setStep = (step: number) => {
    setBooking((prev) => ({ ...prev, step }));
  };

  const selectService = (serviceId: string) => {
    setBooking((prev) => ({ ...prev, selectedServiceId: serviceId }));
  };

  const selectDentist = (dentistId: string) => {
    setBooking((prev) => ({ ...prev, selectedDentistId: dentistId }));
  };

  const selectDate = (date: string) => {
    setBooking((prev) => ({ ...prev, selectedDate: date }));
  };

  const selectSlot = (slot: string) => {
    setBooking((prev) => ({ ...prev, selectedSlot: slot }));
  };

  const updatePatientField = (field: keyof BookingState, value: unknown) => {
    setBooking((prev) => ({ ...prev, [field]: value }));
  };

  const togglePreference = (key: 'nitrousOxide' | 'wheelchair' | 'quietOperatory') => {
    setBooking((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key],
      },
    }));
  };

  const confirmBooking = () => {
    setBooking((prev) => ({
      ...prev,
      isConfirmed: true,
      step: 4,
      bookingRef: `LUM-${Math.floor(10000 + Math.random() * 90000)}-SF`,
    }));
    setActiveView('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetBooking = () => {
    setBooking(initialBookingState);
    setActiveView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    booking,
    setBooking,
    activeView,
    setActiveView,
    showQrModal,
    setShowQrModal,
    selectedOperatoryTab,
    setSelectedOperatoryTab,
    setStep,
    selectService,
    selectDentist,
    selectDate,
    selectSlot,
    updatePatientField,
    togglePreference,
    confirmBooking,
    resetBooking,
  };
}
