import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'ngx-textarea-with-auto-complete',
  templateUrl: './textarea-with-auto-complete.component.html',
  styleUrls: ['./textarea-with-auto-complete.component.css']
})
export class TextareaWithAutoCompleteComponent implements OnInit {

  @Input() control: AbstractControl;
  @Input() field: any;

  constructor() { }

  ngOnInit() {
  }

}
