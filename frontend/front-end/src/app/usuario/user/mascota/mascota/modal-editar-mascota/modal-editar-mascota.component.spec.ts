import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarMascotaComponent } from './modal-editar-mascota.component';

describe('ModalEditarMascotaComponent', () => {
  let component: ModalEditarMascotaComponent;
  let fixture: ComponentFixture<ModalEditarMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarMascotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
