import React from 'react';

export interface LuminaQuickGuideSectionProps {
  readonly onOpenAiAssistant: () => void;
  readonly onOpenQuickGuide: () => void;
  readonly onBookAppointment: () => void;
  readonly className?: string;
}

export const LuminaQuickGuideSection: React.FC<LuminaQuickGuideSectionProps> = ({
  onOpenAiAssistant,
  onOpenQuickGuide,
  onBookAppointment,
  className = '',
}) => {
  return (
    <section
      id="quick-guide-section"
      className={`w-full py-12 bg-surface-container-low/40 border-b border-surface-container scroll-mt-24 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-xs uppercase tracking-wider font-bold mb-2">
              <span className="material-symbols-outlined text-sm">smart_toy</span>
              <span>Google AI Studio &amp; Clinical Knowledge Hub</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
              Patient AI Assistant &amp; Quick Guide
            </h2>

            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mt-1.5 leading-relaxed">
              Have questions about procedure costs, recovery timelines, insurance coverage, or sudden tooth pain? Our AI Assistant answers instantly 24/7.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenQuickGuide}
              className="px-4 py-2.5 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm transition-all border border-surface-container shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-primary">
                menu_book
              </span>
              <span>Full Quick Guide</span>
            </button>

            <button
              type="button"
              onClick={onOpenAiAssistant}
              className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span>Ask AI Assistant</span>
            </button>
          </div>
        </div>

        {/* 4 Interactive Quick Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: 48-Hour White Diet */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary mb-3">
                <span className="material-symbols-outlined text-xl">auto_awesome</span>
              </div>
              <h3 className="font-bold text-sm text-on-surface">
                Teeth Whitening Guide
              </h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                The essential 48-hour &quot;White Diet&quot; guide: protect porous enamel from coffee, tea, and red wine staining post-treatment.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenQuickGuide}
              className="mt-4 pt-3 border-t border-surface-container text-xs font-bold text-primary flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>View Diet Rules</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          {/* Card 2: Emergency Toothache Triage */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-xl text-error">emergency</span>
              </div>
              <h3 className="font-bold text-sm text-on-surface">
                Emergency Pain Triage
              </h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Step-by-step first aid for throbbing toothaches, knocked-out teeth, and facial swelling before you arrive at our clinic.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenAiAssistant}
              className="mt-4 pt-3 border-t border-surface-container text-xs font-bold text-error flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Ask Triage Bot</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          {/* Card 3: Transparent Pricing & Insurance */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary mb-3">
                <span className="material-symbols-outlined text-xl">payments</span>
              </div>
              <h3 className="font-bold text-sm text-on-surface">
                Insurance &amp; Pricing
              </h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Delta, Cigna, MetLife in-network breakdown. View our itemized $185 Exam &amp; $140 Periodontal cleaning fees.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenQuickGuide}
              className="mt-4 pt-3 border-t border-surface-container text-xs font-bold text-primary flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>View Fee Schedule</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          {/* Card 4: Pre-Visit Mobile Wallet Pass */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary mb-3">
                <span className="material-symbols-outlined text-xl">contactless</span>
              </div>
              <h3 className="font-bold text-sm text-on-surface">
                Zero-Wait Check In
              </h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Digital pre-registration with instant Apple &amp; Google Wallet pass generation for effortless direct-to-suite entry.
              </p>
            </div>
            <button
              type="button"
              onClick={onBookAppointment}
              className="mt-4 pt-3 border-t border-surface-container text-xs font-bold text-primary flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Reserve Slot Now</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Interactive AI Prompt Banner */}
        <div className="mt-6 bg-surface-container-lowest rounded-2xl p-5 sm:p-6 border border-surface-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-2xl">neurology</span>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-on-surface">
                Try asking the AI Assistant:
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                &quot;What happens during an initial 3D optical mouth scan?&quot; or &quot;How does nitrous oxide sedation feel?&quot;
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenAiAssistant}
            className="px-6 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer self-stretch md:self-auto justify-center"
          >
            <span className="material-symbols-outlined text-lg">forum</span>
            <span>Start Live Q&amp;A Chat</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LuminaQuickGuideSection;

