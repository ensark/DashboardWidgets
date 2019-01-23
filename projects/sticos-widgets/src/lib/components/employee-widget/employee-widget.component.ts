import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import {
  SticosWidget,
  SticosWidgetMeta,
} from '../../decorators/sticos-widget.decorator';

import { WidgetService } from '../../services/widget.service';
import { EmployeeService } from '@sticos/apis/common';

@Component({
  selector: 'sw-employee-widget',
  templateUrl: './employee-widget.component.html',
  styleUrls: ['./employee-widget.component.scss'],
  providers: [EmployeeService],
})
@SticosWidget({
  widgetName: 'EmployeeWidget',
  headerName: 'Employee',
  options: {
    defaultHeight: 4,
    defaultWidth: 6,
    minHeight: 4,
    minWidth: 6,
  },
})
export class EmployeeWidgetComponent implements OnInit {
  @Input()
  mod: string;
  @Input()
  settings: any;
  @Input()
  widgetId: string;
  @Input()
  loadingTemplate: TemplateRef<any>;

  @SticosWidgetMeta(EmployeeWidgetComponent)
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
