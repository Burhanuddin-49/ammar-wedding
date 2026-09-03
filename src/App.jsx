import React, { useState } from "react";
import ParticleCanvas from "./components/ParticleCanvas";
import Hero from "./components/Hero";
import InvitationCard from "./components/InvitationCard";
import EventDetails from "./components/EventDetails";
import Countdown from "./components/Countdown";
import Gallery from "./components/Gallery";
import VenueMap from "./components/VenueMap";
import Blessings from "./components/Blessings";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";
import Toast from "./components/Toast";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  useSmoothScroll();

  const [toast, setToast] = useState({ message: "", isVisible: false });

  const showToast = (message) => {
    setToast({ message, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3200);
  };

  return (
    <div className="bg-islamic-pattern app-wrapper">
      {/* Golden Stardust Particles Canvas */}
      <ParticleCanvas />

      {/* Floating Audio Equalizer & Player */}
      <AudioPlayer onToast={showToast} />

      {/* Floating Toast Notification */}
      <Toast message={toast.message} isVisible={toast.isVisible} />

      {/* Hero Section */}
      <Hero onToast={showToast} />

      {/* Invitation & Dua Mubarak */}
      <InvitationCard />

      {/* Khushi Nu Jaman Event Details */}
      <EventDetails />

      {/* Countdown Timer */}
      <Countdown onToast={showToast} />

      {/* Invitation Gallery & Lightbox */}
      {/* <Gallery /> */}

      {/* Venue & Google Maps */}
      <VenueMap onToast={showToast} />

      {/* Quranic Ayah & Blessings */}
      <Blessings />

      {/* Wedding Footer */}
      <Footer />
    </div>
  );
}
