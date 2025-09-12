import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        rail: {
          express: "hsl(var(--rail-express))",
          premium: "hsl(var(--rail-premium))",
          local: "hsl(var(--rail-local))",
          freight: "hsl(var(--rail-freight))",
          special: "hsl(var(--rail-special))",
        },
        control: {
          sidebar: "hsl(var(--control-sidebar))",
          panel: "hsl(var(--control-panel))",
          active: "hsl(var(--control-active))",
          critical: "hsl(var(--control-critical))",
          offline: "hsl(var(--control-offline))",
        },
        status: {
          online: "hsl(var(--status-online))",
          warning: "hsl(var(--status-warning))",
          critical: "hsl(var(--status-critical))",
          offline: "hsl(var(--status-offline))",
        },
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-success": "var(--gradient-success)",
        "gradient-warning": "var(--gradient-warning)",
        "gradient-danger": "var(--gradient-danger)",
        "gradient-sidebar": "var(--gradient-sidebar)",
      },
      boxShadow: {
        "glow-primary": "var(--glow-primary)",
        "glow-success": "var(--glow-success)",
        "glow-warning": "var(--glow-warning)",
        "glow-danger": "var(--glow-danger)",
        "glow-active": "var(--glow-active)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px currentColor",
          },
          "50%": {
            boxShadow: "0 0 20px currentColor, 0 0 30px currentColor",
          },
        },
        "blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0.3" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "blink": "blink 1s ease-in-out infinite",
        "slide-right": "slide-right 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
