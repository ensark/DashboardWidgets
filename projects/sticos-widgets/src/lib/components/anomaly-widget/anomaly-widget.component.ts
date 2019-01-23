import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import {
  SticosWidget,
  SticosWidgetMeta,
} from '../../decorators/sticos-widget.decorator';
import { WidgetService } from '../../services/widget.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnomalyEventService } from './services/anomaly-event.service';
import { AnomalyService, UserService, IUser } from '@sticos/apis/common';
import { UserCacheService } from '../../services/user-cache.service';

@Component({
  selector: 'sw-anomaly-widget',
  templateUrl: './anomaly-widget.component.html',
  styleUrls: ['./anomaly-widget.component.scss'],
  providers: [AnomalyService, UserService, AnomalyEventService],
})
@SticosWidget({
  widgetName: 'AnomalyWidget',
  headerName: 'Anomaly',
  options: {
    defaultHeight: 4,
    defaultWidth: 6,
    minHeight: 4,
    minWidth: 6,
  },
})
export class AnomalyWidgetComponent implements OnInit {
  popupVisible = false;
  @Input()
  mod: string;
  @Input()
  settings: any;
  @Input()
  widgetId: string;
  @Input()
  loadingTemplate: TemplateRef<any>;

  anomalyForm: FormGroup;
  isFiltered = false;

  @SticosWidgetMeta(AnomalyWidgetComponent)
  sticosWidgetOptions: any;
  user: IUser;

  constructor(
    private userCacheService: UserCacheService,
    private anomalyEventService: AnomalyEventService,
    private widgetService: WidgetService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.userCacheService.Current().subscribe(user => {
      this.user = user;
    });

    this.createForm();

    if (!this.mod) {
      this.mod = 'default';
    }
  }

  createForm() {
    this.anomalyForm = this.fb.group({
      date: '22.02.2018',
      location: ['', Validators.required],
      description: ['', Validators.required],
      responsible: 'Current User',
      deadline: ['', Validators.required],
      status: 'Ongoing',
    });
  }

  onDeleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
  }

  showForm() {
    this.popupVisible = true;
  }

  saveForm() {
    this.popupVisible = false;
    this.createForm();
  }

  filterAnomailes() {
    this.isFiltered = !this.isFiltered;
    if (this.isFiltered) {
      this.anomalyEventService.doFilter(
        `${this.user.firstName} ${this.user.lastName}`,
      );
    } else {
      this.anomalyEventService.doFilter('');
    }
  }
}
