import { JWTPayload, compactVerify, decodeJwt, decodeProtectedHeader } from 'jose'

export type IDecoded = JWTPayload

export const DefaultDecoded: IDecoded = {
  header: { alg: 'HS256' },
  payload: {
    name: 'John Doe',
    iat: 1516239022,
  },
}

export const DefaultEncoded = ''

export const JsonStringSpace = 4 as const

export async function decode(token: string): Promise<IDecoded | null> {
  try {
    const payload = decodeJwt(token)
    const header = decodeProtectedHeader(token)
    return { payload, header }
  } catch {
    return null
  }
}

export async function isVerified(token: string, secret: string): Promise<boolean> {
  try {
    const uArrSecret = new TextEncoder().encode(secret)
    await compactVerify(token, uArrSecret)
    return true
  } catch {
    return false
  }
}
