import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Clock } from 'lucide-react';

export default function CountdownTimer() {
  const { countdownEvent } = useApp();
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!countdownEvent || !countdownEvent.targetDate) return;

    const calcTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(countdownEvent.targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calcTimeLeft();
    const timer = setInterval(calcTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [countdownEvent]);

  if (!countdownEvent || !timeLeft) return null;

  return (
    <div className="glass rounded-2xl p-5 sm:p-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Clock size={20} className="text-yellow-400" />
        <h3 className="text-white font-bold text-lg">{countdownEvent.title || 'Menuju Acara'}</h3>
      </div>
      <div className="flex items-center justify-center gap-3 sm:gap-4 text-white">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold bg-white/10 rounded-xl px-3 py-2">{timeLeft.days}</div>
          <p className="text-green-300/60 text-xs mt-1">Hari</p>
        </div>
        <span className="text-2xl font-bold">:</span>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold bg-white/10 rounded-xl px-3 py-2">{timeLeft.hours}</div>
          <p className="text-green-300/60 text-xs mt-1">Jam</p>
        </div>
        <span className="text-2xl font-bold">:</span>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold bg-white/10 rounded-xl px-3 py-2">{timeLeft.minutes}</div>
          <p className="text-green-300/60 text-xs mt-1">Mnt</p>
        </div>
        <span className="text-2xl font-bold">:</span>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold bg-white/10 rounded-xl px-3 py-2">{timeLeft.seconds}</div>
          <p className="text-green-300/60 text-xs mt-1">Dtk</p>
        </div>
      </div>
      {countdownEvent.description && (
        <p className="text-green-300/80 text-sm mt-3">{countdownEvent.description}</p>
      )}
    </div>
  );
}