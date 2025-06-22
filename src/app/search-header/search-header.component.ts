import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { WeatherService } from '../weather.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="search-wrapper">
      <input
        [formControl]="searchControl"
        placeholder="🔍 Enter city"
        class="search-bar"
        (focus)="showDropdown = true"
        (blur)="hideDropdown()"
      />

      <ul *ngIf="showDropdown && suggestions.length" class="suggestions-list">
        <li *ngFor="let suggestion of suggestions" (mousedown)="selectSuggestion(suggestion)">
          {{ suggestion.name }}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .search-wrapper {
      position: relative;
    }

    .search-bar {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border: none;
      border-radius: 8px;
      box-sizing: border-box;
    }

    .suggestions-list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      list-style: none;
      padding: 0;
      margin: 0.25rem 0 0;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 10;
    }

    .suggestions-list li {
      padding: 0.75rem;
      cursor: pointer;
    }

    .suggestions-list li:hover {
      background-color: #f1f1f1;
    }
  `]
})
export class SearchHeaderComponent {
  searchControl = new FormControl('');
  suggestions: { name: string }[] = [];
  showDropdown = false;

  @Output() searchChanged = new EventEmitter<string>();

  constructor(private weatherService: WeatherService) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) =>
          query && query.length >= 3
            ? this.weatherService.getCitySuggestions(query)
            : of([])
        )
      )
      .subscribe((data) => {
        this.suggestions = data || [];
      });
  }

  selectSuggestion(suggestion: { name: string }) {
    this.searchChanged.emit(suggestion.name);
    this.searchControl.setValue(suggestion.name);
    this.suggestions = [];
    this.showDropdown = false;
  }

  hideDropdown() {
    // Timeout allows click to register before hiding
    setTimeout(() => (this.showDropdown = false), 150);
  }
}
