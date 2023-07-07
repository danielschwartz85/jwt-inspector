import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { useCallback, useReducer } from 'react'
import Encoded, { IEncodedProps } from './components/encoded'
import Decoded, { IDecodedProps } from './components/decoded'
import Secret, { ISecretProps } from './components/secret'
import { decode, IDecoded, jsonPrettyStr, isVerified as verify } from './components/util'
import { JWTPayload, ProtectedHeaderParameters } from 'jose'

interface IState {
  encoded: string
  header: string
  payload: string
  secret: string
  isVerified: boolean
}

// Send only action args and their side affects (jwt async changes that are unrelated to state).
type TAction =
  | { type: 'encodedChange'; isValid: boolean; isVerified: boolean; encoded: string; decoded?: IDecoded }
  | { type: 'headerChange'; header: string; encoded?: string }
  | { type: 'payloadChange'; payload: string; encoded?: string }
  | { type: 'secretChange'; isVerified: boolean; secret: string; encoded?: string }

const DefaultState = {
  encoded: '',
  header: jsonPrettyStr({ alg: 'HS256' }),
  payload: jsonPrettyStr({
    name: 'John Doe',
    iat: 1516239022,
  }),
  secret: '',
  isVerified: false,
  isValid: false,
}

function reducer(state: IState, action: TAction): IState {
  switch (action.type) {
    case 'encodedChange':
      if (!action.isValid) {
        return {
          ...state,
          isVerified: false,
          encoded: action.encoded,
          payload: DefaultState.payload,
          header: DefaultState.header,
        }
      }
      return {
        ...state,
        isVerified: action.isVerified,
        encoded: action.encoded,
        payload: jsonPrettyStr(action.decoded?.payload as JWTPayload),
        header: jsonPrettyStr(action.decoded?.header as ProtectedHeaderParameters),
      }
    case 'headerChange':
      return { ...state, header: action.header, encoded: action.encoded || DefaultState.encoded }
    case 'payloadChange':
      return { ...state, payload: action.payload, encoded: action.encoded || DefaultState.encoded }
    case 'secretChange':
      return {
        ...state,
        isVerified: action.isVerified,
        secret: action.secret,
        encoded: action.encoded || DefaultState.encoded,
      }
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, DefaultState)
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
      const isVerified = await verify(state.encoded as string, state.secret)
      const encoded = 'TODO encode'
      dispatch({ type: 'secretChange', isVerified, secret, encoded })
    },
    [state.encoded, state.secret]
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
