import { useState } from 'react'
import { X, Mail, Calendar, Layers, Trash2, CheckCircle, Clock, Check, Send } from 'lucide-react'
import './InquiryDetailsModal.css'

export default function InquiryDetailsModal({
  inquiry,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  onDelete,
}) {
  const [notes, setNotes] = useState(inquiry?.notes || '')
  const [savingNotes, setSavingNotes] = useState(false)
  const [notesSaved, setNotesSaved] = useState(false)

  if (!inquiry) return null

  const handleSaveNotes = async () => {
    setSavingNotes(true)
    await onUpdateNotes(inquiry._id, notes)
    setSavingNotes(false)
    setNotesSaved(true)
    setTimeout(() => setNotesSaved(false), 2000)
  }

  const formattedDate = new Date(inquiry.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="inquiry-modal-backdrop" onClick={onClose}>
      <div className="inquiry-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="inquiry-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="inquiry-modal-header">
          <div className="inquiry-modal-badge-row">
            <span className={`status-pill ${inquiry.status}`}>
              {inquiry.status === 'new' && <span className="status-ping" />}
              {inquiry.status}
            </span>
            <span className="inquiry-date">
              <Calendar size={13} /> {formattedDate}
            </span>
          </div>

          <h2>{inquiry.name}</h2>
          <a href={`mailto:${inquiry.email}`} className="inquiry-email-link">
            <Mail size={15} /> {inquiry.email}
          </a>
        </div>

        <div className="inquiry-modal-body">
          <div className="inquiry-info-grid">
            <div className="info-block">
              <span className="info-label">
                <Layers size={14} /> Requested Service
              </span>
              <strong className="info-value">{inquiry.service}</strong>
            </div>

            <div className="info-block">
              <span className="info-label">
                <Clock size={14} /> Update Lead Status
              </span>
              <select
                className="status-dropdown"
                value={inquiry.status}
                onChange={(e) => onUpdateStatus(inquiry._id, e.target.value)}
              >
                <option value="new">New Inquiry</option>
                <option value="in-review">In Review</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed / Won</option>
              </select>
            </div>
          </div>

          <div className="inquiry-brief-section">
            <h3>Project Brief & Requirements</h3>
            <div className="brief-content">{inquiry.brief}</div>
          </div>

          <div className="inquiry-notes-section">
            <div className="notes-header">
              <h3>Internal Admin Notes</h3>
              <button
                type="button"
                className="save-notes-btn"
                onClick={handleSaveNotes}
                disabled={savingNotes}
              >
                {notesSaved ? (
                  <>
                    <Check size={14} /> Saved
                  </>
                ) : savingNotes ? (
                  'Saving...'
                ) : (
                  'Save Notes'
                )}
              </button>
            </div>
            <textarea
              className="notes-textarea"
              placeholder="Add private internal notes about this lead (e.g. quoted ₹25,000, call scheduled for Tuesday)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="inquiry-modal-actions">
            <a
              href={`mailto:${inquiry.email}?subject=Regarding your GenWeb Technologies Project Inquiry - ${inquiry.service}`}
              className="reply-email-btn"
            >
              <Send size={15} /> Reply via Email
            </a>

            <button
              type="button"
              className="delete-inquiry-btn"
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete inquiry from "${inquiry.name}"?`)) {
                  onDelete(inquiry._id)
                  onClose()
                }
              }}
            >
              <Trash2 size={15} /> Delete Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
