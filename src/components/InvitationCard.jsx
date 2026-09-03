import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function InvitationCard() {
  const cardRef = useRef(null);

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
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-invitation" id="invitation">
      <div className="container">
        <div
          className="arch-card invitation-glass-card ornate-corners"
          ref={cardRef}
        >
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
              className="ri-ancient-gate-line"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>

          <div className="section-tag">Dua Mubarak & Benediction</div>
          {/* <h2 className="section-main-title text-gold-gradient" style={{ marginBottom: '2rem' }}>
            Bismillahir Rahmanir Raheem
          </h2> */}

          <p className="invitation-header-dua">
            By the grace of Allah Ta'ala, Vasila of{" "}
            <span className="highlight-dua">Panjatan Pak (A.S.)</span> and with
            kind benediction of{" "}
            <span className="highlight-dua">
              Al Hayyul Muqaddas Syedna Mohammad Burhanuddin (R.A.)
            </span>{" "}
            & Dua Mubarak of His Holiness{" "}
            <span className="highlight-dua">
              Syedna Aali Qadar Mufaddal Saifuddin Aga (T.U.S.)
            </span>
          </p>

          <div className="islamic-divider">
            <span className="islamic-divider-icon">
              <i className="ri-shining-line"></i>
            </span>
          </div>

          {/* Nikah Celebration Milestone */}
          <div className="nikah-celebration-badge">
            <p>
              Nikah has been performed on the Dast Mubarak of{" "}
              <strong style={{ color: "var(--color-emerald-900)" }}>
                Syedna Aali Qadar Mufaddal Saifuddin (T.U.S.)
              </strong>
              <span className="event-date-highlight">
                on 21st August 2026 at Khandala.
              </span>
            </p>
          </div>

          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-secondary)",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            We request your esteemed presence and heartfelt prayers to join us
            for the auspicious celebratory feast of Khushi Nu Jaman.
          </p>
        </div>
      </div>
    </section>
  );
}

export default InvitationCard;
