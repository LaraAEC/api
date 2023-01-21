const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

const tagsController = new TagsController(); //instanciando a classe. Toda classe precisa ser instaciada para ser usada.

//ESTA É A CONTINUAÇÃO DO ENDEREÇO (3).
tagsRoutes.get("/:user_id", tagsController.index); // método GET - aciono a funcionalidade Index que lista todas as Notas de um usuário. Passo o user_id por uma query (poderia ter sido por params como em create) e aplico o método Index que me retorna essa listagem de notas.


module.exports = tagsRoutes;
