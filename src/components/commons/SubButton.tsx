import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Alert from '@/components/commons/Alert';

interface SubButtonProps {
  isSubscribed?: boolean;
  pressName: string;
}

const SubButton = ({ isSubscribed = false, pressName }: SubButtonProps) => {
  const [subscribed, setSubscribed] = useState(isSubscribed);
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    if (subscribed) {
      setShowAlert(true);
      return;
    }

    setSubscribed(true);
  };

  return (
    <>
      <Button
        size="sm"
        variant="default"
        className="w-18"
        onClick={handleClick}
        aria-pressed={subscribed}
      >
        {subscribed ? '× 해지하기' : '+ 구독하기'}
      </Button>
      {showAlert && (
        <Alert
          pressName={pressName}
          open={showAlert}
          onOpenChange={setShowAlert}
        />
      )}
    </>
  );
};

export default SubButton;
