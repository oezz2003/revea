'use client';

import { useState, useEffect } from 'react';

export function CountdownTimer() {
  const calculateTimeLeft = () => {
    // Set a consistent future date for the countdown
    const difference = +new Date('2024-12-31T23:59:59') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft as { days: number, hours: number, minutes: number, seconds: number };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft] && interval !== 'seconds') {
      return;
    }

    timerComponents.push(
      <div key={interval} className="flex flex-col items-center">
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
          <span className="font-mono text-4xl font-bold">
            {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, '0')}
          </span>
        </div>
        <span className="text-sm uppercase mt-2">{interval}</span>
      </div>
    );
  });

  return (
    <div className="flex gap-4">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}
