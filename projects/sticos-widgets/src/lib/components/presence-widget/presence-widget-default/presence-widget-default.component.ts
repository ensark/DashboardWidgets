import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sw-presence-widget-default',
  templateUrl: './presence-widget-default.component.html',
  styleUrls: ['./presence-widget-default.component.scss'],
})
export class PresenceWidgetDefaultComponent implements OnInit {
  @Input()
  settings: any;
  @Input()
  widgetId: string;

  constructor() {}

  ngOnInit() {}
}
