import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { NgxRecursiveFormService } from '../../ngx-recursive-form.service';

@Component({
  selector: 'ngx-recursive-field',
  templateUrl: './ngx-recursive-field.component.html',
  styleUrls: ['./ngx-recursive-field.component.css']
})
export class NgxRecursiveFieldComponent implements OnInit {

  @ViewChild('string') string: TemplateRef<any>;
  @ViewChild('textarea') textarea: TemplateRef<any>;
  @ViewChild('stringWithAutoComplete') stringWithAutoComplete: TemplateRef<any>;
  @ViewChild('textareaWithAutoComplete') textareaWithAutoComplete: TemplateRef<any>;
  @ViewChild('number') number: TemplateRef<any>;
  @ViewChild('password') password: TemplateRef<any>;
  @ViewChild('select') select: TemplateRef<any>;
  @ViewChild('asyncSelect') asyncSelect: TemplateRef<any>;
  @ViewChild('checkbox') checkbox: TemplateRef<any>;
  @ViewChild('radio') radio: TemplateRef<any>;
  @ViewChild('date') date: TemplateRef<any>;
  @ViewChild('dateRange') dateRange: TemplateRef<any>;
  @ViewChild('object') object: TemplateRef<any>;
  @ViewChild('boolean') boolean: TemplateRef<any>;
  @Input() abstractControl: AbstractControl;
  @Input() field: any;

  constructor(public ngxRecursiveFormService: NgxRecursiveFormService) { }

  ngOnInit() {}

  getTemplateOutlet(type) {
    switch (type) {
      case "string":
        return this.string;
      case "textarea":
        return this.textarea;
      case "stringWithAutoComplete":
        return this.stringWithAutoComplete;
      case "textareaWithAutoComplete":
        return this.textareaWithAutoComplete;
      case "number":
        return this.number;
      case "password":
        return this.password;
      case "select":
        return this.select;
      case "async-select":
        return this.asyncSelect;
      case "checkbox":
        return this.checkbox;
      case "radio":
        return this.radio;
      case "date":
        return this.date;
      case "dateRange":
        return this.dateRange;
      case "boolean":
        return this.boolean;
      case "object":
        return this.object;

      default:
        break;
    }
  }

  getContext(f, i?) {
    if(this.field.type ===  "array")
      return {'field': f, 'control': (this.abstractControl as FormArray).at(i).get(f.name)};
    else
      return {'field': f, 'control': this.abstractControl};
  }

  addField(e: Event): void {
    e.preventDefault();
    this.field.defaultValue.push(this.field.parameters);
    (this.abstractControl as FormArray).push(this.ngxRecursiveFormService.toFormGroupFromArr(this.field.parameters));
  }

  removeField(i, e: MouseEvent): void {
    e.preventDefault();
    this.field.defaultValue.splice(i, 1);
    (this.abstractControl as FormArray).removeAt(i);
  }

}

