import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  HIERARCHY_FEATURE_KEY,
  HierarchyState,
  hierarchyAdapter,
} from './hierarchy.reducer';
import { HierarchyListItem } from './hierarchy.models';

export const selectHierarchyState = createFeatureSelector<HierarchyState>(
  HIERARCHY_FEATURE_KEY
);

const { selectAll, selectEntities } = hierarchyAdapter.getSelectors();

export const selectHierarchyLoaded = createSelector(
  selectHierarchyState,
  (state: HierarchyState) => state.loaded
);

export const selectHierarchyError = createSelector(
  selectHierarchyState,
  (state: HierarchyState) => state.error
);

export const selectAllHierarchyInternal = createSelector(
  selectHierarchyState,
  (state: HierarchyState) => selectAll(state)
);

export const selectHierarchyEntities = createSelector(
  selectHierarchyState,
  (state: HierarchyState) => selectEntities(state)
);

// selectSelectedId and selectSelected might not be needed for this task
// export const selectSelectedId = createSelector(
//   selectHierarchyState,
//   (state: HierarchyState) => state.selectedId
// );
// export const selectSelected = createSelector(
//   selectHierarchyEntities,
//   selectSelectedId,
//   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
// );

export const selectRootItemIds = createSelector(
  selectHierarchyState,
  (state: HierarchyState) => state.rootItemIds
);

export const selectAllColumnHeaders = createSelector(
  selectHierarchyState,
  (state: HierarchyState) => state.allColumnHeaders
);

export const selectVisibleHierarchyItems = createSelector(
  selectHierarchyEntities,
  selectRootItemIds,
  (entities, rootIds): HierarchyListItem[] => {
    const visibleItems: HierarchyListItem[] = [];
    function addChildrenToVisible(itemId: string) {
      const item = entities[itemId];
      if (!item) return;
      visibleItems.push(item);
      if (item.isExpanded && item.childListItemIds) {
        item.childListItemIds.forEach(childId => {
          addChildrenToVisible(childId);
        });
      }
    }
    rootIds.forEach(id => addChildrenToVisible(id));
    return visibleItems;
  }
);
export function selectSelected(selectSelected: any): import("rxjs").OperatorFunction<any, any> {
  throw new Error('Function not implemented.');
}

