import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminMascotaComponent } from './modal-admin-mascota.component';

describe('ModalAdminMascotaComponent', () => {
  let component: ModalAdminMascotaComponent;
  let fixture: ComponentFixture<ModalAdminMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdminMascotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdminMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
