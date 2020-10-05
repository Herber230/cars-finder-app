import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { ListViewComponent } from './list-view/list-view.component';
import { ConsoleControl } from './console/console-control.component';
import { ConsoleService } from './console/console.service';
import { SearchPanelComponent } from './search-panel/search-panel.component';


@NgModule({
  declarations: [
    ListViewComponent,
    ConsoleControl,
    SearchPanelComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TypeaheadModule
  ],
  exports: [
    ConsoleControl
  ],
  entryComponents: [
    ConsoleControl
  ],
  providers: [
    ConsoleService
  ]
})
export class CarsModule { }
