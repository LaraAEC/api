require("express-async-errors"); //precisa ser importado antes de tudo da aplicação
const migrationsRun = require("./database/sqlite/migrations"); //Importando minha função migrationsRun() que coloca minhas tabelas no BD criado pela sqliteConnetion()
const AppError = require("./utils/AppError") //vou precisar do Apperror aqui no Server.js


const express = require("express"); //colocando a pasta express (minha biblioteca mais importante em uma API) dentro dessa constante. Essa biblioteca foi baixada via terminal node.js. Ela que me trouxe a pasta node_modules.
const routes = require("./routes"); //colocando a pasta routes dentro dessa constante. Vou precisar das minhas rotas, pois o server.js é quem primeiro recebe a rota solicitada pelo usuário, para dar-lhe encaminhamento ao Controller certo a depender da rota.

migrationsRun();//Primeiro passo no server, executar meu BD através das migrações já definidas no index da pasta migrations, na pasta sqlite

const app = express(); //inicializando o express nessa outra constante, com os parênteses. Instanciando minha biblioteca super importante.

app.use(express.json()); //colocando o express para usar json()

app.use(routes); //colocando o express para usar minhas rotas

app.use((error, request, response, next) => { //Capturando o erro, a requisição, a resposta e o next(precisa ser nessa ordem)
  //verificando se o o erro é do mesmo tipo do apperror, que eu sei qual é pois eu quem fiz, lado do cliente feito lá na pasta utils
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }
    console.error(error); //para conseguir debugar o erro, caso eu precise.
    return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });

});

const PORT = 3333; //definindo minha porta //ESTE É O INÍCIO DO ENDEREÇO (1).
//Informar em que porta ele vai observar, qual endereço que vai atender às solicitações. Em que restaurante o garçom vai trabalhar.
//Qual número da porta que nossa API vai ficar esperando requisições.
//Guardado em uma variávfel separada pois fica mais fácil alteração depois, caso necessário.

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
/*Aqui entra a estória de em que restaurante o meu garçom (API/Express) vai trabalhar. Que ele vai ficar observando quem vai fazer pedido.
fica escutando/observando nessa porta e faz essa função, daí o 'listen'*/