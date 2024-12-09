import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnadirAnuncioComponent } from './admin-anadir-anuncio.component';

describe('AdminAnadirAnuncioComponent', () => {
  let component: AdminAnadirAnuncioComponent;
  let fixture: ComponentFixture<AdminAnadirAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnadirAnuncioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnadirAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
