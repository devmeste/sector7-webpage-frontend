import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHidePlaceholderOnInput]',
  standalone: true
})
export class HidePlaceholderOnInputDirective {

  private originalPlaceholder: string;

  constructor(private el: ElementRef) {
    this.originalPlaceholder = this.el.nativeElement.placeholder;
  }

  @HostListener('focus') onFocus() {
    this.el.nativeElement.placeholder = '';
  }

  @HostListener('blur') onBlur() {
    if (!this.el.nativeElement.value) {
      this.el.nativeElement.placeholder = this.originalPlaceholder;
    }
  }

}
