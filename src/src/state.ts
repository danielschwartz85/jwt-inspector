import { JWTPayload, ProtectedHeaderParameters } from 'jose'
import { jsonPrettyStr } from './util'

export interface ISavedSecret {
  expiration: Date
  label: string
  value: string
}

export interface IState {
  encoded: string
  header: string
  payload: string
  secret: string
  isVerified: boolean
  verifiedTick: number
}

export type IDecoded = { payload: JWTPayload; header: ProtectedHeaderParameters }

// Send only action args and their side affects (jwt async changes that are unrelated to state).
export type TAction =
  | { type: 'encodedChange'; isVerified: boolean; encoded: string; decoded?: IDecoded }
  | { type: 'headerChange'; header: string; encoded?: string }
  | { type: 'payloadChange'; payload: string; encoded?: string }
  | { type: 'secretChange'; secret: string; encoded?: string }

export const DefaultState: IState = {
  encoded: '',
  header: jsonPrettyStr({ alg: 'HS256', typ: 'JWT' }),
  payload: jsonPrettyStr({
    name: 'John Doe',
    iat: 1516239022,
  }),
  secret: 'YOUR-SECRET-HERE',
  isVerified: false,
  verifiedTick: 0,
}

export function reducer(state: IState, action: TAction): IState {
  let next: IState
  switch (action.type) {
    case 'encodedChange': {
      const payload = action.decoded
        ? jsonPrettyStr(action.decoded?.payload as JWTPayload)
        : DefaultState.payload
      const header = action.decoded
        ? jsonPrettyStr(action.decoded?.header as JWTPayload)
        : DefaultState.header
      next = {
        ...state,
        isVerified: action.isVerified,
        encoded: action.encoded,
        payload: payload,
        header: header,
      }
      break
    }
    case 'headerChange':
      next = {
        ...state,
        header: action.header,
        encoded: action.encoded || state.encoded || DefaultState.encoded,
        isVerified: !!action.encoded,
      }
      break
    case 'payloadChange':
      next = {
        ...state,
        payload: action.payload,
        encoded: action.encoded || state.encoded || DefaultState.encoded,
        isVerified: !!action.encoded,
      }
      break
    case 'secretChange':
      next = {
        ...state,
        isVerified: !!action.secret && !!action.encoded,
        secret: action.secret,
        encoded: action.encoded || state.encoded || DefaultState.encoded,
      }
      break
  }
  if (next.isVerified) next.verifiedTick = state.verifiedTick + 1
  else next.verifiedTick = 0
  return next
}
