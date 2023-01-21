//Já instalado o sqlite e sqlite3(através do terminal node.js), chamo eles para uso neste arquivo para juntar minha API com o meu Banco de Dados.
//Vou usar essa conexão no index da pasta migrations (sqlite) onde vou juntar todas as tabelas e pedir que esta função as conecte com meu BD, criando-o de modo automatizado.

const sqlite3 = require("sqlite3");//drive que vai de fato estabelecer a comunicação com a base de dados, é a versão do BD.
const sqlite = require("sqlite");//responsável por conectar
const path = require("path"); //essa biblioteca já vem no Node.js, resolve os endereços de acordo com o ambiante
const { dirname } = require("path");

async function sqliteConnection() { //assíncrona pois demora tem a ver com conexão.
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"), //criei um arquivo chamado database.db na pasta database
    driver: sqlite3.Database
  });

  return database;
}

module.exports = sqliteConnection; //exportando minha função para ser usada em toda minha API.

//SGBD = Sistema Gerenciador de Banco de Dados (ferramenta para vizualização do que está dentro do BD, inclusão e deleção de registros e etc).