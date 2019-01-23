import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SticosWidgetsModule } from '@sticos/widgets';
import { Ng2EventsModule } from 'ng2-events';
import { GridsterModule } from 'angular2gridster';
import { SticosUiModule } from '@sticos/ui';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    Ng2EventsModule,
    SticosWidgetsModule,
    GridsterModule.forRoot(),
    BrowserAnimationsModule,
    SticosUiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [Ng2EventsModule],
})
export class AppModule {}
