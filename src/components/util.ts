import { Jwt, verify } from 'jsonwebtoken'

export type IDecoded = Pick<Jwt, 'header' | 'payload'>

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
  // TODO - try https://github.com/panva/jose
  try {
    return verify(token, secret, { algorithms: ['HS256'], complete: true })
  } catch (e) {
    console.log('🚀 XXXXXX ~ file: util.ts:21 ~ decode ~ e:', e)
    return null
  }
}
