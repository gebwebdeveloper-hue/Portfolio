import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const RAW_API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const API_BASE_URL = RAW_API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '')

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('genweb_admin_token'))
  const [loading, setLoading] = useState(true)

  // Verify session on initial mount
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('genweb_admin_token')
      if (!storedToken) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        const data = await res.json()

        if (res.ok && data.success) {
          setAdmin(data.data)
          setToken(storedToken)
        } else {
          // Token expired or invalid
          localStorage.removeItem('genweb_admin_token')
          setAdmin(null)
          setToken(null)
        }
      } catch (err) {
        console.error('Session verification failed:', err)
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [])

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed. Please check your credentials.')
      }

      const { token: jwtToken, ...adminProfile } = data.data
      localStorage.setItem('genweb_admin_token', jwtToken)
      setToken(jwtToken)
      setAdmin(adminProfile)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('genweb_admin_token')
    setAdmin(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token && !!admin,
        loading,
        login,
        logout,
        API_BASE_URL,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
