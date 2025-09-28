import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'theme-selector',
  imports: [MatIconModule, MatMenuModule, MatIconButton, MatTooltip],
  templateUrl: './theme-selector.html',
  styleUrl: './theme-selector.scss',
})
export class ThemeSelector {
  themes = [
    {
      theme: 'dark-mode',
      label: 'Dark mode',
      icon: 'dark_mode',
    },
    { theme: 'light-mode', label: 'Light mode', icon: 'light_mode' },
    { theme: 'system', label: 'Adaptar ao sistema', icon: 'settings_suggest' },
  ];

  choose(theme: string) {
    document.documentElement.classList.remove(
      ...this.themes.filter((t) => t.theme !== 'system').map((t) => t.theme)
    );

    if (theme === 'system') {
      return;
    }

    document.documentElement.classList.add(theme);
  }
}
