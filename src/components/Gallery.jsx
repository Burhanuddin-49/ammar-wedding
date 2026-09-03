import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: 'HD/background.png',
    alt: 'Islamic Sunset Garden Artwork',
    title: 'Islamic Sunset Garden',
    tag: 'Serenity',
    contain: false
  },
  {
    src: 'HD/tree.png',
    alt: 'Majestic Tree of Barakah',
    title: 'Tree of Barakah',
    tag: 'Heritage',
    contain: false
  },
  {
    src: 'HD/bismilla.png',
    alt: 'Bismillah Calligraphy',
    title: 'Bismillah Calligraphy',
    tag: 'Calligraphy',
    contain: true
  },
  {
    src: 'HD/name_ammar.png',
    alt: 'Ammar Calligraphy',
    title: 'Ammar',
    tag: 'The Groom',
    contain: true
  },
  {
    src: 'HD/name_amatullah.png',
    alt: 'Amatullah Calligraphy',
    title: 'Amatullah',
    tag: 'The Bride',
    contain: true
  },
  {
    src: 'HD/name_weds.png',
    alt: 'Wedding Monogram',
    title: 'Wedding Emblem',
    tag: 'Sacred Union',
    contain: true
  }
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        y: 45,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
      }
    };

    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };
  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="section-gallery" id="gallery" ref={sectionRef}>
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">Memories & Artistry</span>
          <h2 className="section-main-title text-gold-gradient">Invitation Gallery</h2>
          <div className="islamic-divider">
            <span className="islamic-divider-icon"><i className="ri-gallery-line"></i></span>
          </div>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="gallery-item"
              style={{ background: img.contain ? '#FAF7F0' : 'var(--color-cream-200)' }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  objectFit: img.contain ? 'contain' : 'cover',
                  padding: img.contain ? '2rem' : '0'
                }}
              />
              <div className="gallery-overlay">
                <span className="gallery-overlay-tag">{img.tag}</span>
                <h3 className="gallery-overlay-title">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <div
        className={`lightbox-modal ${lightboxIndex !== null ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Image Viewer"
        onClick={closeLightbox}
      >
        {lightboxIndex !== null && (
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close Lightbox">
              &times;
            </button>
            <button className="lightbox-nav-btn lightbox-prev" onClick={prevImage} aria-label="Previous Image">
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              id="lightbox-img"
            />
            <button className="lightbox-nav-btn lightbox-next" onClick={nextImage} aria-label="Next Image">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;
