import type { PressData } from '@/constants/types/type';
import SubscribeButton from '../commons/SubscribeButton';

interface NewsPressItemProps {
  pressData: PressData | null;
}

const NewsPressItem = ({ pressData }: NewsPressItemProps) => {
  // 빈 칸인 경우
  if (!pressData) {
    return (
      <div className="border-border-default flex h-[96.25px] w-full items-center justify-center border-r border-b" />
    );
  }

  return (
    <div className="group relative border-border-default flex h-[96.25px] w-full items-center justify-center border-r border-b">
      <div className="flex items-center justify-center group-hover:hidden">
        <img
          src={pressData.logo}
          alt={pressData.press}
          loading="lazy"
          className="h-5 w-auto select-none"
          style={{ WebkitUserSelect: 'none' }}
        />
      </div>

      <div className="bg-surface-alt absolute inset-0 hidden items-center justify-center group-hover:flex">
        <SubscribeButton pressName={pressData.press} />
      </div>
    </div>
  );
};

export default NewsPressItem;