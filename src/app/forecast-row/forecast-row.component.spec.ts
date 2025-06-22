import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastRowComponent } from './forecast-row.component';

describe('ForecastRowComponent', () => {
  let component: ForecastRowComponent;
  let fixture: ComponentFixture<ForecastRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
