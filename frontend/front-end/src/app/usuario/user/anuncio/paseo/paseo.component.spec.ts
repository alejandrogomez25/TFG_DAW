import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaseoComponent } from './paseo.component';

describe('PaseoComponent', () => {
  let component: PaseoComponent;
  let fixture: ComponentFixture<PaseoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaseoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
