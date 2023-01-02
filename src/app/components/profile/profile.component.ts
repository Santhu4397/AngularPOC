import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { AuthService } from 'src/app/service/auth.service';
import { BehaviorSubjectService } from 'src/app/service/behaviorsubjectservice';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService:AuthService,private behaviorService:BehaviorSubjectService) { }

  ngOnInit(): void {
   
    this.profile()
    
  }
  
  name!:String
  emailId!:String
  pws!:String
  product!:String
  profile(){ 

  // this.authService.User.subscribe((data)=>{ 
  //   console.log("userdata",data)
  //   this.name=data.name
  //   this.emailId=data.email
  //   this.product=data.productName
  //   this.pws=data.pws
  // })
  this.behaviorService.loginUserData.subscribe((data)=>{
    console.log("userdata",data)
    this.name=data.name
    this.emailId=data.email
    this.product=data.productName
    this.pws=data.pws
  })
    

  }
  

}
