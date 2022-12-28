import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HttpClient } from '@angular/common/http';
import { ProfileComponent } from '../../profile/profile.component';
import { APiService } from 'src/app/service/api.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private url:APiService, private authService: AuthService,public dialog:MatDialog,private router:Router,private http:HttpClient,private profile:ProfileComponent) { }
   statuscode!: any; 
   responsedata!:any;
  ngOnInit(): void {
  }
  LoginFrom=new FormGroup({email:new FormControl('test@gmail.com'),pws: new FormControl('123')})
  login1(){
    console.log(this.LoginFrom.value.pws)
    var email:String=this.LoginFrom.value.email
    var pws:String=this.LoginFrom.value.pws
    if(email==null||pws==null){
      alert("enter the required value ")
    }else{
    // this.http.get("http://localhost:8080/training/demo/login/"+email+"/"+pws).subscribe((data:any)=>{
    //   console.log(data)
    // this.statuscode=data.responseCode;
    // this.responsedata=data.data;
    // })
    this.url.login(email,pws).subscribe(res=>{
      console.log(res);
      
      this.validation(res.responseCode,res.data)
  },err=>{
      this.validation(err.status,'')
  });
  }

    

}
validation(status:String,responsedata:any){
  if(status=='200'){

    this.authService.SignInUser(responsedata)
   
  this.router.navigateByUrl('view')
  }else if(status=='404'){
    
    this.openAlertDialog("invalid Email and Password ")
    this.router.navigateByUrl('login')
  }
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
