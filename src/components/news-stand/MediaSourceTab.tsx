import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

import { TAB_VALUES } from '@/constants/tabs';
import { cn } from '@/lib/utils';
import useSubscriptionStore from '@/stores/useSubscriptionStore';

interface MediaSourceTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MediaSourceTab = ({ activeTab, setActiveTab }: MediaSourceTabProps) => {
  const { subscribedPresses } = useSubscriptionStore();
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="gap-6">
        <TabsTrigger className="cursor-pointer" value={TAB_VALUES.ALL}>
          전체 언론사
        </TabsTrigger>
        <TabsTrigger
          className="cursor-pointer"
          value={TAB_VALUES.SUBSCRIBED}
          disabled={subscribedPresses.length === 0}
        >
          <span>내가 구독한 언론사</span>
          <span
            className={cn(
              // 기본 상태 (비활성화 시 색상)
              'bg-surface-brand-alt text-white-weak',
              'display-medium12 flex h-5 w-5 items-center justify-center rounded-md p-0.75',
              // 부모(TabsTrigger)가 active일 때의 색상
              'group-data-[state=active]/trigger:bg-surface-brand-default group-data-[state=active]/trigger:text-white-default',
            )}
          >
            {subscribedPresses.length}
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default MediaSourceTab;
