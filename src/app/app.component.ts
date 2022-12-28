import { Component, Input, ViewChild, ɵisObservable } from '@angular/core';
import { Observable ,of} from 'rxjs';

import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: '/app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  titel='@input()'
  

  receivingData(event:any){
    console.log(event)
  }
  constructor(private authService: AuthService){
    var obs$:Observable<any>= of(1,2,3);
    obs$.subscribe(x=>console.log(x))
  }

  
  


  
  title = 'RouteGuardTuts';
  isLogin : boolean = false;
  
  ngOnInit(){
    this.authService.User.subscribe((data) => {
      if(data){
        this.isLogin = true;
      }else{
        this.isLogin = false;
      }
    })
  }

  login() {
    let data = {
      Username: "Mayur Kadam",
      Password: "HelloWorld"
    }
    this.authService.SignInUser(data);
  }

  logout() {
    this.authService.SignOutUser();
  }
}
