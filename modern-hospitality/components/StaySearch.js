'use client';

export default function StaySearch() {
  return (
    <section className="stay-search-wrap" aria-label="Plan your stay">
      <form className="stay-search" action="/contact" method="get">
        <div className="stay-search-heading">
          <span className="eyebrow"><span /> PLAN YOUR STAY</span>
          <p>Tell us what you have in mind. We’ll help you find the right space.</p>
        </div>
        <label>
          <span>SPACE</span>
          <select name="property" defaultValue="">
            <option value="">Any residence</option>
            <option value="The Studio Edit">The Studio Edit</option>
            <option value="The Signature Residence">The Signature Residence</option>
            <option value="The Urban Suite">The Urban Suite</option>
            <option value="The Terrace Residence">The Terrace Residence</option>
          </select>
        </label>
        <label>
          <span>ARRIVAL</span>
          <input type="date" name="arrival" />
        </label>
        <label>
          <span>DEPARTURE</span>
          <input type="date" name="departure" />
        </label>
        <label>
          <span>GUESTS</span>
          <select name="guests" defaultValue="2">
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
            <option value="5">5 guests</option>
            <option value="6">6 guests</option>
          </select>
        </label>
        <button className="button button-dark" type="submit">Enquire now <span>↗</span></button>
      </form>
    </section>
  );
}
