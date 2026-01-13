import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import NewsContentView from './NewsContentView';
import NewsTabs from './NewsTabs';

const NewsStand = () => {
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
                'group-data-[state=active]/trigger:bg-surface-brand-default group-data-[state=active]/trigger:text-white-default',
              )}
            >
              9
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div>tab1</div>
        </TabsContent>
        <TabsContent value="subscribed">
          <div>tab2</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsStand;
