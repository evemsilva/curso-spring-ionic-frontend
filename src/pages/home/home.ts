import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';

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

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  login() {
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');
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
