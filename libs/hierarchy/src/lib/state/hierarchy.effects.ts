import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as HierarchyActions from './hierarchy.actions';
import { HierarchyListItem, RawDataItem } from './hierarchy.models';

let idCounter = 0;
function generateUniqueId(): string {
  return `item-${idCounter++}`;
}

@Injectable({ providedIn: 'root' })
export class HierarchyEffects {
  private actions$ = inject(Actions);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HierarchyActions.loadHierarchyItems),
      switchMap(({ rawData }) => {
        try {
          idCounter = 0;
          const allColumnHeadersSet = new Set<string>();
          const { flatItems, rootItemIds } = this.transformRawData(rawData, undefined, 0, allColumnHeadersSet);
          const allColumnHeaders = Array.from(allColumnHeadersSet);
          return of(
            HierarchyActions.loadHierarchyItemsSuccess({ items: flatItems, rootItemIds, allColumnHeaders })
          );
        } catch (error) {
          console.error('Error transforming data:', error);
          return of(HierarchyActions.loadHierarchyItemsFailure({ error }));
        }
      })
    )
  );

  private transformRawData(
    rawDataItems: RawDataItem[],
    parentId: string | undefined,
    level: number,
    allColumnHeadersSet: Set<string>
  ): { flatItems: HierarchyListItem[]; rootItemIds: string[] } {
    const items: HierarchyListItem[] = [];

    for (const rawItem of rawDataItems) {
      const itemId = generateUniqueId();

      Object.keys(rawItem.data).forEach(key => allColumnHeadersSet.add(key));

      const childListItemIds: string[] = [];
      let hasChildren = false;

      if (rawItem.children) {
        Object.values(rawItem.children).forEach(childGroup => {
          if (childGroup.records && childGroup.records.length > 0) {
            hasChildren = true;
            const transformedChildren = this.transformRawData(
              childGroup.records,
              itemId,
              level + 1,
              allColumnHeadersSet
            );
            items.push(...transformedChildren.flatItems);
            childListItemIds.push(...transformedChildren.rootItemIds);
          }
        });
      }

      items.push({
        id: itemId,
        originalId: rawItem.data['ID']?.toString() || itemId,
        data: rawItem.data,
        level: level,
        isExpanded: level === 0,
        parentId: parentId,
        childListItemIds: childListItemIds,
        hasChildren: hasChildren || childListItemIds.length > 0,
      });
    }
    const rootItemIdsForThisLevel = items.filter(item => item.parentId === parentId).map(item => item.id);
    return { flatItems: items, rootItemIds: rootItemIdsForThisLevel };
  }
}
