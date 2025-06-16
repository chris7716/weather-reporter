import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  city = 'Colombo';
  searchControl = new FormControl('');
  suggestions: string[] = [];
  weatherData: any;
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (value && value.length >= 3) {
          this.fetchSuggestions(value);
        } else {
          this.suggestions = [];
        }
      });
    this.fetchWeather();
  }

  fetchSuggestions(query: string) {
    this.weatherService.getCitySuggestions(query).subscribe({
      next: (data) => {
        this.suggestions = data.map((loc) => loc.name);
      },
      error: () => {
        this.suggestions = [];
      }
    });
  }

  fetchWeather(selectedCity?: string) {
    this.loading = true;
    this.error = '';
    this.city = selectedCity || this.searchControl.value || 'Colombo';
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
        this.suggestions = [];
      },
      error: () => {
        this.error = 'Failed to fetch weather data.';
        this.loading = false;
      }
    });
  }
}
