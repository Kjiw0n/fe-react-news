import Icon from '@/assets/svg';
import { updateDate } from '@/utils/date';

const Header = () => {
  const date = updateDate();
  return (
    <div className="mb-10 flex flex-row items-center justify-between">
      <div className="flex flex-row gap-2">
        <Icon.IconNewsPaper className="h-6 w-6" />
        <span className="display-bold24 text-strong">뉴스스탠드</span>
      </div>
      <span className="display-medium16 text-default">{date}</span>
    </div>
  );
};

export default Header;
