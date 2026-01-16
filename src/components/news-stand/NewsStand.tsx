import { Tabs, TabsContent } from '../ui/tabs';
import { TAB_VALUES } from '@/constants/type';
import GridView from './grid-view/GridView';
import ListView from './list-view/ListView';
import MediaSourceTab from './tabs/MediaSourceTab';
import ViewLayoutSwitcher from './tabs/ViewLayoutSwitcher';
import NewsStandTabProvider from './NewsStandTabProvider';

const NewsStand = () => {
  return (
    <NewsStandTabProvider>
      <div className="flex flex-col gap-6">
        <Tabs defaultValue={TAB_VALUES.GRID}>
          <div className="flex justify-between">
            <MediaSourceTab />
            <ViewLayoutSwitcher />
          </div>
          <TabsContent value={TAB_VALUES.GRID}>
            <GridView />
          </TabsContent>
          <TabsContent value={TAB_VALUES.LIST}>
            <ListView />
          </TabsContent>
        </Tabs>
      </div>
    </NewsStandTabProvider>
  );
};

export default NewsStand;
