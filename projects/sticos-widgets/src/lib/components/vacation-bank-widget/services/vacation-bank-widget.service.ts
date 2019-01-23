import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import {
  VacationBankType,
  IChart,
  IChartSerie,
} from '../models/vacation-bank-input';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class VacationBankWidgetService {
  data = {
    series: [
      {
        name: '2018',
        values: [
          {
            name: '1',
            value: 30,
          },
          {
            name: '5',
            value: 10,
          },
          {
            name: '10',
            value: 7,
          },
          {
            name: '11',
            value: 13,
          },
        ],
      },
      {
        name: '2017',
        values: [
          {
            name: '1',
            value: 40,
          },
          {
            name: '5',
            value: 2,
          },
          {
            name: '10',
            value: 26,
          },
          {
            name: '11',
            value: 12,
          },
        ],
      },
      {
        name: '2016',
        values: [
          {
            name: '1',
            value: 25,
          },
          {
            name: '5',
            value: 5,
          },
          {
            name: '10',
            value: 20,
          },
          {
            name: '11',
            value: 0,
          },
        ],
      },
      {
        name: '2015',
        values: [
          {
            name: '1',
            value: 20,
          },
          {
            name: '5',
            value: 5,
          },
          {
            name: '10',
            value: 5,
          },
          {
            name: '11',
            value: 10,
          },
        ],
      },
      {
        name: '2014',
        values: [
          {
            name: '1',
            value: 22,
          },
          {
            name: '5',
            value: 7,
          },
          {
            name: '10',
            value: 13,
          },
          {
            name: '11',
            value: 2,
          },
        ],
      },
    ],
  };

  constructor() {}

  getYears() {
    return this.data.series.map(x => x.name);
  }

  getVacationBank(year): Observable<IChartSerie> {
    const currentSerie = this.data.series.find(x => x.name === year);
    return of(currentSerie);
  }
}
