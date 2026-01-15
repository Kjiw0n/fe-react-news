import { Tabs, TabsContent } from '../ui/tabs';
import { TAB_VALUES, type TabValue } from '@/constants/type';
import { useState } from 'react';
import GridView from './grid-view/GridView';
import ListView from './list-view/ListView';
import MediaSourceTab from './tabs/MediaSourceTab';
import ViewLayoutSwitcher from './tabs/ViewLayoutSwitcher';

const NewsStand = () => {
  const [activeTab, setActiveTab] = useState<TabValue>(TAB_VALUES.ALL);

  const switchTab = (tabType: TabValue) => {
    setActiveTab(tabType);
  };

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue={TAB_VALUES.GRID}>
        <div className="flex justify-between">
          <MediaSourceTab activeTab={activeTab} onValueChange={switchTab} />
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
