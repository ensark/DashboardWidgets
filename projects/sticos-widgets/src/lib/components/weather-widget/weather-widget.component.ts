import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import {
  SticosWidget,
  SticosWidgetMeta,
} from '../../decorators/sticos-widget.decorator';
import { IWeatherSettings } from './models/weather-input';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WeatherService } from './services/weather.service';
import { WidgetService } from '../../services/widget.service';
import { TimeAgoPipe } from 'ngx-moment';
import * as _ from 'lodash';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'sw-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
  providers: [TimeAgoPipe, WeatherService],
})
@SticosWidget({
  widgetName: 'WeatherWidget',
  headerName: 'Weather',
  options: {
    defaultHeight: 4,
    defaultWidth: 3,
    minHeight: 4,
    minWidth: 3,
  },
})
export class WeatherWidgetComponent implements OnInit {
  settingsProxy: IWeatherSettings;
  popupVisible = false;
  dataSource: DataSource;
  warning: string;
  @Input()
  mod: string;
  @Input()
  settings: IWeatherSettings;
  @Input()
  widgetId: string;
  @Input()
  loadingTemplate: TemplateRef<any>;

  @SticosWidgetMeta(WeatherWidgetComponent)
  sticosWidgetOptions: any;

  private _model: any;

  get formattedAddress() {
    return this.settingsProxy ? this.settingsProxy.name : '';
  }

  constructor(
    private weatherService: WeatherService,
    private widgetService: WidgetService,
    private timeAgoPipe: TimeAgoPipe,
  ) {}

  ngOnInit() {
    if (!this.mod) {
      this.mod = 'default';
    }

    if (!this.settings) {
      this.onShowSettings();
    }

    const __this = this;
    this.dataSource = new DataSource({
      load(loadOptions) {
        __this.warning = 'Searching...';
        return __this.weatherService
          .getGeolocation(loadOptions.searchValue)
          .toPromise()
          .then(
            data => {
              __this.warning = data.length ? '' : 'No result found!';
              return {
                data,
              };
            },
            error => (__this.warning = 'Something bad occurred!'),
          );
      },
    });
  }

  saveSettings() {
    this.settingsProxy.settingsSkip = this.settingsProxy.location
      ? false
      : true;
    this.settings = this.settingsProxy;
    this.widgetService.settingsChanged({
      settings: this.settings,
      widgetId: this.widgetId,
    });
    this.popupVisible = false;
    this.settingsProxy = null;
  }

  onDeleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
  }

  onShowSettings() {
    this.settingsProxy = this.settings ? _.cloneDeep(this.settings) : {};
    this.popupVisible = true;
  }

  formatter = (result: any) => {
    if (
      result.address_components.find(x =>
        x.types.find(y => y === 'locality'),
      ) &&
      result.address_components.find(x => x.types.find(y => y === 'country'))
    ) {
      const city = result.address_components.find(x =>
        x.types.find(y => y === 'locality'),
      ).long_name;
      const country = result.address_components.find(x =>
        x.types.find(y => y === 'country'),
      ).short_name;
      return `${city}, ${country}`;
    } else {
      return result.formatted_address;
    }
  };

  get model() {
    return this._model;
  }

  set model(value) {
    this._model = value;
    if (this._model.formatted_address) {
      this.settingsProxy = {
        location: this._model.geometry.location,
        formattedAddress: this._model.formatted_address,
        name: this.formatter(this._model),
        placeId: this._model.place_id,
      };
    }
  }

  get lastSync() {
    if (this.settings && !this.settings.settingsSkip) {
      return (
        this.timeAgoPipe.transform(this.weatherService.lastSync) || 'Not synced'
      );
    } else {
      return 'Never';
    }
  }

  sync() {
    this.weatherService.doSync();
  }

  updateSettings(event) {
    if (event.value && event.value.place_id) {
      this.model = event.value;
    }
  }
}
