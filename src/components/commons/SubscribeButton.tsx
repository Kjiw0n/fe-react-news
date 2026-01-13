import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SubscribeAlert from '@/components/commons/SubscribeAlert';
import type { PressData } from '@/constants/types/type';
import useSubscriptionStore from '@/stores/useSubscriptionStore';

interface SubscribeButtonProps {
  pressData: PressData;
}

const SubscribeButton = ({ pressData }: SubscribeButtonProps) => {
  const { isSubscribed, subscribe } = useSubscriptionStore();
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    if (isSubscribed(pressData.press)) {
      setShowAlert(true);
      return;
    }
    subscribe(pressData.press);
  };

  return (
    <>
      <Button size="sm" className="w-18" onClick={handleClick}>
        {isSubscribed(pressData.press) ? '× 해지하기' : '+ 구독하기'}
      </Button>
      {showAlert && (
        <SubscribeAlert
          open={showAlert}
          onOpenChange={setShowAlert}
          pressName={pressData.press}
        />
      )}
    </>
  );
};

export default SubscribeButton;
