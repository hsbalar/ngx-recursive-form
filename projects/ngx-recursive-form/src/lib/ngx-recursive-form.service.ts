import { Injectable } from "@angular/core";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { some, includes, map, orderBy } from "lodash";
import { Observable, Observer } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NgxRecursiveFormService {
  formJson: any;
  formValue: any;
  errorStatus: any;
  path: string;
  types: any = [
    "string",
    "array",
    "password",
    "textarea",
    "stringWithAutoComplete",
    "textareaWithAutoComplete",
    "number",
    "select",
    "async-select",
    "option",
    "checkbox",
    "radio",
    "date",
    "dateRange",
    "boolean",
    "object",
  ];

  constructor() {}

  initNgxRecursiveForm(
    formJsonConfig: any,
    formValueConfig: any = {}
  ): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.formJson = formJsonConfig;
      this.formValue = formValueConfig;
      this.initializeAndValidateModel();
      if (this.errorStatus) {
        observer.error({ message: "Invalid JSON config provided." });
        observer.complete();
      }
      observer.next({
        form: this.toFormGroup(this.formJson),
        orderedFormJson: this.formJson,
      });
      observer.complete();
    });
  }

  toFormGroup(formModel): any {
    let formGroup = {};
    let formControls = [];
    formModel.forEach((field) => {
      if (field.type == "object" || field.type == "array")
        formGroup[field.name] = this.toFormGroupFromArr(field.parameters);
      else if (field.type == "checkbox")
        formGroup[field.name] = this.toFormGroupFromArr(field.options);
      else
        formControls.push({
          name: field.name,
          control: this.appendFieldFormControlToObject(field)[field.name],
        });
    });
    let form = new FormGroup(formGroup);
    formControls.forEach((f) => form.addControl(f.name, f.control));
    return form;
  }

  toFormGroupFromArr(arr) {
    return new FormGroup(
      arr.reduce((acc, cur) => {
        return this.appendFieldFormControlToObject(cur, acc);
      }, {})
    );
  }

  appendFieldFormControlToObject(field, obj = {}) {
    if (field.type == "object") {
      obj[field.name] = this.toFormGroupFromArr(field.parameters);
    } else if (field.type == "checkbox") {
      obj[field.name] = this.toFormGroupFromArr(field.options);
    } else if (field.type == "array") {
      obj[field.name] = new FormArray(
        field.defaultValue.map((el, index) => {
          return this.toFormGroupFromArr(el);
        })
      );
    } else {
      obj[field.name] = new FormControl(
        field.defaultValue,
        (field.validations || []).map((v) => {
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
        })
      );
    }
    return obj;
  }

  initializeAndValidateModel() {
    this.errorStatus = false;
    this.formJson = orderBy(this.formJson, ["order"], ["asc"]);
    this.formJson.forEach((field) => {
      this.path = field.name;
      this.validateJson(field);
    });
  }

  toFormGroupFromArrForValidation(arr) {
    arr.reduce((acc, cur) => {
      this.path = `${this.path}.${cur.name}`;
      return this.validateJson(cur);
    }, {});
  }

  get = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

  validateJson(field: any) {
    if (!includes(this.types, field.type) || !field.hasOwnProperty("name")) {
      this.errorStatus = true;
      return;
    }
    if (field.type == "object") {
      field.parameters = orderBy(field.parameters, ["order"], ["asc"]);
      this.toFormGroupFromArrForValidation(field.parameters);
      this.path = this.path.replace(`.${field.name}`, "");
    } else if (field.type == "checkbox") {
      this.toFormGroupFromArrForValidation(field.options);
      this.path = this.path.replace(`.${field.name}`, "");
    } else if (field.type == "array") {
      let value: any = this.get(this.path.split("."), this.formValue) || [];
      let configValuesArray = [];
      value.forEach((rs) => {
        configValuesArray.push(
          map(field.parameters, (el) =>
            Object.assign({}, el, { defaultValue: rs[el.name] })
          )
        );
      });
      field.defaultValue = configValuesArray;
      field.defaultValue.forEach((el) =>
        this.toFormGroupFromArrForValidation(el)
      );
      this.path = this.path.replace(`.${field.name}`, "");
    } else {
      let value = this.get(this.path.split("."), this.formValue);
      if (value) field.defaultValue = value;
      if (some(field.validations || [], { name: "required", value: true })) {
        field.required = true;
      }
      if (field.required) {
        if (
          field.validations instanceof Array &&
          !some(field.validations || [], { name: "required", value: true })
        )
          field.validations.push({ name: "required", value: true });
        else field.validations = [{ name: "required", value: true }];
      }
      this.path = this.path.replace(`.${field.name}`, "");
    }
  }
}
