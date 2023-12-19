import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MshdComponent } from './mshd.component';

describe('MshdComponent', () => {
  let component: MshdComponent;
  let fixture: ComponentFixture<MshdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MshdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MshdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
