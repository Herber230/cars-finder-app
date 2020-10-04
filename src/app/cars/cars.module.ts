import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewComponent } from './list-view/list-view.component';
import { ConsoleControl } from './console/console-control.component';
import { ConsoleService } from './console/console.service';



@NgModule({
  declarations: [
    ListViewComponent,
    ConsoleControl
  ],
  imports: [
    CommonModule
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
