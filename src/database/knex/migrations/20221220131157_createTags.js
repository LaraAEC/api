// MIGRATE createTags ('tags') - Fazendo minha tabela de Tags utilizando o KNEX(seu aqruivo principal está na raiz do projeto).
//UP - processo de criar a tabela
exports.up = knex => knex.schema.createTable('tags', table => {
  table.increments("id"); //campo incremental chamado id
  table.text("name").notNullable(); //campo do tipo texto chamado name / e não aceita ser nulo
  
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); //campo do tipo número inteiro chamado note_id / função que determina que se eu deletar a nota que essa tag está vinculada, tbm será deletada a tag (não faz mais sentido existirem)
  table.integer("user_id").references("id").inTable("users"); //campo do tipo número inteiro chamado user_id, que é uma referência ao id da tabela users.
  
}); 

//DOWN - processo de deletar a tabela, passo apenas o nome da tabela
exports.down = knex => knex.schema.dropTable('tags'); 


/*
O intuito das tags é fazer uma filtragem nas notas em
uma suposta busca. Ela é criada por um usuário.
Uma tag também vai estar vinculada a um usuário e uma
nota. O efeito cascade na função onDelete() faz com que
se as notas forem deletadas deleta as tags vinculadas
a ela em cascata.
Isso garante consitência ao nosso Banco para não
ficarem tags perdidas sem estarem vinculadas a ninguém.
*/