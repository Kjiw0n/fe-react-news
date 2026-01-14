import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SubscribeAlert from '@/components/commons/SubscribeAlert';
import useSubscriptionStore from '@/stores/useSubscriptionStore';
import { TAB_VALUES, type TabValue } from '@/constants/type';

interface SubscribeButtonProps {
  pressName: string;
  switchTab?: (tabType: TabValue) => void;
}

const SubscribeButton = ({ pressName, switchTab }: SubscribeButtonProps) => {
  const { isSubscribed, subscribe } = useSubscriptionStore();
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    if (isSubscribed(pressName)) {
      setShowAlert(true);
      return;
    }
    subscribe(pressName);
    switchTab?.(TAB_VALUES.SUBSCRIBED);
  };

  return (
    <>
      <Button size="sm" className="w-18 cursor-pointer" onClick={handleClick}>
        {isSubscribed(pressName) ? '× 해지하기' : '+ 구독하기'}
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
