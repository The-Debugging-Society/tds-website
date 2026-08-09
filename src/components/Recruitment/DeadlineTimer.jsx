import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

export function DeadlineTimer() {
  const deadline = new Date('2026-08-20T23:59:59').getTime();
  
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = deadline - now;
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
        <Calendar className="w-5 h-5" />
        <span className="font-semibold text-sm">Deadline: 20 Aug 2026</span>
      </div>
      
      {!timeLeft.expired ? (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800/80 border border-zinc-700/50">
          <Clock className="w-5 h-5 text-amber-400" />
          <div className="font-mono font-bold text-amber-400 text-sm tracking-wider">
            {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
          <Clock className="w-5 h-5" />
          <span className="font-bold text-sm">Recruitment Closed</span>
        </div>
      )}
    </div>
  );
}
