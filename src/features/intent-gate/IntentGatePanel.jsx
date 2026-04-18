import React from 'react';
import './IntentGatePanel.css';

export default function IntentGatePanel({ heading, subheading, options, onSelect, onClose }) {
  return (
    <div
      className="intent-gate-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Intent Gate"
      onClick={onClose}
    >
      <div className="intent-gate-card" onClick={(event) => event.stopPropagation()}>
        <div className="intent-gate-top">
          <h2>{heading}</h2>
          <button type="button" onClick={onClose} aria-label="Close intent panel">
            x
          </button>
        </div>
        <p>{subheading}</p>
        <div className="intent-gate-options">
          {options.map((option) => (
            <button
              type="button"
              key={option.label}
              onClick={() => onSelect(option)}
            >
              {`> ${option.label}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
