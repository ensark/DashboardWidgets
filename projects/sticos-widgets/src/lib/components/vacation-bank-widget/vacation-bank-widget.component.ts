import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import {
  SticosWidget,
  SticosWidgetMeta,
} from '../../decorators/sticos-widget.decorator';

import { WidgetService } from '../../services/widget.service';
import { VacationBankType, IChartSerie } from './models/vacation-bank-input';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VacationBankWidgetService } from './services/vacation-bank-widget.service';

@Component({
  selector: 'sw-vacation-bank-widget',
  templateUrl: './vacation-bank-widget.component.html',
  styleUrls: ['./vacation-bank-widget.component.scss'],
  providers: [VacationBankWidgetService],
})
@SticosWidget({
  widgetName: 'VacationBankWidget',
  headerName: 'Feriebank',
  options: {
    defaultHeight: 5,
    defaultWidth: 5,
    minHeight: 5,
    minWidth: 5,
  },
})
export class VacationBankWidgetComponent implements OnInit {
  selectedYear = '';
  years: string[] = [];

  vacationBank: IChartSerie;
  @Input()
  mod: string;
  @Input()
  settings: any;
  @Input()
  widgetId: string;
  @Input()
  loadingTemplate: TemplateRef<any>;
  loadingData = false;

  @SticosWidgetMeta(VacationBankWidgetComponent)
  sticosWidgetOptions: any;

  constructor(
    private widgetService: WidgetService,
    private vacationBankService: VacationBankWidgetService,
  ) {}

  ngOnInit() {
    if (!this.mod) {
      this.mod = 'default';
    }

    this.years = this.vacationBankService.getYears();
    this.selectedYear = this.years[0];
    this.onSelectYear(this.selectedYear);
  }

  onSelectYear(value) {
    this.loadingData = true;
    this.vacationBankService.getVacationBank(value).subscribe(x => {
      this.vacationBank = x;
      this.loadingData = false;
    });
    this.selectedYear = value;
  }

  onDeleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
  }
}
