import type { PressData } from '@/constants/types/type';

interface NewsPressItemProps {
  data: PressData | null;
}

const NewsPressItem = ({ data }: NewsPressItemProps) => {
  // 빈 칸인 경우
  if (!data) {
    return (
      <div className="flex h-[96.25px] w-full items-center justify-center border-r border-b border-border-default" />
    );
  }

  // 데이터가 있는 경우
  return (
    <div className="flex h-[96.25px] w-full items-center justify-center border-r border-b border-border-default">
      <img
        src={data.logo}
        alt={data.press}
        loading="lazy"
        style={{ width: 'auto', height: '20px' }}
      />
    </div>
  );
};

export default NewsPressItem;
