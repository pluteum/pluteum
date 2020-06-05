// Global Styling Variables

// Includes font family definitions, colors and more.

const lightColors = {
  primary: '#0A4FCD',
  primary__hover: '#105DE7',
  black: '#131314', // primary text color
  darkGrey: '#494B4F', // labels, input text color
  grey: '#BDC0C4', // borders
  lightGrey: '#DBDDE2',
  notAsLightBlue: '#EFF1F7',
  lightBlue: '#F7F8FA',
  red: '#D52020',
  offWhite: '#F7F7F7', // 😎
  white: '#FFFFFF',
  alwaysWhite: '#FFFFFF',
};

const darkColors = {
  primary: '#0A4FCD',
  primary__hover: '#105DE7',
  black: '#ffffff', // primary text color
  darkGrey: '#e4e4e4', // labels, input text color
  grey: '#423f3b', // borders
  lightGrey: '#DBDDE2',
  notAsLightBlue: '#EFF1F7',
  lightBlue: '#F7F8FA',
  red: '#D52020',
  offWhite: '#171717', // 😎
  white: '#090909',
  alwaysWhite: '#FFFFFF',
};

export default darkMode => ({
  colors: lightColors,
  type: {
    display_serif: "'DM Serif Display', serif",
    text_serif: "'DM Serif Text', serif",
    sans_serif:
      "'IBM Plex Sans', 'Open Sans', 'Helvetica Neue', Helvetica, Arial,sans-serif",
    mono:
      "'IBM Plex Mono', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;",
  },
});
