module.exports = {
  content: [
      "./src/**/*.{js, jsx, ts, tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'shimmer-bounce': 'shimmerBounce 12s infinite'
      },
      keyframes: {
        shimmerBounce: {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            'animation-timing-function': 'cubic-bezier(.25,.1,.25,1)',
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(.25,.1,.25,1)',
          }
        }
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
