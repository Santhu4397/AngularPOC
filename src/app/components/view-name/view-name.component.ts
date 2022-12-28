import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-view-name',
  templateUrl: './view-name.component.html',
  styleUrls: ['./view-name.component.css']
})
export class ViewNameComponent implements OnInit {
  data : any= "";
  constructor(
    private activateRoute: ActivatedRoute,private authService:AuthService
  ) { }

  ngOnInit(): void {
    // this.data =  this.authService.UserSubjectValue.value;
    //this.data=this.authService.User.subscribe.name.at 
    console.log("DATA"+this.authService.UserSubjectValue.value)
   
  }

}
