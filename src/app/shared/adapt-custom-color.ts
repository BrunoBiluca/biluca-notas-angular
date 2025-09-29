import {
  Directive,
  DOCUMENT,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  calculateLuminanceHex,
  calculateLuminanceRGB,
  invertHex,
  parseRGB,
} from '@common/colors-functions';
import { Theme } from '@app/shared/theme-selector/theme.service';

@Directive({
  selector: '[adaptCustomColor]',
})
export class AdaptCustomColor implements OnInit, OnChanges {
  @Input('adaptCustomColor') adaptCustomColor: string | undefined;
  el = inject(ElementRef);
  document = inject(DOCUMENT);
  theme = inject(Theme);

  ngOnInit(): void {
    this.applyColorClass();
    this.applyBgColor();
    this.theme.onThemeChange.subscribe(() => {
      this.applyColorClass();
      this.applyBgColor();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adaptCustomColor']) {
      this.applyColorClass();
      this.applyBgColor();
    }
  }

  applyColorClass() {
    if (!this.adaptCustomColor) {
      return;
    }
    this.el.nativeElement.classList.remove('bg-light', 'bg-dark');
    this.el.nativeElement.classList.add(
      calculateLuminanceHex(this.adaptCustomColor) > 0.5
        ? 'bg-light'
        : 'bg-dark'
    );
  }

  applyBgColor() {
    const computedStyle = window.getComputedStyle(this.document.body);
    const surfaceColor = computedStyle.backgroundColor;

    const bgColor =
      this.adaptCustomColor === null || this.adaptCustomColor === undefined
        ? surfaceColor
        : this.adaptCustomColor;

    const { r, g, b } = parseRGB(surfaceColor);
    const surfaceColorLum = calculateLuminanceRGB(r, g, b);
    const bgColorLum = calculateLuminanceHex(bgColor);
    const borderColor =
      Math.abs(surfaceColorLum - bgColorLum) < 0.05
        ? invertHex(bgColor)
        : surfaceColor;

    console.log(
      'BG: ' + bgColor + ' diff: ' + Math.abs(surfaceColorLum - bgColorLum)
    );
    this.el.nativeElement.style =
      'background-color: ' + bgColor + '; border: 1px solid ' + borderColor;
  }
}
