import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="countdown-glow p-4 text-center border-0">
        <div className="text-2xl md:text-3xl font-bold text-kano-heritage">
          {timeLeft.days}
        </div>
        <div className="text-xs md:text-sm font-medium text-kano-heritage/80 uppercase tracking-wider">
          Days
        </div>
      </Card>
      
      <Card className="countdown-glow p-4 text-center border-0">
        <div className="text-2xl md:text-3xl font-bold text-kano-heritage">
          {timeLeft.hours}
        </div>
        <div className="text-xs md:text-sm font-medium text-kano-heritage/80 uppercase tracking-wider">
          Hours
        </div>
      </Card>
      
      <Card className="countdown-glow p-4 text-center border-0">
        <div className="text-2xl md:text-3xl font-bold text-kano-heritage">
          {timeLeft.minutes}
        </div>
        <div className="text-xs md:text-sm font-medium text-kano-heritage/80 uppercase tracking-wider">
          Minutes
        </div>
      </Card>
      
      <Card className="countdown-glow p-4 text-center border-0">
        <div className="text-2xl md:text-3xl font-bold text-kano-heritage">
          {timeLeft.seconds}
        </div>
        <div className="text-xs md:text-sm font-medium text-kano-heritage/80 uppercase tracking-wider">
          Seconds
        </div>
      </Card>
    </div>
  );
}