/**
 * AMMAR & AMATULLAH - ROYAL ISLAMIC WEDDING E-INVITATION
 * Main Controller: Lenis Smooth Scroll, GSAP Orchestration, Countdown, Lightbox, ICS Export
 */

(function () {
  "use strict";

  // -------------------------------------------------------------------------
  // 1. LENIS SMOOTH SCROLL INITIALIZATION
  // -------------------------------------------------------------------------
  let lenis = null;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // -------------------------------------------------------------------------
  // 2. GSAP & SCROLLTRIGGER ANIMATIONS
  // -------------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap !== "undefined") {
      if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        if (lenis) {
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
        }
      }

      initHeroAnimations();
      initScrollRevealAnimations();
      initParallaxEffects();
    }

    initCountdownTimer();
    initGalleryLightbox();
    initAudioController();
    initCalendarAndShare();
  });

  function initHeroAnimations() {
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
        ".hero-cta-group .btn-gold-primary, .hero-cta-group .btn-emerald-outline",
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
  }

  function initParallaxEffects() {
    if (typeof ScrollTrigger === "undefined") return;

    // Background and tree parallax
    gsap.to(".hero-bg-layer", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
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
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  function initScrollRevealAnimations() {
    if (typeof ScrollTrigger === "undefined") return;

    // Glass cards fade-up
    gsap.utils
      .toArray(".arch-card, .event-feature-card, .venue-card-wrap")
      .forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

    // Section Titles
    gsap.utils.toArray(".section-title-wrap").forEach((el) => {
      gsap.from(el, {
        y: 35,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
        },
      });
    });

    // Countdown Cards Stagger
    gsap.from(".countdown-card", {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: ".countdown-container",
        start: "top 85%",
      },
    });

    // Gallery Items Stagger
    gsap.from(".gallery-item", {
      y: 45,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".gallery-grid",
        start: "top 85%",
      },
    });
  }

  // -------------------------------------------------------------------------
  // 3. COUNTDOWN TIMER TO 5 NOVEMBER 2026 (8:30 PM)
  // -------------------------------------------------------------------------
  function initCountdownTimer() {
    // 5th November 2026, 20:30:00 (Local Time)
    const targetDate = new Date(2026, 10, 5, 20, 30, 0).getTime();

    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    const secondsEl = document.getElementById("cd-seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateTimer() {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      daysEl.textContent = days < 10 ? "0" + days : days;
      hoursEl.textContent = hours < 10 ? "0" + hours : hours;
      minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
      secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // -------------------------------------------------------------------------
  // 4. LUXURY GALLERY LIGHTBOX
  // -------------------------------------------------------------------------
  function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const modal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    if (!modal || !lightboxImg || galleryItems.length === 0) return;

    let currentIndex = 0;
    const images = Array.from(galleryItems).map((item) => {
      const img = item.querySelector("img");
      return {
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt") || "Wedding Memory",
      };
    });

    function showImage(index) {
      if (index < 0) index = images.length - 1;
      if (index >= images.length) index = 0;
      currentIndex = index;

      lightboxImg.style.opacity = "0";
      lightboxImg.style.transform = "scale(0.95)";

      setTimeout(() => {
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
        lightboxImg.style.transition = "all 0.35s ease";
        lightboxImg.style.opacity = "1";
        lightboxImg.style.transform = "scale(1)";
      }, 150);
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        currentIndex = index;
        showImage(currentIndex);
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    function closeModal() {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (prevBtn)
      prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
    if (nextBtn)
      nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("active")) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      if (e.key === "ArrowRight") showImage(currentIndex + 1);
    });
  }

  // -------------------------------------------------------------------------
  // 5. BACKGROUND AUDIO CONTROLLER & SYNTH SOUNDSCAPE
  // -------------------------------------------------------------------------
  function initAudioController() {
    const audioBtn = document.getElementById("audio-toggle-btn");
    const audioElement = document.getElementById("bg-audio");
    let isPlaying = false;
    let audioCtx = null;
    let ambientSynthPlaying = false;
    let synthNodes = [];

    // Ambient Web Audio synth generator as fallback if audio file isn't loaded
    function startAmbientHarmonics() {
      if (ambientSynthPlaying) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === "suspended") audioCtx.resume();

        // Harmonious tranquil chords (F Pentatonic / Oud notes)
        const frequencies = [174.61, 220.0, 261.63, 329.63, 392.0];
        const masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        masterGain.connect(audioCtx.destination);

        synthNodes = frequencies.map((freq) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

          // Subtle harmonic oscillation
          gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start();
          return { osc, gain };
        });

        ambientSynthPlaying = true;
      } catch (err) {
        console.warn("Audio synth not supported", err);
      }
    }

    function stopAmbientHarmonics() {
      if (!ambientSynthPlaying) return;
      synthNodes.forEach((node) => {
        try {
          node.osc.stop();
          node.osc.disconnect();
        } catch (e) {}
      });
      synthNodes = [];
      ambientSynthPlaying = false;
    }

    function toggleAudio() {
      if (isPlaying) {
        if (audioElement && !audioElement.paused) {
          audioElement.pause();
        }
        stopAmbientHarmonics();
        isPlaying = false;
        if (audioBtn) audioBtn.classList.add("paused");
        showToast("Music Paused");
      } else {
        isPlaying = true;
        if (audioBtn) audioBtn.classList.remove("paused");

        if (audioElement) {
          const playPromise = audioElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Audio element failed/missing -> start calming ambient synth
              startAmbientHarmonics();
            });
          }
        } else {
          startAmbientHarmonics();
        }
        showToast("Playing Background Music 🎵");
      }
    }

    if (audioBtn) {
      audioBtn.classList.add("paused");
      audioBtn.addEventListener("click", toggleAudio);
    }

    // Auto-trigger audio on first interaction (respecting browser autoplay policy)
    const onFirstInteraction = () => {
      document.removeEventListener("click", onFirstInteraction);
      document.removeEventListener("touchstart", onFirstInteraction);
      if (!isPlaying) {
        toggleAudio();
      }
    };
    document.addEventListener("click", onFirstInteraction, { once: true });
    document.addEventListener("touchstart", onFirstInteraction, { once: true });
  }

  // -------------------------------------------------------------------------
  // 6. SAVE TO CALENDAR (.ICS) & SHARE INVITATION
  // -------------------------------------------------------------------------
  function initCalendarAndShare() {
    const saveDateBtns = document.querySelectorAll(".btn-save-date");
    const shareBtns = document.querySelectorAll(".btn-share-invitation");

    // Generate .ICS Calendar File
    saveDateBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        downloadIcsFile();
      });
    });

    // Share link
    shareBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        shareInvitation();
      });
    });
  }

  function downloadIcsFile() {
    const title = "Wedding of Ammar & Amatullah - Khushi Nu Jaman";
    const description =
      "By the grace of Allah Ta'ala and Dua Mubarak of Syedna Aali Qadar Mufaddal Saifuddin (T.U.S.), you are cordially invited to the wedding celebration (Khushi Nu Jaman) of Ammar & Amatullah at Fakhri Hall, Saifee Mohalla, Ratlam.";
    const location = "Fakhri Hall, Saifee Mohalla, Ratlam";

    // Event: 5 Nov 2026, 20:30 (8:30 PM) to 23:30 (11:30 PM)
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ammar & Amatullah Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:wedding-ammar-amatullah-20261105@ammarwedding.com",
      "SUMMARY:" + title,
      "DESCRIPTION:" + description,
      "LOCATION:" + location,
      "DTSTART:20261105T173000Z",
      "DTEND:20261105T203000Z",
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-PT24H",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder: Wedding of Ammar & Amatullah Tomorrow",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Ammar_Amatullah_Wedding_Invitation.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("📅 Calendar Event Downloaded!");
  }

  function shareInvitation() {
    const shareData = {
      title: "Wedding Invitation: Ammar & Amatullah",
      text: "You are cordially invited to celebrate the wedding of Ammar & Amatullah on Thursday, 5th November 2026 at Fakhri Hall, Saifee Mohalla, Ratlam.",
      url: window.location.href,
    };

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare(shareData)
    ) {
      navigator.share(shareData).catch(() => {});
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          showToast("✨ Invitation Link Copied to Clipboard!");
        })
        .catch(() => {
          showToast("Link: " + window.location.href);
        });
    }
  }

  // -------------------------------------------------------------------------
  // 7. TOAST NOTIFICATION UTILITY
  // -------------------------------------------------------------------------
  function showToast(message) {
    let toast = document.getElementById("toast-notification");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast-notification";
      toast.className = "toast-msg";
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<span>✨</span><span>${message}</span>`;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  window.showToast = showToast;
})();
