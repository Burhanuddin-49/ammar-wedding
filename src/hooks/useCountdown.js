import { useState, useEffect } from 'react';

/**
 * Custom hook for wedding countdown timer
 * Target: 5th November 2026, 8:30 PM (20:30:00)
 */
export function useCountdown(targetDateStr = '2026-11-05T20:30:00') {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    isCompleted: false
  });

  useEffect(() => {
    // 5 Nov 2026, 20:30:00
    const target = new Date(2026, 10, 5, 20, 30, 0).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
          isCompleted: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days < 10 ? '0' + days : String(days),
        hours: hours < 10 ? '0' + hours : String(hours),
        minutes: minutes < 10 ? '0' + minutes : String(minutes),
        seconds: seconds < 10 ? '0' + seconds : String(seconds),
        isCompleted: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr]);

  return timeLeft;
}
