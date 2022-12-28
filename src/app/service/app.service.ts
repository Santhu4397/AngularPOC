import { Injectable } from "@angular/core";
@Injectable()
export class AppService{
        count =5;
        constructor(){

        }
         increment(){
            this.count++
         }
}