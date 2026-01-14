import { TAB_VALUES, type PressData } from '@/constants/type';

const ListViewTab = ({
  category,
  selectedTab,
  pageIdx,
  handleTabClick,
  activeTab,
  groupedData,
}: {
  category: string;
  selectedTab: string;
  pageIdx: number;
  handleTabClick: (category: string) => void;
  activeTab?: string;
  groupedData: Record<string, PressData[]>;
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
      {selectedTab === category && (
        <>
          {activeTab === TAB_VALUES.ALL ? (
            <PageIndicator
              pageIdx={pageIdx}
              groupedData={groupedData}
              category={category}
            />
          ) : (
            <span className="text-white-default mb-0.5 flex w-3.5 flex-row items-center">
              {'>'}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default ListViewTab;

const PageIndicator = ({
  pageIdx,
  groupedData,
  category,
}: {
  pageIdx: number;
  groupedData: Record<string, PressData[]>;
  category: string;
}) => {
  return (
    <div className="display-bold12 text-white-weak flex flex-row items-center gap-1">
      <span className="text-white-default">{pageIdx + 1}</span>
      <span>/</span>
      <span>{groupedData[category].length}</span>
    </div>
  );
};
