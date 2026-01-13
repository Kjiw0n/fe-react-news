import { ThemeState, type PressData } from '@/constants/types/type';
import SubscribeButton from '../commons/SubscribeButton';
import { useState } from 'react';
import { useThemeStore } from '@/stores/useThemeStore';

interface NewsPressItemProps {
  pressData: PressData | null;
}

const NewsPressItem = ({ pressData }: NewsPressItemProps) => {
  const [showButton, setShowButton] = useState(false);
  const { theme } = useThemeStore();

  // 빈 칸인 경우
  if (!pressData) {
    return (
      <div className="border-border-default flex h-[96.25px] w-full items-center justify-center border-r border-b" />
    );
  }

  // SubButton을 보여줄 때
  if (showButton) {
    return (
      <div
        className="border-border-default bg-surface-alt flex h-[96.25px] w-full items-center justify-center border-r border-b"
        onMouseLeave={() => setShowButton(false)}
      >
        <SubscribeButton pressName={pressData.press} />
      </div>
    );
  }

  const logoSrc =
    theme === ThemeState.DARK && pressData.darkLogo
      ? pressData.darkLogo
      : pressData.logo;

  // 데이터가 있는 경우 (기본 상태)
  return (
    <div
      className="border-border-default flex h-[96.25px] w-full items-center justify-center border-r border-b"
      onMouseEnter={() => setShowButton(true)}
    >
      <img
        src={logoSrc}
        alt={pressData.press}
        loading="lazy"
        style={{
          width: 'auto',
          height: '20px',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      />
    </div>
  );
};

export default NewsPressItem;
