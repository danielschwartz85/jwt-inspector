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

export function decode(token: string, secret: string): IDecoded | null {
  try {
    // TODO
    return DefaultDecoded
  } catch (e) {
    return null
  }
}
