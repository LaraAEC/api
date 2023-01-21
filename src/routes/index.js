const { Router } = require("express");

const usersRouter = require("./users.routes");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");

const routes = Router();

//ESTA É A CONTINUAÇÃO DO ENDEREÇO (2)
routes.use("/users", usersRouter); //se usarem o endereço /users redireciono para o arquivo usersRouter. Aperte CRTL +click no arquivo e vá para ele.
routes.use("/notes", notesRouter); //se usarem o endereço /notes redireciono para o arquivo notesRouter. Aperte CRTL +click no arquivo e vá para ele.
routes.use("/tags", tagsRouter); //se usarem o endereço /tags redireciono para o arquivo tagsRouter. Aperte CRTL +click no arquivo e vá para ele.

module.exports = routes;