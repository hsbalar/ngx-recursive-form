# Ngx Recursive Form
Angular recursive form at any level based on your json input.

<a><img src="https://github.com/hsbalar/ngx-recursive-form/blob/master/src/assets/logo.png" height="150" title="image" alt="image"></a>

### Install

```bash
$ npm install ngx-recursive-form --save
```

### Import the NgxRecursiveFormModule:
```js
import { NgxRecursiveFormModule } from 'ngx-recursive-form';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [NgxRecursiveFormModule, ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Initialize form in your component.ts file:
```js
import { NgxRecursiveFormService } from 'ngx-recursive-form';
import { FormGroup } from '@angular/forms';

public form: FormGroup;
constructor(public ngxFormService: NgxRecursiveFormService) {}

ngOnInit() {
  this.ngxFormService.initNgxRecursiveForm(this.configJson) // JSON schema as first parameter, Default JSON value as second parameter (optional)
    .subscribe(form => {
      this.form = form;
    }, err => {
      console.log(err);
    });
}
```

### Create <ngx-recursive-form> tag in your component.html file:
```html
<form nz-form [formGroup]="form" (ngSubmit)="submit()">
  <div *ngFor="let field of configJson">
    <ngx-recursive-form [field]="field" [abstractControl]="form.get(field.name)"></ngx-recursive-form>
  </div>
  <button nz-button type="submit">Submit</button>
</form>
```

### Ngx recursive form supports only [ng-zorro-antd](https://ng.ant.design/docs/introduce/en) for now
```bash
$ npm install ng-zorro-antd
```
