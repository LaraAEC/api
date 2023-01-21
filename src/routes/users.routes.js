const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const  usersRoutes = Router();

const usersController = new UsersController(); //instanciando a classe. Toda classe precisa ser instanciada para ser usada.

//ESTA É A CONTINUAÇÃO DO ENDEREÇO (3).
usersRoutes.post("/", usersController.create); //uso está rota para me encaminhar para a funcionalidade que irá criar a table Users.
usersRoutes.put("/:id", usersController.update); //uso está rota para me encaminhar para a funcionalidade que irá atualizar algum dado da table Users, já criada, por isso preciso passar o id desse usuário para fazer a alteração na pessoa certa, vou usar esse id na funcionalidade do Controler que é responsável pelo update.

module.exports = usersRoutes;
