import { ApiConfiguration as CommonApiConfiguration } from '@sticos/apis/common';
import { ApiConfiguration as TimeregApiConfiguration } from '@sticos/apis/timereg';
import { ApiConfiguration as AltinnApiConfiguration } from '@sticos/apis/altinn';
import { ApiConfiguration as IntegrationsApiConfiguration } from '@sticos/apis/integrations';
import { Injectable } from '@angular/core';
import { NewsService } from './services/news.service';
import { PersonalFilePreviewUrlService } from '@sticos/ui';

@Injectable({
  providedIn: 'root',
})
export class ApiInitializer {
  constructor(
    private commonApiConfig: CommonApiConfiguration,
    private timeregApiConfig: TimeregApiConfiguration,
    private altinnApiConfig: AltinnApiConfiguration,
    private integrationsApiConfig: IntegrationsApiConfiguration,
    private personalFilePreviewUrlService: PersonalFilePreviewUrlService,
    private newsService: NewsService,
  ) {}

  initializeApis(apiUrls: any) {
    this.commonApiConfig.rootUrl = apiUrls.common;
    this.timeregApiConfig.rootUrl = apiUrls.timereg;
    this.altinnApiConfig.rootUrl = apiUrls.altinn;
    this.integrationsApiConfig.rootUrl = apiUrls.integrations;
    this.personalFilePreviewUrlService.rootUrl = apiUrls.filePreview;
    this.newsService.apiUrl = apiUrls.news;
  }
}
