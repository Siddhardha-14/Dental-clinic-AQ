export type Language = 'en' | 'te';

export interface Translations {
  // Navigation
  brandName: string;
  brandTagline: string;
  navHome: string;
  navBook: string;
  navAi: string;
  navEmergency: string;
  bookVisit: string;
  patientProfile: string;
  doctorProfile: string;
  languageName: string;

  // Hero Section
  heroPill: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  bookApptBtn: string;
  askAiBtn: string;
  ratingReviews: string;
  zeroWait: string;
  zeroWaitSub: string;
  noSurprises: string;
  noSurprisesSub: string;
  sameDay: string;
  sameDaySub: string;

  // Doctor Card
  doctorName: string;
  doctorRole: string;
  inClinicToday: string;
  eduTitle: string;
  eduSub: string;
  anxietyTitle: string;
  anxietySub: string;
  insuranceTitle: string;
  insuranceSub: string;
  selectSlotBtn: string;

  // Menu Section
  menuPill: string;
  menuTitle: string;
  menuSubtitle: string;
  reserveBtn: string;
  estimatedCopay: string;

  // Assurance
  assurance1Title: string;
  assurance1Desc: string;
  assurance2Title: string;
  assurance2Desc: string;
  assurance3Title: string;
  assurance3Desc: string;

  // Booking Flow
  bookingPill: string;
  bookingTitle: string;
  bookingSubtitle: string;
  scheduleNoticePill: string;
  scheduleNoticeTitle: string;
  scheduleNoticeDesc: string;
  scheduleEmergencyCall: string;
  allSessionsFilter: string;
  wednesdaysOnlyFilter: string;
  thursdaysOnlyFilter: string;
  slotsOpenBadge: string;
  selectedSessionPrompt: string;
  step1Title: string;
  step1Sub: string;
  step2Title: string;
  step2Sub: string;
  availableDates: string;
  morningSlots: string;
  afternoonSlots: string;
  eveningSlots: string;
  step3Title: string;
  step3Sub: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  symptomLabel: string;
  symptomPlaceholder: string;
  comfortPrefsTitle: string;
  prefHeadphones: string;
  prefNitrous: string;
  prefPenicillin: string;
  prefAnxiety: string;
  step4Title: string;
  step4Sub: string;
  hipaaBadge: string;
  confirmBtn: string;
  confirmGuarantee: string;

  // Confirmed Pass
  passConfirmedBadge: string;
  passConfirmedTitle: string;
  passConfirmedSub: string;
  passIdLabel: string;
  passProcedure: string;
  passClinician: string;
  passWhen: string;
  passLocation: string;
  bookAnotherBtn: string;
  printPassBtn: string;
  returnHomeBtn: string;

  // Doctor Portal / Profile
  profileTitle: string;
  profileSubtitle: string;
  doctorLoginTitle: string;
  doctorLoginSubtitle: string;
  oneTapDoctorBtn: string;
  oneTapDoctorSub: string;
  orEnterCreds: string;
  emailFieldLabel: string;
  passwordFieldLabel: string;
  signInBtn: string;
  openScheduleBtn: string;
  signOutBtn: string;
  activeDoctorSession: string;
  todaysPatientsTitle: string;
  totalToday: string;
  inChair: string;
  nextUp: string;
  completed: string;
  seatInChairBtn: string;
  markCompletedBtn: string;
  clinicalNotesTitle: string;
  addNoteBtn: string;
  editNoteBtn: string;
  saveNoteBtn: string;
  cancelBtn: string;
  searchPlaceholder: string;
  scheduleMatrixTitle: string;
  scheduleMatrixSub: string;
  openSlotBadge: string;
  bookedSlotBadge: string;
  quickBookSlotBtn: string;
  selectedSlotTimeLabel: string;
  wednesdaySessionTab: string;
  thursdaySessionTab: string;

  // AI Modal
  aiTitle: string;
  aiSubtitle: string;
  aiBadge: string;
  aiWelcome: string;
  aiInputPlaceholder: string;
  aiBookVisitBtn: string;
  aiThinking: string;

