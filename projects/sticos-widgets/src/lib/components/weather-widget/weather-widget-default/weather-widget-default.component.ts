import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IWeatherSettings } from '../models/weather-input';
import { WeatherService } from '../services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sw-weather-widget-default',
  templateUrl: './weather-widget-default.component.html',
  styleUrls: ['./weather-widget-default.component.scss'],
})
export class WeatherWidgetDefaultComponent
  implements OnInit, OnChanges, OnDestroy {
  subscription: Subscription;
  weatherData: any;
  loadingData: boolean;
  @Input()
  settings: IWeatherSettings;
  @Input()
  widgetId: string;
  @Output()
  settingsChanged = new EventEmitter<IWeatherSettings>();
  @Output()
  deleteWidget = new EventEmitter<string>();

  constructor(private weatherService: WeatherService) {
    this.subscription = this.weatherService.sync.subscribe(x => {
      this.sync();
    });
  }

  ngOnInit() {
    if (this.settings.location) {
      this.fetchWeatherData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.settings) {
      this.sync();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchWeatherData() {
    const location = this.settings.location;
    this.loadingData = true;
    this.weatherService
      .getWeather(location.lat, location.lng)
      .subscribe(data => {
        this.weatherData = data;
        this.loadingData = false;
      });
  }

  get weatherIcon() {
    return `https://openweathermap.org/img/w/${
      this.weatherData.weather[0].icon
    }.png`;
  }

  sync() {
    this.fetchWeatherData();
  }
}
