import { TAB_VALUES, type PressDataListResponse } from '@/constants/type';

const ListViewTab = ({
  category,
  selectedTab,
  pageIdx,
  handleTabClick,
  activeTab,
  pressListData,
}: {
  category: string;
  selectedTab: string;
  pageIdx: number;
  handleTabClick: (category: string) => void;
  activeTab?: string;
  pressListData: PressDataListResponse;
}) => {
  return (
    <div
      className={`flex cursor-pointer flex-row items-center gap-2 px-4 hover:underline ${
        selectedTab === category
          ? 'selected-bold14 text-white-default bg-brand-60 bg-fill-progress animate-fill-progress w-41.5 justify-between'
          : 'available-medium14 text-weak'
      }`}
      onClick={() => handleTabClick(category)}
    >
      <span>{category}</span>
      {selectedTab === category &&
        (activeTab === TAB_VALUES.ALL ? (
          <PageIndicator
            pageIdx={pageIdx}
            total={Object.keys(pressListData[category] || {}).length}
          />
        ) : (
          <span className="text-white-default mb-0.5 flex w-3.5 items-center">
            {'>'}
          </span>
        ))}
    </div>
  );
};

export default ListViewTab;

const PageIndicator = ({
  pageIdx,
  total,
}: {
  pageIdx: number;
  total: number;
}) => {
  return (
    <div className="display-bold12 text-white-weak flex flex-row items-center gap-1">
      <span className="text-white-default">{pageIdx + 1}</span>
      <span>/</span>
      <span>{total}</span>
    </div>
  );
};
