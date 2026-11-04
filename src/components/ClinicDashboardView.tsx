import React, { useState } from 'react';

export interface ClinicDashboardViewProps {
  readonly onBookNew: () => void;
  readonly onGoToDoctorPortal?: () => void;
  readonly className?: string;
}

export const ClinicDashboardView: React.FC<ClinicDashboardViewProps> = ({
  onBookNew,
  onGoToDoctorPortal,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'op1' | 'op2' | 'op3' | 'op4'>('all');
  const [quickPatient, setQuickPatient] = useState('Elena Rostova');
  const [quickTreatment, setQuickTreatment] = useState('Restorative');
  const [alertNotice, setAlertNotice] = useState<string | null>(null);

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertNotice(`Appointment successfully reserved for ${quickPatient} (${quickTreatment}).`);
    setTimeout(() => setAlertNotice(null), 3500);
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 ${className}`}>
      {/* Alert Notice Toast */}
      {alertNotice && (
        <div className="p-4 rounded-xl bg-secondary-fixed text-on-secondary-container text-xs sm:text-sm font-semibold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{alertNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setAlertNotice(null)}
            className="text-xs uppercase font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Greeting & Executive Subheader */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center text-primary shrink-0 shadow-inner">
            <span className="material-symbols-outlined text-3xl">
              dentistry
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
                Good morning, Dr. Sarah Jenkins
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <span>Live Sync</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-on-surface-variant flex items-center gap-2 mt-1 flex-wrap">
              <span className="material-symbols-outlined text-sm text-outline">
                calendar_today
              </span>
              <span>Wednesday, October 24, 2024</span>
              <span>•</span>
              <span>
                Daily Clinic Capacity:{' '}
                <strong className="text-on-surface font-semibold">
                  92% Occupied
                </strong>{' '}
                (Operatories 1–4)
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onGoToDoctorPortal && (
            <button
              type="button"
              onClick={onGoToDoctorPortal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-xs sm:text-sm font-bold hover:bg-secondary-fixed-dim transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">
                stethoscope
              </span>
              <span>Doctor Clinical View</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => alert('Exporting Daily Run Sheet PDF for Operatories 1-4...')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container text-on-surface text-xs sm:text-sm font-semibold hover:bg-surface-container-high transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-outline">
              file_download
            </span>
            <span>Daily Run Sheet</span>
          </button>

          <button
            type="button"
            onClick={onBookNew}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs sm:text-sm font-semibold hover:bg-primary-container shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">
              add_circle
            </span>
            <span>+ Quick Book</span>
          </button>
        </div>
      </div>

      {/* 4 Bento Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Today&apos;s Patient Census
            </span>
            <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-lg">groups</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-on-surface">18</span>
              <span className="text-xs font-semibold text-on-surface-variant uppercase">
                Patients
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                4 Done
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant">
                2 In Chair
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
                12 Upcoming
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-outline border-t border-surface-container">
            <span>Slot utilization</span>
            <span className="font-bold text-primary">94.2% optimal</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              New Patient Enquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-lg">person_add</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-on-surface">7</span>
              <span className="text-xs font-semibold text-on-surface-variant">
                Pending Triage
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-on-tertiary-fixed-variant">
              <span className="material-symbols-outlined text-sm text-tertiary">
                notification_important
              </span>
              <span>3 cosmetic, 4 pain urgent</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-outline border-t border-surface-container">
            <span>Average triage wait</span>
            <span className="font-bold text-on-surface">14 mins</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Daily Revenue Target
            </span>
            <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-lg">
                account_balance_wallet
              </span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-on-surface">$4,850</span>
              <span className="text-xs text-on-surface-variant">/ $5,500</span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-3">
              <div className="bg-primary h-full rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
          <div className="mt-3 pt-2 flex items-center justify-between text-xs text-outline border-t border-surface-container">
            <span>Progress to goal</span>
            <span className="font-bold text-primary">88% ($650 to cap)</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Case Acceptance Rate
            </span>
            <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-lg">verified</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-on-surface">84%</span>
              <span className="text-xs text-primary font-bold flex items-center">
                <span className="material-symbols-outlined text-xs">arrow_upward</span>
                +6% vs lw
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-snug">
              Crown &amp; restorative approvals leading conversion
            </p>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-outline border-t border-surface-container">
            <span>Active treatment value</span>
            <span className="font-bold text-on-surface">$16,240</span>
          </div>
        </div>
      </div>

      {/* Operatory Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All Operatories (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('op1')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'op1'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Operatory 1 • Hygiene
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('op2')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'op2'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Operatory 2 • Orthodontics
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('op3')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'op3'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Operatory 3 • Surgery &amp; Implants
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('op4')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'op4'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Emergency Walk-In
          </button>
        </div>

        <div className="flex items-center gap-2 pr-2 text-xs">
          <span className="text-outline uppercase tracking-wider font-semibold">
            Timeline Zoom:
          </span>
          <div className="flex rounded-full bg-surface-container p-0.5">
            <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-bold shadow-xs">
              Day
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Schedule Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Patient Flow & Imaging (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Patient Flow Table Card */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-surface-container gap-2">
              <div>
                <h2 className="text-lg font-bold text-on-surface">
                  Today&apos;s Schedule &amp; Patient Flow
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Real-time operatory handoffs, sedation timing, and chart links
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span>Auto-refreshing (60s)</span>
              </span>
            </div>

            {/* Schedule Rows */}
            <div className="space-y-3">
              {/* Row 1: In Chair */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    MV
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-on-surface">
                        Marcus Vance, 42
                      </span>
                      <span className="text-xs text-outline">#PT-8891</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[11px] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                        In Chair
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-0.5 flex-wrap">
                      <span className="font-bold text-primary">
                        09:00 - 10:15 AM
                      </span>
                      <span>•</span>
                      <span>Composite Filling Tooth #14 (DO) &amp; Bitewing</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-outline mt-1 font-medium">
                      <span>Operatory 1 (Dr. Jenkins)</span>
                      <span>•</span>
                      <span>Hygiene: Chloe Bennett, RDH</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => alert('Viewing patient dental chart for #PT-8891 (Marcus Vance)')}
                    className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-all cursor-pointer"
                  >
                    Chart
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Procedure marked done. Sterilization queue alerted.')}
                    className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all cursor-pointer"
                  >
                    Mark Done
                  </button>
                </div>
              </div>

              {/* Row 2: Arrived */}
              <div className="p-4 rounded-xl bg-surface border border-surface-container flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    ER
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-on-surface">
                        Elena Rostova, 29
                      </span>
                      <span className="text-xs text-outline">#PT-9042</span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-tertiary text-[11px] font-bold">
                        Arrived (Wait 8m)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-0.5 flex-wrap">
                      <span className="font-bold text-tertiary">
                        10:00 - 10:45 AM
                      </span>
                      <span>•</span>
                      <span>Invisalign Check &amp; Itero 3D Scan</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-outline mt-1 font-medium">
                      <span>Operatory 2 (Dr. Liam Thorne)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => alert('Viewing patient chart for #PT-9042 (Elena Rostova)')}
                    className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-all cursor-pointer"
                  >
                    Chart
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Patient seated in Operatory 2.')}
                    className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all cursor-pointer"
                  >
                    Seat Patient
                  </button>
                </div>
              </div>

              {/* Row 3: Confirmed Upcoming */}
              <div className="p-4 rounded-xl bg-surface border border-surface-container flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    DL
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-on-surface">
                        David Ling, 58
                      </span>
                      <span className="text-xs text-outline">#PT-7719</span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-semibold">
                        Confirmed SMS
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-0.5 flex-wrap">
                      <span className="font-bold text-on-surface">
                        11:00 - 12:30 PM
                      </span>
                      <span>•</span>
                      <span>Endodontic Root Canal Therapy #19</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-outline mt-1 font-medium">
                      <span>Operatory 3 (Surgical)</span>
                      <span>•</span>
                      <span className="text-primary font-bold">Pre-med Antibiotics Taken</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => alert('Patient checked in.')}
                    className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-all cursor-pointer"
                  >
                    Check In
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic Imaging Mosaic Card */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-on-surface">
                  Recent Imaging &amp; Diagnostic Scans
                </h3>
                <p className="text-xs text-on-surface-variant">
                  3D Panoramics and intraoral scans taken today
                </p>
              </div>
              <span className="material-symbols-outlined text-outline text-2xl">
                radiology
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Scan 1 */}
              <div className="relative group rounded-xl overflow-hidden bg-surface aspect-[4/3] border border-surface-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6jhQsk1lllHFdvQQn22OombDRWHMkWSFua2koXU9VBQQRqBWmMxKROz6vCCvUzaJOFxvk64gLYkuivK-rUZSGFfMzWED_WF2V07txAsgB03zJe_vyCAOaygnDM8ZrhtMuxF94c0WA0sWnHjNvHsgPJV9oiEN7r_dryK9z_l02sXM1YNLXfqdGv_H3798rk7MWbQwNmHN3uihIhywWFVPhZj5kzxhX8H2HxnuWFvHb"
                  alt="Panoramic X-Ray"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="text-xs font-bold">David Ling • Full Panoramic</span>
                  <span className="text-[10px] text-slate-200">OP-3 Root Canal Survey</span>
                </div>
              </div>

              {/* Scan 2 */}
              <div className="relative group rounded-xl overflow-hidden bg-surface aspect-[4/3] border border-surface-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmPYhllUhKlvDPyXMrWgQWxct3cNht94W9IQFdWzITg9ziotjoD01442kEhmFNnkhgv_zDe6pIRqCXCCSdul5FjjqTYb4PuNJ5GEwY9KOcs5cRiV2nr8dwwP0YQbQVj5qCBGDYYhFSPi5INPbF1RwuUj_po5_46nWZJDYXMUqjjlT7xR35eXlxAJ8uoos1XBEkCFHDWM3Fjor0_4AoppO1rNciA138Stvn0vbM_wM7"
                  alt="Itero 3D Scan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="text-xs font-bold">Elena Rostova • Itero Scan</span>
                  <span className="text-[10px] text-slate-200">Orthodontic Staging #4</span>
                </div>
              </div>

              {/* Scan 3 */}
              <div className="relative group rounded-xl overflow-hidden bg-surface aspect-[4/3] border border-surface-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRYmJbJNNUgyTJxe9WLIKynsbh6axHSefVsLAg2mQkHvRq8bsxCz1220UH1bKWg2Wy77B11TOGVXpMSKaTY4NBF9VDeGXgs81ntVn3Qsb7BSLG2u4D4JawJKOFAUaOnjiVMohlxfH1_W3QCYWjcjQOm5jO71IgbAb70XsK0srIFvZe7BmTqCb5__uQJ4KWFbizjSAXQKqh4tjM_6xUWjbTjsLcgmOyrtss0k4htf-G"
                  alt="Operatory 1"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="text-xs font-bold">Operatory 1 Live Suite</span>
                  <span className="text-[10px] text-slate-200">Next sanitize: 10:20 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Schedule Mini-Drawer (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-base">
                  edit_calendar
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-on-surface">Quick Book</h3>
                <p className="text-[11px] text-on-surface-variant">
                  Direct clinic schedule entry
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-bold uppercase">
              Expedited
            </span>
          </div>

          <form onSubmit={handleQuickBook} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Patient Name or Chart ID
              </label>
              <input
                type="text"
                value={quickPatient}
                onChange={(e) => setQuickPatient(e.target.value)}
                placeholder="e.g., Alexander Hayes"
                className="w-full h-10 px-3 rounded-xl bg-surface border border-surface-container text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Treatment Category
              </label>
              <select
                value={quickTreatment}
                onChange={(e) => setQuickTreatment(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface border border-surface-container text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary font-medium cursor-pointer"
              >
                <option value="Restorative">Restorative / Crown</option>
                <option value="Hygiene">Prophylaxis / Hygiene</option>
                <option value="Endodontics">Endodontics (Root Canal)</option>
                <option value="Orthodontics">Invisalign / Ortho</option>
                <option value="Cosmetic">Cosmetic Whitening</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Assigned Operatory
              </label>
              <select className="w-full h-10 px-3 rounded-xl bg-surface border border-surface-container text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary font-medium cursor-pointer">
                <option>Operatory 1 (Dr. Jenkins)</option>
                <option>Operatory 2 (Dr. Liam Thorne)</option>
                <option>Operatory 3 (Chloe Bennett, RDH)</option>
                <option>Consultation Suite</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-primary text-on-primary hover:bg-primary-container text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Add to Schedule
            </button>
          </form>

          <div className="pt-3 border-t border-surface-container text-center">
            <button
              type="button"
              onClick={onBookNew}
              className="text-xs font-bold text-primary hover:underline"
            >
              Switch to Patient Portal Self-Booking Mode →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicDashboardView;

