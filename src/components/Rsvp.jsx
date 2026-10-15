import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { GOOGLE_SHEET_RSVP_URL } from "../config/rsvp";

export default function Rsvp({ onToast }) {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    attendance: "Yes", // 'Yes' | 'No'
  });

  const [imgErrors, setImgErrors] = useState({
    bismillah: false,
    ammar: false,
    amatullah: false,
    weds: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImgError = (key) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 35,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!formData.attendance) {
      setErrorMessage("Please select whether you will be attending.");
      return;
    }

    setIsSubmitting(true);

    try {
      // If user hasn't configured Google Sheet URL yet, simulate a successful preview submission
      if (
        !GOOGLE_SHEET_RSVP_URL ||
        GOOGLE_SHEET_RSVP_URL.includes("PASTE_YOUR")
      ) {
        console.warn(
          "Google Sheet Web App URL not set in src/config/rsvp.js. Simulating submission.",
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        const payload = new FormData();
        payload.append("name", formData.name.trim());
        payload.append("attendance", formData.attendance); // "Yes" or "No"
        // Retain consistent columns for spreadsheet compatibility
        payload.append("phone", "");
        // payload.append("guests", formData.attendance === "Yes" ? "1" : "0");
        payload.append("message", "");

        // Send via POST with no-cors to prevent browser redirect CORS blockage
        await fetch(GOOGLE_SHEET_RSVP_URL, {
          method: "POST",
          body: payload,
          mode: "no-cors",
        });
      }

      setIsSubmitted(true);
      if (onToast) {
        onToast(
          formData.attendance === "Yes"
            ? "✨ Shukran! Your RSVP has been confirmed."
            : "✨ Shukran! Your response has been received.",
        );
      }
    } catch (err) {
      console.error("RSVP submission error:", err);
      setErrorMessage("Failed to send RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      attendance: "Yes",
    });
  };

  return (
    <section
      className="section-rsvp single-screen-rsvp"
      id="rsvp"
      ref={sectionRef}
    >
      <div className="container rsvp-single-container">
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

            {/* 1. Bismillah & Couple Names Design */}
            <div className="rsvp-header-couple">
              <div className="rsvp-bismillah-wrap">
                {!imgErrors.bismillah ? (
                  <img
                    src="/HD/bismilla.png"
                    alt="Bismillah Calligraphy"
                    className="rsvp-bismillah-img"
                    onError={() => handleImgError("bismillah")}
                  />
                ) : (
                  <div className="rsvp-bismillah-text text-gold-gradient">
                    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                  </div>
                )}
              </div>

              <div className="rsvp-couple-row">
                <div className="rsvp-name-block">
                  {!imgErrors.ammar ? (
                    <img
                      src="/HD/name_ammar.png"
                      alt="Ammar"
                      className="rsvp-name-asset"
                      onError={() => handleImgError("ammar")}
                    />
                  ) : (
                    <h2 className="rsvp-name-calligraphy text-gold-gradient">
                      Ammar
                    </h2>
                  )}
                </div>

                <div className="rsvp-weds-symbol">
                  {!imgErrors.weds ? (
                    <img
                      src="/HD/name_weds.png"
                      alt="Weds"
                      className="rsvp-weds-asset"
                      onError={() => handleImgError("weds")}
                    />
                  ) : (
                    <span className="rsvp-weds-heart">
                      <i className="ri-heart-3-fill"></i>
                    </span>
                  )}
                </div>

                <div className="rsvp-name-block">
                  {!imgErrors.amatullah ? (
                    <img
                      src="/HD/name_amatullah.png"
                      alt="Amatullah"
                      className="rsvp-name-asset"
                      onError={() => handleImgError("amatullah")}
                    />
                  ) : (
                    <h2 className="rsvp-name-calligraphy text-gold-gradient">
                      Amatullah
                    </h2>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Shaadi Nu Jaman Title */}
            <div className="rsvp-event-header">
              <span className="rsvp-event-badge">
                <i className="ri-sparkling-fill"></i>
                Shaadi Nu Jaman
                <i className="ri-sparkling-fill"></i>
              </span>
            </div>

            {/* 3. Date, Time & Location Details (Line by Line, Centered) */}
            <div className="rsvp-event-details-text">
              <p className="rsvp-event-line">
                <i className="ri-calendar-event-line"></i>
                <span>26 Jamadal Ula &bull; 5th November </span>
              </p>
              <p className="rsvp-event-line">
                <i className="ri-map-pin-2-line"></i>
                <a
                  href="https://maps.google.com/?q=Fakhri+Hall+Saifee+Mohalla+Ratlam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rsvp-location-link"
                >
                  Fakhri Hall, Ratlam - 8:30 PM{" "}
                  <i className="ri-external-link-line"></i>
                </a>
              </p>
            </div>

            <div className="rsvp-divider-ornate">
              <span></span>
              <i className="ri-shining-line"></i>
              <span></span>
            </div>

            {!isSubmitted ? (
              <>
                {errorMessage && (
                  <div className="rsvp-alert-error">
                    <i className="ri-error-warning-line"></i>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 4. RSVP Form */}
                <form className="rsvp-form" onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="rsvp-form-group">
                    <label htmlFor="rsvp-name" className="rsvp-label">
                      Full Name <span className="required-star">*</span>
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

                  {/* Will you be attending? */}
                  <div className="rsvp-form-group">
                    <label className="rsvp-label">
                      Will you be attending?{" "}
                      <span className="required-star">*</span>
                    </label>
                    <div
                      className="rsvp-radio-group"
                      role="radiogroup"
                      aria-label="Will you be attending?"
                    >
                      {/* Yes Option */}
                      <label
                        className={`rsvp-radio-card ${
                          formData.attendance === "Yes" ? "active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="Yes"
                          checked={formData.attendance === "Yes"}
                          onChange={handleChange}
                          className="rsvp-radio-input"
                          required
                        />
                        <div className="radio-custom-indicator">
                          <span className="radio-inner-dot"></span>
                        </div>
                        <div className="choice-text-wrap">
                          <strong>Yes, I will attend</strong>
                        </div>
                        <i className="ri-checkbox-circle-fill radio-status-icon"></i>
                      </label>

                      {/* No Option */}
                      <label
                        className={`rsvp-radio-card ${
                          formData.attendance === "No" ? "active decline" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="No"
                          checked={formData.attendance === "No"}
                          onChange={handleChange}
                          className="rsvp-radio-input"
                          required
                        />
                        <div className="radio-custom-indicator">
                          <span className="radio-inner-dot"></span>
                        </div>
                        <div className="choice-text-wrap">
                          <strong>No, I can't attend</strong>
                        </div>
                        <i className="ri-close-circle-fill radio-status-icon"></i>
                      </label>
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
                  Thank you, <strong>{formData.name}</strong>. Your response (
                  <strong className="text-highlight">
                    {formData.attendance === "Yes"
                      ? "Yes, I will attend"
                      : "No, I can't attend"}
                  </strong>
                  ) has been recorded with heartfelt gratitude.
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
