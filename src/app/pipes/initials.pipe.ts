import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    const words = value.split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    } else {
      const firstInitial = words[0].charAt(0);
      const lastInitial = words[words.length - 1].charAt(0);
      return `${firstInitial}${lastInitial}`.toUpperCase();
    }
  }
}
