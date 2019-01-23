import {
  ViewContainerRef,
  Directive,
  Input,
  Type,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import 'reflect-metadata/reflect';

@Directive({
  selector: '[swWidget]',
})
export class WidgetDirective implements OnInit, OnDestroy {
  componentRef;
  init = false;
  @Input()
  widgetName: string;
  @Input()
  settings: any;
  @Input()
  widgetId: string;

  @Input()
  loadingTemplate: TemplateRef<any>;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    const factories = Array.from(this.resolver['_factories'].keys());
    const factoryClass = <Type<any>>(
      factories.find(
        (x: any) =>
          x.sticosWidgetOptions &&
          x.sticosWidgetOptions.widgetName === this.widgetName,
      )
    );
    const factory = this.resolver.resolveComponentFactory(factoryClass);
    const cref = this.viewContainerRef.createComponent(factory);

    cref.instance.settings = this.settings;
    cref.instance.widgetId = this.widgetId;
    cref.instance.loadingTemplate = this.loadingTemplate;

    if (this.componentRef) {
      this.componentRef.destroy();
    }

    this.componentRef = cref;
    this.init = true;
  }

  public ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
