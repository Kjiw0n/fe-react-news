import type { PressData } from '@/constants/types/type';
import SubscribeButton from '../commons/SubscribeButton';
import { useState } from 'react';

interface NewsPressItemProps {
  pressData: PressData | null;
}

const NewsPressItem = ({ pressData }: NewsPressItemProps) => {
  const [showButton, setShowButton] = useState(false);

  // 빈 칸인 경우
  if (!pressData) {
    return (
      <div className="flex h-[96.25px] w-full items-center justify-center border-r border-b border-border-default" />
    );
  }

  // SubButton을 보여줄 때
  if (showButton) {
    return (
      <div className="bg-surface-alt flex h-[96.25px] w-full items-center justify-center border">
        <SubscribeButton
          pressData={pressData}
          onSubscribeComplete={() => setShowButton(false)} // 구독 완료 시 버튼 숨기기
        />
      </div>
    );
  }

  // 데이터가 있는 경우 (기본 상태)
  return (
    <div className="flex h-[96.25px] w-full items-center justify-center border-r border-b border-border-default">
      <img
        src={pressData.logo}
        alt={pressData.press}
        loading="lazy"
        style={{ width: 'auto', height: '20px' }}
        onClick={() => setShowButton(true)}
      />
    </div>
  );
};

export default NewsPressItem;
