import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import {
  SticosWidget,
  SticosWidgetMeta,
} from '../../decorators/sticos-widget.decorator';
import { WidgetService } from '../../services/widget.service';
import { IChartSerie } from './models/absence-widget-input';
import { AbsenceWidgetService } from './services/absence-widget.service';

@Component({
  selector: 'sw-absence-widget',
  templateUrl: './absence-widget.component.html',
  styleUrls: ['./absence-widget.component.scss'],
})
@SticosWidget({
  widgetName: 'AbsenceWidget',
  headerName: 'Absence',
  options: {
    defaultHeight: 8,
    defaultWidth: 3,
    minHeight: 8,
    minWidth: 3,
  },
})
export class AbsenceWidgetComponent implements OnInit {
  @Input()
  mod: string;
  @Input()
  widgetId: string;
  @Input()
  loadingTemplate: TemplateRef<any>;

  absence: IChartSerie;
  yearsLink: string[] = [];
  selectedYear = '';

  @SticosWidgetMeta(AbsenceWidgetComponent)
  sticosWidgetOptions: any;

  constructor(
    private widgetService: WidgetService,
    private absenceWidgetService: AbsenceWidgetService,
  ) {}

  ngOnInit() {
    if (!this.mod) {
      this.mod = 'default';
    }

    this.yearsLink = this.absenceWidgetService.getYears();
    this.selectedYear = this.yearsLink[0];

    this.onSelectYear(this.selectedYear);
  }

  onDeleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
  }

  onSelectYear(year) {
    this.absenceWidgetService.getAbsencesData(year).subscribe(x => {
      this.absence = x;
    });
    this.selectedYear = year;
  }
}
