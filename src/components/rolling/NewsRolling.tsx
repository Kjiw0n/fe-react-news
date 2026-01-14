import { Suspense, useState } from 'react';
import RollingSection from './RollingSection';
import { Skeleton } from '../ui/skeleton';

const NewsRolling = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="mb-8 flex w-full gap-2.5">
      <Suspense
        fallback={
          <div className="flex h-fit flex-col gap-4 px-8 py-6 text-lg">
            <Skeleton className="h-20 w-full rounded-lg bg-slate-900" />
          </div>
        }
      >
        <RollingSection
          track="left"
          interval={5000}
          isPaused={isPaused}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex h-fit flex-col gap-4 px-8 py-6 text-lg">
            <Skeleton className="h-20 w-full rounded-lg bg-slate-900" />
          </div>
        }
      >
        <RollingSection
          track="right"
          interval={5000}
          delay={1000}
          isPaused={isPaused}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        />
      </Suspense>
    </div>
  );
};
export default NewsRolling;
