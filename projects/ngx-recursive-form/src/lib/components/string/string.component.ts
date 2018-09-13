import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'ngx-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.css']
})
export class StringComponent implements OnInit {

  @Input() control: AbstractControl;
  @Input() field: any;

  constructor() { }

  ngOnInit() {
  }

}
