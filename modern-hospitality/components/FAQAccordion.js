'use client';
import { useState } from 'react';
export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">{items.map((item, i) => <article className={`faq-item ${open === i ? 'is-open' : ''}`} key={item.q}>
    <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
      <span className="faq-number">{String(i + 1).padStart(2, '0')}</span><strong>{item.q}</strong><span className="faq-toggle">{open === i ? '−' : '+'}</span>
    </button>
    {open === i && <p>{item.a}</p>}
  </article>)}</div>;
}
