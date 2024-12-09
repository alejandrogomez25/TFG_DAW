import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnadirMascotasComponent } from './admin-anadir-mascotas.component';

describe('AdminAnadirMascotasComponent', () => {
  let component: AdminAnadirMascotasComponent;
  let fixture: ComponentFixture<AdminAnadirMascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnadirMascotasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnadirMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
