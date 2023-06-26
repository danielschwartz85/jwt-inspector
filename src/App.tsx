import { Box, Paper, styled } from '@mui/material'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import JwtInput from './components/jwtInput'

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
        }}
      >
        <Grid container sx={{ px: 8, py: 4 }} spacing={4}>
          <Grid item md={4} xs={12}>
            <JwtInput />
          </Grid>
          <Grid item md={8} xs={12}>
            <Item sx={{ height: '500px' }}>See jwt</Item>
          </Grid>
          <Grid item md={12} xs={12}>
            <Item>footer</Item>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default App
