import React from 'react';

export interface StepProgressBarProps {
  readonly currentStep: number;
  readonly onStepClick?: (step: number) => void;
  readonly className?: string;
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  onStepClick,
  className = '',
}) => {
  const steps = [
    { num: 1, label: 'Step 1', title: 'Reason for Visit' },
    { num: 2, label: 'Step 2', title: 'Doctor & Slot' },
    { num: 3, label: 'Step 3', title: 'Patient Details' },
    { num: 4, label: 'Step 4', title: 'Confirmation' },
  ];

  return (
    <div className={`w-full bg-surface-container-lowest rounded-2xl p-4 shadow-sm ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {steps.map((step) => {
          const isActive = currentStep === step.num;
          const isCompleted = currentStep > step.num;

          return (
            <button
              key={step.num}
              type="button"
              onClick={() => onStepClick && onStepClick(step.num)}
              className={`flex items-center gap-3 rounded-full px-4 py-2.5 transition-all text-left cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : isCompleted
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'bg-surface-container-lowest text-primary'
                    : isCompleted
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface'
                }`}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined text-sm">check</span>
                ) : (
                  step.num
                )}
              </span>

              <div className="flex flex-col truncate">
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold ${
                    isActive ? 'text-on-primary/80' : 'text-on-surface-variant'
                  }`}
                >
                  {step.label}
                </span>
                <span
                  className={`text-xs sm:text-sm font-semibold truncate leading-none ${
                    isActive
                      ? 'text-on-primary'
                      : isCompleted
                      ? 'text-on-secondary-container'
                      : 'text-on-surface'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgressBar;

