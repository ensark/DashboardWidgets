import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService {
  lastSync: Date;
  private _sync = new ReplaySubject<boolean>();

  constructor(private http: HttpClient) {}

  getGeolocation(searchTerm: string): Observable<any[]> {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json';
    if (searchTerm) {
      return this.http
        .get<any>(url, {
          params: {
            key: 'AIzaSyDifwjxTyfm1Wjk73NTwHqlLX_Ysh6Tc7Q',
            address: searchTerm,
          },
        })
        .pipe(map(x => x.results));
    } else {
      return of([]);
    }
  }

  getWeather(lat: number, lon: number): Observable<any> {
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    return this.http
      .get<any>(url, {
        params: {
          APPID: 'a4ced634ed7034d0aa041a1f77909cf0',
          lat: lat.toString(),
          lon: lon.toString(),
          units: 'metric',
        },
      })
      .pipe(
        map(data => {
          this.lastSync = new Date();
          return data;
        }),
      );
  }

  get sync() {
    return this._sync.asObservable();
  }

  doSync() {
    this._sync.next(true);
  }
}
