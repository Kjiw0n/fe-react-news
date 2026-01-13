import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SubscribeAlert from '@/components/commons/SubscribeAlert';
import type { PressData } from '@/constants/types/type';
import useSubscriptionStore from '@/stores/useSubscriptionStore';

interface SubscribeButtonProps {
  pressData: PressData;
  onSubscribeComplete: () => void; // 구독 완료 후 호출되는 핸들러
}

const SubscribeButton = ({
  pressData,
  onSubscribeComplete,
}: SubscribeButtonProps) => {
  const { isSubscribed, subscribe } = useSubscriptionStore();
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    if (isSubscribed(pressData.press)) {
      setShowAlert(true);
      return;
    }
    subscribe(pressData.press);
    onSubscribeComplete();
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
          onComplete={onSubscribeComplete}
          pressName={pressData.press}
        />
      )}
    </>
  );
};

export default SubscribeButton;
