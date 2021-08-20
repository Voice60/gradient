import {createTheme} from "@material-ui/core/styles";

export const lightTheme = createTheme({
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

export const darkTheme = createTheme({
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