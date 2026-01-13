import type { PressData } from '@/constants/types/type';

interface NewsPressItemProps {
  data: PressData;
}

const NewsPressItem = ({ data }: NewsPressItemProps) => {
  return (
    <div className="h-[154.17px] w-[96.25px] bg-amber-100">
      <img
        src={data.logo}
        alt={data.press}
        loading="lazy"
        width={600}
        height={400}
        // 반응형 대응
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default NewsPressItem;
