import React, { useState, useRef, useEffect } from 'react';
import { askGeminiAssistant, ChatMessage } from '../services/geminiService';

export interface LuminaAiAssistantModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onBookService?: (serviceId?: string) => void;
  readonly onOpenSchedule?: () => void;
  readonly onOpenQuickGuide?: () => void;
  readonly className?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    role: 'model',
    timestamp: 'Just now',
    text: `Hello! I'm your **Lumina Dental AI Concierge**.\n\nI can answer questions about our **services & pricing**, clinician credentials (Dr. Sarah Jenkins & Dr. Liam Thorne), **insurance coverage**, emergency toothache triage, or help you schedule a visit.\n\nHow can I help you today?`,
    quickActions: [
      { label: '💰 Pricing & Services', action: 'What are your services and prices?' },
      { label: '🦷 Dental Emergency Triage', action: 'I have severe tooth pain, what should I do?' },
      { label: '🛡️ Accepted Insurance', action: 'Which insurance plans do you accept?' },
      { label: '👨‍⚕️ Meet the Doctors', action: 'Tell me about Dr. Sarah Jenkins and the team' },
    ],
  },
];

export const LuminaAiAssistantModal: React.FC<LuminaAiAssistantModalProps> = ({
  isOpen,
  onClose,
  onBookService,
  onOpenSchedule,
  onOpenQuickGuide,
  className = '',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [customKey, setCustomKey] = useState<string>('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await askGeminiAssistant(query, messages, 'en');

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        text: 'I apologize, but I encountered a communication issue. Please call our clinic directly at (555) 234-8900 for immediate assistance.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper to format text with bold markdown
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold formatting
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className={line.startsWith('-') ? 'ml-3 my-1' : 'my-1'}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-on-surface">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-inverse-surface/60 backdrop-blur-sm transition-all ${className}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-surface rounded-3xl shadow-2xl border border-surface-container overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="bg-surface-container-lowest px-5 py-4 border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-sm">
              <span className="material-symbols-outlined text-2xl animate-pulse">
                smart_toy
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-on-surface leading-tight">
                  Lumina AI Dental Concierge
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wider">
                  Verified Clinical AI
                </span>
              </div>
              <p className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span>Online • 24/7 Clinical Q&amp;A &amp; Triage</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Quick Guide Trigger */}
            {onOpenQuickGuide && (
              <button
                type="button"
                onClick={onOpenQuickGuide}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors cursor-pointer mr-1"
                title="View Pre-op & Aftercare Quick Guide"
              >
                <span className="material-symbols-outlined text-sm">menu_book</span>
                <span>Quick Guide</span>
              </button>
            )}

            {/* Settings / API Key Toggle */}
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              title="API Key Configuration"
            >
              <span className="material-symbols-outlined text-xl">settings</span>
            </button>

            {/* Close Modal Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              aria-label="Close Assistant"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* API Settings Collapsible Banner */}
        {showConfig && (
          <div className="bg-surface-container-low px-5 py-3 border-b border-surface-container text-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-on-surface">Clinical AI Service:</span>
                <p className="text-on-surface-variant text-[11px]">
                  Configured via environment variable. Secure HIPAA session.
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="password"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="Enter Gemini API key..."
                  className="px-3 py-1.5 rounded-xl border border-surface-container bg-surface text-on-surface text-xs w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowConfig(false)}
                  className="px-3 py-1.5 rounded-xl bg-primary text-on-primary font-semibold shrink-0 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Action Top Bar */}
        <div className="bg-surface-container-lowest/60 px-5 py-2.5 border-b border-surface-container flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-on-surface-variant overflow-x-auto no-scrollbar py-0.5">
            <span className="font-semibold text-on-surface shrink-0">Try asking:</span>
            <button
              type="button"
              onClick={() => handleSend('What are the prices for teeth cleaning and exams?')}
              className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface shrink-0 cursor-pointer transition-colors"
            >
              Exams &amp; Pricing
            </button>
            <button
              type="button"
              onClick={() => handleSend('What dental insurance do you accept?')}
              className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface shrink-0 cursor-pointer transition-colors"
            >
              Insurance
            </button>
            <button
              type="button"
              onClick={() => handleSend('What should I do for a sudden toothache?')}
              className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface shrink-0 cursor-pointer transition-colors"
            >
              Toothache Care
            </button>
            <button
              type="button"
              onClick={() => handleSend('Tell me about Dr. Sarah Jenkins credentials')}
              className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface shrink-0 cursor-pointer transition-colors"
            >
              Our Dentists
            </button>
          </div>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-surface text-sm">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center shadow-xs ${
                    isUser
                      ? 'bg-primary text-on-primary'
                      : 'bg-secondary-fixed text-secondary'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {isUser ? 'person' : 'dentistry'}
                  </span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-sm text-left leading-relaxed ${
                    isUser
                      ? 'bg-primary-container text-on-primary-container rounded-tr-xs'
                      : 'bg-surface-container-lowest text-on-surface border border-surface-container rounded-tl-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1 text-[11px] opacity-75 font-semibold">
                    <span>{isUser ? 'You' : 'Lumina AI Concierge'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="space-y-1">{renderFormattedText(msg.text)}</div>

                  {/* Suggestion Quick Chips if provided */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-surface-container flex flex-wrap gap-2">
                      {msg.quickActions.map((action, aIdx) => (
                        <button
                          key={aIdx}
                          type="button"
                          onClick={() => handleSend(action.action)}
                          className="px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors cursor-pointer text-left"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Contextual Action Shortcuts */}
                  {!isUser && (
                    <div className="mt-3 pt-2.5 border-t border-surface-container/60 flex flex-wrap items-center gap-2">
                      {onBookService && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onBookService();
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-xs">calendar_month</span>
                          <span>Book Appointment</span>
                        </button>
                      )}

                      {onOpenSchedule && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenSchedule();
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-xs">chair</span>
                          <span>View Operatories</span>
                        </button>
                      )}

                      <a
                        href="tel:5552348901"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-semibold hover:opacity-90 transition-opacity"
                      >
                        <span className="material-symbols-outlined text-xs text-error">call</span>
                        <span>Emergency (555) 234-8901</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-lg animate-spin">
                  dentistry
                </span>
              </div>
              <div className="bg-surface-container-lowest border border-surface-container rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-2 text-on-surface-variant text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-150" />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-300" />
                <span className="ml-1">Lumina AI is consulting dental guidelines...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-surface-container-lowest p-3 sm:p-4 border-t border-surface-container">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about procedures, pricing, doctors, aftercare..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-2xl border border-surface-container bg-surface text-on-surface text-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
            />

            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isLoading}
              className="px-5 py-3 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              aria-label="Send query"
            >
              <span className="material-symbols-outlined text-lg">send</span>
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-on-surface-variant">
            <span>Verified AI Clinical Assistant &bull; HIPAA-compliant session</span>
            <span>Emergency hotline: (555) 234-8901</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuminaAiAssistantModal;

