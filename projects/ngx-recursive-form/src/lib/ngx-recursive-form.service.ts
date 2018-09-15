import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { some } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class NgxRecursiveFormService {

  constructor() { }

  toFormGroup(formModel): any {
    let formGroup = {};
    let formControls = [];
    formModel.forEach(field => {
      if (field.type == 'object' || field.type == 'array' || field.type == 'checkbox')
      formGroup[field.name] = this.toFormGroupFromArr(field.parameters);
      else
      formControls.push({ name: field.name, control: this.appendFieldFormControlToObject(field)[field.name] });
    });
    let form = new FormGroup(formGroup);
    formControls.forEach(f => form.addControl(f.name, f.control));
    return form;
  }

  toFormGroupFromArr(arr) {
    return new FormGroup(arr.reduce((acc, cur) => {
      return this.appendFieldFormControlToObject(cur, acc);
    }, {}));
  }

  appendFieldFormControlToObject(field, obj = {}) {    
    if (field.type == 'object' || field.type == 'checkbox') {
      obj[field.name] = this.toFormGroupFromArr(field.parameters)
    } else if (field.type == 'array') {
      obj[field.name] = new FormArray(field.defaultValue.map((el, index) => {
        return this.toFormGroupFromArr(el);
      }));
    } else {
      obj[field.name] = new FormControl(field.defaultValue, (field.validations || []).map(v => {
        switch (v.name) {
          case "required":
            return v.value ? Validators.required : null;
          case "minlength":
            return Validators.minLength(v.value);
          case "maxlength":
            return Validators.maxLength(v.value);
          case "email":
            return Validators.email;
          case "pattern":
            return Validators.pattern(v.value);
          case "number":
            return Validators.pattern("[0-9]+");
        }
      }));
    }
    return obj;
  }
}
