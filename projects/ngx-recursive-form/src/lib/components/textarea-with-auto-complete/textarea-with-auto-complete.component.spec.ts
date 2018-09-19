import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaWithAutoCompleteComponent } from './textarea-with-auto-complete.component';

describe('TextareaWithAutoCompleteComponent', () => {
  let component: TextareaWithAutoCompleteComponent;
  let fixture: ComponentFixture<TextareaWithAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaWithAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaWithAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
