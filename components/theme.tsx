import React, {createContext, useEffect, useState} from 'react';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";

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
  const lightTheme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#212121',
        dark: '#3f3f3f',
        contrastText: '#fff'
      },
      secondary: {
        main: '#585c70',
      },
      warning: {
        main: '#ED2E45'
      },
      background: {
        paper: '#f0f8ff',
        default: '#fff'
      },
      text: {
        primary: '#212121'
      }
    },
    typography: {
      h3: {
        fontWeight: 300
      },
      h4: {
        fontWeight: 300
      },
      h5: {
        fontWeight: 300
      },
      h6: {
        fontWeight: 300
      },
    }
  })

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff',
        contrastText: '#212121'
      },
      secondary: {
        main: '#585c70',
      },
      warning: {
        main: '#ED2E45'
      },
      background: {
        paper: '#323232',
        default: '#1e1e1e'
      },
      text: {
        primary: '#ffffff'
      }
    },
    typography: {
      h3: {
        fontWeight: 300
      },
      h4: {
        fontWeight: 300
      },
      h5: {
        fontWeight: 300
      },
      h6: {
        fontWeight: 300
      },
    }
  })


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
