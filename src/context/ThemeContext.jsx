import { createContext, useContext } from "react";
import { Light, Dark } from "../index";
import { ThemeProvider } from "styled-components";

export const ThemeContext = createContext();

export const ThemeProviderWithContext = ({ theme, children }) => {
  const themeStyle = theme === "light" ? Light : Dark;

  return (
    <ThemeContext.Provider value={{ theme, themeStyle }}>
      <ThemeProvider theme={themeStyle}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
