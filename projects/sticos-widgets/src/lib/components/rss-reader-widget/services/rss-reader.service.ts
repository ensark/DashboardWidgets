import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare var require: any;

@Injectable()
export class RssReaderService {
  constructor(private http: HttpClient) {}

  getFeeds(url: string): Observable<any> {
    const parseString = require('xml2js').parseString;
    let convertedResult;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(response => {
        parseString(response, function(err, result) {
          convertedResult = result.rss.channel[0];
        });
        return convertedResult;
      }),
    );
  }
}
