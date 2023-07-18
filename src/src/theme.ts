import { orange } from '@mui/material/colors'
import { ThemeOptions } from '@mui/material/styles/createTheme'

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
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    text: { primary: '#3f51b5' },
    background: {
      default: '#fafafa',
      paper: '#FFFFFF',
    },
  },
}
