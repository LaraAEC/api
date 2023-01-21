const path = require("path"); //para que possa lidar mais facilmente com o endereço dos arquivos independente do sistema operacional usando o __dirname
//'__dirname' significa partindo dessa pasta, á ele pega a pasta geral de qualquer operador de sistema linux, IOS, Windows. Uma estratégia para padronizar o início do endereço.

//Arquivo de configuração que o knex deve usar para se conectar com o BD da API
module.exports = {
  development: { //objeto com propriedades de configuração do knex com o nosso banco de dados
    client: 'sqlite3', //digo qual o tipo de BD, para se conectar com nossa base de dados
    connection: { //conexão
      filename: path.resolve(__dirname, "src", "database", "database.db") //em que lugar está o arquivo do meu Banco de Dados
    },
    pool: { //funcionalidade que o que for posto será executado no momento de estabelecer conexão com o BD.
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb) //para habilitar a funcionalidade cascade, que não vem habilidada no BD SQlite.
    },
    migrations: { //o knex tbm consegue utilizar a estratégia de migration e vamos utilizar para automatizar a criação de tabelas em nossa API, então estamos implementando
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations") //em que lugar está minha pasta migrations do knex
    },
    useNullAsDefault: true //é um padrão que se segue
  },
};

/*MIGRATIONS - estratégia para automatizar meu BD e versionar o código, isolar logicas e poder apagá-las sem danificar o todo, versionar o código etc.
As migrations no Knex não precisam ser criadas manualmente um
arquivo igual fizemos na migrations da pasta sqlite, pois 
as do knex são gerenciadas pelo próprio knex.
Nesse passo, colocamos em nossa API, no terminal o código
npx knex migrate:make createNotes (nome dessa migrate),
como vou ceriar a tabela de notas dei esse nome, dei enter
e dentro da pasta migrations esse arquivo da tabela de Notas.
Nesse arquivo que surgiu também vou apagar algumas coisas.
Deixo só os comandos UP e Down. Segue pra lá agora ->


*/
