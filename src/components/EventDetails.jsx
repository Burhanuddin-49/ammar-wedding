import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function EventDetails() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".event-program-card", {
        y: 45,
        opacity: 0,
        stagger: 0.2,
        duration: 1.1,
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
          <span className="section-tag">Auspicious Celebrations</span>
          <h2 className="section-main-title text-gold-gradient">
            Wedding Program
          </h2>
          <div className="islamic-divider">
            <span className="islamic-divider-icon">
              <i className="ri-calendar-todo-line"></i>
            </span>
          </div>
        </div>

        <div className="events-schedule-container">
          {/* Event 1: Khushi Nu Jaman */}
          <div className="event-program-card arch-card ornate-corners">
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

            <div className="event-card-header">
              {/* <span className="event-badge-pill">
                <i className="ri-restaurant-2-line"></i> Auspicious Celebration
              </span> */}
              <h3 className="event-card-title text-gold-gradient">
                Khushi Nu Jaman
              </h3>
              <div className="event-card-divider">
                <span>
                  <i className="ri-sparkling-fill"></i>
                </span>
              </div>
            </div>

            <div className="event-items-list">
              {/* Date */}
              <div className="event-item-row">
                <div className="event-item-icon">
                  <i className="ri-calendar-event-line"></i>
                </div>
                <div className="event-item-info">
                  <span className="event-item-label">Date</span>
                  <p className="event-item-primary">
                    Thursday, 5th November 2026
                  </p>
                  <p className="event-item-secondary">26 Jamadal Ula 1448 H.</p>
                </div>
              </div>

              {/* Time */}
              <div className="event-item-row">
                <div className="event-item-icon">
                  <i className="ri-time-line"></i>
                </div>
                <div className="event-item-info">
                  <span className="event-item-label">Time</span>
                  <p className="event-item-primary">8:30 PM</p>
                  <p className="event-item-secondary">
                    InshaAllah (Evening Feast)
                  </p>
                </div>
              </div>

              {/* Venue */}
              <div className="event-item-row">
                <div className="event-item-icon">
                  <i className="ri-map-pin-user-line"></i>
                </div>
                <div className="event-item-info">
                  <span className="event-item-label">Venue</span>
                  <p className="event-item-primary">Fakhri Hall</p>
                  <p className="event-item-secondary">Saifee Mohalla, Ratlam</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event 2: Walima */}
          <div className="event-program-card arch-card ornate-corners">
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

            <div className="event-card-header">
              {/* <span className="event-badge-pill">
                <i className="ri-heart-sparkle-line"></i> Blessed Banquet
              </span> */}
              <h3 className="event-card-title text-gold-gradient">Walima</h3>
              <div className="event-card-divider">
                <span>
                  <i className="ri-sparkling-fill"></i>
                </span>
              </div>
            </div>

            <div className="event-items-list">
              {/* Date */}
              <div className="event-item-row">
                <div className="event-item-icon">
                  <i className="ri-calendar-event-line"></i>
                </div>
                <div className="event-item-info">
                  <span className="event-item-label">Date</span>
                  <p className="event-item-primary">
                    Friday, 6th November 2026
                  </p>
                  <p className="event-item-secondary">27 Jamadal Ula 1448 H.</p>
                </div>
              </div>

              {/* Time */}
              <div className="event-item-row">
                <div className="event-item-icon">
                  <i className="ri-time-line"></i>
                </div>
                <div className="event-item-info">
                  <span className="event-item-label">Time</span>
                  <p className="event-item-primary">1:30 PM</p>
                  <p className="event-item-secondary">
                    InshaAllah (Afternoon Reception)
                  </p>
                </div>
              </div>

              {/* Venue */}
              <div className="event-item-row">
                <div className="event-item-icon">
                  <i className="ri-map-pin-user-line"></i>
                </div>
                <div className="event-item-info">
                  <span className="event-item-label">Venue</span>
                  <p className="event-item-primary">Fakhri Hall</p>
                  <p className="event-item-secondary">Saifee Mohalla, Ratlam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
