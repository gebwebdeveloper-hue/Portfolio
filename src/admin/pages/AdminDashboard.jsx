import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Inbox,
  Clock,
  CheckCircle2,
  CheckCircle,
  Archive,
  RefreshCw,
  Search,
  LogOut,
  ExternalLink,
  Mail,
  Eye,
  Trash2,
  ShieldCheck,
  AlertCircle,
  Calendar,
  Layers,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import InquiryDetailsModal from '../components/InquiryDetailsModal'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const { user, token, logout, API_BASE_URL } = useAuth()
  const [inquiries, setInquiries] = useState([])
  const [stats, setStats] = useState({ total: 0, new: 0, inReview: 0, contacted: 0, closed: 0 })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInquiry, setSelectedInquiry] = useState(null)

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  // Fetch Stats & Inquiries
  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const [statsRes, inqRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/stats`, { headers: authHeaders }),
        fetch(`${API_BASE_URL}/api/inquiries`, { headers: authHeaders }),
      ])

      if (statsRes.status === 401 || inqRes.status === 401) {
        logout()
        return
      }

      if (!statsRes.ok || !inqRes.ok) {
        throw new Error('Failed to load dashboard data from server')
      }

      const statsData = await statsRes.json()
      const inqData = await inqRes.json()

      setStats(statsData.data || { total: 0, new: 0, inReview: 0, contacted: 0, closed: 0 })
      setInquiries(inqData.data || [])
    } catch (err) {
      console.error('Fetch dashboard error:', err)
      setError(err.message || 'Unable to connect to GenWeb server')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [API_BASE_URL, token, logout])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleManualRefresh = () => {
    setRefreshing(true)
    fetchData()
  }

  // Update Status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error('Failed to update status')
      const data = await res.json()
      
      // Update local state
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, status: data.data.status } : inq))
      )
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry((prev) => ({ ...prev, status: data.data.status }))
      }

      // Re-fetch stats count
      fetch(`${API_BASE_URL}/api/stats`, { headers: authHeaders })
        .then((r) => r.json())
        .then((d) => d.data && setStats(d.data))
        .catch(() => {})
    } catch (err) {
      alert(err.message)
    }
  }

  // Update Notes
  const handleUpdateNotes = async (id, notes) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/inquiries/${id}/notes`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ notes }),
      })
      if (!res.ok) throw new Error('Failed to save notes')
      const data = await res.json()
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, notes: data.data.notes } : inq))
      )
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry((prev) => ({ ...prev, notes: data.data.notes }))
      }
    } catch (err) {
      alert(err.message)
    }
  }

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      })
      if (!res.ok) throw new Error('Failed to delete inquiry')
      
      setInquiries((prev) => prev.filter((inq) => inq._id !== id))
      if (selectedInquiry?._id === id) {
        setSelectedInquiry(null)
      }

      // Refresh stats
      fetch(`${API_BASE_URL}/api/stats`, { headers: authHeaders })
        .then((r) => r.json())
        .then((d) => d.data && setStats(d.data))
        .catch(() => {})
    } catch (err) {
      alert(err.message)
    }
  }

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'all' ? true : inq.status === statusFilter
    const query = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !query ||
      inq.name.toLowerCase().includes(query) ||
      inq.email.toLowerCase().includes(query) ||
      inq.service.toLowerCase().includes(query) ||
      (inq.brief && inq.brief.toLowerCase().includes(query))
    return matchesStatus && matchesQuery
  })

  return (
    <div className="admin-dashboard-page">
      {/* Top Navigation Bar */}
      <header className="admin-navbar">
        <div className="admin-navbar-brand">
          <div className="admin-brand-icon">
            <ShieldCheck size={20} />
          </div>
          <div className="admin-brand-text">
            <span className="brand-title">GenWeb</span>
            <span className="brand-badge">ADMIN</span>
          </div>
        </div>

        <div className="admin-navbar-actions">
          <Link to="/" className="nav-site-link">
            <ExternalLink size={15} />
            <span>Visit Website</span>
          </Link>

          <div className="admin-user-pill">
            <span className="user-email">{user?.email || 'admin@genweb'}</span>
          </div>

          <button onClick={logout} className="logout-btn" title="Sign out">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Dashboard Title & Actions */}
        <div className="dashboard-header-row">
          <div>
            <h1 className="dashboard-heading">Client Inquiries & Leads</h1>
            <p className="dashboard-subheading">
              Manage prospective client briefs, update outreach status, and track inquiries in real time.
            </p>
          </div>

          <button
            onClick={handleManualRefresh}
            className={`refresh-btn ${refreshing ? 'spinning' : ''}`}
            disabled={refreshing}
          >
            <RefreshCw size={15} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="dashboard-error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* KPI Stats Grid */}
        <div className="stats-grid">
          <div
            className={`stat-card ${statusFilter === 'all' ? 'active-filter' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            <div className="stat-card-header">
              <span className="stat-label">Total Leads</span>
              <div className="stat-icon-wrapper total">
                <Inbox size={18} />
              </div>
            </div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-meta">All inquiries recorded</div>
          </div>

          <div
            className={`stat-card ${statusFilter === 'new' ? 'active-filter' : ''}`}
            onClick={() => setStatusFilter('new')}
          >
            <div className="stat-card-header">
              <span className="stat-label">New Inquiries</span>
              <div className="stat-icon-wrapper new">
                <AlertCircle size={18} />
              </div>
            </div>
            <div className="stat-value">{stats.new}</div>
            <div className="stat-meta">Awaiting first response</div>
          </div>

          <div
            className={`stat-card ${statusFilter === 'in-review' ? 'active-filter' : ''}`}
            onClick={() => setStatusFilter('in-review')}
          >
            <div className="stat-card-header">
              <span className="stat-label">In Review</span>
              <div className="stat-icon-wrapper review">
                <Clock size={18} />
              </div>
            </div>
            <div className="stat-value">{stats.inReview}</div>
            <div className="stat-meta">Under evaluation / scoping</div>
          </div>

          <div
            className={`stat-card ${statusFilter === 'contacted' ? 'active-filter' : ''}`}
            onClick={() => setStatusFilter('contacted')}
          >
            <div className="stat-card-header">
              <span className="stat-label">Contacted</span>
              <div className="stat-icon-wrapper contacted">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="stat-value">{stats.contacted}</div>
            <div className="stat-meta">Pitch or reply sent</div>
          </div>

          <div
            className={`stat-card ${statusFilter === 'closed' ? 'active-filter' : ''}`}
            onClick={() => setStatusFilter('closed')}
          >
            <div className="stat-card-header">
              <span className="stat-label">Closed / Won</span>
              <div className="stat-icon-wrapper closed">
                <CheckCircle size={18} />
              </div>
            </div>
            <div className="stat-value">{stats.closed}</div>
            <div className="stat-meta">Converted or resolved</div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="controls-bar">
          <div className="filter-pills">
            <button
              className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              All ({stats.total})
            </button>
            <button
              className={`filter-btn ${statusFilter === 'new' ? 'active' : ''}`}
              onClick={() => setStatusFilter('new')}
            >
              New ({stats.new})
            </button>
            <button
              className={`filter-btn ${statusFilter === 'in-review' ? 'active' : ''}`}
              onClick={() => setStatusFilter('in-review')}
            >
              In Review ({stats.inReview})
            </button>
            <button
              className={`filter-btn ${statusFilter === 'contacted' ? 'active' : ''}`}
              onClick={() => setStatusFilter('contacted')}
            >
              Contacted ({stats.contacted})
            </button>
            <button
              className={`filter-btn ${statusFilter === 'closed' ? 'active' : ''}`}
              onClick={() => setStatusFilter('closed')}
            >
              Closed ({stats.closed})
            </button>
          </div>

          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by client name, email, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Leads Table & Cards */}
        {loading ? (
          <div className="dashboard-loading-state">
            <div className="loading-spinner" />
            <p>Loading inquiries from MongoDB Atlas...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="dashboard-empty-state">
            <Archive size={40} className="empty-icon" />
            <h3>No inquiries found</h3>
            <p>
              {searchQuery || statusFilter !== 'all'
                ? 'Try resetting the search query or status filter.'
                : 'New client submissions from the Contact form will appear right here.'}
            </p>
          </div>
        ) : (
          <div className="table-card-container">
            <div className="table-responsive">
              <table className="inquiries-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Client Name</th>
                    <th>Email Address</th>
                    <th>Requested Service</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inq) => {
                    const formattedDate = new Date(inq.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })

                    return (
                      <tr key={inq._id} className="inquiry-row">
                        <td className="date-col">
                          <span className="date-text">
                            <Calendar size={13} /> {formattedDate}
                          </span>
                        </td>
                        <td className="name-col">
                          <strong className="client-name">{inq.name}</strong>
                          {inq.notes && <span className="has-notes-badge" title="Has admin notes">Notes</span>}
                        </td>
                        <td className="email-col">
                          <a href={`mailto:${inq.email}`} className="email-link">
                            <Mail size={13} /> {inq.email}
                          </a>
                        </td>
                        <td className="service-col">
                          <span className="service-tag">
                            <Layers size={13} /> {inq.service}
                          </span>
                        </td>
                        <td className="status-col">
                          <select
                            className={`status-select ${inq.status}`}
                            value={inq.status}
                            onChange={(e) => handleUpdateStatus(inq._id, e.target.value)}
                          >
                            <option value="new">New</option>
                            <option value="in-review">In Review</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="actions-col">
                          <div className="row-actions">
                            <button
                              type="button"
                              className="view-btn"
                              title="View full brief & notes"
                              onClick={() => setSelectedInquiry(inq)}
                            >
                              <Eye size={15} />
                              <span>View</span>
                            </button>
                            <button
                              type="button"
                              className="delete-row-btn"
                              title="Delete inquiry"
                              onClick={() => {
                                if (window.confirm(`Delete inquiry from "${inq.name}"?`)) {
                                  handleDeleteInquiry(inq._id)
                                }
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <InquiryDetailsModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onUpdateStatus={handleUpdateStatus}
          onUpdateNotes={handleUpdateNotes}
          onDelete={handleDeleteInquiry}
        />
      )}
    </div>
  )
}
