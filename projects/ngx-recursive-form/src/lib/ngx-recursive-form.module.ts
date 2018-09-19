import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxRecursiveFormComponent } from './ngx-recursive-form.component';
import { NgxRecursiveFormService } from './ngx-recursive-form.service';

import { AsyncSelectComponent } from './components/async-select/async-select.component';
import { NumberComponent } from './components/number/number.component';
import { SelectComponent } from './components/select/select.component';
import { StringComponent } from './components/string/string.component';
import { StringWithAutoCompleteComponent } from './components/string-with-auto-complete/string-with-auto-complete.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { RadioComponent } from './components/radio/radio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { BooleanComponent } from './components/boolean/boolean.component';
import { DateComponent } from './components/date/date.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { PasswordComponent } from './components/password/password.component';
import { TextareaWithAutoCompleteComponent } from './components/textarea-with-auto-complete/textarea-with-auto-complete.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
  ],
  declarations: [NgxRecursiveFormComponent, AsyncSelectComponent, NumberComponent, SelectComponent, StringComponent, StringWithAutoCompleteComponent, TextareaComponent, RadioComponent, CheckboxComponent, BooleanComponent, DateComponent, DateRangeComponent, PasswordComponent, TextareaWithAutoCompleteComponent],
  exports: [NgxRecursiveFormComponent],
  providers: [NgxRecursiveFormService]
})
export class NgxRecursiveFormModule { }
