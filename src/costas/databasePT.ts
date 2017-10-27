import { SQLite, SQLiteObject } from '@ionic-native/sqlite'; //Native componente

const DATABASE_FILE_NAME : string = 'data.db';  //nome do arquivo de banco de dados

export class Database {

    private sqlite      : SQLite = new SQLite(); //instancia do SQLITE
    private db          : SQLiteObject;          //controladora do banco
    private pontuacoes  : Array<any> = [];         //lista com as pontuacoes da tabela

    //construtor
    constructor(successCallback) {
        this.pontuacoes = [];
        this.criarDatabase(() => {
            successCallback();
        });
    }

    //cria ou abre banco de dados data.db
    criarDatabase(successCallback) : void {
        this.sqlite.create({
            name: DATABASE_FILE_NAME,   //acessa o banco constante da classe
            location: 'default'
        }).then((db: SQLiteObject) => {
            console.log("Banco Criado");
            this.db = db;               //passa o banco acessado para atributo da classe
            successCallback();
        }).catch(e => console.log(e));  //exibicao de erro no console caso ocorra
    }

    //cria tabela no banco de dados
    criarTabela(successCallback) : void {
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `PONTOS` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `nome` TEXT NOT NULL, `pontos` INTEGER NOT NULL) ', {})
        .then(() => {
            console.log("Tabela Criada");
            successCallback();
        })
        .catch(e => console.log(e));//exibicao de erro no console caso ocorra
    }

    //insere pontos na tabela
    inserirPontos(recordeUsuario : any, successCallback) : void {
        let nome = recordeUsuario.nome;
        let pontos = recordeUsuario.pontos;

        //this.db.executeSql('INSERT INTO `PONTOS` (id, nome, pontos) VALUES ('+ id +', \' ' + nome + '\', '+ pontos +' )', {})
        this.db.executeSql('INSERT INTO `PONTOS` (nome, pontos) VALUES (?,?)', [nome, pontos])
        .then(() => {
            console.log("Recorde Inserido");
            successCallback();
        })
        .catch(e => console.log(e));  //exibicao de erro no console caso ocorra
    }

    //atualiza tabela de pontos
    atualizarPontos(recordeUsuario : any, id : number, successCallback) : void {
        let nome = recordeUsuario.nome;
        let pontos = recordeUsuario.pontos;

        this.db.executeSql('UPDATE `PONTOS` set `nome` = ? `pontos` = ? WHERE id = ?', [nome, pontos, id])
        .then(() => {
            console.log("Recorde Atualizado");
            successCallback();
        })
        .catch(e => console.log(e));  //exibicao de erro no console caso ocorra
    }

    //deleta pontos especifica da tabela
    deletarPontos(recordeUsuario: any, successCallback) : void {
        let id = recordeUsuario.id;
        this.db.executeSql('DELETE FROM `PONTOS` WHERE `id` = ?', [id])
        .then(() => {
            successCallback();
        })
        .catch(e => console.log(e));  //exibicao de erro no console caso ocorra
    }

    listarPontuacoes(successCallback) : void {
        this.db.executeSql('SELECT * FROM `PONTOS`', {})
        .then((data) => {
            if(data.rows.length > 0) {
                for(let i = 0; i < data.rows.length; i++) {
                    this.pontuacoes.push({
                        id:          data.rows.item(i).id,
                        nome:        data.rows.item(i).nome,
                        pontos:      data.rows.item(i).pontos
                    });
                }
                successCallback(this.pontuacoes);
            }
        })
        .catch(e => console.log(e));  //exibicao de erro no console caso ocorra
    }
}