import { useEffect, useState } from 'react';
import RollingItem from './RollingItem';
import { rollingNews } from '@/data/rollingNews';

type TrackKey = 'left' | 'right';

interface RollingSectionProps {
  track: TrackKey;
  interval?: number;
  delay?: number;
}

const DURATION = 500; // 애니메이션 속도

const RollingSection = ({ track, interval = 5000, delay = 0 }: RollingSectionProps) => {
  const data = rollingNews[track];
  const [index, setIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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
      startRolling();
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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="will-change-transform"
        style={{
          transform: isMoving ? `translateY(-48px)` : 'translateY(0px)',
          transition: isMoving ? `transform ${DURATION}ms ease-in-out` : 'none',
        }}
      >
        {/* 현재 뉴스 */}
        <RollingItem title={current.provider} content={current.headline} />
        {/* 다음 뉴스 */}
        <RollingItem title={next.provider} content={next.headline} />
      </div>
    </div>
  );
};

export default RollingSection;