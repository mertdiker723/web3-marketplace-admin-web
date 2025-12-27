export const isTokenValid = (token: string): boolean => {
  try {
    const tokenParts = token.split('.')
    if (tokenParts.length !== 3) {
      return false
    }

    const [header, payload, signature] = tokenParts

    if (!header || !payload || !signature) {
      return false
    }

    // Header
    const { alg, typ } = JSON.parse(atob(header))

    if (!alg || !typ || typ !== 'JWT') {
      return false
    }

    // Payload
    const { id, email, userType, exp, iat } = JSON.parse(atob(payload))

    if (!id || !email || !userType || !exp || !iat) {
      return false
    }

    const now = Math.floor(Date.now() / 1000)

    return exp > now

    // Signature is not required for Frontend validation, beacuse SECRET_KEY cannot be available in Frontend
  } catch {
    return false
  }
}

export const getUserInfoFromToken = (
  token: string,
): { id: string; email: string; userType: string } | null => {
  try {
    const atobTokenPayload = atob(token.split('.')[1] || '')
    if (!atobTokenPayload) {
      return null
    }
    const { id, email, userType } = JSON.parse(atobTokenPayload)

    if (!id || !email || !userType) {
      return null
    }

    return {
      id,
      email,
      userType,
    }
  } catch {
    return null
  }
}
