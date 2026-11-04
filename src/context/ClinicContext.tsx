import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClinicAppointment, DentalTreatment, DoctorSession } from '../types/clinic';
import { Language, Translations, translations } from '../i18n/translations';

export const INITIAL_TREATMENTS: DentalTreatment[] = [
  {
    id: 'trt-routine',
    name: 'Routine Checkup & Deep Clean',
    category: 'Preventive Care',
    description: 'Ultrasonic scaling, 4 digital bitewing x-rays, oral cancer screen, and enamel fluoridation.',
    duration: '60 mins',
    price: 185,
    estimatedCopay: '$0.00 – $35.00',
    tag: '100% PPO Covered',
    icon: 'sparkles',
  },
  {
    id: 'trt-emergency',
    name: 'Emergency Tooth Pain Relief',
    category: 'Urgent Care',
    description: 'Immediate diagnostic x-ray, pulpal sensitivity evaluation, and same-day infection/pain management.',
    duration: '45 mins',
    price: 140,
    estimatedCopay: '$15.00 – $40.00',
    tag: 'Same-Day Priority',
    icon: 'zap',
  },
  {
    id: 'trt-whitening',
    name: 'Cosmetic Teeth Whitening',
    category: 'Aesthetic Dentistry',
    description: 'In-office Philips Zoom WhiteSpeed® laser session. Lightens teeth up to 8 shades in 45 minutes.',
    duration: '45 mins',
    price: 290,
    estimatedCopay: '$290 (Elective)',
    tag: 'Popular',
    icon: 'smile',
  },
  {
    id: 'trt-invisalign',
    name: 'Invisalign® 3D Scan & Consult',
    category: 'Orthodontics',
    description: 'High-precision iTero® intraoral 3D scan, AI teeth movement simulation, and custom clear aligner plan.',
    duration: '30 mins',
    price: 0,
    estimatedCopay: 'Free Consultation',
    tag: 'Complimentary',
    icon: 'scan',
  },
  {
    id: 'trt-crown-implant',
    name: 'Restorative Crown & Implant Consult',
    category: 'Restorative',
    description: '3D CBCT digital bone density scan, zirconia crown evaluation, and implant placement roadmap.',
    duration: '60 mins',
    price: 210,
    estimatedCopay: '$0.00 – $65.00',
    tag: 'Insurance Eligible',
    icon: 'shield-check',
  },
];

export const TELUGU_TREATMENTS: Record<string, Partial<DentalTreatment>> = {
  'trt-routine': {
    name: 'రొటీన్ చెకప్ & డీప్ క్లీన్',
    category: 'నివారణ సంరక్షణ',
    description: 'అల్ట్రాసోనిక్ స్కేలింగ్, 4 డిజిటల్ ఎక్స్-రేలు, నోటి క్యాన్సర్ స్క్రీనింగ్ మరియు ఎనామెల్ ఫ్లోరైడేషన్.',
    duration: '60 నిమిషాలు',
    estimatedCopay: '₹0.00 – ₹35.00',
    tag: '100% PPO వర్తిస్తుంది',
  },
  'trt-emergency': {
    name: 'అత్యవసర పంటి నొప్పి ఉపశమనం',
    category: 'అత్యవసర సంరక్షణ',
    description: 'తక్షణ రోగనిర్ధారణ ఎక్స్-రే, పంటి సున్నితత్వ పరీక్ష, మరియు అదే రోజు ఇన్ఫెక్షన్/నొప్పి నిర్వహణ.',
    duration: '45 నిమిషాలు',
    estimatedCopay: '₹15.00 – ₹40.00',
    tag: 'అదే రోజు ప్రాధాన్యత',
  },
  'trt-whitening': {
    name: 'కాస్మెటిక్ దంతాల తెల్లబడటం',
    category: 'సౌందర్య దంతవైద్యం',
    description: 'ఫిలిప్స్ జూమ్ వైట్‌స్పీడ్ లేజర్ సెషన్. కేవలం 45 నిమిషాల్లో 8 షేడ్స్ వరకు తెల్లగా మార్చండి.',
    duration: '45 నిమిషాలు',
    estimatedCopay: '₹290 (ఎలెక్టివ్)',
    tag: 'ప్రముఖమైనది',
  },
  'trt-invisalign': {
    name: 'ఇన్విసలైన్® 3D స్కాన్ & సంప్రదింపు',
    category: 'ఆర్థోడాంటిక్స్',
    description: 'ఖచ్చితమైన 3D ఇంట్రాఓరల్ స్కాన్, AI దంతాల కదలిక అనుకరణ మరియు వ్యక్తిగతీకరించిన అలైనర్ ప్రణాళిక.',
    duration: '30 నిమిషాలు',
    estimatedCopay: 'ఉచిత సంప్రదింపు',
    tag: 'కాంప్లిమెంటరీ',
  },
  'trt-crown-implant': {
    name: 'క్రౌన్ & ఇంప్లాంట్ సంప్రదింపు',
    category: 'పునరుద్ధరణ చికిత్స',
    description: '3D డిజిటల్ ఎముక సాంద్రత స్కాన్, జిర్కోనియా క్రౌన్ మూల్యాంకనం మరియు డెంటల్ ఇంప్లాంట్ రోడ్‌మ్యాప్.',
    duration: '60 నిమిషాలు',
    estimatedCopay: '₹0.00 – ₹65.00',
    tag: 'బీమా అర్హత',
  },
};

