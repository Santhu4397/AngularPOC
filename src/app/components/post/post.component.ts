import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AnimationDurations } from '@angular/material/core';
import { Router } from '@angular/router';
import { APiService } from 'src/app/service/api.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private url:APiService, private router:Router ,private  http:HttpClient,private _snackBar: MatSnackBar,public dialog:MatDialog,private datePipe: DatePipe) { }

  ngOnInit(): void {
  }
    userdata=new FormGroup({
      email:new FormControl('@gmail.com'),
      name:new FormControl(),
      productName:new FormControl(),
      userEndDate:new FormControl,
      userStartDate:new FormControl(),
      pws:new FormControl()})

      sendUserData(){
      let user={}as User
      user.name=this.userdata.value.name
      user.email=this.userdata.value.email
      user.productName=this.userdata.value.productName
      user.userStartDate=this.datePipe.transform(this.userdata.value.userStartDate, 'MM/dd/yyyy')
      user.userEndDate=this.datePipe.transform(this.userdata.value.userEndDate, 'MM/dd/yyyy')
      user.pws=this.userdata.value.pws
   console.log(user);
    

        this.url.saveUser(user).subscribe(res=>{
          console.log(res);
          
          this.validation(res.responseCode,res.responseDescription)
      },err=>{
        this.validation(err.status,err.error.responseDescription)
    });
      } 

      validation(statusCode:String,message:string){
        
        if(statusCode=='201'){
          
          this.router.navigateByUrl('view')
          this.openSnackBar(message, 'X')
      
          }else if(statusCode=='400'){
            this.openSnackBar(message, 'X')
          }
      }
      

      openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {duration: 3000});
      }
      
}
interface User{
  email:String,
  name:String,
  productName:String,
  userEndDate:any,
  userStartDate:any,
  pws:any
}
