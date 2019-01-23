import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class AnomalyEventService {
  private _filter = new ReplaySubject<string>();

  get filter(): Observable<string> {
    return this._filter.asObservable();
  }

  doFilter(name) {
    this._filter.next(name);
  }
}
