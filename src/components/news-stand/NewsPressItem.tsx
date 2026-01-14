import { ThemeState, type PressData } from '@/constants/type';
import SubscribeButton from '../commons/SubscribeButton';
import { useThemeStore } from '@/stores/useThemeStore';

interface NewsPressItemProps {
  pressData: PressData | null;
}

const NewsPressItem = ({ pressData }: NewsPressItemProps) => {
  const { theme } = useThemeStore();

  // 빈 칸인 경우
  if (!pressData) {
    return (
      <div className="border-border-default flex h-[96.25px] w-full items-center justify-center border-r border-b" />
    );
  }

  const logoSrc =
    theme === ThemeState.DARK && pressData.darkLogo
      ? pressData.darkLogo
      : pressData.logo;

  // 데이터가 있는 경우 (기본 상태)
  return (
    <div className="group border-border-default relative flex h-[96.25px] w-full items-center justify-center border-r border-b">
      <div className="flex items-center justify-center group-hover:hidden">
        <img
          src={logoSrc}
          alt={pressData.press}
          loading="lazy"
          className="h-5 w-auto select-none"
          style={{ WebkitUserSelect: 'none' }}
        />
      </div>

      <div className="bg-surface-alt absolute inset-0 hidden items-center justify-center group-hover:flex">
        <SubscribeButton pressName={pressData.press} />
      </div>
    </div>
  );
};

export default NewsPressItem;
