import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { useReducer } from 'react'
import Encoded, { IEncodedProps } from './encoded'
import Decoded, { IDecodedProps } from './decoded'
import Secret, { ISecretProps } from './secret'
import { DarkTheme, LightTheme } from '../src/theme'
import { decode, encode as sign, safeJsonParse, isVerified as verify } from '../src/util'
import { DefaultState, reducer } from '../src/state'

export default function App() {
  const [state, dispatch] = useReducer(reducer, DefaultState)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(() => createTheme(prefersDarkMode ? DarkTheme : LightTheme), [prefersDarkMode])

  const encode = async (payload: string, header: string, secret?: string): Promise<string | undefined> => {
    const fullPayload = { payload: safeJsonParse(payload), header: safeJsonParse(header) }
    if (!fullPayload.payload || !fullPayload.header) return
    return await sign(fullPayload, secret || state.secret)
  }

  const onEncodedChange: IEncodedProps['onChange'] = async (encoded: string) => {
    if (!encoded) {
      dispatch({ type: 'encodedChange', isVerified: false, encoded })
    }
    const decoded = await decode(encoded as string)
    const isVerified = await verify(encoded as string, state.secret)
    dispatch({ type: 'encodedChange', isVerified, encoded, decoded })
  }

  const onHeaderChange: IDecodedProps['onHeaderChange'] = async (header: string) => {
    const encoded = await encode(state.payload, header)
    dispatch({ type: 'headerChange', header, encoded })
  }

  const onPayloadChange: IDecodedProps['onPayloadChange'] = async (payload: string) => {
    const encoded = await encode(payload, state.header)
    dispatch({ type: 'payloadChange', payload, encoded })
  }

  const onSecretChange: ISecretProps['onChange'] = async (secret: string) => {
    if (!secret) {
      dispatch({ type: 'secretChange', secret })
    }
    const encoded = await encode(state.payload, state.header, secret)
    dispatch({ type: 'secretChange', secret, encoded })
  }

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
        <Grid
          item
          container
          direction={'column'}
          rowSpacing={2}
          justifyContent={'space-between'}
          sx={{ px: 4, pb: 3, pt: 6, minHeight: '100%' }}
        >
          <Grid container direction={'row'} spacing={2}>
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
          </Grid>
          <Grid item>
            <Secret value={state.secret} onChange={onSecretChange} />
            <Typography variant={'caption'} sx={{ display: 'block', mt: 4 }}>
              Daniel Schwartz Inc 🚀 Copyright © 2023, All Rights Are All Right!
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
