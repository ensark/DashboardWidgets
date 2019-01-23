import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import DataSource from 'devextreme/data/data_source';
import { EmployeeService, IClaimsUser } from '@sticos/apis/common';
import { UserCacheService } from '../../../services/user-cache.service';

@Component({
  selector: 'sw-employee-widget-default',
  templateUrl: './employee-widget-default.component.html',
  styleUrls: ['./employee-widget-default.component.scss'],
})
export class EmployeeWidgetDefaultComponent implements OnInit, OnDestroy {
  dataSource: DataSource;
  private _debounce = 500;
  private _searchTerm;
  private _noMoreData = false;
  shouldScroll: boolean;
  user: IClaimsUser;

  get searchTerm() {
    return this._searchTerm;
  }
  set searchTerm(value) {
    this.filterChanged.next(value);
  }
  filterChanged: Subject<string> = new Subject<string>();

  constructor(
    private userCacheService: UserCacheService,
    private employeeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    this.userCacheService.ClaimsUser().subscribe(user => {
      this.user = user;

      this.filterChanged
        .pipe(debounceTime(this._debounce))
        .pipe(distinctUntilChanged())
        .subscribe(model => {
          this._searchTerm = model;
          this.dataSource = this.getDataSource();
        });

      this.dataSource = this.getDataSource();
    });
  }

  getDataSource() {
    const __this = this;
    return new DataSource({
      pageSize: 10,
      load(loadOptions) {
        let query = {
          Skip: loadOptions.skip,
          Take: loadOptions.take,
          customerId: __this.user.customerId.toString(),
        };
        if (__this._searchTerm) {
          query = Object.assign(query, { Name: __this.searchTerm });
        }
        return __this.employeeService
          .Search(query)
          .toPromise()
          .then(data => {
            __this._noMoreData = data.length < 10;
            return {
              data,
            };
          });
      },
    });
  }

  ngOnDestroy(): void {
    this.filterChanged.unsubscribe();
  }

  scroll(event) {
    if (this._noMoreData && (event.reachedBottom || event.reachedTop)) {
      this.shouldScroll = false;
    }
  }
}
