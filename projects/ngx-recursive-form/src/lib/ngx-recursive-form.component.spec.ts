import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NgxRecursiveFormComponent } from "./ngx-recursive-form.component";

describe("NgxRecursiveFormComponent", () => {
  let component: NgxRecursiveFormComponent;
  let fixture: ComponentFixture<NgxRecursiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxRecursiveFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRecursiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
