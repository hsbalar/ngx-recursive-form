import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormxComponent } from './formx/formx.component';
import { DocumentComponent } from './document/document.component';

import { AppRoutingModule } from './app.routing.module';

import { NgxRecursiveFormModule } from 'ngx-recursive-form';
import { registerLocaleData } from '@angular/common';

import { AceEditorModule } from "ng-ace-tern";

import en from '@angular/common/locales/en';
registerLocaleData(en);

import { NZ_I18N, en_US } from 'ng-zorro-antd';

@NgModule({
  declarations: [
    AppComponent,
    FormxComponent,
    DocumentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    AceEditorModule,
    HttpClientModule,
    AppRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    NgxRecursiveFormModule,
    BrowserAnimationsModule
  ],
  providers: [ { provide: NZ_I18N, useValue: en_US } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
