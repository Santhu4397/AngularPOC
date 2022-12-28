import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewComponent } from './view.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';
import { AboutRoutingModule } from '../about/about-routing.module';

@NgModule({

  imports: [
    CommonModule,
    AboutRoutingModule, CommonModule,HttpClientModule

  ],
  providers: [AppService,AuthService],

})
export class ViewModule { }
