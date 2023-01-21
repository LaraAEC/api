class AppError {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    this.message = message; 
    /*pega essa mensagem que vai chegar pelo construtor da minha classe e estou repassando ela
     repassada para a mensagem que faz parte do contexto global. Estou repassando as informações.*/
    this.statusCode = statusCode;
    //idem
  }
}
module.exports = AppError;