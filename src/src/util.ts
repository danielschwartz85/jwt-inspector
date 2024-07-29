import { CompactSign, compactVerify, decodeJwt, decodeProtectedHeader } from 'jose'
import { IDecoded, ISavedSecret } from './state'

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
      .setProtectedHeader({ ...header, alg: 'HS256' })
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

export const SecretManager = {
  getSecret: (label: string): string | undefined => {
    const secrets = SecretManager.getSecrets()
    if (!secrets[label]) return
    const exp = new Date(secrets[label].expiration)
    if (exp < new Date()) {
      SecretManager.deleteSecret(label)
      return
    }
    return secrets[label].value
  },
  saveSecret: (secret: ISavedSecret): void => {
    const secrets = SecretManager.getSecrets()
    secrets[secret.label] = secret
    localStorage.setItem('secrets', JSON.stringify(secrets))
  },
  saveSecrets: (secrets: Record<string, ISavedSecret>): void => {
    localStorage.setItem('secrets', JSON.stringify(secrets))
  },
  deleteSecret: (label: string): void => {
    const secrets = SecretManager.getSecrets()
    if (!secrets[label]) return
    delete secrets[label]
    localStorage.setItem('secrets', JSON.stringify(secrets))
  },
  getSecrets: (): Record<string, ISavedSecret> => {
    const savedSecrets = localStorage.getItem('secrets')
    return savedSecrets ? JSON.parse(savedSecrets) : {}
  },
}

export function ellipsePad(str: string, limit = 70) {
  return str.length >= limit ? `${str.substring(0, limit - 3)}...` : str
}

export function isNumber(val: any): val is number {
  return !isNaN(val);
}