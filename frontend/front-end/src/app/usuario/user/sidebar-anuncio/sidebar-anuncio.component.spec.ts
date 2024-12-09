import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAnuncioComponent } from './sidebar-anuncio.component';

describe('SidebarAnuncioComponent', () => {
  let component: SidebarAnuncioComponent;
  let fixture: ComponentFixture<SidebarAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarAnuncioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
