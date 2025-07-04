import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

interface CountdownTimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  initialMinutes = 19, 
  initialSeconds = 59 
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="bg-green-400 text-white py-3 px-4 text-center font-semibold">
      <div className="flex items-center justify-center gap-2">
        <Lock size={16} />
        <span>
          OFERTA ACABA EM {formatTime(minutes)}:{formatTime(seconds)} MINUTOS!
        </span>
      </div>
    </div>
  );
};