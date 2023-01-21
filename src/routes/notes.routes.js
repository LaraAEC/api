const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();

const notesController = new NotesController(); //instanciando a classe. Toda classe precisa ser instaciada para ser usada.

//ESTA É A CONTINUAÇÃO DO ENDEREÇO (3).
notesRoutes.get("/", notesController.index); // método GET - aciono a funcionalidade Index que lista todas as Notas de um usuário. Passo o user_id por uma query (poderia ter sido por params como em create) e aplico o método Index que me retorna essa listagem de notas.
notesRoutes.post("/:user_id", notesController.create); //método POST (passo conteúdo para o BD, crio a Nota), passo o id do usuário(a nota é vinculada a ele e vou precisar dele na funcionalidade para criar o campo user_id que a table notes deve conter conforme projeto),  aplico o método create em notesController.
notesRoutes.get("/:id", notesController.show); //método GET (vizualizar nota), passo o id da Nota, e aplico o método show de notesController.
notesRoutes.delete("/:id", notesController.delete); //método DELETE (o usuário busca a deleção de uma nota através desta rota), passo o id da Nota e aplico o método delete em notesController.

module.exports = notesRoutes;
