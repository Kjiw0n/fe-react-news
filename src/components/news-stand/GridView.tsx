import NewsPressItem from './NewsPressItem';
import { TAB_VALUES, type PressDataGridResponse } from '@/constants/type';
import { useEffect, useMemo, useState } from 'react';
import Icon from '@/assets/svg';
import { shuffle } from '@/lib/utils';
import { fetchAllPress, fetchSubscribedPress } from '@/apis/news';

interface GridViewProps {
  activeTab?: string;
}

const GridView = ({ activeTab }: GridViewProps) => {
  const [pressListData, setPressListData] = useState<PressDataGridResponse[]>(
    [],
  );

  const [pageIdx, setPageIdx] = useState(0);

  useEffect(() => {
    const loadPressData = async () => {
      const data =
        activeTab === TAB_VALUES.ALL
          ? await fetchAllPress('grid')
          : await fetchSubscribedPress('grid');
      setPressListData(data);
    };
    loadPressData();
  }, [activeTab]);

  // 전체 데이터에서 96개를 무작위로 추출 (새로고침 시에만 실행됨)
  const selectedData = useMemo(() => {
    const shuffled = shuffle(pressListData);
    return shuffled.slice(0, 96);
  }, [pressListData]);

  // 현재 페이지의 데이터 가져오기
  const currentPageData = selectedData.slice(pageIdx * 24, (pageIdx + 1) * 24);

  // 24개 슬롯을 채우기 위한 배열 생성 (빈 칸 포함)
  const gridItems = Array.from(
    { length: 24 },
    (_, index) => currentPageData[index] || null,
  );

  return (
    <div className="border-border-default relative grid grid-cols-6 border-t border-l">
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
