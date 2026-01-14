import { useEffect, useState } from 'react';
import RollingItem from './RollingItem';
import type { RollingNewsItem, RollingNewsResponse } from '@/constants/type';

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
  onMouseLeave,
}: RollingSectionProps) => {
  const [data, setData] = useState<RollingNewsItem[]>([]);
  const [index, setIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    fetch('/api/news/rolling')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch rolling news');
        }
        return res.json();
      })
      .then((result: RollingNewsResponse) => {
        setData(result[track]);
      })
      .catch(() => {
        setData([]);
      });
  }, [track]);

  useEffect(() => {
    if (isPaused) return;
    if (data.length === 0) return;

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

  if (data.length === 0) return null;

  const current = data[index];
  const next = data[(index + 1) % data.length];

  return (
    <div
      className="border-border-default bg-surface-alt h-12 w-115 cursor-pointer overflow-hidden border"
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
