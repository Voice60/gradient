import React, { createContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from "@material-ui/core";
import { darkTheme, lightTheme } from "../utiles/themeObj";

// interface IThemeContext {
//   darkMode?: boolean,
//   setDarkMode?: (darkMode: boolean) => void
// }

const Theme: React.FC = ({ children }) => {
  // useEffect(() => {
  //   debugger
  //   if (typeof window !== 'undefined') {
  //     let theme: undefined | string = localStorage.getItem('darkTheme')
  //     debugger
  //     if (theme === 'undefined') {
  //       localStorage.setItem('darkTheme', String(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches))
  //     }
  //   }
  // }, [])

  const getTheme = (): object => {
    if (typeof window !== 'undefined') {
      if (localStorage.darkTheme === undefined) {
        localStorage.setItem('darkTheme', String(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches))
      }
      if (JSON.parse(localStorage.darkTheme)) {
        return darkTheme
      }
      return lightTheme
    } else {
      return darkTheme
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
