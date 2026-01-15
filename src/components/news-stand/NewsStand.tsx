import { Tabs, TabsContent } from '../ui/tabs';
import { TAB_VALUES, type TabValue } from '@/constants/type';
import { Suspense, useState } from 'react';
import GridView from './grid-view/GridView';
import ListView from './list-view/ListView';
import MediaSourceTab from './tabs/MediaSourceTab';
import ViewLayoutSwitcher from './tabs/ViewLayoutSwitcher';
import { Skeleton } from '../ui/skeleton';

const NewsStand = () => {
  const [activeTab, setActiveTab] = useState<TabValue>(TAB_VALUES.ALL);

  const switchTab = (tabType: TabValue) => {
    setActiveTab(tabType);
  };

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue={TAB_VALUES.GRID}>
        <div className="flex justify-between">
          <Suspense
            fallback={
              <div className="flex h-fit gap-6">
                <Skeleton className="h-4 w-18.25" />
                <Skeleton className="h-4 w-29.75" />
              </div>
            }
          >
            <MediaSourceTab activeTab={activeTab} onValueChange={switchTab} />
          </Suspense>

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
