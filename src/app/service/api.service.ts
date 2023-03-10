import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable()
export class APiService{

    constructor(private http:HttpClient){

    }

    saveUser(data:any): Observable<any>{
        return this.http.post("http://localhost:8080/training/demo/user",data)
    }
    login(email:String,pws:String): Observable<any>  {
        return this.http.get("http://localhost:8080/training/demo/login/"+email+"/"+pws)
    }
    getAll(): Observable<any>{
        return this.http.get("http://localhost:8080/training/demo/")
    }

    update(data:any): Observable<any>{
        return this.http.put("http://localhost:8080/training/demo/updateuser",data)
    }
    deleteUser(name:String): Observable<any>{
        return  this.http.delete(`http://localhost:8080/training/demo/deleteuser/`+name)
    }
}
