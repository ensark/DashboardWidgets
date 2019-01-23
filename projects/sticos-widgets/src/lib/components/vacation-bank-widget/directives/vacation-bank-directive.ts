import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  DoCheck,
} from '@angular/core';
import { DxBarGaugeComponent } from 'devextreme-angular';

@Directive({
  selector: '[swVacationBank]',
})
export class VacationBankDirective implements AfterViewChecked {
  @Input() gauge: DxBarGaugeComponent;
  constructor() {}

  ngAfterViewChecked(): void {
    if (this.gauge) {
      this.gauge.instance.render();
    }
  }
}
