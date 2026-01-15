import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SubscribeAlert from '@/components/commons/SubscribeAlert';

import { TAB_VALUES, type TabValue } from '@/constants/type';
import {
  useSubscribedPresses,
  useSubscribePressMutation,
} from '@/apis/subscription';

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
  const { data: subscribedPresses = [] } = useSubscribedPresses();

  const subscribeMutation = useSubscribePressMutation();

  const handleClick = async () => {
    if (subscribedPresses.includes(pressName)) {
      setShowAlert(true);
      return;
    }
    await subscribeMutation.mutateAsync(pressName);

    switchTab?.(TAB_VALUES.SUBSCRIBED);
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
