import { User } from './../../models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

   user:User;

  constructor(public authSvc:FirebaseauthService,
    private router: Router) {}

  async ngOnInit() {
    // this.authSvc.stateAuth().subscribe(res=>{
    //   if(res === null){
    //     console.log('No has inicido sesión')
        
    //   }else{
    //     if (res.uid === 'xqdLNQILCaeJ6NQaaGrfb11FErd2') {
    //       this.router.navigate(['admin']);
    //     }
    //     else{
    //       this.router.navigate(['tabs/lista']);
    //     }
    //   }
    // });
  }

  async onLoginGoogle(){
    try{
      this.user = await this.authSvc.login();
      if (this.user) {
        console.log('user->', this.user.uid);
        //this.redirectUser(this.user.uid);
        this.redirectUser(this.user.uid);
      }
    }catch (error){
      console.log('Error->', error);
      
    }
  }

  async testMode(){
    try{
      this.user = await this.authSvc.login();
      if (this.user) {
        console.log('user->', this.user.uid);
        //this.redirectUser(this.user.uid);
        this.redirectPrueba();
      }
    }catch (error){
      console.log('Error->', error);
      
    }
  }

  private redirectUser(user_id:string){
    //redirect -> admin
    if (user_id == 'xqdLNQILCaeJ6NQaaGrfb11FErd2') {
      this.router.navigate(['admin']);
    }
    else{
      this.router.navigate(['tabs/lista']);
    }
  }

  private redirectPrueba(){
    this.router.navigate(['tabs']);
  }

   



}
