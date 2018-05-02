import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@IonicPage()
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, 
              public menu: MenuController,
              public authService: AuthService) {

  }

  login() {
    this.authService.autenticate(this.creds)
      .subscribe(
        response => {
          this.authService.successfulLogin(response.headers.get("Authorization"));
          this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});
  }

  ionViewDidEnter(){
    this.authService.refreshToken()
      .subscribe(
        response => {
          this.authService.successfulLogin(response.headers.get("Authorization"));
          this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

  // Quando pagina home entrar, desabilita menu
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  // Quando pagina home sair, habilita menu
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

}
