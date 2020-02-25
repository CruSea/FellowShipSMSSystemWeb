import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminPagesLayoutComponent } from './super-admin-pages-layout.component';

describe('SuperAdminPagesLayoutComponent', () => {
  let component: SuperAdminPagesLayoutComponent;
  let fixture: ComponentFixture<SuperAdminPagesLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminPagesLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminPagesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
