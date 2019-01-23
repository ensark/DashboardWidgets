import {
  Component,
  Input,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  IGridsterOptions,
  IGridsterDraggableOptions,
  GridsterComponent,
} from 'angular2gridster';
import { IWidgetInstance, IWidgetSettings } from '../../models/widget';
import * as _ from 'lodash';
import { UUID } from 'angular2-uuid';
import { WidgetService } from '../../services/widget.service';
import { Subscription } from 'rxjs';
import { GRID_OPTIONS, GRID_DRAG_OPTIONS } from '../../defaults';
import { ApiInitializer } from '../../api-initializer';

@Component({
  selector: 'sw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [WidgetService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Input()
  title: string;

  @Input()
  apiUrls: any;

  @Input()
  options: IGridsterOptions = GRID_OPTIONS;

  @Input()
  draggableOptions: IGridsterDraggableOptions = GRID_DRAG_OPTIONS;

  @Input()
  widgetData: IWidgetInstance[] = [];

  @Input()
  loadingTemplate: TemplateRef<any>;

  @Output()
  change: EventEmitter<IWidgetInstance[]> = new EventEmitter();

  @ViewChild(GridsterComponent)
  gridster: GridsterComponent;

  private _widgetDataCopy: IWidgetInstance[];
  private edit: boolean;
  _subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private widgetService: WidgetService,
    private apiInit: ApiInitializer,
  ) {
    this._subscriptions.push(
      this.widgetService
        .onDeleteWidget()
        .subscribe(this.widgetDeleted.bind(this)),
    );
    this._subscriptions.push(
      this.widgetService
        .onSettingsChanged()
        .subscribe(this.widgetSettingsChanged.bind(this)),
    );
  }

  ngOnInit(): void {
    this.apiInit.initializeApis(this.apiUrls);
  }

  set editMode(value: boolean) {
    if (this.gridster) {
      this.gridster.setOption('dragAndDrop', value);
      this.gridster.setOption('resizable', value);
      this.gridster.reload();
      this.edit = value;
      this._widgetDataCopy = _.cloneDeep(this.widgetData);
    }
  }

  get editMode() {
    return this.edit;
  }

  saveData() {
    this._widgetDataCopy = undefined;
    this.editMode = false;
    this.change.emit(this.widgetData);
  }

  cancel() {
    this.widgetData = _.cloneDeep(this._widgetDataCopy);
    this._widgetDataCopy = undefined;
    this.editMode = false;
  }

  drop(event): void {
    function getAxisName(axis: string, size: string): string {
      const sizeName = size ? size.charAt(0).toUpperCase() + size.slice(1) : '';
      return `${axis}${sizeName}`;
    }

    const breakpoint = event.gridster.options.breakpoint;
    const widgetProto = {
      widgetId: UUID.UUID(),
    };
    widgetProto[getAxisName('x', breakpoint)] = event.item.x;
    widgetProto[getAxisName('y', breakpoint)] = event.item.y;

    const widget: IWidgetInstance = Object.assign(
      {},
      event.component.sticosWidgetOptions,
      widgetProto,
    );
    this.widgetData.push(widget);
  }

  widgetDeleted(widgetId: string): void {
    const index = this.widgetData.findIndex(w => w.widgetId === widgetId);
    this.widgetData.splice(index, 1);
    if (!this.editMode) {
      this.change.emit(this.widgetData);
    }
  }

  widgetSettingsChanged(widgetChanges: IWidgetSettings): void {
    const index = this.widgetData.findIndex(
      w => w.widgetId === widgetChanges.widgetId,
    );
    this.widgetData[index].settings = {};
    Object.assign(this.widgetData[index].settings, widgetChanges.settings);
    if (!this.editMode) {
      this.change.emit(this.widgetData);
    }
  }

  get noWidgets() {
    return this.widgetData.length === 0;
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }
}
