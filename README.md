# Ngx Recursive Form
Angular recursive form at any level based on your json input. [`Demo`](http://www.hiteshbalar.com/ngx-recursive-form/formx)

<a><img src="https://github.com/hsbalar/ngx-recursive-form/blob/master/src/assets/logo.png" height="150" title="image" alt="image"></a>

### Install

> Note: Ngx recursive form supports only [ng-zorro-antd](https://ng.ant.design/docs/introduce/en) for now. So, you need to install it beforehand.

```bash
$ npm install ng-zorro-antd
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
public formJson: any;
constructor(public ngxFormService: NgxRecursiveFormService) {}

ngOnInit() {
  this.ngxFormService.initNgxRecursiveForm(this.formJson) // JSON schema as first parameter, Default JSON value as second parameter (optional)
    .subscribe(res => {
      this.form = res.form;
      this.formJson = res.orderedFormJson;
    }, err => {
      console.log(err);
    });
}
```

### Create <ngx-recursive-form> tag in your component.html file:
```html
<form nz-form [formGroup]="form" (ngSubmit)="submit()" *ngIf="form">
  <ngx-recursive-form [form]="form" [formJson]="formJson"></ngx-recursive-form>
  <button nz-button type="submit">Submit</button>
</form>
```

## License

MIT
