import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-async-select',
  templateUrl: './async-select.component.html',
  styleUrls: ['./async-select.component.css']
})
export class AsyncSelectComponent implements OnInit {

  @Input() control: AbstractControl;
  @Input() field: any;
  
  searchChange$ = new BehaviorSubject('');
  optionList = [];
  selectedUser;
  isLoading = false;

  constructor(private http: HttpClient) { }

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  ngOnInit(): void {
    const getRandomNameList = (name: string) => this.http.get(name.trim() ? `${this.field.apiUrl}?search=${name}` : `${this.field.apiUrl}`).pipe(map((res: any) => res.results)).pipe(map((list: any) => {
      return list.map(item => `${item.name.first} ${name}`);
    }));
    const optionList$: Observable<string[]> = this.searchChange$.asObservable().pipe(debounceTime(500)).pipe(switchMap(getRandomNameList));
    optionList$.subscribe(data => {
      this.optionList = data;
      this.isLoading = false;
    });
  }
}
