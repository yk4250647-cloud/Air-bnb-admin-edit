'use client';

import { useMemo, useState } from 'react';
import PropertyCard from './PropertyCard';

export default function PropertyFilters({ properties }) {
  const [kind, setKind] = useState('All spaces');
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      if (kind === 'Studio') return p.type.toLowerCase().includes('studio');
      if (kind === '2BHK') return p.type.toLowerCase().includes('2bhk');
      return true;
    });
    if (sort === 'az') result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'za') result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    return result;
  }, [properties, kind, sort]);

  return (
    <>
      <div className="property-filter-bar">
        <div className="filter-tabs" aria-label="Filter residences">
          {['All spaces', 'Studio', '2BHK'].map((item) => (
            <button key={item} type="button" className={kind === item ? 'active' : ''} onClick={() => setKind(item)}>
              {item}
            </button>
          ))}
        </div>
        <label className="sort-control">
          <span>SORT</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="az">Name: A–Z</option>
            <option value="za">Name: Z–A</option>
          </select>
        </label>
      </div>
      <div className="filter-result-line">
        <span>{String(filtered.length).padStart(2, '0')} RESIDENCES</span>
        <span>{kind === 'All spaces' ? 'ALL STAY TYPES' : `${kind.toUpperCase()} RESIDENCES`}</span>
      </div>
      {filtered.length ? (
        <div className="property-grid">
          {filtered.map((p, i) => <PropertyCard p={p} index={i} key={p.slug} />)}
        </div>
      ) : (
        <div className="filter-empty">No residences match this selection.</div>
      )}
    </>
  );
}
