import React from 'react';
import { dentalServices, DentalService } from '../data/mockData';

export interface ServiceSelectorProps {
  readonly selectedServiceId: string;
  readonly onSelectService: (serviceId: string) => void;
  readonly onContinue?: () => void;
  readonly className?: string;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  selectedServiceId,
  onSelectService,
  onContinue,
  className = '',
}) => {
  const currentService =
    dentalServices.find((s) => s.id === selectedServiceId) || dentalServices[0];
  return (
    <section
      id="services"
      className={`bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-surface-container mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-sm">
            <span className="material-symbols-outlined text-2xl">
              medical_services
            </span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
              Select Primary Reason for Visit
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
              Includes diagnostic scan and tailored clinical consultation
            </p>
          </div>
        </div>

        <span className="self-start sm:self-center text-xs font-semibold bg-surface-container text-on-surface px-3 py-1 rounded-full">
          5 Specializations
        </span>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 gap-3.5">
        {dentalServices.map((service: DentalService) => {
          const isSelected = selectedServiceId === service.id;

          return (
            <label
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className={`group relative flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-surface-container-low border-primary ring-2 ring-primary/20 shadow-sm'
                  : 'bg-surface-container-lowest border-surface-container hover:bg-surface-container-low hover:border-outline-variant shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4 mb-3 md:mb-0">
                <input
                  type="radio"
                  name="dental_service"
                  checked={isSelected}
                  onChange={() => onSelectService(service.id)}
                  className="mt-1 accent-primary w-4 h-4 cursor-pointer"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-base sm:text-lg font-bold text-on-surface">
                      {service.name}
                    </span>

                    {service.tag && (
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          service.badgeType === 'popular'
                            ? 'bg-secondary-fixed text-on-secondary-container'
                            : service.badgeType === 'emergency'
                            ? 'bg-error-container text-on-error-container'
                            : service.badgeType === 'simulation'
                            ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                            : service.badgeType === 'free'
                            ? 'bg-surface-container-high text-primary'
                            : 'bg-surface-container text-on-surface'
                        }`}
                      >
                        {service.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-on-surface-variant font-medium pt-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        schedule
                      </span>
                      <span>{service.duration}</span>
                    </span>

                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        radiology
                      </span>
                      <span>{service.featureLabel}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Tag */}
              <div className="text-left md:text-right shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-surface-container md:border-none">
                <div className="text-2xl font-bold text-primary">
                  {service.price === 0 ? 'Free' : `$${service.price}`}
                </div>
                <div className="text-xs text-on-surface-variant font-medium">
                  {service.insuranceNote}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Selected Service Inline Continue Dock */}
      {onContinue && (
        <div className="mt-6 pt-5 border-t border-surface-container bg-surface-container-low p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-xs shrink-0">
              <span className="material-symbols-outlined text-xl">
                check_circle
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Selected Treatment
              </span>
              <p className="text-sm sm:text-base font-bold text-on-surface">
                {currentService.name} • {currentService.price === 0 ? 'Free' : `$${currentService.price}`}
              </p>
              <span className="text-xs text-on-surface-variant">
                {currentService.duration} • {currentService.featureLabel}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Proceed to Doctor &amp; Time</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default ServiceSelector;

