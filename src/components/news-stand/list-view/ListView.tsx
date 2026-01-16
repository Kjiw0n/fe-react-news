import { useEffect, useMemo, useState } from 'react';
import NewsContents from './NewsContents';
import { TAB_VALUES } from '@/constants/type';
import ListViewTab from './ListViewTab';
import { usePressAllQuery, usePressSubscribedQuery } from '@/apis/news';
import { useNewsStandTab } from '../NewsStandTabProvider';
// import { useNewsStandTab } from '../NewsStandTabProvider';

export const ITEM_CYCLE_INTERVAL_MS = 20000;

const ListView = () => {
  const { activeTab, setActiveTab } = useNewsStandTab();
  const { data: allPressData } = usePressAllQuery('list');
  const { data: subscribedPressData } = usePressSubscribedQuery(
    'list',
    activeTab,
  );

  const pressListData = useMemo(() => {
    if (activeTab === TAB_VALUES.ALL) {
      return allPressData ?? {};
    } else {
      return subscribedPressData ?? {};
    }
  }, [activeTab, allPressData, subscribedPressData]);

  const categoryList = useMemo(
    () => Object.keys(pressListData),
    [pressListData],
  );

  const [selectedTab, setSelectedTab] = useState<string>(categoryList[0]);
  const [pageIdx, setPageIdx] = useState(0);

  useEffect(() => {
    if (categoryList.length === 0) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedTab(categoryList[0]);
    setPageIdx(0);
  }, [categoryList, activeTab]);

  useEffect(() => {
    const pressGroup = pressListData[selectedTab];
    if (!pressGroup) return;

    const pressNames = Object.keys(pressGroup);
    if (pressNames.length === 0) return;

    const interval = setInterval(() => {
      setPageIdx((prevIdx) => (prevIdx + 1) % pressNames.length);
    }, ITEM_CYCLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [pressListData, selectedTab, pageIdx]);

  const handleTabClick = (category: string) => {
    setSelectedTab(category);
    setPageIdx(0);
  };

  // view rendering
  const pressGroup = pressListData[selectedTab];
  const pressNames = pressGroup ? Object.keys(pressGroup) : [];
  const currentPressName = pressNames[pageIdx];
  const currentPressData = pressGroup?.[currentPressName] || [];

  return (
    <div className="flex w-232.5 flex-col">
      <div className="bg-surface-alt border-border-default flex h-10 w-full flex-row justify-start overflow-x-auto border whitespace-nowrap">
        {categoryList.map((category) => (
          <ListViewTab
            key={category + pageIdx}
            category={category}
            selectedTab={selectedTab}
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
          selectedTab={selectedTab}
          pageIdx={pageIdx}
          switchTab={setActiveTab}
        />
      )}
    </div>
  );
};

export default ListView;
