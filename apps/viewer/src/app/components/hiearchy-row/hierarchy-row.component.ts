import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HierarchyListItem } from '@k42-app/hierarchy/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-hierarchy-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hierarchy-row.component.html',
  styleUrls: ['./hierarchy-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchyRowComponent {
  @Input() item!: HierarchyListItem;
  @Input() headers!: string[];

  @Output() toggleExpand = new EventEmitter<string>();
  @Output() deleteItem = new EventEmitter<string>();

  onToggleExpandInternal(): void {
    if (this.item.hasChildren) {
      this.toggleExpand.emit(this.item.id);
    }
  }

  onDeleteItemInternal(): void {
    this.deleteItem.emit(this.item.id);
  }
}
