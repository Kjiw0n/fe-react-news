import {
  CATEGORY_LIST,
  TAB_VALUES,
  type Category,
  type PressData,
} from '@/constants/type';
import { useEffect, useMemo, useState } from 'react';
import SubscribeButton from '@/components/commons/SubscribeButton';

interface ListViewProps {
  pressData: PressData[] | null;
  switchToSubscribedTab: () => void;
  activeTab?: string;
}

const ITEM_CYCLE_INTERVAL_MS = 20000;

const ListView = ({
  pressData,
  switchToSubscribedTab,
  activeTab,
}: ListViewProps) => {
  const groupedData = useMemo(
    () => groupByCategory(pressData || []),
    [pressData],
  );
  const categoryList = useMemo(
    () =>
      Object.keys(groupedData).filter(
        (category) => groupedData[category as Category].length > 0,
      ) as Category[],
    [groupedData],
  );

  const [selectedTab, setSelectedTab] = useState<Category>(categoryList[0]);
  const [pageIdx, setPageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPageIdx(
        (prevIdx) =>
          (prevIdx + 1) % (groupedData ? groupedData[selectedTab].length : 1),
      );
    }, ITEM_CYCLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [groupedData, pressData, selectedTab, pageIdx]);

  if (!pressData) return <div>Loading...</div>;

  const handleTabClick = (category: Category) => {
    setSelectedTab(category);
    setPageIdx(0);
  };

  return (
    <div className="flex w-232.5 flex-col">
      <div className="bg-surface-alt border-border-default flex h-10 w-full flex-row justify-start overflow-x-auto border whitespace-nowrap">
        {categoryList.map((category) => (
          <div
            key={`${category}-${pageIdx}`}
            className={`flex cursor-pointer flex-row items-center gap-2 px-4 hover:underline ${
              selectedTab === category
                ? 'selected-bold14 text-white-default bg-brand-60 bg-fill-progress animate-fill-progress w-41.5 justify-between'
                : 'available-medium14 text-weak'
            }`}
            onClick={() => handleTabClick(category)}
          >
            <span>{category}</span>
            {selectedTab === category && (
              <>
                {activeTab === TAB_VALUES.ALL ? (
                  <div className="display-bold12 text-white-weak flex flex-row items-center gap-1">
                    <span className="text-white-default">{pageIdx + 1}</span>
                    <span>/</span>
                    <span>{groupedData[category].length}</span>
                  </div>
                ) : (
                  <span className="text-white-default mb-0.5 flex w-3.5 flex-row items-center">
                    {'>'}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {groupedData[selectedTab]?.[pageIdx] && (
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
              onClick={switchToSubscribedTab}
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
                  (article) => (
                    <li
                      key={article.link}
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
      )}
    </div>
  );
};

export default ListView;

const groupByCategory = (data: PressData[]): Record<Category, PressData[]> => {
  const grouped: Record<Category, PressData[]> = Object.fromEntries(
    CATEGORY_LIST.map((category) => [category, [] as PressData[]]),
  ) as Record<Category, PressData[]>;

  data.forEach((item) => {
    grouped[item.category].push(item);
  });

  return grouped;
};
