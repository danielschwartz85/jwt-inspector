import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { useCallback, useReducer } from 'react'
import Encoded, { IEncodedProps } from './components/encoded'
import Decoded, { IDecodedProps } from './components/decoded'
import Secret, { ISecretProps } from './components/secret'
import { decode, encode as sign, safeJsonParse, isVerified as verify } from './components/util'
import { DarkTheme, LightTheme } from './theme'
import { DefaultState, reducer } from './state'

export default function App() {
  const [state, dispatch] = useReducer(reducer, DefaultState)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(() => createTheme(prefersDarkMode ? DarkTheme : LightTheme), [prefersDarkMode])

  const encode = useCallback(
    async (payload: string, header: string, secret?: string) => {
      const fullPayload = { payload: safeJsonParse(payload), header: safeJsonParse(header) }
      return await sign(fullPayload, secret || state.secret)
    },
    [state.secret]
  )

  const onEncodedChange: IEncodedProps['onChange'] = useCallback(
    async (encoded: string) => {
      if (!encoded) {
        dispatch({ type: 'encodedChange', isVerified: false, encoded })
      }
      const decoded = await decode(encoded as string)
      const isVerified = await verify(encoded as string, state.secret)
      dispatch({ type: 'encodedChange', isVerified, encoded, decoded })
    },
    [state.secret]
  )

  const onHeaderChange: IDecodedProps['onHeaderChange'] = useCallback(
    async (header: string) => {
      const encoded = await encode(state.payload, header)
      dispatch({ type: 'headerChange', header, encoded })
    },
    [encode, state.payload]
  )

  const onPayloadChange: IDecodedProps['onPayloadChange'] = useCallback(
    async (payload: string) => {
      const encoded = await encode(payload, state.header)
      dispatch({ type: 'payloadChange', payload, encoded })
    },
    [encode, state.header]
  )

  const onSecretChange: ISecretProps['onChange'] = useCallback(
    async (secret: string) => {
      if (!secret) {
        dispatch({ type: 'secretChange', secret })
      }
      const encoded = await encode(state.payload, state.header, secret)
      dispatch({ type: 'secretChange', secret, encoded })
    },
    [encode, state.encoded, state.header, state.payload]
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
        <Grid container sx={{ px: 4, py: 4 }} spacing={2}>
          <Grid item md={4} xs={12}>
            <Encoded value={state.encoded} onChange={onEncodedChange} />
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
