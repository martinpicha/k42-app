import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HierarchyListItem, HierarchyFacade, RawDataItem } from '@k42-app/hierarchy/data-access';
import { HierarchyRowComponent } from "../hiearchy-row/hierarchy-row.component";



@Component({
  selector: 'app-hierarchy-table',
  standalone: true,
  imports: [CommonModule, HierarchyRowComponent],
  templateUrl: './hierarchy-table.component.html',
  styleUrls: ['./hierarchy-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchyTableComponent implements OnInit {
  private facade = inject(HierarchyFacade);
  private http = inject(HttpClient);

  visibleItems$: Observable<HierarchyListItem[]> = this.facade.visibleItems$;
  headers$: Observable<string[]> = this.facade.allColumnHeaders$;

  ngOnInit(): void {
    this.http.get<RawDataItem[]>('/example-data.json').subscribe(data => {
      this.facade.loadHierarchyItems(data);
    });
  }

  trackById(index: number, item: HierarchyListItem): string {
    return item.id;
  }

  onToggleExpand(itemId: string): void {
    this.facade.toggleItemExpansion(itemId);
  }

  onDeleteItem(itemId: string): void {
    this.facade.deleteItem(itemId);
  }

}
