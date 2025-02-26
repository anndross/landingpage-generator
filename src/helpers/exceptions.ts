type MessagesType = {
  exp_token: string;
  no_token: string;
  internal_error: string;
  missing_parameters: (params: string[]) => string;
  missing_payload: (params: string[]) => string;
  success: string;
};

export const messages: MessagesType = {
  no_token: "Não autorizado.",
  exp_token: "Token expirado.",
  internal_error: "Erro interno.",
  missing_parameters: (params: string[]): string =>
    `É necessário passar todos os parâmetros: ${new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction",
    }).format(params)}`,

  missing_payload: (params: string[]): string =>
    `Payload inálido, deve passar todos os argumentos: ${new Intl.ListFormat(
      "pt-BR",
      {
        style: "long",
        type: "conjunction",
      }
    ).format(params)}`,
  success: "Sucesso!",
};
