import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { useCallback, useState } from 'react'
import Encoded, { IEncodedProps } from './components/encoded'
import Decoded, { IDecodedProps } from './components/decoded'
import Secret from './components/secret'
import { decode, DefaultDecoded, DefaultEncoded } from './components/util'

export default function App() {
  const [decoded, setDecoded] = useState(DefaultDecoded)
  const [encoded, setEncoded] = useState(DefaultEncoded)
  // const [secret, setSecret] = useState()
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

  const onEncodedChange: IEncodedProps['onChange'] = useCallback((value) => {
    setEncoded(value)
    const decoded = decode(value, 'tmp') || DefaultDecoded
    setDecoded(decoded)
  }, [])

  const onDecodedChange: IDecodedProps['onChange'] = useCallback((fullPayload) => {
    setDecoded(fullPayload)
  }, [])

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
            <Encoded value={encoded} onChange={onEncodedChange} />
          </Grid>
          <Grid item md={8} xs={12}>
            <Decoded fullPayload={decoded} onChange={onDecodedChange} />
          </Grid>
          <Grid item md={12} xs={12}>
            <Secret />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
