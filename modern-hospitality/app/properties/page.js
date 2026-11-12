import PropertyCard from "../../components/PropertyCard";
import { getPublicProperties } from "../../lib/property-data";
import Link from "next/link";
import PropertyFilters from "../../components/PropertyFilters";
export const metadata = { title: "Our Spaces | Modern Hospitality" };
export const dynamic = "force-dynamic";
export default async function Properties() {
  const properties = await getPublicProperties();
  return (
    <main className="inner-page">
      <section className="collection-hero">
  <div className="collection-copy">
    <div className="eyebrow">
      <span /> THE COLLECTION
    </div>

    <h1>
      Find your <em>space.</em>
    </h1>

    <p>
      Distinctive, thoughtfully furnished residences in Ramphal
      Chowk, Dwarka Mor, Delhi. Explore the spaces and find the
      one that feels right.
    </p>

    <div className="collection-features">
      <div><span>⌂</span><small>Fully Furnished</small></div>
      <div><span>⌁</span><small>High-Speed Wi-Fi</small></div>
      <div><span>⌖</span><small>Prime Location</small></div>
      <div><span>✓</span><small>Safe & Secure</small></div>
    </div>

    <Link className="collection-button" href="#collection-list">
      Explore properties <span>↗</span>
    </Link>

    <div className="collection-note">
      04 CURATED SPACES <i /> ONE WELCOMING NEIGHBOURHOOD
    </div>
  </div>

  <div className="collection-visual">
    <div className="collection-green-shape" />

    <img
      className="collection-main-image"
      src={properties[1]?.cover || properties[0]?.cover}
      alt="Featured Modern Hospitality residence"
    />

    <div className="collection-badge">
      <span>⌂</span>
      <div>
        <strong>Curated Stays</strong>
        <small>for Modern Living</small>
      </div>
    </div>

    <img
      className="collection-small-image"
      src={properties[2]?.cover || properties[0]?.cover}
      alt="Another view of a Modern Hospitality residence"
    />
  </div>
</section>
      <section id="collection-list" className="section-wrap listing-section">
        <div className="listing-top">
          <span>OUR CURRENT COLLECTION</span>
          <span>DWARKA MOR · NEW DELHI</span>
        </div>
        <PropertyFilters properties={properties} />
      </section>
      <section className="mini-cta">
        <div>
          <span>HAVE A QUESTION?</span>
          <h2>Let’s find the right fit.</h2>
        </div>
        <Link className="button button-dark" href="/contact">
          Talk to our team ↗
        </Link>
      </section>
    </main>
  );
}
