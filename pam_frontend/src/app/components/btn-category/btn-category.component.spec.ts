import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCategoryComponent } from './btn-category.component';

describe('BtnCategoryComponent', () => {
  let component: BtnCategoryComponent;
  let fixture: ComponentFixture<BtnCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
