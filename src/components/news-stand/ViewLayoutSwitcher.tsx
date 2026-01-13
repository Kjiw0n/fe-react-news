import { TabsList, TabsTrigger } from '../ui/tabs';
import { TAB_VALUES } from '@/constants/tabs';
import Icon from '@/assets/svg';

const ViewLayoutSwitcher = () => {
  return (
    <TabsList className="gap-2">
      <TabsTrigger value={TAB_VALUES.LIST}>
        <Icon.IconListView className="size-6" />
      </TabsTrigger>
      <TabsTrigger value={TAB_VALUES.GRID}>
        <Icon.IconGridView className="size-6" />
      </TabsTrigger>
    </TabsList>
  );
};

export default ViewLayoutSwitcher;
