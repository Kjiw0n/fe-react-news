import NewsRolling from "./NewsRolling";

const RollingSection = () => {
  return (
    <div className="mb-8 flex w-full gap-2.5">
      <NewsRolling track="left" />
      <NewsRolling track="right" interval={5000} />
    </div>
  );
};
export default RollingSection;