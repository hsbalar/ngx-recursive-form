import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringWithAutoCompleteComponent } from './string-with-auto-complete.component';

describe('StringWithAutoCompleteComponent', () => {
  let component: StringWithAutoCompleteComponent;
  let fixture: ComponentFixture<StringWithAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringWithAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringWithAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
