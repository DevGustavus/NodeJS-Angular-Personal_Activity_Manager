import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnActivityComponent } from './btn-activity.component';

describe('BtnActivityComponent', () => {
  let component: BtnActivityComponent;
  let fixture: ComponentFixture<BtnActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
