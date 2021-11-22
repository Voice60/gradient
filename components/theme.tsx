import React, { createContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from "@material-ui/core";
import { darkTheme, lightTheme } from "../utiles/themeObj";

interface IThemeContext {
  darkMode?: boolean,
  setDarkMode?: (darkMode: boolean) => void
}

const Theme: React.FC = ({ children }) => {

  useEffect(() => {
    if (process.browser) {
      let theme: undefined | string = localStorage.getItem('darkTheme')
      if (theme === undefined) {
        localStorage.setItem('darkTheme', String(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches))
      }
    }
  }, [])

  const getTheme = (): object | null => {
    if (process.browser) {
      if (JSON.parse(localStorage?.darkTheme)) {
        return darkTheme
      }
      return lightTheme
    } else {
      return null
    }
  }

  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
