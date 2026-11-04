import React from 'react';

export interface MicroFaqBarProps {
  readonly className?: string;
}

export const MicroFaqBar: React.FC<MicroFaqBarProps> = ({ className = '' }) => {
  const items = [
    {
      icon: 'verified_user',
      title: 'Strict Infection Control',
      description:
        'Hospital-grade HEPA filtration and autoclave sterilization between each patient visit.',
    },
    {
      icon: 'contactless',
      title: 'Zero-Wait Check In',
      description:
        'Complete your digital medical history from your phone before arriving. Direct to operatory chair.',
    },
    {
      icon: 'payments',
      title: 'Flexible Financing',
      description:
        '0% APR interest-free plans via CareCredit and Sunbit for elective dental care.',
    },
  ];

  return (
    <div className={`mt-10 pt-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex items-start gap-4 border border-surface-container"
          >
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-xl">
                {item.icon}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-surface">
                {item.title}
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MicroFaqBar;

