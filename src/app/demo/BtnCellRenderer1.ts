import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {  Router } from "@angular/router";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { ViewComponent } from "../components/view/view.component";

import { APiService } from "../service/api.service";
import { AuthService } from "../service/auth.service";

@Component({
    selector: 'btn-cell-renderer1',
    template: `
      <button (click)="getData()" style="background-color:red;border-radius: 10px; cursor: pointer; color:white;font-size: inherit; outline: auto;">delete</button>
    `
  })
  export class BtnCellRenderer1 implements ICellRendererAngularComp  {
    constructor(private _snackBar: MatSnackBar,private url:APiService ,
      private  http:HttpClient,private router:Router,
      private authService:AuthService,private view:ViewComponent) { }
    refresh(): boolean {
      return false;
    }
  
    private gridApi!: GridApi;
    private params: any;
    private data :any;
  
    agInit(params: any): void {
      this.params = params;
    }
    getData(): void{  
      // console.log(this.gridApi.getSelectedRows())
     console.log(this.params.data.name);
     this.authService.User.subscribe(data=>{
        this.data=data
     })
     if(this.data!=null){
     this.url.deleteUser(this.params.data.name).subscribe(res=>{
      console.log(res);
      this.validation(res.responseCode,res.responseDescription)
      //this.reload
      this.view.getUserData()
      this.router.navigateByUrl('view')
      },err=>{
        this.validation(err.status,err.error.responseDescription)
    });
  }else{
    this.validation('0','Login To Delete the data')
  }
  }
   validation(statusCode:String,message:string){
          
      if(statusCode=='200'){
        
        this.router.navigateByUrl('view')
        this.openSnackBar(message, 'X')
    
        }else{
          this.openSnackBar(message,'X')
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