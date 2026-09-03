import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCountdown } from '../hooks/useCountdown';
import { downloadWeddingIcs } from '../utils/calendar';

gsap.registerPlugin(ScrollTrigger);

export function Countdown({ onToast }) {
  const sectionRef = useRef(null);
  const { days, hours, minutes, seconds } = useCountdown('2026-11-05T20:30:00');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.countdown-card', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSaveDate = () => {
    downloadWeddingIcs();
    if (onToast) onToast('📅 Calendar Event Downloaded!');
  };

  return (
    <section className="section-countdown" id="countdown" ref={sectionRef}>
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">Counting the Moments</span>
          <h2 className="section-main-title text-gold-gradient">Countdown to the Celebration</h2>
          <p style={{ color: 'var(--color-emerald-800)', fontWeight: 500, marginTop: '0.5rem' }}>
            5th November 2026 • 8:30 PM
          </p>
        </div>

        <div className="countdown-container">
          {/* Days */}
          <div className="countdown-card">
            <span className="countdown-number" id="cd-days">{days}</span>
            <span className="countdown-label">Days</span>
          </div>

          {/* Hours */}
          <div className="countdown-card">
            <span className="countdown-number" id="cd-hours">{hours}</span>
            <span className="countdown-label">Hours</span>
          </div>

          {/* Minutes */}
          <div className="countdown-card">
            <span className="countdown-number" id="cd-minutes">{minutes}</span>
            <span className="countdown-label">Minutes</span>
          </div>

          {/* Seconds */}
          <div className="countdown-card">
            <span className="countdown-number" id="cd-seconds">{seconds}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="btn-gold-primary btn-save-date" onClick={handleSaveDate}>
            <i className="ri-calendar-2-line"></i> Add Event to Calendar
          </button>
        </div>
      </div>
    </section>
  );
}

export default Countdown;
