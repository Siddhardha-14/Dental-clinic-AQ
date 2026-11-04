import React from 'react';

export interface LuminaAiFloatingFabProps {
  readonly onOpenAssistant: () => void;
  readonly onOpenQuickGuide: () => void;
  readonly className?: string;
}

export const LuminaAiFloatingFab: React.FC<LuminaAiFloatingFabProps> = ({
  onOpenAssistant,
  onOpenQuickGuide,
  className = '',
}) => {
  return (
    <aside
      aria-label="Patient Assistance Controls"
      className={`fixed bottom-24 lg:bottom-6 right-4 sm:right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 ${className}`}
    >
      {/* Quick Guide Pill Button */}
      <button
        type="button"
        onClick={onOpenQuickGuide}
        className="px-4 py-2.5 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-on-surface hover:text-primary hover:bg-surface-container text-xs font-bold shadow-lg border border-surface-container flex items-center gap-2 transition-all hover:scale-105 cursor-pointer group"
        title="Open Patient Quick Guide (Pre-op & Aftercare)"
      >
        <span className="material-symbols-outlined text-lg text-secondary group-hover:rotate-6 transition-transform">
          menu_book
        </span>
        <span className="hidden sm:inline">Quick Guide</span>
      </button>

      {/* AI Concierge Main Floating Button */}
      <button
        type="button"
        onClick={onOpenAssistant}
        className="relative px-5 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary text-xs sm:text-sm font-bold shadow-xl hover:shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer border-2 border-surface-container-lowest group"
        title="Ask Lumina Dental AI Assistant"
      >
        {/* Glow and Pulse Rings */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-fixed" />
        </span>

        <div className="w-6 h-6 rounded-full bg-surface-container-lowest/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-base text-on-primary">
            smart_toy
          </span>
        </div>

        <div className="flex flex-col text-left leading-none">
          <span className="font-bold">Ask AI Concierge</span>
          <span className="text-[10px] text-on-primary/80 font-normal mt-0.5">
            Clinical Q&amp;A • 24/7 Concierge
          </span>
        </div>
      </button>
    </aside>
  );
};

export default LuminaAiFloatingFab;

