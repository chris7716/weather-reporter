import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchHeaderComponent } from './search-header.component';
import { WeatherService } from '../weather.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('SearchHeaderComponent', () => {
  let component: SearchHeaderComponent;
  let fixture: ComponentFixture<SearchHeaderComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    // Create a spy with getCitySuggestions mocked to return an observable
    const spy = jasmine.createSpyObj('WeatherService', ['getCitySuggestions']);
    spy.getCitySuggestions.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [SearchHeaderComponent, ReactiveFormsModule],
      providers: [{ provide: WeatherService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHeaderComponent);
    component = fixture.componentInstance;
    weatherServiceSpy = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCitySuggestions and update suggestions', fakeAsync(() => {
    const mockSuggestions = [
      { name: 'Colombo' },
      { name: 'Cologne' },
      { name: 'Colorado' }
    ];

    // Override return value for this specific test
    weatherServiceSpy.getCitySuggestions.and.returnValue(of(mockSuggestions));

    component.searchControl.setValue('Colo');
    tick(300); // debounceTime
    fixture.detectChanges();

    expect(weatherServiceSpy.getCitySuggestions).toHaveBeenCalledWith('Colo');
    expect(component.suggestions.length).toBe(3);
    expect(component.suggestions[0].name).toBe('Colombo');
  }));

  it('should emit selected suggestion', () => {
    spyOn(component.searchChanged, 'emit');

    const suggestion = { name: 'Colombo' };
    component.selectSuggestion(suggestion);

    expect(component.searchChanged.emit).toHaveBeenCalledWith('Colombo');
    expect(component.searchControl.value).toBe('Colombo');
    expect(component.suggestions.length).toBe(0);
    expect(component.showDropdown).toBeFalse();
  });
});
