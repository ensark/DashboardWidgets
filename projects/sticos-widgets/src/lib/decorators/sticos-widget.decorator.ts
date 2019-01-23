import { IWidgetMeta } from '../models/widget';
import 'reflect-metadata/reflect';

export function SticosWidget(config: IWidgetMeta) {
  const _props = Object.assign({}, config);
  return function(target) {
    if (!_props.displayName) {
      _props.displayName = _props.widgetName;
    }

    if (!_props.headerName) {
      _props.headerName = _props.displayName;
    }

    Reflect.defineMetadata('__sticosWidgetOptions', _props, target);

    Object.defineProperty(target, 'sticosWidgetOptions', {
      configurable: false,
      get: () => Reflect.getMetadata('__sticosWidgetOptions', target),
    });
  };
}

export function SticosWidgetMeta(component: any) {
  return function(target, prop) {
    Object.defineProperty(target, prop, {
      configurable: false,
      get: () => Reflect.getMetadata('__sticosWidgetOptions', component),
    });
  };
}
