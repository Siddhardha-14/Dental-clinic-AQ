/**
 * Google AI Studio Gemini API Service for Lumina Dental Clinic
 */

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}

const DEFAULT_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.5-flash-lite';

export const CLINIC_KNOWLEDGE_PROMPT = `
You are the Lumina Dental AI Concierge, a warm, professional, empathetic, and medically precise virtual assistant for Lumina Dental clinic in San Francisco.

CLINIC INFORMATION:
- Name: Lumina Dental (Modern Dental Excellence)
- Address: 450 Sutter St, Suite 1800, San Francisco, CA 94108
- Operating Hours: Monday to Friday: 8:00 AM - 6:00 PM | Saturday: 9:00 AM - 3:00 PM | Sunday: Closed (Emergency on-call)
- General Phone: (555) 234-8900
- 24/7 Dental Emergency Hotline: (555) 234-8901
- Accreditation: ADA Certified, HIPAA Compliant, 4.9/5.0 Stars (1,420+ verified patient reviews)

CLINICIANS:
1. Dr. Sarah Jenkins, DDS, FAGD:
   - Lead Surgeon & Aesthetic Specialist (14+ yrs experience)
   - Specialties: Full mouth reconstruction, porcelain veneers, dental implants, surgical extraction
   - Background: Harvard School of Dental Medicine, Fellow of the Academy of General Dentistry

2. Dr. Liam Thorne, DDS, MS:
   - Prosthodontics & Minimally Invasive Specialist (11+ yrs experience)
   - Specialties: Complex crowns, inlays/onlays, TMJ therapy, cosmetic rehabilitation
   - Background: Columbia University College of Dental Medicine

3. Chloe Bennett, RDH, BSDH:
   - Lead Dental Hygienist & Periodontal Specialist (8+ yrs experience)
   - Specialties: Ultrasonic periodontal debridement, laser hygiene therapy, desensitization
   - Background: UCSF School of Dentistry

SERVICES & TRANSPARENT PRICING:
1. Comprehensive Oral Examination & 3D Scan: $185 (Includes low-dose digital radiographs, intraoral camera check, periodontal probing, and iTero® 3D bite scan).
2. Advanced Periodontal Therapy & Laser Prophy: $140 (Ultrasonic plaque/calculus debridement, micro-air polishing, laser pocket therapy, and enamel mineral glaze).
3. Porcelain Veneer & Aesthetic Design Consult: $290 (High-definition photographic smile design, 3D diagnostic mock-up, preview digital smile trial).
4. Orthodontic & Clear Aligner Evaluation: $0 (Complimentary 3D smile alignment scan, AI movement simulation, clear aligner roadmap).
5. Pediatric Precision Care & Sealants: $210 (Child-friendly gentle cleaning, fluoride varnish infusion, protective molar sealants, and anxiety-free coaching).

CLINIC AMENITIES & EXPERIENCE:
- Surgically Clean Air HEPA-14 scrubbers in every private operatory suite.
- Acoustic noise-dampening private operatory design (no open-bay noise).
- Heated massage dental chairs with adjustable lumbar support.
- Bose noise-canceling headphones with personalized streaming (music, podcasts).
- Warm lavender-infused scented face towels post-procedure.
- Nitrous oxide (laughing gas) available upon request for relaxation.
- Zero-wait contact-free digital check-in with Apple Wallet / Google Wallet pass.

INSURANCE & FINANCING:
- In-Network with: Delta Dental, Cigna, Aetna, MetLife, Guardian, UnitedHealthcare.
- Direct billing and pre-authorization assistance provided.
- Flexible payment options: CareCredit and Sunbit 0% APR financing available.
- Cancellation policy: No cancellation fees with at least 24 hours notice.

DENTAL TRIAGE & AFTERCARE QUICK RULES:
- Acute Toothache: Rinse gently with warm salt water. Floss to remove trapped debris. Take acetaminophen or ibuprofen as directed. Never place aspirin directly on gum tissue. Call (555) 234-8901 immediately if swelling or fever develops.
- Knocked-Out Tooth: Hold by the crown only (do NOT touch the root). Rinse gently in cold water if dirty. Store in cold milk or saliva and reach the clinic within 30-60 minutes for highest re-implantation success.
- Teeth Whitening "White Diet": For 48 hours post-whitening, avoid staining substances: coffee, black tea, red wine, tomato sauce, berries, soy sauce, tobacco.
- Post-Cleaning Care: Slight gum tenderness is normal. Use a soft-bristled brush and warm saltwater rinse.

GUIDANCE FOR YOUR RESPONSES:
- Be welcoming, empathetic, articulate, and reassuring.
- Format answers cleanly with markdown bullet points and bold highlights for readability.
- When relevant, guide patients to book an appointment or view clinic hours.
- For medical or emergency symptoms (such as facial swelling, severe bleeding, or difficulty breathing), provide immediate reassurance and strongly urge them to call the emergency hotline at (555) 234-8901.
`;

