import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'substringOfText' })
export class SubstringOfTextPipe implements PipeTransform {
  transform(value: string, numberOfCharacters: number): string {
    return value.substring(0, numberOfCharacters);
  }
}
