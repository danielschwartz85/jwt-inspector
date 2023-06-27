import { Box, Paper, styled } from '@mui/material'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import Encoded from './components/encoded'
import Decoded from './components/decoded'
import Secret from './components/secret'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  borderStyle: 'dotted',
}))

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  )
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'fixed',
          overflow: 'auto',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Grid container sx={{ px: 8, py: 4 }} spacing={2}>
          <Grid item md={4} xs={12}>
            <Encoded />
          </Grid>
          <Grid item md={8} xs={12}>
            <Decoded />
          </Grid>
          <Grid item md={12} xs={12}>
            <Secret />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default App
