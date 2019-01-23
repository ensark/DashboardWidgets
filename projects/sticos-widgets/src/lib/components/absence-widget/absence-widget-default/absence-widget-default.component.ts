import { Component, OnInit, Input } from '@angular/core';
import { EnumReaderPipe } from '../../widget/pipes/enum-reader.pipe';

@Component({
  selector: 'sw-absence-widget-default',
  templateUrl: './absence-widget-default.component.html',
  styleUrls: ['./absence-widget-default.component.scss'],
  providers: [EnumReaderPipe],
})
export class AbsenceWidgetDefaultComponent implements OnInit {
  @Input() absence;

  constructor() {}

  customizeSeries(valueFromNameField: string) {
    if (valueFromNameField === '1') {
      return { type: 'bar', color: '#008fbe', cornerRadius: 5, barWidth: 45 };
    }
    if (valueFromNameField === '2') {
      return { type: 'bar', color: '#f7a700', cornerRadius: 5, barWidth: 45 };
    }
    if (valueFromNameField === '3') {
      return { type: 'bar', color: '#003b5c', cornerRadius: 5, barWidth: 45 };
    }
    if (valueFromNameField === '4') {
      return { type: 'bar', color: '#39a828', cornerRadius: 5, barWidth: 45 };
    }
  }

  customizeTooltip(args: any) {
    return {
      html:
        '<h6>' +
        new EnumReaderPipe().transform(args.argumentText, 'AbsenceType') +
        ' - ' +
        args.valueText +
        '</h6>',
    };
  }

  ngOnInit() {}
}
