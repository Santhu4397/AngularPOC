import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {  Router } from "@angular/router";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';

import { APiService } from "../service/api.service";

@Component({
    selector: 'btn-cell-renderer1',
    template: `
      <button (click)="getData()" style="background-color:red;border-radius: 10px; cursor: pointer; color:white;font-size: inherit; outline: auto;">delete</button>
    `
  })
  export class BtnCellRenderer1 implements ICellRendererAngularComp  {
    constructor(private _snackBar: MatSnackBar,private url:APiService ,private  http:HttpClient,private router:Router) { }
    refresh(): boolean {
      return false;
    }
  
    private gridApi!: GridApi
   
    private params: any;
  
    agInit(params: any): void {
      this.params = params;
    }
    getData(): void{  
      // console.log(this.gridApi.getSelectedRows())
     console.log(this.params.data.name);
     this.url.deleteUser(this.params.data.name).subscribe(res=>{
      console.log(res);
      this.validation(res.responseCode)
      this.reload
      },err=>{
        this.validation(err.status)
    });
  }
  validation(statusCode:String){
        
    if(statusCode=='201'){
      
      this.router.navigateByUrl('view')
      this.openSnackBar('Updated Successfully', 'X')
  
      }else if(statusCode=='400'){
        this.openSnackBar('Entered wrong value ', 'X')
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