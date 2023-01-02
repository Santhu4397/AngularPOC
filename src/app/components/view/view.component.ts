import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import{AgGridAngular} from 'ag-grid-angular';
import { BtnCellRenderer } from 'src/app/demo/BtnCellRenderer';
import { BtnCellRenderer1 } from 'src/app/demo/BtnCellRenderer1';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { APiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']

})
export class ViewComponent implements OnInit {
 

  constructor(private url: APiService ,private router:Router,public appService:AppService,private authService: AuthService, private  http:HttpClient) { 
    this.getUserData()
  }
  public agGrid !: AgGridAngular;
  private gridApi!: GridApi

  ngOnInit(): void {
  }
  columnDefs = [
    // {headerName: 'Id', field: 'id',width:100,checkboxSelection: false},
    {headerName: 'email', field: 'email', suppressSizeToFit: true ,cellStyle: {fontSize: '18px'}},
    {headerName: 'name', field: 'name',suppressSizeToFit: true,cellStyle: {fontSize: '18px'}},
    {headerName: 'Password', field: 'pws',suppressSizeToFit: true,cellStyle: {fontSize: '18px'}},
    {headerName:'productName',field:'productName',suppressSizeToFit: true,cellStyle: {fontSize: '18px'}},
    {headerName:'userStartDate',field:'userStartDate',suppressSizeToFit: true,cellStyle: {fontSize: '18px'}},
    {headerName:'userEndDate',field:'userEndDate',suppressSizeToFit: true,cellStyle: {fontSize: '18px'}},
    {
      field: 'Update',
      cellRenderer:BtnCellRenderer,editable:false,suppressSizeToFit: true ,cellStyle: {fontSize: '18px'}
    },{
      field:'delete',
      cellRenderer: BtnCellRenderer1,editable:false,suppressSizeToFit: true ,cellStyle: {fontSize: '18px'}}
];
rowData = [];
defaultColDef = {
  sortable: true,
  filter: true,
  editable:true

};
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
getUserData(){
  this.url.getAll().subscribe(res=>{
    this.rowData=res.data
});
}




}
