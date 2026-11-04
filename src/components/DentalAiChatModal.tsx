import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { askGeminiAssistant, ChatMessage } from '../services/geminiService';
import {
  Sparkles,
  X,
  Send,
  CalendarCheck,
  Bot,
  User,
  ShieldCheck,
  Loader2,
} from 'lucide-react';

export interface DentalAiChatModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onBookAppointment?: () => void;
}

const SUGGESTED_QUERIES_EN = [
  'Does deep teeth cleaning hurt?',
  'What should I do for a sudden throbbing toothache?',
  'How does Zoom whitening compare to strips?',
  'What dental insurance does Lumina accept?',
];

const SUGGESTED_QUERIES_TE = [
  'డీప్ టీత్ క్లీనింగ్ నొప్పిగా ఉంటుందా?',
  'అకస్మాత్తుగా పంటి నొప్పి వస్తే ఏమి చేయాలి?',
  'టీత్ వైటనింగ్ ఎలా పనిచేస్తుంది?',
  'లూమినా ఏ దంత బీమాలను అంగీకరిస్తుంది?',
];

export const DentalAiChatModal: React.FC<DentalAiChatModalProps> = ({
  isOpen,
  onClose,
  onBookAppointment,
}) => {
  const { language, translations } = useClinic();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'model',
      text: translations.aiWelcome,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Update welcome message if language changes and only welcome is present
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            id: 'welcome',
            role: 'model',
            text: translations.aiWelcome,
            timestamp: 'Just now',
          },
        ];
      }
      return prev;
    });
  }, [language, translations.aiWelcome]);

  const suggestedQueries = language === 'te' ? SUGGESTED_QUERIES_TE : SUGGESTED_QUERIES_EN;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askGeminiAssistant(query.trim(), messages, language);
      const aiMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: response.text,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `model-err-${Date.now()}`,
        role: 'model',
        text:
          language === 'te'
            ? 'క్షమించండి, మా క్లినికల్ సమాచార కేంద్రం అందుబాటులో లేదు. దయచేసి మా ద్వారపాలకుడిని (555) 234-8900 లో సంప్రదించండి.'
            : 'I had trouble connecting to the dental knowledge base. Please feel free to reach our concierge at (555) 234-8900.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-on-surface/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-surface-container-lowest rounded-3xl max-w-xl w-full h-[85vh] sm:h-[600px] max-h-[700px] shadow-2xl border border-outline-variant/30 flex flex-col overflow-hidden relative"
          >
            {/* Header - Verified Clinical AI */}
            <div className="p-4 sm:p-5 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shadow-sm shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-on-surface">{translations.aiTitle}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {translations.aiBadge}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium">
                    {translations.aiSubtitle}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="min-h-[44px] min-w-[44px] w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
                aria-label="Close AI chat"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {messages.map((msg) => {
                const isModel = msg.role === 'model';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-3 ${isModel ? 'justify-start' : 'justify-end'}`}
                  >
                    {isModel && (
                      <div className="w-8 h-8 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                        isModel
                          ? 'bg-surface-container-low text-on-surface border border-outline-variant/20'
                          : 'bg-primary text-on-primary font-medium'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>

                    {!isModel && (
                      <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {isLoading && (
                <div className="flex gap-3 items-center text-xs text-on-surface-variant">
                  <div className="w-8 h-8 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 animate-spin">
                    <Loader2 className="w-4 h-4" />
                  </div>
                  <span>{translations.aiThinking}</span>
                </div>
              )}
            </div>

            {/* Suggested Quick Prompts */}
            <div className="p-3 bg-surface-container-low border-t border-outline-variant/20 overflow-x-auto flex gap-2">
              {suggestedQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="min-h-[44px] text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary transition-all font-medium cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-3.5 bg-surface border-t border-outline-variant/20 flex items-center gap-2">
              {onBookAppointment && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onClose();
                    onBookAppointment();
                  }}
                  className="hidden sm:flex items-center gap-1.5 min-h-[44px] px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-on-primary text-xs font-bold transition-all shrink-0 cursor-pointer"
                  title={translations.aiBookVisitBtn}
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>{translations.aiBookVisitBtn}</span>
                </motion.button>
              )}

              <input
                type="text"
                placeholder={translations.aiInputPlaceholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                className="flex-1 px-4 py-2 min-h-[44px] text-base sm:text-xs rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-primary text-on-primary flex items-center justify-center disabled:opacity-40 hover:bg-primary-container transition-all shrink-0 cursor-pointer"
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DentalAiChatModal;

