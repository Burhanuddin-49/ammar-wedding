import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GOOGLE_SHEET_RSVP_URL } from "../config/rsvp";

gsap.registerPlugin(ScrollTrigger);

export default function Rsvp({ onToast }) {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attendance: "Both Events", // 'Both Events' | 'Khushi Nu Jaman' | 'Walima' | 'Cannot Attend'
    guests: "1",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttendanceSelect = (val) => {
    setFormData((prev) => ({ ...prev, attendance: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your WhatsApp or phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // If user hasn't configured Google Sheet URL yet, simulate a successful preview submission
      if (!GOOGLE_SHEET_RSVP_URL || GOOGLE_SHEET_RSVP_URL.includes("PASTE_YOUR")) {
        console.warn("Google Sheet Web App URL not set in src/config/rsvp.js. Simulating submission.");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        const payload = new FormData();
        payload.append("name", formData.name.trim());
        payload.append("phone", formData.phone.trim());
        payload.append("attendance", formData.attendance);
        payload.append(
          "guests",
          formData.attendance === "Cannot Attend" ? "0" : formData.guests
        );
        payload.append("message", formData.message.trim());

        // Send via POST with no-cors to prevent browser redirect CORS blockage
        await fetch(GOOGLE_SHEET_RSVP_URL, {
          method: "POST",
          body: payload,
          mode: "no-cors",
        });
      }

      setIsSubmitted(true);
      if (onToast) onToast("✨ Shukran! Your RSVP has been confirmed.");
    } catch (err) {
      console.error("RSVP submission error:", err);
      setErrorMessage("Failed to send RSVP. Please try again or message via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      attendance: "Both Events",
      guests: "1",
      message: "",
    });
  };

  return (
    <section className="section-rsvp" id="rsvp" ref={sectionRef}>
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">Honor Us with Your Presence</span>
          <h2 className="section-main-title text-gold-gradient">
            RSVP & Blessings
          </h2>
          <div className="islamic-divider">
            <span className="islamic-divider-icon">
              <i className="ri-mail-star-line"></i>
            </span>
          </div>
        </div>

        <div className="rsvp-card-wrapper" ref={cardRef}>
          <div className="arch-card rsvp-card ornate-corners">
            <span className="corner-ornament corner-tl">
              <i className="ri-sparkling-2-line"></i>
            </span>
            <span className="corner-ornament corner-tr">
              <i className="ri-sparkling-2-line"></i>
            </span>
            <span className="corner-ornament corner-bl">
              <i className="ri-sparkling-2-line"></i>
            </span>
            <span className="corner-ornament corner-br">
              <i className="ri-sparkling-2-line"></i>
            </span>

            <div className="islamic-seal">
              <i
                className="ri-mail-send-line"
                style={{ fontSize: "2rem", color: "var(--color-emerald-900)" }}
              ></i>
            </div>

            {!isSubmitted ? (
              <>
                <p className="rsvp-intro-text">
                  Please confirm your attendance so we may graciously prepare for
                  your presence.
                </p>

                {errorMessage && (
                  <div className="rsvp-alert-error">
                    <i className="ri-error-warning-line"></i>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form className="rsvp-form" onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="rsvp-form-group">
                    <label htmlFor="rsvp-name" className="rsvp-label">
                      Full Name / Family Name <span className="required-star">*</span>
                    </label>
                    <div className="rsvp-input-wrap">
                      <i className="ri-user-3-line rsvp-field-icon"></i>
                      <input
                        type="text"
                        id="rsvp-name"
                        name="name"
                        className="rsvp-input"
                        placeholder="e.g. Mustafa Bhai & Family"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="rsvp-form-group">
                    <label htmlFor="rsvp-phone" className="rsvp-label">
                      WhatsApp / Phone Number <span className="required-star">*</span>
                    </label>
                    <div className="rsvp-input-wrap">
                      <i className="ri-whatsapp-line rsvp-field-icon"></i>
                      <input
                        type="tel"
                        id="rsvp-phone"
                        name="phone"
                        className="rsvp-input"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Attendance Choice */}
                  <div className="rsvp-form-group">
                    <label className="rsvp-label">
                      Will You Attend? <span className="required-star">*</span>
                    </label>
                    <div className="rsvp-attendance-grid">
                      <button
                        type="button"
                        className={`rsvp-choice-btn ${
                          formData.attendance === "Both Events" ? "active" : ""
                        }`}
                        onClick={() => handleAttendanceSelect("Both Events")}
                      >
                        <i className="ri-sparkling-fill choice-icon"></i>
                        <div className="choice-text-wrap">
                          <strong>Both Events</strong>
                          <span>Khushi Nu Jaman & Walima</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        className={`rsvp-choice-btn ${
                          formData.attendance === "Khushi Nu Jaman" ? "active" : ""
                        }`}
                        onClick={() => handleAttendanceSelect("Khushi Nu Jaman")}
                      >
                        <i className="ri-restaurant-2-line choice-icon"></i>
                        <div className="choice-text-wrap">
                          <strong>Khushi Nu Jaman</strong>
                          <span>Thursday, 5th Nov</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        className={`rsvp-choice-btn ${
                          formData.attendance === "Walima" ? "active" : ""
                        }`}
                        onClick={() => handleAttendanceSelect("Walima")}
                      >
                        <i className="ri-goblet-line choice-icon"></i>
                        <div className="choice-text-wrap">
                          <strong>Walima Only</strong>
                          <span>Friday, 6th Nov</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        className={`rsvp-choice-btn ${
                          formData.attendance === "Cannot Attend" ? "active decline" : ""
                        }`}
                        onClick={() => handleAttendanceSelect("Cannot Attend")}
                      >
                        <i className="ri-heart-line choice-icon"></i>
                        <div className="choice-text-wrap">
                          <strong>Regretfully Decline</strong>
                          <span>Will pray from afar</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Number of Guests (Only if attending) */}
                  {formData.attendance !== "Cannot Attend" && (
                    <div className="rsvp-form-group">
                      <label htmlFor="rsvp-guests" className="rsvp-label">
                        Number of Attending Guests
                      </label>
                      <div className="rsvp-input-wrap">
                        <i className="ri-team-line rsvp-field-icon"></i>
                        <select
                          id="rsvp-guests"
                          name="guests"
                          className="rsvp-input rsvp-select"
                          value={formData.guests}
                          onChange={handleChange}
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 Persons</option>
                          <option value="3">3 Persons</option>
                          <option value="4">4 Persons</option>
                          <option value="5">5 Persons</option>
                          <option value="6">6+ Persons (Family)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Optional Message / Dua */}
                  <div className="rsvp-form-group">
                    <label htmlFor="rsvp-message" className="rsvp-label">
                      Message & Dua for Ammar & Amatullah{" "}
                      <span className="optional-text">(Optional)</span>
                    </label>
                    <div className="rsvp-input-wrap">
                      <i className="ri-quill-pen-line rsvp-field-icon textarea-icon"></i>
                      <textarea
                        id="rsvp-message"
                        name="message"
                        className="rsvp-input rsvp-textarea"
                        placeholder="Mubarak! Wishing both of you eternal happiness and barakah..."
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="rsvp-actions">
                    <button
                      type="submit"
                      className="btn-gold-primary rsvp-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="ri-loader-4-line spinner-icon"></i>
                          <span>Submitting RSVP...</span>
                        </>
                      ) : (
                        <>
                          <i className="ri-send-plane-fill"></i>
                          <span>Confirm RSVP</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success Confirmation */
              <div className="rsvp-success-view">
                <div className="success-icon-wrap">
                  <i className="ri-checkbox-circle-fill"></i>
                </div>
                <h3 className="success-title text-gold-gradient">
                  Shukran! RSVP Received
                </h3>
                <p className="success-desc">
                  Thank you, <strong>{formData.name}</strong>. Your response for{" "}
                  <strong className="text-highlight">{formData.attendance}</strong>{" "}
                  {formData.attendance !== "Cannot Attend" && (
                    <>({formData.guests} {formData.guests === "1" ? "guest" : "guests"})</>
                  )}{" "}
                  has been recorded with heartfelt gratitude.
                </p>

                <div className="success-actions">
                  <button
                    type="button"
                    className="btn-emerald-outline"
                    onClick={handleReset}
                  >
                    <i className="ri-restart-line"></i> Submit Another Response
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
