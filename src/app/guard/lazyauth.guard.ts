import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogBoxComponent } from '../components/dialog-box/dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class LazyauthGuard implements CanLoad {
  
  constructor(private authService: AuthService,private  dialog:MatDialog) { }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.UserSubjectValue) {
        return true
      }
      this.openAlertDialog("Please login to continue the service")
      return false;
  }
  openAlertDialog(msg:String) {
    const dialogRef = this.dialog.open(DialogBoxComponent,{
      data:{
        message: msg,
        buttonText: {
          cancel: 'ok'
        }
      },
    });
  }
}
