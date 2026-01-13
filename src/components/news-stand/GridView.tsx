import NewsPressItem from './NewsPressItem';
import { Skeleton } from '../ui/skeleton';
import type { PressData } from '@/constants/types/type';
import useSubscriptionStore from '@/stores/useSubscriptionStore';
import { useState } from 'react';

interface GridViewProps {
  pressData: PressData[] | null;
}

const GridView = ({ pressData }: GridViewProps) => {
  const { count, inc } = useSubscriptionStore();
  const [pageIdx, setPageIdx] = useState(0);
  return (
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
            .slice(pageIdx * 24, (pageIdx + 1) * 24)
            .map((item) => <NewsPressItem key={item.press} data={item} />)}
    </div>
  );
};

export default GridView;
