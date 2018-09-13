import { Component } from '@angular/core';
import { NgxRecursiveFormService } from 'ngx-recursive-form';
import { FormGroup } from '@angular/forms';
import { model } from './model';
import * as _ from 'lodash';

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
    this.config = { test: 'ccc', advanced: { loadUser: 'zz' }};
    
    model.forEach(field => {
      this.path = field.name || '';
      this.validateJson(field);
    });
    console.log(model);
    this.form = this.ngxForm.toFormGroup(model);

  }

  toFormGroupFromArr(arr) {
    arr.reduce((acc, cur) => {
      this.path = `${this.path}.${cur.name}`;
      return this.validateJson(cur);
    }, {});
  }

  submitForm() {
    
    // console.log(this.form.value); 
  }

  get = (p, o) =>
    p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);

  validateJson(field: any) {

    if (!_.includes(this.types, field.type) || !field.hasOwnProperty('name')) {
      console.log(field);
      return;
    }    

    if (field.type == 'object' || field.type == 'checkbox') {
      this.toFormGroupFromArr(field.parameters);
      this.path = this.path.replace(`.${field.name}`, '');
    } else if (field.type == 'array') {

      let arrayPath = this.path.split('.');
      let value: any = this.get(arrayPath, this.config) || [];
      let fieldParameters: any = _.clone(field.parameters);

      let configValuesArray = [];
      value.forEach((rs) => {
        let formedArray = [];
        fieldParameters.forEach((el) => {
          let rowEle = _.clone(el);
          rowEle.defaultValue = rs[el.name];
          formedArray.push(rowEle);
        });
        configValuesArray.push(formedArray);
      });
      
      field.defaultValue = configValuesArray;
      
      field.defaultValue.forEach((el, index) => {
        this.toFormGroupFromArr(el);
      });

      this.path = this.path.replace(`.${field.name}`, '');
    } else {
      let arrayPath = this.path.split('.');
      let value = this.get(arrayPath, this.config);       
      if (value) field.defaultValue = value;
      this.path = this.path.replace(`.${field.name}`, '');
    }
  }

  
}
