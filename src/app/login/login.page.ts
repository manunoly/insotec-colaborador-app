import { UtilService } from './../services/util.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private util: UtilService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['manunoly@gmail.com', [Validators.required, Validators.email]],
      password: ['123456789', [Validators.required,Validators.min(8)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    try {
      await loading.present();
      const user = await this.auth.login(this.loginForm.value);
      await loading.dismiss();
      this.router.navigateByUrl('/inicio', { replaceUrl: true });

    } catch (error) {
        await loading.dismiss();
        this.util.handleError(error);
      }
  }
}
