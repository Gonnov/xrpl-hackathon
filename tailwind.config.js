module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accentbackgroundbold: "var(--accentbackgroundbold)",
        "app-background": "var(--app-background)",
        dangerbackgroundbold: "var(--dangerbackgroundbold)",
        neutralbackgroundsoft: "var(--neutralbackgroundsoft)",
        neutralbackgroundsubtle: "var(--neutralbackgroundsubtle)",
        "neutralbordersneutral-border-bold":
          "var(--neutralbordersneutral-border-bold)",
        "neutralbordersneutral-border-soft":
          "var(--neutralbordersneutral-border-soft)",
        neutraltextbold: "var(--neutraltextbold)",
        "neutraltextbold-inverse": "var(--neutraltextbold-inverse)",
        "neutraltextbold-inverse-stay": "var(--neutraltextbold-inverse-stay)",
        neutraltextdisabled: "var(--neutraltextdisabled)",
        neutraltextsoft: "var(--neutraltextsoft)",
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
      },
      fontFamily: {
        "body-default": "var(--body-default-font-family)",
        "body-large": "var(--body-large-font-family)",
        "body-small": "var(--body-small-font-family)",
        button: "var(--button-font-family)",
        "menu-item": "var(--menu-item-font-family)",
        "title-block": "var(--title-block-font-family)",
        "title-section": "var(--title-section-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      boxShadow: { "shadow-s": "var(--shadow-s)" },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
