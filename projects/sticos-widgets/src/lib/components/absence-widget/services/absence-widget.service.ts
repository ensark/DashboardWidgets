import { Injectable } from '@angular/core';
import { IChartSerie } from '../models/absence-widget-input';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AbsenceWidgetService {
  data = {
    series: [
      {
        name: '2018',
        values: [
          {
            name: '1',
            value: 10,
          },
          {
            name: '2',
            value: 10,
          },
          {
            name: '3',
            value: 7,
          },
          {
            name: '4',
            value: 13,
          },
        ],
      },
      {
        name: '2017',
        values: [
          {
            name: '1',
            value: 5,
          },
          {
            name: '2',
            value: 3,
          },
          {
            name: '3',
            value: 9,
          },
          {
            name: '4',
            value: 5,
          },
        ],
      },
      {
        name: '2016',
        values: [
          {
            name: '1',
            value: 2,
          },
          {
            name: '2',
            value: 2,
          },
          {
            name: '3',
            value: 2,
          },
          {
            name: '4',
            value: 1,
          },
        ],
      },
      {
        name: '2015',
        values: [
          {
            name: '1',
            value: 12,
          },
          {
            name: '2',
            value: 8,
          },
          {
            name: '3',
            value: 7,
          },
          {
            name: '4',
            value: 10,
          },
        ],
      },
    ],
  };

  constructor() {}

  getYears() {
    return this.data.series.map(x => x.name);
  }

  getAbsencesData(year: string): Observable<IChartSerie> {
    const currentSerie = this.data.series.find(x => x.name === year);
    return of(currentSerie);
  }
}