  // Footer
  footerDesc: string;
  footerAccreditation: string;
  locationTitle: string;
  hoursTitle: string;
  urgentCareTitle: string;
  emergencyHotlineTitle: string;
  emergencySub: string;
  quickNavTitle: string;
  copyrightText: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    brandName: 'Lumina',
    brandTagline: 'Gentle & Modern Care',
    navHome: 'Home',
    navBook: 'Book Appointment',
    navAi: 'Ask Dental AI',
    navEmergency: 'Emergency (555) 234-8901',
    bookVisit: 'Book Visit',
    patientProfile: 'Profile & Doctor Login',
    doctorProfile: 'Doctor Profile (Dr. Sarah Jenkins)',
    languageName: 'English',

    // Hero Section
    heroPill: 'Accepting New Patients · Same-Day Emergency Relief',
    heroTitle1: 'Modern Dentistry Designed Around Your ',
    heroTitleHighlight: 'Comfort & Peace of Mind',
    heroSubtitle:
      'Experience anxiety-free dental care with 3D digital intraoral scanning, heated massage chairs, Bose noise-canceling audio, and 100% upfront pricing. No wait times, no surprise bills.',
    bookApptBtn: 'Book Your Appointment',
    askAiBtn: 'Ask Dental AI Concierge',
    ratingReviews: '1,420+ Reviews',
    zeroWait: 'Zero Wait',
    zeroWaitSub: 'Under 3 min seating',
    noSurprises: 'No Surprises',
    noSurprisesSub: '100% Upfront Copay',
    sameDay: 'Same-Day',
    sameDaySub: 'Urgent Pain Relief',

    // Doctor Card
    doctorName: 'Dr. Sarah Jenkins, DDS',
    doctorRole: 'Lead Aesthetic & Restorative Clinician',
    inClinicToday: 'In Clinic Today',
    eduTitle: 'Harvard School of Dental Medicine',
    eduSub: 'Fellow of the Academy of General Dentistry (FAGD)',
    anxietyTitle: 'Anxiety-Free Operatory Suite',
    anxietySub: 'Bose headphones, warm lavender towels & nitrous oxide on demand',
    insuranceTitle: 'All Major Dental PPOs Accepted',
    insuranceSub: 'Delta Dental, MetLife, Cigna, Guardian, Aetna',
    selectSlotBtn: 'Select Date & Time Slot',

    // Menu Section
    menuPill: 'Comprehensive Clinical Menu',
    menuTitle: 'Popular Dental Treatments',
    menuSubtitle:
      'Select a service below to immediately jump into our instant booking flow with real-time doctor availability.',
    reserveBtn: 'Reserve',
    estimatedCopay: 'Estimated Copay',

    // Assurance
    assurance1Title: 'Painless Anesthesia Protocol',
    assurance1Desc:
      'Computer-controlled Wand dental anesthesia delivers gentle, localized numbing without the needle pinch or facial droop.',
    assurance2Title: 'Zero Gooey Impressions',
    assurance2Desc:
      'Our optical 3D intraoral scanner renders photorealistic digital impressions of your teeth in under 60 seconds with micron accuracy.',
    assurance3Title: 'Zero Wait Seating',
    assurance3Desc:
      'We respect your schedule. Our private operatory suites are prepared in advance so you are seated promptly within 3 minutes.',

