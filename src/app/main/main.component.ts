import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:  [ UserService ]
})
export class MainComponent implements OnInit {

  waiting=false;
  public user:any={};
  bigScreen=true;

  constructor(bkob:BreakpointObserver,public api:ApiService,public userService:UserService,public router:Router,public config:ConfigService,public route:ActivatedRoute) {
    bkob.observe([Breakpoints.Handset,Breakpoints.TabletPortrait,Breakpoints.WebPortrait]).subscribe((result)=>{
        this.bigScreen =!result.matches;
    });


  }

  ngOnInit() {
    this.waiting=true;
    this.userService.init(localStorage.getItem("email"),()=>{
      this.api.login(localStorage.getItem("email"),localStorage.getItem("password")).subscribe((r)=>{
        this.waiting=false;
        if(r==null){
          this.userService.user={};
          localStorage.removeItem("email");
        }
        else{
          this.route.queryParams.subscribe((params)=>{
            let command=params['command'];
            if(command=="mark")
              setTimeout(()=>{
                this.router.navigate(["works"],{ queryParams: { command: command} })
              },1000)
          })
        }
      })
    },()=>{
      this.router.navigate(["anonymous"]);
    });
  }


}
