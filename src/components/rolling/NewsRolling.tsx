import RollingItem from './RollingItem';

const NewsRolling = () => {
  return (
    <div className="mb-8 flex w-full flex-row gap-2">
      <RollingItem title="press" content="news-title" />
      <RollingItem title="press" content="news-title" />
    </div>
  );
};

export default NewsRolling;
