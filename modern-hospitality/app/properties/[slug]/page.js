import { getPublicProperties } from '../../../lib/property-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PropertyGallery from '../../../components/PropertyGallery';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const properties = await getPublicProperties();
  const p = properties.find((x) => x.slug === slug);
  return {
    title: p ? `${p.name} | Modern Hospitality` : 'Space | Modern Hospitality',
    description: p?.description,
  };
}

export default async function PropertyDetail({ params }) {
  const { slug } = await params;
  const properties = await getPublicProperties();
  const p = properties.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <main className="detail-page">
      <div className="detail-top">
        <Link href="/properties">← ALL SPACES</Link>
        <span>RAMPHAL CHOWK · DWARKA MOR · NEW DELHI</span>
      </div>

      <section className="detail-heading">
        <div>
          <div className="eyebrow"><span /> {p.type.toUpperCase()}</div>
          <h1>{p.name.split(' ').slice(0, -1).join(' ')} <em>{p.name.split(' ').slice(-1)}</em></h1>
        </div>
        <p>{p.tag}</p>
      </section>

      <PropertyGallery images={p.gallery} name={p.name} />

      <section className="detail-content">
        <div className="detail-description">
          <div className="eyebrow"><span /> A SPACE TO CALL YOUR OWN</div>
          <h2>Settle into<br /><em>something special.</em></h2>
          <p>{p.description}</p>
          <p className="address-line">Ramphal Chowk, Dwarka Mor, New Delhi</p>
          <div className="detail-spec-strip">
            <span>{p.beds}</span><i /><span>{p.baths}</span><i /><span>{p.guests}</span>
          </div>
        </div>
        <aside className="detail-aside">
          <span className="detail-aside-kicker">A FEW THOUGHTFUL DETAILS</span>
          <h3>What this space offers</h3>
          <ul>{p.highlights.map((x) => <li key={x}>{x}</li>)}</ul>
          <Link className="button button-dark full-button" href={`/contact?property=${encodeURIComponent(p.name)}`}>
            Enquire about this space ↗
          </Link>
          <small>Ask our team about current availability, rates, check-in details and stay policies.</small>
        </aside>
      </section>

      <section className="detail-enquiry-band">
        <div><span>BEFORE YOU DECIDE</span><h2>Have a few questions?</h2><p>We’ll help you understand the space and confirm the details before you make plans.</p></div>
        <Link className="button button-cream" href={`/contact?property=${encodeURIComponent(p.name)}`}>Talk to our team ↗</Link>
      </section>
      <section className="detail-location section-wrap">
        <div><div className="eyebrow"><span /> THE NEIGHBOURHOOD</div><h2>In Dwarka Mor,<br /><em>New Delhi.</em></h2><p>All Modern Hospitality residences in this collection are located around Ramphal Chowk, Dwarka Mor. Contact us for directions and property-specific details.</p><Link className="under-link" href="/location">Explore the location ↗</Link></div>
        <div className="detail-location-card"><span>MODERN HOSPITALITY</span><strong>Ramphal Chowk</strong><small>Dwarka Mor · New Delhi, India</small><a href="https://www.google.com/maps/search/?api=1&query=Ramphal+Chowk+Dwarka+Mor+New+Delhi" target="_blank" rel="noreferrer">Open directions ↗</a></div>
      </section>
    </main>
  );
}
