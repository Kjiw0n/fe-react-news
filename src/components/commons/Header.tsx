import Icon from '@/assets/svg';
import { ThemeState } from '@/constants/type';
import { useThemeStore } from '@/stores/useThemeStore';
import { updateDate } from '@/utils/utils';

const Header = () => {
  const date = updateDate();
  const { theme, toggleTheme } = useThemeStore();
  const onCLickLogo = () => {
    window.location.reload();
  };

  return (
    <div className="mb-10 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        <Icon.NewsPaper
          className="fill-point h-6 w-6 cursor-pointer"
          onClick={onCLickLogo}
        />
        <span className="display-bold24 text-strong">뉴스스탠드</span>
        {theme === ThemeState.LIGHT ? (
          <Icon.ModeBright
            className="fill-point h-5 w-5 cursor-pointer"
            onClick={toggleTheme}
          />
        ) : (
          <Icon.ModeDark
            className="fill-point h-5 w-5 cursor-pointer"
            onClick={toggleTheme}
          />
        )}
      </div>
      <span className="display-medium16 text-default">{date}</span>
    </div>
  );
};

export default Header;
