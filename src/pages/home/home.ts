import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Room } from '../room/room';
import { Records } from '../records/records';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public  navCtrl  : NavController  , public platform : Platform, 
              private toastCtrl: ToastController, public navParams: NavParams, 
              private alertCtrl: AlertController) {
  }

  exibirRecordes() {
    this.navCtrl.push(Records);
  }

  exibirCreditos() {
  let alert = this.alertCtrl.create({
    title: 'Creditos',
    message: 'Desenvolvido por Mario, Beatriz, Wagner, João e Gabriel',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          console.log('Ok clicked');
        }
      }
    ]
  });
  alert.present();
}

  iniciarApp() {
  let alert = this.alertCtrl.create({
    title: 'Nome',
    inputs: [
      {
        name: 'nome',
        placeholder: 'Insira seu nome'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Iniciar',
        handler: data => {
          if(data.nome == ""){
            return false;
          }
          this.navCtrl.setRoot(Room, {nome: data});
        }
      }
    ]
  });
  alert.present();
}

  exibirToast(mensagem: string) : void{
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  exitApp() : void {
    this.exibirToast("Saindo");
    this.platform.exitApp();
  }

}
