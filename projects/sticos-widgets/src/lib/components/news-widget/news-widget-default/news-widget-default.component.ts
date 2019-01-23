import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { UserCacheService } from '../../../services/user-cache.service';
import { IClaimsUser } from '@sticos/apis/common';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'sw-news-widget-default',
  templateUrl: './news-widget-default.component.html',
  styleUrls: ['./news-widget-default.component.scss'],
})
export class NewsWidgetDefaultComponent implements OnInit {
  dataSource: DataSource;
  private _noMoreData: boolean;
  shouldScroll: boolean;
  user: IClaimsUser;

  constructor(
    private userCacheService: UserCacheService,
    private newsService: NewsService,
  ) {}

  ngOnInit(): void {
    this.userCacheService.ClaimsUser().subscribe(user => {
      this.user = user;
      this.dataSource = this.getDataSource();
    });
  }

  getDataSource() {
    const __this = this;
    return new DataSource({
      pageSize: 10,
      load(loadOptions) {
        return __this.newsService
          .getLatest(__this.user.customerId)
          .then(data => {
            __this._noMoreData = data.length < 10;
            return {
              data,
            };
          });
      },
    });
  }

  scroll(event) {
    if (this._noMoreData && (event.reachedBottom || event.reachedTop)) {
      this.shouldScroll = false;
    }
  }
}
