import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import NewsContentView from './NewsContentView';
import NewsTabs from './NewsTabs';
import type { PressData } from '@/constants/types/type';
import NewsPressItem from './NewsPressItem';
import { useEffect, useState } from 'react';

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

  if (!pressData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <NewsTabs />
      <NewsContentView />
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">전체 언론사</TabsTrigger>
          <TabsTrigger value="subscribed">
            <span>내가 구독한 언론사</span>
            <span
              className={cn(
                // 기본 상태 (비활성화 시 색상)
                'bg-surface-brand-alt text-white-weak',
                'display-medium12 flex h-5 w-5 items-center justify-center rounded-full p-0.75',
                // 부모(TabsTrigger)가 active일 때의 색상
                'group-pressData-[state=active]/trigger:bg-surface-brand-default group-pressData-[state=active]/trigger:text-white-default',
              )}
            >
              9
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-6">
            {pressData.slice(page * 24, (page + 1) * 24).map((item) => (
              <NewsPressItem data={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="subscribed">
          <div>tab2</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsStand;
