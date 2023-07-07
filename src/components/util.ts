import { JWTPayload, ProtectedHeaderParameters, compactVerify, decodeJwt, decodeProtectedHeader } from 'jose'

export type IDecoded = { payload: JWTPayload; header: ProtectedHeaderParameters }

export const JsonStringSpace = 4 as const

export async function decode(token: string): Promise<IDecoded | undefined> {
  try {
    const payload = decodeJwt(token)
    const header = decodeProtectedHeader(token)
    return { payload, header }
  } catch {
    return undefined
  }
}

export async function isVerified(token: string, secret?: string): Promise<boolean> {
  try {
    const uArrSecret = new TextEncoder().encode(secret)
    await compactVerify(token, uArrSecret)
    return true
  } catch {
    return false
  }
}

export function jsonPrettyStr(obj: Record<string, unknown>): string {
  return JSON.stringify(obj, null, JsonStringSpace)
}
