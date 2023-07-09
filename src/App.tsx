import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { useCallback, useReducer } from 'react'
import Encoded, { EEncodedState, IEncodedProps } from './components/encoded'
import Decoded, { IDecodedProps } from './components/decoded'
import Secret, { ISecretProps } from './components/secret'
import { decode, isVerified as verify } from './components/util'
import { DarkTheme, LightTheme } from './theme'
import { DefaultState, reducer } from './state'

export default function App() {
  const [state, dispatch] = useReducer(reducer, DefaultState)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(() => createTheme(prefersDarkMode ? DarkTheme : LightTheme), [prefersDarkMode])

  const onEncodedChange: IEncodedProps['onChange'] = useCallback(
    async (encoded: string) => {
      if (!encoded) {
        dispatch({ type: 'encodedChange', isValid: false, isVerified: false, encoded })
      }
      const decoded = await decode(encoded as string)
      const isVerified = await verify(encoded as string, state.secret)
      dispatch({ type: 'encodedChange', isValid: !!decoded, isVerified, encoded, decoded })
    },
    [state.secret]
  )

  const onHeaderChange: IDecodedProps['onHeaderChange'] = useCallback((header: string) => {
    const encoded = 'TODO encode if secret is there'
    dispatch({ type: 'headerChange', header, encoded })
  }, [])

  const onPayloadChange: IDecodedProps['onPayloadChange'] = useCallback((payload: string) => {
    const encoded = 'TODO encode if secret is there'
    dispatch({ type: 'payloadChange', payload, encoded })
  }, [])

  const onSecretChange: ISecretProps['onChange'] = useCallback(
    async (secret: string) => {
      if (!secret) {
        dispatch({ type: 'secretChange', isVerified: false, secret })
      }
      const isVerified = await verify(state.encoded as string, secret)
      const encoded = 'TODO encode'
      dispatch({ type: 'secretChange', isVerified, secret, encoded })
    },
    [state.encoded]
  )

  const encodedState =
    !state.encoded || state.isVerified
      ? EEncodedState.Verified
      : !state.isValid
      ? EEncodedState.Invalid
      : EEncodedState.Unverified

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
        <Grid container sx={{ px: 4, py: 4 }} spacing={2}>
          <Grid item md={4} xs={12}>
            <Encoded value={state.encoded} state={encodedState} onChange={onEncodedChange} />
          </Grid>
          <Grid item md={8} xs={12}>
            <Decoded
              payload={state.payload}
              header={state.header}
              onHeaderChange={onHeaderChange}
              onPayloadChange={onPayloadChange}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Secret value={state.secret} onChange={onSecretChange} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
