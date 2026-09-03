import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shareWeddingInvitation } from "../utils/share";

gsap.registerPlugin(ScrollTrigger);

export function VenueMap({ onToast }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleShare = () => {
    shareWeddingInvitation(onToast);
  };

  return (
    <section className="section-venue" id="venue">
      <div className="container">
        <div className="venue-card-wrap" ref={cardRef}>
          <div className="islamic-seal">
            <i className="ri-map-pin-2-fill" style={{ fontSize: "2rem" }}></i>
          </div>

          <span className="section-tag">Event Location</span>
          <h2 className="venue-name text-gold-gradient">Fakhri Hall</h2>
          <p className="venue-address">Saifee Mohalla, Ratlam</p>

          <p
            style={{
              color: "var(--color-text-secondary)",
              maxWidth: "600px",
              margin: "0 auto 1.5rem",
            }}
          >
            Valet parking and reception hosts will be available at the entrance
            to guide you and your family.
          </p>

          <div className="venue-actions-row">
            <a
              href="https://maps.google.com/?q=Fakhri+Hall+Saifee+Mohalla+Ratlam"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-primary"
            >
              <i className="ri-navigation-line"></i> Open in Google Maps
            </a>
            <button
              className="btn-emerald-outline btn-share-invitation"
              onClick={handleShare}
            >
              <i className="ri-share-forward-line"></i> Share Invitation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VenueMap;
