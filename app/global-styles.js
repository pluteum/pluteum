import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'IBM Plex Sans', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    height: 100%;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
