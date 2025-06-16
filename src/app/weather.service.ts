import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = environment.weatherApiKey!;
  private baseUrl = 'https://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/current.json?key=${this.apiKey}&q=${city}&aqi=no`
    );
  }

  getCitySuggestions(query: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/search.json?key=${this.apiKey}&q=${query}`
    );
  }

  getForecast(city: string): Observable<any> {
    const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=3&aqi=no&alerts=no`;
    return this.http.get<any>(url);
  }
}
