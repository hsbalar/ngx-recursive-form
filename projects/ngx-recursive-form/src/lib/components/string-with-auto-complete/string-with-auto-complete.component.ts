import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'ngx-string-with-auto-complete',
  templateUrl: './string-with-auto-complete.component.html',
  styleUrls: ['./string-with-auto-complete.component.css']
})
export class StringWithAutoCompleteComponent implements OnInit {

  @Input() control: AbstractControl;
  @Input() field: any;

  constructor() { }

  ngOnInit() {
  }

}
