import SubscribeButton from '@/components/commons/SubscribeButton';
import type { PressDataListResponse, TabValue } from '@/constants/type';

interface NewsContentsProps {
  pressListData: PressDataListResponse;
  selectedTab: string;
  pageIdx: number;
  switchTab: (tabType: TabValue) => void;
}

const NewsContents = ({
  pressListData,
  selectedTab,
  pageIdx,
  switchTab,
}: NewsContentsProps) => {
  const currentPressData =
    pressListData[selectedTab] &&
    Object.values(pressListData[selectedTab])[pageIdx]?.[0];
  if (!currentPressData) return null;

  return (
    <div className="border-border-default -mt-px flex flex-col gap-4 border p-6">
      <div className="flex flex-row items-center justify-start gap-4">
        <img className="h-5 w-13" src={currentPressData.logo} alt="news logo" />
        <span className="display-medium12 text-default">
          {currentPressData.time}
        </span>
        <SubscribeButton
          pressName={currentPressData.press}
          switchTab={switchTab}
        />
      </div>

      <div className="flex flex-row gap-8">
        <a
          className="flex flex-col gap-4"
          href={currentPressData.mainLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-50 w-[320px] object-cover"
            src={currentPressData.mainImg}
            alt="news-preview"
          />
          <span className="available-medium16 text-strong h-11 w-[320px] overflow-y-hidden wrap-break-word whitespace-normal">
            {currentPressData.mainTitle}
          </span>
        </a>

        <div className="flex flex-col gap-4">
          <ul className="available-medium16 text-bold flex flex-col gap-4">
            {currentPressData.relatedArticles.map((article, i) => (
              <li
                key={`${article.link}-${i}-${pageIdx}`}
                className="max-w-132.5 cursor-pointer truncate hover:underline"
              >
                {article.title}
              </li>
            ))}
          </ul>
          <span className="display-medium14 text-weak">
            {currentPressData.press} 언론사에서 직접 편집한 뉴스입니다.
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsContents;
