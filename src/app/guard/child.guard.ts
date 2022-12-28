import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogBoxComponent } from '../components/dialog-box/dialog-box.component';
@Injectable({
  providedIn: 'root'
})
export class ChildGuard implements CanActivateChild {

  constructor(private authService: AuthService,public dialog:MatDialog) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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
