import { Component, inject, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { Theme } from './theme.service';

@Component({
  selector: 'theme-selector',
  imports: [MatIconModule, MatMenuModule, MatIconButton, MatTooltip],
  templateUrl: './theme-selector.html',
  styleUrl: './theme-selector.scss',
})
export class ThemeSelector implements OnInit {
  themeService = inject(Theme);

  ngOnInit(): void {
    this.themeService.init();
  }

  choose(theme: string) {
    this.themeService.change(theme);
  }
}
