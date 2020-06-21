// Global Styling Variables

import { ThemeProvider, css } from 'styled-components';
import React from 'react';

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

function theme(darkMode) {
  return {
    colors: lightColors,
    type: {
      display_serif: "'DM Serif Display', serif",
      text_serif: "'DM Serif Text', serif",
      sans_serif:
        "'IBM Plex Sans', 'Open Sans', 'Helvetica Neue', Helvetica, Arial,sans-serif",
      mono:
        "'IBM Plex Mono', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;",
    },
  };
}

export const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme(false)}>{storyFn()}</ThemeProvider>
);

const sizes = {
  desktop: 1200,
  tablet: 767,
  phone: 415,
};

export const media: any = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (template, ...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(template, ...args)}
    }
  `;

  return acc;
}, {});

export default theme;
