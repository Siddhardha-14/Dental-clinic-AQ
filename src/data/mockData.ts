export interface DentalService {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly duration: string;
  readonly price: number;
  readonly tag?: string;
  readonly badgeType?: 'popular' | 'emergency' | 'simulation' | 'free' | 'insurance';
  readonly insuranceNote: string;
  readonly featureLabel: string;
}

export interface Clinician {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly credentials: string;
  readonly bio: string;
  readonly rating: number;
  readonly reviewsCount: number;
  readonly operatory: string;
  readonly photoUrl: string;
}

export interface TimeSlot {
  readonly id: string;
  readonly time: string;
  readonly period: 'morning' | 'afternoon';
  readonly isAvailable: boolean;
}

export interface BookingState {
  readonly step: number; // 1 to 4
  readonly selectedServiceId: string;
  readonly selectedDentistId: string;
  readonly selectedDate: string; // YYYY-MM-DD
  readonly selectedSlot: string; // "10:45 AM"
  readonly patientType: 'new' | 'returning';
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
  readonly dateOfBirth: string;
  readonly insuranceCarrier: string;
  readonly memberId: string;
  readonly groupNumber: string;
  readonly preferences: {
    readonly nitrousOxide: boolean;
    readonly wheelchair: boolean;
    readonly quietOperatory: boolean;
  };
  readonly bookingRef: string;
  readonly isConfirmed: boolean;
}

export const initialBookingState: BookingState = {
  step: 1,
  selectedServiceId: 'service-routine-checkup',
  selectedDentistId: 'dentist-jenkins',
  selectedDate: '2024-10-24',
  selectedSlot: '10:45 AM',
  patientType: 'new',
  firstName: 'Alexander',
  lastName: 'Hayes',
  phone: '(555) 438-9210',
  email: 'a.hayes@caltech.edu',
  dateOfBirth: '1992-06-14',
  insuranceCarrier: 'Delta Dental Premier / PPO',
  memberId: 'DEL-8820194',
  groupNumber: 'GRP-10492',
  preferences: {
    nitrousOxide: false,
    wheelchair: false,
    quietOperatory: true,
  },
  bookingRef: 'LUM-84920-SF',
  isConfirmed: false,
};

export const dentalServices: readonly DentalService[] = [
  {
    id: 'service-routine-checkup',
    name: 'Routine Checkup & Deep Clean',
    category: 'Preventative Care',
    description: 'Ultrasonic scaling, 4 bite-wing HD digital x-rays, polishing & fluoride treatment',
    duration: '60 mins',
    price: 185,
    tag: 'Most Popular',
    badgeType: 'popular',
    insuranceNote: 'or 100% PPO Covered',
    featureLabel: 'Low-dose imaging',
  },
  {
    id: 'service-emergency',
    name: 'Tooth Pain or Emergency',
    category: 'Emergency Triage',
    description: 'Severe pain, chipped/broken tooth, crown displacement or swelling triage',
    duration: '45 mins',
    price: 140,
    tag: 'Same-Day Priority',
    badgeType: 'emergency',
    insuranceNote: 'Immediate pain relief',
    featureLabel: 'On-call triage slot',
  },
  {
    id: 'service-cosmetic',
    name: 'Cosmetic Whitening & Aesthetics',
    category: 'Aesthetic Dentistry',
    description: 'Philips Zoom! laser whitening, custom ceramic veneer consult, smile design studio',
    duration: '45 mins',
    price: 290,
    tag: 'Free 3D Simulation',
    badgeType: 'simulation',
    insuranceNote: 'Consultation included',
    featureLabel: 'Instant preview',
  },
  {
    id: 'service-invisalign',
    name: 'Invisalign® & Orthodontic Exam',
    category: 'Orthodontics',
    description: 'iTero® high-res optical mouth scan, full bite analysis & personalized alignment plan',
    duration: '30 mins',
    price: 0,
    tag: 'Complimentary',
    badgeType: 'free',
    insuranceNote: 'No commitment',
    featureLabel: '3D scanner',
  },
  {
    id: 'service-restorative',
    name: 'Restorative, Crowns & Dental Implants',
    category: 'Surgical & Restorative',
    description: 'Ceramic crown replacement, bone evaluation, bio-compatible titanium implants',
    duration: '60 mins',
    price: 210,
    tag: 'Insurance Eligible',
    badgeType: 'insurance',
    insuranceNote: 'Insurance deductible eligible',
    featureLabel: 'CBCT 3D Scan',
  },
];

