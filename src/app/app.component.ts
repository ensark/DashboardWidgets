import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWidgetInstance } from '@sticos/widgets';
import { environment } from 'src/environments/environment';
import { Dashboard, DashboardService } from '@sticos/apis/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  settings: any;
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dashboard: Dashboard;
  title: string;
  widgetConfig: IWidgetInstance[];
  edit: boolean;
  apiUrls: any;

  constructor(private dashService: DashboardService) {
    this.apiUrls = environment.apiUrls;
  }

  ngOnInit() {
    this.fetchWidgetsData();
  }

  fetchWidgetsData(): void {
    this.title = 'Demo dash';
    this.widgetConfig = [
      {
        widgetName: 'NewsWidget',
        headerName: 'News',
        options: {
          defaultHeight: 4,
          defaultWidth: 6,
          minHeight: 4,
          minWidth: 4,
        },
        displayName: 'NewsWidget',
        widgetId: '37bdfb8e-817c-540e-c4a8-a841812ce5c5',
        xMd: 3,
        yMd: 0,
        w: 6,
        h: 4,
        xSm: 0,
        ySm: 0,
        wSm: 6,
        hSm: 4,
        wMd: 8,
        hMd: 4,
        xLg: 0,
        yLg: 0,
        wLg: 6,
        hLg: 4,
        xXl: 0,
        yXl: 0,
        wXl: 6,
        hXl: 4,
      },
    ];
  }

  change(event) {
    console.log(event);
  }
}
