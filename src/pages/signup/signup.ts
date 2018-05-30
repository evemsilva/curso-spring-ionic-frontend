import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

    this.formGroup = this.formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['82153079063', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua Via', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apartmento 3'],
      bairro: ['Copacabana'],
      cep: ['09230700', [Validators.required]],
      telefone1: ['11967653467', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  signupUser() {
    let loader = this.presentLoading();
    this.clienteService.insert(this.formGroup.value)
      .subscribe(
        response => {
          loader.dismiss();
          this.showInsertOk();
      },
        error => {
          loader.dismiss();
        }
      );
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(
        response => {
          this.estados = response;
          this.formGroup.controls.estadoId.setValue(this.estados[0].id);
          this.updateCidades();
        },
        error => { }
      );
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(
        response => {
          this.cidades = response;
          this.formGroup.controls.cidadeId.setValue(null);
        },
        error => {}
      );
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
