module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1200px",
      xl: "1440px",
    },
    extend: {
      backgroundImage: (theme) => ({
        pattern:
          "url('https://i.pinimg.com/originals/90/2f/b6/902fb683da6e99129aa43990f81607cd.gif')",
      }),
    },
  },
  plugins: [],
};
