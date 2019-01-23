import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'clearHtmlTags' })
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: string): string {
    return value ? String(value).replace(/<[^>]+/gm, '') : '';
  }
}
