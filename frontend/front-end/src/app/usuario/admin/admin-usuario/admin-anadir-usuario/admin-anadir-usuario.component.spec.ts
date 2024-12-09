import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnadirUsuarioComponent } from './admin-anadir-usuario.component';

describe('AdminAnadirUsuarioComponent', () => {
  let component: AdminAnadirUsuarioComponent;
  let fixture: ComponentFixture<AdminAnadirUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnadirUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnadirUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
