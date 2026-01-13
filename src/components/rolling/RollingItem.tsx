interface RollingItemProps {
  title: string;
  content: string;
}

const RollingItem = ({ title, content }: RollingItemProps) => {
  return (
    <div className="flex h-12 w-full flex-row items-center gap-4 p-4">
      <span className="display-bold14 text-strong">{title}</span>
      <span className="available-medium14 text-default">{content}</span>
    </div>
  );
};

export default RollingItem;
