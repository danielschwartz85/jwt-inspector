import { JWTPayload, ProtectedHeaderParameters } from 'jose'
import { jsonPrettyStr } from './components/util'

export interface IState {
  encoded: string
  header: string
  payload: string
  secret: string
  isVerified: boolean
  isValid: boolean
}

export type IDecoded = { payload: JWTPayload; header: ProtectedHeaderParameters }

// Send only action args and their side affects (jwt async changes that are unrelated to state).
export type TAction =
  | { type: 'encodedChange'; isValid: boolean; isVerified: boolean; encoded: string; decoded?: IDecoded }
  | { type: 'headerChange'; header: string; encoded?: string }
  | { type: 'payloadChange'; payload: string; encoded?: string }
  | { type: 'secretChange'; isVerified: boolean; secret: string; encoded?: string }

export const DefaultState = {
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

export function reducer(state: IState, action: TAction): IState {
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
