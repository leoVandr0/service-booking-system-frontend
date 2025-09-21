import { InjectionToken } from '@angular/core';

export interface EnvConfig {
  apiUrl: string;
}

export const ENV = new InjectionToken<EnvConfig>('ENV');
