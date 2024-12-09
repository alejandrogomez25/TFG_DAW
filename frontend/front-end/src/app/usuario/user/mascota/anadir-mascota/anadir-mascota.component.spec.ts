import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirMascotaComponent } from './anadir-mascota.component';

describe('AnadirMascotaComponent', () => {
  let component: AnadirMascotaComponent;
  let fixture: ComponentFixture<AnadirMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnadirMascotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
