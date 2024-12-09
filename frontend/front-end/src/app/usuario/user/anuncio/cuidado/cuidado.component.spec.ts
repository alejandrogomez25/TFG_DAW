import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuidadoComponent } from './cuidado.component';

describe('CuidadoComponent', () => {
  let component: CuidadoComponent;
  let fixture: ComponentFixture<CuidadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuidadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
