/**
 * Core Domain Types for Lumina Dental Clinic & Doctor Portal
 */

export interface DentalTreatment {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly duration: string;
  readonly price: number;
  readonly estimatedCopay: string;
  readonly tag?: string;
  readonly icon: string;
}

export interface ClinicAppointment {
  readonly id: string;
  readonly patientName: string;
  readonly patientPhone: string;
  readonly patientEmail: string;
  readonly patientAge?: number;
  readonly patientGender?: 'Male' | 'Female' | 'Other';
  readonly treatmentId: string;
  readonly treatmentName: string;
  readonly price: number;
  readonly doctorId: string;
  readonly doctorName: string;
  readonly date: string; // e.g. "Today, Oct 24" or "Tomorrow, Oct 25"
  readonly timeSlot: string; // e.g. "10:45 AM"
  readonly operatory: string; // e.g. "Operatory 1 (Panoramic Suite)"
  readonly status: 'Arrived / Checked In' | 'Next Up' | 'In Chair' | 'Completed' | 'Cancelled';
  readonly chiefComplaint: string;
  readonly toothNumbers?: string;
  readonly painScale?: number; // 0 - 10
  readonly medicalAlerts?: readonly string[];
  readonly insuranceCarrier?: string;
  readonly memberId?: string;
  readonly createdAt: string;
  readonly doctorNotes?: string;
  readonly isNewBooking?: boolean;
  readonly preferences?: {
    readonly nitrousOxide?: boolean;
    readonly boseHeadphones?: boolean;
    readonly gentleNumbing?: boolean;
    readonly quietOperatory?: boolean;
  };
}

export interface DoctorSession {
  readonly isAuthenticated: boolean;
  readonly doctorName: string;
  readonly email: string;
  readonly role: string;
  readonly operatory: string;
}
