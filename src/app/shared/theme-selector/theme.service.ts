import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  themes = [
    {
      theme: 'dark-mode',
      label: 'Dark mode',
      icon: 'dark_mode',
    },
    { theme: 'light-mode', label: 'Light mode', icon: 'light_mode' },
    { theme: 'system', label: 'Adaptar ao sistema', icon: 'settings_suggest' },
  ];

  readonly onThemeChange = new EventEmitter();

  init() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.change(theme);
    }
  }

  change(theme: string) {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove(
      ...this.themes.filter((t) => t.theme !== 'system').map((t) => t.theme)
    );

    setTimeout(() => {
      this.onThemeChange.emit();
    }, 10);
    if (theme === 'system') {
      return;
    }

    document.documentElement.classList.add(theme);
  }
}
