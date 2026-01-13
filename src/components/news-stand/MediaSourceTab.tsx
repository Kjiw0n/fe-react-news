import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

import { TAB_VALUES } from '@/constants/tabs';
import useSubscriptionStore from '@/stores/useSubscriptionStore';

interface MediaSourceTabProps {
  setActiveTab: (tab: string) => void;
}

const MediaSourceTab = ({ setActiveTab }: MediaSourceTabProps) => {
  const { subscribedPressIds } = useSubscriptionStore();
  return (
    <Tabs defaultValue={TAB_VALUES.ALL} onValueChange={setActiveTab}>
      <TabsList className="gap-6">
        <TabsTrigger value={TAB_VALUES.ALL}>전체 언론사</TabsTrigger>
        <TabsTrigger value={TAB_VALUES.SUBSCRIBED}>
          내가 구독한 언론사 ({subscribedPressIds.length})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default MediaSourceTab;
