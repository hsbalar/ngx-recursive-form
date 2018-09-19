import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormxComponent } from './formx.component';

describe('FormxComponent', () => {
  let component: FormxComponent;
  let fixture: ComponentFixture<FormxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
