import { useEffect, useMemo, useState } from 'react';
import NewsContents from './NewsContents';
import ListViewTab from './ListViewTab';
import { usePressList } from '@/apis/news';
import { useNewsStandTab } from '../NewsStandTabProvider';

export const ITEM_CYCLE_INTERVAL_MS = 20000;

const ListView = () => {
  const { activeTab, setActiveTab } = useNewsStandTab();

  const { data: pressListData = {} } = usePressList(activeTab, 'list');

  const categoryList = useMemo(
    () => (pressListData ? Object.keys(pressListData) : []),
    [pressListData],
  );

  const [selectedTab, setSelectedTab] = useState<string>('');
  const [pageIdx, setPageIdx] = useState(0);

  // 실제로 사용할 탭 (selectedTab이 비어있거나 유효하지 않으면 첫 번째 카테고리 사용)
  const currentTab = useMemo(() => {
    if (selectedTab && categoryList.includes(selectedTab)) {
      return selectedTab;
    }
    return categoryList[0] || '';
  }, [selectedTab, categoryList]);

  useEffect(() => {
    const pressGroup = pressListData[currentTab];
    if (!pressGroup) return;

    const pressNames = Object.keys(pressGroup);
    if (pressNames.length === 0) return;

    const interval = setInterval(() => {
      setPageIdx((prevIdx) => (prevIdx + 1) % pressNames.length);
    }, ITEM_CYCLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [pressListData, currentTab, pageIdx]);

  const handleTabClick = (category: string) => {
    setSelectedTab(category);
    setPageIdx(0);
  };

  // view rendering
  const pressGroup =
    pressListData && selectedTab ? pressListData[selectedTab] : null;
  const pressNames = pressGroup ? Object.keys(pressGroup) : [];
  const currentPressName = pressNames[pageIdx];
  const currentPressData =
    pressGroup && currentPressName ? pressGroup[currentPressName] : [];

  // 데이터가 없으면 렌더링 중단
  if (!pressListData || categoryList.length === 0) return null;

  return (
    <div className="flex min-h-100 w-232.5 flex-col">
      <div className="bg-surface-alt border-border-default flex h-10 w-full flex-row justify-start overflow-x-auto border whitespace-nowrap">
        {categoryList.map((category) => (
          <ListViewTab
            key={category + pageIdx}
            category={category}
            selectedTab={currentTab}
            pageIdx={pageIdx}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            pressListData={pressListData}
          />
        ))}
      </div>

      {currentPressData.length > 0 && (
        <NewsContents
          pressListData={pressListData}
          selectedTab={currentTab}
          pageIdx={pageIdx}
          switchTab={setActiveTab}
        />
      )}
    </div>
  );
};

export default ListView;
