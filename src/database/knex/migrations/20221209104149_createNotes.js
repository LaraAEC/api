// MIGRATE createNotes ('notes') - Fazendo minha tabela de Notes utilizando o KNEX(seu aqruivo principal está na raiz do projeto).

//Up - processo de criar a tabela (comando Migrations)
exports.up = knex => knex.schema.createTable('notes', table => {
  table.increments("id"); //campo incremental chamado id
  table.text("title"); //campo do tipo texto chamado title
  table.text("description"); //campo do tipo texto chamado description
  table.integer("user_id").references("id").inTable("users"); //campo do tipo número inteiro chamado user_id

  table.timestamp("created_at").default(knex.fn.now()); //campo tipo timestamp chamado de created_at, com padrão usando uma função do knex que dá o tempo atual
  table.timestamp("updated_at").default(knex.fn.now()); //campo tipo timestamp chamado de updated_at, com padrão usando uma função do knex que dá o tempo atual
}); 

//DOWN - (comando migrations) processo de deletar a tabela, passo apenas o nome da tabela
exports.down = knex => knex.schema.dropTable('notes'); //'notes' é o nome da tabela 

/*
Troquei as expressões function(knex), pelo formato que vc está
podendo ver no código UP e Down acima descrito - arrow function.
Uma migration tem sempre um up(create) e um down(drop).
Após preencher os campos da criação da tabela com nome de
campo e tipo do campo, vamos efetivamente gerar essa tabela
de fato, como fazemos para executar isso no nosso BD.
Para eu rodar e pedir para criar no banco faço no terminal:
'npx knex migrate:latest' dê enter e ele vai rodar a migration.
E elas estará criada  no BD, pode vizulizar no Beekeeper.
Mas criamos um novo script, o migrate: knex migrate:latest,
lá no package.json para facilitar a execução das migrations
e sua criação das tabelas no BD. 
Agora o comando para rodar minha migrate no terminal
será 'npm run migrate'.


*/ 