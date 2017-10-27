
export class Questoes {
  perguntas: Array<any>;
  private PerguntasRespostas: Array<String>;
  questao: Array<String>;
  private indicesRetirados: Array<Number>;

  constructor() {
    this.perguntas = [];
    this.indicesRetirados = [];
    this.questao = [];

    this.PerguntasRespostas = ["Onde nasce o capixaba?"       , "Espírito Santo"    , "Onde nasce o potiguar?"        , "Rio Grande do Norte",
                               "Onde nasce o cearense?"       , "Ceará"             , "Onde nasce o barriga-verde?"   , "Santa Catarina"     ,
                               "Onde nasce o gaúcho?"         , "Rio Grande do Sul" , "Onde nasce o candango?"        , "Distrito Federal"   ,
                               "Onde nasce o fluminense?"     , "Rio de Janeiro"    , "Onde nasce o tingui?"          , "Piauí"              ,
                               "Onde nasce o montanhês?"      , "Minas Gerais"      , "Onde nasce o bandeirante?"     , "São Paulo"          ,
                               "Onde nasce o fortalezense?"   , "Fortaleza"         , "Onde nasce o rio-branquense?"  , "Rio Branco"         ,
                               "Onde nasce o maceioense?  "   , "Maceió"            , "Onde nasce o macapaense?"      , "Macapá"             ,
                               "Onde nasce o manauara?"       , "Manaus"            , "Onde nasce o soteropolitano?"  , "Salvador"           ,
                               "Onde nasce o vitoriense?"     , "Vitória"           , "Onde nasce o goianiense?"      , "Goiânia"            ,
                               "Onde nasce o ludovicense?"    , "São Luís"          , "Onde nasce o cuiabano?"        , "Cuiabá"             ,
                               "Onde nasce o belenense?"      , "Belém"             , "Onde nasce o campo-grandense?" , "Campo Grande"       ,
                               "Onde nasce o pessoense?"      , "João Pessoa"       , "Onde nasce o recifense?"       , "Recife"             ,
                               "Onde nasce o teresinense?"    , "Teresina"          , "Onde nasce o papa-jerimum?"    , "Natal"              ,
                               "Onde nasce o porto-velhense?" , "Porto Velho"       , "Onde nasce o palmense?"        , "Palmas"             ,
                               "Onde nasce o aracajuano?"     , "Aracaju"           , "Onde nasce o caucaiense?"      , "Caucaia"            ,
                               "Onde nasce o juazeirense?"    , "Juazeiro do Norte" , "Onde nasce o santista?"        , "Santos"              ];

    for (let i = 0; i < this.PerguntasRespostas.length; i = i + 2) {
      this.perguntas.push({
        pergunta: this.PerguntasRespostas[i],
        resposta: this.PerguntasRespostas[i + 1]
      });
    }  
    
    this.questao = this.retornaQuestao();
  }

  randomize(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomizaPerguntas(): Array<number> {

    let indices: Array<number> = [0, 0, 0, 0];
    let i = 1, numero = 0, flag = 0;
    let indicesErrados: Array<number> = [];

    console.log(this.perguntas.length);
    console.log(this.indicesRetirados);

    indices[0] = this.randomize(0, this.perguntas.length - 1);

    while(this.indicesRetirados.indexOf(indices[0]) != -1){
      indices[0] = this.randomize(0, this.perguntas.length - 1);
    }
    this.indicesRetirados.push(indices[0]);

    do {
      flag = 0;
      numero = this.randomize(0, this.perguntas.length - 1);

      if(numero == indices[0] || indicesErrados.indexOf(numero) != -1) flag = 1;
      if (flag == 0) {
        indicesErrados.push(numero);
        indices[i] = numero;
        i++
      }
    } while (i < 4);

    return indices;
  }

  getFim() : boolean {
    if(this.perguntas.length == this.indicesRetirados.length){
      return true;
    }
    return false;
  }

  retornaQuestao(): Array<String>{
    let indicePerguntas: Array<any> = this.randomizaPerguntas();
    let questao: Array<String> = [];

    questao.push(this.perguntas[indicePerguntas[0]].pergunta);
    questao.push(this.perguntas[indicePerguntas[0]].resposta);
    questao.push(this.perguntas[indicePerguntas[1]].resposta);
    questao.push(this.perguntas[indicePerguntas[2]].resposta); 
    questao.push(this.perguntas[indicePerguntas[3]].resposta);   

    return questao;
  }

}

