import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import ODataStore from 'devextreme/data/odata/store';
import { UserCacheService } from './user-cache.service';
import { News } from '../models/news';
import { IClaimsUser } from '@sticos/apis/common';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private store: ODataStore;
  apiUrl: string;

  constructor(private currentUserService: UserCacheService) {
    this.store = new ODataStore({
      url: this.apiUrl + '/odata/news',
    });
  }

  get(id: number): Observable<News> {
    return this.currentUserService.ClaimsUser().pipe(
      switchMap((user: IClaimsUser) => {
        const store = new ODataStore({
          url: this.apiUrl + `/odata/${user.customerId}/news`,
        });

        return from(store.byKey(id));
      }),
    );
  }

  getLatest(customerId: number): Promise<News[]> {
    const options = {
      filter: [
        [['fromDate', '<=', new Date()], 'and', ['!', ['unitId', '=', null]]],
      ],
      take: 15,
      sort: { selector: 'fromDate', desc: true },
    };

    const store = new ODataStore({
      url: this.apiUrl + `/odata/${customerId}/news`,
      version: 4,
    });
    return store.load(options);
  }
}
