import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import {
  SticosWidget,
  SticosWidgetMeta,
} from '../../decorators/sticos-widget.decorator';
import { WidgetService } from '../../services/widget.service';
import { NewsService, News } from '@sticos/apis/common';

@Component({
  selector: 'sw-news-widget',
  templateUrl: './news-widget.component.html',
  styleUrls: ['./news-widget.component.scss'],
  providers: [NewsService],
})
@SticosWidget({
  widgetName: 'NewsWidget',
  headerName: 'News',
  options: {
    defaultHeight: 4,
    defaultWidth: 7,
    minHeight: 4,
    minWidth: 7,
  },
})
export class NewsWidgetComponent implements OnInit {
  @Input()
  mod: string;
  @Input()
  widgetId: string;
  @Input()
  loadingTemplate: TemplateRef<any>;

  @SticosWidgetMeta(NewsWidgetComponent)
  sticosWidgetOptions: any;

  constructor(private widgetService: WidgetService) {}

  ngOnInit() {
    if (!this.mod) {
      this.mod = 'default';
    }
  }

  onDeleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
  }
}
