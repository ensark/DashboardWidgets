import { Pipe, PipeTransform } from '@angular/core';
import { VacationBankType } from '../../vacation-bank-widget/models/vacation-bank-input';
import { AbsenceType } from '../../absence-widget/models/absence-widget-input';

@Pipe({
  name: 'enumReader',
})
export class EnumReaderPipe implements PipeTransform {
  enums = {
    VacationBankType: VacationBankType,
    AbsenceType: AbsenceType,
  };

  transform(param: string, enumType: string): string {
    return this.enums[enumType][param];
  }
}
