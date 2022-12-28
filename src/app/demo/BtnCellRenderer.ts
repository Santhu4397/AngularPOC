import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { DialogBoxComponent } from "../components/dialog-box/dialog-box.component";
import { APiService } from "../service/api.service";


@Component({
    selector: 'btn-cell-renderer',
    template: `
      <button (click)="UpdateUser()" style="background-color:#24a0ed;
       border-radius: 10px; cursor: pointer; color:white; font-size: inherit; outline: auto;">Update</button>
   
    `
  })
  export class BtnCellRenderer implements ICellRendererAngularComp {
    constructor(private _snackBar: MatSnackBar,private url: APiService ,private  http:HttpClient,private router:Router,public dialog:MatDialog) { }

    refresh(): boolean {
      return false;
    }
    private gridApi!: GridApi
   
    private params: any;
  
    agInit(params: any): void {
      this.params = params;
    }
  
 
    UpdateUser(): void{  
      
      // console.log(this.gridApi.getSelectedRows())
     console.log(this.params.data.name);
     let user={}as User
      user.name=this.params.data.name
      user.email=this.params.data.email
      user.productName=this.params.data.productName
      user.userStartDate=this.params.data.userStartDate
      user.userEndDate=this.params.data.userEndDate
      user.id=this.params.data.id
      user.pws=this.params.data.pws
      this.url.update(user).subscribe(res=>{
        console.log(res);
        this.validation(res.responseCode,res.responseDescription)
        this.reload
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
  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl('view');
  }
 
  }
  interface User{
    id:String,
    email:String,
    name:String,
    productName:String,
    userEndDate:any,
    userStartDate:any,
    pws:String

  }
  