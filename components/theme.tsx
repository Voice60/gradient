import React, {createContext, useEffect, useState} from 'react';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";
import {darkTheme, lightTheme} from "../utiles/themeObj";

const Theme: React.FC = ({children}) => {
  interface IThemeContext {
    darkMode: boolean,
    setDarkMode: (darkMode: boolean) => void
  }

  const userPrefersDark = () => {
    if (process.browser) {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }
  const [darkMode, setDarkMode] = useState<boolean>(userPrefersDark)

  const ThemeContext = createContext<IThemeContext>({darkMode, setDarkMode});
  return (
    <ThemeContext.Provider value={{
      darkMode,
      setDarkMode
    }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline/>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default Theme;
