import Link from 'next/link';
export const metadata = { title: 'Our Location | Modern Hospitality' };
export default function LocationPage() {
  return <main className="inner-page location-page">
    <section className="location-hero">
      <div className="eyebrow"><span /> A WELL-PLACED STAY</div>
      <h1>Find us in <em>Dwarka Mor.</em></h1>
      <p>Our current collection is centred around Ramphal Chowk, New Delhi — one welcoming neighbourhood, with a choice of furnished spaces.</p>
    </section>
    <section className="location-main section-wrap">
      <div className="location-map-card">
        <iframe title="Map showing Ramphal Chowk, Dwarka Mor, New Delhi" src="https://www.google.com/maps?q=Ramphal%20Chowk%2C%20Dwarka%20Mor%2C%20New%20Delhi&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
      <div className="location-copy">
        <div className="eyebrow"><span /> THE NEIGHBOURHOOD</div>
        <h2>A familiar corner<br /><em>of the city.</em></h2>
        <p>Every residence in our current collection is located around Ramphal Chowk, Dwarka Mor, New Delhi.</p>
        <div className="location-address"><span>ADDRESS</span><strong>Ramphal Chowk, Dwarka Mor</strong><small>New Delhi, India</small></div>
        <a className="button button-dark" href="https://www.google.com/maps/search/?api=1&query=Ramphal+Chowk+Dwarka+Mor+New+Delhi" target="_blank" rel="noreferrer">Get directions ↗</a>
        <p className="location-note">For the exact building and arrival instructions, please contact our team after enquiring about your chosen residence.</p>
        <Link className="under-link" href="/properties">Explore our residences ↗</Link>
      </div>
    </section>
  </main>;
}
