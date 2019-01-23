export interface IWidgetMeta {
  widgetName: string;
  options: IWidgetOptions;
  dragAndDrop?: boolean;
  resizable?: boolean;
  displayName?: string;
  headerName?: string;
  [propName: string]: any;
}

export interface IWidgetOptions {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  defaultWidth: number;
  defaultHeight: number;
}

export interface IWidgetSettings {
  settings: any;
  widgetId: string;
}

export interface IWidgetInstance {
  widgetId: string;
  widgetName: string;
  settings?: any;
  options: any;
  dragAndDrop?: boolean;
  resizable?: boolean;
  displayName?: string;
  headerName?: string;
  x?: number;
  y?: number;
  xSm?: number;
  ySm?: number;
  xMd?: number;
  yMd?: number;
  xLg?: number;
  yLg?: number;
  xXl?: number;
  yXl?: number;
  w?: number;
  h?: number;
  [propName: string]: any;
}
