import { FaWhatsapp } from 'react-icons/fa6'
import './WhatsAppButton.css'

export default function WhatsAppButton() {
  const phoneNumber = '918258892262'
  const defaultMessage = encodeURIComponent(
    'Hello GenWeb Technologies! I would like to inquire about starting a web project.'
  )
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-floating-btn"
      aria-label="Chat with GenWeb Technologies on WhatsApp"
    >
      <span className="whatsapp-ping" />
      <div className="whatsapp-icon-wrapper">
        <FaWhatsapp size={28} />
      </div>
      <span className="whatsapp-tooltip">Chat with us</span>
    </a>
  )
}
