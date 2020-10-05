import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal'
import { CarsModule } from './cars/cars.module';
import { SharedDataService } from './cars/services/shared-data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarsModule,
    ModalModule.forRoot()
  ],
  providers: [
    SharedDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
