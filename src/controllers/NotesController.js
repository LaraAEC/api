//A criação dessas tabelas já se iniciou desde as Migrates na pasta knex. Aqui estou mais é inserindo os dados.
const knex = require("../database/knex"); //importando o knex, o seu index.js

class NotesController{
  async create(request, response) { //método para um user criar uma Nota, inserindo dados. Passo o request e o response vou semopre estar trabalhando com eles, este é o objetivo.
    const { title, description, tags, links } = request.body; //primeiro vou desestruturar esse valores que estão sendo passados pelo body em formato json.
    const { user_id } = request.params;
    
    //Recebendo meus campos title, description e user_id e inserindo em minha tabela Notes. Coloco todos eles, em formato de um objeto, em uma constante.
    const note_id = await knex("notes").insert({ //quando eu cadastro (aqui estou criando a nota com o knex), quando executo esse insert, ele me devolve o ID da nota que foi gerada, pois usei o autoincrement, e estou guardando esse id da nota nessa constante para usá-lo nas duas tabelas a ela vinculada.
      title,
      description,
      user_id
    });

    //O conteúdo de uma nota é feito pelo seu ID, pelo title, pela description, pelas tags e pelos links.
    //Para cadastrar tags e links, cujos valores vem no corpo da nota no request, preciso do id da nota, por isso antes capturamos esse valor.

    //Agora vou passar os links que quero inserir na tabela Links, em forma de objeto. Coloco esse objeto dentro dessa constante inserir links.
    const linksInsert = links.map(link => { //percorro a lista de links recebida via request e para cada item (link) executo a seguinte função.
      return { //estou criando um objeto novo aqui que me retorna  o note_id e que tranforma o link em uma URL
        note_id, //campo com o id da tabela Notes a qual essa tabela links está vinculada.
        url: link //transforma link em URL, aqui uma propriedade url que recebe o valor do link
      }
    });

    await knex("links").insert(linksInsert); // Passando para minha tabela links os links inseridos, e será inserida essa informação.

    //Agora vou passar as tags que quero iserir na tabela Tags, em forma de objeto. Coloco esse objeto dentro dessa constante inserir tags.
    const tagsInsert = tags.map(name => { //percorro a lista de tags, recebida via request, e, para cada item (tag) executo a seguinte função.
      return { //estou criando um objeto novo aqui que me retorna  os itens abaixo.
        note_id, //campo com o id da tabela Notes a qual essa tabela tags está vinculada.
        name,
        user_id //quando criei a table users tbm guardei seu id pois existem tabelas que são vinculadas a ela e iriam precisar ter esse id_user como chave estrangeira.
      }
    });

    await knex("tags").insert(tagsInsert); //Passando para minha tabela Tags, as tags inseridas; e será inserida essa informação.

    response.json(); //enviando tudo isso como resposta json. Não passo nada por aqui, apenas fiz as ações de insert em meu BD.

  }

  async show (request, response) { //método para vizualizar uma Nota através de seu ID, com suas tags e links vinculadas. Aqui passo tbm o request e o response
    const {id} = request.params; //recupero o id da Nota que desejo mostrar, desestruturando.

    const note = await knex("notes").where({ id }).first(); //usando o knex, pego a table Notes e seleciono a nota buscando com o filtro where passando seu id, e pedindo apenas uma, first(), pois buscaremos uma por vez.
    const tags = await knex("tags").where({ note_id: id }).orderBy("name"); //Selecionando as tags vinculadas a essa nota (para visualização). Em table tags pegar a tag cujo seu campo note_id seja igual ao id dessa nota que foi pedida para ser vista via parâmetro. E, com o orderBy("name") coloco em ordem alfabética.
    const links = await knex("links").where({ note_id: id }).orderBy("created_at"); //Fazendo com os links da mesma forma que foi feito com as tags. Só a ordem que pedi pela data de criação.

    //respondendo enviando via json a note, e seus tags e links.
    return response.json({ //monto um objeto despejando todos os detalhe da nota, passando as tags e os links
      ...note,
      tags,
      links
    }); 
   
  }

  async delete (request, response) { //método para deletar uma nota específica através do id da nota passado para o backend.
    const { id } = request.params; //desetruturando para pegar o id da nota qu se deseja deletar, que está sendo passado via parâmetro na rota.

    await knex ("notes").where({ id }).delete(); //através do knex indo na tabela notes e deletando a nota de id especificado. Deverá haver cascade com tags e links.

    return response.json(); //retorno da resposta, retornando o que fizemos neste método. Não passo nada por aqui, apenas fiz as ações de delete em meu BD.
  }

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let notes;

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex("tags")
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id",
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title",`%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("notes.title")
      
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);
      
      return {
        ...note,
        tags: noteTags
      }
    });


    return response.json(notesWithTags);
 }
}

module.exports = NotesController;

/*
Operador whereLike para encontrar título sem precisar o nome preciso do título, mas apenas uma palavra que ele contennha
Obs.O LIKE (no where) ajuda a buscar por valores que contenham uma palavra, por exemplo, valores similares,
mas não idênticos, algo que seja contenha algo. Eu digo qual o campo eu quero fazer essa consulta e daí eu uso uma
literal(template, vou misturar símbolo% e variável), pois eu vou colocar a variável title, e vou envolver isso em
percentual, antes e depois dela, esse % é para mandar verificar tanto antes quanto depois, em qualquer parte da
palavra se existir o que eu estou procurando traga para mim.
*/

//Após fezer esta funcionalidade, de uma a uma, não esquecer de criar a rota para tornar esta funcionalidade visível. Isso vale sempre.