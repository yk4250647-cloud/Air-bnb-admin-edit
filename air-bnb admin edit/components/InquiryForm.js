
'use client';

import { useState } from 'react';

export default function InquiryForm({
  property = '',
  arrival = '',
  departure = '',
  guests = ''
}) {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = Object.fromEntries(fd.entries());

    if (
      body.arrival &&
      body.departure &&
      body.departure <= body.arrival
    ) {
      setStatus('Please choose a departure date after your arrival date.');
      return;
    }

    setBusy(true);
    setStatus('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      // Parse the response before checking its status.
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || 'We could not submit your enquiry.'
        );
      }

      setStatus(
        result.message ||
        'Thank you. Your enquiry has been saved. Our team will be in touch.'
      );

      form.reset();

    } catch (error) {
      setStatus(
        error.message ||
        'We could not send your enquiry just now. Please contact our team directly.'
      );

    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="inquiry-form" onSubmit={submit}>

      <label>
        Your name
        <input
          name="name"
          required
          placeholder="Full name"
          autoComplete="name"
        />
      </label>

      <label>
        Email address
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
        />
      </label>

      <label>
        Phone / WhatsApp
        <input
          name="phone"
          required
          placeholder="Your contact number"
          autoComplete="tel"
        />
      </label>

      <label>
        Space you're interested in
        <select name="property" defaultValue={property}>
          <option value="">Not sure yet</option>
          <option>The Studio Edit</option>
          <option>The Signature Residence</option>
          <option>The Urban Suite</option>
          <option>The Terrace Residence</option>
        </select>
      </label>

      <div className="form-row">
        <label>
          Arrival date
          <input
            name="arrival"
            type="date"
            defaultValue={arrival}
          />
        </label>

        <label>
          Departure date
          <input
            name="departure"
            type="date"
            defaultValue={departure}
          />
        </label>
      </div>

      <label>
        Number of guests
        <select name="guests" defaultValue={guests || '2'}>
          {['1', '2', '3', '4', '5', '6'].map((n) => (
            <option key={n} value={n}>
              {n} {n === '1' ? 'guest' : 'guests'}
            </option>
          ))}
        </select>
      </label>

      <label>
        Tell us a little more
        <textarea
          name="message"
          rows="4"
          placeholder="Questions, preferences or anything we should know…"
        />
      </label>

      <button
        className="button button-dark full-button"
        disabled={busy}
      >
        {busy ? 'Sending…' : 'Send enquiry ↗'}
      </button>

      {status && (
        <p className="form-status" role="status">
          {status}
        </p>
      )}

      <small>
        Submitting this form is an enquiry only. Your stay is not
        confirmed until our team contacts you.
      </small>

    </form>
  );
}
