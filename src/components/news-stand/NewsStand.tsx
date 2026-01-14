import { Tabs, TabsContent } from '../ui/tabs';
import ViewLayoutSwitcher from './ViewLayoutSwitcher';

import ListView from './ListView/ListView';
import MediaSourceTab from './MediaSourceTab';
import GridView from './GridView';

import { TAB_VALUES, type TabValue } from '@/constants/type';
import { useState } from 'react';

const NewsStand = () => {
  const [activeTab, setActiveTab] = useState<TabValue>(TAB_VALUES.ALL);

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
          <GridView activeTab={activeTab} />
        </TabsContent>
        <TabsContent value={TAB_VALUES.LIST}>
          <ListView switchTab={switchTab} activeTab={activeTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsStand;
