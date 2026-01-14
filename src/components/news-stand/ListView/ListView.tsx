import { useEffect, useMemo, useState } from 'react';
import NewsContents from './NewsContents';
import {
  CATEGORY_LIST,
  TAB_VALUES,
  type PressData,
  type TabValue,
} from '@/constants/type';
import ListViewTab from './ListViewTab';

interface ListViewProps {
  pressData: PressData[] | null;
  switchTab: (tabType: TabValue) => void;
  activeTab?: string;
}

export const ITEM_CYCLE_INTERVAL_MS = 20000;

const ListView = ({ pressData, switchTab, activeTab }: ListViewProps) => {
  const groupedData = useMemo(
    () =>
      activeTab === TAB_VALUES.ALL
        ? groupByCategory(pressData || [])
        : groupByPress(pressData || []),
    [pressData, activeTab],
  );
  const categoryList = useMemo(
    () => Object.keys(groupedData).filter((key) => groupedData[key].length > 0),
    [groupedData],
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
    const interval = setInterval(() => {
      setPageIdx(
        (prevIdx) =>
          (prevIdx + 1) % (groupedData ? groupedData[selectedTab].length : 1),
      );
    }, ITEM_CYCLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [groupedData, pressData, selectedTab, pageIdx]);

  const handleTabClick = (category: string) => {
    setSelectedTab(category);
    setPageIdx(0);
  };

  return (
    <div key={activeTab} className="flex w-232.5 flex-col">
      <div className="bg-surface-alt border-border-default flex h-10 w-full flex-row justify-start overflow-x-auto border whitespace-nowrap">
        {categoryList.map((category) => (
          <ListViewTab
            key={`${category}-${pageIdx}`}
            category={category}
            selectedTab={selectedTab}
            pageIdx={pageIdx}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            groupedData={groupedData}
          />
        ))}
      </div>

      {groupedData[selectedTab]?.[pageIdx] && (
        <NewsContents
          groupedData={groupedData}
          selectedTab={selectedTab}
          pageIdx={pageIdx}
          switchTab={switchTab}
        />
      )}
    </div>
  );
};

export default ListView;

/* 추후 api로 처리할 코드 */
const groupByCategory = (data: PressData[]): Record<string, PressData[]> => {
  const grouped: Record<string, PressData[]> = Object.fromEntries(
    CATEGORY_LIST.map((category) => [category, [] as PressData[]]),
  ) as Record<string, PressData[]>;

  data.forEach((item) => {
    grouped[item.category].push(item);
  });

  return grouped;
};

// Record<pressName: string, PressData[]>
const groupByPress = (data: PressData[]): Record<string, PressData[]> => {
  const grouped: Record<string, PressData[]> = {};

  data.forEach((item) => {
    const press = item.press;

    if (!grouped[press]) {
      grouped[press] = [];
    }

    grouped[press].push(item);
  });

  return grouped;
};
