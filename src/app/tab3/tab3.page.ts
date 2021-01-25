import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { SignupPage } from '../signup/signup.page';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userEmail:string;

  constructor(private modalController:ModalController, private authService: AuthService) {
    this.authService.observeAuthState(user=>{
      if(user){
        this.userEmail = user.email
      } else{
        this.userEmail = undefined;
      }
    })
  }

  async login(){
    const modal = await this.modalController.create({
      component: LoginPage
    });
    return await modal.present();
  }

  async signup(){
    const modal = await this.modalController.create({
      component: SignupPage
    });
    return await modal.present();
  }

  logout(){
    this.authService.logout();
  }
}
