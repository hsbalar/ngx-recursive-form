import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'ngx-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css']
})
export class DateRangeComponent implements OnInit {
  
  @Input() control: AbstractControl;
  @Input() field: any;

  constructor() { }

  ngOnInit() {
  }

}
