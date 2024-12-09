import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminUsuarioComponent } from './modal-admin-usuario.component';

describe('ModalAdminUsuarioComponent', () => {
  let component: ModalAdminUsuarioComponent;
  let fixture: ComponentFixture<ModalAdminUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdminUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdminUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
