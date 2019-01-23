import { Component, Input } from '@angular/core';

@Component({
  selector: 'sw-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.scss'],
})
export class WidgetHeaderComponent {
  @Input()
  title: string;
}
