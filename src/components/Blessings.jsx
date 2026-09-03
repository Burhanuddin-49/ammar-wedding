import React from 'react';

export function Blessings() {
  return (
    <section className="section-blessings" id="blessings">
      <div className="container">
        <div className="blessings-card">
          <div className="islamic-divider" style={{ filter: 'brightness(1.3)' }}>
            <span className="islamic-divider-icon"><i className="ri-heart-pulse-line"></i></span>
          </div>

          <div className="quran-verse-arabic">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </div>

          <blockquote className="blessing-quote">
            “May Allah (SWT) bless this union with endless love, mercy, barakah, and happiness.”
          </blockquote>

          <div className="blessing-ameen">Ameen</div>
        </div>
      </div>
    </section>
  );
}

export default Blessings;
