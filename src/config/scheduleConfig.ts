/**
 * =========================================================================
 * LUMINA DENTAL CLINIC - CLINICAL APPOINTMENT SCHEDULE CONFIGURATION
 * =========================================================================
 *
 * Current Policy: In-person appointment sessions are EXCLUSIVELY available on
 * WEDNESDAYS (3) and THURSDAYS (4).
 *
 * TO UPDATE OR EXPAND CLINIC DAYS LATER:
 * Simply add or remove day numbers from `ALLOWED_CLINIC_DAYS`:
 *   0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday,
 *   4 = Thursday, 5 = Friday, 6 = Saturday
 *
 * Example: If the clinic adds Tuesday sessions later, change to:
 *   export const ALLOWED_CLINIC_DAYS: readonly number[] = [2, 3, 4];
 * =========================================================================
 */

export const ALLOWED_CLINIC_DAYS: readonly number[] = [3, 4]; // 3 = Wednesday, 4 = Thursday

export interface ClinicDayInfo {
  readonly dayOfWeek: number;
  readonly nameEn: string;
  readonly nameTe: string;
  readonly shortNameEn: string;
  readonly shortNameTe: string;
  readonly sessionTitleEn: string;
  readonly sessionTitleTe: string;
  readonly sessionBadgeEn: string;
  readonly sessionBadgeTe: string;
  readonly operatoryEn: string;
  readonly operatoryTe: string;
  readonly availableSlotsCount: number;
}

export const CLINIC_DAYS_CONFIG: Record<number, ClinicDayInfo> = {
  3: {
    dayOfWeek: 3,
    nameEn: 'Wednesday',
    nameTe: 'బుధవారం',
    shortNameEn: 'Wed',
    shortNameTe: 'బుధ',
    sessionTitleEn: 'Full Clinical & Preventive Day',
    sessionTitleTe: 'పూర్తి క్లినికల్ & నివారణ సంరక్షణ',
    sessionBadgeEn: 'Full Clinic',
    sessionBadgeTe: 'పూర్తి క్లినిక్',
    operatoryEn: 'Operatory 1 (Panoramic Suite)',
    operatoryTe: 'ఆపరేటరీ 1 (పనోరమిక్ సూట్)',
    availableSlotsCount: 8,
  },
  4: {
    dayOfWeek: 4,
    nameEn: 'Thursday',
    nameTe: 'గురువారం',
    shortNameEn: 'Thu',
    shortNameTe: 'గురు',
    sessionTitleEn: 'Surgical & Comprehensive Care',
    sessionTitleTe: 'శస్త్రచికిత్స & సమగ్ర సంరక్షణ',
    sessionBadgeEn: 'Surgical & Hygiene',
    sessionBadgeTe: 'శస్త్రచికిత్స & పరిశుభ్రత',
    operatoryEn: 'Operatory 1 (Surgical Suite)',
    operatoryTe: 'ఆపరేటరీ 1 (సర్జికల్ సూట్)',
    availableSlotsCount: 7,
  },
};

export const CLINIC_TIME_SLOTS = {
  morning: ['09:00 AM', '10:00 AM', '10:45 AM', '11:30 AM'],
  afternoon: ['01:15 PM', '02:00 PM', '02:45 PM', '03:30 PM'],
  evening: ['04:15 PM', '05:00 PM'],
} as const;

export interface AvailableSessionDate {
  readonly id: string;
  readonly dateStr: string;
  readonly dayName: string;
  readonly formattedDate: string;
  readonly dayOfWeek: number;
  readonly sessionTitle: string;
  readonly sessionBadge: string;
  readonly operatory: string;
  readonly availableSlotsCount: number;
  readonly isWednesday: boolean;
  readonly isThursday: boolean;
  readonly rawDate: Date;
}

const MONTH_NAMES_EN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const MONTH_NAMES_TE = [
  'జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్',
  'జూలై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్',
];

/**
 * Dynamically generates upcoming Wednesday and Thursday dates starting from current or next week.
 * Generates `count` available session dates matching `ALLOWED_CLINIC_DAYS`.
 */
export function getUpcomingClinicDates(
  count = 6,
  lang: 'en' | 'te' = 'en'
): AvailableSessionDate[] {
  const dates: AvailableSessionDate[] = [];
  const today = new Date();
  
  // Look forward up to 60 days to collect the requested number of allowed days
  const cursor = new Date(today);
  cursor.setDate(cursor.getDate() + 1); // Start from tomorrow

  while (dates.length < count) {
    const dayOfWeek = cursor.getDay();
    if (ALLOWED_CLINIC_DAYS.includes(dayOfWeek)) {
      const config = CLINIC_DAYS_CONFIG[dayOfWeek] || {
        dayOfWeek,
        nameEn: dayOfWeek === 3 ? 'Wednesday' : 'Thursday',
        nameTe: dayOfWeek === 3 ? 'బుధవారం' : 'గురువారం',
        shortNameEn: dayOfWeek === 3 ? 'Wed' : 'Thu',
        shortNameTe: dayOfWeek === 3 ? 'బుధ' : 'గురు',
        sessionTitleEn: 'Clinical Dental Session',
        sessionTitleTe: 'క్లినికల్ దంత సెషన్',
        sessionBadgeEn: 'In-Clinic',
        sessionBadgeTe: 'క్లినిక్‌లో',
        operatoryEn: 'Operatory 1 (Panoramic Suite)',
        operatoryTe: 'ఆపరేటరీ 1 (పనోరమిక్ సూట్)',
        availableSlotsCount: 6,
      };

      const monthEn = MONTH_NAMES_EN[cursor.getMonth()];
      const monthTe = MONTH_NAMES_TE[cursor.getMonth()];
      const dayNum = cursor.getDate();

      const dayName = lang === 'te' ? config.nameTe : config.nameEn;
      const formattedDate =
        lang === 'te' ? `${monthTe} ${dayNum}` : `${monthEn} ${dayNum}`;
      const dateStr = `${dayName}, ${formattedDate}`;

      dates.push({
        id: `slot-${cursor.getFullYear()}-${cursor.getMonth() + 1}-${dayNum}`,
        dateStr,
        dayName,
        formattedDate,
        dayOfWeek,
        sessionTitle: lang === 'te' ? config.sessionTitleTe : config.sessionTitleEn,
        sessionBadge: lang === 'te' ? config.sessionBadgeTe : config.sessionBadgeEn,
        operatory: lang === 'te' ? config.operatoryTe : config.operatoryEn,
        availableSlotsCount: config.availableSlotsCount,
        isWednesday: dayOfWeek === 3,
        isThursday: dayOfWeek === 4,
        rawDate: new Date(cursor),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}