export const INITIAL_APPOINTMENTS: ClinicAppointment[] = [
  {
    id: 'LUM-88201',
    patientName: 'Alexander Hayes',
    patientPhone: '(555) 438-9210',
    patientEmail: 'a.hayes@caltech.edu',
    patientAge: 32,
    patientGender: 'Male',
    treatmentId: 'trt-emergency',
    treatmentName: 'Emergency Tooth Pain Relief',
    price: 140,
    doctorId: 'dentist-jenkins',
    doctorName: 'Dr. Sarah Jenkins, DDS',
    date: 'Today, Oct 24',
    timeSlot: '10:45 AM',
    operatory: 'Operatory 1 (Panoramic Suite)',
    status: 'In Chair',
    chiefComplaint: 'Sharp sensitivity to ice water and chewing on lower left molar (#19) for 5 days. Occasional throbbing discomfort at night.',
    toothNumbers: '#19 (Lower Left 1st Molar)',
    painScale: 7,
    medicalAlerts: ['Penicillin Allergy (Anaphylaxis)', 'Mild Asthma'],
    insuranceCarrier: 'Delta Dental Premier / PPO',
    memberId: 'DEL-8820194',
    createdAt: '2024-10-24T08:15:00Z',
    doctorNotes: 'Pre-op radiograph indicates deep distal decay approaching pulp horn on #19. Excavate decay, evaluate pulpal status for composite vs onlay.',
    preferences: {
      nitrousOxide: true,
      boseHeadphones: true,
      gentleNumbing: true,
      quietOperatory: true,
    },
  },
  {
    id: 'LUM-88202',
    patientName: 'Elena Rostova',
    patientPhone: '(555) 712-4091',
    patientEmail: 'elena.rostova@designworks.io',
    patientAge: 29,
    patientGender: 'Female',
    treatmentId: 'trt-whitening',
    treatmentName: 'Cosmetic Teeth Whitening',
    price: 290,
    doctorId: 'dentist-jenkins',
    doctorName: 'Dr. Sarah Jenkins, DDS',
    date: 'Today, Oct 24',
    timeSlot: '11:45 AM',
    operatory: 'Operatory 1 (Panoramic Suite)',
    status: 'Next Up',
    chiefComplaint: 'Enamel shade brightening ahead of wedding photos in 3 weeks. Reports mild cold sensitivity on maxillary incisors.',
    toothNumbers: '#6 to #11 (Upper Anterior)',
    painScale: 2,
    medicalAlerts: ['Slight cold sensitivity on anterior teeth'],
    insuranceCarrier: 'MetLife Dental PPO',
    memberId: 'MET-4410982',
    createdAt: '2024-10-24T09:00:00Z',
    doctorNotes: 'Pre-treatment shade measured at A3. Apply Relief ACP desensitizing gel prior to Zoom 3-cycle session.',
    preferences: {
      nitrousOxide: false,
      boseHeadphones: true,
      gentleNumbing: false,
      quietOperatory: false,
    },
  },
  {
    id: 'LUM-88203',
    patientName: 'Marcus Vance',
    patientPhone: '(555) 890-3341',
    patientEmail: 'm.vance@soundlab.org',
    patientAge: 45,
    patientGender: 'Male',
    treatmentId: 'trt-crown-implant',
    treatmentName: 'Restorative Crown & Implant Consult',
    price: 210,
    doctorId: 'dentist-jenkins',
    doctorName: 'Dr. Sarah Jenkins, DDS',
    date: 'Today, Oct 24',
    timeSlot: '01:30 PM',
    operatory: 'Operatory 1 (Panoramic Suite)',
    status: 'Arrived / Checked In',
    chiefComplaint: 'Old amalgam filling cracked on upper right premolar (#4) while eating almonds. Rough edge cutting into cheek mucosa.',
    toothNumbers: '#4 (Upper Right 2nd Premolar)',
    painScale: 4,
    medicalAlerts: ['High Blood Pressure (Well-controlled on Lisinopril)'],
    insuranceCarrier: 'Cigna Total Dental PPO',
    memberId: 'CIG-993215',
    createdAt: '2024-10-24T09:45:00Z',
    doctorNotes: 'Fractured lingual cusp on #4. Assess margin supragingival vs subgingival for monolithic zirconia crown.',
    preferences: {
      nitrousOxide: false,
      boseHeadphones: false,
      gentleNumbing: true,
      quietOperatory: true,
    },
  },
  {
    id: 'LUM-88204',
    patientName: 'Sophia Lin',
    patientPhone: '(555) 321-7789',
    patientEmail: 'sophia.lin@bioresearch.com',
    patientAge: 38,
    patientGender: 'Female',
    treatmentId: 'trt-routine',
    treatmentName: 'Routine Checkup & Deep Clean',
    price: 185,
    doctorId: 'dentist-jenkins',
    doctorName: 'Dr. Sarah Jenkins, DDS',
    date: 'Today, Oct 24',
    timeSlot: '02:45 PM',
    operatory: 'Operatory 1 (Panoramic Suite)',
    status: 'Arrived / Checked In',
    chiefComplaint: '6-month preventive recall checkup. Light bleeding along lower front gumline during flossing.',
    toothNumbers: '#24 - #26 (Lower Anterior Lingual)',
    painScale: 1,
    medicalAlerts: ['Latex Sensitivity (Use nitrile gloves exclusively)'],
    insuranceCarrier: 'Guardian DentalGuard Preferred',
    memberId: 'GUA-771239',
    createdAt: '2024-10-24T10:10:00Z',
    doctorNotes: 'Routine recall prophy, full mouth periodontal charting, 4 horizontal bitewings.',
    preferences: {
      nitrousOxide: false,
      boseHeadphones: true,
      gentleNumbing: true,
      quietOperatory: true,
    },
  },
  {
    id: 'LUM-88200',
    patientName: 'David Chen',
    patientPhone: '(555) 654-1122',
    patientEmail: 'dchen@baytech.io',
    patientAge: 51,
    patientGender: 'Male',
    treatmentId: 'trt-crown-implant',
    treatmentName: 'Restorative Crown & Implant Consult',
    price: 210,
    doctorId: 'dentist-jenkins',
    doctorName: 'Dr. Sarah Jenkins, DDS',
    date: 'Today, Oct 24',
    timeSlot: '09:00 AM',
    operatory: 'Operatory 1 (Panoramic Suite)',
    status: 'Completed',
    chiefComplaint: 'Final seat and occlusal check for custom zirconia crown on #30.',
    toothNumbers: '#30 (Lower Right 1st Molar)',
    painScale: 0,
    medicalAlerts: ['None'],
    insuranceCarrier: 'Delta Dental Premier',
    memberId: 'DEL-551029',
    createdAt: '2024-10-24T07:30:00Z',
    doctorNotes: 'Crown cemented with RelyX Luting Plus. Occlusion verified with shimstock. Patient thrilled with contact and contour.',
    preferences: {
      nitrousOxide: false,
      boseHeadphones: false,
      gentleNumbing: false,
      quietOperatory: false,
    },
  },
];

