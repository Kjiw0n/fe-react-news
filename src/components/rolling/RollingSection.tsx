import NewsRolling from "./NewsRolling";

const RollingSection = () => {
  return (
    <div className="mb-8 flex w-full gap-2.5">
      <NewsRolling track="left" interval={5000}/>
      <NewsRolling track="right" interval={5000} delay={1000} />
    </div>
  );
};
export default RollingSection;