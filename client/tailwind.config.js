/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable class-based dark mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
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
        primary: {
          DEFAULT: "#B22222", // Primary color (red)
          foreground: "#FFFFFF", // White for text on primary
        },
        secondary: {
          DEFAULT: "#FFFFFF", // Secondary color (white)
          foreground: "#B22222", // Red for text on secondary
        },
        accent: {
          DEFAULT: "#000000", // Accent color (black)
          foreground: "#FFFFFF", // White for text on accent
        },
        background: "#ffffff", // Light mode background
        popover: "#FFFFFF", // Solid white for dropdown menus
        foreground: "#000000", // Light mode text
        muted: {
          DEFAULT: "#F5F5F5", // Light gray for muted elements
          foreground: "#000000", // Red for muted text
        },
        border: "#e0e0e0", // Light gray for borders
        darkBackground: "#1a202c", // Dark mode background
        darkForeground: "#ffffff", // Dark mode text
        card: "#f9f9f9", // Light mode card background
        darkCard: "#2d3748", // Dark mode card background
        darkBorder: "#4a5568", // Dark mode border
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
      },
    },
  },
  plugins: [],
};