export interface BookAppointmentInput {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge?: number;
  treatmentId: string;
  date: string;
  timeSlot: string;
  chiefComplaint?: string;
  medicalAlerts?: string[];
  insuranceCarrier?: string;
  preferences?: {
    nitrousOxide?: boolean;
    boseHeadphones?: boolean;
    gentleNumbing?: boolean;
    quietOperatory?: boolean;
  };
}

export interface ClinicContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
  translations: Translations;
  treatments: DentalTreatment[];
  appointments: ClinicAppointment[];
  doctorSession: DoctorSession;
  activeTab: 'home' | 'booking' | 'doctor' | 'profile';
  selectedTreatmentForBooking: string;
  setActiveTab: (tab: 'home' | 'booking' | 'doctor' | 'profile') => void;
  setSelectedTreatmentForBooking: (id: string) => void;
  doctorLogin: (email: string, password?: string) => boolean;
  doctorLogout: () => void;
  bookAppointment: (input: BookAppointmentInput) => ClinicAppointment;
  updateAppointmentStatus: (
    id: string,
    status: 'Arrived / Checked In' | 'Next Up' | 'In Chair' | 'Completed' | 'Cancelled'
  ) => void;
  updateDoctorNotes: (id: string, notes: string) => void;
}

const ClinicContext = createContext<ClinicContextValue | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('lumina_language') as Language;
    return saved === 'te' ? 'te' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lumina_language', lang);
  };

  const t = (key: keyof Translations): string => {
    return translations[language][key] || translations.en[key] || '';
  };

  const currentTranslations = translations[language];

  // Return localized treatments
  const localizedTreatments: DentalTreatment[] = INITIAL_TREATMENTS.map((t) => {
    if (language === 'te' && TELUGU_TREATMENTS[t.id]) {
      return {
        ...t,
        ...TELUGU_TREATMENTS[t.id],
      };
    }
    return t;
  });

  const [appointments, setAppointments] = useState<ClinicAppointment[]>(() => {
    const saved = localStorage.getItem('lumina_appointments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved appointments', e);
      }
    }
    return INITIAL_APPOINTMENTS;
  });

  const [doctorSession, setDoctorSession] = useState<DoctorSession>(() => {
    const saved = localStorage.getItem('lumina_doctor_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved doctor session', e);
      }
    }
    return {
      isAuthenticated: false,
      doctorName: 'Dr. Sarah Jenkins, DDS',
      email: 'doctor@lumina.com',
      role: 'Lead Clinician',
      operatory: 'Operatory 1 (Panoramic Suite)',
    };
  });

  const [activeTab, setActiveTab] = useState<'home' | 'booking' | 'doctor' | 'profile'>('home');
  const [selectedTreatmentForBooking, setSelectedTreatmentForBooking] = useState<string>('trt-routine');

  // Persist appointments to localStorage for seamless live refresh
  useEffect(() => {
    localStorage.setItem('lumina_appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Persist doctor session
  useEffect(() => {
    localStorage.setItem('lumina_doctor_session', JSON.stringify(doctorSession));
  }, [doctorSession]);

  const doctorLogin = (email: string, _password?: string): boolean => {
    // Only one login needed for the doctor
    // Accepts "doctor@lumina.com" or any doctor email, with or without password
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail.includes('doctor') || normalizedEmail.includes('jenkins') || normalizedEmail === 'doctor@lumina.com') {
      const session: DoctorSession = {
        isAuthenticated: true,
        doctorName: 'Dr. Sarah Jenkins, DDS',
        email: 'doctor@lumina.com',
        role: 'Lead Clinician',
        operatory: 'Operatory 1 (Panoramic Suite)',
      };
      setDoctorSession(session);
      return true;
    }
    // Also accept any valid input to make doctor sign in smooth
    const session: DoctorSession = {
      isAuthenticated: true,
      doctorName: 'Dr. Sarah Jenkins, DDS',
      email: email || 'doctor@lumina.com',
      role: 'Lead Clinician',
      operatory: 'Operatory 1 (Panoramic Suite)',
    };
    setDoctorSession(session);
    return true;
  };

  const doctorLogout = () => {
    setDoctorSession({
      isAuthenticated: false,
      doctorName: 'Dr. Sarah Jenkins, DDS',
      email: 'doctor@lumina.com',
      role: 'Lead Clinician',
      operatory: 'Operatory 1 (Panoramic Suite)',
    });
    setActiveTab('home');
  };

  const bookAppointment = (input: BookAppointmentInput): ClinicAppointment => {
    const treatment =
      INITIAL_TREATMENTS.find((t) => t.id === input.treatmentId) || INITIAL_TREATMENTS[0];
    const newId = `LUM-${Math.floor(10000 + Math.random() * 90000)}`;

    const newAppointment: ClinicAppointment = {
      id: newId,
      patientName: input.patientName || 'Guest Patient',
      patientPhone: input.patientPhone || '(555) 000-0000',
      patientEmail: input.patientEmail || 'patient@example.com',
      patientAge: input.patientAge || 30,
      patientGender: 'Other',
      treatmentId: treatment.id,
      treatmentName: treatment.name,
      price: treatment.price,
      doctorId: 'dentist-jenkins',
      doctorName: 'Dr. Sarah Jenkins, DDS',
      date: input.date || 'Today, Oct 24',
      timeSlot: input.timeSlot || '03:45 PM',
      operatory: 'Operatory 1 (Panoramic Suite)',
      status: 'Next Up',
      chiefComplaint:
        input.chiefComplaint ||
        `Booked online: ${treatment.name}. Patient requested comfort check and initial consultation.`,
      toothNumbers: 'General / Full Arch',
      painScale: input.chiefComplaint?.toLowerCase().includes('pain') ? 6 : 1,
      medicalAlerts: input.medicalAlerts && input.medicalAlerts.length > 0 ? input.medicalAlerts : ['None reported'],
      insuranceCarrier: input.insuranceCarrier || 'Delta Dental / Self-Pay',
      memberId: `ONL-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      isNewBooking: true,
      preferences: input.preferences || {
        nitrousOxide: false,
        boseHeadphones: true,
        gentleNumbing: true,
        quietOperatory: true,
      },
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    return newAppointment;
  };

  const updateAppointmentStatus = (
    id: string,
    status: 'Arrived / Checked In' | 'Next Up' | 'In Chair' | 'Completed' | 'Cancelled'
  ) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status, isNewBooking: false } : apt))
    );
  };

  const updateDoctorNotes = (id: string, notes: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, doctorNotes: notes } : apt))
    );
  };

  return (
    <ClinicContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translations: currentTranslations,
        treatments: localizedTreatments,
        appointments,
        doctorSession,
        activeTab,
        selectedTreatmentForBooking,
        setActiveTab,
        setSelectedTreatmentForBooking,
        doctorLogin,
        doctorLogout,
        bookAppointment,
        updateAppointmentStatus,
        updateDoctorNotes,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = (): ClinicContextValue => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};

