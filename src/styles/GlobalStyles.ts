import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --border-blue: 100, 149, 237;
    --page-width: 75%;
  }

  @media (max-width: 540px) {
    :root {
      --page-width: 85%;
    }
  }

  html, body {
    font-size: 10px;
    overflow-x: hidden;
  }

  body {
    background-color: #f5f6fc;
  }
`;
