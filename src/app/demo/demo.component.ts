import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppService } from '../service/app.service';

import { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import{AgGridAngular} from 'ag-grid-angular';
import { BtnCellRenderer } from './BtnCellRenderer';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BtnCellRenderer1 } from './BtnCellRenderer1';
import { Router, RouterModule, Routes } from '@angular/router';



@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
  providers:[AppService]
})
export class DemoComponent implements OnInit {
  title = 'RouteGuardTuts';
isLogin : boolean = false;
    text={name:'santhosh',age:25}
    @Input() titel!: string;
    @Output() sendData: EventEmitter <any> =new  EventEmitter <any>();
    senddata(){
      this.sendData.emit("data transfer")
    }
     result: any;



  constructor(public appService:AppService,private authService: AuthService, private  http:HttpClient,private router:Router) { 
    this.getUserData()
  }

  ngOnInit(): void {
   
  this.authService.User.subscribe((data) => {
    if(data){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  })
  }
  @ViewChild('agGrid', { static: false })

  public agGrid !: AgGridAngular;
  private gridApi!: GridApi
  

  columnDefs = [
    {headerName: 'Id', field: 'id',checkboxSelection: false},
    {headerName: 'email', field: 'email'},
    {headerName: 'name', field: 'name'},
    {headerName:'productName',field:'productName'},
    {headerName:'userStartDate',field:'userStartDate'},
    {headerName:'userEndDate',field:'userEndDate'},
    {
      field: 'Update',
      cellRenderer: BtnCellRenderer,
    },{
      field:'delete',
      cellRenderer: BtnCellRenderer1,
    }
];
 
rowData = [

   
];


defaultColDef = {
  sortable: true,
  filter: true,
  editable:true

};


print(event:any){
console.log(event.target.value)

}
getselected(){
    console.log(this.gridApi.getSelectedRows())
}

onSelectionChanged() {
  const selectedRows = this.gridApi.getSelectedRows();
//console.log(selectedRows)
}

onGridReady(params: GridReadyEvent) {
  this.gridApi = params.api;
}




login() {
  let data = {
    Username: this.text.name,
    Password: this.text.age
  }
  this.authService.SignInUser(data);
}

logout() {
  this.authService.SignOutUser();
  this.router.navigateByUrl('login')
}
getUserData(){
this.http.get("http://localhost:8080/training/demo/").subscribe((data:any)=>{

 console.log(data.data)
 this.rowData = data.data;
 
 })

}
}
