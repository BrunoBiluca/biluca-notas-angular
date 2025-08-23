import { InjectionToken } from '@angular/core';

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AuthConfig');

export interface AuthConfig {
  redirectAfterLogin: string;
}
