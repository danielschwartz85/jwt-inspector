import { orange } from '@mui/material/colors'
import { ThemeOptions } from '@mui/material/styles/createTheme'

declare module '@mui/material/styles' {
  interface Theme {
    jwt: { header: string; payload: string; signature: string }
  }
  interface ThemeOptions {
    jwt?: { header: string; payload: string; signature: string }
  }
}

export const DarkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: orange[400],
    },
    text: {
      primary: orange[400],
    },
  },
  jwt: {
    header: '#2490dd',
    payload: '#3aff75',
    signature: '#ff893a',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label, & label.Mui-focused': {
            color: orange[400],
          },
        },
      },
    },
  },
}

export const LightTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#371cad',
    },
    secondary: {
      main: '#e752a9',
    },
    text: { primary: '#371cad' },
    background: {
      default: '#fafafa',
      paper: '#FFFFFF',
    },
  },
  jwt: {
    header: '#df0c01',
    payload: '#0b8246',
    signature: '#097aaa',
  },
}
