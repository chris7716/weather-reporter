import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  // private apiKey = '6867153f0eb4452fada103517251506'; // replace with your actual key
  private apiKey = environment.weatherApiKey;
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
}
