import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  Type,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostBinding,
  AfterViewChecked,
} from '@angular/core';
import { slideLeftRight } from '@sticos/ui';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sw-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss'],
  animations: [slideLeftRight],
})
export class DashboardMenuComponent implements OnInit, AfterViewChecked {
  @HostBinding('class.show')
  @Input()
  opened: boolean;

  components: Type<any>[];
  private showButtons: boolean;
  private showLeft: boolean;
  private showRight: boolean;

  showLeftButton: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showRightButton: BehaviorSubject<boolean> = new BehaviorSubject(false);

  @Output()
  cancel: EventEmitter<null> = new EventEmitter();

  @Output()
  save: EventEmitter<null> = new EventEmitter();

  @Output()
  drop = new EventEmitter<any>();

  @Output()
  enter = new EventEmitter<any>();

  @Output()
  out = new EventEmitter<any>();

  @ViewChild('scrollWrapper')
  private container: ElementRef;

  @ViewChild('wrapper')
  private wrapper: ElementRef;

  calculateButtonsFlags() {
    // execute in next tick since we are calling this on ngAfterViewCheck (changing values here would produce error,
    // read about this on angular docs)
    setTimeout(() => {
      const viewPort =
        this.container.nativeElement.offsetWidth -
        this.wrapper.nativeElement.offsetWidth;
      this.showButtons = viewPort > 0;
      this.showLeft = this.wrapper.nativeElement.scrollLeft !== 0;
      this.showRight = this.wrapper.nativeElement.scrollLeft !== viewPort;
      this.showLeftButton.next(!!(this.showButtons && this.showLeft));
      this.showRightButton.next(!!(this.showButtons && this.showRight));
    }, 0);
  }

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    const factories = Array.from(this.resolver['_factories'].keys());
    this.components = <Array<Type<any>>>(
      factories.filter((x: any) => x.sticosWidgetOptions)
    );
  }

  ngAfterViewChecked() {
    this.calculateButtonsFlags();
  }

  onDrop(event, component) {
    Object.defineProperty(event, 'component', {
      value: component,
      writable: false,
    });
    this.drop.emit(event);
  }

  toRight() {
    this.wrapper.nativeElement.scrollLeft += 100;
    this.calculateButtonsFlags();
  }

  toLeft() {
    this.wrapper.nativeElement.scrollLeft -= 100;
    this.calculateButtonsFlags();
  }
}
