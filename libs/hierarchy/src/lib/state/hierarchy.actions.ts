import { createAction, props } from '@ngrx/store';
import { HierarchyListItem, RawDataItem } from './hierarchy.models';

export const loadHierarchyItems = createAction(
  '[HierarchyItems API] Load HierarchyItems',
  props<{ rawData: RawDataItem[] }>()
);

export const loadHierarchyItemsSuccess = createAction(
  '[HierarchyItems API] Load HierarchyItems Success',
  props<{ items: HierarchyListItem[]; rootItemIds: string[]; allColumnHeaders: string[] }>()
);

export const loadHierarchyItemsFailure = createAction(
  '[HierarchyItems API] Load HierarchyItems Failure',
  props<{ error: unknown }>()
);

export const toggleItemExpansion = createAction(
  '[HierarchyItems Page] Toggle Item Expansion',
  props<{ itemId: string }>()
);

export const deleteHierarchyItem = createAction(
  '[HierarchyItems Page] Delete Hierarchy Item',
  props<{ itemId: string }>()
);

