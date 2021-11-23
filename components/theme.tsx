import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { darkTheme, lightTheme } from "../utiles/themeObj";

const Theme: React.FC = ({ children }) => {

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
