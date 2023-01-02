import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgGridModule } from 'ag-grid-angular';
import { AppService } from 'src/app/service/app.service';
import { DemoComponent } from './demo/demo.component';
import{ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/Login/login/login.component';
import { RouterModule } from '@angular/router';
// import { AboutModule } from './components/about/about.module';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './components/post/post.component';
import { ViewModule } from './components/view/view.module';
import { ViewComponent } from './components/view/view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import { APiService } from './service/api.service';
import { UpdatedialogComponent } from './components/updatedialog/updatedialog.component';
import { BtnCellRenderer } from './demo/BtnCellRenderer';
import { BehaviorSubjectService } from './service/behaviorsubjectservice';




@NgModule({
  declarations: [
    BtnCellRenderer, AppComponent,DemoComponent, LoginComponent, PostComponent,ViewComponent, UpdatedialogComponent,DialogBoxComponent, UpdatedialogComponent,
  ],
  imports: [
    BrowserModule,AgGridModule,
    AppRoutingModule,ReactiveFormsModule,RouterModule ,MatFormFieldModule,
    MatInputModule,HttpClientModule ,MatSnackBarModule,MatDialogModule,MatDatepickerModule,
    BrowserAnimationsModule
  ],
  providers: [AppService,DatePipe,ProfileComponent,APiService,UpdatedialogComponent,ViewComponent,BtnCellRenderer,BehaviorSubjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
