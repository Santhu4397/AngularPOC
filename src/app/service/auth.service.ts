import {  Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogBoxComponent } from '../components/dialog-box/dialog-box.component';
import { BehaviorSubjectService } from './behaviorsubjectservice';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  User = new BehaviorSubject<any>(null);
  
  data!:any;
  constructor(public dialog:MatDialog,private behaviorService:BehaviorSubjectService) { }

  public get UserSubjectValue() {
    if (this.behaviorService.loginUserData) {
      return this.behaviorService.loginUserData.value;
    } else {
      return null
    }
  }

  SignInUser(data:any){

    this.data=data
   
    this.openAlertDialog('Login Successful '+data.name)
    this.behaviorService.setLoginUserData(data)
    //this.User.next(data);
    return data
    
  }

  SignOutUser(){

    this.openAlertDialog(this.data.name+" logged Out")
    this.User.next(null);
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
