import { IGridsterOptions, IGridsterDraggableOptions } from 'angular2gridster';

export const GRID_OPTIONS: IGridsterOptions = {
  lanes: 1,
  direction: 'vertical',
  cellHeight: 100,
  floating: true,
  dragAndDrop: false,
  resizable: false,
  shrink: true,
  responsiveSizes: true,
  tolerance: 'intersect',
  resizeHandles: {
    s: true,
    e: true,
    se: true,
  },
  widthHeightRatio: 1,
  lines: {
    visible: true,
    color: '#afafaf',
    width: 1,
  },
  useCSSTransforms: true,
  responsiveView: true,
  responsiveDebounce: 500,
  responsiveOptions: [
    {
      breakpoint: 'sm',
      lanes: 1,
    },
    {
      breakpoint: 'md',
      minWidth: 768,
      lanes: 12,
    },
    {
      breakpoint: 'lg',
      minWidth: 992,
      lanes: 12,
    },
    {
      breakpoint: 'xl',
      minWidth: 1200,
      lanes: 12,
    },
  ],
};

export const GRID_DRAG_OPTIONS: IGridsterDraggableOptions = {
  scroll: true,
};
