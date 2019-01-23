import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import {
  SticosWidget,
  SticosWidgetMeta,
} from '../../decorators/sticos-widget.decorator';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'sw-presence-widget',
  templateUrl: './presence-widget.component.html',
  styleUrls: ['./presence-widget.component.scss'],
})
@SticosWidget({
  widgetName: 'PresenceWidget',
  headerName: 'Presence',
  options: {
    defaultHeight: 4,
    defaultWidth: 3,
    minHeight: 4,
    minWidth: 3,
  },
})
export class PresenceWidgetComponent implements OnInit {
  @Input()
  mod: string;
  @Input()
  settings: any;
  @Input()
  widgetId: string;
  @Input()
  loadingTemplate: TemplateRef<any>;

  days = 365;
  @SticosWidgetMeta(PresenceWidgetComponent)
  sticosWidgetOptions: any;

  constructor(private widgetService: WidgetService) {}

  ngOnInit() {
    if (!this.mod) {
      this.mod = 'default';
    }

    this.settings = {
      days: this.days,
    };
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
}
