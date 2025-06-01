import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { HierarchyListItem } from './hierarchy.models';
import * as HierarchyActions from './hierarchy.actions';

export const HIERARCHY_FEATURE_KEY = 'hierarchy';

export interface HierarchyState extends EntityState<HierarchyListItem> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
  rootItemIds: string[];
  allColumnHeaders: string[];
}

export const hierarchyAdapter: EntityAdapter<HierarchyListItem> =
  createEntityAdapter<HierarchyListItem>();

export const initialHierarchyState: HierarchyState =
  hierarchyAdapter.getInitialState({
    loaded: false,
    rootItemIds: [],
    allColumnHeaders: [],
  });

export const hierarchyReducer = createReducer(
  initialHierarchyState,
  on(HierarchyActions.loadHierarchyItems, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    HierarchyActions.loadHierarchyItemsSuccess,
    (state, { items, rootItemIds, allColumnHeaders }) =>
      hierarchyAdapter.setAll(items, {
        ...state,
        loaded: true,
        rootItemIds,
        allColumnHeaders,
      })
  ),
  on(HierarchyActions.loadHierarchyItemsFailure, (state, { error }) => ({
    ...state,
    error: error as string,
  })),
  on(HierarchyActions.toggleItemExpansion, (state, { itemId }) => {
    const item = state.entities[itemId];
    if (!item) return state;
    return hierarchyAdapter.updateOne(
      { id: itemId, changes: { isExpanded: !item.isExpanded } },
      state
    );
  }),
  on(HierarchyActions.deleteHierarchyItem, (state, { itemId }) => {
    const idsToDelete = getAllDescendantIds(state, itemId);
    let newState = hierarchyAdapter.removeMany(idsToDelete, state);

    const itemToDelete = state.entities[itemId];

    if (itemToDelete?.parentId) {
        const parent = newState.entities[itemToDelete.parentId];
        if (parent) {
            const updatedParentChildIds = parent.childListItemIds.filter(id => id !== itemId);
            newState = hierarchyAdapter.updateOne(
                {
                    id: itemToDelete.parentId,
                    changes: {
                        childListItemIds: updatedParentChildIds,
                        hasChildren: updatedParentChildIds.length > 0,
                    }
                },
                newState
            );
        }
    } else {
        const updatedRootItemIds = newState.rootItemIds.filter(id => id !== itemId);
        newState = { ...newState, rootItemIds: updatedRootItemIds };
    }
    return newState;
  })
);

function getAllDescendantIds(state: HierarchyState, itemId: string): string[] { // Upravený typ
  const ids: string[] = [itemId];
  const item = state.entities[itemId];
  if (item && item.childListItemIds) {
    item.childListItemIds.forEach(childId => {
      ids.push(...getAllDescendantIds(state, childId));
    });
  }
  return ids;
}
