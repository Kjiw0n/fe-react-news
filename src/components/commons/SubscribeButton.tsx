import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SubscribeAlert from '@/components/commons/SubscribeAlert';
import useSubscriptionStore from '@/stores/useSubscriptionStore';

interface SubscribeButtonProps {
  pressName: string;
}

const SubscribeButton = ({ pressName }: SubscribeButtonProps) => {
  const { isSubscribed, subscribe } = useSubscriptionStore();
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    if (isSubscribed(pressName)) {
      setShowAlert(true);
      return;
    }
    subscribe(pressName);
  };

  return (
    <>
      <Button size="sm" className="w-18" onClick={handleClick}>
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
