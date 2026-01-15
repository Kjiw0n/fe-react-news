import { unsubscribePress } from '@/apis/subscription';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SubscribeAlertProps {
  pressName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscribeAlert = ({
  pressName,
  open,
  onOpenChange,
}: SubscribeAlertProps) => {
  const queryClient = useQueryClient();

  const unsubscribeMutation = useMutation({
    mutationFn: unsubscribePress,
    onSuccess: () => {
      // 자동으로 getSubscribedPresses() 다시 호출
      queryClient.invalidateQueries({ queryKey: ['subscribedPresses'] });
      onOpenChange(false);
    },
  });

  const handleUnsubscribe = () => {
    unsubscribeMutation.mutate(pressName);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[320px]">
        <AlertDialogHeader>
          <div className="flex flex-row items-center justify-center">
            <AlertDialogTitle className="leading-5.5">
              {pressName}
            </AlertDialogTitle>
            <AlertDialogDescription>을(를)</AlertDialogDescription>
          </div>
          <AlertDialogDescription>구독해지하시겠습니까?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="border-border-default bg-surface-alt available-medium16 text-default -mr-px w-1/2 cursor-pointer border p-2.5 hover:underline"
            onClick={handleUnsubscribe}
          >
            예, 해지합니다
          </AlertDialogAction>
          <AlertDialogCancel className="border-border-default bg-surface-alt available-medium16 text-strong -mr-px w-1/2 cursor-pointer border p-2.5 hover:underline">
            아니오
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubscribeAlert;
