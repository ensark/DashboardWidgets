import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class ComicWidgetService {
  currentDate: Date = new Date();
  comic =
    'https://www.tu.no/?module=TekComics&service=image&id=lunch&key=2018-04-16';

  constructor() {}

  // Later it is only necessary to replace the route with the api-backend
  getComic(): Observable<any> {
    let days = '0';
    let months = '0';

    if (this.currentDate.getDate() < 10) {
      days += this.currentDate.getDate();
    } else {
      days = this.currentDate.getDate().toString();
    }

    if (this.currentDate.getMonth() + 1 < 10) {
      months += this.currentDate.getMonth() + 1;
    } else {
      months = (this.currentDate.getMonth() + 1).toString();
    }
    this.comic =
      this.comic.slice(0, -10) +
      this.currentDate.getFullYear() +
      '-' +
      months +
      '-' +
      days;
    return of(this.comic);
  }
}
