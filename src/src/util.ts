import { CompactSign, compactVerify, decodeJwt, decodeProtectedHeader } from 'jose'
import { IDecoded } from './state'

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

export async function encode(decoded: Partial<IDecoded>, secret?: string): Promise<string | undefined> {
  const { payload, header } = decoded
  try {
    const toEncode = JSON.stringify(payload)
    const uArrSecret = new TextEncoder().encode(secret)
    return await new CompactSign(new TextEncoder().encode(toEncode))
      .setProtectedHeader({ alg: 'HS256', ...header })
      .sign(uArrSecret)
  } catch {
    return undefined
  }
}

export function jsonPrettyStr(obj: Record<string, unknown>): string {
  return JSON.stringify(obj, null, JsonStringSpace)
}

export function safeJsonParse(obj: string): Record<string, unknown> | undefined {
  try {
    return JSON.parse(obj)
  } catch {
    return undefined
  }
}
