import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sw-rss-reader-widget-default',
  templateUrl: './rss-reader-widget-default.component.html',
  styleUrls: ['./rss-reader-widget-default.component.scss'],
})
export class RssReaderWidgetDefaultComponent implements OnInit {
  @Input()
  settings: any;
  @Input()
  widgetId: string;
  @Output()
  deleteWidget = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}
}
