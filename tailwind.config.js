module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          muted: 'var(--color-text-muted)',
          inverted:'var(--color-text-inverted)',
          success: 'var(--color-text-success)',
          'success-hover': 'var(--color-text-success-hover)',
          warning: 'var(--color-text-warning)'
        },
      },
      backgroundColor: {
        skin: {
          fill: 'var(--color-fill)',
          'success': 'var(--color-fill-success)',
          'success-hover': 'var(--color-fill-success-hover)',
          'field': 'var(--color-fill-field)',
          'base': 'var(--color-fill-base)',
          'warning': 'var(--color-fill-warning)',
        },
      },
      borderColor: {
        skin: {
          base: 'var(--color-border-base)',
          success: 'var(--color-border-success)',
        }
      },
      fontFamily: {
        body: ['Raleway', 'sans-serif'],
        heading: ['Recursive', 'sans-serif'],
       },
    },
  },
  plugins: [],
};
