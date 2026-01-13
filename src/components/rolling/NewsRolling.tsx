import { useEffect, useState } from 'react';
import RollingItem from './RollingItem';
import { rollingNews } from '@/data/rollingNews';

type TrackKey = 'left' | 'right';

interface NewsRollingProps {
  track: TrackKey;
  interval?: number;
}

const DURATION = 500;

const NewsRolling = ({ track, interval = 5000 }: NewsRollingProps) => {
  const data = rollingNews[track];

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimate(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % data.length);
        setAnimate(false);
      }, DURATION);
    }, interval);

    return () => clearInterval(id);
  }, [data.length, interval]);

  const current = data[index];
  const next = data[(index + 1) % data.length];

  return (
    <div className="w-115 h-12 overflow-hidden">
      <div
        className={`
          will-change-transform
          ${animate ? 'animate-roll-up' : ''}
        `}
      >
        <RollingItem title={current.provider} content={current.headline} />
        <RollingItem title={next.provider} content={next.headline} />
      </div>
    </div>
  );
};

export default NewsRolling;
