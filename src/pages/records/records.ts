import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite'; //Native componente

import { Database } from '../../costas/databasePT';

@Component({
  selector: 'page-records',
  templateUrl: 'records.html',
})

export class Records {

  private database: Database;
  private recordes: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.database = new Database(() => {
      this.database.criarTabela(() => {
        this.database.listarPontuacoes((recordes) => {
          this.recordes = recordes;
          this.ordenar();
          this.limitarVinte();
        });
      });
    });

  }

  ordenar(): void {
    this.recordes.sort(function(a,b) {
      return a.pontos < b.pontos ? -1 : a.pontos > b.pontos ? 1 : 0;
    });
    this.recordes = this.recordes.slice(0).reverse();
  }

  limitarVinte(): void{
    let removido: any;
    if(this.recordes.length > 20) {
      removido = this.recordes.pop();
      this.database.deletarPontos(removido, () => {
        console.log("Recorde Deletado");
      });
    }
  }

}
