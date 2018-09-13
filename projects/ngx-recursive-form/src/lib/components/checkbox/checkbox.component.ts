import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'ngx-checkbox-group',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() control: AbstractControl;
  @Input() field: any;

  constructor() { }

  ngOnInit() {
  }

}
