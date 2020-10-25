import { TestBed, inject } from "@angular/core/testing";

import { NgxRecursiveFormService } from "./ngx-recursive-form.service";

describe("NgxRecursiveFormService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxRecursiveFormService],
    });
  });

  it("should be created", inject(
    [NgxRecursiveFormService],
    (service: NgxRecursiveFormService) => {
      expect(service).toBeTruthy();
    }
  ));
});
