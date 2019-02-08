import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {api} from './tools';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user:any={}

  constructor(public http: HttpClient) { }


  public askforappointment(dt:number){
    return this.http.get(api("askforappointment","email="+this.user.email+"&dt="+dt))
  }

  public getappointments(){
    return this.http.get(api("getappointments","email="+this.user.email))
  }

  public init(email:string=null,func=null){
    if(email==null)email=this.user.email;
    return this.http.get(api("getuser","email="+email)).subscribe((r)=>{
      this.user=r;
      if(func!=null)func();
    });
  }

  logout() {
    localStorage.removeItem("login");
    localStorage.removeItem("email");
    this.user={};
  }

  addgift(id: string) {
    return this.http.get(api("addgift","email="+this.user.email+"&gift="+id));
  }
}