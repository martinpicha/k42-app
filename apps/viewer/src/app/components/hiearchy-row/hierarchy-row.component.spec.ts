import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HierarchyRowComponent } from './hierarchy-row.component';

describe('HierarchyRowComponent', () => {
  let component: HierarchyRowComponent;
  let fixture: ComponentFixture<HierarchyRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HierarchyRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HierarchyRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
