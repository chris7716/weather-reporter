import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { SearchHeaderComponent } from '../search-header/search-header.component';
import { ForecastRowComponent } from '../forecast-row/forecast-row.component';

@Component({
  selector: 'app-weather',
  imports: [
    CommonModule,
    SearchHeaderComponent,
    ForecastRowComponent
  ],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  forecastDays: any[] = [];
  city: string = 'Colombo';
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeather(this.city);
  }

  fetchSuggestions(city: string): void {
    this.city = city;
    this.fetchWeather(city);
  }

  fetchWeather(cityQuery: string): void {
    this.loading = true;
    this.error = '';
    this.weatherData = null;
    this.forecastDays = [];

    this.weatherService.getForecast(cityQuery).subscribe({
      next: (data) => {
        this.weatherData = data.current;
        this.forecastDays = data.forecast.forecastday;
        this.city = data.location.name;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching weather:', err);
        this.error = 'Failed to load weather data.';
        this.loading = false;
      },
    });
  }
}
