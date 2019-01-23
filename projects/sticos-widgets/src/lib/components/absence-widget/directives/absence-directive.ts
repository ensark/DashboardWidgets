import { Directive, Input, AfterViewChecked } from '@angular/core';
import { DxChartComponent } from 'devextreme-angular';

@Directive({
  selector: '[swAbsence]',
})
export class AbsenceDirective implements AfterViewChecked {
  @Input() chart: DxChartComponent;

  constructor() {}

  ngAfterViewChecked(): void {
    if (this.chart) {
      this.chart.instance.render();
    }
  }
}
