# MyBookShelf
Projeto de API com duas entidades (livro e Autor)
Com campos:
    Autor:
        id: 'UUID';
        nome: 'string' obrigatoriedade de incluir nome e sobrenome;
        nacionalidade: 'string' opcional;
        nascimento: 'integer' ano de nascimento do autor obrigatório.
    Livro:
        id: 'UUID';
        titulo: 'string';
        publicacao: 'integer' obrigatório para o cálculo da regra de negócio;
        status: 'string' ["Ler","Lendo","Lido"];
        autorID; 'UUID' ligado ao autor original.

Rotas da API:
    POST:
        cadastrar um autor: /api/authors;
        cadastrar um livro: /api/books.
    GET:
        lista geral de autores: /api/authors;
        mostra autor por id: /api/authors/:id;
        lista geral de livros: /api/books;
        mostra livro por id: /api/books/:id.
    PATCH:
        atualiza nacionalidade do autor: /api/authors/:id;
        atualiza o status da leitura de um livro: /api/books/:id.
    DELETE:
        remove um autor: /api/authors/:id;
        remove um livro: /api/books/:id.
Rotas Visuais:

Regras de negócio e sanitização:
    * Não é permitido adicionar dois ou mais autores com mesmo nome(ignora maiúsculas/minúsculas e espaços extras);
    * Um livro só pode ser adicionado se o autor já está cadastrado e publicacao está entre nascimento e ano atual;
    * Não é permitido adicionar dois livros com o mesmo titulo para o mesmo autor;
    * Um autor só pode ser removido se não houver livros com seu id;
    *Sanitização: o sistema remove símbolos e normaliza transformando alguns simbolos em espaços para impedir burlas de validações de livros e autores.

Sugestões de Teste (Sucesso e Erro):
    Cenários para Autor:
        SUCESSO: "Machado de Assis", 1839 (Cadastro padrão);
        ERRO: "Machado" (Falha na regra de nome e sobrenome);
        ERRO: " Machado  de   ASSIS " (Falha por duplicidade, o sistema normaliza e identifica o autor já existente);
        ERRO: "Machado_de_Assis" (Falha por duplicidade).
    Cenários para Livro:
        SUCESSO: "Dom Casmurro", 1899 (Publicação válida dentro da vida do autor);
        ERRO: "Dom Casmurro", 1820 (Falha: publicação anterior ao nascimento do autor);
        ERRO: pela segunda vez "Dom Casmurro" para o mesmo Autor (Falha: título duplicado para o mesmo autor);
        ERRO: Cadastro de livro sem autores no sistema (Interface bloqueia o acesso à rota e na API gera erro).
    Cenários para Remoção:
        ERRO: Tentar remover "Machado de Assis" enquanto "Dom Casmurro" estiver atrelado a ele;
        SUCESSO: Remover "Dom Casmurro" primeiro e, em seguida, remover o autor.