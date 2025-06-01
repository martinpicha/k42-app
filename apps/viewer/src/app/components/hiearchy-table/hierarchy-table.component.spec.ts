import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HierarchyTableComponent } from './hierarchy-table.component';

describe('HierarchyTableComponent', () => {
  let component: HierarchyTableComponent;
  let fixture: ComponentFixture<HierarchyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HierarchyTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HierarchyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
