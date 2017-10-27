import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Questoes } from '../../costas/questoes';
import { HomePage } from '../home/home';

import { Database } from '../../costas/databasePT';

@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})

export class Room {

  private database  : Database;
  private questoes  : Questoes;
  private nome      : string;
  private pontos    : number;
  private pergunta  : String;
  private resCerta  : String;
  private itens     : Array<String>;
  private respostas : Array<String> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.database = new Database(() => {
      console.log("Tabela Acessada em Room");
    });
    this.nome = navParams.get('nome').nome;
    console.log(this.nome);
    this.questoes = new Questoes();
    this.proximaPergunta();
    this.pontos = 0;
  }

  inserirRecorde(recorde: any): void {
    this.database.inserirPontos(recorde, () => {
      console.log("Recorde Inserido");
    });
  }

  randomizarRespostas() : void {
    for (let i = this.respostas.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [this.respostas[i - 1], this.respostas[j]] = [this.respostas[j], this.respostas[i - 1]];
    }
  }

  verificarResposta(resposta) : void {
    if(resposta == this.resCerta) {
      this.pontos = this.pontos + 10;
      this.proximaPergunta();
    }else{
      this.gameover();
    }
  }

  proximaPergunta() : void {
    if(this.questoes.getFim()){
      this.gameover();
    }else{
      this.itens     = [];
      this.respostas = [];
      this.itens     = this.questoes.retornaQuestao();
      this.pergunta  = this.itens[0];
      this.resCerta  = this.itens[1];
      this.respostas.push(this.itens[1]);
      this.respostas.push(this.itens[2]);
      this.respostas.push(this.itens[3]);
      this.respostas.push(this.itens[4]);
      this.randomizarRespostas();
    }
  }

  gameover() : void {
    let alert = this.alertCtrl.create({
    title: 'Fim de Jogo',
    message: this.nome + ' você obteve ' + this.pontos + ' pontos!',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          console.log('Voltando ao menu');
          //this.navCtrl.setRoot(HomePage);
        }
      }
    ]
    });
    alert.present();

    //atualizarBanco
    if(this.pontos != 0){
      this.inserirRecorde({nome: this.nome, pontos: this.pontos});
    }

    alert.onDidDismiss(() => {
      this.navCtrl.setRoot(HomePage);
    });
      
  }

}
