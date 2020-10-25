import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "ngx-recursive-form",
  templateUrl: "ngx-recursive-form.component.html",
  styleUrls: ["ngx-recursive-form.component.css"],
})
export class NgxRecursiveFormComponent {
  @Input() formJson: any;
  @Input() form: FormGroup;

  constructor() {}
}
