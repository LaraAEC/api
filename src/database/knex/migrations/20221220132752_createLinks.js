// MIGRATE createLinks ('links') - Fazendo minha tabela de Links utilizando o KNEX(seu aqruivo principal está na raiz do projeto).
//UP - processo de criar a tabela
exports.up = knex => knex.schema.createTable('links', table => {
  table.increments("id"); //campo incremental chamado id
  table.text("url").notNullable(); //campo do tipo texto chamado url / e não aceita ser nulo
  
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); //campo do tipo número inteiro chamado note_id / função que determina que se eu deletar a nota que esse link está vinculado, tbm será deletado o link (não faz mais sentido existirem)
  table.timestamp("created_at").default(knex.fn.now()); //campo tipo timestamp chamado de created_at, com padrão usando uma função do knex que dá o tempo atual
}); 

//DOWN - processo de deletar a tabela, passo apenas o nome da tabela
exports.down = knex => knex.schema.dropTable('links'); 

/*Detalhe o intuito dos campos created_at é para organizar
os links, tags etc levando em consideração sua
ordem de criação.

Se a nota for deletada, deleta os links vinculados a ela.

Ao final, dê o comando no terminal para rodar sua migrate.
Posso fazer várias, e dar o camando uma só vez, ele roda
todas que ainda não foram rodadas, isto é, que ainda não
foram geradas no BD. Roda no terminal e vai no SGBD vizualizar seu Banco.
*/