export const clinicians: readonly Clinician[] = [
  {
    id: 'dentist-jenkins',
    name: 'Dr. Sarah Jenkins, DDS',
    role: 'Lead Dental Surgeon',
    credentials: 'DDS, FAGD • Lead Clinician',
    bio: '14 yrs clinical experience. Restorative & general specialist.',
    rating: 4.97,
    reviewsCount: 412,
    operatory: 'Operatory 1 (Panoramic Suite)',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4ukVnEIoCKiIyOMpEivY18TBAx1bx4z1PlKpqjNX25qomLO8PM6g0Hyxm3waj7BFXnx3LfQ7K_MVyU9RkIPvQwI8S954p0z2TFg-vqd2_ef8lWvLnaxfCURnSLCsZejL0zr5btCPVlWWLjHqPrEI1nazpzTBC_iL4_pBY7ev4EO7ytkbFq5nQIG8fW2xpNsXdEOe4i02IvnYGcoDEMAXRyRPrQq8jjSvlgeJjB7eO',
  },
  {
    id: 'dentist-thorne',
    name: 'Dr. Liam Thorne, DDS',
    role: 'Diamond Orthodontist',
    credentials: 'DDS • Orthodontic Specialist',
    bio: 'Specialist in clear aligners, TMJ therapy & cosmetic bite re-alignment.',
    rating: 4.94,
    reviewsCount: 338,
    operatory: 'Operatory 2 (Ortho Suite)',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUBG4mEDXCXRtGPQ1-UMDcQGPzx1r7QXkrmDUJWUKsL3sVPqFJf2McYGml5OmWI_1xHJdE4uTdq4EiX8YvXaOM5S8e5mwEvd_CGOoCoY6C7pXBUbwB-Q87v5tE99PvPVQC7glJozevWQpJ-VJuP319WfYt8AxOFgNoLDJDdOy4ITDCA5ieHkpDWZa_k0XS0-4NYkOCtUgE1zMq2XoSUM498xV3sG4vLxU2KvYl206g',
  },
  {
    id: 'dentist-bennett',
    name: 'Chloe Bennett, RDH',
    role: 'Senior Dental Hygienist',
    credentials: 'RDH • Preventive Health Specialist',
    bio: 'Gentle touch preventive care, periodontal scaling & laser bleaching.',
    rating: 4.99,
    reviewsCount: 520,
    operatory: 'Operatory 3 (Hygiene Suite)',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVpxnYL-xwvzHM3B1CvLWvpkG1XHzFkZAtabVqHKakDMwBZnJm2MwSoOWsZOiVk-uteQRm8KOQzYzKuCFTtdsiHxPIs79p9mD8h8pNJPUCnhfWZz3r6lRd1W2ZLDZ1H6N5rgu_c0O5WrPU7VKKF5LRV_ck5craQ1z1lpi2mDDPH9OQftQK5EHn8T54VyMkXkbFjZvJCJh9OxTZ6N0JBypLaG69wh3kAOocgveLf_AV',
  },
];

export const morningSlots: readonly TimeSlot[] = [
  { id: 'm-1', time: '08:30 AM', period: 'morning', isAvailable: true },
  { id: 'm-2', time: '09:15 AM', period: 'morning', isAvailable: true },
  { id: 'm-3', time: '10:45 AM', period: 'morning', isAvailable: true },
  { id: 'm-4', time: '11:30 AM', period: 'morning', isAvailable: true },
];

export const afternoonSlots: readonly TimeSlot[] = [
  { id: 'a-1', time: '01:15 PM', period: 'afternoon', isAvailable: true },
  { id: 'a-2', time: '02:00 PM', period: 'afternoon', isAvailable: true },
  { id: 'a-3', time: '03:30 PM', period: 'afternoon', isAvailable: true },
  { id: 'a-4', time: '04:15 PM', period: 'afternoon', isAvailable: true },
];

export const insuranceCarriers: readonly string[] = [
  'Delta Dental Premier / PPO',
  'MetLife Dental',
  'Cigna Dental Network',
  'Aetna Dental Access',
  'Guardian DentalGuard',
  'UnitedHealthcare Dental',
  'Self-Pay / Lumina Wellness Plan ($35/mo)',
];

export const clinicInfo = {
  name: 'Lumina Dental',
  tagline: 'Modern Clinic',
  centralAddress: '450 Sutter St, Suite 1200, San Francisco, CA 94108',
  pavilionAddress: '4500 Meridian Boulevard, Suite 320, San Francisco, CA 94158',
  phoneAppointments: '(555) 234-8900',
  phoneEmergency: '(555) 234-8901',
  email: 'care@luminadental.com',
  rating: 4.9,
  reviewsCount: '1,420+',
  timingsWeekday: '7:30 AM – 6:00 PM',
  timingsFriday: '8:00 AM – 4:00 PM',
  timingsSaturday: '8:30 AM – 1:00 PM',
  timingsSunday: 'Closed (Emergency On-Call)',
};
