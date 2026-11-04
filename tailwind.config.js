/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Lumina Dental - Contemporary Healthcare SaaS & Clinical Clarity Design System
        primary: {
          DEFAULT: "#00685f",
          container: "#008378",
          fixed: "#89f5e7",
          "fixed-dim": "#6bd8cb",
        },
        "on-primary": {
          DEFAULT: "#ffffff",
          container: "#f4fffc",
          fixed: "#00201d",
          "fixed-variant": "#005049",
        },
        "inverse-primary": "#6bd8cb",

        secondary: {
          DEFAULT: "#006b5f",
          container: "#6df5e1",
          fixed: "#71f8e4",
          "fixed-dim": "#4fdbc8",
        },
        "on-secondary": {
          DEFAULT: "#ffffff",
          container: "#006f64",
          fixed: "#00201c",
          "fixed-variant": "#005048",
        },

        tertiary: {
          DEFAULT: "#006194",
          container: "#007bb9",
          fixed: "#cce5ff",
          "fixed-dim": "#93ccff",
        },
        "on-tertiary": {
          DEFAULT: "#ffffff",
          container: "#fdfcff",
          fixed: "#001d31",
          "fixed-variant": "#004b73",
        },

        surface: {
          DEFAULT: "#faf8ff",
          dim: "#d2d9f4",
          bright: "#faf8ff",
          "container-lowest": "#ffffff",
          "container-low": "#f2f3ff",
          container: "#eaedff",
          "container-high": "#e2e7ff",
          "container-highest": "#dae2fd",
          variant: "#dae2fd",
          tint: "#006a61",
        },
        background: "#faf8ff",
        "on-background": "#131b2e",
        "on-surface": {
          DEFAULT: "#131b2e",
          variant: "#3d4947",
        },
        outline: {
          DEFAULT: "#6d7a77",
          variant: "#bcc9c6",
        },
        "inverse-surface": "#283044",
        "inverse-on-surface": "#eef0ff",
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        "on-error": {
          DEFAULT: "#ffffff",
          container: "#93000a",
        },
      },
      spacing: {
        // AI Spacing Rulebook v1.0 Scale
        "space-0": "0px",
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "12px",
        "space-4": "16px",
        "space-5": "24px",
        "space-6": "32px",
        "space-7": "48px",
        "space-8": "64px",

        // Semantic Spacing Roles (TOK-01, CMP-01, FRM-01)
        "gap-icon-label": "8px",
        "gap-title-desc": "8px",
        "gap-heading-content": "16px",
        "gap-heading-compact": "12px",
        "inset-card-mobile": "16px",
        "inset-card-desktop": "24px",
        "btn-px": "16px",
        "btn-py": "12px",
        "chip-px": "12px",
        "chip-py": "4px",

        // Legacy layout support
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem",
        margin: "2rem",
        "margin-mobile": "1rem",
        gutter: "1.5rem",
        "gutter-mobile": "0.75rem",
      },
      minHeight: {
        touch: "44px", // INT-01 Minimum comfortable touch target
        "touch-min": "24px", // INT-02 WCAG 2.2 AA pointer target
      },
      minWidth: {
        touch: "44px",
        "touch-min": "24px",
      },
      fontFamily: {
        sans: ["'Mona Sans'", "system-ui", "-apple-system", "sans-serif"],
        headline: ["'Mona Sans'", "sans-serif"],
        body: ["'Mona Sans'", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.02)",
        md: "0 8px 24px -4px rgba(0, 104, 95, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.04)",
        lg: "0 20px 40px -8px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(0, 104, 95, 0.06)",
        card: "0 1px 8px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
}
