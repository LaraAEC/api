//Automatizando a criação da tabela, do conteúdo do meu Banco de Dados, usando código SQL intercalado com JS dentro do Node.js em minha API.
//Interpolação para usar código SQL com código Javascript.
//Criando minha tabela que comporá meu BD, dentro da minha própria API. Se fizesse através do SGBD ficaria só na minha máquina, teria que ficar refazendo na raça ao abrir a API em outro lugar.
const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR,
  avatar VARCHAR NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)
`;

module.exports = createUsers; //exportando minha tabela para ser usada no index desta pasta migrations.

