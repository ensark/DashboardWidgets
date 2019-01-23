import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer,
  Renderer2,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { DxBarGaugeComponent } from 'devextreme-angular';
import { IChart, IChartSerie } from '../models/vacation-bank-input';

@Component({
  selector: 'sw-vacation-bank-widget-default',
  templateUrl: './vacation-bank-widget-default.component.html',
  styleUrls: ['./vacation-bank-widget-default.component.scss'],
})
export class VacationBankWidgetDefaultComponent implements OnInit {
  totalDays = 0;
  currentValue = 0;
  @Input()
  widgetId: string;
  @Input()
  loadingData;
  @Input()
  set vacationBank(value: IChartSerie) {
    this.totalDays = value.values[0].value;
    this.currentValue = value.values[1].value + value.values[3].value;
  }
  @ViewChild(DxBarGaugeComponent) gauge: DxBarGaugeComponent;

  constructor() {}

  ngOnInit() {}
}
