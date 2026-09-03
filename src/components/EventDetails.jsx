import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function EventDetails() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".event-feature-card", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-event" id="event" ref={sectionRef}>
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">Auspicious Celebration</span>
          <h2 className="section-main-title text-gold-gradient">
            Khushi Nu Jaman
          </h2>
          <div className="islamic-divider">
            <span className="islamic-divider-icon">
              <i className="ri-goblet-line"></i>
            </span>
          </div>
        </div>

        <div className="event-details-grid">
          {/* Date Card */}
          <div className="event-feature-card">
            <div className="feature-icon-wrap">
              <i className="ri-calendar-event-line"></i>
            </div>
            <h3>Date</h3>
            <p className="primary-text">Thursday, 5th November 2026</p>
            <p className="secondary-text">26 Jamadal Ula 1448 H.</p>
          </div>

          {/* Time Card */}
          <div className="event-feature-card">
            <div className="feature-icon-wrap">
              <i className="ri-time-line"></i>
            </div>
            <h3>Time</h3>
            <p className="primary-text">8:30 PM</p>
            <p className="secondary-text">InshaAllah (Evening Reception)</p>
          </div>

          {/* Venue Card */}
          <div className="event-feature-card">
            <div className="feature-icon-wrap">
              <i className="ri-map-pin-user-line"></i>
            </div>
            <h3>Venue</h3>
            <p className="primary-text">Fakhri Hall</p>
            <p className="secondary-text">Saifee Mohalla, Ratlam</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
