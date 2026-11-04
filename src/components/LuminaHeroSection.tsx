import React from 'react';

export interface LuminaHeroSectionProps {
  readonly onBookClick: () => void;
  readonly onScheduleClick: () => void;
  readonly onOpenAssistant?: () => void;
  readonly onOpenQuickGuide?: () => void;
  readonly className?: string;
}

export const LuminaHeroSection: React.FC<LuminaHeroSectionProps> = ({
  onBookClick,
  onScheduleClick,
  onOpenAssistant,
  onOpenQuickGuide,
  className = '',
}) => {
  return (
    <div className={`w-full bg-surface ${className}`}>
      {/* ============================================================== */}
      {/* 1. HERO MAIN STAGE */}
      {/* ============================================================== */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface via-surface-container-low/40 to-surface py-12 lg:py-20 border-b border-surface-container">
        {/* Subtle Ambient Glow Orbs */}
        <div className="absolute -top-16 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Narrative (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              {/* Top Announcement Pill with AI badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-surface-container-high text-primary text-xs font-semibold tracking-wider uppercase border border-surface-container">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Modern Dental Excellence • San Francisco</span>
                </div>

                {onOpenAssistant && (
                  <button
                    type="button"
                    onClick={onOpenAssistant}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-xs font-bold hover:bg-secondary-fixed-dim transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                    <span>AI Concierge Q&amp;A</span>
                  </button>
                )}
              </div>

              {/* Grand Headlines */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-tight">
                  A Pristine Smile.{' '}
                  <span className="text-primary block">
                    Crafted With Precision.
                  </span>
                </h1>
                <p className="text-base sm:text-xl text-on-surface-variant font-medium pt-1">
                  Gentle Care. Surgical Mastery. Lasting Confidence.
                </p>
              </div>

              {/* Narrative Subtitle */}
              <p className="text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
                At Lumina Dental, we harmonize hospital-grade precision with serene private operatory suites. Enjoy contact-free digital check-in, transparent insurance pricing, and pain-free treatments guided by Dr. Sarah Jenkins.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={onBookClick}
                  className="px-7 py-3.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">calendar_month</span>
                  <span>Book Your Appointment</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>

                <button
                  type="button"
                  onClick={onScheduleClick}
                  className="px-5 py-3.5 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-semibold text-sm transition-all border border-surface-container shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-primary">
                    chair
                  </span>
                  <span>View Operatories</span>
                </button>

                {onOpenAssistant && (
                  <button
                    type="button"
                    onClick={onOpenAssistant}
                    className="px-5 py-3.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    <span>Ask AI</span>
                  </button>
                )}

                {onOpenQuickGuide && (
                  <button
                    type="button"
                    onClick={onOpenQuickGuide}
                    className="px-5 py-3.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">menu_book</span>
                    <span>Quick Guide</span>
                  </button>
                )}
              </div>

              {/* Live Availability Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-on-surface-variant font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-base">
                    verified
                  </span>
                  <span>ADA &amp; HIPAA Certified</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-amber-500 text-base">
                    star
                  </span>
                  <span>4.9 / 5.0 (1,420+ Reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 text-primary font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  <span>Next Slot: Today @ 10:45 AM</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Banner (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-surface-container-lowest bg-surface-container aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRYmJbJNNUgyTJxe9WLIKynsbh6axHSefVsLAg2mQkHvRq8bsxCz1220UH1bKWg2Wy77B11TOGVXpMSKaTY4NBF9VDeGXgs81ntVn3Qsb7BSLG2u4D4JawJKOFAUaOnjiVMohlxfH1_W3QCYWjcjQOm5jO71IgbAb70XsK0srIFvZe7BmTqCb5__uQJ4KWFbizjSAXQKqh4tjM_6xUWjbTjsLcgmOyrtss0k4htf-G"
                  alt="Lumina Dental Operatory Suite"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider">
                      Operatory 1
                    </span>
                    <span className="text-xs text-slate-200">
                      Panoramic View Suite
                    </span>
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-white">
                    Private Acoustic Suite Experience
                  </h3>
                  <p className="text-xs text-slate-200 mt-0.5">
                    Equipped with Surgically Clean Air HEPA-14 filtration &amp; noise-canceling headsets.
                  </p>
                </div>
              </div>

              {/* Floating Doctor Profile Pill */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-surface-container-lowest p-3.5 rounded-2xl shadow-xl border border-surface-container flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shrink-0 border border-primary/20">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4ukVnEIoCKiIyOMpEivY18TBAx1bx4z1PlKpqjNX25qomLO8PM6g0Hyxm3waj7BFXnx3LfQ7K_MVyU9RkIPvQwI8S954p0z2TFg-vqd2_ef8lWvLnaxfCURnSLCsZejL0zr5btCPVlWWLjHqPrEI1nazpzTBC_iL4_pBY7ev4EO7ytkbFq5nQIG8fW2xpNsXdEOe4i02IvnYGcoDEMAXRyRPrQq8jjSvlgeJjB7eO"
                    alt="Dr. Sarah Jenkins"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs sm:text-sm text-on-surface">
                      Dr. Sarah Jenkins
                    </span>
                    <span className="material-symbols-outlined text-primary text-xs">
                      verified
                    </span>
                  </div>
                  <p className="text-[11px] text-primary font-semibold">
                    DDS, FAGD • Lead Surgeon
                  </p>
                  <p className="text-[10px] text-on-surface-variant">
                    14+ Yrs Aesthetic Mastery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. FOUR PILLARS OF CLINICAL EXCELLENCE (Stitch Theme) */}
      {/* ============================================================== */}
      <section className="w-full py-10 bg-surface-container-low/50 border-b border-surface-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pillar 1 */}
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-2xl">radiology</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">
                  3D Optical Imaging
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Low-dose digital radiographs &amp; iTero® high-res optical mouth scans for instant diagnosis.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-2xl">sanitizer</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">
                  Hospital-Grade Air
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Autoclave sterilization &amp; Surgically Clean Air HEPA-14 scrubbers in every operatory.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-2xl">chair</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">
                  Private Suite Sanctuary
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Acoustic noise isolation, ergonomic heated chairs, and zero crowded waiting rooms.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-2xl">contactless</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">
                  Zero-Wait Check In
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Instant mobile wallet passes &amp; digital intake straight from your smartphone to chair.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LuminaHeroSection;
