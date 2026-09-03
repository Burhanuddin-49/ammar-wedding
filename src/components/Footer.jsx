import React from 'react';

export function Footer() {
  return (
    <footer className="wedding-footer">
      <div className="container">
        <div className="footer-couple-signature">Ammar & Amatullah</div>
        
        <p className="footer-message">
          Thank You<br />
          We look forward to celebrating this joyous occasion with your esteemed presence and dua.
        </p>

        <div className="islamic-divider" style={{ maxWidth: '280px', margin: '1.5rem auto' }}>
          <span className="islamic-divider-icon" style={{ color: 'var(--color-gold-300)' }}>
            <i className="ri-star-smile-line"></i>
          </span>
        </div>

        <div className="footer-copyright">
          © 2026 Ammar & Amatullah • With Dua Mubarak
        </div>
      </div>
    </footer>
  );
}

export default Footer;
