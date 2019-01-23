import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import {
  SticosWidget,
  SticosWidgetMeta,
} from '../../decorators/sticos-widget.decorator';
import { ComicWidgetService } from './services/comic-widget.service';
import { WidgetService } from '../../services/widget.service';
import { IComicSettings } from './models/comic-input';

@Component({
  selector: 'sw-comic-widget',
  templateUrl: './comic-widget.component.html',
  styleUrls: ['./comic-widget.component.scss'],
  providers: [ComicWidgetService],
})
@SticosWidget({
  widgetName: 'ComicWidget',
  headerName: 'Comic',
  options: {
    defaultHeight: 4,
    defaultWidth: 6,
    minHeight: 4,
    minWidth: 6,
  },
})
export class ComicWidgetComponent implements OnInit {
  @Input()
  mod: string;
  @Input()
  settings: IComicSettings;
  @Input()
  widgetId: string;
  @Input()
  loadingTemplate: TemplateRef<any>;

  @SticosWidgetMeta(ComicWidgetComponent)
  sticosWidgetOptions: any;

  constructor(
    private comicService: ComicWidgetService,
    private widgetService: WidgetService,
  ) {}

  ngOnInit() {
    this.getComic();
    if (!this.mod) {
      this.mod = 'default';
    }
  }

  saveSettings() {
    this.widgetService.settingsChanged({
      settings: this.settings,
      widgetId: this.widgetId,
    });
  }

  onDeleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
  }

  getComic() {
    this.comicService.getComic().subscribe(x => {
      this.settings = {
        image: x,
      };
    });
  }
}
