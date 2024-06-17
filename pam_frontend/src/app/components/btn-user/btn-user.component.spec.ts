import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnUserComponent } from './btn-user.component';

describe('BtnUserComponent', () => {
  let component: BtnUserComponent;
  let fixture: ComponentFixture<BtnUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
