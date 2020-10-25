import { NgModule } from "@angular/core";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { NgxRecursiveFormComponent } from "./ngx-recursive-form.component";
import { NgxRecursiveFieldComponent } from "./components/ngx-recursive-field/ngx-recursive-field.component";
import { NgxRecursiveFormService } from "./ngx-recursive-form.service";

import { DateComponent } from "./components/date/date.component";
import { RadioComponent } from "./components/radio/radio.component";
import { NumberComponent } from "./components/number/number.component";
import { SelectComponent } from "./components/select/select.component";
import { StringComponent } from "./components/string/string.component";
import { BooleanComponent } from "./components/boolean/boolean.component";
import { TextareaComponent } from "./components/textarea/textarea.component";
import { PasswordComponent } from "./components/password/password.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { DateRangeComponent } from "./components/date-range/date-range.component";
import { AsyncSelectComponent } from "./components/async-select/async-select.component";
import { StringWithAutoCompleteComponent } from "./components/string-with-auto-complete/string-with-auto-complete.component";
import { TextareaWithAutoCompleteComponent } from "./components/textarea-with-auto-complete/textarea-with-auto-complete.component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DateComponent,
    RadioComponent,
    NumberComponent,
    SelectComponent,
    StringComponent,
    BooleanComponent,
    TextareaComponent,
    CheckboxComponent,
    PasswordComponent,
    DateRangeComponent,
    AsyncSelectComponent,
    NgxRecursiveFormComponent,
    NgxRecursiveFieldComponent,
    StringWithAutoCompleteComponent,
    TextareaWithAutoCompleteComponent,
  ],
  exports: [NgxRecursiveFormComponent, NgxRecursiveFieldComponent],
  providers: [NgxRecursiveFormService],
})
export class NgxRecursiveFormModule {}
