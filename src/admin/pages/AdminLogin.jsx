import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './AdminLogin.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@genwebtechnologies.com')
  const [password, setPassword] = useState('Admin@GenWeb2026!')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email, password)

    if (result.success) {
      navigate('/admin')
    } else {
      setError(result.message || 'Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg-glow" />

      <div className="admin-login-card">
        <Link to="/" className="back-to-site">
          <ArrowLeft size={16} /> Back to Website
        </Link>

        <div className="admin-brand-header">
          <img
            src="/ChatGPT Image Sep 4, 2026, 01_05_31 PM.png"
            alt="GenWeb Technologies"
            className="admin-logo"
          />
          <span className="admin-badge">
            <ShieldCheck size={14} /> Admin Portal
          </span>
          <h1>Welcome Back</h1>
          <p>Sign in to access the GenWeb Technologies client inquiries & management portal.</p>
        </div>

        {error && <div className="admin-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@genwebtechnologies.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="admin-submit-btn" disabled={loading}>
            {loading ? (
              <span className="btn-spinner" />
            ) : (
              <>
                Sign In to Dashboard <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>
            Protected by JWT & BCrypt Encryption • <strong>GenWeb Technologies</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
