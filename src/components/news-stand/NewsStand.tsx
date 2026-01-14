import { Tabs, TabsContent } from '../ui/tabs';
import ViewLayoutSwitcher from './ViewLayoutSwitcher';

import ListView from './ListView/ListView';
import MediaSourceTab from './MediaSourceTab';
import GridView from './GridView';

import { TAB_VALUES, type PressData, type TabValue } from '@/constants/type';
import { useEffect, useState, useMemo } from 'react';
import useSubscriptionStore from '@/stores/useSubscriptionStore';
import { fetchPressData } from '@/apis/pressApi';

const NewsStand = () => {
  const [allPressData, setAllPressData] = useState<PressData[]>([]);
  const [activeTab, setActiveTab] = useState<TabValue>(TAB_VALUES.ALL);
  const { subscribedPresses } = useSubscriptionStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPressData();
        setAllPressData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    loadData();
  }, []);

  const pressData = useMemo(
    () =>
      activeTab === TAB_VALUES.SUBSCRIBED && allPressData
        ? allPressData.filter((press) =>
            subscribedPresses.includes(press.press),
          )
        : allPressData,
    [activeTab, allPressData, subscribedPresses],
  );

  const switchTab = (tabType: TabValue) => {
    setActiveTab(tabType);
  };

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue={TAB_VALUES.GRID}>
        <div className="flex justify-between">
          <MediaSourceTab activeTab={activeTab} setActiveTab={setActiveTab} />
          <ViewLayoutSwitcher />
        </div>
        <TabsContent value={TAB_VALUES.GRID}>
          <GridView pressData={pressData} />
        </TabsContent>
        <TabsContent value={TAB_VALUES.LIST}>
          <ListView
            pressData={pressData}
            switchTab={switchTab}
            activeTab={activeTab}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsStand;
