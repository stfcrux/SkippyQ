import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isAdmin:boolean = false;
  constructor(private authService:AuthService) {
    this.authService.observeAuthState(user=>{
      if (user && user.email == 'admin@nyp.sg'){
        this.isAdmin = true;
      } else{
        this.isAdmin = false;
      }
    })
  }

}
