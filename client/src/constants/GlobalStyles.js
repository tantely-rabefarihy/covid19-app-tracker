import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #282828;
  }

  *,
  *:before,
  *:after {
    /* @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap'); */
    box-sizing: border-box;
    /* font-family: 'Roboto', sans-serif; */
    -webkit-font-smoothing: antialiased;
    color:white;
  }
`;

export default GlobalStyles;
