import {
  CATEGORY_LIST,
  type Category,
  type PressData,
} from '@/constants/types/type';
import { useEffect, useState } from 'react';
import SubButton from '../commons/SubButton';

interface ListViewProps {
  pressData: PressData[] | null;
}

const ITEM_CYCLE_INTERVAL_MS = 20000;

const ListView = ({ pressData }: ListViewProps) => {
  const groupedData = groupByCategory(pressData || []);
  const categoryList = Object.keys(groupedData) as Category[];

  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categoryList[0],
  );
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(
        (prevIdx) =>
          (prevIdx + 1) %
          (groupedData ? groupedData[selectedCategory].length : 1),
      );
    }, ITEM_CYCLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [groupedData, pressData, selectedCategory]);

  if (!pressData) return <div>Loading...</div>;

  const handleTabClick = (category: Category) => {
    setSelectedCategory(category);
    setIdx(0);
  };

  return (
    <div className="flex w-232.5 flex-col">
      <div className="bg-surface-alt border-border-default flex h-10 w-full flex-row justify-start border">
        {categoryList.map((category) => (
          <div
            key={`${category}-${idx}`}
            className={`flex cursor-pointer flex-row items-center gap-2 px-4 hover:underline ${
              selectedCategory === category
                ? 'selected-bold14 text-white-default bg-brand-60 bg-fill-progress animate-fill-progress'
                : 'available-medium14 text-weak'
            }`}
            onClick={() => handleTabClick(category)}
          >
            <span>{category}</span>
            {selectedCategory === category && (
              <span>
                {idx + 1}/{groupedData[category].length}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="border-border-default -mt-px flex flex-col gap-4 border p-6">
        <div className="flex flex-row items-center justify-start gap-4">
          <img
            className="h-5 w-13"
            src={groupedData[selectedCategory][idx].logo}
            alt="news logo"
          />
          <span className="display-medium12 text-default">
            {groupedData[selectedCategory][idx].time}
          </span>
          <SubButton pressName={groupedData[selectedCategory][idx].press} />
        </div>

        <div className="flex flex-row gap-8">
          <a
            className="flex flex-col gap-4"
            href={groupedData[selectedCategory][idx].mainLink}
          >
            <img
              className="h-50 w-[320px] object-cover"
              src={groupedData[selectedCategory][idx].mainImg}
              alt="news-preview"
            />
            <span className="available-medium16 text-strong h-11 w-[320px] overflow-y-hidden wrap-break-word whitespace-normal">
              {groupedData[selectedCategory][idx].mainTitle}
            </span>
          </a>
          <div className="flex flex-col gap-4">
            <ul className="available-medium16 text-bold flex flex-col gap-4">
              {groupedData[selectedCategory][idx].relatedArticles.map(
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
              {groupedData[selectedCategory][idx].press} 언론사에서 직접 편집한
              뉴스입니다.
            </span>
          </div>
        </div>
      </div>
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
