import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter([{ path: '', component: WeatherComponent }]),
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
