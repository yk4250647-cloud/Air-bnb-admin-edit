'use client';

import { useState } from 'react';

export default function PropertyGallery({ images, name }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const go = (step) => setActive((current) => (current + step + images.length) % images.length);

  return (
    <section className="interactive-gallery" aria-label={`${name} photo gallery`}>
      <div className="interactive-gallery-main">
        <img src={images[active]} alt={`${name} view ${active + 1}`} />
        <button className="gallery-open" type="button" onClick={() => setLightbox(true)}>View photographs ↗</button>
        <div className="gallery-controls">
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo">←</button>
          <span>{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => go(1)} aria-label="Next photo">→</button>
        </div>
      </div>
      <div className="interactive-gallery-thumbs">
        {images.map((src, i) => (
          <button type="button" key={src} className={active === i ? 'selected' : ''} onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`}>
            <img src={src} alt="" />
          </button>
        ))}
      </div>
      {lightbox && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${name} photographs`} onClick={() => setLightbox(false)}>
          <button className="lightbox-close" type="button" onClick={() => setLightbox(false)} aria-label="Close gallery">×</button>
          <button className="lightbox-prev" type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous photo">←</button>
          <img src={images[active]} alt={`${name} view ${active + 1}`} onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-next" type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next photo">→</button>
          <span>{active + 1} / {images.length}</span>
        </div>
      )}
    </section>
  );
}
