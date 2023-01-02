import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { data } from "jquery";
import { DialogBoxComponent } from "../components/dialog-box/dialog-box.component";
import { ViewComponent } from "../components/view/view.component";
import { APiService } from "../service/api.service";
import { AuthService } from "../service/auth.service";
import { UpdatedialogComponent } from "../components/updatedialog/updatedialog.component";
import { BehaviorSubject } from "rxjs";
import { BehaviorSubjectService } from "../service/behaviorsubjectservice";


@Component({
    selector: 'btn-cell-renderer',
    template: `
    <button (click)="UpdateUser()" style="background-color:#24a0ed;
       border-radius: 10px; cursor: pointer; color:white; font-size: inherit; outline: auto; ">Update</button>
   
    `
  })
  export class BtnCellRenderer implements ICellRendererAngularComp {
    constructor(private router:Router,private behaviorsubject:BehaviorSubjectService, private _snackBar: MatSnackBar
     ) { }

    refresh(): boolean {
      return false;
    }
    private gridApi!: GridApi
   
    private params: any;
    private data:any
    updateData = new BehaviorSubject<any>(null);
  
    agInit(params: any): void {
      this.params = params;
    }
  
 
    UpdateUser(): void{  
      let user={}as User
      console.log(this.params.data);
      user.name=this.params.data.name
      user.email=this.params.data.email
      user.productName=this.params.data.productName
      user.userStartDate=this.params.data.userStartDate
      user.userEndDate=this.params.data.userEndDate
      user.id=this.params.data.id
      user.pws=this.params.data.pws
      this.updateData.next(user)
      console.log(user)
      this.behaviorsubject.setUpdateUserData(user)
     // this.updatedialog.viewuserdata(user)
     this.behaviorsubject.loginUserData.subscribe(resp=>{
      this.data=resp
     })
      if(this.data!=null){
      this.router.navigateByUrl("/updateuser")
      }else{
          this.openSnackBar('login to update ','X')
      }
      
      // console.log(this.gridApi.getSelectedRows())
     
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
  