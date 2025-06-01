export interface RawDataItem {
  data: Record<string, unknown>;
  children?: {
    [key: string]: {
      records: RawDataItem[];
    };
  };
}

export interface HierarchyListItem {
  id: string;
  originalId: string;
  data: Record<string, unknown>;
  level: number;
  isExpanded: boolean;
  parentId?: string;
  childListItemIds: string[];
  hasChildren: boolean;
}
