import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from '../weather.service';
import { SearchHeaderComponent } from '../search-header/search-header.component';
import { ForecastRowComponent } from '../forecast-row/forecast-row.component';
import { of, throwError } from 'rxjs';

describe('WeatherComponent', () => {
  let fixture: ComponentFixture<WeatherComponent>;
  let component: WeatherComponent;
  let weatherService: WeatherService;

  const mockData = {
    location: { name: 'Colombo' },
    current: {
      temp_c: 28,
      humidity: 70,
      wind_kph: 18,
      uv: 6,
      condition: {
        text: 'Sunny',
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
      }
    },
    forecast: {
      forecastday: [
        {
          date: '2025-06-25',
          day: {
            avgtemp_c: 29,
            condition: {
              text: 'Clear',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
            }
          }
        }
      ]
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        WeatherComponent,
        SearchHeaderComponent,
        ForecastRowComponent
      ],
      // WeatherService will be provided automatically because WeatherComponent injects it.
      // But we declare it explicitly here for clarity/testing
      providers: [WeatherService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch weather data on init', () => {
    spyOn(weatherService, 'getForecast').and.returnValue(of(mockData));
    component.ngOnInit();
    expect(weatherService.getForecast).toHaveBeenCalledWith('Colombo');
  });

  it('should handle error gracefully', () => {
    spyOn(weatherService, 'getForecast').and.returnValue(throwError(() => new Error('API error')));
    component.fetchWeather('InvalidCity');
    expect(component.error).toContain('Failed to load weather data.');
  });
});
