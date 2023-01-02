import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { APiService } from 'src/app/service/api.service';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'src/app/service/auth.service';
import { ViewComponent } from '../view/view.component';
import { BtnCellRenderer } from 'src/app/demo/BtnCellRenderer';
import { BtnCellRenderer1 } from 'src/app/demo/BtnCellRenderer1';
import { BehaviorSubjectService } from 'src/app/service/behaviorsubjectservice';
@Component({
  selector: 'app-updatedialog',
  templateUrl: './updatedialog.component.html',
  styleUrls: ['./updatedialog.component.css']
})
export class UpdatedialogComponent implements OnInit {
  data: any;
  userdata =new FormGroup({
      
    email:new FormControl(''),
    name:new FormControl(''),
    productName:new FormControl(''),
    userEndDate:new FormControl(''),
    userStartDate:new FormControl(''),
    pws:new FormControl('')})
  constructor(private _snackBar: MatSnackBar,private url: APiService ,
    private  http:HttpClient,private router:Router,public dialog:MatDialog,
    private datePipe: DatePipe,private authService:AuthService,private view:ViewComponent,private btn:BtnCellRenderer,private behaviorsubject:BehaviorSubjectService) { }
   

  ngOnInit(): void {
  this.behaviorsubject.updateUserData.subscribe(resp=>{
    console.log(resp.name)
    this.userdata.setValue({
      name:resp.name,
      email:resp.email,
    productName:resp.productName,
    userEndDate:this.datePipe.transform(resp.userEndDate,'yyyy-MM-dd'),
    userStartDate:this.datePipe.transform(resp.userStartDate,'yyyy-MM-dd'),
    pws:resp.pws
  });
  }

  )

  }
          
        
  
    updateUser(){ 
      
      let user={}as User
   
      user.name=this.userdata.value.name
      user.email=this.userdata.value.email
      user.productName=this.userdata.value.productName
      user.userStartDate=this.datePipe.transform(this.userdata.value.userStartDate, 'MM/dd/yyyy')
      user.userEndDate=this.datePipe.transform(this.userdata.value.userEndDate, 'MM/dd/yyyy')
      user.pws=this.userdata.value.pws
   console.log(user);
  
      

      this.url.update(user).subscribe(res=>{
        console.log(res);
        this.validation(res.responseCode,res.responseDescription)
        this.view.getUserData()
       this.router.navigateByUrl('view')
        },err=>{
          this.validation(err.status,err.error.responseDescription)
          
          
      });
    }
    validation(statusCode:String,message:string){
          
      if(statusCode=='201'){
        document.querySelector('#forceRefresh')
        this.router.navigateByUrl('view')
        this.openSnackBar(message, 'X')
    
        }else if(statusCode=='400'){
          this.openSnackBar(message, 'X')
        }else if(statusCode=='0'){
          this.openSnackBar(message,'X')
        }
    }
    
  
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {duration: 3000});
    }
   
  
}
interface User{
  id:String,
  email:String,
  name:String,
  productName:String,
  userEndDate:any,
  userStartDate:any,
  pws:any
}
