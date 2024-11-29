import React from "react";

const ThemeContext = React.createContext("light");

const SubComponent = () => {
  const theme = React.useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
};

const ContextDemo = () => {
  const [theme, setTheme] = React.useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className='h-screen w-full flex flex-col items-center justify-center'
        style={{ backgroundColor: theme === "light" ? "white" : "black", color: theme === "light" ? "black" : "white" }}
      >
        <button className='p-1 border rounded-md' onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          change theme
        </button>
        <SubComponent />
      </div>
    </ThemeContext.Provider>
  );
};
export default ContextDemo;
