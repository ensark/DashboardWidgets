import { Injectable } from '@angular/core';
import { IWidgetSettings } from '../models/widget';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class WidgetService {
  private _settingsChangedSource = new ReplaySubject<IWidgetSettings>();
  private _deleteWidgetSource = new ReplaySubject<string>();

  onSettingsChanged(): Observable<IWidgetSettings> {
    return this._settingsChangedSource.asObservable();
  }
  settingsChanged(settings: IWidgetSettings) {
    this._settingsChangedSource.next(settings);
  }

  onDeleteWidget(): Observable<string> {
    return this._deleteWidgetSource.asObservable();
  }
  deleteWidget(widgetId: string) {
    this._deleteWidgetSource.next(widgetId);
  }
}