export async function askGeminiAssistant(
  prompt: string,
  history: ChatMessage[] = [],
  apiKeyOverride?: string
): Promise<{ text: string; error?: string }> {
  const apiKey = apiKeyOverride?.trim() || DEFAULT_API_KEY;

  if (!apiKey) {
    return {
      text: "I couldn't locate an active Google AI Studio API key. Please check your settings or environment configuration.",
      error: 'Missing API key',
    };
  }

  // Build conversation history for multi-turn chat
  const contents = [
    {
      role: 'user',
      parts: [{ text: CLINIC_KNOWLEDGE_PROMPT + '\n\nPlease acknowledge your role briefly.' }],
    },
    {
      role: 'model',
      parts: [{ text: 'Understood. I am the Lumina Dental AI Concierge, ready to provide gentle, accurate, and transparent dental guidance to all patients.' }],
    },
  ];

  // Append past user/model turns (up to last 6 messages)
  const recentHistory = history.slice(-6);
  for (const msg of recentHistory) {
    contents.push({
      role: msg.role,
      parts: [{ text: msg.text }],
    });
  }

  // Append current prompt
  contents.push({
    role: 'user',
    parts: [{ text: prompt }],
  });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 800,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn('Gemini API Error:', errorData);

      // Graceful fallback with offline knowledge if quota or rate-limit happens
      const fallbackReply = generateFallbackReply(prompt);
      return {
        text: fallbackReply,
        error: `API responded with status ${response.status}`,
      };
    }

    const data = await response.json();
    const candidateText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'I apologize, but I could not formulate a complete answer. How else can I assist your dental care today?';

    return { text: candidateText };
  } catch (err: unknown) {
    console.error('Fetch error talking to Gemini API:', err);
    // Return friendly offline response
    return {
      text: generateFallbackReply(prompt),
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}

/**
 * Intelligent local fallback responder if network or API quota is temporarily unavailable
 */
function generateFallbackReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('service') || q.includes('clean') || q.includes('exam') || q.includes('cost') || q.includes('price')) {
    return `**Lumina Dental Services & Transparent Pricing:**\n\n- **Comprehensive Oral Exam & 3D Scan:** $185 (includes low-dose digital x-rays & iTero® bite scan)\n- **Advanced Periodontal Therapy & Laser Prophy:** $140\n- **Porcelain Veneer & Aesthetic Consult:** $290 (includes digital smile mock-up)\n- **Clear Aligner & Orthodontic Evaluation:** $0 (Complimentary scan)\n- **Pediatric Precision Care:** $210\n\nAll pricing is transparent with zero hidden fees. Would you like help booking one of these services?`;
  }

  if (q.includes('doctor') || q.includes('dentist') || q.includes('sarah') || q.includes('jenkins') || q.includes('thorne')) {
    return `**Meet Our Clinical Team:**\n\n- **Dr. Sarah Jenkins, DDS, FAGD** — Lead Surgeon & Aesthetic Specialist (14+ yrs, Harvard Dental alumna)\n- **Dr. Liam Thorne, DDS, MS** — Prosthodontics & Minimally Invasive Specialist (11+ yrs, Columbia alumna)\n- **Chloe Bennett, RDH** — Lead Dental Hygienist & Periodontal Specialist (8+ yrs, UCSF)\n\nBoth doctors are accepting new patients in our private acoustic suites.`;
  }

  if (q.includes('emergency') || q.includes('pain') || q.includes('hurt') || q.includes('ache') || q.includes('blood') || q.includes('swelling')) {
    return `⚠️ **Dental Emergency Guidance:**\n\n1. **Severe Pain/Swelling:** Rinse gently with warm saltwater. Apply a cold compress to your cheek for 15 minutes. Do not place aspirin directly on gums.\n2. **Knocked-Out Tooth:** Keep it in cold milk or saliva and reach us within 30–60 minutes.\n3. **Call Us Immediately:** Our 24/7 emergency line is **(555) 234-8901**. We offer same-day priority relief slots.`;
  }

  if (q.includes('insurance') || q.includes('delta') || q.includes('cigna') || q.includes('metlife')) {
    return `**Dental Insurance & Coverage:**\n\nWe are in-network with **Delta Dental, Cigna, Aetna, MetLife, Guardian, and UnitedHealthcare**. We handle direct claims submission and complimentary benefits checks.\n\nWe also offer 0% APR financing through CareCredit and Sunbit.`;
  }

  if (q.includes('hour') || q.includes('time') || q.includes('where') || q.includes('location') || q.includes('address')) {
    return `**Lumina Dental Location & Hours:**\n\n📍 **Address:** 450 Sutter St, Suite 1800, San Francisco, CA 94108\n⏰ **Hours:**\n- Monday – Friday: 8:00 AM – 6:00 PM\n- Saturday: 9:00 AM – 3:00 PM\n- Sunday: Emergency on-call\n📞 **Phone:** (555) 234-8900 | Emergency: (555) 234-8901`;
  }

  return `Welcome to **Lumina Dental**. I can assist you with:\n\n- Transparent service pricing ($185 Comprehensive Exam, $140 Cleaning, $290 Veneer Consult)\n- Scheduling with Dr. Sarah Jenkins or Dr. Liam Thorne\n- Insurance coverage and 0% financing options\n- Emergency dental triage and pre/post-procedure guidance\n\nHow may I help with your smile today?`;
}

