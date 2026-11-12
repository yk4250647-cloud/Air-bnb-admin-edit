import Link from "next/link";
export default function PropertyCard({ p, index = 0 }) {
  return (
    <Link
      href={`/properties/${p.slug}`}
      className={`property-card card-${index % 2}`}
    >
      <div className="property-photo">
        <img src={p.cover} alt={p.name} />
        <span className="photo-count">VIEW SPACE ↗</span>
      </div>
      <div className="property-meta">
        <span>{p.type}</span>
        <span>DWARKA MOR, DELHI</span>
      </div>
      <div className="property-title">
        <h3>{p.name}</h3>
        <span>↗</span>
      </div>
      <p>{p.tag}</p>
      <div className="property-specs">
        <span>{p.beds}</span>
        <i /> <span>{p.baths}</span>
        <i /> <span>{p.guests}</span>
      </div>
    </Link>
  );
}
