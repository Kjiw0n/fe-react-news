import NewsPressItem from './NewsPressItem';
import type { PressData } from '@/constants/types/type';
import { useState } from 'react';
import Icon from '@/assets/svg';

interface GridViewProps {
  pressData: PressData[];
}

const GridView = ({ pressData }: GridViewProps) => {
  const [pageIdx, setPageIdx] = useState(0);

  // 현재 페이지의 데이터 가져오기
  const currentPageData = pressData.slice(pageIdx * 24, (pageIdx + 1) * 24);

  // 24개 슬롯을 채우기 위한 배열 생성 (빈 칸 포함)
  const gridItems = Array.from(
    { length: 24 },
    (_, index) => currentPageData[index] || null,
  );

  return (
    <div className="relative grid grid-cols-6">
      {gridItems.map((item, index) => (
        <NewsPressItem key={item?.press || `empty-${index}`} data={item} />
      ))}
      {pageIdx > 0 && (
        <Icon.IconArrowLeft
          className="absolute top-1/2 -left-11.75 h-10 w-6 -translate-y-1/2 cursor-pointer"
          onClick={() => setPageIdx(pageIdx - 1)}
        />
      )}
      {pageIdx < pressData.length / 24 - 1 && (
        <Icon.IconArrowRight
          className="absolute top-1/2 -right-11.75 h-10 w-6 -translate-y-1/2 cursor-pointer"
          onClick={() => setPageIdx(pageIdx + 1)}
        />
      )}
    </div>
  );
};

export default GridView;
