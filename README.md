# Lumina Dental Studio - Modern Dental Clinic Platform

A modern, gentle, and anxiety-free dental clinic web application built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, featuring real-time online appointment booking, an integrated single-doctor clinical portal, and an AI Dental Concierge powered by **Google Gemini 3.5 Flash Lite**.

---

## ✨ Key Features

### 1. 🦷 Public Landing & Hero Experience
- **Responsive Layout**: Fluid experience optimized across mobile (320px+), tablet, and desktop viewports.
- **Micro-Interactions & Motion Design**: Smooth staggered entrances, interactive hover elevations, and responsive feedback powered by **Framer Motion**.
- **Transparent Pricing & Services**: Upfront estimated copayments, procedure durations, and comfort amenities.
- **Zero Patient Anxiety Protocol**: Highlights Wand painless anesthesia, 3D optical scanning, and Bose noise-canceling headsets.

### 2. 📅 Unified Inline Appointment Booking
- **4-Step Inline Booking Flow**: Treatment selection, date & time slot picker, patient details with medical alerts, and instant review.
- **Inline Confirmation Dock**: Confirm button placed directly below the form (never lost in a disconnected sidebar).
- **Digital Confirmation Pass**: Instant confirmation ticket with appointment ID, procedure, clinician, and print-ready pass.
- **Real-Time Doctor Sync**: New patient bookings immediately appear in Dr. Sarah Jenkins' live clinical queue.

### 3. 🩺 Integrated Doctor Clinical Portal (Single Login)
- **Discreet Access**: Doctor portal is cleanly integrated inside the **Profile** page (not cluttered in public navigation or landing page).
- **Fast 1-Tap & Credential Sign-In**: Pre-authorized single clinician login (`doctor@lumina.com` / `smile123`).
- **Live Operatory Board**: Displays **WHO** is coming (patient name, age, phone, medical alerts), **WHEN** they arrive (time slot & date), and **WHAT** the problem is (chief complaint, tooth numbers, pain scale).
- **Real-Time Chair Tracking**: Toggle patient status between *Next Up*, *In Chair*, and *Completed*.
- **Clinician Charting**: In-line clinical note drafting and saving.

### 4. 🤖 AI Dental Concierge (Google AI Studio)
- Integrated floating concierge powered by **Gemini 3.5 Flash Lite**.
- Instant 24/7 dental Q&A answering common questions about procedures, pain management, insurance, and aftercare.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 6
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3 (Material 3-inspired design token architecture)
- **Typography**: Mona Sans
- **Animations**: Framer Motion 14
- **Icons**: Lucide React
- **AI Integration**: Google Gen AI SDK (`@google/genai`) / Gemini 3.5 Flash Lite
- **Auditing & Quality**: Custom AST component validator (`scripts/validate.js`) & AI Spacing Rulebook v1.0 auditor (`scripts/audit-spacing.js`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Siddhardha-14/Dental-clinic-AQ.git
cd Dental-clinic-AQ

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add your Gemini API key from Google AI Studio to .env
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Quality & Spacing Audits

```bash
npm run validate
npm run audit:spacing
```

---

## 👨‍⚕️ Doctor Portal Credentials

- **Email**: `doctor@lumina.com`
- **Passcode**: `smile123`
- *Or click "⚡ One-Tap Sign In as Dr. Sarah Jenkins" on the Profile page.*

---

## 📄 License

MIT License. Designed with care for modern gentle dentistry.
