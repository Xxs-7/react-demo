import Logo from "./img/logo.svg";

export const Header = () => (
  <>
    <div>
      <a href='https://tanstack.com/' target='_blank'>
        <Logo />
      </a>
    </div>
    <h2>Tanstack</h2>
    <h1>React-Query</h1>
  </>
);

export const Dependencies = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: ".5rem",
      fontSize: "1.5rem",
    }}
  >
    <a href='https://www.npmjs.com/package/json-server' target='_blank'>
      [json-server]
    </a>
    <a href='https://generatedata.com/' target='_blank'>
      [generate data]
    </a>
  </div>
);
