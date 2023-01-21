const sqliteConnection = require('../../sqlite'); //importando minha conexão do arquivo indexs.js da pasta sqlite.
const createUsers = require('./createUsers'); //importando meus dados do BD, minha tabela criada no arquivo createUsers.js.

//criando uma função para executar as migrações, que é o propósito deste index.js da pasta migrations.
async function migrationsRun() { //função assíncrona, pois lida com conexão.
  //primeiro crio um objeto chamado 'schemas' para me referir as tabelas que o BD vai ter. Por isso vou colocar em um vetor/lista, para facilitar o uso de todos depois.
  //usando o '.join' para juntar todas as minhas migrações, e juntando elas, usei como parâmetro pra juntar nada, mas podia ser uma vírgula..
  const schemas = [
    createUsers
  ].join(''); 

  //já com a lista das tabelas da API, chamo o 'sqliteConnection()' e uso uma 'promise', um '.then', e coloco uma 'arrow function'.
  sqliteConnection() //vai me entregar meu BD, return a constante database.
  .then(db => db.exec(schemas)) //recebe o return da função e pede que ele execute meus esquemas/migrações do meu Banco de Dados
  .catch(error => console.error(error)); //se der erro vou tratar esse erro e dar console pra ficar claro
}

module.exports = migrationsRun; //exportando essa função que executa a criação automatizada do conteúdo do BD.

//Nesse passo junto todas as tabelas criadas e as executo tendo assim a criação automática do meu BD em qualquer máquina que abrir a API.