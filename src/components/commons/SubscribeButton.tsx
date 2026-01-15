import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SubscribeAlert from '@/components/commons/SubscribeAlert';

import { TAB_VALUES, type TabValue } from '@/constants/type';
import { getSubscribedPresses, subscribePress } from '@/apis/subscription';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

interface SubscribeButtonProps {
  pressName: string;
  switchTab?: (tabType: TabValue) => void;
  variant?: 'text' | 'icon';
}

const SubscribeButton = ({
  pressName,
  switchTab,
  variant = 'text',
}: SubscribeButtonProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const queryClient = useQueryClient();
  const { data: subscribedPresses = [] } = useSuspenseQuery({
    queryKey: ['subscribedPresses'],
    queryFn: async () => {
      const presses = await getSubscribedPresses();
      return presses;
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: subscribePress,
    onSuccess: () => {
      // 구독 목록 쿼리 무효화 → 자동 리페칭
      queryClient.invalidateQueries({ queryKey: ['subscribedPresses'] });
      switchTab?.(TAB_VALUES.SUBSCRIBED);
    },
  });

  const handleClick = () => {
    if (subscribedPresses.includes(pressName)) {
      setShowAlert(true);
      return;
    }
    // 구독하기 API 호출
    subscribeMutation.mutate(pressName);
  };

  return (
    <>
      <Button size="sm" className="cursor-pointer" onClick={handleClick}>
        {!subscribedPresses.includes(pressName)
          ? '+ 구독하기'
          : variant === 'icon'
            ? '× '
            : '× 해지하기'}
      </Button>
      {showAlert && (
        <SubscribeAlert
          open={showAlert}
          onOpenChange={setShowAlert}
          pressName={pressName}
        />
      )}
    </>
  );
};

export default SubscribeButton;
