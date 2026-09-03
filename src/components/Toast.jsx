import React from 'react';

export default function Toast({ message, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className={`toast-msg ${isVisible ? 'show' : ''}`} role="status">
      <span>✨</span>
      <span>{message}</span>
    </div>
  );
}
