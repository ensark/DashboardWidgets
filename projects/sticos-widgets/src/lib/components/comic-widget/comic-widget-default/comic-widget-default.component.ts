import { Component, OnInit, Input } from '@angular/core';
import { IComicSettings } from '../models/comic-input';

@Component({
  selector: 'sw-comic-widget-default',
  templateUrl: './comic-widget-default.component.html',
  styleUrls: ['./comic-widget-default.component.scss'],
})
export class ComicWidgetDefaultComponent implements OnInit {
  loadingData: boolean;
  @Input()
  settings: IComicSettings;
  @Input()
  widgetId: string;

  constructor() {}

  ngOnInit() {}
}
