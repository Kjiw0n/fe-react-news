import { Tabs, TabsContent } from '../ui/tabs';
import ViewLayoutSwitcher from './ViewLayoutSwitcher';

import { TAB_VALUES } from '@/constants/tabs';
import ListView from './ListView';
import MediaSourceTab from './MediaSourceTab';
import GridView from './GridView';

import type { PressData } from '@/constants/types/type';
import { useEffect, useState, useMemo } from 'react';
import useSubscriptionStore from '@/stores/useSubscriptionStore';

const NewsStand = () => {
  const [allPressData, setAllPressData] = useState<PressData[]>([]);
  const [activeTab, setActiveTab] = useState(TAB_VALUES.ALL);
  const { subscribedPresses } = useSubscriptionStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/press-data');
        const data = await res.json();
        setAllPressData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
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

  const switchToSubscribedTab = () => {
    setActiveTab(TAB_VALUES.SUBSCRIBED);
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
            switchToSubscribedTab={switchToSubscribedTab}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsStand;