    // Booking Flow
    bookingPill: 'Real-Time Doctor Availability',
    bookingTitle: 'Reserve Your Dental Visit',
    bookingSubtitle:
      'Follow the simple steps below. Your appointment confirms immediately with zero cancellation fees up to 24h prior.',
    scheduleNoticePill: 'Clinical Operating Days: Wednesdays & Thursdays',
    scheduleNoticeTitle: 'Dr. Sarah Jenkins In-Person Clinical Sessions',
    scheduleNoticeDesc:
      'In-person clinical procedures, surgeries, and comprehensive examinations are conducted exclusively on Wednesdays and Thursdays. 24/7 on-call triage remains active for acute dental emergencies.',
    scheduleEmergencyCall: 'Call 24/7 Urgent Line: (555) 234-8901',
    allSessionsFilter: 'All Available Sessions',
    wednesdaysOnlyFilter: 'Wednesdays Only',
    thursdaysOnlyFilter: 'Thursdays Only',
    slotsOpenBadge: 'slots open',
    selectedSessionPrompt: 'Selected Clinical Session',
    step1Title: 'Choose Treatment or Concern',
    step1Sub: 'Select the primary service needed for your visit',
    step2Title: 'Select Date & Time (Wed & Thu Only)',
    step2Sub: 'With Dr. Sarah Jenkins, DDS (Panoramic Suite 1)',
    availableDates: 'Upcoming Clinical Dates (Wednesdays & Thursdays)',
    morningSlots: 'Morning Sessions',
    afternoonSlots: 'Afternoon Sessions',
    eveningSlots: 'Evening Sessions',
    step3Title: 'Patient Details & Reason for Visit',
    step3Sub: 'Helps Dr. Jenkins prepare your care plan in advance',
    fullNameLabel: 'Full Name *',
    fullNamePlaceholder: 'e.g. Maya Ramirez',
    phoneLabel: 'Mobile Phone (SMS Reminders) *',
    phonePlaceholder: '(555) 000-0000',
    emailLabel: 'Email Address',
    emailPlaceholder: 'name@example.com',
    symptomLabel: 'What brings you in? (Symptoms, tooth pain, or goals)',
    symptomPlaceholder: 'e.g. Sensitivity to cold water on upper right tooth, or regular 6-month checkup.',
    comfortPrefsTitle: 'Comfort & Clinical Preferences',
    prefHeadphones: 'Bose Headphones',
    prefNitrous: 'Nitrous Oxide Gas',
    prefPenicillin: 'Penicillin Allergy',
    prefAnxiety: 'Dental Anxiety',
    step4Title: 'Review & Confirm Booking',
    step4Sub: 'Final Step · Instant Reservation',
    hipaaBadge: 'HIPAA Encrypted & 100% Guaranteed',
    confirmBtn: 'Confirm & Reserve Appointment',
    confirmGuarantee:
      'Free rescheduling & cancellations up to 24h prior · Confirmation sent via SMS & Email',

    // Confirmed Pass
    passConfirmedBadge: 'Appointment Reserved · Real-Time Synced',
    passConfirmedTitle: "You're All Set",
    passConfirmedSub:
      'Your appointment is confirmed and immediately sent to Dr. Sarah Jenkins\'s live schedule.',
    passIdLabel: 'Confirmation Pass',
    passProcedure: 'Procedure',
    passClinician: 'Clinician',
    passWhen: 'When',
    passLocation: 'Location',
    bookAnotherBtn: 'Book Another Visit',
    printPassBtn: 'Print Pass',
    returnHomeBtn: 'Done & Return Home',

    // Doctor Portal / Profile
    profileTitle: 'Lumina Account & Profile',
    profileSubtitle: 'Manage your visits, dental passes, and doctor clinical sign-in.',
    doctorLoginTitle: 'Doctor Clinical Login',
    doctorLoginSubtitle: 'Exclusive staff access for Dr. Sarah Jenkins',
    oneTapDoctorBtn: '⚡ One-Tap Sign In as Dr. Sarah Jenkins',
    oneTapDoctorSub: 'Pre-authorized for Dr. Sarah Jenkins · Operatory 1',
    orEnterCreds: 'Or Enter Credentials',
    emailFieldLabel: 'Clinician Email',
    passwordFieldLabel: 'Doctor Passcode',
    signInBtn: 'Sign In to Doctor Schedule',
    openScheduleBtn: 'Open Doctor Schedule & Treatment Board',
    signOutBtn: 'Sign Out Doctor',
    activeDoctorSession: 'Active Doctor Session Verified',
    todaysPatientsTitle: "Today's Arriving Patients",
    totalToday: 'Total Today',
    inChair: 'In Chair',
    nextUp: 'Next Up / Arriving',
    completed: 'Completed',
    seatInChairBtn: 'Seat in Chair',
    markCompletedBtn: 'Mark Completed',
    clinicalNotesTitle: 'Doctor Clinical Notes',
    addNoteBtn: 'Add Note',
    editNoteBtn: 'Edit',
    saveNoteBtn: 'Save',
    cancelBtn: 'Cancel',
    searchPlaceholder: 'Search patient, tooth, or symptom...',
    scheduleMatrixTitle: 'Clinical Time Slots & Operatory Schedule',
    scheduleMatrixSub: 'Live interactive view of open and reserved appointment slots for Wednesday and Thursday operating days.',
    openSlotBadge: 'Available Slot',
    bookedSlotBadge: 'Reserved',
    quickBookSlotBtn: 'Book Slot',
    selectedSlotTimeLabel: 'Selected Slot & Time',
    wednesdaySessionTab: 'Wednesday Clinical (Operatory 1)',
    thursdaySessionTab: 'Thursday Surgical (Operatory 1)',

