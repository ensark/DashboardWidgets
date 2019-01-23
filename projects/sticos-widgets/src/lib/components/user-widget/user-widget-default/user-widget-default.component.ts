import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '@sticos/apis/common';

@Component({
  selector: 'sw-user-widget-default',
  templateUrl: './user-widget-default.component.html',
  styleUrls: ['./user-widget-default.component.scss'],
})
export class UserWidgetDefaultComponent implements OnInit {
  @Input()
  settings: any;
  @Input()
  user: IUser;

  constructor() {}

  ngOnInit() {}
}
