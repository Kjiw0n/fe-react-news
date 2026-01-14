import { useEffect, useState } from 'react';
import NewsContents from './NewsContents';
import {
  TAB_VALUES,
  type PressDataListResponse,
  type TabValue,
} from '@/constants/type';
import ListViewTab from './ListViewTab';
import { fetchAllPress, fetchSubscribedPress } from '@/apis/news';

interface ListViewProps {
  switchTab: (tabType: TabValue) => void;
  activeTab?: string;
}

export const ITEM_CYCLE_INTERVAL_MS = 20000;

const ListView = ({ switchTab, activeTab }: ListViewProps) => {
  const [pressListData, setPressListData] = useState<PressDataListResponse>({});
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>(categoryList[0]);
  const [pageIdx, setPageIdx] = useState(0);

  useEffect(() => {
    const loadPressData = async () => {
      const data =
        activeTab === TAB_VALUES.ALL
          ? await fetchAllPress('list')
          : await fetchSubscribedPress('list');
      setPressListData(data);
      setCategoryList(Object.keys(data));
    };
    loadPressData();
  }, [activeTab]);

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
    <div key={activeTab} className="flex w-232.5 flex-col">
      <div className="bg-surface-alt border-border-default flex h-10 w-full flex-row justify-start overflow-x-auto border whitespace-nowrap">
        {categoryList.map((category) => (
          <ListViewTab
            key={category}
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
          switchTab={switchTab}
        />
      )}
    </div>
  );
};

export default ListView;
