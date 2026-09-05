import React from "react";

export function Footer() {
  const whatsappMessage = encodeURIComponent(
    "Hello Design 53! I saw the wedding invitation website of Ammar & Amatullah and would love to get a custom wedding website made. Please share more details."
  );

  return (
    <footer className="wedding-footer">
      <div className="container">
        <div className="footer-couple-signature">Ammar & Amatullah</div>

        <p className="footer-message">
          Thank You<br />
          We look forward to celebrating this joyous occasion with your esteemed presence and dua.
        </p>

        <div
          className="islamic-divider"
          style={{ maxWidth: "280px", margin: "1.5rem auto" }}
        >
          <span
            className="islamic-divider-icon"
            style={{ color: "var(--color-gold-300)" }}
          >
            <i className="ri-star-smile-line"></i>
          </span>
        </div>

        <div className="footer-copyright">
          © 2026 Ammar & Amatullah • With Dua Mubarak
        </div>

        {/* Creator / Agency Credits & Inquiries */}
        <div className="footer-creator-badge">
          <div className="creator-text">
            <span>Website Designed & Developed by</span>
            <strong className="creator-brand text-gold-gradient">Design 53</strong>
          </div>
          <p className="creator-subtext">
            Want a custom digital wedding invitation website like this? Get in touch:
          </p>
          <div className="creator-whatsapp-links">
            <a
              href={`https://wa.me/918828053543?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="creator-wa-btn"
              title="Chat with Design 53 on WhatsApp (+91 88280 53543)"
            >
              <i className="ri-whatsapp-fill"></i>
              <span>+91 88280 53543</span>
            </a>
            <a
              href={`https://wa.me/918209407970?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="creator-wa-btn"
              title="Chat with Design 53 on WhatsApp (+91 82094 07970)"
            >
              <i className="ri-whatsapp-fill"></i>
              <span>+91 82094 07970</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
