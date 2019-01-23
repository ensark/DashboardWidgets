import { Component, OnDestroy, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { AnomalyEventService } from '../services/anomaly-event.service';
import { Subscription } from 'rxjs';
import { AnomalyService, IUser } from '@sticos/apis/common';
import { UserCacheService } from '../../../services/user-cache.service';

@Component({
  selector: 'sw-anomaly-widget-default',
  templateUrl: './anomaly-widget-default.component.html',
  styleUrls: ['./anomaly-widget-default.component.scss'],
})
export class AnomalyWidgetDefaultComponent implements OnInit, OnDestroy {
  filterSubscription: Subscription;
  name: string;
  dataSource: DataSource;
  shouldScroll: boolean;
  user: IUser;

  constructor(
    private userCacheService: UserCacheService,
    private anomalyService: AnomalyService,
    private anomalyEventService: AnomalyEventService,
  ) {}

  ngOnInit(): void {
    this.userCacheService.ClaimsUser().subscribe(user => {
      this.user = user;
      this.dataSource = this.getDataSource();

      this.filterSubscription = this.anomalyEventService.filter.subscribe(
        name => {
          this.name = name;
          this.dataSource = this.getDataSource();
        },
      );
    });
  }

  getDataSource() {
    const __this = this;
    return new DataSource({
      pageSize: 10,
      load(loadOptions) {
        let query: AnomalyService.SearchParams = {
          Skip: loadOptions.skip,
          Take: loadOptions.take,
          customerId: __this.user.customerId.toString(),
        };
        if (__this.name) {
          query = Object.assign(query, { Responsible: __this.name });
        }
        return __this.anomalyService
          .Search(query)
          .toPromise()
          .then(data => {
            return {
              data,
            };
          });
      },
    });
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }
}
