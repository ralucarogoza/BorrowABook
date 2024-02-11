import React, { useEffect, createContext, useState } from "react";

const ThemeContext = createContext();



const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  console.log(theme);
  const switchTheme = () =>{
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        switchTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };