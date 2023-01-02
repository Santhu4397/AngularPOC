import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class BehaviorSubjectService {
    loginUserData!: BehaviorSubject<any>;
    updateUserData!:BehaviorSubject<any>;
        constructor(){
            this.loginUserData=new BehaviorSubject<any>(null)
            this.updateUserData=new BehaviorSubject<any>(null)
        }


    setLoginUserData(data:any){
        this.loginUserData.next(data)
    }
    setUpdateUserData(data:any){
        this.updateUserData.next(data)
    }
      
  
}