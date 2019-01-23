import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  DxPopupModule,
  DxSliderModule,
  DxProgressBarModule,
  DxDataGridModule,
  DxTemplateModule,
  DxListModule,
  DxAutocompleteModule,
  DxTileViewModule,
  DxChartModule,
  DxBarGaugeModule,
} from 'devextreme-angular';
import { Ng2EventsModule } from 'ng2-events';
import { MomentModule } from 'ngx-moment';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { WidgetDirective } from './directives/widget.directive';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { WeatherWidgetDefaultComponent } from './components/weather-widget/weather-widget-default/weather-widget-default.component';
import { WidgetComponent } from './components/widget/widget.component';
import { WidgetHeaderComponent } from './components/widget/widget-header/widget-header.component';
import { WidgetBodyComponent } from './components/widget/widget-body/widget-body.component';
import { WidgetFooterComponent } from './components/widget/widget-footer/widget-footer.component';
import { RssReaderComponent } from './components/rss-reader-widget/rss-reader-widget.component';
import { RssReaderWidgetDefaultComponent } from './components/rss-reader-widget/rss-reader-widget-default/rss-reader-widget-default.component';
import { ExponentialStrengthPipe } from './components/widget/pipes/clear-html-tags.pipe';
import { SubstringOfTextPipe } from './components/widget/pipes/substring-of-text.pipe';
import { ComicWidgetComponent } from './components/comic-widget/comic-widget.component';
import { ComicWidgetDefaultComponent } from './components/comic-widget/comic-widget-default/comic-widget-default.component';
import { VacationBankWidgetComponent } from './components/vacation-bank-widget/vacation-bank-widget.component';
import { VacationBankWidgetDefaultComponent } from './components/vacation-bank-widget/vacation-bank-widget-default/vacation-bank-widget-default.component';
import { VacationBankDirective } from './components/vacation-bank-widget/directives/vacation-bank-directive';
import { NewsWidgetComponent } from './components/news-widget/news-widget.component';
import { NewsWidgetDefaultComponent } from './components/news-widget/news-widget-default/news-widget-default.component';
import { AnomalyWidgetComponent } from './components/anomaly-widget/anomaly-widget.component';
import { AnomalyWidgetDefaultComponent } from './components/anomaly-widget/anomaly-widget-default/anomaly-widget-default.component';
import { EmployeeWidgetComponent } from './components/employee-widget/employee-widget.component';
import { EmployeeWidgetDefaultComponent } from './components/employee-widget/employee-widget-default/employee-widget-default.component';
import { UserWidgetComponent } from './components/user-widget/user-widget.component';
import { UserWidgetDefaultComponent } from './components/user-widget/user-widget-default/user-widget-default.component';
import { PresenceWidgetComponent } from './components/presence-widget/presence-widget.component';
import { PresenceWidgetDefaultComponent } from './components/presence-widget/presence-widget-default/presence-widget-default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GridsterModule } from 'angular2gridster';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Ng2CacheModule } from 'ng2-cache';

import { ApiModule as CommonApiModule } from '@sticos/apis/common';
import { ApiModule as TimeregApiModule } from '@sticos/apis/timereg';
import { ApiModule as AltinnApiModule } from '@sticos/apis/altinn';
import { ApiModule as IntegrationsApiModule } from '@sticos/apis/integrations';

import { ApiInitializer } from './api-initializer';
import { AbsenceWidgetComponent } from './components/absence-widget/absence-widget.component';
import { AbsenceWidgetDefaultComponent } from './components/absence-widget/absence-widget-default/absence-widget-default.component';
import { EnumReaderPipe } from './components/widget/pipes/enum-reader.pipe';
import { SticosUiModule } from '@sticos/ui';
import { AbsenceDirective } from './components/absence-widget/directives/absence-directive';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DxPopupModule,
    Ng2EventsModule,
    Ng2CacheModule,
    MomentModule,
    CommonApiModule,
    TimeregApiModule,
    AltinnApiModule,
    IntegrationsApiModule,
    DxSliderModule,
    DxProgressBarModule,
    DxDataGridModule,
    DxTemplateModule,
    DxListModule,
    DxAutocompleteModule,
    DxTileViewModule,
    DxChartModule,
    DxBarGaugeModule,
    BsDropdownModule.forRoot(),
    GridsterModule.forRoot(),
    PerfectScrollbarModule,
    SticosUiModule,
  ],
  declarations: [
    WeatherWidgetComponent,
    WeatherWidgetDefaultComponent,
    WidgetDirective,
    WidgetComponent,
    WidgetHeaderComponent,
    WidgetBodyComponent,
    WidgetFooterComponent,
    RssReaderComponent,
    RssReaderWidgetDefaultComponent,
    ExponentialStrengthPipe,
    SubstringOfTextPipe,
    ComicWidgetComponent,
    ComicWidgetDefaultComponent,
    VacationBankWidgetComponent,
    VacationBankWidgetDefaultComponent,
    VacationBankDirective,
    AnomalyWidgetComponent,
    AnomalyWidgetDefaultComponent,
    EmployeeWidgetComponent,
    EmployeeWidgetDefaultComponent,
    NewsWidgetComponent,
    NewsWidgetDefaultComponent,
    UserWidgetComponent,
    UserWidgetDefaultComponent,
    PresenceWidgetComponent,
    PresenceWidgetDefaultComponent,
    DashboardComponent,
    DashboardMenuComponent,
    AbsenceWidgetComponent,
    AbsenceWidgetDefaultComponent,
    AbsenceDirective,
    EnumReaderPipe,
  ],
  entryComponents: [
    WeatherWidgetComponent,
    RssReaderComponent,
    ComicWidgetComponent,
    VacationBankWidgetComponent,
    AnomalyWidgetComponent,
    EmployeeWidgetComponent,
    NewsWidgetComponent,
    UserWidgetComponent,
    PresenceWidgetComponent,
    AbsenceWidgetComponent,
  ],
  providers: [
    ApiInitializer,
    EnumReaderPipe,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  exports: [
    WeatherWidgetComponent,
    WidgetDirective,
    RssReaderComponent,
    ComicWidgetComponent,
    VacationBankWidgetComponent,
    AnomalyWidgetComponent,
    EmployeeWidgetComponent,
    NewsWidgetComponent,
    UserWidgetComponent,
    PresenceWidgetComponent,
    DashboardComponent,
    DashboardMenuComponent,
    AbsenceWidgetComponent,
    EnumReaderPipe,
  ],
})
export class SticosWidgetsModule {}
