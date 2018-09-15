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

  form: FormGroup;
  model = model;

  constructor(public ngxForm: NgxRecursiveFormService) {}

  ngOnInit() {
    this.ngxForm.initNgxRecursiveForm(this.model, {})
      .subscribe(form => {
        this.form = form;
      }, err => {
        console.log(err);
      })
  }
}
