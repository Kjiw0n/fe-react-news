import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

import { TAB_VALUES } from '@/constants/tabs';
import { cn } from '@/lib/utils';
import useSubscriptionStore from '@/stores/useSubscriptionStore';

interface MediaSourceTabProps {
  setActiveTab: (tab: string) => void;
}

const MediaSourceTab = ({ setActiveTab }: MediaSourceTabProps) => {
  const { subscribedPresses } = useSubscriptionStore();
  return (
    <Tabs defaultValue={TAB_VALUES.ALL} onValueChange={setActiveTab}>
      <TabsList className="gap-6">
        <TabsTrigger value={TAB_VALUES.ALL}>전체 언론사</TabsTrigger>
        <TabsTrigger value={TAB_VALUES.SUBSCRIBED}>
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
            {subscribedPresses.length}
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default MediaSourceTab;
