import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  signupError:string;

  constructor(private modalController:ModalController, private authService:AuthService) {
    this.signupForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
   }

  ngOnInit() {
  }
  signup(){
    this.authService.signup(
      this.signupForm.value.email, this.signupForm.value.password
    ) .then(user=> this.modalController.dismiss()
    ) .catch(
      error=> this.signupError = error.message
    )
  }

}
