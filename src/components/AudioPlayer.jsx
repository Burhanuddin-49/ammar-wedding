import React, { useState, useRef, useEffect } from "react";

export default function AudioPlayer({ onToast }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // start muted to bypass browser autoplay restrictions
  const [userUnmuted, setUserUnmuted] = useState(false);
  const audioRef = useRef(null);

  // Attempt muted autoplay as soon as the component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true;
    audio.volume = 0.5;

    audio.play().catch(() => {
      // Even muted autoplay failed (very rare) — will play on first user gesture
      setIsPlaying(false);
    });
  }, []);

  // Unmute on first user click anywhere on the page
  useEffect(() => {
    if (userUnmuted) return;

    const unmute = () => {
      setUserUnmuted(true);
      setIsMuted(false);

      const audio = audioRef.current;
      if (!audio) return;

      audio.muted = false;

      // In case muted autoplay failed initially, start playback now that we have user gesture
      if (audio.paused) {
        audio.play().catch(() => {});
        setIsPlaying(true);
      }

      if (onToast) onToast("🎵 Background Music Playing");
    };

    document.addEventListener("click", unmute, { once: true });

    return () => {
      document.removeEventListener("click", unmute);
    };
  }, [userUnmuted, onToast]);

  // Manual toggle handler for the floating button
  const toggleAudio = (e) => {
    e.stopPropagation(); // prevent re-triggering window click handler
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      // Direct click on button unmutes and plays
      setUserUnmuted(true);
      setIsMuted(false);
      audio.muted = false;
      audio.play().catch(() => {});
      setIsPlaying(true);
      if (onToast) onToast("🎵 Background Music Playing");
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      if (onToast) onToast("Music Paused");
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
      if (onToast) onToast("🎵 Background Music Playing");
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
        preload="auto"
        muted
      />
      <div className={`floating-audio-container ${isMuted ? "is-muted" : "is-unmuted"}`}>
        {isMuted && (
          <div className="audio-unmute-hint">
            <span className="hint-pulse-dot"></span>
            <span>Tap to Unmute</span>
          </div>
        )}
        <button
          className={`floating-audio-btn ${isMuted ? "is-muted" : "is-unmuted"} ${!isPlaying ? "paused" : ""}`}
          onClick={toggleAudio}
          aria-label={
            isMuted
              ? "Unmute Background Music"
              : isPlaying
              ? "Pause Background Music"
              : "Play Background Music"
          }
          title={
            isMuted
              ? "Click anywhere or tap here to unmute music"
              : isPlaying
              ? "Pause Music"
              : "Play Music"
          }
        >
          {isMuted ? (
            /* Bigger prominent muted speaker SVG icon in front */
            <svg
              className="audio-icon-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon
                points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                fill="currentColor"
                fillOpacity="0.22"
              />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            /* After unmute: smaller button with dancing royal gold equalizer bars */
            <div className="equalizer-bars">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </button>
      </div>
    </>
  );
}
