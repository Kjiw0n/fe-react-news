import type { PressData } from '@/constants/types/type';

interface NewsPressItemProps {
  data: PressData;
}

const NewsPressItem = ({ data }: NewsPressItemProps) => {
  return (
    <div className="flex h-[96.25px] w-full items-center justify-center border">
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
