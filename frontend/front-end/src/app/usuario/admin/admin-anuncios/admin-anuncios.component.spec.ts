import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnunciosComponent } from './admin-anuncios.component';

describe('AdminAnunciosComponent', () => {
  let component: AdminAnunciosComponent;
  let fixture: ComponentFixture<AdminAnunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnunciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
