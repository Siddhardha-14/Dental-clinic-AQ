import React, { useState } from 'react';

export interface LuminaQuickGuideModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onBookAppointment?: () => void;
  readonly onOpenAiAssistant?: () => void;
  readonly className?: string;
}

type GuideTab = 'pre-visit' | 'aftercare' | 'emergency' | 'pricing' | 'comfort';

export const LuminaQuickGuideModal: React.FC<LuminaQuickGuideModalProps> = ({
  isOpen,
  onClose,
  onBookAppointment,
  onOpenAiAssistant,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<GuideTab>('pre-visit');

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-inverse-surface/60 backdrop-blur-sm transition-all ${className}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl bg-surface rounded-3xl shadow-2xl border border-surface-container overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="bg-surface-container-lowest px-6 py-4 border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-sm">
              <span className="material-symbols-outlined text-2xl">menu_book</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-on-surface">
                  Lumina Patient Quick Guide
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider">
                  Clinical Handbook
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Pre-visit instructions, procedure aftercare, emergency triage, and comfort amenities.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            aria-label="Close Quick Guide"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="bg-surface-container-lowest px-6 py-2 border-b border-surface-container flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('pre-visit')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pre-visit'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-sm">checklist</span>
            <span>1. Pre-Visit Checklist</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('aftercare')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'aftercare'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-sm">healing</span>
            <span>2. Procedure Aftercare</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('emergency')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'emergency'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-sm">e911_emergency</span>
            <span>3. Emergency Triage</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pricing'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-sm">payments</span>
            <span>4. Insurance &amp; Fees</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('comfort')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'comfort'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-sm">spa</span>
            <span>5. Comfort Menu</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm bg-surface">
          {/* TAB 1: PRE-VISIT CHECKLIST */}
          {activeTab === 'pre-visit' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container space-y-4">
                <h4 className="font-bold text-base text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">
                    fact_check
                  </span>
                  <span>What to Prepare Before Your Appointment</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                      contactless
                    </span>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-on-surface">
                        Mobile Check-In Pass
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                        Add your digital pass to Apple Wallet or Google Wallet for immediate contactless entry.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                      id_card
                    </span>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-on-surface">
                        Photo ID &amp; Insurance Card
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                        Bring your primary government-issued ID and your dental insurance policy card.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                      medication
                    </span>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-on-surface">
                        Medications &amp; Medical History
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                        Keep a list of daily medications, blood thinners, allergies, or cardiovascular notes handy.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                      schedule
                    </span>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-on-surface">
                        Arrival Timing (Zero Wait)
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                        Arrive 5 minutes prior to your slot. You will be guided straight to your private operatory suite.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parking and Transit */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container">
                <h5 className="font-bold text-sm text-on-surface mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-lg">
                    near_me
                  </span>
                  <span>Parking &amp; Transit Guidance (San Francisco)</span>
                </h5>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Located at <strong>450 Sutter St, Suite 1800, San Francisco, CA</strong>. Validated garage parking is available directly beneath the 450 Sutter building. We are 2 blocks from the Powell St BART / Muni station.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PROCEDURE AFTERCARE */}
          {activeTab === 'aftercare' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Whitening Aftercare */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">
                    auto_awesome
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-on-surface">
                    Teeth Whitening — The 48-Hour &quot;White Diet&quot;
                  </h4>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  After professional whitening, dental enamel micropores remain open for 48 hours and can easily absorb pigments.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-error-container/40 border border-error/20">
                    <p className="font-bold text-error mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">block</span>
                      <span>Avoid for 48 Hours:</span>
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-on-surface-variant">
                      <li>Coffee, espresso, and dark teas</li>
                      <li>Red wine, colored sodas, dark beer</li>
                      <li>Berries, tomato pasta sauce, curry, soy sauce</li>
                      <li>Smoking, tobacco, colored toothpastes</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-high border border-surface-container">
                    <p className="font-bold text-primary mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      <span>Safe Foods to Enjoy:</span>
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-on-surface-variant">
                      <li>Chicken, turkey, white fish</li>
                      <li>White rice, plain pasta, potatoes</li>
                      <li>Milk, water, clear broths</li>
                      <li>Bananas, cauliflower, white cheese</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cleaning & Periodontal Care */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container space-y-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-xl">
                    cleaning_services
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-on-surface">
                    Post-Cleaning &amp; Periodontal Ultrasonic Scaling
                  </h4>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Mild gum tenderness or cold sensitivity is completely normal for 24–48 hours. Rinse with warm salt water (1/2 teaspoon of salt in 8 oz warm water) after meals. Continue brushing gently with an extra-soft toothbrush.
                </p>
              </div>

              {/* Fluoride Treatment Care */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container space-y-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-xl">
                    shield
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-on-surface">
                    Fluoride Enamel Varnish Care
                  </h4>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Do not brush or floss for at least 4 to 6 hours after varnish placement. Eat soft foods and drink cool or lukewarm fluids; avoid very hot beverages or crunchy foods today.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: EMERGENCY TRIAGE */}
          {activeTab === 'emergency' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-error-container/40 p-5 rounded-2xl border border-error/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-error font-bold text-base">
                    <span className="material-symbols-outlined text-2xl">
                      emergency
                    </span>
                    <span>24/7 Dental Emergency Hotline</span>
                  </div>
                  <p className="text-xs text-on-error-container mt-1">
                    Severe pain, trauma, facial swelling, or uncontrolled bleeding? Reach our on-call surgeon immediately.
                  </p>
                </div>
                <a
                  href="tel:5552348901"
                  className="px-5 py-3 rounded-full bg-error text-on-error font-bold text-sm shadow-md hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0"
                >
                  <span className="material-symbols-outlined text-lg">call</span>
                  <span>Call (555) 234-8901</span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container space-y-2">
                  <h5 className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-500 text-lg">
                      warning
                    </span>
                    <span>Severe Toothache</span>
                  </h5>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    1. Rinse gently with warm saltwater.<br />
                    2. Use dental floss to dislodge any trapped food particles.<br />
                    3. Apply an ice pack outside the cheek (15 mins on / 15 off).<br />
                    <strong>Never</strong> place aspirin tablets against gums.
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container space-y-2">
                  <h5 className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-error text-lg">
                      emergency_home
                    </span>
                    <span>Knocked-Out Adult Tooth (Avulsion)</span>
                  </h5>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    1. Handle the tooth <strong>by the crown only</strong>; never touch root tissue.<br />
                    2. Rinse gently with cold water if soiled.<br />
                    3. Immerse in a small cup of <strong>cold milk</strong> or saline.<br />
                    4. Reach our clinic within <strong>30–60 minutes</strong> for re-implantation.
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container space-y-2">
                  <h5 className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-lg">
                      dentistry
                    </span>
                    <span>Broken or Chipped Tooth</span>
                  </h5>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Save any broken tooth fragments in milk or water. Cover sharp edges with dental wax or sugar-free gum to prevent tongue laceration, then book same-day repair.
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container space-y-2">
                  <h5 className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-lg">
                      lock_reset
                    </span>
                    <span>Dislodged Crown or Veneer</span>
                  </h5>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Retrieve the crown. You can temporarily slip it back onto the tooth using over-the-counter temporary dental cement or toothpaste until your emergency visit.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRICING & INSURANCE */}
          {activeTab === 'pricing' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container">
                <h4 className="font-bold text-sm sm:text-base text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">
                    receipt_long
                  </span>
                  <span>Transparent Fee Schedule (No Surprise Invoices)</span>
                </h4>

                <div className="divide-y divide-surface-container text-xs">
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-on-surface">Comprehensive Oral Exam &amp; 3D Scan</p>
                      <p className="text-on-surface-variant text-[11px]">Includes digital radiographs &amp; iTero® bite simulation</p>
                    </div>
                    <span className="font-bold text-sm text-primary">$185</span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-on-surface">Advanced Periodontal Therapy &amp; Laser Prophy</p>
                      <p className="text-on-surface-variant text-[11px]">Ultrasonic debridement &amp; enamel mineral polish</p>
                    </div>
                    <span className="font-bold text-sm text-primary">$140</span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-on-surface">Porcelain Veneer &amp; Aesthetic Design Consult</p>
                      <p className="text-on-surface-variant text-[11px]">3D digital smile trial &amp; photographic planning</p>
                    </div>
                    <span className="font-bold text-sm text-primary">$290</span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-on-surface">Orthodontic &amp; Clear Aligner Evaluation</p>
                      <p className="text-on-surface-variant text-[11px]">Complimentary bite scan &amp; movement animation</p>
                    </div>
                    <span className="font-bold text-sm text-emerald-600 uppercase">Free ($0)</span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-on-surface">Pediatric Precision Care &amp; Sealants</p>
                      <p className="text-on-surface-variant text-[11px]">Gentle cleaning, fluoride glaze &amp; protective sealants</p>
                    </div>
                    <span className="font-bold text-sm text-primary">$210</span>
                  </div>
                </div>
              </div>

              {/* Insurance Providers */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container space-y-2">
                <h5 className="font-bold text-sm text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-lg">
                    verified_user
                  </span>
                  <span>In-Network Dental Insurance Partners</span>
                </h5>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  We accept <strong>Delta Dental (Premier &amp; PPO), Cigna, Aetna, MetLife, Guardian, and UnitedHealthcare</strong>. Our billing desk submits all claims directly and provides automated eligibility verification within minutes.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-primary">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container">Delta Dental</span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container">Cigna PPO</span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container">Aetna Dental</span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container">MetLife PDP+</span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container">Guardian Dental</span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container">CareCredit 0% APR</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COMFORT MENU */}
          {activeTab === 'comfort' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container space-y-2">
                <h4 className="font-bold text-base text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">
                    airline_seat_recline_extra
                  </span>
                  <span>Lumina Sanctuary Comfort Menu (Complimentary)</span>
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  We believe dental care should feel peaceful and restorative. Every private operatory suite is equipped with custom comfort options at no extra charge:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    headphones
                  </span>
                  <div>
                    <h5 className="font-bold text-on-surface">Bose Noise-Canceling Headsets</h5>
                    <p className="text-on-surface-variant mt-0.5">Stream Apple Music, Spotify playlists, white noise, or podcasts to mute clinic sounds.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    chair
                  </span>
                  <div>
                    <h5 className="font-bold text-on-surface">Heated Massage Chairs</h5>
                    <p className="text-on-surface-variant mt-0.5">Ergonomic memory-foam dental chairs with gentle lumbar warmth and vibration relief.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    air
                  </span>
                  <div>
                    <h5 className="font-bold text-on-surface">Surgically Clean Air HEPA-14</h5>
                    <p className="text-on-surface-variant mt-0.5">Medical-grade filtration completely scrubs suite air every 4 minutes for pristine purity.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    self_improvement
                  </span>
                  <div>
                    <h5 className="font-bold text-on-surface">Nitrous Oxide Sedation</h5>
                    <p className="text-on-surface-variant mt-0.5">Gentle laughing gas for dental anxiety. Wears off in 5 minutes so you can safely drive home.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="bg-surface-container-lowest px-6 py-4 border-t border-surface-container flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onOpenAiAssistant && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAiAssistant();
                }}
                className="px-4 py-2.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-xs font-bold hover:bg-secondary-fixed-dim transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">smart_toy</span>
                <span>Ask AI Dental Assistant</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              Done
            </button>

            {onBookAppointment && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookAppointment();
                }}
                className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                <span>Book Appointment</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuminaQuickGuideModal;

