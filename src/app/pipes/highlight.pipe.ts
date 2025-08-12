import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true
})

export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(name: string, searchTerm: string) {
    if (!searchTerm || !name) {
      return name;
    }

    // Use a regular expression for a global, case-insensitive search.
    const regex = new RegExp(searchTerm, 'gi');
    const highlightedText = name.replace(
      regex,
      (match) => `<mark>${match}</mark>`
    );

    // Tell Angular this HTML is safe to render.
    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}
