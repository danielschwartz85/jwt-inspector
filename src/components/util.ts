import { IDecoded } from './decoded'

export const DefaultDecoded: IDecoded = {
  header: { alg: 'HS256' },
  payload: {
    name: 'John Doe',
    iat: 1516239022,
  },
}

export const DefaultEncoded = ''

export const JsonStringSpace = 4 as const

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function decode(_token: string, _secret: string): IDecoded | null {
  try {
    // TODO
    return DefaultDecoded
  } catch (e) {
    return null
  }
}
