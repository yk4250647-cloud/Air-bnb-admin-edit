import FAQAccordion from '../../components/FAQAccordion';
export const metadata = { title: 'Frequently Asked Questions | Modern Hospitality' };
const items = [
  { q: 'How do I enquire about a residence?', a: 'Choose a space and submit the enquiry form with your contact details and preferred dates. Our team can then discuss availability and rates with you.' },
  { q: 'Does submitting an enquiry confirm my stay?', a: 'No. An enquiry is not a confirmed booking. Your stay is confirmed only after our team has contacted you and agreed the details directly.' },
  { q: 'Where are the residences located?', a: 'The current collection is located around Ramphal Chowk, Dwarka Mor, New Delhi. Contact the team for directions to a specific residence.' },
  { q: 'Are the residences furnished?', a: 'The collection features furnished studio and 2BHK residences. Please check the individual property page or ask us to confirm the amenities available in your chosen space.' },
  { q: 'Can I ask about longer stays?', a: 'Yes. Include your preferred arrival and departure dates in the enquiry form and mention that you are considering a longer stay.' },
  { q: 'What are the check-in, check-out and house rules?', a: 'These details can vary by residence and should be confirmed directly with our team before your stay.' },
];
export default function FAQPage() {
  return <main className="inner-page faq-page">
    <section className="faq-hero">
      <div className="eyebrow"><span /> A LITTLE CLARITY</div>
      <h1>Good to <em>know.</em></h1>
      <p>A few helpful answers before you find your space.</p>
    </section>
    <section className="faq-content section-wrap">
      <div className="faq-intro"><span>YOUR QUESTIONS, ANSWERED</span><h2>The details,<br /><em>made simple.</em></h2><p>Still wondering about something? Send us a note and our team will help.</p></div>
      <FAQAccordion items={items} />
    </section>
    <section className="faq-bottom"><h2>Still have a question?</h2><a className="button button-cream" href="/contact">Get in touch ↗</a></section>
  </main>;
}
