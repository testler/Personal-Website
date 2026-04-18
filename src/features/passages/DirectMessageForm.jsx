import React, { useState } from 'react';

export default function DirectMessageForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.target;
    const data = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true));
  };

  if (submitted) {
    return (
      <div className="dm-form dm-form--sent" onClick={(e) => e.stopPropagation()}>
        <p className="dm-form-thanks">Message sent! I'll get back to you as soon as I can.</p>
      </div>
    );
  }

  return (
    <form
      className="dm-form"
      name="direct-message"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      <input type="hidden" name="form-name" value="direct-message" />
      <p hidden><label>Don't fill this out: <input name="bot-field" /></label></p>

      <label className="dm-form-label">
        What do you want to say? Is there anything I didn't answer?
        <textarea
          name="message"
          className="dm-form-textarea"
          rows="4"
          required
          placeholder="This message will go directly to me..."
        />
      </label>

      <label className="dm-form-label">
        How can I reach you? (email or phone)
        <input
          type="text"
          name="contact"
          className="dm-form-input"
          placeholder="your@email.com or phone number"
        />
      </label>

      <button type="submit" className="passage-choice dm-form-submit">
        Send Message
      </button>
    </form>
  );
}
