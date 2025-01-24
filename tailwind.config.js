/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#578E7E',
          dark: '#3D3D3D'
        },
        secondary: {
          light: '#FFFAEC', 
          DEFAULT: '#F5ECD5', 
        },
        info: {
          light: '#9ACBD0', // Light info color
          DEFAULT: '#2973B2', // Info color
        },
        warning: {
          light: '#fde68a', // Light yellow
          DEFAULT: '#facc15', // Yellow
          dark: '#ca8a04', // Dark yellow
        },
        success: {
          light: '#86efac', // Light green
          DEFAULT: '#22c55e', // Green
          dark: '#15803d', // Dark green
        },
        danger: {
          light: '#fca5a5', // Light red
          DEFAULT: '#ef4444', // Red
          dark: '#b91c1c', // Dark red
        },
        neutral: {
          light: '#f3f4f6', // Light gray
          DEFAULT: '#9ca3af', // Gray
          dark: '#4b5563', // Dark gray
        },
      },
    },
  },
  plugins: [],
}

