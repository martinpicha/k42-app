import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as HierarchyActions from './hierarchy.actions';
import * as HierarchySelectors from './hierarchy.selectors';
import { RawDataItem } from './hierarchy.models';

@Injectable({ providedIn: 'root' })
export class HierarchyFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(HierarchySelectors.selectHierarchyLoaded));
  allHierarchyItems$ = this.store.pipe(select(HierarchySelectors.selectAllHierarchyInternal));
  selectedHierarchyItems$ = this.store.pipe(select(HierarchySelectors.selectSelected));
  visibleItems$ = this.store.pipe(select(HierarchySelectors.selectVisibleHierarchyItems));
  allColumnHeaders$ = this.store.pipe(select(HierarchySelectors.selectAllColumnHeaders));

  loadHierarchyItems(rawData: RawDataItem[]) {
    this.store.dispatch(HierarchyActions.loadHierarchyItems({ rawData }));
  }

  toggleItemExpansion(itemId: string) {
    this.store.dispatch(HierarchyActions.toggleItemExpansion({ itemId }));
  }

  deleteItem(itemId: string) {
    this.store.dispatch(HierarchyActions.deleteHierarchyItem({ itemId }));
  }
}
