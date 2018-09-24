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
  
  public form: FormGroup;
  public valueEditor: any;
  public current: number = 0;
  public formJson: any = [];
  public valueJson: any = {};
  public jsonString: string = '';
  public valueString: string = '';  
  public aceOptions = {
    printMargin: false,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
  };

  @ViewChild(AceEditorDirective)
  private editorDirective: AceEditorDirective;

  constructor(
    private http: HttpClient,
    public messageService: NzMessageService,
    public ngxForm: NgxRecursiveFormService) {}

  ngOnInit() {
    this.http.get('assets/sampleJsonConfig.json')
      .subscribe(formJson => {
        this.jsonString = JSON.stringify(formJson, null, 4);
      });
    this.http.get('assets/sampleValueConfig.json')
      .subscribe(valueJson => {
        this.valueString = JSON.stringify(valueJson, null, 4);
      });
  }

  jsonEditorClick() {
    this.current = 0;
  }

  formEditorClick() {
    if (this.hasEditorError() || this.hasValueEditorError()) {
      this.messageService.error("Invalid JSON");
      return;
    }
    this.current = 1;
    let text = this.editorDirective.editor.getValue();
    let valueText = this.valueEditor.renderer.canvas.outerText || {};    
    this.formJson = JSON.parse(text);
    this.valueJson = JSON.parse(valueText);
    this.jsonString = JSON.stringify(this.formJson, null, 4);
    this.valueString = JSON.stringify(this.valueJson, null, 4);    
    this.initForm();
  }

  formValueClick() {
    if (this.current == 1)
      this.current = 2;
  }

  initForm() {
    this.ngxForm.initNgxRecursiveForm(this.formJson, this.valueJson)
      .subscribe(res => {
        this.form = res.form;
        this.formJson = res.orderedFormJson;
      }, err => {
        this.messageService.error('Invalid JSON schema, please check name & type of control is required')
      });
  }

  private hasEditorError() {
    let annotations = this.editorDirective.editor.getSession().getAnnotations();
    for (var aid = 0, alen = annotations.length; aid < alen; ++aid) {
      if (annotations[aid].type === 'error') {
        return true;
      }
    }
    return false;
  }

  private hasValueEditorError() {
    let annotations = this.valueEditor.session.$annotations || [];    
    for (var aid = 0, alen = annotations.length; aid < alen; ++aid) {
      if (annotations[aid].type === 'error') {
        return true;
      }
    }
    return false;
  }

  editorRef($event) {
    this.valueEditor = $event;
  }
}
