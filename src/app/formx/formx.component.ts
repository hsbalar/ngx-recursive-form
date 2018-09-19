import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxRecursiveFormService } from 'ngx-recursive-form';
import { HttpClient } from '@angular/common/http';

import { FormGroup } from '@angular/forms';

import { AceEditorDirective } from 'ng-ace-tern';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { AstTransformer } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-formx',
  templateUrl: './formx.component.html',
  styleUrls: ['./formx.component.css']
})
export class FormxComponent implements OnInit {
  
  form: FormGroup;
  current = 0;
  configJson: any = [];
  configString: string = '';

  @ViewChild(AceEditorDirective)
  private editorDirective: AceEditorDirective;

  aceOptions = {
    printMargin: false,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
  };

  showCode = false;

  constructor(
    private http: HttpClient,
    public messageService: NzMessageService,
    public ngxForm: NgxRecursiveFormService) {}

  ngOnInit() {
    this.http.get('assets/sampleJsonConfig.json')
      .subscribe(configJson => {
        this.configString = JSON.stringify(configJson, null, 4);
      });
  }

  jsonEditorClick() {
    this.current = 0;
  }

  formEditorClick() {
    if (this.hasEditorError()) {
      this.messageService.error("Invalid JSON");
      return;
    }
    this.current = 1;
    let text = this.editorDirective.editor.getValue();
    this.configJson = JSON.parse(text);
    this.configString = JSON.stringify(this.configJson, null, 4);
    this.initForm();
  }

  formValueClick() {
    if (this.current == 1)
      this.current = 2;
  }

  initForm() {
    this.ngxForm.initNgxRecursiveForm(this.configJson)
      .subscribe(form => {
        this.form = form;
      }, err => {
        this.messageService.error('Invalid JSON schema, please check name & type of control is required')
      });
  }

  private hasEditorError() {
    var annotations = this.editorDirective.editor.getSession().getAnnotations();
    for (var aid = 0, alen = annotations.length; aid < alen; ++aid) {
      if (annotations[aid].type === 'error') {
        return true;
      }
    }
    return false;
  }
}
