export type IJwt = {
  header: {
    alg: string
  }
  payload: Record<string, unknown>
  secret: string
}

export const DefaultDecoded: IJwt = {
  header: { alg: 'HS256' },
  payload: {
    name: 'John Doe',
    iat: 1516239022,
  },
  secret: '',
}

export const JsonStringSpace = 4 as const

export function decode(token: string, secret: string): Pick<IJwt, 'header' | 'payload'> | null {
  try {
    const header = { alg: '' }
    const payload = {}
    return { header, payload }
  } catch (e) {
    return null
  }
}
