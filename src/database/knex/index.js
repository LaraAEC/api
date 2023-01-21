const config = require("../../../knexfile"); //para receber nossas configurações
const knex = require("knex"); //importando o knex, igual fiz com a biblioteca express

/*Criando a minha conexão e informar que minha conexão é do tipo knex, e vou passar
quais são as configurações de conexão, dentro do meu config temos as configurações de desenvolvimento*/
const connection = knex(config.development);

module.exports = connection;