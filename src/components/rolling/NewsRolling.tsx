import { useState } from "react";
import RollingSection from "./RollingSection";

const NewsRolling = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="mb-8 flex w-full gap-2.5">
      <RollingSection
        track="left"
        interval={5000}
        isPaused={isPaused}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}/>
      <RollingSection
        track="right"
        interval={5000}
        delay={1000}
        isPaused={isPaused}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}/>
    </div>
  );
};
export default NewsRolling;

