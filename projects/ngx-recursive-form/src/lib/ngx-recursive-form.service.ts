import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { clone } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class NgxRecursiveFormService {

  constructor() { }

  toFormGroup(formModel) {
    let formGroup = {};
    formModel.forEach(field => {
      formGroup[field.name] = this.toFormGroupFromArr(field.parameters);
    });
    return new FormGroup(formGroup);
  }

  toFormGroupFromArr(arr) {
    return new FormGroup(arr.reduce((acc, cur) => {
      return this.appendFieldFormControlToObject(cur, acc);
    }, {}));
  }

  appendFieldFormControlToObject(field, obj) {
    if (field.type == 'object' || field.type == 'checkbox') {
      obj[field.name] = this.toFormGroupFromArr(field.parameters)
    } else if (field.type == 'array') {
      obj[field.name] = new FormArray(field.defaultValue.map((el, index) => {
        return this.toFormGroupFromArr(el);
      }));
    } else {
      if (field.required) {
       if (field.validations instanceof Array) {
        field.validations.push({key: 'required'});
       } else {
        field.validations = [{key: 'required'}];
       }
      }
      obj[field.name] = new FormControl(field.defaultValue, (field.validations || []).map(v => {
        switch (v.key) {
          case "required":
            return Validators.required;
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
