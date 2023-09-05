import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { useReducer } from 'react'
import Encoded, { IEncodedProps } from './encoded/encoded'
import Decoded, { IDecodedProps } from './decoded/decoded'
import Secret, { ISecretProps } from './secret/secret'
import { decode, encode as sign, safeJsonParse, isVerified as verify } from '../src/util'
import { DefaultState, reducer } from '../src/state'
import { ThemeIcon } from './themeIcon'
import { useLocalUserTheme } from './common/common'
import Box from '@mui/material/Box'

export default function App() {
  const [state, dispatch] = useReducer(reducer, DefaultState)
  const [theme, isDarkMode, toggleDarkMode] = useLocalUserTheme()

  const encode = async (payload: string, header: string, secret?: string): Promise<string | undefined> => {
    const fullPayload = { payload: safeJsonParse(payload), header: safeJsonParse(header) }
    if (!fullPayload.payload || !fullPayload.header) return
    return await sign(fullPayload, secret || state.secret)
  }

  const onEncodedChange: IEncodedProps['onChange'] = async (encoded: string) => {
    if (!encoded) {
      const freshEncoded = await encode(state.payload, state.header)
      dispatch({ type: 'encodedChange', isVerified: true, encoded: freshEncoded || '' })
      return
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
          <ThemeIcon isDarkMode={isDarkMode} onClick={toggleDarkMode} />
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
            <Secret value={state.secret} isVerified={state.isVerified} onChange={onSecretChange} />
            <Typography variant={'caption'} sx={{ display: 'block', mt: 4 }}>
              Daniel Schwartz Inc 🚀 Copyright © 2023, All Rights Are All Right!
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