    // AI Modal
    aiTitle: 'Lumina Dental AI',
    aiSubtitle: 'Clinical Q&A · Instant 24/7 Guidance',
    aiBadge: 'Verified Clinical AI',
    aiWelcome:
      "Hello! I'm the Lumina Dental AI Concierge. Ask me anything about our treatments, pain-free anesthesia, insurance copays, or dental aftercare.",
    aiInputPlaceholder: 'Ask about dental procedures, whitening, pain, or pricing...',
    aiBookVisitBtn: 'Book Visit',
    aiThinking: 'Lumina AI is consulting clinical guidelines...',

    // Footer
    footerDesc:
      'Modern, gentle, and anxiety-free dental care in San Francisco. Equipped with 3D digital imaging, quiet suites, and 100% upfront copay transparency.',
    footerAccreditation: 'ADA Accredited · HIPAA Compliant',
    locationTitle: 'Location & Hours',
    hoursTitle: 'Hours of Operation',
    urgentCareTitle: 'Urgent Patient Care',
    emergencyHotlineTitle: '24/7 Emergency Line',
    emergencySub: 'Same-day relief for throbbing pain, broken teeth & trauma.',
    quickNavTitle: 'Quick Navigation',
    copyrightText: 'Lumina Dental Studio. All rights reserved.',
  },

  te: {
    // Navigation
    brandName: 'లూమినా',
    brandTagline: 'సున్నితమైన & ఆధునిక దంత సంరక్షణ',
    navHome: 'హోమ్',
    navBook: 'అపాయింట్‌మెంట్ బుకింగ్',
    navAi: 'డెంటల్ AI అడగండి',
    navEmergency: 'అత్యవసరం: (555) 234-8901',
    bookVisit: 'విజిట్ బుక్ చేయండి',
    patientProfile: 'ప్రొఫైల్ & డాక్టర్ లాగిన్',
    doctorProfile: 'డాక్టర్ ప్రొఫైల్ (డా. సారా జెంకిన్స్)',
    languageName: 'తెలుగు',

    // Hero Section
    heroPill: 'కొత్త రోగులకు స్వాగతం · అదే రోజు అత్యవసర దంత చికిత్స',
    heroTitle1: 'మీ సౌకర్యం మరియు ప్రశాంతత కోసం ',
    heroTitleHighlight: 'ఆధునిక దంత సంరక్షణ',
    heroSubtitle:
      '3D డిజిటల్ ఇంట్రాఓరల్ స్కానింగ్, వేడి మసాజ్ కుర్చీలు, బోస్ నాయిస్-క్యాన్సిలింగ్ ఆడియో మరియు 100% పారదర్శక ధరలతో ఎటువంటి భయం లేని దంత చికిత్సను అనుభవించండి.',
    bookApptBtn: 'అపాయింట్‌మెంట్ బుక్ చేయండి',
    askAiBtn: 'డెంటల్ AI ని అడగండి',
    ratingReviews: '1,420+ రోగుల సమీక్షలు',
    zeroWait: 'వేచి ఉండే సమయం సున్నా',
    zeroWaitSub: '3 నిమిషాల్లో సీటింగ్',
    noSurprises: 'ముందస్తు స్పష్టత',
    noSurprisesSub: '100% పారదర్శక కోపే',
    sameDay: 'అదే రోజు ఉపశమనం',
    sameDaySub: 'తీవ్రమైన నొప్పికి తక్షణ చికిత్స',

    // Doctor Card
    doctorName: 'డా. సారా జెంకిన్స్, DDS',
    doctorRole: 'ప్రధాన కాస్మెటిక్ & పునరుద్ధరణ దంత నిపుణురాలు',
    inClinicToday: 'ఈరోజు క్లినిక్‌లో అందుబాటులో ఉన్నారు',
    eduTitle: 'హార్వర్డ్ స్కూల్ ఆఫ్ డెంటల్ మెడిసిన్',
    eduSub: 'ఫెలో ఆఫ్ ది అకాడమీ ఆఫ్ జనరల్ డెంటిస్ట్రీ (FAGD)',
    anxietyTitle: 'ఆందోళన లేని ప్రైవేట్ సూట్',
    anxietySub: 'బోస్ హెడ్‌ఫోన్లు, వెచ్చని లావెండర్ టవల్స్ & నైట్రస్ ఆక్సైడ్ సౌకర్యం',
    insuranceTitle: 'అన్ని ప్రధాన దంత బీమా పథకాలు వర్తిస్తాయి',
    insuranceSub: 'డెల్టా డెంటల్, మెట్‌లైఫ్, సిగ్నా, గార్డియన్, ఎట్నా',
    selectSlotBtn: 'తేదీ & సమయం ఎంచుకోండి',

    // Menu Section
    menuPill: 'పూర్తి దంత చికిత్సల జాబితా',
    menuTitle: 'ప్రముఖ దంత చికిత్సలు',
    menuSubtitle:
      'డాక్టర్ ప్రత్యక్ష లభ్యతతో వెంటనే బుకింగ్ చేసుకోవడానికి క్రింద ఉన్న సేవను ఎంచుకోండి.',
    reserveBtn: 'రిజర్వ్ చేయండి',
    estimatedCopay: 'అంచనా కోపే',

    // Assurance
    assurance1Title: 'నొప్పి లేని అనస్థీషియా పద్ధతి',
    assurance1Desc:
      'కంప్యూటర్-నియంత్రిత వాండ్ సాంకేతికతతో సూది నొప్పి లేకుండా సున్నితమైన సున్నా-నొప్పి స్పర్శ.',
    assurance2Title: 'డిజిటల్ 3D ఆప్టికల్ స్కానింగ్',
    assurance2Desc:
      'పాత పద్ధతి జిగురు లేకుండా కేవలం 60 సెకన్లలో మీ దంతాల ఖచ్చితమైన 3D డిజిటల్ కొలతలు.',
    assurance3Title: 'సున్నా నిరీక్షణ సీటింగ్',
    assurance3Desc:
      'మీ విలువైన సమయానికి పూర్తి గౌరవం. మీరు వచ్చిన 3 నిమిషాల్లో ప్రైవేట్ సూట్‌లో చికిత్స ప్రారంభం.',

    // Booking Flow
    bookingPill: 'వైద్యుడి ప్రత్యక్ష లభ్యత',
    bookingTitle: 'మీ దంత సందర్శనను రిజర్వ్ చేయండి',
    bookingSubtitle:
      'క్రింది సులభమైన దశలను పూర్తి చేయండి. 24 గంటల ముందు వరకు ఎటువంటి రుసుము లేకుండా ఉచిత రద్దు.',
    scheduleNoticePill: 'క్లినికల్ రోజులు: బుధవారం మరియు గురువారం మాత్రమే',
    scheduleNoticeTitle: 'డా. సారా జెంకిన్స్ క్లినికల్ సెషన్ల వివరాలు',
    scheduleNoticeDesc:
      'వ్యక్తిగత దంత పరీక్షలు, పునరుద్ధరణ చికిత్సలు మరియు శస్త్రచికిత్సలు ప్రత్యేకంగా బుధవారం మరియు గురువారం మాత్రమే నిర్వహించబడతాయి. అత్యవసర పరిస్థితులకు 24/7 ఆన్-కాల్ మద్దతు అందుబాటులో ఉంటుంది.',
    scheduleEmergencyCall: '24/7 అత్యవసర లైన్‌కి కాల్ చేయండి: (555) 234-8901',
    allSessionsFilter: 'అన్ని అందుబాటులో ఉన్న సెషన్లు',
    wednesdaysOnlyFilter: 'బుధవారాలు మాత్రమే',
    thursdaysOnlyFilter: 'గురువారాలు మాత్రమే',
    slotsOpenBadge: 'స్లాట్లు అందుబాటులో ఉన్నాయి',
    selectedSessionPrompt: 'ఎంచుకున్న క్లినికల్ సెషన్',
    step1Title: 'చికిత్స లేదా సమస్యను ఎంచుకోండి',
    step1Sub: 'మీ సందర్శనకు అవసరమైన ప్రాథమిక సేవను ఎంచుకోండి',
    step2Title: 'తేదీ మరియు సమయం ఎంచుకోండి (బుధ & గురువారాలు మాత్రమే)',
    step2Sub: 'డా. సారా జెంకిన్స్, DDS తో (పనోరమిక్ సూట్ 1)',
    availableDates: 'రాబోయే క్లినికల్ తేదీలు (బుధవారాలు & గురువారాలు)',
    morningSlots: 'ఉదయం సెషన్లు',
    afternoonSlots: 'మధ్యాహ్నం సెషన్లు',
    eveningSlots: 'సాయంత్రం సెషన్లు',
    step3Title: 'రోగి వివరాలు & సందర్శన కారణం',
    step3Sub: 'మీ చికిత్సా ప్రణాళికను ముందస్తుగా సిద్ధం చేయడానికి వైద్యుడికి సహాయపడుతుంది',
    fullNameLabel: 'పూర్తి పేరు *',
    fullNamePlaceholder: 'ఉదా. రమేష్ వర్మ',
    phoneLabel: 'మొబైల్ ఫోన్ (SMS హెచ్చరికలు) *',
    phonePlaceholder: '(555) 000-0000',
    emailLabel: 'ఇమెయిల్ చిరునామా',
    emailPlaceholder: 'name@example.com',
    symptomLabel: 'మీ సమస్య ఏమిటి? (లక్షణాలు, దంతాల నొప్పి లేదా కారణం)',
    symptomPlaceholder: 'ఉదా. పై కుడి పంటికి చల్లని నీరు తగిలితే నొప్పి, లేదా సాధారణ 6 నెలల తనిఖీ.',
    comfortPrefsTitle: 'సౌకర్యం & వైద్య ప్రాధాన్యతలు',
    prefHeadphones: 'బోస్ హెడ్‌ఫోన్లు',
    prefNitrous: 'నైట్రస్ ఆక్సైడ్ గ్యాస్',
    prefPenicillin: 'పెన్సిలిన్ అలెర్జీ',
    prefAnxiety: 'దంత చికిత్స భయం',
    step4Title: 'సమీక్షించి బుకింగ్ ఖరారు చేయండి',
    step4Sub: 'చివరి దశ · తక్షణ నిర్ధారణ',
    hipaaBadge: 'HIPAA ఎన్‌క్రిప్టెడ్ & 100% సురక్షితం',
    confirmBtn: 'అపాయింట్‌మెంట్ నిర్ధారించండి & రిజర్వ్ చేయండి',
    confirmGuarantee:
      '24 గంటల ముందు వరకు ఉచిత రీషెడ్యూల్ & రద్దు · SMS మరియు ఇమెయిల్ ద్వారా తక్షణ నిర్ధారణ',

    // Confirmed Pass
    passConfirmedBadge: 'అపాయింట్‌మెంట్ ఖరారైంది · రియల్-టైమ్ సింక్ చేయబడింది',
    passConfirmedTitle: 'మీ బుకింగ్ పూర్తయింది',
    passConfirmedSub:
      'మీ అపాయింట్‌మెంట్ ఖరారైంది మరియు వెంటనే డా. సారా జెంకిన్స్ లైవ్ షెడ్యూల్‌కు పంపబడింది.',
    passIdLabel: 'కన్ఫర్మేషన్ పాస్',
    passProcedure: 'చికిత్సా ప్రక్రియ',
    passClinician: 'వైద్యురాలు',
    passWhen: 'సమయం & తేదీ',
    passLocation: 'చిరునామా',
    bookAnotherBtn: 'మరొక అపాయింట్‌మెంట్ బుక్ చేయండి',
    printPassBtn: 'పాస్ ప్రింట్ చేయండి',
    returnHomeBtn: 'పూర్తయింది & హోమ్‌కి వెళ్లండి',

    // Doctor Portal / Profile
    profileTitle: 'లూమినా ఖాతా & ప్రొఫైల్',
    profileSubtitle: 'మీ సందర్శనలు, డిజిటల్ పాస్‌లు మరియు డాక్టర్ క్లినికల్ లాగిన్‌ను నిర్వహించండి.',
    doctorLoginTitle: 'డాక్టర్ క్లినికల్ లాగిన్',
    doctorLoginSubtitle: 'డా. సారా జెంకిన్స్ కోసం ప్రత్యేక క్లినిక్ యాక్సెస్',
    oneTapDoctorBtn: '⚡ డా. సారా జెంకిన్స్‌గా త్వరిత సింగిల్ ట్యాప్ లాగిన్',
    oneTapDoctorSub: 'ముందస్తు అధికారం పొందిన క్లినిషియన్ · ఆపరేటరీ 1',
    orEnterCreds: 'లేదా ఆధారాలను నమోదు చేయండి',
    emailFieldLabel: 'క్లినిషియన్ ఇమెయిల్',
    passwordFieldLabel: 'డాక్టర్ పాస్‌వర్డ్',
    signInBtn: 'డాక్టర్ షెడ్యూల్‌లోకి ప్రవేశించండి',
    openScheduleBtn: 'డాక్టర్ షెడ్యూల్ & ట్రీట్‌మెంట్ బోర్డు తెరవండి',
    signOutBtn: 'డాక్టర్ లాగౌట్',
    activeDoctorSession: 'యాక్టివ్ డాక్టర్ సెషన్ ధృవీకరించబడింది',
    todaysPatientsTitle: 'ఈరోజు వచ్చే రోగులు',
    totalToday: 'మొత్తం రోగులు',
    inChair: 'కుర్చీలో ఉన్నారు',
    nextUp: 'తదుపరి / వచ్చే రోగులు',
    completed: 'పూర్తయినవి',
    seatInChairBtn: 'కుర్చీలో కూర్చోబెట్టండి',
    markCompletedBtn: 'పూర్తయినట్లు గుర్తించండి',
    clinicalNotesTitle: 'డాక్టర్ క్లినికల్ నోట్స్',
    addNoteBtn: 'నోట్ జోడించండి',
    editNoteBtn: 'సవరించండి',
    saveNoteBtn: 'సేవ్ చేయండి',
    cancelBtn: 'రద్దు',
    searchPlaceholder: 'రోగి పేరు, దంత సంఖ్య లేదా సమస్యను శోధించండి...',
    scheduleMatrixTitle: 'క్లినికల్ సమయ స్లాట్లు & ఆపరేటరీ షెడ్యూల్',
    scheduleMatrixSub: 'బుధవారం మరియు గురువారం ఆపరేటింగ్ రోజులలో అందుబాటులో ఉన్న మరియు రిజర్వ్ చేసిన స్లాట్ల ప్రత్యక్ష వీక్షణ.',
    openSlotBadge: 'అందుబాటులో ఉన్న స్లాట్',
    bookedSlotBadge: 'రిజర్వ్ చేయబడింది',
    quickBookSlotBtn: 'స్లాట్ బుక్ చేయండి',
    selectedSlotTimeLabel: 'ఎంచుకున్న స్లాట్ & సమయం',
    wednesdaySessionTab: 'బుధవారం క్లినికల్ (ఆపరేటరీ 1)',
    thursdaySessionTab: 'గురువారం సర్జికల్ (ఆపరేటరీ 1)',

    // AI Modal
    aiTitle: 'లూమినా డెంటల్ AI',
    aiSubtitle: 'క్లినికల్ సమాధానాలు · 24/7 తక్షణ మార్గదర్శకత్వం',
    aiBadge: 'ధృవీకరించబడిన క్లినికల్ AI',
    aiWelcome:
      'నమస్కారం! నేను లూమినా డెంటల్ AI అసిస్టెంట్‌ని. మా దంత చికిత్సలు, నొప్పి లేని అనస్థీషియా, బీమా కోపేలు లేదా దంత సంరక్షణ గురించి నన్ను ఏదైనా అడగండి.',
    aiInputPlaceholder: 'దంత చికిత్సలు, తెల్లబడటం, నొప్పి లేదా ఖర్చుల గురించి అడగండి...',
    aiBookVisitBtn: 'విజిట్ బుక్ చేయండి',
    aiThinking: 'లూమినా AI క్లినికల్ మార్గదర్శకాలను సమీక్షిస్తోంది...',

    // Footer
    footerDesc:
      'శాన్ ఫ్రాన్సిస్కోలో ఆధునిక, సున్నితమైన మరియు భయం లేని దంత సంరక్షణ. 3D డిజిటల్ ఇమేజింగ్, ప్రశాంతమైన సూట్లు మరియు 100% పారదర్శక కోపేలతో కూడిన సేవలు.',
    footerAccreditation: 'ADA గుర్తింపు పొందినది · HIPAA నిబంధనల ప్రకారం సురక్షితం',
    locationTitle: 'స్థానం & పని వేళలు',
    hoursTitle: 'క్లినిక్ పని వేళలు',
    urgentCareTitle: 'అత్యవసర రోగి సంరక్షణ',
    emergencyHotlineTitle: '24/7 అత్యవసర హెల్ప్‌లైన్',
    emergencySub: 'తీవ్రమైన పంటి నొప్పి, విరిగిన దంతాలు మరియు ప్రమాదాలకు అదే రోజు తక్షణ చికిత్స.',
    quickNavTitle: 'త్వరిత లింకులు',
    copyrightText: 'లూమినా డెంటల్ స్టూడియో. సర్వహక్కులు ప్రత్యేకించబడ్డాయి.',
  },
};

