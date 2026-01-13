import RollingSection from "./RollingSection";

const NewsRolling = () => {
  return (
    <div className="mb-8 flex w-full gap-2.5">
      <RollingSection track="left" interval={5000}/>
      <RollingSection track="right" interval={5000} delay={1000} />
    </div>
  );
};
export default NewsRolling;