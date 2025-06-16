import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="forecastDays?.length" class="forecast-section">
      <h3>3-Day Forecast</h3>
      <div class="forecast-cards">
        <div *ngFor="let day of forecastDays" class="forecast-card">
          <p>{{ day.date | date: 'EEEE' }}</p>
          <img [src]="day.day.condition.icon" alt="icon" />
          <p>{{ day.day.avgtemp_c }}°</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .forecast-section {
      background: #fff;
      padding: 1rem 0.5rem;
      text-align: center;
    }

    .forecast-cards {
      display: flex;
      justify-content: center;
      gap: 1rem;
      padding: 1rem 0;
      flex-wrap: wrap;
    }

    .forecast-card {
      background: #f0f0f0;
      border-radius: 12px;
      padding: 1rem;
      min-width: 100px;
      text-align: center;
      flex-shrink: 0;
    }

    .forecast-card img {
      width: 48px;
      height: 48px;
    }
  `]
})
export class ForecastRowComponent {
  @Input() forecastDays: any[] = [];
}
