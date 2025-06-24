import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { environment } from '../environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  const dummyCity = 'Colombo';
  const apiKey = environment.weatherApiKey!;
  const baseUrl = 'https://api.weatherapi.com/v1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch current weather', () => {
    const mockResponse = { location: { name: dummyCity }, current: {} };

    service.getWeather(dummyCity).subscribe((data) => {
      expect(data.location.name).toBe(dummyCity);
    });

    const req = httpMock.expectOne(`${baseUrl}/current.json?key=${apiKey}&q=${dummyCity}&aqi=no`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch city suggestions', () => {
    const query = 'Colo';
    const mockSuggestions = [{ name: 'Colombo' }, { name: 'Colorado' }];

    service.getCitySuggestions(query).subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data[0].name).toContain('Colo');
    });

    const req = httpMock.expectOne(`${baseUrl}/search.json?key=${apiKey}&q=${query}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSuggestions);
  });

  it('should fetch forecast data', () => {
    const mockForecast = { forecast: { forecastday: [] } };

    service.getForecast(dummyCity).subscribe((data) => {
      expect(data.forecast).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `${baseUrl}/forecast.json?key=${apiKey}&q=${dummyCity}&days=3&aqi=no&alerts=no`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockForecast);
  });
});
