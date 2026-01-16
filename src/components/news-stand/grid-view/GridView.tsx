import { useState } from 'react';
import Icon from '@/assets/svg';
import { usePressList } from '@/apis/news';
import NewsPressItem from './NewsPressItem';
import { useNewsStandTab } from '../NewsStandTabProvider';

const GridView = () => {
  const { activeTab } = useNewsStandTab();
  const [pageIdx, setPageIdx] = useState(0);

  const { data: selectedData = [] } = usePressList(activeTab, 'grid');

  // 현재 페이지의 데이터 가져오기
  const currentPageData = selectedData.slice(pageIdx * 24, (pageIdx + 1) * 24);

  // 24개 슬롯을 채우기 위한 배열 생성 (빈 칸 포함)
  const gridItems = Array.from(
    { length: 24 },
    (_, index) => currentPageData[index] || null,
  );

  return (
    <div
      key={activeTab}
      className="border-border-default relative grid grid-cols-6 border-t border-l"
    >
      {gridItems.map((item, index) => (
        <NewsPressItem
          key={item?.press || `empty-${index}`}
          pressListData={item}
        />
      ))}
      {pageIdx > 0 && (
        <Icon.ArrowLeft
          className="absolute top-1/2 -left-11.75 h-10 w-6 -translate-y-1/2 cursor-pointer"
          onClick={() => setPageIdx(pageIdx - 1)}
        />
      )}
      {pageIdx < selectedData.length / 24 - 1 && (
        <Icon.ArrowRight
          className="absolute top-1/2 -right-11.75 h-10 w-6 -translate-y-1/2 cursor-pointer"
          onClick={() => setPageIdx(pageIdx + 1)}
        />
      )}
    </div>
  );
};

export default GridView;
