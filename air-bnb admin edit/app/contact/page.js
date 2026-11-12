import InquiryForm from '../../components/InquiryForm';
import Link from 'next/link';

export const metadata = { title: 'Contact | Modern Hospitality' };


const CONTACT = {
  email: 'hello@modernhospitality.in',
  phoneDisplay: '+91 98765 43210',
  phoneLink: '+919876543210',
  whatsapp: '919876543210',
  address: 'Ramphal Chowk, Dwarka Mor, New Delhi, India',
  hours: 'Monday – Saturday · 9:00 AM – 7:00 PM',
};

export default async function Contact({ searchParams }) {
  const q = await searchParams;
  const waMessage = encodeURIComponent('Hello Modern Hospitality, I would like to know more about your properties.');
 return (
  <main className="inner-page contact-premium">
    <section className="contact-premium-grid">

      {/* LEFT SIDE */}
      <div className="contact-story">
        <div className="contact-eyebrow">
          <span /> GET IN TOUCH
        </div>

        <h1>
          Let&apos;s plan your
          <em> next stay together.</em>
        </h1>

        <p className="contact-intro">
          Tell us a little about your plans. Our team will help
          you find a space that feels like home.
        </p>

        <div className="contact-image">
          <img
            src="/images/signature-2bhk-2.png"
            alt="Modern Hospitality residence interior"
          />
        </div>

        <div className="contact-details-card">

          <div className="contact-detail">
            <span className="contact-detail-icon">↗</span>
            <div>
              <small>CALL / WHATSAPP</small>
              <a href={`tel:${CONTACT.phoneLink}`}>
                {CONTACT.phoneDisplay}
              </a>
              <a
                className="contact-detail-link"
                href={`https://wa.me/${CONTACT.whatsapp}?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
              >
                Chat with us on WhatsApp ↗
              </a>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-detail-icon">✉</span>
            <div>
              <small>EMAIL</small>
              <a href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-detail-icon">⌖</span>
            <div>
              <small>VISIT US</small>
              <p>{CONTACT.address}</p>
              <a
                className="contact-detail-link"
                href="https://www.google.com/maps/search/?api=1&query=Ramphal+Chowk+Dwarka+Mor+New+Delhi"
                target="_blank"
                rel="noreferrer"
              >
                View on Google Maps ↗
              </a>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-detail-icon">◷</span>
            <div>
              <small>AVAILABILITY</small>
              <p>{CONTACT.hours}</p>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="contact-form-card">
        <div className="contact-form-heading">
          <div>
            <span>01 / ENQUIRY FORM</span>
            <h2>Send us an enquiry.</h2>
            <p>Share your details and preferences with our team.</p>
          </div>
          <span className="form-heading-icon">✳</span>
        </div>

        <InquiryForm property={q?.property || ''} arrival={q?.arrival || ''} departure={q?.departure || ''} guests={q?.guests || ''} />

        <p className="contact-form-note">
          Submitting this form is an enquiry only. Your stay is not
          confirmed until our team contacts you.
        </p>
      </div>

    </section>
  </main>
)
}