import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import { darkTheme, lightTheme } from "../../utiles/themeObj";

const Theme: React.FC = ({ children }) => {

  const [currentTheme, setCurrentTheme] = useState(darkTheme)

  useEffect(():void => {
    debugger
    if (typeof window !== 'undefined') {
      console.log(localStorage.darkTheme)
      if (localStorage.darkTheme === undefined) {
        localStorage.setItem('darkTheme', String(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches))
      }
      if (localStorage.darkTheme === 'true') {
          setCurrentTheme(darkTheme)
      } else {
        setCurrentTheme(lightTheme)
      }
    }
  })

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
