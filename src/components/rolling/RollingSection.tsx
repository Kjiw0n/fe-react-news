import { useEffect, useState } from 'react';
import RollingItem from './RollingItem';
import { rollingNews } from '@/data/rollingNews';

type TrackKey = 'left' | 'right';
interface RollingSectionProps {
  track: TrackKey;
  interval?: number;
  delay?: number;
  isPaused: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void; 
}

const DURATION = 500;

const RollingSection = ({ 
  track, 
  interval = 5000, 
  delay = 0, 
  isPaused, 
  onMouseEnter, 
  onMouseLeave 
}: RollingSectionProps) => {
  const data = rollingNews[track];
  const [index, setIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const startRolling = () => {
      setIsMoving(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % data.length);
        setIsMoving(false);
      }, DURATION);
    };

    let timer: number;

    const initialTimeout = setTimeout(() => {
      timer = setInterval(startRolling, interval);
    }, delay);

    return () => {
      clearTimeout(initialTimeout);
      if (timer) clearInterval(timer);
    };
  }, [data.length, interval, isPaused, delay]);

  const current = data[index];
  const next = data[(index + 1) % data.length];

  return (
    <div 
      className="w-115 h-12 overflow-hidden border border-border-default bg-surface-alt"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="will-change-transform"
        style={{
          transform: isMoving ? `translateY(-48px)` : 'translateY(0px)',
          transition: isMoving ? `transform ${DURATION}ms ease-in-out` : 'none',
        }}
      >
        <RollingItem title={current.provider} content={current.headline} />
        <RollingItem title={next.provider} content={next.headline} />
      </div>
    </div>
  );
};
export default RollingSection;