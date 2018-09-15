import { Component } from '@angular/core';
import { NgxRecursiveFormService } from 'ngx-recursive-form';
import { FormGroup } from '@angular/forms';
import { model } from './model';
import { some, clone, includes, map } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  form: FormGroup;
  model = model;

  path: string;

  result: any = [];

  config: any;

  types: any = [
    'string',
    'array',
    'password',
    'textarea',
    'stringWithAutoComplete',
    'textareaWithAutoComplete',
    'number',
    'select',
    'async-select',
    'checkbox',
    'radio',
    'date',
    'dateRange',
    'boolean',
    'object'
  ]

  constructor(public ngxForm: NgxRecursiveFormService) {}

  ngOnInit() {
    this.config = {test: 'ccc', advanced: { loadUser: 'zz' }, general: { connection: { language: [ { languageName: 'x', experience: 11}]}}};

    model.forEach(field => {
      this.path = field.name;
      this.validateJson(field);
    });
    this.form = this.ngxForm.toFormGroup(model);
    console.log(model);
    
  }

  toFormGroupFromArr(arr) {
    arr.reduce((acc, cur) => {
      this.path = `${this.path}.${cur.name}`;
      return this.validateJson(cur);
    }, {});
  }

  submitForm() {
    console.log(model);
  }

  get = (p, o) =>
    p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);

  validateJson(field: any) {

    if (!includes(this.types, field.type) || !field.hasOwnProperty('name')) {
      return;
    }

    if (field.type == 'object' || field.type == 'checkbox') {
      this.toFormGroupFromArr(field.parameters);
      this.path = this.path.replace(`.${field.name}`, '');
    } else if (field.type == 'array') {
      let value: any = this.get(this.path.split('.'), this.config) || [];
      let fieldParameters: any = clone(field.parameters);
      let configValuesArray = [];

      value.forEach((rs) => {
        configValuesArray.push(map(field.parameters, el => Object.assign({}, el, { defaultValue: rs[el.name] })));
      });
      
      field.defaultValue = configValuesArray;
      field.defaultValue.forEach((el) => this.toFormGroupFromArr(el));

      this.path = this.path.replace(`.${field.name}`, '');
    } else {
      let value = this.get(this.path.split('.'), this.config);       
      if (value) field.defaultValue = value;
      if (some(field.validations || [], { name: 'required', value: true })) { field.required = true; };
      this.path = this.path.replace(`.${field.name}`, '');
    }
  }

  
}
