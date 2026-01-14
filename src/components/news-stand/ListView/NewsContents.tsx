import SubscribeButton from '@/components/commons/SubscribeButton';
import type { PressData, TabValue } from '@/constants/type';

interface NewsContentsProps {
  groupedData: Record<string, PressData[]>;
  selectedTab: string;
  pageIdx: number;
  switchTab: (tabType: TabValue) => void;
}

const NewsContents = ({
  groupedData,
  selectedTab,
  pageIdx,
  switchTab,
}: NewsContentsProps) => {
  return (
    <div className="border-border-default -mt-px flex flex-col gap-4 border p-6">
      <div className="flex flex-row items-center justify-start gap-4">
        <img
          className="h-5 w-13"
          src={groupedData[selectedTab][pageIdx].logo}
          alt="news logo"
        />
        <span className="display-medium12 text-default">
          {groupedData[selectedTab][pageIdx].time}
        </span>
        <SubscribeButton
          pressName={groupedData[selectedTab][pageIdx].press}
          switchTab={switchTab}
        />
      </div>

      <div className="flex flex-row gap-8">
        <a
          className="flex flex-col gap-4"
          href={groupedData[selectedTab][pageIdx].mainLink}
        >
          <img
            className="h-50 w-[320px] object-cover"
            src={groupedData[selectedTab][pageIdx].mainImg}
            alt="news-preview"
          />
          <span className="available-medium16 text-strong h-11 w-[320px] overflow-y-hidden wrap-break-word whitespace-normal">
            {groupedData[selectedTab][pageIdx].mainTitle}
          </span>
        </a>
        <div className="flex flex-col gap-4">
          <ul className="available-medium16 text-bold flex flex-col gap-4">
            {groupedData[selectedTab][pageIdx].relatedArticles.map(
              (article, i) => (
                <li
                  key={`${article.link}-${i}-${pageIdx}`}
                  className="max-w-132.5 cursor-pointer truncate hover:underline"
                >
                  {article.title}
                </li>
              ),
            )}
          </ul>
          <span className="display-medium14 text-weak">
            {groupedData[selectedTab][pageIdx].press} 언론사에서 직접 편집한
            뉴스입니다.
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsContents;
