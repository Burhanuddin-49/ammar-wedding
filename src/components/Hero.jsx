import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { downloadWeddingIcs } from "../utils/calendar";

gsap.registerPlugin(ScrollTrigger);

export function Hero({ onToast }) {
  const heroRef = useRef(null);
  const [imgErrors, setImgErrors] = useState({
    bismillah: false,
    ammar: false,
    amatullah: false,
    weds: false,
  });

  const handleImgError = (key) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.2 },
      });

      tl.from(".hero-bg-layer", {
        scale: 1.15,
        opacity: 0,
        duration: 1.8,
        ease: "power2.out",
      })
        .from(
          ".hanging-lantern",
          {
            y: -80,
            opacity: 0,
            stagger: 0.15,
            duration: 1.4,
            ease: "back.out(1.4)",
          },
          "-=1.2",
        )
        .from(
          ".hero-content",
          {
            y: 40,
            opacity: 0,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=1.0",
        )
        .from(
          ".bismillah-wrapper",
          {
            scale: 0.85,
            opacity: 0,
            duration: 1.1,
          },
          "-=0.9",
        )
        .from(
          ".invitation-badge",
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.8",
        )
        .from(
          ".name-block",
          {
            y: 30,
            opacity: 0,
            stagger: 0.25,
            duration: 1.1,
          },
          "-=0.7",
        )
        .from(
          ".weds-symbol",
          {
            scale: 0,
            rotation: -45,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(2)",
          },
          "-=0.8",
        )
        .from(
          ".hero-subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.6",
        )
        .from(
          ".hero-cta-group button, .hero-cta-group a",
          {
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".scroll-indicator",
          {
            y: 15,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.3",
        );

      // Parallax scroll effects
      gsap.to(".hero-bg-layer", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-tree-layer", {
        yPercent: -12,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSaveDate = () => {
    downloadWeddingIcs();
    if (onToast) onToast("📅 Calendar Event Downloaded!");
  };

  return (
    <header className="hero-section" id="hero" ref={heroRef}>
      {/* Background Layers */}
      <img
        src="/HD/background.png"
        alt="Islamic Sunset Garden Background"
        className="hero-bg-layer"
        loading="eager"
      />
      <div className="hero-overlay-gradient"></div>
      <div className="hero-light-glow"></div>
      <img
        src="/HD/tree.png"
        alt="Majestic Decorative Tree"
        className="hero-tree-layer"
        loading="eager"
      />

      {/* Hanging Glowing Lanterns */}
      <div className="hanging-lantern lantern-left">
        <svg width="48" height="110" viewBox="0 0 48 110" fill="none">
          <line
            x1="24"
            y1="0"
            x2="24"
            y2="40"
            stroke="#C9A227"
            strokeWidth="1.5"
          />
          <path
            d="M24 40 L38 52 L34 85 L24 96 L14 85 L10 52 Z"
            fill="#124E3F"
            stroke="#DFC15D"
            strokeWidth="1.5"
          />
          <circle cx="24" cy="68" r="7" fill="#FFEAA7" opacity="0.9" />
          <path
            d="M18 54 H30 M15 72 H33 M20 84 H28"
            stroke="#C9A227"
            strokeWidth="1"
          />
          <circle cx="24" cy="99" r="2.5" fill="#C9A227" />
        </svg>
        <div className="lantern-glow"></div>
      </div>

      <div className="hanging-lantern lantern-mid-left">
        <svg width="40" height="90" viewBox="0 0 40 90" fill="none">
          <line
            x1="20"
            y1="0"
            x2="20"
            y2="35"
            stroke="#C9A227"
            strokeWidth="1.2"
          />
          <path
            d="M20 35 L32 45 L28 72 L20 80 L12 72 L8 45 Z"
            fill="#0C3B2E"
            stroke="#DFC15D"
            strokeWidth="1.2"
          />
          <circle cx="20" cy="58" r="5" fill="#FFEAA7" opacity="0.9" />
        </svg>
        <div className="lantern-glow"></div>
      </div>

      <div className="hanging-lantern lantern-mid-right">
        <svg width="40" height="90" viewBox="0 0 40 90" fill="none">
          <line
            x1="20"
            y1="0"
            x2="20"
            y2="35"
            stroke="#C9A227"
            strokeWidth="1.2"
          />
          <path
            d="M20 35 L32 45 L28 72 L20 80 L12 72 L8 45 Z"
            fill="#0C3B2E"
            stroke="#DFC15D"
            strokeWidth="1.2"
          />
          <circle cx="20" cy="58" r="5" fill="#FFEAA7" opacity="0.9" />
        </svg>
        <div className="lantern-glow"></div>
      </div>

      <div className="hanging-lantern lantern-right">
        <svg width="48" height="110" viewBox="0 0 48 110" fill="none">
          <line
            x1="24"
            y1="0"
            x2="24"
            y2="40"
            stroke="#C9A227"
            strokeWidth="1.5"
          />
          <path
            d="M24 40 L38 52 L34 85 L24 96 L14 85 L10 52 Z"
            fill="#124E3F"
            stroke="#DFC15D"
            strokeWidth="1.5"
          />
          <circle cx="24" cy="68" r="7" fill="#FFEAA7" opacity="0.9" />
          <path
            d="M18 54 H30 M15 72 H33 M20 84 H28"
            stroke="#C9A227"
            strokeWidth="1"
          />
          <circle cx="24" cy="99" r="2.5" fill="#C9A227" />
        </svg>
        <div className="lantern-glow"></div>
      </div>

      {/* Central Glassmorphism Card */}
      <div className="hero-content arch-card ornate-corners">
        <span className="corner-ornament corner-tl">
          <i className="ri-flower-line"></i>
        </span>
        <span className="corner-ornament corner-tr">
          <i className="ri-flower-line"></i>
        </span>
        <span className="corner-ornament corner-bl">
          <i className="ri-flower-line"></i>
        </span>
        <span className="corner-ornament corner-br">
          <i className="ri-flower-line"></i>
        </span>

        {/* Bismillah */}
        <div className="bismillah-wrapper">
          {!imgErrors.bismillah ? (
            <img
              src="/HD/bismilla.png"
              alt="Bismillah Calligraphy"
              className="bismillah-img"
              onError={() => handleImgError("bismillah")}
            />
          ) : (
            <div className="bismillah-text text-gold-gradient">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </div>
          )}
        </div>

        <div>
          <span className="invitation-badge">
            <i
              className="ri-sparkling-fill"
              style={{ color: "var(--color-gold-400)" }}
            ></i>
            Wedding Invitation
            <i
              className="ri-sparkling-fill"
              style={{ color: "var(--color-gold-400)" }}
            ></i>
          </span>
        </div>

        {/* Couple Names */}
        <div className="couple-names-wrap">
          <div className="couple-names-row">
            {/* Groom */}
            <div className="name-block">
              {/* <span className="name-role">Groom</span> */}
              {!imgErrors.ammar ? (
                <img
                  src="/HD/name_ammar.png"
                  alt="Ammar"
                  className="name-img-asset"
                  onError={() => handleImgError("ammar")}
                />
              ) : (
                <h1 className="name-calligraphy text-gold-gradient">Ammar</h1>
              )}
            </div>

            {/* Weds */}
            <div className="weds-symbol">
              {!imgErrors.weds ? (
                <img
                  src="/HD/name_weds.png"
                  alt="Weds"
                  className="name-img-asset"
                  style={{ maxHeight: "48px" }}
                  onError={() => handleImgError("weds")}
                />
              ) : (
                <span className="heart-pulse">
                  <i className="ri-heart-3-fill"></i>
                </span>
              )}
            </div>

            {/* Bride */}
            <div className="name-block">
              {/* <span className="name-role">Bride</span> */}
              {!imgErrors.amatullah ? (
                <img
                  src="/HD/name_amatullah.png"
                  alt="Amatullah"
                  className="name-img-asset"
                  onError={() => handleImgError("amatullah")}
                />
              ) : (
                <h2 className="name-calligraphy text-gold-gradient">
                  Amatullah
                </h2>
              )}
            </div>
          </div>
        </div>

        <p className="hero-subtitle">
          Cordially request the honor of your gracious presence to celebrate our
          union under divine barakah and love.
        </p>

        {/* Actions */}
        <div className="hero-cta-group">
          <button
            className="btn-gold-primary btn-save-date"
            onClick={handleSaveDate}
          >
            <i className="ri-calendar-check-line"></i> Save the Date
          </button>
          <a href="#invitation" className="btn-emerald-outline">
            <i className="ri-mail-open-line"></i> View Invitation
          </a>
        </div>
      </div>

      {/* Scroll Down */}
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="mouse-icon">
          <div className="mouse-wheel"></div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
