import { Tabs, TabsContent } from '../ui/tabs';
import NewsContentView from './NewsContentView';
import NewsTabs from './NewsTabs';
import type { PressData } from '@/constants/types/type';
import NewsPressItem from './NewsPressItem';
import { useEffect, useState } from 'react';
import { TAB_VALUES } from '@/constants/tabs';
import { Skeleton } from '../ui/skeleton';

const NewsStand = () => {
  const [pressData, setPressData] = useState<PressData[] | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/press-data');
        const data = await res.json();
        setPressData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* <NewsContentView /> */}
      <Tabs defaultValue={TAB_VALUES.ALL}>
        <NewsTabs />
        <TabsContent value={TAB_VALUES.ALL}>
          <div className="grid grid-cols-6">
            {!pressData
              ? Array.from({ length: 24 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex h-[96.25px] w-full items-center justify-center border"
                  >
                    <Skeleton className="h-5 w-24" />
                  </div>
                ))
              : pressData
                  .slice(page * 24, (page + 1) * 24)
                  .map((item) => (
                    <NewsPressItem key={item.press} data={item} />
                  ))}
          </div>
        </TabsContent>
        <TabsContent value={TAB_VALUES.SUBSCRIBED}>
          <div>tab2</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsStand;
