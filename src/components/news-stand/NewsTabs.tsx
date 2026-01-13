import { cn } from '@/lib/utils';
import { TabsList, TabsTrigger } from '../ui/tabs';

import { TAB_VALUES } from '@/constants/tabs';
const NewsTabs = () => {
  return (
    <TabsList>
      <TabsTrigger value={TAB_VALUES.ALL}>전체 언론사</TabsTrigger>
      <TabsTrigger value={TAB_VALUES.SUBSCRIBED}>
        <span>내가 구독한 언론사</span>
        <span
          className={cn(
            'bg-surface-brand-alt text-white-weak',
            'display-medium12 flex h-5 w-5 items-center justify-center rounded-full p-0.75',
            'group-pressData-[state=active]/trigger:bg-surface-brand-default group-pressData-[state=active]/trigger:text-white-default',
          )}
        >
          9
        </span>
      </TabsTrigger>
    </TabsList>
  );
};

export default NewsTabs;
