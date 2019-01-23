import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import {
  SticosWidget,
  SticosWidgetMeta,
} from '../../decorators/sticos-widget.decorator';
import { RssReaderService } from './services/rss-reader.service';
import { WidgetService } from '../../services/widget.service';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { IRssReaderSettings } from './models/rss-reader-input';
@Component({
  selector: 'sw-rss-reader-widget',
  templateUrl: './rss-reader-widget.component.html',
  styleUrls: ['./rss-reader-widget.component.scss'],
  providers: [RssReaderService],
})
@SticosWidget({
  widgetName: 'RssReaderWidget',
  headerName: 'RssReader',
  options: {
    defaultHeight: 4,
    defaultWidth: 4,
    minHeight: 4,
    minWidth: 4,
  },
})
export class RssReaderComponent implements OnInit {
  settingsProxy: IRssReaderSettings;
  popupVisible = false;
  rssReaderForm: FormGroup;
  @Input()
  mod: string;
  @Input()
  widgetId: string;
  @Input()
  loadingTemplate: TemplateRef<any>;
  @Input()
  settings: IRssReaderSettings;
  items: any;
  title = '';
  @SticosWidgetMeta(RssReaderComponent)
  sticosWidgetOptions: any;
  private _model: any;

  constructor(
    private rssReaderService: RssReaderService,
    private widgetService: WidgetService,
  ) {}
  ngOnInit() {
    if (!this.mod) {
      this.mod = 'default';
    }
    if (!this.settings) {
      this.onShowSettings();
    } else {
      this.getFeeds();
    }
  }

  saveSettings() {
    this.settingsProxy.settingsSkip = this.settingsProxy.url ? false : true;
    this.settings = this.settingsProxy;
    if (this._model) {
      this.getFeeds();
    }
    this.widgetService.settingsChanged({
      settings: this.settings,
      widgetId: this.widgetId,
    });
    this.popupVisible = false;
    this.settingsProxy = null;
  }

  onDeleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
  }

  onShowSettings() {
    this.settingsProxy = this.settings ? _.cloneDeep(this.settings) : {};
    this.popupVisible = true;
  }

  getFeeds(): void {
    this.rssReaderService.getFeeds(this.settings.url).subscribe(x => {
      this.items = x;
      this.title = this.items.title[0];
    });
  }

  get model() {
    return this._model;
  }

  set model(value) {
    this._model = value;
    this.settingsProxy = {
      url: this._model,
    };
  }
}
