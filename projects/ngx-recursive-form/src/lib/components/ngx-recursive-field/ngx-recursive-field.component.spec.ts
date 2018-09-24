import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRecursiveFieldComponent } from './ngx-recursive-field.component';

describe('NgxRecursiveFieldComponent', () => {
  let component: NgxRecursiveFieldComponent;
  let fixture: ComponentFixture<NgxRecursiveFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxRecursiveFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRecursiveFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
