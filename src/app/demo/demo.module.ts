import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppService } from 'src/app/service/app.service';
import { BtnCellRenderer } from './BtnCellRenderer';
import { AuthService } from '../service/auth.service';
import{HttpClientModule} from '@angular/common/http'
import { DemoComponent } from './demo.component';
import { BtnCellRenderer1 } from './BtnCellRenderer1';
import { APiService } from '../service/api.service';


@NgModule({
  declarations: [
    DemoComponent,BtnCellRenderer,BtnCellRenderer1,APiService
  ],
  imports: [
    CommonModule,HttpClientModule,NgModule
  ],
  providers: [AppService,AuthService],
  bootstrap: [DemoComponent],
  exports:[DemoComponent]
})
export class DemoModule {

 }
